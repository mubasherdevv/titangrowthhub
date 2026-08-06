import React from 'react';
import { supabase } from '@/lib/supabase';
import { topHtml, bottomHtml } from './blogTemplates';
import { getPageMeta } from '@/lib/getPageMeta';
import { blogListingSchema } from '@/lib/pageSchemas';
import { getSiteSettings } from '@/lib/getSiteSettings';
import { injectDynamicSettings } from '@/lib/htmlHelper';

export async function generateMetadata() {
  const { title, description } = await getPageMeta(
    'blog',
    'Blog – Titan Growth Hub',
    'Read the latest SEO tips, digital marketing strategies, and growth hacks from our expert team.'
  );
  return { title, description };
}

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
              <div class="item-img" style="border-radius: 15px; overflow: hidden; margin-bottom: 20px; aspect-ratio: 16/9; max-height: 350px;">
                <a href="${slug}">
                  <img loading="lazy" src="${featuredImg}" class="img-responsive w-100 wp-post-image" alt="${blog.title || ''}" style="width: 100%; height: 100%; object-fit: cover; object-position: center; display: block;" />
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

  // Build recent posts HTML for sidebar
  const recentBlogs = activeBlogs.slice(0, 3);
  let recentPostsHtml = '';
  if (recentBlogs.length > 0) {
    recentPostsHtml = recentBlogs.map((b: any) => {
      const bDate = new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
      const bImg = b.featured_image || '/wp-content/uploads/2025/11/p2-img-3.webp';
      
      let cleanSlug = b.slug;
      if (!cleanSlug.startsWith('/blog/') && !cleanSlug.startsWith('/')) {
        cleanSlug = `/blog/${cleanSlug}`;
      } else if (cleanSlug.startsWith('/')) {
        if (!cleanSlug.startsWith('/blog/')) {
          cleanSlug = `/blog${cleanSlug}`;
        }
      }

      return `
        <div class="tz-rcw-item has-thumbnail">
          <div class="item-img" style="border-radius: 8px; overflow: hidden; width: 65px; height: 65px; flex-shrink: 0;">
            <a href="${cleanSlug}">
              <img loading="lazy" src="${bImg}" class="sidebar-post-img wp-post-image" alt="Titan Growth Hub Image" style="width: 100%; height: 100%; object-fit: cover;" />
            </a>
          </div>
          <div class="item-text headline" style="padding-left: 12px;">
            <div class="item-meta" style="margin-bottom: 4px; font-size: 11px;">
              <a href="${cleanSlug}" style="color: #fd3f00; font-weight: 500;">
                <i class="fa-regular fa-calendar"></i> ${bDate}
              </a>
            </div>
            <h3 style="font-size: 13px; font-weight: 700; line-height: 1.4; margin: 0; font-family: 'Outfit';">
              <a href="${cleanSlug}" style="color: #27272a; text-decoration: none;">${b.title}</a>
            </h3>
          </div>
        </div>
      `;
    }).join('\n');
  }

  // Construct Custom Sidebar HTML matching details view exactly
  const customSidebarHtml = `
    <div class="tx-sidebarWrapper tz-ser-sidebar saas-sidebar" style="position: sticky; top: 100px;">
      <!-- Search widget -->
      <div id="search-2" class="tx-blog-widget widget tz-sidebar-widget headline widget_search">
        <h4 class="widget-title">Search</h4>
        <div class="search-widget">
          <form class="tx-search-widget tx-input-field bs-sidebar-search" action="/blog" method="get">
            <input type="search" required name="s" placeholder="Search..." class="bs-sidebar-search-input" />
            <button type="submit" aria-label="search" class="bs-sidebar-search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>
      </div>

      <!-- Recent Posts widget -->
      <div id="tc-latest-posts-2" class="tx-blog-widget widget tz-sidebar-widget headline widget_tc-latest-posts">
        <h4 class="widget-title">Recent Posts</h4>
        <div class="recent-post-widget">
          ${recentPostsHtml}
        </div>
      </div>

      <!-- Tag Cloud widget -->
      <div id="tag_cloud-2" class="tx-blog-widget widget tz-sidebar-widget headline widget_tag_cloud">
        <h4 class="widget-title">Popular Tags</h4>
        <div class="tagcloud">
          <a href="/blog?tag=marketing" class="tag-cloud-link" style="font-size: 14px;">Marketing</a>
          <a href="/blog?tag=digital" class="tag-cloud-link" style="font-size: 14px;">Digital</a>
          <a href="/blog?tag=technology" class="tag-cloud-link" style="font-size: 14px;">Technology</a>
          <a href="/blog?tag=business" class="tag-cloud-link" style="font-size: 14px;">Business</a>
        </div>
      </div>

      <!-- Category widget -->
      <div id="custom_cat_widget-2" class="tx-blog-widget widget tz-sidebar-widget headline tx-cat-widget">
        <h4 class="widget-title">Category</h4>
        <div class="tx-cat-widget category-widget ul-li-block">
          <ul class="tx-cat-list bs-sidebar-categories">
            <li><a href="/blog?category=Brand%20Design%20Identity"><span class="text">Brand Design Identity</span><span class="number">(3)</span></a></li>
            <li><a href="/blog?category=Clock%20Fly%20Strategy"><span class="text">Clock Fly Strategy</span><span class="number">(2)</span></a></li>
            <li><a href="/blog?category=Digital%20Marketing"><span class="text">Digital Marketing</span><span class="number">(4)</span></a></li>
            <li><a href="/blog?category=SEO%20Strategy"><span class="text">SEO Strategy</span><span class="number">(1)</span></a></li>
          </ul>
        </div>
      </div>
    </div>
  `;

  // Find where the footer starts in bottomHtml
  const footerIndex = bottomHtml.indexOf('<div data-elementor-type="wp-post" data-elementor-id="2686"');
  const footerHtml = footerIndex !== -1 ? bottomHtml.substring(footerIndex) : '';

  // Construct newBottomHtml cleanly to avoid duplicates and leaks
  const newBottomHtml = `
      </div>
    </div>
    <div class="col-xxl-4 col-xl-4 col-lg-4 mt-30 mt-lg-0">
      ${customSidebarHtml}
    </div>
    </div>
    </div>
    </div>
    ${footerHtml}
  `;

  const finalHtml = `${topHtml}${blogsListHtml}${newBottomHtml}`;
  const settings = await getSiteSettings();
  const injectedHtml = injectDynamicSettings(finalHtml, settings);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingSchema) }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `document.body.className = "blog";`,
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: injectedHtml }} />
    </>
  );
}
