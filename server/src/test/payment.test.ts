// server/src/test/payment.test.ts
import request from 'supertest';
import app from '../app';
import Payment from '../models/Payment';
import { resend } from '../configs/resend';

// Import non-DB setup (mocks Flutterwave, config, etc.)
import '../test/setup'; // This runs the mocks

// Import DB setup for webhook test
import '../test/setup-db';

describe('POST /api/v1/payment/initiate', () => {
  it('should return payment link', async () => {
    const payload = {
      fullName: "Test User",
      email: "test@example.com",
      service: "FinTech & Blockchain Apps",
      amount: 50000,
    };

    const res = await request(app)
      .post('/api/v1/payment/initiate')
      .send(payload)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.payment_link).toBe('https://checkout.flutterwave.com/pay/mock123');
    expect(res.body.tx_ref).toMatch(/^STAN-/);
  });

  it('should reject missing fields', async () => {
    const res = await request(app)
      .post('/api/v1/payment/initiate')
      .send({ fullName: "Test" })
      .expect(400);

    expect(res.body.success).toBe(false);
  });
});

describe('Payment Webhook', () => {
  let tx_ref: string;

  beforeAll(async () => {
    const payment = await Payment.create({
      tx_ref: 'STAN-TEST-123',
      fullName: 'Webhook Test',
      email: 'webhook@test.com',
      service: 'Test Service',
      amount: 50000,
      status: 'pending',
    });
    tx_ref = payment.tx_ref;
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

    const res = await request(app)
      .post('/api/v1/payment/webhook')
      .set('verif-hash', 'test-webhook-secret')
      .send(payload)
      .expect(200);

    const payment = await Payment.findOne({ tx_ref });
    expect(payment?.status).toBe('successful');

    expect(resend.emails.send).toHaveBeenCalled();
  });

  it('should reject invalid webhook signature', async () => {
    await request(app)
      .post('/api/v1/payment/webhook')
      .set('verif-hash', 'wrong-secret')
      .send({})
      .expect(401);
  });
});