import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { requireAdmin } from '@/lib/admin-auth';
const extensions: Record<string, string> = { 'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp', 'image/gif': '.gif', 'video/mp4': '.mp4', 'video/webm': '.webm' };
const slots: Record<string, string> = { 'slot-mascots': 'mascots-3d-transparent.png', 'slot-banner': 'hero-3d-banner.png', 'slot-logo-transparent': 'logo-transparent.png', 'slot-logo-white': 'logo-white.png', 'slot-logo-main': 'logo.png', 'slot-emblem': 'emblem-3d.png' };
export async function POST(req: NextRequest) {
  const denied = requireAdmin(req); if (denied) return denied;
  try {
    if (Number(req.headers.get('content-length')) > 151 * 1024 * 1024) return NextResponse.json({ error: 'Maximum upload size is 150 MB.' }, { status: 413 });
    const form = await req.formData(); const file = form.get('file'); const slot = String(form.get('slot') || 'general');
    if (!(file instanceof File) || !file.size) return NextResponse.json({ error: 'Choose a file to upload.' }, { status: 400 });
    const ext = extensions[file.type];
    if (!ext) return NextResponse.json({ error: 'Use PNG, JPG, WebP, GIF, MP4, or WebM.' }, { status: 400 });
    const isVideo = file.type.startsWith('video/');
    if (file.size > (isVideo ? 150 : 15) * 1024 * 1024) return NextResponse.json({ error: isVideo ? 'Videos must be under 150 MB.' : 'Images must be under 15 MB.' }, { status: 413 });
    if (slots[slot] && file.type !== 'image/png') return NextResponse.json({ error: 'Core artwork replacements must be PNG files. Use project uploads for other formats.' }, { status: 400 });
    const bytes = Buffer.from(await file.arrayBuffer());
    const detected = bytes.subarray(0, 12);
    const valid = file.type === 'image/png' ? detected.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) : file.type === 'image/jpeg' ? detected[0] === 255 && detected[1] === 216 : file.type === 'image/webp' ? detected.toString('ascii', 8, 12) === 'WEBP' : file.type === 'image/gif' ? detected.toString('ascii', 0, 3) === 'GIF' : file.type === 'video/mp4' ? detected.toString('ascii', 4, 8) === 'ftyp' : detected.subarray(0, 4).equals(Buffer.from([26,69,223,163]));
    if (!valid) return NextResponse.json({ error: 'File contents do not match the selected format.' }, { status: 400 });
    const folder = slots[slot] ? 'images' : 'uploads';
    const filename = slots[slot] || `${randomUUID()}${ext}`;
    const directory = path.join(process.cwd(), 'public', folder); await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, filename), bytes);
    const url = `/${folder}/${filename}`;
    return NextResponse.json({ success: true, url: `${url}?v=${Date.now()}`, cleanUrl: url, fileName: filename, size: file.size, type: file.type, targetSlot: slot });
  } catch { return NextResponse.json({ error: 'Upload failed. Please try a smaller file.' }, { status: 500 }); }
}
