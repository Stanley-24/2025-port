import type { Context } from 'hono';
import type { Bindings } from '../configs/bindings';
import { ContactService } from '../services/contactService';
import logger from '../lib/loggers';

export const submitContact = async (c: Context<{ Bindings: Bindings }>) => {
  try {
    const body = await c.req.json();
    const result = await ContactService.processContactForm(body, c.env);
    return c.json(result, 200);
  } catch (error: any) {
    if (error.status === 400) {
      return c.json(
        { success: false, message: error.message, errors: error.errors },
        400
      );
    }

    logger.error('Unexpected error in contact form submission', {
      error: error.message,
      stack: error.stack,
    });

    return c.json(
      { success: false, message: 'Something went wrong. Please try again later.' },
      500
    );
  }
};
