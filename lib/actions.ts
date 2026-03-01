'use server';
import { db } from '../db';         // Path to your db/index.ts
import { subscribers } from '../db/schema'; // Path to your schema
import { eq } from 'drizzle-orm';

export async function insertNewItem(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  if (!name || !email || !message) {
    return { message: 'Missing fields', status: 400 };
  }

  try {
    // Insert data and return the specific column (id)
    const result = await db.insert(subscribers)
      .values({
        name: String(name),
        email: String(email),
        message: String(message),
      })
      .returning({ insertId: subscribers.id });

    // result is an array, we get the first item
    const insertedId = result[0]?.insertId;

    return { 
      message: 'Item inserted successfully', 
      status: 200,
      // insertId: insertedId
    };
  } catch (error) {
    console.error('Database insert error:', error);
    return { message: 'Failed to insert item', status: 500 };
  }
}