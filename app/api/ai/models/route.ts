import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: settings } = await supabase
      .from('site_settings')
      .select('ai_endpoints')
      .eq('id', 1)
      .single();

    if (!settings || !settings.ai_endpoints || !Array.isArray(settings.ai_endpoints)) {
      return NextResponse.json({ success: true, models: [] });
    }

    // Return only safe data (no API keys)
    const models = settings.ai_endpoints.map((endpoint: any) => ({
      model: endpoint.model,
      url: endpoint.url
    }));

    return NextResponse.json({ success: true, models });
  } catch (error: any) {
    console.error('AI Models Fetch Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
