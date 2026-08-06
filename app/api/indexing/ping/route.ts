import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { supabase } from '@/lib/supabase';

async function getAuthClient() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('gcp_client_email, gcp_private_key')
    .eq('id', 1)
    .single();

  if (error || !data?.gcp_client_email || !data?.gcp_private_key) {
    throw new Error('Google Cloud credentials not found in settings.');
  }

  const privateKey = data.gcp_private_key.replace(/\\n/g, '\n');

  const auth = new google.auth.JWT({
    email: data.gcp_client_email,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/indexing']
  });

  return auth;
}

export async function POST(request: Request) {
  try {
    const { url, type = 'URL_UPDATED' } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required.' }, { status: 400 });
    }

    const auth = await getAuthClient();
    const indexing = google.indexing({ version: 'v3', auth });

    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: type, // URL_UPDATED or URL_DELETED
      },
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    console.error('Error pinging Indexing API:', error);
    return NextResponse.json({ error: error.message || 'Failed to ping Indexing API' }, { status: 500 });
  }
}
