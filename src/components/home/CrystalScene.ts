import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export type CrystalControls = { dispose: () => void; setPaused: (value: boolean) => void; spin: () => void };

/** The scene and embedded model from the supplied Marketing Melon hero. */
export async function createCrystalScene(canvas: HTMLCanvasElement, services: string[], ar: boolean, signal: AbortSignal): Promise<CrystalControls> {
  const response = await fetch('/models/crystal-watermelon.glb', { signal });
  if (!response.ok) throw new Error('Could not load hero model');
  const gltf = await new GLTFLoader().parseAsync(await response.arrayBuffer(), '');
  const scene = new THREE.Scene();
  scene.add(gltf.scene);
  const textures = new Set<THREE.Texture>();
  const materials = new Set<THREE.Material>();
  const geometries = new Set<THREE.BufferGeometry>();
  let renderer: THREE.WebGLRenderer | undefined;
  let environment: THREE.WebGLRenderTarget | undefined;
  let frame = 0;
  const listeners = new AbortController();
  let resizeObserver: ResizeObserver | undefined;
  let intersectionObserver: IntersectionObserver | undefined;
  let disposed = false;
  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    listeners.abort();
    resizeObserver?.disconnect();
    intersectionObserver?.disconnect();
    scene.traverse(object => {
      if (!(object instanceof THREE.Mesh)) return;
      geometries.add(object.geometry);
      const list = Array.isArray(object.material) ? object.material : [object.material];
      for (const material of list) {
        materials.add(material);
        for (const value of Object.values(material)) if (value instanceof THREE.Texture) textures.add(value);
      }
    });
    geometries.forEach(g => g.dispose());
    materials.forEach(m => m.dispose());
    textures.forEach(t => t.dispose());
    environment?.dispose();
    renderer?.dispose();
  }
  try {
    signal.throwIfAborted();
    const font = getComputedStyle(canvas).fontFamily;
    await document.fonts.load(`900 100px ${font}`).catch(() => {});
    signal.throwIfAborted();
    const view = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    renderer = view;
    view.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    view.toneMapping = THREE.ACESFilmicToneMapping;
    view.toneMappingExposure = 1.05;
    scene.background = new THREE.Color('#f4f1ea');
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.z = 10;
    const room = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(view);
    environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 5, 4);
    const rim = new THREE.DirectionalLight(0xffc2cc, 1.6);
    rim.position.set(-4, 1, -3);
    scene.add(key, rim);

    function texturePlane(width: number, height: number, paint: (ctx: CanvasRenderingContext2D) => void, transparent = false) {
      const surface = document.createElement('canvas');
      surface.width = width; surface.height = height;
      const ctx = surface.getContext('2d');
      if (!ctx) throw new Error('Canvas unavailable');
      paint(ctx);
      const texture = new THREE.CanvasTexture(surface);
      texture.colorSpace = THREE.SRGBColorSpace;
      textures.add(texture);
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: texture, toneMapped: false, transparent, depthWrite: !transparent }));
      scene.add(plane);
      return plane;
    }
    const background = texturePlane(512, 512, ctx => {
      ctx.fillStyle = '#f4f1ea'; ctx.fillRect(0, 0, 512, 512);
      for (const [x, y, radius, color] of [[256, 200, 230, 'rgba(255,214,220,.75)'], [40, 40, 260, 'rgba(206,232,206,.55)'], [480, 500, 280, 'rgba(206,232,206,.45)'], [500, 30, 200, 'rgba(255,255,255,.8)']] as const) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, color); gradient.addColorStop(1, 'rgba(244,241,234,0)');
        ctx.fillStyle = gradient; ctx.fillRect(0, 0, 512, 512);
      }
    });
    background.position.z = -8;

    const textCanvas = document.createElement('canvas');
    const ctx = textCanvas.getContext('2d');
    if (!ctx) throw new Error('Canvas unavailable');
    let fontSize = 200;
    const measure = () => {
      ctx.font = `900 ${fontSize}px ${font}`;
      return services.reduce((w, text) => w + ctx.measureText(text).width + fontSize * 1.24, 0);
    };
    let textWidth = measure();
    const maxWidth = Math.min(view.capabilities.maxTextureSize, 16384);
    if (textWidth > maxWidth) { fontSize *= maxWidth / textWidth; textWidth = measure(); }
    textCanvas.width = Math.ceil(textWidth); textCanvas.height = 256;
    ctx.font = `900 ${fontSize}px ${font}`;
    ctx.direction = ar ? 'rtl' : 'ltr'; ctx.textAlign = ar ? 'right' : 'left'; ctx.textBaseline = 'middle';
    let x = ar ? textCanvas.width : 0;
    const direction = ar ? -1 : 1;
    for (const text of services) {
      ctx.fillStyle = '#141414'; ctx.fillText(text, x, 128 + fontSize * .06);
      x += direction * (ctx.measureText(text).width + fontSize * .45);
      const radius = fontSize * .17;
      for (const [scale, color] of [[1, '#1e8a3c'], [.62, '#e8384f']] as const) {
        ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x + direction * radius, 128, radius * scale, 0, Math.PI * 2); ctx.fill();
      }
      x += direction * fontSize * .79;
    }
    const band = new THREE.CanvasTexture(textCanvas);
    textures.add(band);
    band.colorSpace = THREE.SRGBColorSpace; band.wrapS = THREE.RepeatWrapping;
    band.anisotropy = view.capabilities.getMaxAnisotropy();
    const text = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: band, toneMapped: false, alphaTest: .5, alphaToCoverage: true }));
    text.position.z = -1.6; scene.add(text);

    const model = gltf.scene;
    const bounds = new THREE.Box3().setFromObject(model);
    const size = bounds.getSize(new THREE.Vector3());
    model.position.sub(bounds.getCenter(new THREE.Vector3()));
    const holder = new THREE.Group(); holder.add(model); holder.scale.setScalar(3.8 / Math.max(size.x, size.y));
    const melon = new THREE.Group(); melon.add(holder); melon.rotation.set(.3, -.55, .1);
    const pivot = new THREE.Group(); pivot.add(melon); scene.add(pivot);
    const halfHeight = size.y * holder.scale.y / 2;
    const meshes: THREE.Object3D[] = [];
    model.traverse(object => {
      if (object instanceof THREE.Mesh) {
        meshes.push(object);
        for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
          if (material instanceof THREE.MeshStandardMaterial) material.envMapIntensity = 1.7;
        }
      }
    });
    const shadow = texturePlane(128, 128, ctx => {
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(15,77,36,.5)'); gradient.addColorStop(1, 'rgba(15,77,36,0)');
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, 128, 128);
    }, true);
    shadow.position.z = -.8;
    const seedMaterial = new THREE.MeshPhysicalMaterial({ color: '#1b0f0c', roughness: .15, clearcoat: 1 });
    const seeds = [[-1.9, -.9, .5, .13], [1.75, -1.2, .3, .1], [.4, -1.75, .7, .085], [-1, 1.6, -.3, .075]].map(([x, y, z, radius]) => {
      const geometry = new THREE.SphereGeometry(radius, 20, 14); geometry.scale(.62, 1, .48);
      const positions = geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        if (positions.getY(i) > 0) {
          const factor = 1 - positions.getY(i) / radius * .5;
          positions.setX(i, positions.getX(i) * factor); positions.setZ(i, positions.getZ(i) * factor);
        }
      }
      geometry.computeVertexNormals();
      const mesh = new THREE.Mesh(geometry, seedMaterial); scene.add(mesh);
      return { mesh, offset: new THREE.Vector3(x, y, z) };
    });

    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let paused = media.matches, visible = true, time = 0, last = performance.now(), spin = 0, targetSpin = 0;
    let scale = 1, centerY = .72, dirty = true;
    const pointer = new THREE.Vector2();
    const ray = new THREE.Raycaster();
    function resize() {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      view.setSize(width, height, false);
      camera.aspect = width / height; camera.updateProjectionMatrix();
      const portrait = camera.aspect < .9;
      scale = portrait ? THREE.MathUtils.clamp(camera.aspect * 1.25, .4, .95) : THREE.MathUtils.clamp(camera.aspect / 1.55, .8, 1.1);
      centerY = portrait ? 1.1 : .72;
      const visibleSize = (z: number) => 2 * (10 - z) * Math.tan(THREE.MathUtils.degToRad(15));
      const textHeight = portrait ? .95 : 1.9;
      const textWidth = visibleSize(-1.6) * camera.aspect * 1.05;
      text.scale.set(textWidth, textHeight, 1); text.position.y = portrait ? 1.15 : .85;
      band.repeat.x = textWidth / (textHeight * textCanvas.width / 256);
      background.scale.set(visibleSize(-8) * camera.aspect * 1.05, visibleSize(-8) * 1.05, 1);
      dirty = true;
    }
    const hit = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const point = new THREE.Vector2((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
      ray.setFromCamera(point, camera);
      return ray.intersectObjects(meshes, false).length > 0;
    };
    const rotate = () => { if (paused) { spin += Math.PI / 3; targetSpin = spin; dirty = true; } else targetSpin += Math.PI * 2; };
    canvas.addEventListener('pointermove', event => {
      if (paused) return;
      const rect = canvas.getBoundingClientRect();
      pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
      canvas.style.cursor = hit(event) ? 'pointer' : '';
    }, { signal: listeners.signal });
    canvas.addEventListener('pointerleave', () => pointer.set(0, 0), { signal: listeners.signal });
    canvas.addEventListener('pointerdown', event => { if (hit(event)) rotate(); }, { signal: listeners.signal });
    media.addEventListener('change', event => { paused = event.matches; dirty = true; }, { signal: listeners.signal });
    document.addEventListener('visibilitychange', () => { last = performance.now(); }, { signal: listeners.signal });
    resizeObserver = new ResizeObserver(resize); resizeObserver.observe(canvas);
    intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; last = performance.now(); });
    intersectionObserver.observe(canvas);
    resize();
    function tick(now: number) {
      if (disposed) return;
      frame = requestAnimationFrame(tick);
      const delta = Math.min((now - last) / 1000, 1 / 30); last = now;
      if (!visible || document.hidden || (paused && !dirty)) return;
      dirty = false;
      if (!paused) time += delta;
      if (!paused) spin += (targetSpin - spin) * Math.min(delta * 5, 1);
      const drift = Math.sin(time * .45) * .12;
      const swim = Math.sin(time * Math.PI * 2 / 3.2) * .12;
      pivot.position.set(drift + pointer.x * .15, centerY + swim * scale, 0);
      pivot.scale.setScalar(scale); pivot.rotation.y = spin;
      melon.rotation.set(.3 - pointer.y * .2 + Math.sin(time * .6) * .06, -.55 + pointer.x * .3 + Math.sin(time * .37) * .18, .1 + Math.sin(time * .5) * .06);
      shadow.position.x = pivot.position.x; shadow.position.y = centerY - (halfHeight + .25) * scale * 1.1;
      shadow.scale.set(3.6 * scale, .4 * scale, 1);
      seeds.forEach(({ mesh, offset }, index) => {
        mesh.scale.setScalar(scale); mesh.position.copy(offset).multiplyScalar(scale).add(pivot.position);
        mesh.position.x += Math.sin(time * .8 + index) * .12;
        mesh.position.y += Math.cos(time * .6 + index) * .1;
        mesh.rotation.set(time * .4 + index, time * .3, Math.sin(time + index) * .5);
      });
      if (!paused) band.offset.x += (ar ? -1 : 1) * .45 * delta / (1.9 * textCanvas.width / 256);
      view.render(scene, camera);
    }
    tick(performance.now());
    return { dispose, spin: rotate, setPaused(value) { paused = value; pointer.set(0, 0); dirty = true; } };
  } catch (error) { dispose(); throw error; }
}
