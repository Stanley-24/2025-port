// src/test/setup.ts
// Mock config, Redis, Resend only — no MongoDB
import { mockConfig } from './mocks/configMock';


jest.mock('../configs/config', () => ({ default: mockConfig }));

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