import { Hono } from 'hono';
import type { Bindings } from '../configs/bindings';
import { webhook } from '../controllers/paymentController';

const router = new Hono<{ Bindings: Bindings }>();

// Legacy Flutterwave webhook path — delegates to the same handler
router.post('/flutterwave', webhook);

export default router;

