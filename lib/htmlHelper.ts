import fs from 'fs';
import path from 'path';

export function getCleanHtml(relativePath: string): string {
  const filePath = path.join(process.cwd(), 'public', relativePath);
  if (!fs.existsSync(filePath)) {
    return `<h1>File not found: ${relativePath}</h1>`;
  }
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace relative asset paths to absolute paths
  html = html.replaceAll('src="../wp-', 'src="/wp-');
  html = html.replaceAll('href="../wp-', 'href="/wp-');
  html = html.replaceAll('src="../../wp-', 'src="/wp-');
  html = html.replaceAll('href="../../wp-', 'href="/wp-');
  html = html.replaceAll('src="wp-', 'src="/wp-');
  html = html.replaceAll('href="wp-', 'href="/wp-');

  // Replace links to point to Next.js routes
  html = html.replaceAll('href="../about/index.html"', 'href="/about"');
  html = html.replaceAll('href="about/index.html"', 'href="/about"');
  
  html = html.replaceAll('href="../blog/index.html"', 'href="/blog"');
  html = html.replaceAll('href="blog/index.html"', 'href="/blog"');

  html = html.replaceAll('href="../contact-us/index.html"', 'href="/contact-us"');
  html = html.replaceAll('href="contact-us/index.html"', 'href="/contact-us"');

  html = html.replaceAll('href="../faqs/index.html"', 'href="/faqs"');
  html = html.replaceAll('href="faqs/index.html"', 'href="/faqs"');

  html = html.replaceAll('href="../our-services/index.html"', 'href="/our-services"');
  html = html.replaceAll('href="our-services/index.html"', 'href="/our-services"');

  html = html.replaceAll('href="../our-team/index.html"', 'href="/our-team"');
  html = html.replaceAll('href="our-team/index.html"', 'href="/our-team"');

  html = html.replaceAll('href="../index.html"', 'href="/"');
  html = html.replaceAll('href="../../index.html"', 'href="/"');
  html = html.replaceAll('href="index.html"', 'href="/"');

  // Disable woo commerce / shop links for now
  html = html.replaceAll('href="../shop/index.html"', 'href="#"');
  html = html.replaceAll('href="../cart/index.html"', 'href="#"');
  html = html.replaceAll('href="../checkout/index.html"', 'href="#"');
  html = html.replaceAll('href="../pricing/index.html"', 'href="#"');

  return html;
}
