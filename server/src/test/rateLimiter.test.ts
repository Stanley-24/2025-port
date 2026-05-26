// server/src/test/rateLimiter.test.ts
import { contactRateLimiter } from '../middleware/rateLimiter';
import { createClient } from '@supabase/supabase-js';
import type { Bindings } from '../configs/bindings';

const mockEnv: Bindings = {
  SUPABASE_URL: 'https://mock.supabase.co',
  SUPABASE_SERVICE_ROLE_KEY: 'mock-service-role-key',
  RESEND_API_KEY: 're_test_fake',
  AdminEmail: 'admin@test.com',
  SenderEmail: 'noreply@test.com',
  FRONTEND_URL: 'http://localhost:5173',
  FLUTTERWAVE_PUBLIC_KEY: 'FLWPUBK_TEST-fake',
  FLUTTERWAVE_SECRET_KEY: 'FLWSECK_TEST-fake',
  FLUTTERWAVE_ENCRYPTION_KEY: 'test-enc-key',
  FLUTTERWAVE_WEBHOOK_SECRET: 'test-webhook-secret',
  MEETING_LINK: 'https://calendly.com/test',
  PaymentLogo: 'https://example.com/logo.png',
};

const makeContext = (email: string, ip = '127.0.0.1') => {
  const headers: Record<string, string> = { 'cf-connecting-ip': ip };
  const responseHeaders = new Map<string, string>();
  const next = jest.fn().mockResolvedValue(undefined);
  const ctx: any = {
    env: mockEnv,
    req: {
      header: (name: string) => headers[name] ?? null,
      json: jest.fn().mockResolvedValue({ email }),
    },
    res: {
      headers: { set: jest.fn((k: string, v: string) => responseHeaders.set(k, v)) },
    },
    json: jest.fn((body: any, status = 200) => ({ body, status })),
  };
  return { ctx, next };
};

describe('contactRateLimiter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows a request when under the limit', async () => {
    // Supabase mock returns count=0 (under limit)
    (createClient as jest.Mock).mockReturnValue({
      from: jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        insert: jest.fn().mockResolvedValue({ data: null, error: null }),
        eq: jest.fn().mockReturnThis(),
        gte: jest.fn().mockResolvedValue({ count: 0, error: null }),
      })),
    });

    const { ctx, next } = makeContext('test@example.com');
    await contactRateLimiter(ctx, next);

    expect(next).toHaveBeenCalled();
    expect(ctx.json).not.toHaveBeenCalled();
  });

  it('blocks a request when limit is exceeded', async () => {
    // Supabase mock returns count >= limit for IP
    (createClient as jest.Mock).mockReturnValue({
      from: jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        insert: jest.fn().mockResolvedValue({ data: null, error: null }),
        eq: jest.fn().mockReturnThis(),
        gte: jest.fn().mockResolvedValue({ count: 999, error: null }),
      })),
    });

    const { ctx, next } = makeContext('spam@example.com');
    await contactRateLimiter(ctx, next);

    expect(next).not.toHaveBeenCalled();
    expect(ctx.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false }),
      429
    );
  });
});
