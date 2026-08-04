const fs = require('fs');
const path = require('path');

const pageName = 'about';
const backendDir = process.cwd();
const gameDir = path.join(backendDir, '..');

const htmlPath = path.join(gameDir, pageName, 'index.html');
if (!fs.existsSync(htmlPath)) {
  console.log('Missing:', htmlPath);
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');
const bodyStart = html.indexOf('<body');
const bodyStartClose = html.indexOf('>', bodyStart);
const bodyEnd = html.indexOf('</body>');

let bodyContent = html.substring(bodyStartClose + 1, bodyEnd);

let bodyClass = 'home';
const bodyClassMatch = html.match(/<body[^>]*class=["']([^"']*)["']/i);
if (bodyClassMatch) {
  bodyClass = bodyClassMatch[1];
}

let pageTitle = 'Avista – Digital Agency & Portfolio WordPress Theme';
const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
if (titleMatch) {
  pageTitle = titleMatch[1].trim();
}

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

// Fix specific links mapped to # for now
bodyContent = bodyContent.replaceAll('href="services/smart-schedule-control/index.html"', 'href="#"');
bodyContent = bodyContent.replaceAll('href="teams/melissa-lee/index.html"', 'href="#"');
bodyContent = bodyContent.replaceAll('href="shop/index.html"', 'href="#"');
bodyContent = bodyContent.replaceAll('href="product/black-headphone/index.html"', 'href="#"');
bodyContent = bodyContent.replaceAll('href="cart/index.html"', 'href="#"');
bodyContent = bodyContent.replaceAll('href="checkout/index.html"', 'href="#"');
bodyContent = bodyContent.replaceAll('href="pricing/index.html"', 'href="#"');
bodyContent = bodyContent.replaceAll('href="how-businesses-can-leverage-data-for-smarter-decisions/index.html"', 'href="#"');


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
console.log('Converted about page!');
