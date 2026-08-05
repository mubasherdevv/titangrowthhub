import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const formatServiceItem = (dbService: any) => {
  const dateObj = new Date(dbService.updated_at || dbService.created_at || new Date());
  return {
    id: dbService.id,
    title: dbService.title,
    slug: dbService.slug,
    category: dbService.category,
    status: dbService.status,
    seoScore: dbService.seo_score,
    shortDesc: dbService.short_desc,
    content: dbService.content,
    seoTitle: dbService.seo_title || '',
    seoDesc: dbService.seo_desc || '',
    focusKeyword: dbService.focus_keyword || '',
    canonicalUrl: dbService.canonical_url || '',
    metaRobots: dbService.meta_robots || 'Index, Follow',
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
      .from('services')
      .select('*')
      .eq('id', params.id)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json(formatServiceItem(data));
  } catch (error: any) {
    console.error('Error fetching service:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch service' }, { status: 500 });
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
    if (body.shortDesc !== undefined) updates.short_desc = body.shortDesc;
    if (body.content !== undefined) updates.content = body.content;
    if (body.seoTitle !== undefined) updates.seo_title = body.seoTitle;
    if (body.seoDesc !== undefined) updates.seo_desc = body.seoDesc;
    if (body.seoMetaDesc !== undefined) updates.seo_desc = body.seoMetaDesc;
    if (body.focusKeyword !== undefined) updates.focus_keyword = body.focusKeyword;
    if (body.canonicalUrl !== undefined) updates.canonical_url = body.canonicalUrl;
    if (body.metaRobots !== undefined) updates.meta_robots = body.metaRobots;

    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', params.id)
      .select()
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json(formatServiceItem(data));
  } catch (error: any) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: error.message || 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { data, error } = await supabase
      .from('services')
      .delete()
      .eq('id', params.id)
      .select()
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, id: data.id });
  } catch (error: any) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete service' }, { status: 500 });
  }
}
