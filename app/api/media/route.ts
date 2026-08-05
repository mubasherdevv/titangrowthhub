import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('media_library')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    // First get the item to find its storage path
    const { data: item, error: fetchError } = await supabase
      .from('media_library')
      .select('storage_path')
      .eq('id', id)
      .single();

    if (fetchError || !item) {
      return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
    }

    // Delete from Supabase Storage
    if (item.storage_path) {
      const { error: storageError } = await supabase
        .storage
        .from('media')
        .remove([item.storage_path]);
      
      if (storageError) {
        console.error('Storage deletion error:', storageError);
        // We continue to delete from DB even if storage deletion fails
      }
    }

    // Delete from Database
    const { error: dbError } = await supabase
      .from('media_library')
      .delete()
      .eq('id', id);

    if (dbError) {
      return NextResponse.json({ success: false, error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, alt_text } = await request.json();
    
    if (!id || alt_text === undefined) {
      return NextResponse.json({ success: false, error: 'ID and alt_text are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('media_library')
      .update({ alt_text })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
