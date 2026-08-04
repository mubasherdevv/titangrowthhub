import { NextResponse } from 'next/server';
import { getSessionEmail, SESSION_COOKIE } from '@/lib/auth';

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
  const token = match ? decodeURIComponent(match[1]) : null;

  const email = await getSessionEmail(token);
  return NextResponse.json({ authenticated: !!email, email });
}
