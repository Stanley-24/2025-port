import { Redis } from 'ioredis';
import config from './config';

export const redisClient = new Redis(config.REDIS_URL, {
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  lazyConnect: false,
});


redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});



