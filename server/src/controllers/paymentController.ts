// src/controllers/paymentController.ts
import { Request, Response } from 'express';
import { initiatePayment, handleWebhookEvent } from '../services/paymentService';
import logger from '../lib/loggers';
import config from '../configs/config';

export const initiate = async (req: Request, res: Response) => {
  try {
    const result = await initiatePayment(req.body);
    res.json({ success: true, ...result });
  } catch (error: any) {
    logger.error('Payment initiation failed', { error: error.message });
    res.status(500).json({ success: false, message: 'Failed to initiate payment' });
  }
};

export const webhook = async (req: Request, res: Response) => {
  const hash = req.headers['verif-hash'];
  if (!hash || hash !== config.webhookSecret) {
    return res.status(401).send('Unauthorized');
  }

  try {
    await handleWebhookEvent(req.body);
    res.sendStatus(200);
  } catch (error: any) {
    logger.error('Webhook processing failed', { error: error.message });
    res.sendStatus(200); // Still return 200 to avoid retry spam
  }
};