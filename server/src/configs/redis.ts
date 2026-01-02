import { Redis } from 'ioredis';
import config from './config';

export const redisClient = new Redis(config.REDIS_URL);

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});