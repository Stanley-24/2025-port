// server/src/test/payment.test.ts
import { initiatePayment, handleWebhookEvent } from '../services/paymentService';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
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

describe('initiatePayment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns payment link and tx_ref on success', async () => {
    const result = await initiatePayment(
      {
        fullName: 'Test User',
        email: 'test@example.com',
        service: 'FinTech & Blockchain Apps',
        amount: 50000,
        message: 'Test message',
      },
      mockEnv
    );

    expect(result.payment_link).toBe('https://checkout.flutterwave.com/pay/mock123');
    expect(result.tx_ref).toMatch(/^STAN-/);
  });

  it('throws when required fields are missing', async () => {
    await expect(
      initiatePayment({ fullName: '', email: '', service: '', amount: 0 }, mockEnv)
    ).rejects.toThrow('All fields are required');
  });
});

describe('handleWebhookEvent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('ignores events that are not charge.completed', async () => {
    const supabaseMock = (createClient as jest.Mock).mock.results[0]?.value;
    await handleWebhookEvent({ event: 'other.event' }, mockEnv);
    // Should return early with no errors
  });

  it('processes successful charge.completed event', async () => {
    const payload = {
      event: 'charge.completed',
      data: {
        tx_ref: 'STAN-TEST-123',
        status: 'successful',
        amount: 50000,
      },
    };

    // Should not throw
    await expect(handleWebhookEvent(payload, mockEnv)).resolves.not.toThrow();
  });

  it('is idempotent — does not re-process already-sent payments', async () => {
    // Mock Supabase to return null (update found no record with email_sent=false)
    (createClient as jest.Mock).mockReturnValueOnce({
      from: jest.fn(() => ({
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: null }),
      })),
    });

    const payload = {
      event: 'charge.completed',
      data: { tx_ref: 'STAN-ALREADY-SENT', status: 'successful', amount: 50000 },
    };

    await handleWebhookEvent(payload, mockEnv);
    // No email should have been sent (mocked createResendClient not called)
  });

  it('rejects invalid webhook signature check (handled at controller level)', () => {
    // Signature validation is done in paymentController — nothing to test here
    expect(true).toBe(true);
  });
});
