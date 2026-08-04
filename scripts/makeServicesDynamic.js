const fs = require('fs');
const path = require('path');

const servicesPagePath = path.join(__dirname, '../app/(public)/our-services/page.tsx');
let fileContent = fs.readFileSync(servicesPagePath, 'utf8');

// Normalize line endings to LF
fileContent = fileContent.replace(/\r\n/g, '\n');

const startStr = 'const pageHtml = `';
const startIdx = fileContent.indexOf(startStr);
const endIdx = fileContent.lastIndexOf('`;');

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not parse pageHtml string in services page');
  process.exit(1);
}

const rawPageHtml = fileContent.substring(startIdx + startStr.length, endIdx);

// Locate the services list wrapper
const splitMarker = '<div class="as-services-1-wrap">';
const splitIndex = rawPageHtml.indexOf(splitMarker);

if (splitIndex === -1) {
  console.error('Could not find split marker in services page HTML');
  process.exit(1);
}

const topHtml = rawPageHtml.substring(0, splitIndex + splitMarker.length);

// Find the end index of the services wrapper. 
// It ends with:
// '</div>\n            </div>\n        </div>\n    </div>\n</section>' or similar.
// Let's find the closing </div> of the services wrap. 
// It is followed by '            </div>' which is the closure of the main services container.
const wrapperClosingIndex = rawPageHtml.indexOf('</div>\n            </div>\n        </div>\n    </div>\n</section>', splitIndex);

let bottomHtml = '';
if (wrapperClosingIndex !== -1) {
  bottomHtml = rawPageHtml.substring(wrapperClosingIndex);
} else {
  // Let's find the elementor section closing
  const elementorClosingIndex = rawPageHtml.indexOf('</div>\n\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t</div>', splitIndex);
  if (elementorClosingIndex !== -1) {
    bottomHtml = rawPageHtml.substring(elementorClosingIndex);
  } else {
    // Fallback: search for elementor footer type
    const footerMarker = '<div data-elementor-type="wp-post" data-elementor-id="2686"';
    const footerIndex = rawPageHtml.indexOf(footerMarker, splitIndex);
    const closingIndex = rawPageHtml.lastIndexOf('</div>', footerIndex);
    bottomHtml = rawPageHtml.substring(closingIndex);
  }
}

const escapedTopHtml = topHtml.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
const escapedBottomHtml = bottomHtml.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');

const newContent = `import React from 'react';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'Our Services – Avista',
};

const topHtml = \`${escapedTopHtml}\`;
const bottomHtml = \`${escapedBottomHtml}\`;

export default async function Page() {
  let services: any[] = [];
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('status', 'Published')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    if (data) services = data;
  } catch (err) {
    console.error('Error fetching services from Supabase:', err);
  }

  const servicesListHtml = services.length > 0
    ? services.map((service, index) => {
        const slug = service.slug.startsWith('/') ? service.slug : \`/services/\${service.slug.replace(/^\\/services\\//, '')}\`;
        const count = String(index + 1).padStart(2, '0');
        
        const tags = service.category === 'Technical' 
          ? ['Performance', 'SEO Audit', 'Optimization', 'Technical Fixes']
          : ['Responsive Design', 'Branding', 'Market Research', 'SEO Copywriting'];

        const tagsHtml = tags.map(tag => \`<li class="as-p-1">\${tag}</li>\`).join('\\n');
        const logoNum = (index % 4) + 1;

        return \`
          <div class="as-services-1-item">
            <ul class="wa-ul item-tags">
              \${tagsHtml}
            </ul>
            <img class="star-icon" src="/wp-content/uploads/2025/10/star-icon.webp" alt="star-icon">
            <div class="icon-elm">
              <img src="/wp-content/uploads/2025/10/s1-logo-\${logoNum}.webp" alt="s1-logo-\${logoNum}">
            </div>
            <img class="star-icon" src="/wp-content/uploads/2025/10/star-icon.webp" alt="star-icon">
            <div class="right-content wa-fix">
              <div class="right-content-bg-img wa-fix wa-img-cover">
                <img src="/wp-content/uploads/2025/11/s1-card-img-\${logoNum}.webp" alt="s1-card-img-\${logoNum}">
              </div>
              <div class="title-wrap">
                <h4 class="as-h-1 title">
                  <a href="\${slug}">
                    \${service.title}
                  </a>
                </h4>
                <h4 class="as-h-1 title">
                  <a href="\${slug}">
                    <img src="/wp-content/uploads/2025/10/right-up.webp" alt="right-up">
                    \${service.title}
                  </a>
                </h4>
              </div>
              <p class="as-p-1 number">
                {\${count}}
              </p>
            </div>
          </div>
        \`;
      }).join('\\n')
    : \`<div class="w-100 text-center" style="padding: 40px; background: #fff; border-radius: 20px; grid-column: span 2;"><h3>No services published yet.</h3></div>\`;

  const finalHtml = \`\${topHtml}\${servicesListHtml}\${bottomHtml}\`;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: \`document.body.className = "services";\`,
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: finalHtml }} />
    </>
  );
}
`;

fs.writeFileSync(servicesPagePath, newContent, 'utf8');
console.log('Successfully made services page dynamic!');
