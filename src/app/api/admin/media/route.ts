import { NextRequest, NextResponse } from 'next/server';
import { readdir, stat, unlink } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const imagesDir = path.join(publicDir, 'images');
    const uploadsDir = path.join(publicDir, 'uploads');

    const mediaList: Array<{
      url: string;
      name: string;
      folder: 'images' | 'uploads';
      size: number;
      updatedAt: string;
    }> = [];

    // Read /public/images
    try {
      const imageFiles = await readdir(imagesDir);
      for (const file of imageFiles) {
        if (/\.(png|jpg|jpeg|webp|svg|gif|ico)$/i.test(file)) {
          const stats = await stat(path.join(imagesDir, file));
          mediaList.push({
            url: `/images/${file}`,
            name: file,
            folder: 'images',
            size: stats.size,
            updatedAt: stats.mtime.toISOString(),
          });
        }
      }
    } catch {
      // directory might not exist yet
    }

    // Read /public/uploads
    try {
      const uploadFiles = await readdir(uploadsDir);
      for (const file of uploadFiles) {
        if (/\.(png|jpg|jpeg|webp|svg|gif|ico)$/i.test(file)) {
          const stats = await stat(path.join(uploadsDir, file));
          mediaList.push({
            url: `/uploads/${file}`,
            name: file,
            folder: 'uploads',
            size: stats.size,
            updatedAt: stats.mtime.toISOString(),
          });
        }
      }
    } catch {
      // directory might not exist yet
    }

    // Sort newest first
    mediaList.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    return NextResponse.json({ success: true, media: mediaList });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to list media files', details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get('url');

    if (!fileUrl) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Security check: only allow deleting from /uploads/
    if (!fileUrl.startsWith('/uploads/')) {
      return NextResponse.json(
        { error: 'System images in /images cannot be deleted, but can be overwritten.' },
        { status: 400 }
      );
    }

    const fileName = path.basename(fileUrl);
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

    await unlink(filePath);

    return NextResponse.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete file', details: String(error) },
      { status: 500 }
    );
  }
}
