import React from 'react';
import { supabase } from '@/lib/supabase';
import { topHtml, bottomHtml } from './blogTemplates';

export const metadata = {
  title: 'Blog – Avista',
};

export default async function BlogPage() {
  const { data: dbBlogs, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
  }

  const activeBlogs = (dbBlogs || []).filter((blog: any) => blog.status === 'Published');

  const blogsListHtml = activeBlogs.length > 0
    ? activeBlogs.map((blog: any) => {
        const dateObj = new Date(blog.created_at);
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        
        // Match either /blog/slug or slug format
        let slug = blog.slug;
        if (!slug.startsWith('/blog/') && !slug.startsWith('/')) {
          slug = `/blog/${slug}`;
        } else if (slug.startsWith('/')) {
          // If it starts with / but not /blog/, make it /blog/slug
          if (!slug.startsWith('/blog/')) {
            slug = `/blog${slug}`;
          }
        }

        const rawContent = blog.content || '';
        const looksLikeHtml = /<[a-z][\s\S]*>/i.test(rawContent);
        const contentText = looksLikeHtml ? rawContent.replace(/<[^>]*>/g, '') : rawContent;
        const desc = contentText.length > 150 ? contentText.substring(0, 150) + '...' : contentText;

        const featuredImg = blog.featured_image
          ? blog.featured_image
          : '/wp-content/uploads/2025/11/p2-img-3.webp';

        return `
          <article class="tx-blog-box mt-30 type-post status-publish format-standard hentry">
            <div class="tz-blog-item" style="padding: 20px; background: #fff; border-radius: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
              <div class="item-img" style="border-radius: 15px; overflow: hidden; margin-bottom: 20px;">
                <a href="${slug}">
                  <img width="1824" height="839" src="${featuredImg}" class="img-responsive w-100 wp-post-image" alt="${blog.title || ''}" />
                </a>
              </div>
              <div class="item-text headline pera-content">
                <div class="item-meta" style="margin-bottom: 10px; font-size: 13px; color: #fd3f00; display: flex; gap: 15px;">
                  <span><i class="fa-regular fa-calendar"></i> ${formattedDate}</span>
                  <span><i class="fa-regular fa-user"></i> avista</span>
                  <span><i class="fa-solid fa-tags"></i> ${blog.category || 'SEO Strategy'}</span>
                </div>
                <h3 class="blog_title" style="font-size: 22px; font-weight: 800; line-height: 1.4; margin-bottom: 15px;">
                  <a href="${slug}">
                    ${blog.title}
                  </a>
                </h3>
                <p style="margin-bottom: 15px; color: #666; line-height: 1.6;">
                  ${desc}
                </p>
                <a class="read_more" href="${slug}">Read More <i class="fa-solid fa-angles-right"></i></a>
              </div>
            </div>
          </article>
        `;
      }).join('\n')
    : `<div class="mt-30 text-center" style="padding: 40px; background: #fff; border-radius: 20px;"><h3>No blog posts published yet.</h3></div>`;

  const finalHtml = `${topHtml}${blogsListHtml}${bottomHtml}`;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.body.className = "blog";`,
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: finalHtml }} />
    </>
  );
}
