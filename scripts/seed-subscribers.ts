// scripts/seed-subscribers.ts
import { db } from '../lib/db';

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
  {
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    message: 'Best experience ever!',
    createdAt: new Date('2024-02-20').toISOString(),
  },
  {
    name: 'Evan Wright',
    email: 'evan.wright@example.com',
    message: 'Highly satisfied with the service.',
    createdAt: new Date('2024-03-01').toISOString(),
  },
  {
    name: 'Fiona Green',
    email: 'fiona.green@example.com',
    message: 'Great value for money.',
    createdAt: new Date('2024-03-05').toISOString(),
  },
  {
    name: 'George Harris',
    email: 'george.harris@example.com',
    message: 'Professional and reliable.',
    createdAt: new Date('2024-03-10').toISOString(),
  },
  {
    name: 'Hannah Lee',
    email: 'hannah.lee@example.com',
    message: 'Will definitely recommend to friends.',
    createdAt: new Date('2024-03-15').toISOString(),
  },
];

async function seedSubscribers() {
  console.log('🌱 Seeding fake subscribers...');

  try {
    // Clear existing subscribers (optional)
    await db.collection('subscribers').deleteMany({});
    console.log('✅ Cleared existing subscribers');

    // Insert fake subscribers
    const result = await db.collection('subscribers').insertMany(fakeSubscribers);

    console.log(`✅ ${result.insertedCount} fake subscribers created!`);
    console.log('\n📋 Subscriber List:');
    fakeSubscribers.forEach((sub, index) => {
      console.log(`   ${index + 1}. ${sub.name} - ${sub.email}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding subscribers:', error);
    process.exit(1);
  }
}

seedSubscribers();