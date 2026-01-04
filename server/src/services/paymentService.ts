// src/services/paymentService.ts
import axios from 'axios';
import Flutterwave from 'flutterwave-node-v3';
import Payment from '../models/Payment';
import logger from '../lib/loggers';
import { resend } from '../configs/resend';
import { ImmediateThankYou } from '../emails/templates/ImmediateThankYou';
import config from '../configs/config';

const flw = new Flutterwave(config.publicKey, config.secretKey  );

export const initiatePayment = async (data: {
  fullName: string;
  email: string;
  service: string;
  amount: number;
  message?: string;
}) => {
  const { fullName, email, service, amount } = data;

  if (!fullName || !email || !service || !amount) {
    throw new Error('All fields are required');
  }

  const tx_ref = `STAN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const payment = new Payment({
    tx_ref,
    fullName,
    email,
    service,
    amount,
    message: data.message || '',
    status: 'pending',
  });
  await payment.save();

  const payload = {
    tx_ref,
    amount,
    currency: 'NGN',
    redirect_url: `${config.FRONTEND_URL}/payment-success?tx_ref=${tx_ref}`,
    payment_options: 'card,banktransfer,ussd',
    customer: {
      email,
      name: fullName,
    },
    meta: { fullName, service },
    customizations: {
      title: 'Stanley Owarieta - Services',
      description: `Payment for ${service}`,
      logo: `${config.FRONTEND_URL}/logo.png`,
    },
  };
  try {
    const response = await axios.post<{ data: { link: string } }>(
      'https://api.flutterwave.com/v3/payments',
      payload,
      {
        headers: {
          Authorization: `Bearer ${config.secretKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      payment_link: response.data.data.link,
      tx_ref,
    };
  } catch (error: any) {
    logger.error('Flutterwave payment initiation failed', {
      message: error.message,
      response: error.response?.data,
    });
    throw new Error('Failed to initiate payment');
  }
};

export const handleWebhookEvent = async (payload: any) => {
  if (payload.event !== 'charge.completed') return;

  const tx_ref = payload.data.tx_ref;
  const status = payload.data.status === 'successful' ? 'successful' : 'failed';

  const payment = await Payment.findOneAndUpdate(
    { tx_ref },
    {
      status,
      flutterwaveData: payload.data,
      updatedAt: new Date(),
      meetingLink: `${config.meetingLink}?tx_ref=${tx_ref}`,
    },
    { new: true }
  );

  if (!payment) return;

  if (status === 'successful') {
    logger.info('Payment successful');

    // Send immediate thank you
    await resend.emails.send({
      from: `Stanley Owarieta < ${config.SenderEmail}>`,
      to: payment.email,
      subject: "Payment Successful - Let's Schedule Our Meeting!",
      react: ImmediateThankYou({
        fullName: payment.fullName,
        service: payment.service,
        meetingLink: payment.meetingLink!,
      }),
    });
  }
};