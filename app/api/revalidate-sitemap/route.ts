import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    let autoPing = false;
    try {
      const body = await req.json();
      if (body.autoPing) autoPing = true;
    } catch (e) {
      // Ignore JSON parse errors if no body provided
    }
    // 1. Trigger Next.js cache revalidation for sitemap routes
    revalidatePath('/sitemap.xml');
    revalidatePath('/sitemap');

    // 2. Update site_settings table updated_at column to record generation time
    const { error } = await supabase
      .from('site_settings')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', 1);

    if (error && error.code !== '42P01') { // 42P01 means table does not exist
      throw error;
    }

    // 3. Ping Google if requested
    if (autoPing) {
      // Need siteUrl to ping
      const { data: settings } = await supabase.from('site_settings').select('site_url').eq('id', 1).single();
      const siteUrl = settings?.site_url || 'https://titangrowthhub.com';
      const sitemapUrl = `${siteUrl}/sitemap.xml`;
      try {
        await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
        console.log(`Pinged Google for sitemap: ${sitemapUrl}`);
      } catch (pingErr) {
        console.error('Failed to ping Google:', pingErr);
      }
    }

    return NextResponse.json({ success: true, message: 'Sitemap cache revalidated successfully' });
  } catch (err: any) {
    console.error('Error revalidating sitemap:', err);
    return NextResponse.json({ error: err.message || 'Failed to revalidate sitemap' }, { status: 500 });
  }
}
