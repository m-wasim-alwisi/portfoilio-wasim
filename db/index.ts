import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

// This creates the file 'sqlite.db' if it doesn't exist
const sqlite = new Database('sqlite.db'); 
export const db = drizzle(sqlite);