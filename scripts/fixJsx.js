const fs = require('fs');
const path = require('path');

const pagePath = path.join(process.cwd(), 'app', '(public)', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// Fix unclosed tags
content = content.replace(/<(img|hr|br|input|meta|link)([^>]*?)(?<!\/)>/g, '<$1$2 />');

fs.writeFileSync(pagePath, content, 'utf8');
console.log('Fixed self-closing tags');
