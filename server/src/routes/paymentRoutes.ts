// src/routes/paymentRoutes.ts
import express, { Router } from 'express';
import { initiate, webhook } from '../controllers/paymentController';

const router = Router();

router.post('/initiate', initiate);
router.post('/webhook', express.raw({ type: 'application/json' }), webhook); // Raw body for signature

export default router;