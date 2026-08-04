import { getCleanHtml } from '@/lib/htmlHelper';
import parse from 'html-react-parser';
import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  let title = 'Titan Growth Hub – Pakistan\'s #1 SEO & Digital Marketing Agency';
  let description = 'Titan Growth Hub helps businesses scale with data-driven SEO, PPC, and content marketing strategies.';

  let robots = 'index, follow';
  let ogTitle = '';
  let ogDesc = '';
  let ogImg = '';
  let faviconUrl = '/wp-content/uploads/2025/11/fevicon-1.webp';
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://titangrowthhub.com';

  try {
    const { data } = await supabase
      .from('site_settings')
      .select('site_name, site_tagline, global_meta_desc, allow_indexing, og_title, og_description, og_image, favicon_url, default_title_pattern, site_url')
      .eq('id', 1)
      .single();

    if (data) {
      if (data.site_name) {
        title = data.site_name;
        if (data.site_tagline) {
          title = `${data.site_name} – ${data.site_tagline}`;
        }
      }
      if (data.global_meta_desc) {
        description = data.global_meta_desc;
      }
      robots = data.allow_indexing ? 'index, follow' : 'noindex, nofollow';
      ogTitle = data.og_title || title;
      ogDesc = data.og_description || description;
      ogImg = data.og_image || '';
      if (data.favicon_url) {
        faviconUrl = data.favicon_url;
      }
      if (data.site_url) {
        siteUrl = data.site_url.endsWith('/') ? data.site_url.slice(0, -1) : data.site_url;
      }
    }
  } catch (e) {
    console.error('Error generating layout metadata:', e);
  }

  return {
    title: {
      default: title,
      template: `%s`,
    },
    description: description,
    robots: robots,
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      type: 'website',
      url: siteUrl,
      siteName: title,
      ...(ogImg ? { images: [{ url: ogImg, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDesc,
      ...(ogImg ? { images: [ogImg] } : {}),
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}

async function getJsonLdSchema() {
  try {
    const { data } = await supabase
      .from('site_settings')
      .select('org_name, org_url, org_logo, site_name, site_url')
      .eq('id', 1)
      .single();

    if (!data) return null;

    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
    };
    if (data.org_name || data.site_name) schema.name = data.org_name || data.site_name;
    if (data.org_url || data.site_url) schema.url = data.org_url || data.site_url;
    if (data.org_logo) schema.logo = data.org_logo;

    return schema;
  } catch (e) {
    return null;
  }
}

export default async function PublicRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read template-head.html to dynamically load all WordPress CSS and scripts in head
  const html = getCleanHtml('template-head.html');

  // Fetch JSON-LD schema from Supabase
  const jsonLd = await getJsonLdSchema();

  // Extract head tags
  const headStart = html.indexOf('<head>');
  const headEnd = html.indexOf('</head>');
  let headContent = '';
  if (headStart !== -1 && headEnd !== -1) {
    headContent = html.substring(headStart + 6, headEnd);

    // Strip dynamic title and meta robots so Next.js SEO metadata handles it
    headContent = headContent.replace(/<title>[\s\S]*?<\/title>/gi, '');
    headContent = headContent.replace(/<meta name=['"]robots['"][\s\S]*?>/gi, '');
    // Strip default favicon links to let Next.js Metadata API control them dynamically
    headContent = headContent.replace(/<link rel=['"]icon['"][\s\S]*?>/gi, '');
    headContent = headContent.replace(/<link rel=['"]shortcut icon['"][\s\S]*?>/gi, '');
    headContent = headContent.replace(/<link rel=['"]apple-touch-icon['"][\s\S]*?>/gi, '');
  }

  return (
    <html lang="en-US">
      <head>
        {parse(headContent)}
        {/* JSON-LD Structured Data for Google */}
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
