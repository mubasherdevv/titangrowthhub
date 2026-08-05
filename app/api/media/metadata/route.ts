import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { url, altText } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

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

    if (!metadataStore[url]) {
      metadataStore[url] = {};
    }
    
    metadataStore[url].altText = altText;
    metadataStore[url].updatedAt = new Date().toISOString();

    fs.writeFileSync(metadataPath, JSON.stringify(metadataStore, null, 2));

    return NextResponse.json({ success: true, metadata: metadataStore[url] });
  } catch (error: any) {
    console.error('Error updating metadata:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
