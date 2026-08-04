const fs = require('fs');
const path = require('path');
const HTMLtoJSX = require('html-to-jsx');

const htmlPath = path.join(process.cwd(), 'public', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const bodyStart = html.indexOf('<body');
const bodyStartClose = html.indexOf('>', bodyStart);
const bodyEnd = html.indexOf('</body>');

let bodyContent = html.substring(bodyStartClose + 1, bodyEnd);

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
bodyContent = bodyContent.replaceAll('href="../faqs/index.html"', 'href="/faqs"');
bodyContent = bodyContent.replaceAll('href="../our-services/index.html"', 'href="/our-services"');
bodyContent = bodyContent.replaceAll('href="../our-team/index.html"', 'href="/our-team"');

let jsx = HTMLtoJSX(bodyContent);

const pageTsxContent = `import React from 'react';

export const metadata = {
  title: 'Avista – Digital Agency & Portfolio WordPress Theme',
  description: 'Driving Growth Through Digital Excellence',
};

export default function HomePage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: \`document.body.className = "home page-template page-template-elementor_header_footer page page-id-17 theme-avista elementor-default elementor-template-full-width elementor-kit-8 elementor-page elementor-page-17";\`,
        }}
      />
      ${jsx}
    </>
  );
}
`;

const pagePath = path.join(process.cwd(), 'app', '(public)', 'page.tsx');
fs.writeFileSync(pagePath, pageTsxContent, 'utf8');
console.log('Conversion successful!');
