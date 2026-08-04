import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getCleanHtml } from '@/lib/htmlHelper';

interface RouteParams {
  params: {
    slug: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const slug = params.slug;

    // Fetch the blog post from Supabase by matching slug (either exact /blog/slug or slug)
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .or(`slug.eq.${slug},slug.eq./blog/${slug}`);

    if (error) throw error;

    const blog = blogs && blogs[0];

    if (!blog) {
      return new NextResponse('<h1>Post not found</h1>', { status: 404 });
    }

    // Read base HTML page (use blog list as template)
    let html = getCleanHtml('blog/index.html');

    // Replace the main blog posts list with single post content
    const blogsListStart = html.indexOf('<div class="blog__wrapper blog-list-content mt-none-30">');
    if (blogsListStart !== -1) {
      const blogsListContentIndex = blogsListStart + '<div class="blog__wrapper blog-list-content mt-none-30">'.length;
      const paginationIndex = html.indexOf('<div class="tx-pagination mt-30">', blogsListContentIndex);

      if (paginationIndex !== -1) {
        const dateObj = new Date(blog.created_at);
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

        // Construct single blog post HTML
        const singlePostHtml = `
    <article class="tx-blog-box mt-30 type-post status-publish format-standard hentry">
        <div class="tz-blog-item single-post-view" style="padding: 20px; background: #fff; border-radius: 20px;">
            <div class="item-img" style="margin-bottom: 25px; border-radius: 15px; overflow: hidden;">
                <img width="1824" height="839" src="/wp-content/uploads/2025/11/p2-img-3.webp" class="img-responsive w-100 wp-post-image" alt="" />
            </div>
            <div class="item-text headline pera-content">
                <div class="item-meta" style="margin-bottom: 15px; font-size: 13px; color: #fd3f00; display: flex; gap: 15px;">
                    <span><i class="fa-regular fa-calendar"></i> ${formattedDate}</span>
                    <span><i class="fa-regular fa-user"></i> avista</span>
                    <span><i class="fa-solid fa-tags"></i> ${blog.category}</span>
                </div>
                <h2 class="blog_title" style="font-size: 28px; line-height: 1.3; font-weight: 800; margin-bottom: 20px; color: #111;">
                    ${blog.title}
                </h2>
                <div class="blog-details-content leading-relaxed" style="font-size: 15px; color: #444; line-height: 1.8;">
                    ${blog.content ? blog.content.split('\n').map((p: string) => `<p style="margin-bottom: 15px;">${p}</p>`).join('') : 'No content available.'}
                </div>
            </div>
        </div>
    </article>
`;

        const paginationClosingIndex = html.indexOf('</div>', paginationIndex);
        const replaceEndIndex = paginationClosingIndex !== -1 ? paginationClosingIndex + '</div>'.length : paginationIndex;

        html = html.substring(0, blogsListContentIndex) + singlePostHtml + html.substring(replaceEndIndex);
      }
    }

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error serving blog details page:', error);
    return new NextResponse('<h1>Failed to load blog details</h1>', { status: 500 });
  }
}
