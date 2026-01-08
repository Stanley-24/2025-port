// src/controllers/paymentController.ts
import { Request, Response } from 'express';
import { initiatePayment, handleWebhookEvent } from '../services/paymentService';
import logger from '../lib/loggers';
import config from '../configs/config';
import crypto from 'crypto'

export const initiate = async (req: Request, res: Response) => {
  try {
    const result = await initiatePayment(req.body);
    res.json({ success: true, ...result });
  } catch (error: any) {
    // Specific handling for validation error
    if (error.message && error.message.includes('fields are required')) {
      return res.status(400).json({ 
        success: false, 
        message: error.message 
      });
    }
    logger.error('Payment initiation failed', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to initiate payment' 
    });
  }
};

export const webhook = async (req: Request, res: Response) => {
  // Use req.get() which properly handles header normalization in Express
  const hash = req.get('verif-hash');
     if (!hash || !timingSafeEqual(hash, config.webhookSecret)) {
      return res.status(401).send('Unauthorized');
    }

 function timingSafeEqual(a: string, b: string): boolean {
   if (a.length !== b.length) return false;
   return crypto.timingSafeEqual(
     Buffer.from(a, 'utf8'),
     Buffer.from(b, 'utf8')
   );
 }
  try {
    // Parse Buffer body to JSON if needed
    const payload = Buffer.isBuffer(req.body)
      ? JSON.parse(req.body.toString())
      : req.body;
    
    await handleWebhookEvent(payload);
    res.sendStatus(200);
  } catch (error: any) {
    logger.error('Webhook processing failed', error);
    res.sendStatus(200); // Still return 200 to avoid retry spam
  }
};