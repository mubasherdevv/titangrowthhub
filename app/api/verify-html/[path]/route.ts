import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string } }
) {
  try {
    const filename = params.path;

    if (!filename) {
      return new NextResponse('Not found', { status: 404 });
    }

    const { data, error } = await supabase
      .from('site_settings')
      .select('gsc_verification_filename, gsc_verification_filecontent')
      .eq('id', 1)
      .single();

    if (error || !data) {
      return new NextResponse('Not found', { status: 404 });
    }

    if (data.gsc_verification_filename && data.gsc_verification_filename === filename) {
      return new NextResponse(data.gsc_verification_filecontent || '', {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      });
    }

    return new NextResponse('Not found', { status: 404 });
  } catch (error) {
    console.error('Error serving verification file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
