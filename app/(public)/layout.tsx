import { getCleanHtml } from '@/lib/htmlHelper';
import parse from 'html-react-parser';
import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/getSiteSettings';

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

async function getJsonLdSchemas() {
  const SITE_URL = 'https://titangrowthhub.com';
  const SITE_NAME = 'Titan Growth Hub';

  let name = SITE_NAME;
  let url = SITE_URL;
  let logo = `${SITE_URL}/wp-content/uploads/2025/11/fevicon-1.webp`;
  let description = "Pakistan's #1 SEO & Digital Marketing Agency helping businesses scale with data-driven strategies.";

  try {
    const { data } = await supabase
      .from('site_settings')
      .select('org_name, org_url, org_logo, site_name, site_url, global_meta_desc')
      .eq('id', 1)
      .single();

    if (data) {
      if (data.org_name || data.site_name) name = data.org_name || data.site_name;
      if (data.org_url || data.site_url) url = (data.org_url || data.site_url).replace(/\/$/, '');
      if (data.org_logo) logo = data.org_logo;
      if (data.global_meta_desc) description = data.global_meta_desc;
    }
  } catch (e) {
    // use defaults
  }

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${url}/#organization`,
    name,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
    },
    description,
    sameAs: [
      'https://www.facebook.com/titangrowthhub',
      'https://www.linkedin.com/company/titangrowthhub',
      'https://twitter.com/titangrowthhub',
    ],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}/#website`,
    url,
    name,
    publisher: { '@id': `${url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    dateModified: new Date().toISOString(), // AI Readiness Freshness Signal
  };

  return [organization, website];
}

export default async function PublicRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read template-head.html to dynamically load all WordPress CSS and scripts in head
  const html = getCleanHtml('template-head.html');

  // Fetch JSON-LD schemas from Supabase
  const jsonLdSchemas = await getJsonLdSchemas();
  const settings = await getSiteSettings();


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
    
    // Inject GSC Verification Meta Tag if available
    if (settings && settings.gsc_verification_meta) {
      headContent += `\n${settings.gsc_verification_meta}\n`;
    }

    // 🚀 PERFORMANCE OPTIMIZATIONS for HEAD 🚀
    // 1. Add display=swap to Google Fonts to prevent invisible text while loading
    headContent = headContent.replace(/(href=['"]https:\/\/fonts.googleapis.com\/css.*?)['"]/gi, "$1&display=swap'");

    // 4. AI Readiness Freshness Signal Meta Tag
    headContent += `\n<meta property="article:modified_time" content="${new Date().toISOString()}">\n`;
  }

  return (
    <html lang="en-US">
      <head>
        {parse(headContent)}
        {/* JSON-LD Structured Data for Google */}
        {jsonLdSchemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
