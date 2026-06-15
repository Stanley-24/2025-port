import axios from 'axios';
import logger from '../lib/loggers';
import { createResendClient } from '../configs/resend';
import { buildFromAddress } from './emailService';
import { ImmediateThankYou } from '../emails/templates/ImmediateThankYou';
import type { Bindings } from '../configs/bindings';
import { getSupabaseClient } from '../lib/supabase';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SERVICE_AMOUNT_CAP_NGN = 50_000_000;

const normalizeWebhookStatus = (flutterwaveStatus: unknown): 'successful' | 'failed' => {
  const statusValue = String(flutterwaveStatus ?? '').toLowerCase();
  return ['successful', 'completed'].includes(statusValue) ? 'successful' : 'failed';
};

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

  const depositAmount = Number(amount);
  const normalizedFullName = fullName.trim();

  const normalizedEmail = email.trim().toLowerCase();
  if (!EMAIL_REGEX.test(normalizedEmail)) {
    throw new Error('Please provide a valid email address');
  }

  if (service.trim().length < 3 || service.trim().length > 100) {
    throw new Error('Service must be between 3 and 100 characters');
  }

  if (depositAmount > SERVICE_AMOUNT_CAP_NGN) {
    throw new Error('Amount exceeds allowed payment cap');
  }

  const fullAmount = providedFull || Math.round(depositAmount / 0.7);
  const balanceDue = fullAmount - depositAmount;
  const reference_id = `STAN-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;

  // Save payment intent to Supabase
  const supabase = getSupabaseClient(env);

  const { error: dbError } = await supabase.from('payments').insert({
    reference_id,
    customer_name: normalizedFullName,
    customer_email: normalizedEmail,
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
    customer: { email: normalizedEmail, name: normalizedFullName },
    meta: { fullName: normalizedFullName, service },
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
  if (!tx_ref) {
    console.error('[PAYMENT_WEBHOOK_MISSING_TX_REF]', {
      event: payload?.event,
      payload_data_keys: Object.keys(payload?.data || {}),
      customer_email: payload?.data?.customer?.email,
      transaction_id: payload?.data?.id,
    });
    logger.error('Webhook missing tx_ref; skipping processing', {
      event: payload?.event,
      payload_data_keys: Object.keys(payload?.data || {}),
    });
    return;
  }

  const status = normalizeWebhookStatus(payload?.data?.status);
  const meetingLink = `${env.MEETING_LINK || 'https://calendly.com/stanleyowarieta/meeting'}?tx_ref=${tx_ref}`;

  try {
    const supabase = getSupabaseClient(env);

    const shouldSendEmail = status === 'successful';

    // Idempotency: only process successful payments that haven't sent email yet.
    let paymentQuery = supabase
      .from('payments')
      .update({
        status,
        flutterwave_ref: payload?.data?.flw_ref ?? null,
        amount_paid: status === 'successful' ? Number(payload?.data?.amount ?? 0) : 0,
        updated_at: new Date().toISOString(),
      })
      .eq('reference_id', tx_ref);

    if (shouldSendEmail) {
      paymentQuery = paymentQuery.eq('email_sent', false);
    }

    const { data: payment, error: updateError } = await paymentQuery.select().single();

    if (updateError || !payment) {
      console.error('[PAYMENT_WEBHOOK_DB_NO_MATCH_OR_ERROR]', {
        tx_ref,
        supabase_error: updateError?.message,
        supabase_details: updateError?.details,
        hint: "Update uses eq('reference_id', tx_ref) and email gate for successful status",
      });
      logger.info('Webhook ignored — payment not found or email already sent', {
        tx_ref,
        supabase_error: updateError?.message,
      });
      return;
    }

    if (shouldSendEmail) {
      logger.info('Payment successful — sending thank you email', { tx_ref });

      try {
        const recipientEmail = (payment.email ?? payment.customer_email ?? '').trim();
        if (!recipientEmail) {
          logger.error('Missing payment email; skipping thank you email', { tx_ref });
          return;
        }

        const resend = createResendClient(env.RESEND_API_KEY);

        await resend.emails.send({
          from: buildFromAddress('Stanley Owarieta', env),
          to: recipientEmail,
          subject: "Deposit Received — Let's Schedule Your Project!",
          react: ImmediateThankYou({
            fullName: payment.full_name ?? payment.customer_name,
            service: payment.service,
            meetingLink,
            depositAmount: payment.deposit_amount || payment.amount,
            fullAmount: payment.full_amount,
            balanceDue: payment.balance_due,
            message: payment.message || '',
          }),
        });

        await supabase
          .from('payments')
          .update({ email_sent: true, updated_at: new Date().toISOString() })
          .eq('reference_id', tx_ref)
          .eq('email_sent', false);

        logger.info('Thank you email sent successfully', { tx_ref });
      } catch (error: any) {
        console.error('[PAYMENT_WEBHOOK_EMAIL_SEND_ERROR]', {
          tx_ref,
          error: error?.message || error,
          stack: error?.stack,
        });
        logger.error('Failed to send thank you email', { tx_ref, error: error.message });
      }
    }
  } catch (error: any) {
    console.error('[PAYMENT_WEBHOOK_PERSISTENCE_ERROR]', {
      tx_ref,
      error: error?.message || error,
      stack: error?.stack,
    });
    logger.error('Webhook persistence failed', {
      tx_ref,
      error: error.message,
      stack: error.stack,
    });
  }
};

export const reconcilePaymentStatusByReference = async (txRef: string, env: Bindings) => {
  const normalizedTxRef = String(txRef ?? '').trim();

  if (!normalizedTxRef) {
    throw new Error('tx_ref is required');
  }

  const supabase = getSupabaseClient(env);

  const { data: existingPayment, error: fetchError } = await supabase
    .from('payments')
    .select('*')
    .eq('reference_id', normalizedTxRef)
    .single();

  if (fetchError || !existingPayment) {
    throw new Error('Payment not found');
  }

  try {
    const verifyResponse = await axios.get<any>(
      `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${encodeURIComponent(normalizedTxRef)}`,
      {
        headers: { Authorization: `Bearer ${env.FLUTTERWAVE_SECRET_KEY}` },
        timeout: 8000,
      }
    );

    const verifiedData = verifyResponse?.data?.data;
    if (verifyResponse?.data?.status === 'success' && verifiedData?.tx_ref === normalizedTxRef) {
      await handleWebhookEvent(
        {
          event: 'charge.completed',
          data: verifiedData,
        },
        env
      );
    }
  } catch (error: any) {
    logger.warn('Verify-by-reference failed; returning current payment status', {
      tx_ref: normalizedTxRef,
      error: error?.response?.data || error?.message,
    });
  }

  const { data: latestPayment, error: latestError } = await supabase
    .from('payments')
    .select('*')
    .eq('reference_id', normalizedTxRef)
    .single();

  if (latestError || !latestPayment) {
    throw new Error('Payment not found');
  }

  return {
    tx_ref: normalizedTxRef,
    status: latestPayment.status,
    email_sent: Boolean(latestPayment.email_sent),
    amount_paid: Number(latestPayment.amount_paid ?? 0),
    meeting_link: latestPayment.meeting_link ?? null,
  };
};
