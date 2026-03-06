// scripts/seed-subscribers.ts
import { db } from '../lib/db';
import { logger } from '../lib/logger';

interface FakeSubscriber {
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const fakeSubscribers: FakeSubscriber[] = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    message: 'Great service! Highly recommend.',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    message: 'Very professional team.',
    createdAt: new Date('2024-01-20').toISOString(),
  },
  {
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    message: 'Excellent support and fast response.',
    createdAt: new Date('2024-02-01').toISOString(),
  },
  {
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    message: 'Love the product! Will buy again.',
    createdAt: new Date('2024-02-10').toISOString(),
  },
  {
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    message: 'Outstanding quality and service.',
    createdAt: new Date('2024-02-15').toISOString(),
  },
];

async function seedSubscribers() {
  logger.info('Seeding fake subscribers...');

  try {
    await db.collection('subscribers').deleteMany({});
    logger.info('Cleared existing subscribers');

    const result = await db.collection('subscribers').insertMany(fakeSubscribers);

    logger.info(`${result.insertedCount} fake subscribers created!`);
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding subscribers', error);
    process.exit(1);
  }
}

seedSubscribers();