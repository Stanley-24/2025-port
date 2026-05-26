import { createResendClient } from '../configs/resend';
import { ContactNotificationEmail } from '../emails/templates/ContactNotification';
import { ContactConfirmationEmail } from '../emails/templates/ContactConfirmation';
import logger from '../lib/loggers';
import type { Bindings } from '../configs/bindings';

export const sendContactNotification = async (
  data: { fullName: string; email: string; subject: string; message: string },
  env: Bindings
) => {
  try {
    const resend = createResendClient(env.RESEND_API_KEY);
    await resend.emails.send({
      from: `Portfolio Contact <${env.SenderEmail}>`,
      to: env.AdminEmail,
      subject: `New Message: ${data.subject}`,
      react: ContactNotificationEmail({ ...data }),
      replyTo: data.email,
    });
    logger.info('Notification email sent to Stanley');
  } catch (error: any) {
    logger.error('Failed to send notification email', { error: error.message });
    throw error;
  }
};

export const sendConfirmationEmail = async (
  data: { fullName: string; email: string },
  env: Bindings
) => {
  try {
    const resend = createResendClient(env.RESEND_API_KEY);
    await resend.emails.send({
      from: `Stanley Owarieta <${env.SenderEmail}>`,
      to: data.email,
      subject: 'Thank you for reaching out!',
      react: ContactConfirmationEmail({ fullName: data.fullName }),
    });
    logger.info('Confirmation email sent to submitter');
  } catch (error: any) {
    logger.error('Failed to send confirmation email', { error: error.message });
  }
};
