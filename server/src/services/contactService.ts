// src/services/contactService.ts
import { z } from 'zod'; // Import z for v4 helpers
import ContactMessage from '../models/contactMessages';
import { sendContactNotification, sendConfirmationEmail } from './emailService';
import { contactFormSchema } from '../lib/validation';
import logger from '../lib/loggers';
import { ValidationError } from '../lib/errors';

export class ContactService {
  static async processContactForm(data: unknown) {
    // 1. Validate input using Zod v4 helper
    const validation = contactFormSchema.safeParse(data);
    
    if (!validation.success) {
      // Zod v4: Use flattenError for better form handling
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

    // 2. Save to database
    const newMessage = await ContactMessage.create({
      fullName,
      email,
      subject,
      message,
    });

    // 3. Send emails
    try {
      // Admin Notification (Important)
      await sendContactNotification({ fullName, email, subject, message });
    } catch (emailError) {
      logger.error('Failed to send notification email, but message was saved', {
        messageId: newMessage._id,
        error: emailError,
      });
      // We don't throw here so the user doesn't get a 500 error for a saved message
    }

    // User Confirmation (Fire-and-forget)
    sendConfirmationEmail({ fullName, email }).catch((emailError) => {
      logger.error('Failed to send confirmation email', {
        messageId: newMessage._id,
        to: email,
        error: emailError,
      });
    });

    // 4. Log success
    logger.info('Contact form processed successfully', {
      messageId: newMessage._id,
      fullName,
      email,
    });

    return {
      success: true,
      message: "Thank you! Your message has been sent. I'll get back to you soon.",
    };
  }
}