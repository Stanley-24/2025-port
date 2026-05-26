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
  createClient: jest.fn(() => {
    const queryBuilder: any = {
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      gte: jest.fn().mockResolvedValue({ count: 0, error: null }),
      limit: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: { id: 'mock-id' }, error: null }),
    };

    return {
      from: jest.fn(() => queryBuilder),
    };
  }),
}));

// Mock resend createResendClient
jest.mock('../configs/resend', () => ({
  createResendClient: jest.fn(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'mock-email-id' }),
    },
  })),
}));
