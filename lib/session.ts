// lib/session.ts
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'auth_session';

export async function createSession(): Promise<string> {
  const token = Math.random().toString(36).substring(2) + 
                Math.random().toString(36).substring(2) + 
                Math.random().toString(36).substring(2) + 
                Math.random().toString(36).substring(2);
  
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
  
  return token;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value || null;
}

export async function validateSession(): Promise<boolean> {
  const session = await getSession();
  return session ? session.length > 0 : false;
}