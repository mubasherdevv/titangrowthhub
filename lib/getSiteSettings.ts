import { supabase } from '@/lib/supabase';

export async function getSiteSettings() {
  try {
    const { data } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single();
    return data;
  } catch (e) {
    return null;
  }
}
