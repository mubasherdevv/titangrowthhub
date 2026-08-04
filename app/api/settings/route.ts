import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const dbToFrontendSettings = (db: any) => {
  if (!db) return null;
  return {
    siteName: db.site_name,
    siteTagline: db.site_tagline,
    siteUrl: db.site_url,
    logoUrl: db.logo_url,
    faviconUrl: db.favicon_url,
    timezone: db.timezone,
    language: db.language,
    defaultTitlePattern: db.default_title_pattern,
    globalMetaDesc: db.global_meta_desc,
    allowIndexing: db.allow_indexing,
    ogTitle: db.og_title,
    ogDescription: db.og_description,
    gscApiKey: db.gsc_api_key,
    bingApiKey: db.bing_api_key,
    geminiApiKey: db.gemini_api_key,
    orgName: db.org_name,
    orgUrl: db.org_url,
    orgLogo: db.org_logo,
    robotsText: db.robots_txt,
  };
};

const frontendToDbSettings = (fe: any) => {
  const db: any = {};
  if (fe.siteName !== undefined) db.site_name = fe.siteName;
  if (fe.siteTagline !== undefined) db.site_tagline = fe.siteTagline;
  if (fe.siteUrl !== undefined) db.site_url = fe.siteUrl;
  if (fe.logoUrl !== undefined) db.logo_url = fe.logoUrl;
  if (fe.faviconUrl !== undefined) db.favicon_url = fe.faviconUrl;
  if (fe.timezone !== undefined) db.timezone = fe.timezone;
  if (fe.language !== undefined) db.language = fe.language;
  if (fe.defaultTitlePattern !== undefined) db.default_title_pattern = fe.defaultTitlePattern;
  if (fe.globalMetaDesc !== undefined) db.global_meta_desc = fe.globalMetaDesc;
  if (fe.allowIndexing !== undefined) db.allow_indexing = fe.allowIndexing;
  if (fe.ogTitle !== undefined) db.og_title = fe.ogTitle;
  if (fe.ogDescription !== undefined) db.og_description = fe.ogDescription;
  if (fe.gscApiKey !== undefined) db.gsc_api_key = fe.gscApiKey;
  if (fe.bingApiKey !== undefined) db.bing_api_key = fe.bingApiKey;
  if (fe.geminiApiKey !== undefined) db.gemini_api_key = fe.geminiApiKey;
  if (fe.orgName !== undefined) db.org_name = fe.orgName;
  if (fe.orgUrl !== undefined) db.org_url = fe.orgUrl;
  if (fe.orgLogo !== undefined) db.org_logo = fe.orgLogo;
  if (fe.robotsText !== undefined) db.robots_txt = fe.robotsText;
  return db;
};

const defaultSettings = {
  siteName: '',
  siteTagline: '',
  siteUrl: '',
  logoUrl: null,
  faviconUrl: null,
  timezone: 'UTC (GMT+00:00)',
  language: 'English (US)',
  defaultTitlePattern: '%page_title% | %site_name%',
  globalMetaDesc: '',
  allowIndexing: true,
  ogTitle: '',
  ogDescription: '',
  gscApiKey: '',
  bingApiKey: '',
  geminiApiKey: '',
  orgName: '',
  orgUrl: '',
  orgLogo: '',
  robotsText: '',
};

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Default record doesn't exist, create it
        const { data: inserted, error: insertError } = await supabase
          .from('site_settings')
          .insert([{ id: 1 }])
          .select()
          .single();
        if (insertError) throw insertError;
        return NextResponse.json(dbToFrontendSettings(inserted));
      }
      if (error.code === 'PGRST205' || error.code === '42P01') {
        // Table doesn't exist yet (setup SQL not run). Return defaults so the UI works.
        return NextResponse.json(defaultSettings);
      }
      throw error;
    }
    return NextResponse.json(dbToFrontendSettings(data));
  } catch (error: any) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json(defaultSettings);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dbUpdate = {
      id: 1,
      ...frontendToDbSettings(body),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('site_settings')
      .upsert(dbUpdate)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(dbToFrontendSettings(data));
  } catch (error: any) {
    console.error('Error saving site settings:', error);
    return NextResponse.json({ error: error.message || 'Failed to save settings' }, { status: 500 });
  }
}
