import fs from 'fs';
import path from 'path';

export function getCleanHtml(relativePath: string): string {
  const filePath = path.join(process.cwd(), 'public', relativePath);
  if (!fs.existsSync(filePath)) {
    return `<h1>File not found: ${relativePath}</h1>`;
  }
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace relative asset paths to absolute paths
  // Double quotes
  html = html.replaceAll('src="../wp-', 'src="/wp-');
  html = html.replaceAll('href="../wp-', 'href="/wp-');
  html = html.replaceAll('src="../../wp-', 'src="/wp-');
  html = html.replaceAll('href="../../wp-', 'href="/wp-');
  html = html.replaceAll('src="wp-', 'src="/wp-');
  html = html.replaceAll('href="wp-', 'href="/wp-');

  // Single quotes
  html = html.replaceAll("src='../wp-", "src='/wp-");
  html = html.replaceAll("href='../wp-", "href='/wp-");
  html = html.replaceAll("src='../../wp-", "src='/wp-");
  html = html.replaceAll("href='../../wp-", "href='/wp-");
  html = html.replaceAll("src='wp-", "src='/wp-");
  html = html.replaceAll("href='wp-", "href='/wp-");

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

  // Cleanup old ngrok references if any
  html = html.replaceAll('https://0062-101-50-71-229.ngrok-free.app', '');

  return optimizeHtml(html);
}

export function optimizeHtml(html: string): string {
  if (!html) return html;

  // 🚀 PERFORMANCE OPTIMIZATIONS 🚀

  // 1. Remove Render-Blocking Preloader
  html = html.replace(/<div class="as-preloader[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '');
  html = html.replace(/<div class="as-preloader[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi, '');

  // 2. Auto Image Lazy Loading (Skip if already has loading attribute)
  html = html.replace(/<img(?![^>]*loading=)([^>]+)>/gi, '<img loading="lazy" decoding="async" $1>');

  // 3. Simple Minification (Remove extra white spaces between tags)
  html = html.replace(/>\s+</g, '><');

  // 4. Agentic Browsing & Accessibility Fixes
  // Add aria-label to missing form elements (e.g. wpcf7 inputs without labels)
  html = html.replace(/<input([^>]*class="[^"]*wpcf7-form-control[^"]*"[^>]*)>/gi, (match, p1) => {
    if (!match.includes('aria-label') && !match.includes('id=')) {
      return `<input aria-label="Form Input" ${p1}>`;
    }
    return match;
  });

  // Add aria-label to footer logo link missing discernible text
  html = html.replace(/<a([^>]*class="[^"]*tx-logo[^"]*"[^>]*)>/gi, (match, p1) => {
    if (!match.includes('aria-label')) {
      return `<a aria-label="Titan Growth Hub Home" ${p1}>`;
    }
    return match;
  });

  return html;
}

export function injectDynamicSettings(html: string, settings: any): string {
  if (!html || !settings) return html;
  
  let finalHtml = html;
  
  if (settings.org_logo) {
    finalHtml = finalHtml.replaceAll('/wp-content/uploads/2025/11/logo-1.webp', settings.org_logo);
    finalHtml = finalHtml.replaceAll('/wp-content/uploads/2025/10/logo-1.webp', settings.org_logo);
    finalHtml = finalHtml.replaceAll('/wp-content/uploads/2025/11/logo-5.svg', settings.org_logo);
  }

  if (settings.favicon_url) {
    finalHtml = finalHtml.replaceAll('/wp-content/uploads/2025/11/fevicon-1.webp', settings.favicon_url);
  }

  // Apply speed optimizations before returning
  return optimizeHtml(finalHtml);
}
