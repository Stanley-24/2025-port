import { Hono } from 'hono';
import type { Bindings } from '../configs/bindings';
import { initiate, webhook } from '../controllers/paymentController';

const router = new Hono<{ Bindings: Bindings }>();

router.post('/initiate', initiate);
router.post('/webhook', webhook);

export default router;
