// src/test/setup.ts
// Mock config, Redis, Resend only — no MongoDB
import { mockConfig } from './mocks/configMock';

jest.mock('../configs/config', () => ({
  default: {
    publicKey: 'FLWPUBK_TEST-fake',
    secretKey: 'FLWSECK_TEST-fake',
    FRONTEND_URL: 'http://localhost:5173',
    FLUTTERWAVE_WEBHOOK_SECRET: 'test-webhook-secret',
  },
}));

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






jest.mock('flutterwave-node-v3', () => {
  return jest.fn().mockImplementation(() => ({
    Payment: {
      link: jest.fn().mockResolvedValue({
        data: { link: 'https://checkout.flutterwave.com/pay/mock123' },
      }),
    },
    Transaction: {
      initiate: jest.fn().mockResolvedValue({
        data: { link: 'https://checkout.flutterwave.com/pay/mock123' },
      }),
    },
    Charge: {
      ng: jest.fn().mockResolvedValue({
        data: { link: 'https://checkout.flutterwave.com/pay/mock123' },
      }),
    },
  }));
});