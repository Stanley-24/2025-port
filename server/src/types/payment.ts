import { Document } from 'mongoose';

export interface IPayment extends Document {
  tx_ref: string;
  email: string;
  fullName: string;
  service: string;
  amount: number;
  currency: string;
  status: 'pending' | 'successful' | 'failed';
  flutterwaveData?: any;
  meetingLink?: string;
  message: string,
  followedUp: boolean;
  createdAt: Date;
  updatedAt: Date;
}