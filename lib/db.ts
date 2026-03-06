// lib/db.ts
import { MongoClient } from 'mongodb';
import { logger } from './logger';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'lease-manager';

// Validate MongoDB URI
if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
  logger.error('Invalid MongoDB URI format');
  throw new Error('Invalid MongoDB connection string');
}

const client = new MongoClient(uri, {
  // Security options
  maxPoolSize: 10,
  minPoolSize: 5,
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  // SSL/TLS for production
  tls: process.env.NODE_ENV === 'production',
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
});

export const db = client.db(dbName);

// Test connection on startup
async function testConnection() {
  try {
    await client.connect();
    logger.info('Connected to MongoDB');
    const collections = await db.listCollections().toArray();
    logger.info('Collections:', collections.map(c => c.name));
  } catch (error) {
    logger.error('MongoDB connection failed', error);
    throw error;
  }
}

testConnection();