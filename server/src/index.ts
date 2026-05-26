import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Bindings } from './configs/bindings';
import contactRoutes from './routes/contactRoute';
import paymentRoutes from './routes/paymentRoutes';
import flutterwaveWebhookRoutes from './routes/flutterwaveWebhook';
import { logPoolerRecommendation } from './lib/supabase';

const app = new Hono<{ Bindings: Bindings }>();

const primaryPagesOrigin = 'https://stanley-portfolio.pages.dev';
const trustedOrigins = [
  primaryPagesOrigin,
  'https://c560abfb.stanley-portfolio.pages.dev',
  'https://stanleyowarieta.com',
  'https://www.stanleyowarieta.com',
];

const pagesSubdomainPattern = /^https:\/\/[a-z0-9-]+\.stanley-portfolio\.pages\.dev$/i;
const globalForPoolCheck = globalThis as typeof globalThis & { __poolerChecked?: boolean };

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

app.use('*', async (c, next) => {
  if (!globalForPoolCheck.__poolerChecked) {
    logPoolerRecommendation(c.env);
    globalForPoolCheck.__poolerChecked = true;
  }

  await next();
});

// Health checks
app.get('/', (c) => c.text('Edge API is running 🚀'));
app.get('/healthz', (c) => c.json({ ok: true, service: 'stanley-portfolio-server' }, 200));

// Routes
app.route('/api/v1', contactRoutes);
app.route('/api/v1/payment', paymentRoutes);
app.route('/webhooks', flutterwaveWebhookRoutes);

export default app;
