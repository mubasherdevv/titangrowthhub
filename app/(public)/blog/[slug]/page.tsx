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

  // Fetch the blog post from Supabase by matching slug (either exact /blog/slug or slug).
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

  // Detect if content is rich HTML (from the editor) or plain text
  const rawContent = blog.content || '';
  const looksLikeHtml = /<[a-z][\s\S]*>/i.test(rawContent);
  const contentHtml = looksLikeHtml
    ? rawContent
    : rawContent.split('\n').map((p: string) => `<p style="margin-bottom: 15px;">${p}</p>`).join('');

  const featuredImg = blog.featured_image
    ? blog.featured_image
    : '/wp-content/uploads/2025/11/p2-img-3.webp';

  // SEO score badge color
  const seoScoreNum = Number(blog.seo_score) || 0;
  const seoColor = seoScoreNum >= 80 ? '#10b981' : seoScoreNum >= 50 ? '#f97316' : '#a1a1aa';

  // Construct single blog post HTML
  const singlePostHtml = `
    <article class="tx-blog-box mt-30 type-post status-publish format-standard hentry">
        <div class="tz-blog-item single-post-view" style="padding: 20px; background: #fff; border-radius: 20px;">
            <div class="item-img" style="margin-bottom: 25px; border-radius: 15px; overflow: hidden;">
                <img width="1824" height="839" src="${featuredImg}" class="img-responsive w-100 wp-post-image" alt="${blog.title || ''}" />
            </div>
            <div class="item-text headline pera-content">
                <div class="item-meta" style="margin-bottom: 15px; font-size: 13px; color: #fd3f00; display: flex; gap: 15px; flex-wrap: wrap; align-items: center;">
                    <span><i class="fa-regular fa-calendar"></i> ${formattedDate}</span>
                    <span><i class="fa-regular fa-user"></i> avista</span>
                    <span><i class="fa-solid fa-tags"></i> ${blog.category || 'SEO Strategy'}</span>
                    <span class="seo-score-badge" style="display: inline-flex; align-items: center; gap: 6px; background: #f4f4f5; border: 1px solid #e4e4e7; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 800; color: #52525b; margin-left: auto;" title="SEO Score">
                        <span style="min-width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 900; color: #fff; background: ${seoColor};">${seoScoreNum}</span>
                        SEO Score
                    </span>
                </div>
                <h2 class="blog_title" style="font-size: 28px; line-height: 1.3; font-weight: 800; margin-bottom: 20px; color: #111;">
                    ${blog.title}
                </h2>
                <div class="blog-details-content leading-relaxed" style="font-size: 15px; color: #444; line-height: 1.8;">
                    ${contentHtml || '<p>No content available.</p>'}
                </div>
            </div>
        </div>
    </article>
  `;

  const finalHtml = `${topHtml}${singlePostHtml}${bottomHtml}`;

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
