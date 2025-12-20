import { insertNewItem } from '@/lib/actions';

// Mock the MySQL pool
jest.mock('@/lib/mysql', () => ({
  query: jest.fn(),
}));

import pool from '@/lib/mysql';

describe('insertNewItem server action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return success response when insertion is successful', async () => {
    // Mock successful database query
    pool.query.mockResolvedValue([{ insertId: 1 }]);

    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('email', 'john@example.com');
    formData.append('message', 'Hello');

    const response = await insertNewItem(formData);

    expect(response.status).toBe(200);
    expect(response.message).toBe('Subscriber added successfully!');
    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO'),
      expect.arrayContaining(['John Doe', 'john@example.com', 'Hello'])
    );
  });

  test('should handle duplicate email error', async () => {
    // Mock duplicate entry error
    const duplicateError = { code: 'ER_DUP_ENTRY' };
    pool.query.mockRejectedValue(duplicateError);

    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('email', 'john@example.com');

    const response = await insertNewItem(formData);

    expect(response.status).toBe(500);
    expect(response.message).toBe('Email already exists!');
  });

  test('should handle generic database error', async () => {
    // Mock generic error
    pool.query.mockRejectedValue(new Error('Database connection failed'));

    const formData = new FormData();

    const response = await insertNewItem(formData);

    expect(response.status).toBe(500);
    expect(response.message).toBe('Failed to add subscriber');
  });
});