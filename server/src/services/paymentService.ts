import axios from 'axios';
import Payment from '../models/Payment';
import logger from '../lib/loggers';
import { resend } from '../configs/resend';
import { ImmediateThankYou } from '../emails/templates/ImmediateThankYou';
import config from '../configs/config';

/**
 * Initiate Flutterwave payment (deposit)
 */
export const initiatePayment = async (data: {
  fullName: string;
  email: string;
  service: string;
  amount: number;
  message?: string;
  fullAmount?: number;
}) => {
  const {
    fullName,
    email,
    service,
    amount,
    message = '',
    fullAmount: providedFull,
  } = data;

  if (!fullName || !email || !service || !amount || amount <= 0) {
    throw new Error('All fields are required and amount must be positive');
  }

  const depositAmount = amount;
  const fullAmount =
    providedFull || Math.round(depositAmount / 0.7); 
  const balanceDue = fullAmount - depositAmount;

  const tx_ref = `STAN-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;

  // Save payment intent
  const payment = new Payment({
    tx_ref,
    fullName,
    email,
    service,
    amount: depositAmount,
    depositAmount,
    fullAmount,
    balanceDue,
    message,
    status: 'pending',
    emailSent: false,
  });

  await payment.save();

  const payload = {
    tx_ref,
    amount: depositAmount,
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
      logo: `${config.FRONTEND_URL}/assets/stan-pic-DL1D6m0c.jpg`,
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

/**
 * Handle Flutterwave webhook event
 * This MUST be idempotent and race-condition safe
 */
export const handleWebhookEvent = async (payload: any) => {
  if (payload?.event !== 'charge.completed') return;

  const tx_ref = payload?.data?.tx_ref;
  if (!tx_ref) return;

  const flutterwaveStatus = payload.data.status;
  const status = ['successful', 'completed'].includes(flutterwaveStatus)
    ? 'successful'
    : 'failed';


  const updateFields: any = {
    status,
    flutterwaveData: payload.data,
    updatedAt: new Date(),
    meetingLink: `${config.meetingLink}?tx_ref=${tx_ref}`,
  };


  if (status === 'successful') {
    updateFields.emailSent = true;
  }

 
  const payment = await Payment.findOneAndUpdate(
    {
      tx_ref,
      emailSent: { $ne: true }, 
    },
    {
      $set: updateFields,
      $setOnInsert: {
        createdAt: new Date(),
        
      },
    },
    {
      new: true,
      upsert: false,
    }
  );

  if (!payment) {
    logger.info('Webhook ignored — payment not found or email already sent', { tx_ref });
    return;
  }

  if (status === 'successful') {
    logger.info('Payment successful — sending thank you email', { tx_ref });

    try {
      if (!payment.email) {
        console.warn('No email provided for payment ID:', payment._id);
        return;
      }

      await resend.emails.send({
        from: `Stanley Owarieta <${config.SenderEmail}>`,
        to: payment.email.trim(),
        subject: "Deposit Received — Let's Schedule Your Project!",
        react: ImmediateThankYou({
          fullName: payment.fullName,
          service: payment.service,
          meetingLink: payment.meetingLink!,
          depositAmount: payment.depositAmount || payment.amount,
          fullAmount: payment.fullAmount,
          balanceDue: payment.balanceDue,
          message: payment.message || '',
        }),
      });

      logger.info('Thank you email sent successfully', { tx_ref });
    } catch (error: any) {
      logger.error('Failed to send thank you email', { tx_ref, error });
      
    }
  }
};