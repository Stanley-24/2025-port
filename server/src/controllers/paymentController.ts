// src/controllers/paymentController.ts
import type { Context } from 'hono';
import type { Bindings } from '../configs/bindings';
import { initiatePayment, handleWebhookEvent } from '../services/paymentService';
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
  const signature = c.req.header('verif-hash');

  if (
    !signature ||
    !c.env.FLUTTERWAVE_WEBHOOK_SECRET ||
    !timingSafeEqual(signature, c.env.FLUTTERWAVE_WEBHOOK_SECRET)
  ) {
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

  try {
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
          return c.text('OK', 200);
        }
      } catch (verifyError: any) {
        logger.error('Failed to verify transaction with Flutterwave', {
          tx_ref: txRef,
          error: verifyError.response?.data || verifyError.message,
        });
        return c.text('OK', 200);
      }
    }

    await handleWebhookEvent(payload, c.env);
    return c.text('OK', 200);
  } catch (error: any) {
    logger.error('Webhook processing failed', {
      error: error.message,
      stack: error.stack,
      tx_ref: payload?.data?.tx_ref,
    });
    return c.text('OK', 200);
  }
};
