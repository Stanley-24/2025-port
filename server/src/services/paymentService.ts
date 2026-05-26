import axios from 'axios';
import logger from '../lib/loggers';
import { createResendClient } from '../configs/resend';
import { buildFromAddress } from './emailService';
import { ImmediateThankYou } from '../emails/templates/ImmediateThankYou';
import type { Bindings } from '../configs/bindings';
import type { IPayment } from '../types/payment';
import { getSupabaseClient } from '../lib/supabase';

/**
 * Initiate Flutterwave payment (deposit)
 */
export const initiatePayment = async (
  data: {
    fullName: string;
    email: string;
    service: string;
    amount: number;
    message?: string;
    fullAmount?: number;
  },
  env: Bindings
) => {
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
  const fullAmount = providedFull || Math.round(depositAmount / 0.7);
  const balanceDue = fullAmount - depositAmount;
  const reference_id = `STAN-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;

  // Save payment intent to Supabase
  const supabase = getSupabaseClient(env);

  const { error: dbError } = await supabase.from('payments').insert({
    reference_id,
    customer_name: fullName,
    customer_email: email,
    service,
    amount: depositAmount,
    deposit_amount: depositAmount,
    full_amount: fullAmount,
    balance_due: balanceDue,
    message,
    currency: 'NGN',
    status: 'pending',
    email_sent: false,
  });


  if (dbError) {
    logger.error('Failed to save payment intent', { error: dbError.message });
    throw new Error('Failed to save payment intent');
  }

  const payload = {
    tx_ref: reference_id, // Flutterwave expects tx_ref, but our DB uses reference_id
    amount: depositAmount,
    currency: 'NGN',
    redirect_url: `${env.FRONTEND_URL}/payment-success?tx_ref=${reference_id}`,
    payment_options: 'card,banktransfer,ussd',
    customer: { email, name: fullName },
    meta: { fullName, service },
    customizations: {
      title: 'Stanley Owarieta - Services',
      description: `Payment for ${service}`,
      logo: env.PaymentLogo,
    },
  };

  try {
    const response = await axios.post<{ data: { link: string } }>(
      'https://api.flutterwave.com/v3/payments',
      payload,
      {
        headers: {
          Authorization: `Bearer ${env.FLUTTERWAVE_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return { payment_link: response.data.data.link, tx_ref: reference_id };
  } catch (error: any) {
    logger.error('Flutterwave payment initiation failed', {
      message: error.message,
      response: error.response?.data,
    });
    throw new Error('Failed to initiate payment');
  }
};


/**
 * Handle Flutterwave webhook event — idempotent via emailSent guard
 */
export const handleWebhookEvent = async (payload: any, env: Bindings) => {
  if (payload?.event !== 'charge.completed') return;

  const tx_ref = payload?.data?.tx_ref;
  if (!tx_ref) return;

  const flutterwaveStatus = payload.data.status;
  const status = ['successful', 'completed'].includes(flutterwaveStatus) ? 'successful' : 'failed';
  const meetingLink = `${env.MEETING_LINK || 'https://calendly.com/stanleyowarieta/meeting'}?tx_ref=${tx_ref}`;

  const supabase = getSupabaseClient(env);

  // Idempotency: only update if email_sent is false
  const { data: payment, error: updateError } = await supabase
    .from('payments')
    .update({
      status,
      flutterwave_data: payload.data,
      meeting_link: meetingLink,
      ...(status === 'successful' ? { email_sent: true } : {}),
      updated_at: new Date().toISOString(),
    })
    .eq('tx_ref', tx_ref)
    .eq('email_sent', false)
    .select()
    .single();

  if (updateError || !payment) {
    logger.info('Webhook ignored — payment not found or email already sent', { tx_ref });
    return;
  }

  if (status === 'successful') {
    logger.info('Payment successful — sending thank you email', { tx_ref });

    try {
      const resend = createResendClient(env.RESEND_API_KEY);

      await resend.emails.send({
        from: buildFromAddress('Stanley Owarieta', env),
        to: payment.email.trim(),
        subject: "Deposit Received — Let's Schedule Your Project!",
        react: ImmediateThankYou({
          fullName: payment.full_name,
          service: payment.service,
          meetingLink: payment.meeting_link,
          depositAmount: payment.deposit_amount || payment.amount,
          fullAmount: payment.full_amount,
          balanceDue: payment.balance_due,
          message: payment.message || '',
        }),
      });

      logger.info('Thank you email sent successfully', { tx_ref });
    } catch (error: any) {
      logger.error('Failed to send thank you email', { tx_ref, error: error.message });
    }
  }
};
