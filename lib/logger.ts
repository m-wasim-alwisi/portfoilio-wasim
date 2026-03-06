// lib/logger.ts
const isProduction = process.env.NODE_ENV === 'production';

export const logger = {
  info: (message: string, data?: any) => {
    if (!isProduction) {
      console.log(`[INFO] ${message}`, data ? JSON.stringify(data) : '');
    }
  },
  error: (message: string, error?: any) => {
    if (!isProduction) {
      console.error(`[ERROR] ${message}`, error ? JSON.stringify(error) : '');
    } else {
      // In production, log to a service (e.g., Sentry, LogRocket)
      console.error(`[PROD ERROR] ${message}`);
    }
  },
  warn: (message: string, data?: any) => {
    if (!isProduction) {
      console.warn(`[WARN] ${message}`, data ? JSON.stringify(data) : '');
    }
  },
  debug: (message: string, data?: any) => {
    if (!isProduction) {
      console.debug(`[DEBUG] ${message}`, data ? JSON.stringify(data) : '');
    }
  },
};