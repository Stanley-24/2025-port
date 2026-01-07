import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import contactRoutes from './routes/contactRoute';
import config from './configs/config';
import paymentRoutes from './routes/paymentRoutes';
import { flutterwaveWebhook } from './routes/flutterwaveWebhook';
import { webhook } from './controllers/paymentController';

const app = express();

app.set('trust proxy', 1);

app.use(cors({
  origin: config.FRONTEND_URL || 'https://stanleyowarieta.com',
  credentials: true
}));

app.use(helmet());

// ✅ RAW body for payment webhook BEFORE express.json()
app.post(
  '/api/v1/payment/webhook',
  express.raw({ type: 'application/json' }),
  webhook
);

// ✅ JSON for normal routes
app.use(express.json({ limit: '100kb' }));

app.use('/api/v1', contactRoutes);
app.use('/api/v1/payment', paymentRoutes);

// ✅ RAW body ONLY for Flutterwave webhook
app.post(
  '/webhooks/flutterwave',
  express.raw({ type: 'application/json' }),
  flutterwaveWebhook
);

app.get('/', (req, res) => {
  res.json({ message: 'Stanley Owarieta Portfolio Backend Live 🚀' });
});

export default app;
