import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { supabase } from '@/lib/supabase';

// Helper function to get Google Auth Client
async function getAuthClient() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('gcp_client_email, gcp_private_key, gsc_property_url')
    .eq('id', 1)
    .single();

  if (error || !data?.gcp_client_email || !data?.gcp_private_key) {
    throw new Error('Google Cloud credentials not found in settings.');
  }

  // Format private key correctly (replace literal \n with actual newlines if needed)
  const privateKey = data.gcp_private_key.replace(/\\n/g, '\n');

  const auth = new google.auth.JWT({
    email: data.gcp_client_email,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
  });

  return { auth, propertyUrl: data.gsc_property_url };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate') || (() => {
      const d = new Date();
      d.setDate(d.getDate() - 30);
      return d.toISOString().split('T')[0];
    })();
    const endDate = searchParams.get('endDate') || new Date().toISOString().split('T')[0];

    const { auth, propertyUrl } = await getAuthClient();

    if (!propertyUrl) {
      return NextResponse.json({ error: 'Search Console Property URL not configured in settings.' }, { status: 400 });
    }

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    // Fetch site-level stats (totals)
    const totalsResponse = await searchconsole.searchanalytics.query({
      siteUrl: propertyUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['date'],
      },
    });

    // Fetch top pages
    const pagesResponse = await searchconsole.searchanalytics.query({
      siteUrl: propertyUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 10,
      },
    });

    // Calculate totals
    let totalClicks = 0;
    let totalImpressions = 0;
    let avgCtr = 0;
    let avgPosition = 0;

    const rows = totalsResponse.data.rows || [];
    if (rows.length > 0) {
      totalClicks = rows.reduce((acc, row) => acc + (row.clicks || 0), 0);
      totalImpressions = rows.reduce((acc, row) => acc + (row.impressions || 0), 0);
      avgCtr = rows.reduce((acc, row) => acc + (row.ctr || 0), 0) / rows.length;
      avgPosition = rows.reduce((acc, row) => acc + (row.position || 0), 0) / rows.length;
    }

    return NextResponse.json({
      totals: {
        clicks: totalClicks,
        impressions: totalImpressions,
        ctr: avgCtr,
        position: avgPosition,
      },
      chartData: rows,
      topPages: pagesResponse.data.rows || [],
    });
  } catch (error: any) {
    console.error('Error fetching GSC stats:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch GSC stats' }, { status: 500 });
  }
}
