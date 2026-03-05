// lib/actions.ts
'use server';

import { db } from './db';
import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';

export async function insertNewItem(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    await db.collection('subscribers').insertOne({
      name,
      email,
      message: message || '',
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
    await db.collection('subscribers').deleteOne({ _id: new ObjectId(id) });
    revalidatePath("/dashboard");
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    throw new Error('Failed to delete subscriber');
  }
}