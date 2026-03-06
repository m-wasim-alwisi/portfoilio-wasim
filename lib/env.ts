// lib/env.ts
export const env = {
  // Validate required environment variables
  required: ['MONGODB_URI', 'MONGODB_DB'],
  
  // Validate environment
  validate: () => {
    const missing = env.required.filter(key => !process.env[key]);
    if (missing.length > 0) {
      console.error('Missing required environment variables:', missing);
      process.exit(1);
    }
  },
  
  // Get secure value
  getSecure: (key: string, defaultValue: string = ''): string => {
    const value = process.env[key] || defaultValue;
    // Don't log sensitive values
    if (key.includes('SECRET') || key.includes('PASSWORD') || key.includes('TOKEN')) {
      return '***';
    }
    return value;
  },
};

// Validate on startup
env.validate();