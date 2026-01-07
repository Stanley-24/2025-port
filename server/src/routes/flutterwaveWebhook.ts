import { Request, Response } from "express";
import { handleWebhookEvent } from "../services/paymentService";
import config from "../configs/config";
import logger from "../lib/loggers";

export const flutterwaveWebhook = async (req: Request, res: Response) => {
  try {
    const signature = req.headers['verif-hash'];

    if (!signature || signature !== config.webhookSecret) {
      logger.warn('Invalid Flutterwave webhook signature');
      return res.status(200).send('OK');
    }

    const payload = Buffer.isBuffer(req.body)
      ? JSON.parse(req.body.toString())
      : req.body;

    logger.info('🔥 FLUTTERWAVE WEBHOOK RECEIVED', payload.event);

    await handleWebhookEvent(payload);

    return res.status(200).send('OK');
  } catch (error) {
    logger.error('Webhook processing failed', error);
    return res.status(200).send('OK');
  }
};

