import { getCleanHtml } from '@/lib/htmlHelper';
import parse from 'html-react-parser';
import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  let title = 'Avista – Digital Agency & Portfolio WordPress Theme';
  let description = 'Driving Growth Through Digital Excellence';
  let robots = 'index, follow';
  let ogTitle = '';
  let ogDesc = '';
  let faviconUrl = '/wp-content/uploads/2025/11/fevicon-1.webp';

  try {
    const { data } = await supabase
      .from('site_settings')
      .select('site_name, site_tagline, global_meta_desc, allow_indexing, og_title, og_description, favicon_url, default_title_pattern')
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
      if (data.favicon_url) {
        faviconUrl = data.favicon_url;
      }
    }
  } catch (e) {
    console.error('Error generating layout metadata:', e);
  }

  return {
    title: {
      default: title,
      template: `%s`, // Can be overridden in pages
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
    },
  };
}

export default function PublicRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read index.html to dynamically load all WordPress CSS and scripts in head
  const html = getCleanHtml('index.html');

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
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
