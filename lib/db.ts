// lib/db.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'lease-manager';

const client = new MongoClient(uri);

export const db = client.db(dbName);