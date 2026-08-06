import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // 1. Fetch site URL and last generated date from site_settings
    let siteUrl = 'https://titangrowthhub.com';
    let lastModified = new Date().toISOString();

    const { data: settings } = await supabase
      .from('site_settings')
      .select('site_url, updated_at')
      .eq('id', 1)
      .single();

    if (settings) {
      if (settings.site_url) {
        siteUrl = settings.site_url.endsWith('/') ? settings.site_url.slice(0, -1) : settings.site_url;
      }
      if (settings.updated_at) {
        lastModified = settings.updated_at;
      }
    }

    // 2. Fetch active blogs count
    const { count: blogCount, error: blogErr } = await supabase
      .from('blogs')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'Published');

    // 3. Fetch active services count
    const { count: serviceCount, error: serviceErr } = await supabase
      .from('services')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'Published');

    const blogsCount = blogCount || 0;
    const servicesCount = serviceCount || 0;
    const pagesCount = 7; // Static routes: Home, About, Services, Team, FAQs, Blog, Contact
    const categoriesCount = 5; // Static categories or extracted categories count
    const totalCount = blogsCount + servicesCount + pagesCount;

    const lastModDate = new Date(lastModified);
    const formattedDate = lastModDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const formattedTime = lastModDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const files = [
      {
        id: '1',
        name: 'sitemap.xml',
        type: 'Pages',
        typeBg: 'bg-emerald-50 border-emerald-200/60',
        typeText: 'text-emerald-700',
        urlsCount: pagesCount,
        lastModifiedDate: formattedDate,
        lastModifiedTime: formattedTime,
      },
      {
        id: '2',
        name: 'sitemap-blogs.xml',
        type: 'Blogs',
        typeBg: 'bg-purple-50 border-purple-200/60',
        typeText: 'text-purple-700',
        urlsCount: blogsCount,
        lastModifiedDate: formattedDate,
        lastModifiedTime: formattedTime,
      },
      {
        id: '3',
        name: 'sitemap-services.xml',
        type: 'Services',
        typeBg: 'bg-blue-50 border-blue-200/60',
        typeText: 'text-blue-700',
        urlsCount: servicesCount,
        lastModifiedDate: formattedDate,
        lastModifiedTime: formattedTime,
      },
    ];

    return NextResponse.json({
      siteUrl,
      totalCount,
      lastModifiedDate: formattedDate,
      lastModifiedTime: formattedTime,
      files,
    });
  } catch (err: any) {
    console.error('Error fetching sitemap stats API:', err);
    return NextResponse.json({ error: 'Failed to fetch sitemap stats' }, { status: 500 });
  }
}
