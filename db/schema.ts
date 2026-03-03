import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const subscribers = sqliteTable('subscribers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  createdAt: text('created_at').default(new Date().toISOString()),

});