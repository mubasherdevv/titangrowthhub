import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const formatRedirect = (db: any) => {
  return {
    id: db.id,
    fromPath: db.from_path,
    toPath: db.to_path,
    statusCode: db.status_code,
    createdAt: db.created_at,
  };
};

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('redirects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json((data || []).map(formatRedirect));
  } catch (error: any) {
    console.error('Error fetching redirects:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch redirects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const insertData = {
      from_path: body.fromPath,
      to_path: body.toPath,
      status_code: body.statusCode || 301,
    };

    const { data, error } = await supabase
      .from('redirects')
      .insert([insertData])
      .select();

    if (error) throw error;
    return NextResponse.json(data && data[0] ? formatRedirect(data[0]) : null);
  } catch (error: any) {
    console.error('Error creating redirect:', error);
    return NextResponse.json({ error: error.message || 'Failed to create redirect' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing redirect ID' }, { status: 400 });
    }

    const { error } = await supabase
      .from('redirects')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting redirect:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete redirect' }, { status: 500 });
  }
}
