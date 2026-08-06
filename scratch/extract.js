const fs = require('fs');
const content = fs.readFileSync('app/(public)/page.tsx', 'utf8');

const regex = /<script\s+src="([^"]+)"/gi;
let match;
let scripts = [];
while ((match = regex.exec(content)) !== null) {
    scripts.push(match[1]);
}
console.log(scripts.join('\n'));
