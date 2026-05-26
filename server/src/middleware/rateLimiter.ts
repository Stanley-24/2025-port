import type { SupabaseClient } from '@supabase/supabase-js';
import type { Context, Next } from 'hono';
import type { Bindings } from '../configs/bindings';
import logger from '../lib/loggers';
import { getSupabaseClient } from '../lib/supabase';

const IP_LIMIT = 10;
const IP_WINDOW_SECONDS = 60 * 15;   // 15 minutes
const EMAIL_LIMIT = 5;
const EMAIL_WINDOW_SECONDS = 60 * 60 * 24; // 24 hours

type HonoCtx = Context<{ Bindings: Bindings }>;
type ContactPayload = { email?: string; ping?: boolean };

async function checkLimit(
  supabase: SupabaseClient,
  key: string,
  limit: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number }> {
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - windowSeconds;

  const windowStartISO = new Date(windowStart * 1000).toISOString();

  // Count requests in window
  let count: number | null = null;
  let error: { message: string } | null = null;

  try {
    const result = await supabase
      .from('rate_limit_log')
      .select('*', { count: 'exact', head: true })
      .eq('client_key', key)
      .gte('last_request', windowStartISO);

    count = result.count;
    error = result.error;
  } catch (err: unknown) {
    logger.error('Rate limiter DB error (unexpected)', { key, err });
    return { allowed: true, remaining: limit };
  }

  if (error) {
    // On DB error, fail open to avoid blocking legitimate users
    logger.error('Rate limiter DB error', { error: error.message, key });
    return { allowed: true, remaining: limit };
  }

  const current = count ?? 0;
  if (current >= limit) {
    return { allowed: false, remaining: 0 };
  }

  // Record this request
  try {
    await supabase.from('rate_limit_log').insert([{ client_key: key }]);
  } catch (insertErr: unknown) {
    logger.error('Rate limiter insert error', { key, insertErr });
  }

  return { allowed: true, remaining: limit - current - 1 };
}

export const contactRateLimiter = async (c: HonoCtx, next: Next) => {
  const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown-ip';
  const body = (await c.req.json().catch(() => ({}))) as ContactPayload;

  if (body.ping === true) {
    const supabase = getSupabaseClient(c.env);

    // Keep response fast while warming the DB path in the background.
    c.executionCtx?.waitUntil(
      supabase
        .from('rate_limit_log')
        .select('id', { count: 'exact', head: true })
        .limit(1)
        .then(() => undefined)
        .catch((error) => {
          logger.warn('Keep-alive DB warmup failed', { error: error.message });
        })
    );

    return c.json({ success: true, message: 'Keep-alive acknowledged.' }, 200);
  }

  const rawEmail = body.email;

  if (!rawEmail || typeof rawEmail !== 'string') {
    return c.json({ success: false, message: 'Email is required.' }, 400);
  }

  const email = rawEmail.trim().toLowerCase();
  const supabase = getSupabaseClient(c.env);

  const [ipResult, emailResult] = await Promise.all([
    checkLimit(supabase, `ip:${ip}`, IP_LIMIT, IP_WINDOW_SECONDS),
    checkLimit(supabase, `email:${email}`, EMAIL_LIMIT, EMAIL_WINDOW_SECONDS),
  ]);

  if (!ipResult.allowed) {
    logger.warn('IP rate limit exceeded', { ip });
    return c.json(
      { success: false, message: 'Too many requests. Please try again later.' },
      429
    );
  }

  if (!emailResult.allowed) {
    logger.warn('Email rate limit exceeded', { email });
    return c.json(
      { success: false, message: 'You have reached the daily submission limit for this email.' },
      429
    );
  }

  c.res.headers.set('X-RateLimit-Remaining-IP', ipResult.remaining.toString());
  await next();
};