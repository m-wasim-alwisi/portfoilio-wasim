// lib/auth-actions.ts
'use server';

import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const SESSION_COOKIE_NAME = 'auth_session';

function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + 
         Math.random().toString(36).substring(2) + 
         Math.random().toString(36).substring(2);
}

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function register(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return { success: false, message: 'Email already exists' };
    }

    const hashedPassword = await hashPassword(password);
    await db.insert(users).values({
      email,
      password: hashedPassword,
      name,
    });

    revalidatePath('/login');
    return { success: true, message: 'Account created successfully!' };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Registration failed' };
  }
}

export async function login(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return { success: false, message: 'Invalid credentials' };
    }

    const sessionToken = generateSessionToken();
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    revalidatePath('/dashboard');
    return { success: true, message: 'Login successful!' };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Login failed' };
  }
}

// FIX: Return void instead of object
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect('/login');
  // No return statement needed
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return sessionToken ? sessionToken.length > 0 : false;
}