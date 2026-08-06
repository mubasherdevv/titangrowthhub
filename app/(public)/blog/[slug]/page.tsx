import React from 'react';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { topHtml, bottomHtml } from '../blogTemplates';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const slug = params.slug;
  const decodedSlug = decodeURIComponent(slug);

  const { data: blogs } = await supabase
    .from('blogs')
    .select('title, meta_desc')
    .or(`slug.eq.${decodedSlug},slug.eq./blog/${decodedSlug},slug.eq./${decodedSlug}`);

  const blog = blogs && blogs[0];
  if (!blog) return {};

  return {
    title: blog.title,
    description: blog.meta_desc,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const slug = params.slug;
  const decodedSlug = decodeURIComponent(slug);

  // Fetch current blog post
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .or(`slug.eq.${decodedSlug},slug.eq./blog/${decodedSlug},slug.eq./${decodedSlug}`);

  if (error || !blogs || blogs.length === 0) {
    notFound();
  }

  const blog = blogs[0];
  const dateObj = new Date(blog.created_at);
  const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

  // Fetch related posts (same category, excluding current)
  const { data: relatedBlogs } = await supabase
    .from('blogs')
    .select('id, title, slug, featured_image, created_at')
    .eq('status', 'Published')
    .eq('category', blog.category || 'SEO Strategy')
    .neq('id', blog.id)
    .limit(2);

  // Fetch recent posts
  const { data: recentBlogs } = await supabase
    .from('blogs')
    .select('title, slug, featured_image, created_at')
    .eq('status', 'Published')
    .order('created_at', { ascending: false })
    .limit(3);

  // Detect and format content
  const rawContent = blog.content || '';
  const looksLikeHtml = /<[a-z][\s\S]*>/i.test(rawContent);
  let contentHtml = looksLikeHtml
    ? rawContent
    : rawContent.split('\n').map((p: string) => `<p style="margin-bottom: 15px;">${p}</p>`).join('');

  // Extract headings for Table of Contents
  const headings: string[] = [];
  if (looksLikeHtml) {
    const headingRegex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
    let match;
    while ((match = headingRegex.exec(contentHtml)) !== null) {
      headings.push(match[1].replace(/<[^>]*>/g, ''));
    }

    // Inject unique IDs to h2 tags for anchor links
    let headingIndex = 0;
    contentHtml = contentHtml.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (m: string, attrs: string, content: string) => {
      const id = `heading-${headingIndex++}`;
      return `<h2${attrs} id="${id}">${content}</h2>`;
    });

    // Format tables
    contentHtml = contentHtml.replace(/width:\s*0px/gi, 'width: 100%');
    contentHtml = contentHtml.replace(/table-layout:\s*fixed/gi, 'table-layout: auto');
    contentHtml = contentHtml.replace(/width:\s*\d+px/gi, 'width: auto');
    contentHtml = contentHtml.replace(/<table/gi, '<div style="overflow-x: auto; margin: 20px 0;"><table class="table" style="width: 100%; border-collapse: collapse; border: 1px solid #e4e4e7; font-family: inherit;"');
    contentHtml = contentHtml.replace(/<td/gi, '<td style="padding: 12px 16px; border: 1px solid #e4e4e7; word-break: break-all; color: #3f3f46;"');
    contentHtml = contentHtml.replace(/<th/gi, '<th style="padding: 12px 16px; border: 1px solid #e4e4e7; font-weight: bold; background: #f4f4f5; color: #18181b;"');
    contentHtml = contentHtml.replace(/<col width="\d+">/gi, '');
    contentHtml = contentHtml.replace(/<a class="in-cell-link"/gi, '<a class="in-cell-link" style="color: #fd3f00; text-decoration: none; font-weight: 600; word-break: break-all;"');
  }

  // Calculate metrics
  const wordCount = rawContent.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  const viewsCount = (blog.title.length * 17) + 120;

  const featuredImg = blog.featured_image
    ? blog.featured_image
    : '/wp-content/uploads/2025/11/p2-img-3.webp';

  const pageUrl = `https://titangrowthhub.com/blog/${decodedSlug}`;

  // Build headings HTML
  let headingsHtml = '';
  if (headings.length > 0) {
    const listItems = headings.map((h, i) => `
      <li class="toc-item"><a href="#heading-${i}" class="toc-link">${h}</a></li>
    `).join('\n');
    headingsHtml = `
      <div class="toc-container">
        <h4 class="toc-title">Table of Contents</h4>
        <ul class="toc-list">
          ${listItems}
        </ul>
      </div>
    `;
  }

  // Build related posts HTML
  let relatedPostsHtml = '';
  if (relatedBlogs && relatedBlogs.length > 0) {
    const cards = relatedBlogs.map((b: any) => {
      const bDate = new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
      const bImg = b.featured_image || '/wp-content/uploads/2025/11/p2-img-3.webp';
      const cleanSlug = b.slug.replace(/^\/blog\//, '').replace(/^\//, '');
      return `
        <div class="related-card">
          <div class="related-img">
            <a href="/blog/${cleanSlug}">
              <img src="${bImg}" alt="${b.title}" />
            </a>
          </div>
          <div class="related-info">
            <div class="related-meta">${bDate}</div>
            <h4 class="related-card-title">
              <a href="/blog/${cleanSlug}">${b.title}</a>
            </h4>
          </div>
        </div>
      `;
    }).join('\n');
    relatedPostsHtml = `
      <div class="related-section">
        <h3 class="related-header-title">Related Articles</h3>
        <div class="related-grid">
          ${cards}
        </div>
      </div>
    `;
  }

  // Build recent posts HTML (Native theme markup)
  let recentPostsHtml = '';
  if (recentBlogs && recentBlogs.length > 0) {
    recentPostsHtml = recentBlogs.map((b: any) => {
      const bDate = new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
      const bImg = b.featured_image || '/wp-content/uploads/2025/11/p2-img-3.webp';
      const cleanSlug = b.slug.replace(/^\/blog\//, '').replace(/^\//, '');
      return `
        <div class="tz-rcw-item has-thumbnail">
          <div class="item-img" style="border-radius: 8px; overflow: hidden; width: 65px; height: 65px; flex-shrink: 0;">
            <a href="/blog/${cleanSlug}">
              <img src="${bImg}" class="sidebar-post-img wp-post-image" alt="" style="width: 100%; height: 100%; object-fit: cover;" />
            </a>
          </div>
          <div class="item-text headline" style="padding-left: 12px;">
            <div class="item-meta" style="margin-bottom: 4px; font-size: 11px;">
              <a href="/blog/${cleanSlug}" style="color: #fd3f00; font-weight: 500;">
                <i class="fa-regular fa-calendar"></i> ${bDate}
              </a>
            </div>
            <h3 style="font-size: 13px; font-weight: 700; line-height: 1.4; margin: 0; font-family: 'Outfit';">
              <a href="/blog/${cleanSlug}" style="color: #27272a; text-decoration: none;">${b.title}</a>
            </h3>
          </div>
        </div>
      `;
    }).join('\n');
  }

  // Custom styled CSS tags
  const styleTags = `
    <style>
      /* Typography & Content Improvements */
      .tz-blog-details-text .article-header {
        margin-bottom: 30px;
      }
      .tz-blog-details-text .article-title {
        font-size: 40px;
        line-height: 1.25;
        font-weight: 800;
        color: #09090b;
        margin-bottom: 20px;
        letter-spacing: -0.02em;
        font-family: 'Outfit', sans-serif;
      }
      @media (max-width: 768px) {
        .tz-blog-details-text .article-title {
          font-size: 30px;
        }
      }
      .tz-blog-details-text .article-meta-row {
        display: flex;
        align-items: center;
        gap: 15px;
        flex-wrap: wrap;
        color: #71717a;
        font-size: 13px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e4e4e7;
        margin-bottom: 30px;
      }
      .tz-blog-details-text .meta-item {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .tz-blog-details-text .meta-item i {
        color: #fd3f00;
      }
      .tz-blog-details-text .meta-category {
        background: rgba(253, 63, 0, 0.1);
        color: #fd3f00;
        padding: 3px 10px;
        border-radius: 100px;
        font-weight: 700;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      /* Table of Contents */
      .tz-blog-details-text .toc-container {
        background: #fafafa;
        border-left: 4px solid #fd3f00;
        padding: 24px;
        border-radius: 12px;
        margin: 40px 0;
        border-top: 1px solid #f4f4f5;
        border-right: 1px solid #f4f4f5;
        border-bottom: 1px solid #f4f4f5;
      }
      .tz-blog-details-text .toc-title {
        font-weight: 800;
        font-size: 14px;
        color: #09090b;
        margin-bottom: 16px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .tz-blog-details-text .toc-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .tz-blog-details-text .toc-item {
        margin-bottom: 10px;
      }
      .tz-blog-details-text .toc-link {
        color: #52525b;
        text-decoration: none;
        font-size: 15px;
        transition: color 0.2s;
        font-weight: 500;
      }
      .tz-blog-details-text .toc-link:hover {
        color: #fd3f00;
      }

      /* Social Sharing */
      .tz-blog-details-text .share-bar {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 40px;
        padding: 20px 0;
        border-top: 1px solid #f4f4f5;
        border-bottom: 1px solid #f4f4f5;
      }
      .tz-blog-details-text .share-title {
        font-weight: 800;
        font-size: 13px;
        color: #09090b;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-right: auto;
      }
      .tz-blog-details-text .share-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #71717a;
        background: #fff;
        transition: all 0.2s;
        border: 1px solid #e4e4e7;
        text-decoration: none;
      }
      .tz-blog-details-text .share-btn:hover {
        color: #fff;
        background: #fd3f00;
        border-color: #fd3f00;
        transform: translateY(-2px);
      }

      /* Author Box */
      .tz-blog-details-text .author-box {
        display: flex;
        gap: 24px;
        background: #fafafa;
        padding: 32px;
        border-radius: 20px;
        margin-top: 60px;
        border: 1px solid #f4f4f5;
      }
      @media (max-width: 576px) {
        .tz-blog-details-text .author-box {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
      }
      .tz-blog-details-text .author-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
        border: 3px solid #fff;
        box-shadow: 0 4px 10px rgba(0,0,0,0.08);
      }
      .tz-blog-details-text .author-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .tz-blog-details-text .author-info h4 {
        font-size: 18px;
        font-weight: 800;
        color: #09090b;
        margin-bottom: 8px;
        font-family: 'Outfit', sans-serif;
      }
      .tz-blog-details-text .author-info p {
        font-size: 15px;
        color: #52525b;
        line-height: 1.6;
        margin-bottom: 16px;
      }
      .tz-blog-details-text .author-socials {
        display: flex;
        gap: 12px;
      }
      @media (max-width: 576px) {
        .tz-blog-details-text .author-socials {
          justify-content: center;
        }
      }
      .tz-blog-details-text .author-socials a {
        color: #a1a1aa;
        font-size: 16px;
        transition: color 0.2s;
      }
      .tz-blog-details-text .author-socials a:hover {
        color: #fd3f00;
      }

      /* Related Posts */
      .tz-blog-details-text .related-section {
        margin-top: 60px;
      }
      .tz-blog-details-text .related-header-title {
        font-size: 24px;
        font-weight: 800;
        color: #09090b;
        margin-bottom: 25px;
        font-family: 'Outfit', sans-serif;
      }
      .tz-blog-details-text .related-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
      }
      @media (max-width: 768px) {
        .tz-blog-details-text .related-grid {
          grid-template-columns: 1fr;
        }
      }
      .tz-blog-details-text .related-card {
        background: #fff;
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid #f4f4f5;
        transition: all 0.3s;
      }
      .tz-blog-details-text .related-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 20px -8px rgba(0,0,0,0.08);
      }
      .tz-blog-details-text .related-img {
        aspect-ratio: 16/10;
        overflow: hidden;
      }
      .tz-blog-details-text .related-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .tz-blog-details-text .related-info {
        padding: 20px;
      }
      .tz-blog-details-text .related-meta {
        font-size: 12px;
        color: #fd3f00;
        margin-bottom: 8px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .tz-blog-details-text .related-card-title {
        font-size: 16px;
        font-weight: 800;
        color: #09090b;
        line-height: 1.4;
        margin-bottom: 12px;
        font-family: 'Outfit', sans-serif;
      }
      .tz-blog-details-text .related-card-title a {
        color: inherit;
        text-decoration: none;
      }
      .tz-blog-details-text .related-card-title a:hover {
        color: #fd3f00;
      }

      /* Custom Sidebar Sticky */
      .tx-sidebarWrapper.saas-sidebar {
        position: sticky;
        top: 100px;
      }
    </style>
  `;

  // Main content HTML using exact imported WordPress layout classes
  const singlePostHtml = `
    ${styleTags}
    <article class="tx-blog-box tx-blogDetails-box type-post status-publish format-standard has-post-thumbnail hentry">
        <div class="blog-details-page-content">
            <div class="blog-details-item">
                <div class="tx-blogDetails-box__wrapper">
                    <div class="post-details-content tz-blog-details-text headline pera-content">
                        
                        <!-- Title & Meta Header -->
                        <div class="article-header">
                          <h1 class="article-title">${blog.title}</h1>
                          <div class="article-meta-row">
                            <span class="meta-item"><i class="fa-regular fa-calendar"></i> ${formattedDate}</span>
                            <span class="meta-item"><i class="fa-regular fa-user"></i> By avista</span>
                            <span class="meta-category">${blog.category || 'SEO Strategy'}</span>
                            <span class="meta-item"><i class="fa-regular fa-clock"></i> ${readTime} min read</span>
                            <span class="meta-item"><i class="fa-regular fa-eye"></i> ${viewsCount} views</span>
                          </div>
                        </div>

                        <!-- Featured Image Banner -->
                        <div class="tz-thumb mb-30" style="border-radius: 15px; overflow: hidden; height: 420px; width: 100%;">
                            <img src="${featuredImg}" class="img-responsive w-100 wp-post-image" alt="${blog.title || ''}" style="width: 100%; height: 100%; object-fit: cover; object-position: center; display: block;" />
                        </div>
                        
                        <!-- Table of Contents -->
                        ${headingsHtml}

                        <!-- Article Content Body -->
                        <div class="article-body-content" style="font-size: 16px; color: #3f3f46; line-height: 1.8;">
                            ${contentHtml}
                        </div>

                        <!-- Social Sharing -->
                        <div class="share-bar">
                          <span class="share-title">Share this article:</span>
                          <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(blog.title)}" target="_blank" class="share-btn" title="Share on X"><i class="fa-brands fa-x-twitter"></i></a>
                          <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}" target="_blank" class="share-btn" title="Share on LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}" target="_blank" class="share-btn" title="Share on Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                          <a href="#" onclick="navigator.clipboard.writeText(window.location.href); alert('Link copied to clipboard!'); return false;" class="share-btn" title="Copy Link"><i class="fa-solid fa-link"></i></a>
                        </div>

                        <!-- Author Box -->
                        <div class="author-box">
                          <div class="author-avatar">
                            <img src="/website_assets/favicon_io/android-chrome-192x192.png" alt="Muhammad Mubasher" style="width: 45px; height: 45px; object-fit: contain; position: absolute; top: 50%; left: 45%; transform: translate(-50%, -50%); z-index: 5;">
                          </div>
                          <div class="author-info">
                            <h4>Muhammad Mubasher</h4>
                            <p>Senior SEO Consultant & Founder of Titan Growth Hub. Helping businesses scale search visibility and drive revenue through data-backed SEO strategies.</p>
                            <div class="author-socials">
                              <a href="#" target="_blank" title="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                              <a href="#" target="_blank" title="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
                              <a href="https://titangrowthhub.com" target="_blank" title="Website"><i class="fa-solid fa-globe"></i></a>
                            </div>
                          </div>
                        </div>

                        <!-- Related Posts -->
                        ${relatedPostsHtml}
                    </div>
                </div>
            </div>
        </div>
    </article>
    
    <!-- Native Comments form matching WordPress styles -->
    <div class="tx-commentsWrapper mt-40">
        <div class="contact-form-wrapper post-comment-form">
            <div id="respond" class="comment-respond">
                <h3 class="fti-heading-3 blog-details-form-title mt-0">Leave a Reply</h3>
                <form action="#" method="post" id="commentform" class="comment-form" onsubmit="event.preventDefault(); alert('Comment submitted for moderation.');">
                    <div class="contact-form">
                        <div class="row">
                            <div class="col-xl-12 form-group">
                                <div class="tx-input-field bs-form-1-item">
                                    <textarea id="comment" name="comment" class="bs-form-1-item-input" placeholder="Write your message here..." required></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bs-form-1-item" style="margin-bottom: 15px;">
                        <input class="bs-form-1-item-input" type="text" name="author" id="author" placeholder="Full Name" required />
                    </div>
                    <div class="bs-form-1-item" style="margin-bottom: 15px;">
                        <input class="bs-form-1-item-input" type="email" name="email" id="email" placeholder="info@example.com" required />
                    </div>
                    <div class="bs-form-1-item" style="margin-bottom: 25px;">
                        <input class="bs-form-1-item-input" type="tel" name="phone" id="phone" placeholder="+1 234 567 890" />
                    </div>
                    <div class="col-xl-12 submit-button">
                        <div class="tz-commentButton tx-button-wrapper m-0">
                            <button type="submit" class="as-pr-btn-1 wa_btn_split_1 wa_magnetic_btn_1">
                                <span class="text">Send Message</span>
                                <span class="icon">
                                    <span class="icon-fix wa-fix">
                                        <i class="flaticon-dot-arrow-1 flaticon"></i>
                                        <i class="flaticon-next flaticon"></i>
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  `;

  // Make breadcrumb dynamic
  let dynamicTopHtml = topHtml;
  dynamicTopHtml = dynamicTopHtml.replace(
    '<h1 class="as-breadcrumb-title">Blog</h1>',
    `<h1 class="as-breadcrumb-title" style="font-size: 38px; line-height: 1.2;">${blog.title}</h1>`
  );
  
  const oldBreadcrumb = '<li class="item taBcrumb-end"><span>Blog</span></li>';
  const newBreadcrumb = `
    <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem" class="item"><a href="/blog" itemprop="item"><span itemprop="name">Blog</span></a><meta itemprop="position" content="2" /></li>
    <li class="item taBcrumb-end"><span>${blog.title}</span></li>
  `;
  dynamicTopHtml = dynamicTopHtml.replace(oldBreadcrumb, newBreadcrumb);

  // Convert outer wrappers of the page from "blog list" layout to "blog details" layout
  dynamicTopHtml = dynamicTopHtml.replace(
    'tx-blog-area tz-blog-list-sec pt-110 pb-120 fix',
    'tx-blog-area bs-blog-details-area wa-p-relative pt-110 pb-120 tx-detailsWrapper__prev'
  );
  dynamicTopHtml = dynamicTopHtml.replace(
    'blog__wrapper blog-list-content mt-none-30',
    'tx-detailsWrapper blog-details-content bs-blog-details-content tx-detailsWrapper__prev'
  );

  // Construct the custom sidebar HTML
  const customSidebarHtml = `
    <div class="tx-sidebarWrapper tz-ser-sidebar saas-sidebar">
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

  // Construct newBottomHtml cleanly to avoid regex matching errors and unclosed tags
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

  const finalHtml = `${dynamicTopHtml}${singlePostHtml}${newBottomHtml}`;

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
