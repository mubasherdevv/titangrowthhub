import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getFilesRecursively(dir: string, fileList: string[] = []) {
  if (!fs.existsSync(dir)) return fileList;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else {
      if (/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(filePath)) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

export async function GET(req: NextRequest) {
  try {
    const assetsDir = path.join(process.cwd(), 'public', 'website_assets');
    const allFiles = getFilesRecursively(assetsDir);
    
    const metadataPath = path.join(assetsDir, 'media-metadata.json');
    let metadataStore: any = {};
    if (fs.existsSync(metadataPath)) {
      try {
        metadataStore = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      } catch(e) {}
    }

    const mediaFiles = allFiles.map(filePath => {
      const stats = fs.statSync(filePath);
      // Get the relative path for the URL
      const relativePath = filePath.replace(path.join(process.cwd(), 'public'), '').replace(/\\/g, '/');
      const filename = path.basename(filePath);
      
      const fileMeta = metadataStore[relativePath] || {};

      return {
        url: relativePath,
        name: filename,
        size: stats.size,
        createdAt: stats.birthtime,
        altText: fileMeta.altText || '',
        originalSize: fileMeta.originalSize || stats.size,
        width: fileMeta.width || null,
        height: fileMeta.height || null,
        isWebpOptimized: fileMeta.isWebpOptimized || relativePath.endsWith('.webp'),
      };
    });

    // Sort by newest first
    mediaFiles.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return NextResponse.json({ files: mediaFiles, metadataStats: { total: mediaFiles.length } });
  } catch (error: any) {
    console.error('Error fetching media:', error);
    return NextResponse.json({ error: 'Failed to load media files' }, { status: 500 });
  }
}
