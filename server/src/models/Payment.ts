// src/models/Payment.ts
import mongoose, { Schema } from 'mongoose';
import { IPayment } from '../types/payment';


const PaymentSchema = new Schema<IPayment>({
  tx_ref: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  service: { type: String, required: true },
  amount: { type: Number, required: true }, // deposit paid
  depositAmount: { type: Number, required: true },
  fullAmount: { type: Number, required: true },
  balanceDue: { type: Number, required: true },
  currency: { type: String, default: 'NGN' },
  status: { type: String, enum: ['pending', 'successful', 'failed'], default: 'pending' },
  flutterwaveData: { type: Schema.Types.Mixed },
  meetingLink: { type: String },
  message: { type: String },
  followedUp: { type: Boolean, default: false },
  emailSent: { type: Boolean, default: false },
}, {
  timestamps: true  
});

export default mongoose.model<IPayment>('Payment', PaymentSchema);