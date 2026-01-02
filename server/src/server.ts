import 'dotenv/config';
import app from './app';
import { connectDB } from './configs/database';
import config from './configs/config';

const PORT = config.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});