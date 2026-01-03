// src/test/setup.ts
// Mock config, Redis, Resend only — no MongoDB
const mockConfig = {
  MONGO_URI: 'mongodb://localhost:27017/test',
  RESEND_API_KEY: 're_fake_test_key',
  REDIS_URL: 'redis://localhost:6379',
};

jest.mock('../configs/config', () => mockConfig);

jest.mock('../configs/redis', () => ({
  redisClient: new (require('ioredis-mock'))(),
}));

jest.mock('../configs/resend', () => ({
  resend: {
    emails: {
      send: jest.fn().mockResolvedValue({ data: { id: 'mocked' } }),
    },
  },
}));