// lib/rate-limit.ts
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute

export async function checkRateLimit(identifier: string): Promise<boolean> {
  const key = `rate_limit:${identifier}`;
  const current = await redis.get(key);
  
  if (current && Number(current) >= RATE_LIMIT_MAX) {
    return false;
  }
  
  await redis.incr(key);
  await redis.expire(key, Math.floor(RATE_LIMIT_WINDOW / 1000));
  
  return true;
}