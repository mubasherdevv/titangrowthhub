import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid'; // Next.js crypto.randomUUID() is also an option

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const dimensions = formData.get('dimensions') as string;
    const isWebp = formData.get('isWebp') === 'true';
    const altText = (formData.get('altText') as string) || '';

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const fileName = file.name;
    const storagePath = `${crypto.randomUUID()}-${fileName}`;
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('media')
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Supabase Storage Error:', uploadError);
      return NextResponse.json({ success: false, error: uploadError.message }, { status: 500 });
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(storagePath);
    const publicUrl = publicUrlData.publicUrl;

    // Insert into media_library
    const mediaRecord = {
      file_name: fileName,
      file_url: publicUrl,
      storage_path: storagePath,
      file_size: file.size,
      file_format: fileExt || '',
      dimensions: dimensions || '',
      alt_text: altText,
    };

    const { data: insertData, error: insertError } = await supabase
      .from('media_library')
      .insert([mediaRecord])
      .select()
      .single();

    if (insertError) {
      // If DB insert fails, cleanup storage
      await supabase.storage.from('media').remove([storagePath]);
      return NextResponse.json({ success: false, error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: insertData });
  } catch (err: any) {
    console.error('Upload error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
