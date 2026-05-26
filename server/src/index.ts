import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Bindings } from './configs/bindings';
import contactRoutes from './routes/contactRoute';
import paymentRoutes from './routes/paymentRoutes';
import flutterwaveWebhookRoutes from './routes/flutterwaveWebhook';

const app = new Hono<{ Bindings: Bindings }>();

// Global CORS
app.use(
  '*',
  cors({
    origin: (origin, c) =>
      c.env.FRONTEND_URL || 'https://stanleyowarieta.com',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Health check
app.get('/', (c) => c.text('Edge API is running 🚀'));

// Routes
app.route('/api/v1', contactRoutes);
app.route('/api/v1/payment', paymentRoutes);
app.route('/webhooks', flutterwaveWebhookRoutes);

export default app;
