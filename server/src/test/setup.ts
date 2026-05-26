// src/test/setup.ts
import axios from 'axios';

// Mock axios globally
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.post.mockResolvedValue({
  data: { data: { link: 'https://checkout.flutterwave.com/pay/mock123' } },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {} as any,
});

// Mock @supabase/supabase-js globally
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockResolvedValue({ data: [{ id: 'mock-id' }], error: null }),
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      gte: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: { id: 'mock-id' }, error: null }),
    })),
  })),
}));

// Mock resend createResendClient
jest.mock('../configs/resend', () => ({
  createResendClient: jest.fn(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'mock-email-id' }),
    },
  })),
}));
