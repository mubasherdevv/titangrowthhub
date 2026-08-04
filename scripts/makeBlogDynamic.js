const fs = require('fs');
const path = require('path');

const blogPagePath = path.join(__dirname, '../app/(public)/blog/page.tsx');
let fileContent = fs.readFileSync(blogPagePath, 'utf8');

// We want to extract the huge pageHtml template literal string content
// Locate "const pageHtml = `" and the closing "`"
const startStr = 'const pageHtml = `';
const startIdx = fileContent.indexOf(startStr);
const endIdx = fileContent.lastIndexOf('`;');

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not parse pageHtml string in blog page');
  process.exit(1);
}

const rawPageHtml = fileContent.substring(startIdx + startStr.length, endIdx);

// Now, split rawPageHtml around the blog list wrapper
const splitMarker = '<div class="blog__wrapper blog-list-content mt-none-30">';
const splitIndex = rawPageHtml.indexOf(splitMarker);

if (splitIndex === -1) {
  console.error('Could not find split marker in blog page html');
  process.exit(1);
}

const topHtml = rawPageHtml.substring(0, splitIndex + splitMarker.length);

// Find the end index of the blog wrapper. 
// The static pagination starts with '<div class="tx-pagination mt-30">'
const paginationMarker = '<div class="tx-pagination mt-30">';
const paginationIndex = rawPageHtml.indexOf(paginationMarker, splitIndex);

let bottomHtml = '';
if (paginationIndex !== -1) {
  // Let's find the closing tag for the pagination div (</div>)
  const paginationClosingIndex = rawPageHtml.indexOf('</div>', paginationIndex);
  // The next closing </div> corresponds to the blog__wrapper div closing tag
  const wrapperClosingIndex = rawPageHtml.indexOf('</div>', paginationClosingIndex + 6);
  bottomHtml = rawPageHtml.substring(wrapperClosingIndex);
} else {
  // Fallback: split before the sidebar column
  const sidebarMarker = '<div class="col-xxl-4';
  const sidebarIndex = rawPageHtml.indexOf(sidebarMarker, splitIndex);
  // Find the closing </div> of the col-xxl-8 column right before the sidebar
  const colClosingIndex = rawPageHtml.lastIndexOf('</div>', sidebarIndex);
  bottomHtml = rawPageHtml.substring(colClosingIndex);
}

// Escape any backticks and dollar signs in topHtml and bottomHtml to keep them safe inside Next.js template literals
const escapedTopHtml = topHtml.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
const escapedBottomHtml = bottomHtml.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');

const newContent = `import React from 'react';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'Blog – Avista',
};

const topHtml = \`${escapedTopHtml}\`;
const bottomHtml = \`${escapedBottomHtml}\`;

export default async function Page() {
  let blogs: any[] = [];
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'Published')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    if (data) blogs = data;
  } catch (err) {
    console.error('Error fetching blogs from Supabase:', err);
  }

  const blogsListHtml = blogs.length > 0 
    ? blogs.map((blog) => {
        const dateObj = new Date(blog.created_at);
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        const slug = blog.slug.startsWith('/') ? blog.slug : \`/blog/\${blog.slug.replace(/^\\/blog\\//, '')}\`;
        const desc = blog.metaDesc || (blog.content ? blog.content.substring(0, 150) + '...' : '');

        return \`
          <article class="tx-blog-box mt-30">
            <div class="tz-blog-item list-view-item">
              <div class="item-img">
                <img width="1824" height="839" src="/wp-content/uploads/2025/11/p2-img-3.webp" class="img-responsive w-100 wp-post-image" alt="" />
              </div>
              <div class="item-text headline pera-content">
                <div class="item-meta" style="margin-bottom: 10px; display: flex; gap: 15px; font-size: 13px; color: #fd3f00;">
                  <span><i class="fa-regular fa-calendar"></i> \${formattedDate}</span>
                  <span><i class="fa-regular fa-user"></i> avista</span>
                  <span><i class="fa-solid fa-tags"></i> \${blog.category || 'SEO Strategy'}</span>
                </div>
                <h3 class="blog_title" style="font-size: 22px; font-weight: 800; line-height: 1.4; margin-bottom: 15px;">
                  <a href="\${slug}">
                    \${blog.title}
                  </a>
                </h3>
                <p style="margin-bottom: 15px; color: #666; line-height: 1.6;">
                  \${desc}
                </p>
                <a class="read_more" href="\${slug}">Read More <i class="fa-solid fa-angles-right"></i></a>
              </div>
            </div>
          </article>
        \`;
      }).join('\\n')
    : \`<div class="mt-30 text-center" style="padding: 40px; background: #fff; border-radius: 20px;"><h3>No blog posts published yet.</h3></div>\`;

  const finalHtml = \`\${topHtml}\${blogsListHtml}\${bottomHtml}\`;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: \`document.body.className = "blog";\`,
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: finalHtml }} />
    </>
  );
}
`;

fs.writeFileSync(blogPagePath, newContent, 'utf8');
console.log('Successfully made blog list page dynamic!');
