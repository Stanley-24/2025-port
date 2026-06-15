// src/controllers/paymentController.ts
import type { Context } from 'hono';
import type { Bindings } from '../configs/bindings';
import {
  initiatePayment,
  handleWebhookEvent,
  reconcilePaymentStatusByReference,
} from '../services/paymentService';
import logger from '../lib/loggers';
import { timingSafeEqual } from '../lib/timingSafe';
import axios from 'axios';

type HonoCtx = Context<{ Bindings: Bindings }>;

export const initiate = async (c: HonoCtx) => {
  try {
    const body = await c.req.json();
    const result = await initiatePayment(body, c.env);
    return c.json({ success: true, ...result });
  } catch (error: any) {
    if (error.message?.includes('fields are required') || error.message?.includes('positive')) {
      return c.json({ success: false, message: error.message }, 400);
    }
    logger.error('Payment initiation failed', { error: error.message, stack: error.stack });
    return c.json({ success: false, message: 'Failed to initiate payment' }, 500);
  }
};

export const webhook = async (c: HonoCtx) => {
  const signature = c.req.header('verif-hash') ?? c.req.header('X-Flutterwave-Signature');
  const secretHash = c.env.FLUTTERWAVE_SECRET_HASH ?? c.env.FLUTTERWAVE_WEBHOOK_SECRET;

  if (!signature || !secretHash || !timingSafeEqual(signature, secretHash)) {
    logger.warn('Flutterwave webhook failed signature verification', {
      receivedSignature: signature ? '[redacted]' : 'missing',
    });
    return c.text('Unauthorized', 401);
  }

  let payload: any;
  try {
    payload = await c.req.json();
  } catch (parseError) {
    logger.error('Failed to parse webhook payload', { error: parseError });
    return c.text('Bad Request', 400);
  }

  const processWebhook = async () => {
    logger.info('🔥 FLUTTERWAVE WEBHOOK RECEIVED', {
      event: payload.event,
      tx_ref: payload.data?.tx_ref,
      status: payload.data?.status,
    });

    if (payload.event === 'charge.completed' && payload.data?.status === 'successful') {
      const txId = payload.data.id;
      const txRef = payload.data.tx_ref;

      try {
        const verifyResponse = await axios.get<any>(
          `https://api.flutterwave.com/v3/transactions/${txId}/verify`,
          {
            headers: { Authorization: `Bearer ${c.env.FLUTTERWAVE_SECRET_KEY}` },
            timeout: 8000,
          }
        );

        const verifiedData = verifyResponse.data.data;
        if (
          verifyResponse.data.status !== 'success' ||
          verifiedData.status !== 'successful' ||
          verifiedData.tx_ref !== txRef
        ) {
          logger.warn('Webhook: transaction verification failed', { tx_ref: txRef });
          return;
        }
      } catch (verifyError: any) {
        console.error('[WEBHOOK_BG_VERIFY_ERROR]', {
          tx_ref: txRef,
          tx_id: txId,
          event: payload?.event,
          status: payload?.data?.status,
          error: verifyError?.response?.data || verifyError?.message || verifyError,
        });
        logger.error('Failed to verify transaction with Flutterwave', {
          tx_ref: txRef,
          error: verifyError.response?.data || verifyError.message,
        });
        return;
      }
    }

    try {
      await handleWebhookEvent(payload, c.env);
    } catch (processError: any) {
      console.error('[WEBHOOK_BG_PROCESSING_ERROR]', {
        tx_ref: payload?.data?.tx_ref,
        event: payload?.event,
        status: payload?.data?.status,
        error: processError?.message || processError,
        stack: processError?.stack,
      });
      logger.error('Webhook processing failed', {
        error: processError.message,
        stack: processError.stack,
        tx_ref: payload?.data?.tx_ref,
      });
    }
  };

  if (c.executionCtx?.waitUntil) {
    c.executionCtx.waitUntil(processWebhook());
    return c.text('OK', 200);
  }

  await processWebhook();
  return c.text('OK', 200);
};

export const getPaymentStatus = async (c: HonoCtx) => {
  const txRef = c.req.query('tx_ref');
  if (!txRef) {
    return c.json({ success: false, message: 'tx_ref is required' }, 400);
  }

  try {
    const result = await reconcilePaymentStatusByReference(txRef, c.env);
    return c.json({ success: true, ...result }, 200);
  } catch (error: any) {
    if (error.message === 'Payment not found') {
      return c.json({ success: false, message: 'Payment not found' }, 404);
    }

    logger.error('Failed to fetch payment status', {
      tx_ref: txRef,
      error: error.message,
      stack: error.stack,
    });
    return c.json({ success: false, message: 'Failed to fetch payment status' }, 500);
  }
};
