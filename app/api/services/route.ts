import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const formatServiceItem = (dbService: any) => {
  const dateObj = new Date(dbService.created_at || new Date());
  return {
    id: dbService.id,
    title: dbService.title,
    slug: dbService.slug,
    category: dbService.category,
    status: dbService.status,
    seoScore: dbService.seo_score,
    shortDesc: dbService.short_desc,
    content: dbService.content,
    updatedDate: dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    updatedTime: dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  };
};

export async function GET() {
  try {
    const { data: dbServices, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const services = (dbServices || []).map(formatServiceItem);
    return NextResponse.json(services);
  } catch (error: any) {
    console.error('Error fetching services from Supabase:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const insertData = {
      title: body.title || 'Untitled Service',
      slug: body.slug.startsWith('/') ? body.slug : '/' + body.slug,
      category: body.category || 'SEO Services',
      status: body.status || 'Draft',
      seo_score: body.seoScore || 0,
      short_desc: body.shortDesc || '',
      content: body.content || '',
    };

    const { data, error } = await supabase
      .from('services')
      .insert([insertData])
      .select();

    if (error) throw error;

    const newService = data && data[0] ? formatServiceItem(data[0]) : null;
    return NextResponse.json(newService);
  } catch (error: any) {
    console.error('Error creating service in Supabase:', error);
    return NextResponse.json({ error: error.message || 'Failed to create service' }, { status: 500 });
  }
}
