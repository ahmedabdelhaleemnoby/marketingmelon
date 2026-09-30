import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const targetSlot = (formData.get('slot') as string) || 'general';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const publicDir = path.join(process.cwd(), 'public');
    const imagesDir = path.join(publicDir, 'images');
    const uploadsDir = path.join(publicDir, 'uploads');

    await mkdir(imagesDir, { recursive: true });
    await mkdir(uploadsDir, { recursive: true });

    let targetFilePath = '';
    let publicUrl = '';

    // Direct slot overwrites for instant website-wide replacement
    if (targetSlot === 'slot-mascots') {
      targetFilePath = path.join(imagesDir, 'mascots-3d-transparent.png');
      publicUrl = '/images/mascots-3d-transparent.png';
    } else if (targetSlot === 'slot-banner') {
      targetFilePath = path.join(imagesDir, 'hero-3d-banner.png');
      publicUrl = '/images/hero-3d-banner.png';
    } else if (targetSlot === 'slot-logo-transparent') {
      targetFilePath = path.join(imagesDir, 'logo-transparent.png');
      publicUrl = '/images/logo-transparent.png';
    } else if (targetSlot === 'slot-logo-white') {
      targetFilePath = path.join(imagesDir, 'logo-white.png');
      publicUrl = '/images/logo-white.png';
    } else if (targetSlot === 'slot-logo-main') {
      targetFilePath = path.join(imagesDir, 'logo.png');
      publicUrl = '/images/logo.png';
    } else if (targetSlot === 'slot-emblem') {
      targetFilePath = path.join(imagesDir, 'emblem-3d.png');
      publicUrl = '/images/emblem-3d.png';
    } else {
      // General upload with unique name in /public/uploads/
      const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const ext = path.extname(originalName) || '.png';
      const baseName = path.basename(originalName, ext);
      const fileName = `${targetSlot}_${baseName}_${Date.now()}${ext}`;
      targetFilePath = path.join(uploadsDir, fileName);
      publicUrl = `/uploads/${fileName}`;
    }

    await writeFile(targetFilePath, buffer);

    return NextResponse.json({
      success: true,
      url: `${publicUrl}?v=${Date.now()}`,
      cleanUrl: publicUrl,
      fileName: path.basename(targetFilePath),
      size: file.size,
      type: file.type,
      targetSlot,
      message: 'Image uploaded and updated successfully',
    });
  } catch (error) {
    console.error('Failed to upload image:', error);
    return NextResponse.json(
      { error: 'Failed to process file upload', details: String(error) },
      { status: 500 }
    );
  }
}
