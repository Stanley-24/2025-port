import { resend } from '../configs/resend';
import { ContactNotificationEmail } from '../emails/templates/ContactNotification';
import { ContactConfirmationEmail } from '../emails/templates/ContactConfirmation';
import logger from '../lib/loggers';
import config from '../configs/config';
// Change this to your actual receiving email
const AdminEmail = config.AdminEmail;

export const sendContactNotification = async (data: {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    await resend.emails.send({
      from: `Portfolio Contact <${config.SenderEmail}>`, // Update domain after verifying in Resend
      to: AdminEmail,
      subject: `New Message: ${data.subject}`,
      react: ContactNotificationEmail({ ...data }),
      replyTo: data.email, // Allows easy reply
    });
    logger.info('Notification email sent to Stanley');
  } catch (error: any) {
    logger.error('Failed to send notification email', { error: error.message });
    throw error; // Let controller handle it
  }
};

export const sendConfirmationEmail = async (data: { fullName: string; email: string }) => {
  try {
    await resend.emails.send({
      from: `Stanley Owarieta <${config.SenderEmail}>`, // Update after domain verification
      to: data.email, // Send to the submitter
      subject: 'Thank you for reaching out!',
      react: ContactConfirmationEmail({ fullName: data.fullName }),
    });
    logger.info('Confirmation email sent to submitter');
  } catch (error: any) {
    logger.error('Failed to send confirmation email', { error: error.message });
    // Don't throw — we don't want to fail the whole submission if auto-reply fails
  }
};