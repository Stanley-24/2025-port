// src/test/contactService.test.ts
import { ContactService } from '../services/contactService';
import { sendContactNotification, sendConfirmationEmail } from '../services/emailService';
import type { Bindings } from '../configs/bindings';

jest.mock('../services/emailService', () => ({
  sendContactNotification: jest.fn().mockResolvedValue(undefined),
  sendConfirmationEmail: jest.fn().mockResolvedValue(undefined),
}));

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

describe('ContactService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('saves valid message and sends emails', async () => {
    const data = {
      fullName: 'John Doe',
      email: 'john@example.com',
      subject: 'Hello there',
      message: 'This is a long enough message to pass validation.',
    };

    const result = await ContactService.processContactForm(data, mockEnv);

    expect(result.success).toBe(true);
    expect(sendContactNotification).toHaveBeenCalledTimes(1);
    expect(sendConfirmationEmail).toHaveBeenCalledTimes(1);
  });

  it('rejects invalid data', async () => {
    const invalid = {
      fullName: 'J',
      email: 'bad',
      subject: 'Hi',
      message: 'short',
    };

    await expect(ContactService.processContactForm(invalid, mockEnv)).rejects.toMatchObject({
      statusCode: 400,
    });
  });
});
