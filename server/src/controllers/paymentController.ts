// src/controllers/paymentController.ts

import { Request, Response } from 'express';
import { initiatePayment, handleWebhookEvent } from '../services/paymentService';
import logger from '../lib/loggers';
import config from '../configs/config';
import axios from 'axios';
import { timingSafeEqual } from '../lib/timingSafe';


export const initiate = async (req: Request, res: Response) => {
  try {
    const result = await initiatePayment(req.body);
    res.json({ success: true, ...result });
  } catch (error: any) {
    if (error.message?.includes('fields are required') || error.message?.includes('positive')) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    logger.error('Payment initiation failed', { error: error.message, stack: error.stack });
    res.status(500).json({
      success: false,
      message: 'Failed to initiate payment',
    });
  }
};

export const webhook = async (req: Request, res: Response) => {
  const signature = req.headers['verif-hash'] as string | undefined;

  // Security: Validate signature
  if (!signature || !config.webhookSecret || !timingSafeEqual(signature, config.webhookSecret)) {
    logger.warn('Flutterwave webhook failed signature verification', {
      receivedSignature: signature ? '[redacted]' : 'missing',
      ip: req.ip || req.socket.remoteAddress,
    });
    return res.status(401).send('Unauthorized');
  }

  let payload: any;
  try {
    // Handle raw body (from express.raw())
    if (Buffer.isBuffer(req.body)) {
      payload = JSON.parse(req.body.toString('utf8'));
    } else if (req.body && typeof req.body === 'object') {
      payload = req.body;
    } else {
      throw new Error('Invalid payload format');
    }
  } catch (parseError) {
    logger.error('Failed to parse webhook payload', { error: parseError });
    return res.sendStatus(400);
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
            headers: {
              Authorization: `Bearer ${config.secretKey}`,
            },
            timeout: 8000,
          }
        );

        const verifiedData = verifyResponse.data.data;
        if (
          verifyResponse.data.status !== 'success' ||
          verifiedData.status !== 'successful' ||
          verifiedData.tx_ref !== txRef
        ) {
          logger.warn('Webhook passed signature but transaction verification failed', {
            tx_ref: txRef,
            verifiedStatus: verifiedData.status,
          });
          return res.sendStatus(200); 
        }
      } catch (verifyError: any) {
        logger.error('Failed to verify transaction with Flutterwave', {
          tx_ref: txRef,
          error: verifyError.response?.data || verifyError.message,
        });
        
      }
    }

    await handleWebhookEvent(payload);
    res.sendStatus(200);
  } catch (error: any) {
    logger.error('Webhook processing failed', {
      error: error.message,
      stack: error.stack,
      tx_ref: payload.data?.tx_ref,
    });
    res.sendStatus(200); 
  }
};