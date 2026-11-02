'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCw } from 'lucide-react';
import { WatermelonStripes } from './WatermelonStripes';
import type { CrystalControls } from './CrystalScene';

export function CrystalArtwork({ services, ar }: { services: string[]; ar: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const controls = useRef<CrystalControls | null>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const abort = new AbortController();
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setPaused(media.matches);
    syncMotion();
    media.addEventListener('change', syncMotion);
    const contextLost = (event: Event) => {
      event.preventDefault();
      controls.current?.dispose();
      controls.current = null;
      setReady(false);
    };
    element.addEventListener('webglcontextlost', contextLost);
    import('./CrystalScene')
      .then(({ createCrystalScene }) => createCrystalScene(element, services, ar, abort.signal))
      .then(scene => {
        if (abort.signal.aborted) { scene.dispose(); return; }
        controls.current = scene;
        setReady(true);
      })
      .catch(() => { if (!abort.signal.aborted) setReady(false); });
    return () => {
      abort.abort();
      controls.current?.dispose();
      controls.current = null;
      media.removeEventListener('change', syncMotion);
      element.removeEventListener('webglcontextlost', contextLost);
    };
  }, [ar, services]);
  const toggleMotion = () => {
    const next = !paused;
    controls.current?.setPaused(next);
    setPaused(next);
  };
  return <>
    <div className={`crystal-artwork${ready ? ' is-ready' : ''}`}>
      <div className="crystal-fallback" aria-hidden="true"><WatermelonStripes /></div>
      <canvas ref={canvas} aria-hidden="true" />
    </div>
    {ready && <div className="crystal-controls">
      <button type="button" onClick={() => controls.current?.spin()}><RotateCw size={15} aria-hidden="true" />{ar ? 'لفّ البطيخة' : 'Spin the melon'}</button>
      <button type="button" onClick={toggleMotion} aria-label={paused ? (ar ? 'تشغيل الحركة' : 'Play animation') : (ar ? 'إيقاف الحركة' : 'Pause animation')} aria-pressed={paused}>
        {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
      </button>
    </div>}
  </>;
}
