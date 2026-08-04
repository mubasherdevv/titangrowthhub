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
    featuredImage: dbBlog.featured_image,
    tags: dbBlog.tags || '',
    isActive: dbBlog.is_active !== false,
    updatedDate: dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    updatedTime: dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  };
};

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', params.id)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json(formatBlogPost(data));
  } catch (error: any) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch blog post' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const body = await request.json();

    const updates: any = {};
    if (body.title !== undefined) updates.title = body.title;
    if (body.slug !== undefined) updates.slug = body.slug.startsWith('/') ? body.slug : '/' + body.slug;
    if (body.status !== undefined) updates.status = body.status;
    if (body.seoScore !== undefined) updates.seo_score = body.seoScore;
    if (body.category !== undefined) updates.category = body.category;
    if (body.metaDesc !== undefined) updates.meta_desc = body.metaDesc;
    if (body.content !== undefined) updates.content = body.content;
    if (body.featuredImage !== undefined) updates.featured_image = body.featuredImage;
    if (body.tags !== undefined) updates.tags = body.tags;
    if (body.isActive !== undefined) updates.is_active = body.isActive;
    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('blogs')
      .update(updates)
      .eq('id', params.id)
      .select()
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json(formatBlogPost(data));
  } catch (error: any) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: error.message || 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', params.id)
      .select()
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, id: data.id });
  } catch (error: any) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete blog post' }, { status: 500 });
  }
}
