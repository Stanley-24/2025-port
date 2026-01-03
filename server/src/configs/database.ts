import mongoose from 'mongoose';
import Config from './config';
import logger from '../lib/loggers';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(Config.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, 
      maxPoolSize: 10,                
      minPoolSize: 2,                  
      retryWrites: true,               
      retryReads: true,                
    });
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });

    mongoose.connection.on('error', (error) => {
      logger.error('MongoDB connection error', { error: error.message });
    });
  } catch (error: any) {
    logger.error('MongoDB connection error', { error: error.message });
    process.exit(1);
  }
};



