import type { Context } from 'hono';
import type { Bindings } from '../configs/bindings';
import { ContactService } from '../services/contactService';
import logger from '../lib/loggers';
import { getCorsHeaders } from '../lib/cors';

const jsonWithCors = (
  c: Context<{ Bindings: Bindings }>,
  payload: Record<string, unknown>,
  status: number
) => {
  const corsHeaders = getCorsHeaders(c.req.header('origin'), c.env);

  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
};

export const submitContact = async (c: Context<{ Bindings: Bindings }>) => {
  try {
    const body = await c.req.json();
    const result = await ContactService.processContactForm(body, c.env);
    return jsonWithCors(c, result as Record<string, unknown>, 200);
  } catch (error: any) {
    if (error.status === 400) {
      return jsonWithCors(
        c,
        { success: false, message: error.message, errors: error.errors },
        400
      );
    }

    logger.error('Unexpected error in contact form submission', {
      error: error.message,
      stack: error.stack,
    });

    return jsonWithCors(
      c,
      { success: false, message: 'Something went wrong. Please try again later.' },
      500
    );
  }
};
