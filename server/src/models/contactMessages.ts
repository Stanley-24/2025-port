import mongoose, { Schema, Document } from 'mongoose';
import { IContactMessage } from '../types/contactMessages';



const ContactMessageSchema = new Schema<IContactMessage>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);