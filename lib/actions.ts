// lib/actions.ts
'use server';

import { db } from '@/db';
import { subscribers } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

export async function insertNewItem(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    await db.insert(subscribers).values({
      name,
      email,
      message: message||'',
      createdAt: new Date().toISOString(),
    });

    revalidatePath('/dashboard');
    return { status: 200, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Error inserting subscriber:', error);
    return { status: 500, message: 'Failed to send message' };
  }
}

export async function deleteSubscriber(formData: FormData) {
  "use server";
  
  const id = formData.get("id") as string;
  
  try {
    // FIX: Use eq() with proper type
    await db.delete(subscribers).where(eq(subscribers.id, parseInt(id)));
    revalidatePath("/dashboard");
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    throw new Error('Failed to delete subscriber');
  }
}