// lib/db.ts
import { MongoClient } from 'mongodb';
import { setServers } from "node:dns/promises";

setServers(["1.1.1.1", "8.8.8.8"]);
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'lease-manager';
const client = new MongoClient(uri);

async function testConnection() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB!');
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
  }
}

testConnection();

export const db = client.db(dbName);