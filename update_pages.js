const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const appPublicDir = path.join(__dirname, 'app', '(public)');

const pagesToUpdate = [
    { src: 'about/index.html', dest: 'about/page.tsx', schema: 'aboutPageSchema', className: 'page-template-elementor_header_footer' },
    { src: 'blog/index.html', dest: 'blog/blogTemplates.tsx', schema: 'blogPageSchema', className: 'page-template-elementor_header_footer' },
    { src: 'contact-us/index.html', dest: 'contact-us/page.tsx', schema: 'contactPageSchema', className: 'page-template-elementor_header_footer' },
    { src: 'faqs/index.html', dest: 'faqs/page.tsx', schema: 'faqPageSchema', className: 'page-template-elementor_header_footer' },
    { src: 'our-services/index.html', dest: 'our-services/page.tsx', schema: 'servicesPageSchema', className: 'page-template-elementor_header_footer' },
    { src: 'our-team/index.html', dest: 'our-team/page.tsx', schema: 'teamPageSchema', className: 'page-template-elementor_header_footer' }
];

async function updatePages() {
    for (const page of pagesToUpdate) {
        const srcPath = path.join(publicDir, page.src);
        const destPath = path.join(appPublicDir, page.dest);

        if (!fs.existsSync(srcPath)) {
            console.log(`Skipping ${page.src} - file not found in public/`);
            continue;
        }

        console.log(`Processing ${page.src}...`);
        const htmlContent = fs.readFileSync(srcPath, 'utf8');

        // Extract everything from <div class="page-wrapper"> to the end before </body>
        const startIndex = htmlContent.indexOf('<div class="page-wrapper">');
        let endIndex = htmlContent.indexOf('</body>');
        if (endIndex === -1) endIndex = htmlContent.length;

        if (startIndex === -1) {
            console.error(`Could not find <div class="page-wrapper"> in ${page.src}`);
            continue;
        }

        const extractedHtml = htmlContent.substring(startIndex, endIndex).trim();

        if (fs.existsSync(destPath)) {
            let tsxContent = fs.readFileSync(destPath, 'utf8');
            
            // We need to replace the `const pageHtml = \`...\`;` block
            const blockStart = tsxContent.indexOf('const pageHtml = `');
            const blockEnd = tsxContent.indexOf('`;\n\nexport default', blockStart);
            const blockEndAlt = tsxContent.indexOf('`;\r\n\r\nexport default', blockStart);
            const blockEndAlt2 = tsxContent.indexOf('`;\nexport default', blockStart);
            
            let actualBlockEnd = blockEnd;
            if (actualBlockEnd === -1) actualBlockEnd = blockEndAlt;
            if (actualBlockEnd === -1) actualBlockEnd = blockEndAlt2;

            if (blockStart !== -1 && actualBlockEnd !== -1) {
                // Escape backticks and ${} to prevent template literal breakage in React
                let safeHtml = extractedHtml.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

                const newTsxContent = tsxContent.substring(0, blockStart) +
                                      'const pageHtml = `\n' + safeHtml + '\n' +
                                      tsxContent.substring(actualBlockEnd);
                
                fs.writeFileSync(destPath, newTsxContent);
                console.log(`Updated ${page.dest} successfully.`);
            } else {
                console.error(`Could not find pageHtml block in ${page.dest}`);
            }
        }
    }
}

updatePages().catch(console.error);
