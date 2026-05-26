// src/test/mocks/configMock.ts
import type { Bindings } from '../../configs/bindings';

export const mockEnv: Bindings = {
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
