// src/controllers/contactController.ts
import { Request, Response } from 'express';
import { ContactService } from '../services/contactService';
import logger from '../lib/loggers';

export const submitContact = async (req: Request, res: Response) => {
  try {
    const result = await ContactService.processContactForm(req.body);

    return res.status(200).json(result);
  } catch (error: any) {
    // Handle validation errors
    if (error.status === 400) {
      return res.status(400).json({
        success: false,
        message: error.message,
        errors: error.errors,
      });
    }

    // Handle unexpected errors
    logger.error('Unexpected error in contact form submission', {
      error: error.message,
      stack: error.stack,
      hasEmail: !!req.body?.email,
      hasMessage: !!req.body?.message,
    });

    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
};