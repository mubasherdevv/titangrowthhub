import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken, SESSION_COOKIE } from '@/lib/auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Fast-skip static assets, API paths, and WordPress assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/wp-content') ||
    pathname.startsWith('/wp-includes') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Protect the admin panel (except the login page)
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const valid = await verifySessionToken(token);

    if (!valid) {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next();
  }

  try {
    // Query Supabase REST API directly using fetch (100% Edge runtime compatible)
    const reqUrl = `${supabaseUrl}/rest/v1/redirects?from_path=eq.${encodeURIComponent(pathname)}&is_active=eq.true&select=id,to_path,status_code`;
    
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
        // Fire and forget hit tracking to internal API
        const origin = request.nextUrl.origin;
        fetch(`${origin}/api/redirects/hit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: redirect.id })
        }).catch(() => {}); // ignore error

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
