import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function robots(): Promise<MetadataRoute.Robots> {
  let robotsText = 'User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/';
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://titangrowthhub.com';

  try {
    const { data } = await supabase
      .from('site_settings')
      .select('robots_txt, site_url')
      .eq('id', 1)
      .single();

    if (data) {
      if (data.robots_txt) {
        robotsText = data.robots_txt;
      }
      if (data.site_url) {
        siteUrl = data.site_url;
      }
    }
  } catch (e) {
    console.error('Error fetching robots dynamically:', e);
  }

  const lines = robotsText.split('\n');
  const rules: any[] = [];
  let currentAgent = '*';
  let allowPaths: string[] = [];
  let disallowPaths: string[] = [];

  lines.forEach((line) => {
    const cleanLine = line.trim();
    if (cleanLine.toLowerCase().startsWith('user-agent:')) {
      if (allowPaths.length > 0 || disallowPaths.length > 0) {
        rules.push({
          userAgent: currentAgent,
          allow: allowPaths,
          disallow: disallowPaths,
        });
        allowPaths = [];
        disallowPaths = [];
      }
      currentAgent = cleanLine.substring(11).trim();
    } else if (cleanLine.toLowerCase().startsWith('allow:')) {
      allowPaths.push(cleanLine.substring(6).trim());
    } else if (cleanLine.toLowerCase().startsWith('disallow:')) {
      disallowPaths.push(cleanLine.substring(9).trim());
    }
  });

  if (allowPaths.length > 0 || disallowPaths.length > 0 || rules.length === 0) {
    rules.push({
      userAgent: currentAgent,
      allow: allowPaths.length > 0 ? allowPaths : undefined,
      disallow: disallowPaths.length > 0 ? disallowPaths : undefined,
    });
  }

  return {
    rules: rules,
    sitemap: [
      `${siteUrl.endsWith('/') ? siteUrl : siteUrl + '/' }sitemap.xml`,
      `${siteUrl.endsWith('/') ? siteUrl : siteUrl + '/' }sitemap-blogs.xml`,
      `${siteUrl.endsWith('/') ? siteUrl : siteUrl + '/' }sitemap-services.xml`,
    ],
  };
}
