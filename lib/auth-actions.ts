// lib/auth-actions.ts
'use server';

import { db } from './db';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { logger } from './logger';
import { validators } from './validators';
import { generateCSRFToken as generateToken, validateCSRFToken as validateToken, getCSRFToken as getToken } from './csrf';

const SESSION_COOKIE_NAME = 'auth_session';

function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + 
         Math.random().toString(36).substring(2) + 
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
    const email = validators.sanitize(formData.get('email') as string);
    const password = formData.get('password') as string;
    const name = validators.sanitize(formData.get('name') as string);
    const csrfToken = formData.get('csrf_token') as string;

    // Validate CSRF token (temporarily disabled)
    if (!(await validateToken(csrfToken))) {
      logger.warn('Registration failed: Invalid CSRF token', { email });
      return { success: false, message: 'Invalid CSRF token' };
    }

    // Generate new CSRF token for next request
    await generateToken();

    // Validate inputs
    if (!validators.email(email)) {
      return { success: false, message: 'Invalid email format' };
    }

    if (!validators.password(password)) {
      return { success: false, message: 'Password must be at least 8 characters with uppercase and number' };
    }

    if (!validators.stringLength(name, 2, 50)) {
      return { success: false, message: 'Name must be between 2 and 50 characters' };
    }

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      logger.warn('Registration failed: Email already exists', { email });
      return { success: false, message: 'Email already exists' };
    }

    const hashedPassword = await hashPassword(password);
    await db.collection('users').insertOne({
      email,
      password: hashedPassword,
      name,
      createdAt: new Date().toISOString(),
    });

    logger.info('User registered', { email });
    revalidatePath('/login');
    return { success: true, message: 'Account created successfully!' };
  } catch (error) {
    logger.error('Registration error', error);
    return { success: false, message: 'Registration failed' };
  }
}

export async function login(formData: FormData) {
  try {
    const email = validators.sanitize(formData.get('email') as string);
    const password = formData.get('password') as string;
    const csrfToken = formData.get('csrf_token') as string;

    // Validate CSRF token (temporarily disabled)
    if (!(await validateToken(csrfToken))) {
      logger.warn('Login failed: Invalid CSRF token', { email });
      return { success: false, message: 'Invalid CSRF token' };
    }

    // Generate new CSRF token for next request
    await generateToken();

    const user = await db.collection('users').findOne({ email });
    if (!user) {
      logger.warn('Login failed: Invalid credentials', { email });
      return { success: false, message: 'Invalid credentials' };
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      logger.warn('Login failed: Invalid password', { email });
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

    logger.info('User logged in', { email });
    revalidatePath('/dashboard');
    return { success: true, message: 'Login successful!' };
  } catch (error) {
    logger.error('Login error', error);
    return { success: false, message: 'Login failed' };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  logger.info('User logged out');
  redirect('/login');
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return sessionToken ? sessionToken.length > 0 : false;
}

export async function getCSRFToken() {
  return await getToken();
}