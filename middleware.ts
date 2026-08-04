import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Fast-skip static assets, API paths, and admin panel
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/wp-content') ||
    pathname.startsWith('/wp-includes') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next();
  }

  try {
    // Query Supabase REST API directly using fetch (100% Edge runtime compatible)
    const reqUrl = `${supabaseUrl}/rest/v1/redirects?from_path=eq.${encodeURIComponent(pathname)}&select=to_path,status_code`;
    
    const response = await fetch(reqUrl, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 } // Cache redirect checks for 60 seconds
    });

    if (response.ok) {
      const data = await response.json();
      const redirect = data && data[0];

      if (redirect) {
        const targetUrl = new URL(redirect.to_path, request.url);
        return NextResponse.redirect(targetUrl, redirect.status_code || 301);
      }
    }
  } catch (err) {
    console.error('Redirect Middleware error:', err);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Intercept all requests except static assets
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
