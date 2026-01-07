// src/routes/paymentRoutes.ts
import { Router } from 'express';
import { initiate } from '../controllers/paymentController';

const router = Router();

router.post('/initiate', initiate);

export default router;