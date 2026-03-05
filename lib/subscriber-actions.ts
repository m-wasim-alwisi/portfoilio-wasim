
// lib/subscriber-actions.ts
'use server';

import { db } from './db';
import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';

// Add new subscriber
export async function addSubscriber(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    await db.collection('subscribers').insertOne({
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    });

    revalidatePath('/');
    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Add subscriber error:', error);
    return { success: false, message: 'Failed to send message' };
  }
}

// Delete subscriber
export async function deleteSubscriber(formData: FormData) {
  "use server";
  
  const id = formData.get("id") as string;
  
  try {
    await db.collection('subscribers').deleteOne({ _id: new ObjectId(id) });
    revalidatePath("/dashboard");
  } catch (error) {
    console.error('Delete subscriber error:', error);
    throw new Error('Failed to delete subscriber');
  }
}