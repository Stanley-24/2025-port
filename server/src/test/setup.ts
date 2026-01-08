// src/test/jest.setup.ts
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.post.mockResolvedValue({
  data: { data: { link: 'https://checkout.flutterwave.com/pay/mock123' } },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {} as any,
});

// Mock config
jest.mock('../configs/config', () => ({
  __esModule: true,
  default: {
    MONGO_URI: 'mongodb://localhost:27017/test',
    REDIS_URL: 'redis://localhost:6379',
    RESEND_API_KEY: 'test-resend-key',
    AdminEmail: 'admin@test.com',
    SenderEmail: 'no-reply@test.com',
    PORT: '3000',
    FRONTEND_URL: 'http://localhost:5173',
    publicKey: 'FLWPUBK_TEST-fake',
    secretKey: 'FLWSECK_TEST-fake',
    encryptionKey: 'test-encryption-key',
    webhookSecret: 'test-webhook-secret',
    meetingLink: 'https://calendly.com/test',
  },
}));

// Mock resend
jest.mock('../configs/resend', () => ({
  resend: {
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'mock-email-id' }),
    },
  },
}));

// Mock redis
jest.mock('../configs/redis', () => ({
  redisClient: new (require('ioredis-mock'))(),
}));

// Mock flutterwave-node-v3
jest.mock('flutterwave-node-v3', () => jest.fn());
