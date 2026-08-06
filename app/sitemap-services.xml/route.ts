import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://titangrowthhub.com';

  try {
    const { data } = await supabase
      .from('site_settings')
      .select('site_url')
      .eq('id', 1)
      .single();
    if (data && data.site_url) {
      siteUrl = data.site_url.endsWith('/') ? data.site_url.slice(0, -1) : data.site_url;
    }
  } catch (e) {
    console.error('Error fetching site_url for sitemap-services:', e);
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  try {
    const { data: services } = await supabase
      .from('services')
      .select('slug, created_at')
      .eq('status', 'Published');

    if (services) {
      services.forEach(service => {
        const slug = service.slug.startsWith('/') ? service.slug : `/${service.slug}`;
        const url = `${siteUrl}${slug}`;
        const lastMod = new Date(service.created_at).toISOString();
        xml += `  <url>\n`;
        xml += `    <loc>${url}</loc>\n`;
        xml += `    <lastmod>${lastMod}</lastmod>\n`;
        xml += `  </url>\n`;
      });
    }
  } catch (e) {
    console.error('Error fetching services for sitemap:', e);
  }

  xml += `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
