import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  usePathname() {
    return '';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock lucide-react
jest.mock('lucide-react', () => ({
  Mail: () => 'MailIcon',
}));

// Mock server action
jest.mock('@/lib/actions', () => ({
  insertNewItem: jest.fn(),
}));