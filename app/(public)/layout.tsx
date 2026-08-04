import { getCleanHtml } from '@/lib/htmlHelper';
import parse from 'html-react-parser';

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
