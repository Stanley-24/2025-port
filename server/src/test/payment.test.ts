// server/src/test/payment.test.ts
// Import mocks and DB setup
import '../test/setup';
import '../test/setup-db';


import request from 'supertest';
import app from '../app';
import Payment from '../models/Payment';
import { resend } from '../configs/resend';



describe('POST /api/v1/payment/initiate', () => {
  it('should return payment link', async () => {
    const payload = {
      fullName: "Test User",
      email: "test@example.com",
      service: "FinTech & Blockchain Apps",
      amount: 50000,
      message: "Test message",
    };

    const res = await request(app)
      .post('/api/v1/payment/initiate')
      .send(payload)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.payment_link).toBe('https://checkout.flutterwave.com/pay/mock123');
    expect(res.body.tx_ref).toMatch(/^STAN-/);

    // Check DB
    const payment = await Payment.findOne({ tx_ref: res.body.tx_ref });
    expect(payment).toBeTruthy();
    expect(payment?.depositAmount).toBe(50000);
    expect(payment?.fullAmount).toBe(Math.round(50000 / 0.7));
    expect(payment?.balanceDue).toBe(Math.round(50000 / 0.7) - 50000);
    expect(payment?.message).toBe("Test message");
    expect(payment?.emailSent).toBe(false);
  });

  it('should reject missing fields', async () => {
    const res = await request(app)
      .post('/api/v1/payment/initiate')
      .send({ fullName: "Test" })
      .expect(400);

    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('All fields are required');
  });
});

describe('Payment Webhook', () => {
  let tx_ref: string;

  beforeAll(() => {
    // Clear mock before starting this describe block
    jest.clearAllMocks();
    tx_ref = 'STAN-TEST-123';
  });

  beforeEach(async () => {
    // Recreate payment before each test (since afterEach clears the DB)
    await Payment.create({
      tx_ref,
      fullName: 'Webhook Test',
      email: 'webhook@test.com',
      service: 'Test Service',
      amount: 50000,
      depositAmount: 50000,
      fullAmount: 71429,
      balanceDue: 21429,
      message: 'Test message',
      status: 'pending',
      emailSent: false,
    });
  });

  it('should handle successful payment and send thank you email', async () => {
    const payload = {
      event: 'charge.completed',
      data: {
        tx_ref,
        status: 'successful',
        amount: 50000,
      },
    };

    await request(app)
      .post('/api/v1/payment/webhook')
      .set('verif-hash', 'test-webhook-secret')
      .send(payload)
      .expect(200);

    const payment = await Payment.findOne({ tx_ref });
    expect(payment?.status).toBe('successful');
    expect(payment?.emailSent).toBe(true);

    expect(resend.emails.send).toHaveBeenCalledTimes(1);
    expect(resend.emails.send).toHaveBeenCalledWith(expect.objectContaining({
      to: 'webhook@test.com',
      subject: "Deposit Received — Let's Schedule Your Project!",
      react: expect.anything(),
    }));
  });

  it('should be idempotent - not send email twice', async () => {
    // Get the call count before this test
    const callCountBefore = (resend.emails.send as jest.Mock).mock.calls.length;

    // Create payment in the state it would be after first webhook (already processed)
    await Payment.findOneAndUpdate(
      { tx_ref },
      {
        status: 'successful',
        emailSent: true,
        meetingLink: `https://calendly.com/test?tx_ref=${tx_ref}`,
      },
      { upsert: true, new: true }
    );

    const payload = {
      event: 'charge.completed',
      data: {
        tx_ref,
        status: 'successful',
        amount: 50000,
      },
    };

    // Second call - should not send email again
    await request(app)
      .post('/api/v1/payment/webhook')
      .set('verif-hash', 'test-webhook-secret')
      .send(payload)
      .expect(200);

    // Email should not have been called again (call count should be unchanged)
    expect(resend.emails.send).toHaveBeenCalledTimes(callCountBefore);
    
    // Verify payment still has emailSent: true
    const payment = await Payment.findOne({ tx_ref });
    expect(payment?.emailSent).toBe(true);
    expect(payment?.status).toBe('successful');
  });

  it('should reject invalid webhook signature', async () => {
    await request(app)
      .post('/api/v1/payment/webhook')
      .set('verif-hash', 'wrong-secret')
      .send({})
      .expect(401);
  });
});