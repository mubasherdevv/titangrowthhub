import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Default pages list with their slugs, labels, and URLs
const DEFAULT_PAGES = [
  { slug: 'home', label: 'Home', url: '/', defaultTitle: 'Titan Growth Hub – Pakistan\'s #1 SEO & Digital Marketing Agency', defaultDesc: 'Titan Growth Hub helps businesses scale with data-driven SEO, PPC, and content marketing strategies.' },
  { slug: 'about', label: 'About Us', url: '/about', defaultTitle: 'About Us – Titan Growth Hub', defaultDesc: 'Learn about our team, mission, and how we drive measurable SEO results for clients worldwide.' },
  { slug: 'our-services', label: 'Our Services', url: '/our-services', defaultTitle: 'Our Services – Titan Growth Hub', defaultDesc: 'Explore our full suite of digital marketing services including SEO, PPC, content marketing, and web development.' },
  { slug: 'our-team', label: 'Our Team', url: '/our-team', defaultTitle: 'Our Team – Titan Growth Hub', defaultDesc: 'Meet the experts behind Titan Growth Hub — a team of dedicated SEO specialists and digital marketers.' },
  { slug: 'faqs', label: 'FAQs', url: '/faqs', defaultTitle: 'FAQs – Titan Growth Hub', defaultDesc: 'Got questions? Find answers to the most frequently asked questions about our services and approach.' },
  { slug: 'blog', label: 'Blog', url: '/blog', defaultTitle: 'Blog – Titan Growth Hub', defaultDesc: 'Read the latest SEO tips, digital marketing strategies, and growth hacks from our expert team.' },
  { slug: 'contact-us', label: 'Contact Us', url: '/contact-us', defaultTitle: 'Contact Us – Titan Growth Hub', defaultDesc: 'Get in touch with our team. We\'re here to help you grow your online presence and drive more traffic.' },
];

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('page_meta')
      .select('*');

    if (error && error.code !== '42P01') {
      throw error;
    }

    // Merge DB data with defaults
    const pages = DEFAULT_PAGES.map((page) => {
      const dbRow = data?.find((r: any) => r.slug === page.slug);
      return {
        slug: page.slug,
        label: page.label,
        url: page.url,
        metaTitle: dbRow?.meta_title || page.defaultTitle,
        metaDesc: dbRow?.meta_desc || page.defaultDesc,
        defaultTitle: page.defaultTitle,
        defaultDesc: page.defaultDesc,
      };
    });

    return NextResponse.json(pages);
  } catch (error: any) {
    console.error('Error fetching page meta:', error);
    // Return defaults if table doesn't exist yet
    return NextResponse.json(
      DEFAULT_PAGES.map((p) => ({
        slug: p.slug,
        label: p.label,
        url: p.url,
        metaTitle: p.defaultTitle,
        metaDesc: p.defaultDesc,
        defaultTitle: p.defaultTitle,
        defaultDesc: p.defaultDesc,
      }))
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // body: { slug, metaTitle, metaDesc }
    const { slug, metaTitle, metaDesc } = body;

    if (!slug) {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('page_meta')
      .upsert(
        {
          slug,
          meta_title: metaTitle,
          meta_desc: metaDesc,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'slug' }
      )
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error saving page meta:', error);
    return NextResponse.json({ error: error.message || 'Failed to save' }, { status: 500 });
  }
}
