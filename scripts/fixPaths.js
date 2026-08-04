const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '../app/(public)/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

content = content.replaceAll('href="our-services/index.html"', 'href="/our-services"');
content = content.replaceAll('href="services/smart-schedule-control/index.html"', 'href="#"');
content = content.replaceAll('href="our-team/index.html"', 'href="/our-team"');
content = content.replaceAll('href="teams/melissa-lee/index.html"', 'href="#"');
content = content.replaceAll('href="faqs/index.html"', 'href="/faqs"');
content = content.replaceAll('href="shop/index.html"', 'href="#"');
content = content.replaceAll('href="product/black-headphone/index.html"', 'href="#"');
content = content.replaceAll('href="cart/index.html"', 'href="#"');
content = content.replaceAll('href="checkout/index.html"', 'href="#"');
content = content.replaceAll('href="pricing/index.html"', 'href="#"');
content = content.replaceAll('href="how-businesses-can-leverage-data-for-smarter-decisions/index.html"', 'href="#"');
content = content.replaceAll('href="contact-us/index.html"', 'href="/contact-us"');
content = content.replaceAll('href="about/index.html"', 'href="/about"');

fs.writeFileSync(pagePath, content, 'utf8');
console.log('Fixed paths in page.tsx');
