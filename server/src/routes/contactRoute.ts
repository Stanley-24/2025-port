import { Router } from 'express';
import { submitContact } from '../controllers/contactConrollers';
import { contactRateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/contact', contactRateLimiter, submitContact);

export default router;