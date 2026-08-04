import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import {
  createSessionToken,
  validateAdminCredentials,
  getAdminEmail,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from '@/lib/auth';
import { hashPassword, verifyPassword } from '@/lib/password';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    let valid = false;

    // 1. Try the database first (admins table)
    const { data: admin, error: adminError } = await supabase
      .from('admins')
      .select('id, email, password_hash')
      .eq('email', email)
      .maybeSingle();

    if (!adminError && admin?.password_hash) {
      valid = await verifyPassword(password, admin.password_hash);
    }

    // 2. Fallback to env credentials; if they match, seed the admin into the DB
    //    so the login is saved in Supabase for future logins.
    if (!valid && validateAdminCredentials(email, password)) {
      valid = true;
      try {
        const passwordHash = await hashPassword(password);
        await supabase.from('admins').upsert(
          {
            email: getAdminEmail().toLowerCase(),
            password_hash: passwordHash,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'email' }
        );
      } catch (seedError) {
        console.error('Failed to seed admin into database:', seedError);
      }
    }

    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = await createSessionToken(email);

    const res = NextResponse.json({ ok: true, email });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE,
    });

    return res;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
