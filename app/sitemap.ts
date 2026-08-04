import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let siteUrl = 'https://yoursite.com';
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
    console.error('Error fetching site_url for sitemap:', e);
  }

  // 1. Static pages
  const staticRoutes = ['', '/about', '/our-services', '/our-team', '/faqs', '/blog', '/contact-us'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Fetch published blogs from Supabase
  let blogUrls: any[] = [];
  try {
    const { data: blogs } = await supabase
      .from('blogs')
      .select('slug, created_at')
      .eq('status', 'Published');

    if (blogs) {
      blogUrls = blogs.map((blog) => {
        const slug = blog.slug.startsWith('/') ? blog.slug : `/${blog.slug}`;
        return {
          url: `${siteUrl}${slug}`,
          lastModified: new Date(blog.created_at),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        };
      });
    }
  } catch (e) {
    console.error('Error fetching blogs for sitemap:', e);
  }

  // 3. Fetch published services from Supabase
  let serviceUrls: any[] = [];
  try {
    const { data: services } = await supabase
      .from('services')
      .select('slug, created_at')
      .eq('status', 'Published');

    if (services) {
      serviceUrls = services.map((service) => {
        const slug = service.slug.startsWith('/') ? service.slug : `/${service.slug}`;
        return {
          url: `${siteUrl}${slug}`,
          lastModified: new Date(service.created_at),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        };
      });
    }
  } catch (e) {
    console.error('Error fetching services for sitemap:', e);
  }

  return [...staticRoutes, ...blogUrls, ...serviceUrls];
}
