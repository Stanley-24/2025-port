// src/services/contactService.ts
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import { sendContactNotification, sendConfirmationEmail } from './emailService';
import { contactFormSchema } from '../lib/validation';
import logger from '../lib/loggers';
import { ValidationError } from '../lib/errors';
import type { Bindings } from '../configs/bindings';

export class ContactService {
  static async processContactForm(data: unknown, env: Bindings) {
    // 1. Validate
    const validation = contactFormSchema.safeParse(data);

    if (!validation.success) {
      const flattened = z.flattenError(validation.error);
      const fieldErrors = flattened.fieldErrors;

      logger.warn('Contact form validation failed', { fieldErrors });

      throw new ValidationError(
        'Please correct the errors below',
        {
          fullName: fieldErrors.fullName?.[0],
          email: fieldErrors.email?.[0],
          subject: fieldErrors.subject?.[0],
          message: fieldErrors.message?.[0],
        }
      );
    }

    const { fullName, email, subject, message } = validation.data;

    // 2. Save to Supabase
    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

    const { data: newMessage, error: dbError } = await supabase
      .from('contact_messages')
      .insert({ full_name: fullName, email, subject, message })
      .select('id')
      .single();

    if (dbError) {
      logger.error('Failed to save contact message', { error: dbError.message });
      throw new Error('Failed to save message');
    }

    // 3. Send emails
    try {
      await sendContactNotification({ fullName, email, subject, message }, env);
    } catch (emailError) {
      logger.error('Failed to send notification email, but message was saved', {
        messageId: newMessage?.id,
        error: emailError,
      });
    }

    // User confirmation — fire-and-forget
    sendConfirmationEmail({ fullName, email }, env).catch((emailError) => {
      logger.error('Failed to send confirmation email', {
        messageId: newMessage?.id,
        error: emailError,
      });
    });

    logger.info('Contact form processed successfully', { messageId: newMessage?.id });

    return {
      success: true,
      message: "Thank you! Your message has been sent. I'll get back to you soon.",
    };
  }
}
