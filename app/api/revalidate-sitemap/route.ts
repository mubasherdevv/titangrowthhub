import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

export async function POST() {
  try {
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

    return NextResponse.json({ success: true, message: 'Sitemap cache revalidated successfully' });
  } catch (err: any) {
    console.error('Error revalidating sitemap:', err);
    return NextResponse.json({ error: err.message || 'Failed to revalidate sitemap' }, { status: 500 });
  }
}
