import { RateLimiterRedis, RateLimiterRes } from 'rate-limiter-flexible';
import { redisClient } from '../configs/redis';
import { Request, Response, NextFunction } from 'express';
import logger from '../lib/loggers';
import { error } from 'winston';

// Rate limiter by IP
const ipRateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rl_ip',
  points: 10,
  duration: 60 * 15,      
  blockDuration: 60 * 30, 
});

// Rate limiter by email
const emailRateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rl_email',
  points: 5,
  duration: 60 * 60 * 24,     
  blockDuration: 60 * 60 * 24,
});

export const contactRateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip || 'unknown-ip';

  const rawEmail = req.body?.email;
  
  if (!rawEmail || typeof rawEmail !== 'string') {
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }
  
  const email = rawEmail.trim().toLowerCase();


  try {
    // 1. Check IP Limiter
    const ipResult = await ipRateLimiter.consume(ip);

    try {
      // 2. Check Email Limiter
      const emailResult = await emailRateLimiter.consume(email);

      // --- SUCCESS CASE ---
      // Both limiters passed. Set headers and move to the next middleware.
      res.set({
        'X-RateLimit-Limit-IP': ipRateLimiter.points.toString(),
        'X-RateLimit-Remaining-IP': ipResult.remainingPoints.toString(),
      });
      
      return next(); 

    } catch (emailErr) {
      // Email limit failed - Rollback the IP point we just consumed
      await ipRateLimiter.reward(ip, 1);

      if (emailErr instanceof RateLimiterRes) {
        res.set('Retry-After', Math.ceil(emailErr.msBeforeNext / 1000).toString());
        return res.status(429).json({
          success: false,
          message: 'Too many messages sent. Please try again later.',
          details: 'Daily limit reached for this email address.',
        });
      }
      throw emailErr; // Fall through to outer catch for Redis errors
    }

  } catch (ipErr) {
    if (ipErr instanceof RateLimiterRes) {
      res.set('Retry-After', Math.ceil(ipErr.msBeforeNext / 1000).toString());
      return res.status(429).json({
        success: false,
        message: 'Too many messages sent. Please try again later.',
        details: 'Too many attempts from this network.',
      });
    }

    // --- SYSTEM ERROR CASE ---
    // If we reach here, it's likely a Redis connection issue
    logger.error('Rate limiter system error', { 
      error: ipErr instanceof Error ? ipErr.message : ipErr, 
      ip,  
    });
    
    return res.status(500).json({
      success: false,
      message: 'Service temporarily unavailable. Please try again later.',
    });
  }
};