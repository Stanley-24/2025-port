// src/services/contactService.ts
import ContactMessage from '../models/contactMessages';
import { sendContactNotification, sendConfirmationEmail } from './emailService';
import { contactFormSchema, ContactFormData } from '../lib/validation';
import logger from '../lib/loggers';
import { ValidationError } from '../lib/errors'
export class ContactService {
  static async processContactForm(data: unknown) {
    // 1. Validate input
    const validation = contactFormSchema.safeParse(data);
    if (!validation.success) {
      const errors = validation.error.format();
      logger.warn('Contact form validation failed', { errors, rawData: data });
      throw new ValidationError(
        'Please correct the errors below',
        {
          fullName: errors.fullName?._errors?.[0],
          email: errors.email?._errors?.[0],
          subject: errors.subject?._errors?.[0],
          message: errors.message?._errors?.[0],
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
      await sendContactNotification({ fullName, email, subject, message });
    } catch (emailError) {
      logger.error('Failed to send notification email, but message was saved', {
        messageId: newMessage._id,
        error: emailError,
      });
      // Don't throw — we still want to confirm to user
    }

    // Fire-and-forget confirmation (don't await failure)
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