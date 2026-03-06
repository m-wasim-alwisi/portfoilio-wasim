// lib/actions.ts
'use server';

import { db } from './db';
import { revalidatePath } from 'next/cache';
import { logger } from './logger';
import { validators } from './validators';
import { ObjectId } from 'mongodb';

export async function insertNewItem(formData: FormData) {
  try {
    const name = validators.sanitize(formData.get('name') as string);
    const email = validators.sanitize(formData.get('email') as string);
    const message = validators.sanitize(formData.get('message') as string);

    // Validate inputs
    if (!validators.email(email)) {
      return { status: 400, message: 'Invalid email format' };
    }

    if (!validators.stringLength(name, 2, 100)) {
      return { status: 400, message: 'Name must be between 2 and 100 characters' };
    }

    if (!validators.stringLength(message, 10, 500)) {
      return { status: 400, message: 'Message must be between 10 and 500 characters' };
    }

    await db.collection('subscribers').insertOne({
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    });

    logger.info('Subscriber added', { email });
    revalidatePath('/dashboard');
    return { status: 200, message: 'Message sent successfully!' };
  } catch (error) {
    logger.error('Error inserting subscriber', error);
    return { status: 500, message: 'Failed to send message' };
  }
}

export async function deleteSubscriber(formData: FormData) {
  "use server";
  
  const id = formData.get("id") as string;
  
  try {
    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid subscriber ID');
    }
    
    await db.collection('subscribers').deleteOne({ _id: new ObjectId(id) });
    logger.info('Subscriber deleted', { id });
    revalidatePath("/dashboard");
  } catch (error) {
    logger.error('Error deleting subscriber', error);
    throw new Error('Failed to delete subscriber');
  }
}