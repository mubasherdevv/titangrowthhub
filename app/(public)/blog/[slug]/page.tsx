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
      /* Typography */
      .blog-list-content .article-header {
        margin-bottom: 40px;
      }
      .blog-list-content .article-title {
        font-size: 48px;
        line-height: 1.25;
        font-weight: 800;
        color: #09090b;
        margin-bottom: 24px;
        letter-spacing: -0.02em;
        font-family: 'Outfit', sans-serif;
      }
      @media (max-width: 768px) {
        .blog-list-content .article-title {
          font-size: 34px;
        }
      }
      .blog-list-content .article-meta {
        display: flex;
        align-items: center;
        gap: 20px;
        flex-wrap: wrap;
        color: #71717a;
        font-size: 14px;
        padding-bottom: 24px;
        border-bottom: 1px solid #e4e4e7;
        margin-bottom: 30px;
      }
      .blog-list-content .meta-item {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .blog-list-content .meta-item i {
        color: #fd3f00;
      }
      .blog-list-content .meta-category {
        background: rgba(253, 63, 0, 0.1);
        color: #fd3f00;
        padding: 4px 12px;
        border-radius: 100px;
        font-weight: 700;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      /* Featured Image */
      .blog-list-content .featured-image-wrapper {
        width: 100%;
        aspect-ratio: 16 / 9;
        border-radius: 20px;
        overflow: hidden;
        margin-bottom: 50px;
        box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.15);
      }
      .blog-list-content .featured-image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }

      /* Body Content */
      .blog-list-content .article-body {
        font-size: 18px;
        line-height: 1.8;
        color: #27272a;
      }
      .blog-list-content .article-body p {
        margin-bottom: 24px;
      }
      .blog-list-content .article-body h2 {
        font-size: 30px;
        font-weight: 800;
        color: #09090b;
        margin-top: 48px;
        margin-bottom: 20px;
        scroll-margin-top: 100px;
        font-family: 'Outfit', sans-serif;
      }
      .blog-list-content .article-body h3 {
        font-size: 24px;
        font-weight: 800;
        color: #09090b;
        margin-top: 36px;
        margin-bottom: 16px;
        scroll-margin-top: 100px;
        font-family: 'Outfit', sans-serif;
      }

      /* Table of Contents */
      .blog-list-content .toc-container {
        background: #fafafa;
        border-left: 4px solid #fd3f00;
        padding: 24px;
        border-radius: 12px;
        margin: 40px 0;
        border-top: 1px solid #f4f4f5;
        border-right: 1px solid #f4f4f5;
        border-bottom: 1px solid #f4f4f5;
      }
      .blog-list-content .toc-title {
        font-weight: 800;
        font-size: 14px;
        color: #09090b;
        margin-bottom: 16px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .blog-list-content .toc-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .blog-list-content .toc-item {
        margin-bottom: 10px;
      }
      .blog-list-content .toc-link {
        color: #52525b;
        text-decoration: none;
        font-size: 15px;
        transition: color 0.2s;
        font-weight: 500;
      }
      .blog-list-content .toc-link:hover {
        color: #fd3f00;
      }

      /* Author Box */
      .blog-list-content .author-box {
        display: flex;
        gap: 24px;
        background: #fafafa;
        padding: 32px;
        border-radius: 20px;
        margin-top: 60px;
        border: 1px solid #f4f4f5;
      }
      @media (max-width: 576px) {
        .blog-list-content .author-box {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
      }
      .blog-list-content .author-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
        border: 3px solid #fff;
        box-shadow: 0 4px 10px rgba(0,0,0,0.08);
      }
      .blog-list-content .author-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .blog-list-content .author-info h4 {
        font-size: 18px;
        font-weight: 800;
        color: #09090b;
        margin-bottom: 8px;
        font-family: 'Outfit', sans-serif;
      }
      .blog-list-content .author-info p {
        font-size: 15px;
        color: #52525b;
        line-height: 1.6;
        margin-bottom: 16px;
      }
      .blog-list-content .author-socials {
        display: flex;
        gap: 12px;
      }
      @media (max-width: 576px) {
        .blog-list-content .author-socials {
          justify-content: center;
        }
      }
      .blog-list-content .author-socials a {
        color: #a1a1aa;
        font-size: 16px;
        transition: color 0.2s;
      }
      .blog-list-content .author-socials a:hover {
        color: #fd3f00;
      }

      /* Social Sharing */
      .blog-list-content .share-bar {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 40px;
        padding: 20px 0;
        border-top: 1px solid #f4f4f5;
        border-bottom: 1px solid #f4f4f5;
      }
      .blog-list-content .share-title {
        font-weight: 800;
        font-size: 13px;
        color: #09090b;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-right: auto;
      }
      .blog-list-content .share-btn {
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
      .blog-list-content .share-btn:hover {
        color: #fff;
        background: #fd3f00;
        border-color: #fd3f00;
        transform: translateY(-2px);
      }

      /* Newsletter CTA */
      .blog-list-content .newsletter-cta {
        background: #09090b;
        color: #fff;
        padding: 40px;
        border-radius: 20px;
        margin-top: 60px;
        position: relative;
        overflow: hidden;
      }
      .blog-list-content .newsletter-title {
        font-size: 26px;
        font-weight: 800;
        margin-bottom: 12px;
        color: #fff;
        font-family: 'Outfit', sans-serif;
      }
      .blog-list-content .newsletter-desc {
        color: #a1a1aa;
        font-size: 15px;
        margin-bottom: 24px;
        line-height: 1.5;
      }
      .blog-list-content .newsletter-form {
        display: flex;
        gap: 12px;
      }
      @media (max-width: 576px) {
        .blog-list-content .newsletter-form {
          flex-direction: column;
        }
      }
      .blog-list-content .newsletter-input {
        flex-grow: 1;
        background: #18181b;
        border: 1px solid #27272a;
        border-radius: 8px;
        padding: 12px 16px;
        color: #fff;
        font-size: 14px;
        outline: none;
      }
      .blog-list-content .newsletter-input::placeholder {
        color: #71717a;
      }
      .blog-list-content .newsletter-btn {
        background: #fd3f00;
        color: #fff;
        border: none;
        border-radius: 8px;
        padding: 12px 24px;
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
        transition: background 0.2s;
      }
      .blog-list-content .newsletter-btn:hover {
        background: #d33400;
      }

      /* Related Posts */
      .blog-list-content .related-section {
        margin-top: 80px;
      }
      .blog-list-content .related-header-title {
        font-size: 28px;
        font-weight: 800;
        color: #09090b;
        margin-bottom: 32px;
        font-family: 'Outfit', sans-serif;
      }
      .blog-list-content .related-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
      }
      @media (max-width: 768px) {
        .blog-list-content .related-grid {
          grid-template-columns: 1fr;
        }
      }
      .blog-list-content .related-card {
        background: #fff;
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid #f4f4f5;
        transition: all 0.3s;
      }
      .blog-list-content .related-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 20px -8px rgba(0,0,0,0.08);
      }
      .blog-list-content .related-img {
        aspect-ratio: 16/10;
        overflow: hidden;
      }
      .blog-list-content .related-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .blog-list-content .related-info {
        padding: 20px;
      }
      .blog-list-content .related-meta {
        font-size: 12px;
        color: #fd3f00;
        margin-bottom: 8px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .blog-list-content .related-card-title {
        font-size: 18px;
        font-weight: 800;
        color: #09090b;
        line-height: 1.4;
        margin-bottom: 12px;
        font-family: 'Outfit', sans-serif;
      }
      .blog-list-content .related-card-title a {
        color: inherit;
        text-decoration: none;
      }
      .blog-list-content .related-card-title a:hover {
        color: #fd3f00;
      }

      /* FAQ Section */
      .blog-list-content .faq-section {
        margin-top: 80px;
        padding-top: 60px;
        border-top: 1px solid #f4f4f5;
      }
      .blog-list-content .faq-item {
        background: #fafafa;
        border: 1px solid #f4f4f5;
        border-radius: 12px;
        margin-bottom: 16px;
        padding: 20px;
      }
      .blog-list-content .faq-question {
        font-size: 16px;
        font-weight: 800;
        color: #09090b;
        margin-bottom: 8px;
        font-family: 'Outfit', sans-serif;
      }
      .blog-list-content .faq-answer {
        font-size: 15px;
        color: #52525b;
        line-height: 1.6;
      }

      /* Comments */
      .blog-list-content .comments-section {
        margin-top: 80px;
        padding-top: 60px;
        border-top: 1px solid #f4f4f5;
      }
      .blog-list-content .comment-form {
        margin-bottom: 40px;
      }
      .blog-list-content .comment-textarea {
        width: 100%;
        height: 120px;
        background: #fff;
        border: 1px solid #e4e4e7;
        border-radius: 8px;
        padding: 16px;
        font-size: 15px;
        outline: none;
        resize: none;
        margin-bottom: 16px;
      }
      .blog-list-content .comment-submit {
        background: #09090b;
        color: #fff;
        border: none;
        border-radius: 8px;
        padding: 12px 24px;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.2s;
      }
      .blog-list-content .comment-submit:hover {
        background: #fd3f00;
      }

      /* Sidebar widgets */
      .tx-sidebarWrapper.saas-sidebar {
        position: sticky;
        top: 100px;
      }
      .tx-sidebarWrapper.saas-sidebar .widget {
        background: #fff;
        border: 1px solid #f4f4f5;
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 30px;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.02);
      }
    </style>
  `;

  // Main content HTML
  const singlePostHtml = `
    ${styleTags}
    <article class="tx-blog-box type-post status-publish format-standard hentry" style="margin-top: 0;">
        <div class="tz-blog-item" style="border-radius: 0; overflow: visible; background: transparent; padding: 0; box-shadow: none; border: none;">
            <!-- Title & Meta Header -->
            <div class="article-header">
              <h1 class="article-title">${blog.title}</h1>
              <div class="article-meta">
                <span class="meta-item"><i class="fa-regular fa-calendar"></i> ${formattedDate}</span>
                <span class="meta-item"><i class="fa-regular fa-user"></i> By avista</span>
                <span class="meta-category">${blog.category || 'SEO Strategy'}</span>
                <span class="meta-item"><i class="fa-regular fa-clock"></i> ${readTime} min read</span>
                <span class="meta-item"><i class="fa-regular fa-eye"></i> ${viewsCount} views</span>
              </div>
            </div>

            <!-- Featured Image -->
            <div class="featured-image-wrapper">
              <img src="${featuredImg}" alt="${blog.title || ''}" />
            </div>

            <!-- Table of Contents -->
            ${headingsHtml}

            <!-- Article Body -->
            <div class="article-body">
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
                <img src="/wp-content/uploads/2025/11/fevicon-1.webp" alt="Muhammad Mubasher" />
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

            <!-- Comments Box -->
            <div class="comments-section">
              <h3 style="font-size: 24px; font-weight: 800; color: #09090b; margin-bottom: 30px; font-family: 'Outfit';">Comments</h3>
              <form class="comment-form" onsubmit="event.preventDefault(); alert('Comment submitted for moderation.');">
                <textarea class="comment-textarea" placeholder="Join the discussion... Type your comment here." required></textarea>
                <button type="submit" class="comment-submit">Post Comment</button>
              </form>
            </div>
        </div>
    </article>
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

      <!-- Consultation CTA Widget -->
      <div class="tx-blog-widget widget tz-sidebar-widget headline" style="background: linear-gradient(135deg, #09090b 0%, #1e1b4b 100%); padding: 30px; border-radius: 20px; text-align: center; border: 1px solid #312e81;">
        <h4 style="color: #fff; font-size: 20px; font-weight: 800; margin-bottom: 12px; font-family: 'Outfit';">Scale Your Search Traffic</h4>
        <p style="color: #cbd5e1; font-size: 14px; margin-bottom: 24px; line-height: 1.5;">Book a free 30-minute growth audit with our SEO specialists. Let's design a blueprint to grow your traffic.</p>
        <a href="/contact-us" style="background: #fd3f00; color: #fff; display: block; padding: 12px; border-radius: 8px; font-weight: 700; text-decoration: none; text-align: center;">Book Free Audit</a>
      </div>
    </div>
  `;

  // Make a clean replace of the sidebar wrapper in bottomHtml to preserve layout closing tags and footer intact
  const sidebarRegex = /<div class="tx-sidebarWrapper tz-ser-sidebar">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i;
  const newBottomHtml = bottomHtml.replace(sidebarRegex, `${customSidebarHtml}\n\t\t\t</div>`);

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
