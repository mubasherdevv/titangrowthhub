// Edge-compatible auth helpers (works in middleware + Node routes).
// Uses only Web Crypto + TextEncoder/TextDecoder + atob/btoa so it runs on both runtimes.
// NOTE: do NOT use escape()/unescape() here — they are undefined in the Edge runtime.

export const SESSION_COOKIE = 'admin_session';
export const SESSION_MAX_AGE = 60 * 60 * 24; // 1 day (seconds)

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@vistaseo.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const AUTH_SECRET = process.env.AUTH_SECRET || 'vistaseo-local-dev-secret-change-me';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const bytesToBase64Url = (bytes: Uint8Array) => {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const base64UrlToBytes = (str: string) => {
  const binary = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
};

const encodeBase64Url = (str: string) => bytesToBase64Url(encoder.encode(str));

const decodeBase64Url = (str: string) => decoder.decode(base64UrlToBytes(str));

const getKey = () =>
  crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(AUTH_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );

function safeEqual(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function createSessionToken(email: string): Promise<string> {
  const exp = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = encodeBase64Url(JSON.stringify({ email, exp }));
  const sig = await crypto.subtle.sign('HMAC', await getKey(), encoder.encode(payload));
  const sigB64 = bytesToBase64Url(new Uint8Array(sig));
  return `${payload}.${sigB64}`;
}

export interface SessionPayload {
  email: string;
  exp: number;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  let payload: SessionPayload;
  try {
    payload = JSON.parse(decodeBase64Url(parts[0]));
  } catch {
    return false;
  }

  if (!payload || !payload.exp || Date.now() > payload.exp) return false;

  try {
    const sig = await crypto.subtle.sign('HMAC', await getKey(), encoder.encode(parts[0]));
    const sigBytes = base64UrlToBytes(parts[1]);
    return safeEqual(new Uint8Array(sig), sigBytes);
  } catch {
    return false;
  }
}

export async function getSessionEmail(token: string | undefined | null): Promise<string | null> {
  if (!token) return null;
  const valid = await verifySessionToken(token);
  if (!valid) return null;
  try {
    const parts = token.split('.');
    const payload: SessionPayload = JSON.parse(decodeBase64Url(parts[0]));
    return payload.email || null;
  } catch {
    return null;
  }
}

export function validateAdminCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export const getAdminEmail = () => ADMIN_EMAIL;
