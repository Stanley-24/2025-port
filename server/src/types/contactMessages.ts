import { Document } from 'mongoose';

export interface IContactMessage extends Document {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Date;
}