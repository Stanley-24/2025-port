import { Hono } from 'hono';
import type { Bindings } from '../configs/bindings';
import { submitContact } from '../controllers/contactControllers';
import { contactRateLimiter } from '../middleware/rateLimiter';

const router = new Hono<{ Bindings: Bindings }>();

router.post('/contact', contactRateLimiter, submitContact);

export default router;
