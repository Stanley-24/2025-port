import { z } from 'zod';

export const contactFormSchema = z.object({
  fullName: z.string()
    .min(4, 'Name must be at least 4 characters')
    .max(31, 'Name cannot exceed 30 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

  email: z.string().email('Please enter a valid email address'),

  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(50, 'Subject cannot exceed 50 characters'),

  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1500, 'Message cannot exceed 1500 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;