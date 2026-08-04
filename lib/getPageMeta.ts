import { supabase } from '@/lib/supabase';

/**
 * Fetches meta title and description for a specific page slug from Supabase.
 * Falls back to the provided defaults if no DB record exists.
 */
export async function getPageMeta(slug: string, defaultTitle: string, defaultDesc: string = '') {
  try {
    const { data } = await supabase
      .from('page_meta')
      .select('meta_title, meta_desc')
      .eq('slug', slug)
      .maybeSingle();

    return {
      title: data?.meta_title || defaultTitle,
      description: data?.meta_desc || defaultDesc,
    };
  } catch {
    return { title: defaultTitle, description: defaultDesc };
  }
}
