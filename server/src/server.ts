import 'dotenv/config';
import app from './app';
import { connectDB } from './configs/database';
import config from './configs/config';

import mongoose from 'mongoose';
import { redisClient } from './configs/redis';

const PORT = config.PORT;


connectDB()
  .then(() => {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  }).on('error', (error: any) => {
    console.error('Server startup error:', error.message);
    process.exit(1);
  });

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    console.log(`${signal} received. Closing server gracefully...`);
    server.close(async () => {
      console.log('HTTP server closed');
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
      // Close Redis client if applicable
      await redisClient.quit();
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
})
.catch((error) => {
  console.error('Failed to initialize server:', error.message);
  process.exit(1);
});