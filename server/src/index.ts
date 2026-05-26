import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Bindings } from './configs/bindings';
import contactRoutes from './routes/contactRoute';
import paymentRoutes from './routes/paymentRoutes';
import flutterwaveWebhookRoutes from './routes/flutterwaveWebhook';

const app = new Hono<{ Bindings: Bindings }>();

const primaryPagesOrigin = 'https://stanley-portfolio.pages.dev';
const trustedOrigins = [
  primaryPagesOrigin,
  'https://c560abfb.stanley-portfolio.pages.dev',
  'https://stanleyowarieta.com',
  'https://www.stanleyowarieta.com',
];

const pagesSubdomainPattern = /^https:\/\/[a-z0-9-]+\.stanley-portfolio\.pages\.dev$/i;

// Global CORS
app.use(
  '*',
  cors({
    origin: (origin, c) => {
      if (!origin) {
        return primaryPagesOrigin;
      }

      const envFrontendUrl = c.env.FRONTEND_URL;
      const allowedOrigins = envFrontendUrl
        ? [...trustedOrigins, envFrontendUrl]
        : trustedOrigins;

      if (allowedOrigins.includes(origin) || pagesSubdomainPattern.test(origin)) {
        return origin;
      }

      return primaryPagesOrigin;
    },
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
