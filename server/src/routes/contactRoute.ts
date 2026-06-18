import { Hono } from 'hono';
import type { Bindings } from '../configs/bindings';
import { submitContact } from '../controllers/contactControllers';
import { contactRateLimiter } from '../middleware/rateLimiter';
import { getCorsHeaders } from '../lib/cors';

const router = new Hono<{ Bindings: Bindings }>();

router.options('/contact', (c) => {
	const headers = getCorsHeaders(c.req.header('origin'), c.env);
	return new Response(null, { status: 204, headers });
});

router.post('/contact', contactRateLimiter, submitContact);

export default router;
