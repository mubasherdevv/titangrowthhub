// Password hashing for admin credentials.
// Uses Node's built-in crypto.scrypt (no external dependency).
// Format: scrypt$<salt-hex>$<derived-hex>

import crypto from 'crypto';

const KEYLEN = 64;
const OPTIONS = { N: 16384, r: 8, p: 1 } as const;

const derive = (password: string, salt: string) =>
  new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, KEYLEN, OPTIONS, (err, key) =>
      err ? reject(err) : resolve(key)
    );
  });

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = await derive(password, salt);
  return `scrypt$${salt}$${derived.toString('hex')}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, salt, hash] = stored.split('$');
  if (scheme !== 'scrypt' || !salt || !hash) return false;
  try {
    const derived = await derive(password, salt);
    const expected = Buffer.from(hash, 'hex');
    if (derived.length !== expected.length) return false;
    return crypto.timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}
