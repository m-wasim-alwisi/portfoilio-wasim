// scripts/test-connection.ts
import { db } from '../lib/db';
import { logger } from '../lib/logger';

async function testConnection() {
  logger.info('Testing MongoDB connection...');

  try {
    await db.admin().ping();
    logger.info('✅ MongoDB connection successful!');
    
    const collections = await db.listCollections().toArray();
    logger.info('Collections:', collections.map(c => c.name));
    
    process.exit(0);
  } catch (error) {
    logger.error('❌ MongoDB connection failed', error);
    process.exit(1);
  }
}

testConnection();