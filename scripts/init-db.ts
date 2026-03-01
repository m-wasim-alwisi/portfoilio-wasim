// init-db.ts
import Database from 'better-sqlite3';
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// Connect to the file
const db = new Database('sqlite.db');

console.log('Creating tables...');

// Create Properties
db.exec(`
  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

// // Create Tenants
// db.exec(`
//   CREATE TABLE IF NOT EXISTS tenants (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     email TEXT
//   )
// `);

// // Create Contracts
// db.exec(`
//   CREATE TABLE IF NOT EXISTS contracts (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     property_id INTEGER NOT NULL,
//     tenant_id INTEGER NOT NULL,
//     rent_amount REAL NOT NULL,
//     start_date TEXT NOT NULL,
//     end_date TEXT NOT NULL,
//     status TEXT DEFAULT 'ACTIVE',
//     created_at TEXT DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY(property_id) REFERENCES properties(id),
//     FOREIGN KEY(tenant_id) REFERENCES tenants(id)
//   )
// `);

console.log('Tables created successfully!');
db.close();