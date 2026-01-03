// src/test/contactService.test.ts
import { ContactService } from '../services/contactService';
import ContactMessage from '../models/contactMessages';
import { sendContactNotification, sendConfirmationEmail } from '../services/emailService';
import '../test/setup-db';

jest.mock('../services/emailService', () => ({
  sendContactNotification: jest.fn().mockResolvedValue(undefined),
  sendConfirmationEmail: jest.fn().mockResolvedValue(undefined),
}));

// Increase timeout for DB operations
jest.setTimeout(30000);

describe('ContactService', () => {
  beforeEach(async () => {
    await ContactMessage.deleteMany({});
    jest.clearAllMocks();
  });

  it('saves valid message and sends emails', async () => {
    const data = {
      fullName: 'John Doe',
      email: 'john@example.com',
      subject: 'Hello there',
      message: 'This is a long enough message to pass validation.',
    };

    const result = await ContactService.processContactForm(data);

    expect(result.success).toBe(true);

    const saved = await ContactMessage.findOne({ email: data.email });
    expect(saved).toBeTruthy();

    expect(sendContactNotification).toHaveBeenCalledTimes(1);
    expect(sendConfirmationEmail).toHaveBeenCalledTimes(1);
  });

  it('rejects invalid data', async () => {
    const invalid = {
      fullName: 'J',
      email: 'bad',
      subject: 'Hi',
      message: 'short',
    };

    await expect(ContactService.processContactForm(invalid)).rejects.toMatchObject({
      status: 400,
    });
  });
});