import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const formatBlogPost = (dbBlog: any) => {
  const dateObj = new Date(dbBlog.created_at || new Date());
  return {
    id: dbBlog.id,
    title: dbBlog.title,
    slug: dbBlog.slug,
    status: dbBlog.status,
    seoScore: dbBlog.seo_score,
    category: dbBlog.category,
    metaDesc: dbBlog.meta_desc,
    content: dbBlog.content,
    updatedDate: dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    updatedTime: dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  };
};

export async function GET() {
  try {
    const { data: dbBlogs, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const blogs = (dbBlogs || []).map(formatBlogPost);
    return NextResponse.json(blogs);
  } catch (error: any) {
    console.error('Error fetching blogs from Supabase:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const insertData = {
      title: body.title || 'Untitled Post',
      slug: body.slug.startsWith('/') ? body.slug : '/' + body.slug,
      status: body.status || 'Draft',
      seo_score: body.seoScore || 0,
      category: body.category || 'SEO Strategy',
      meta_desc: body.metaDesc || '',
      content: body.content || '',
    };

    const { data, error } = await supabase
      .from('blogs')
      .insert([insertData])
      .select();

    if (error) throw error;

    const newBlog = data && data[0] ? formatBlogPost(data[0]) : null;
    return NextResponse.json(newBlog);
  } catch (error: any) {
    console.error('Error creating blog in Supabase:', error);
    return NextResponse.json({ error: error.message || 'Failed to create blog post' }, { status: 500 });
  }
}
