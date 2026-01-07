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
    // Specific handling for validation error
    if (error.message === 'All fields are required') {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }
    logger.error('Payment initiation failed', { error: error.message });
    res.status(500).json({ 
      success: false, 
      message: 'Failed to initiate payment' 
    });
  }
};

export const webhook = async (req: Request, res: Response) => {
  // Use req.get() which properly handles header normalization in Express
  const hash = req.get('verif-hash');
  if (!hash || hash !== config.webhookSecret) {
    return res.status(401).send('Unauthorized');
  }

  try {
    // Parse Buffer body to JSON if needed
    const payload = Buffer.isBuffer(req.body)
      ? JSON.parse(req.body.toString())
      : req.body;
    
    await handleWebhookEvent(payload);
    res.sendStatus(200);
  } catch (error: any) {
    logger.error('Webhook processing failed', { error: error.message });
    res.sendStatus(200); // Still return 200 to avoid retry spam
  }
};