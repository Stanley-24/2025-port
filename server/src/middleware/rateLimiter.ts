import { RateLimiterRedis, RateLimiterRes } from 'rate-limiter-flexible';
import { redisClient } from '../configs/redis';
import { Request, Response, NextFunction } from 'express';
import logger from '../lib/loggers';

// Rate limiter by IP
const ipRateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rl_ip',
  points: 2,
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
  const body = req.body || {};

  const rawEmail = body.email;
  if (!rawEmail || typeof rawEmail !== 'string') {
    logger.warn('Contact form attempt without email', { ip, body });
    return res.status(400).json({
      success: false,
      message: 'Email is required.',
    });
  }

  const email = rawEmail.trim().toLowerCase();

  try {
    // Try to consume from both in parallel
    const [ipResult, emailResult] = await Promise.all([
      ipRateLimiter.consume(ip),
      emailRateLimiter.consume(email),
    ]);

    // Both succeeded → set headers and proceed
    res.set({
      'X-RateLimit-Limit-IP': ipRateLimiter.points.toString(),
      'X-RateLimit-Remaining-IP': ipResult.remainingPoints.toString(),
      'X-RateLimit-Reset-IP': Math.ceil((Date.now() + ipResult.msBeforeNext) / 1000).toString(),

      'X-RateLimit-Limit-Email': emailRateLimiter.points.toString(),
      'X-RateLimit-Remaining-Email': emailResult.remainingPoints.toString(),
    });

    return next();
  } catch (error) {
    // At least one limiter rejected
    let msBeforeNext = 900000; // fallback: 15 minutes
    let limiterName = 'unknown';
    let consumedPoints = 0;

    if (error instanceof RateLimiterRes) {
      msBeforeNext = error.msBeforeNext;
      consumedPoints = error.consumedPoints;

      // Determine which one failed
      if (consumedPoints > ipRateLimiter.points && consumedPoints > emailRateLimiter.points) {
        limiterName = 'both';
      } else if (consumedPoints > ipRateLimiter.points) {
        limiterName = 'IP';
      } else if (consumedPoints > emailRateLimiter.points) {
        limiterName = 'email';
      }
    } else {
      // Unexpected error (e.g. Redis disconnected)
      logger.error('Rate limiter unexpected error', { error, ip, email });
      return res.status(500).json({
        success: false,
        message: 'Service temporarily unavailable. Please try again later.',
      });
    }

    logger.warn('Contact form rate limit exceeded', {
      ip,
      email,
      limiter: limiterName,
      consumedPoints,
      msBeforeNext,
    });

    const retryAfter = Math.ceil(msBeforeNext / 1000);

    res.set('Retry-After', retryAfter.toString());

    return res.status(429).json({
      success: false,
      message: 'Too many messages sent. Please try again later.',
      retryAfter,
      details:
        limiterName === 'email'
          ? 'You have reached the daily limit for this email address.'
          : limiterName === 'IP'
          ? 'Too many attempts from this network. Try again later.'
          : 'Rate limit exceeded. Please wait before sending another message.',
    });
  }
};