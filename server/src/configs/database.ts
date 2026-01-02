import mongoose from 'mongoose';
import Config from './config';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(Config.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};