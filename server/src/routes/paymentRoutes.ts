import { Hono } from 'hono';
import type { Bindings } from '../configs/bindings';
import { getPaymentStatus, initiate, webhook } from '../controllers/paymentController';
import { paymentRateLimiter, paymentStatusRateLimiter } from '../middleware/rateLimiter';

const router = new Hono<{ Bindings: Bindings }>();

router.post('/initiate', paymentRateLimiter, initiate);
router.post('/webhook', webhook);
router.get('/status', paymentStatusRateLimiter, getPaymentStatus);

export default router;
