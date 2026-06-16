import * as bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-super-secret-key-change-this-in-production';
const KEY = new TextEncoder().encode(JWT_SECRET);

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error('Password comparison failed:', error);
    return false;
  }
}

export async function signJWT(payload: { email: string; userId: string | number }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h') // Berlaku 24 jam
    .sign(KEY);
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, KEY, {
      algorithms: ['HS256'],
    });
    return payload as { email: string; userId: string | number };
  } catch (error) {
    return null;
  }
}
