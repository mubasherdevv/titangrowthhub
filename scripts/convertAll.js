const fs = require('fs');
const path = require('path');

const pagesToConvert = [
  'our-team',
  'blog',
  'contact-us',
  'faqs',
  'our-services'
];

const backendDir = process.cwd();
const gameDir = path.join(backendDir, '..');

pagesToConvert.forEach(pageName => {
  const htmlPath = path.join(gameDir, pageName, 'index.html');
  if (!fs.existsSync(htmlPath)) {
    console.log(`Missing: ${htmlPath}`);
    return;
  }
  
  const html = fs.readFileSync(htmlPath, 'utf8');

  const bodyStart = html.indexOf('<body');
  const bodyStartClose = html.indexOf('>', bodyStart);
  const bodyEnd = html.indexOf('</body>');

  let bodyContent = html.substring(bodyStartClose + 1, bodyEnd);
  
  // Attempt to extract dynamic body class
  let bodyClass = 'home';
  const bodyClassMatch = html.match(/<body[^>]*class=["']([^"']*)["']/i);
  if (bodyClassMatch) {
    bodyClass = bodyClassMatch[1];
  }

  // Extract title
  let pageTitle = 'Avista – Digital Agency & Portfolio WordPress Theme';
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    pageTitle = titleMatch[1].trim();
  }

  // Fix relative links
  bodyContent = bodyContent.replaceAll('src="../wp-', 'src="/wp-');
  bodyContent = bodyContent.replaceAll('href="../wp-', 'href="/wp-');
  bodyContent = bodyContent.replaceAll('src="../../wp-', 'src="/wp-');
  bodyContent = bodyContent.replaceAll('href="../../wp-', 'href="/wp-');
  bodyContent = bodyContent.replaceAll('src="wp-', 'src="/wp-');
  bodyContent = bodyContent.replaceAll('href="wp-', 'href="/wp-');
  
  bodyContent = bodyContent.replaceAll('href="../about/index.html"', 'href="/about"');
  bodyContent = bodyContent.replaceAll('href="about/index.html"', 'href="/about"');
  bodyContent = bodyContent.replaceAll('href="../index.html"', 'href="/"');
  bodyContent = bodyContent.replaceAll('href="../../index.html"', 'href="/"');
  bodyContent = bodyContent.replaceAll('href="index.html"', 'href="/"');
  bodyContent = bodyContent.replaceAll('href="../blog/index.html"', 'href="/blog"');
  bodyContent = bodyContent.replaceAll('href="blog/index.html"', 'href="/blog"');
  bodyContent = bodyContent.replaceAll('href="../contact-us/index.html"', 'href="/contact-us"');
  bodyContent = bodyContent.replaceAll('href="contact-us/index.html"', 'href="/contact-us"');
  bodyContent = bodyContent.replaceAll('href="../faqs/index.html"', 'href="/faqs"');
  bodyContent = bodyContent.replaceAll('href="faqs/index.html"', 'href="/faqs"');
  bodyContent = bodyContent.replaceAll('href="../our-services/index.html"', 'href="/our-services"');
  bodyContent = bodyContent.replaceAll('href="our-services/index.html"', 'href="/our-services"');
  bodyContent = bodyContent.replaceAll('href="../our-team/index.html"', 'href="/our-team"');
  bodyContent = bodyContent.replaceAll('href="our-team/index.html"', 'href="/our-team"');

  // Escape backticks and ${} to avoid template literal issues
  bodyContent = bodyContent.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');

  const pageTsxContent = `import React from 'react';

export const metadata = {
  title: \`${pageTitle}\`,
};

const pageHtml = \`${bodyContent}\`;

export default function Page() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: \`document.body.className = "${bodyClass}";\`,
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: pageHtml }} />
    </>
  );
}
`;

  const pageDir = path.join(backendDir, 'app', '(public)', pageName);
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }
  
  const pagePath = path.join(pageDir, 'page.tsx');
  fs.writeFileSync(pagePath, pageTsxContent, 'utf8');
  console.log(`Converted: ${pageName}`);
});
