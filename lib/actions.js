// lib/actions.js
'use server';

import pool from './mysql';

export async function insertNewItem(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  if (!name || !email || !message) {
    return { message: 'Missing fields', status: 400 };
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO subscribers (name, email,message) VALUES (?, ?,?)',
      [name, email,message]
    );
    return { message: 'Item inserted successfully', status: 200, insertId: result.insertId };
  } catch (error) {
    console.error('Database insert error:', error);
    return { message: 'Failed to insert item', status: 500 };
  }
}
