import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    // Call Supabase RPC to increment hits safely.
    // If we don't have an RPC, we can just do a read-modify-write,
    // but a direct SQL RPC is better. Since we can't assume an RPC exists,
    // we will do a standard update for now. 
    // In production, an Edge-compatible RPC `increment_redirect_hit(row_id uuid)` is recommended.
    const { data: redirect } = await supabase.from('redirects').select('hits').eq('id', id).single();
    if (redirect) {
      await supabase
        .from('redirects')
        .update({ 
          hits: (redirect.hits || 0) + 1,
          last_accessed: new Date().toISOString()
        })
        .eq('id', id);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
