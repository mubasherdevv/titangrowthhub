import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    let folderName = formData.get('folderName') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Default to 'general' if no folder name is provided
    if (!folderName) {
      folderName = 'general';
    }

    // Sanitize folder name
    folderName = folderName.replace(/[^a-z0-9-]/gi, '-').toLowerCase();

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create target directory
    const uploadDir = path.join(process.cwd(), 'public', 'website_assets', folderName);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Process image with Sharp (convert to webp, compress)
    const originalName = file.name.replace(/\.[^/.]+$/, ""); // strip extension
    const safeName = originalName.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
    const finalFilename = `${safeName}-${Date.now()}.webp`;
    const finalPath = path.join(uploadDir, finalFilename);

    // Extract original dimensions
    const imgMetadata = await sharp(buffer).metadata();
    
    const outputInfo = await sharp(buffer)
      .webp({ quality: 80 })
      .toFile(finalPath);

    // Return the public URL
    const publicUrl = `/website_assets/${folderName}/${finalFilename}`;

    // Save metadata
    const rootAssetsDir = path.join(process.cwd(), 'public', 'website_assets');
    const metadataPath = path.join(rootAssetsDir, 'media-metadata.json');
    let metadataStore: any = {};
    if (fs.existsSync(metadataPath)) {
      try {
        metadataStore = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      } catch (e) {
        // ignore
      }
    }
    metadataStore[publicUrl] = {
      originalSize: buffer.length,
      compressedSize: outputInfo.size,
      width: imgMetadata.width,
      height: imgMetadata.height,
      altText: '',
      isWebpOptimized: true,
      updatedAt: new Date().toISOString()
    };
    fs.writeFileSync(metadataPath, JSON.stringify(metadataStore, null, 2));

    return NextResponse.json({ url: publicUrl, success: true });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
