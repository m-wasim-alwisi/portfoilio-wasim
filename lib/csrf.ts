// lib/csrf.ts
import { cookies } from 'next/headers';

const CSRF_COOKIE_NAME = 'csrf_token';
export async function generateCSRFToken(): Promise<string> {
  const token = Math.random().toString(36).substring(2) + 
                Math.random().toString(36).substring(2) + 
                Math.random().toString(36).substring(2);
  const cookieStore = await cookies();
  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: false, // Allow client-side access
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
  return token;
}

export async function validateCSRFToken(token: string): Promise<boolean> {
  const cookieStore = await cookies();
  const storedToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;
  if (!storedToken || !token) {
    return false;
  }
  return storedToken === token;
}

export async function getCSRFToken(): Promise<string> {
  const cookieStore = await cookies();
  const storedToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;
  if (!storedToken) {
    return await generateCSRFToken();
  }
  return storedToken;
}