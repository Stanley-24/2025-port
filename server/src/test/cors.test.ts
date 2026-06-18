// src/test/cors.test.ts
//
// Integration tests for CORS origin resolution on the contact endpoint.
// Uses Hono's app.request() to exercise the full middleware chain without a
// real server, ensuring the Access-Control-Allow-Origin header is set
// correctly for every allowed/blocked origin combination.

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Bindings } from '../configs/bindings';
import { resolveAllowedOrigin } from '../lib/cors';
import contactRoutes from '../routes/contactRoute';

// ─── Shared mock env ────────────────────────────────────────────────────────

const mockEnv: Bindings = {
  SUPABASE_URL: 'https://mock.supabase.co',
  SUPABASE_SERVICE_ROLE_KEY: 'mock-service-role-key',
  RESEND_API_KEY: 're_test_fake',
  AdminEmail: 'admin@test.com',
  SenderEmail: 'noreply@test.com',
  FRONTEND_URL: 'http://localhost:5173',
  FLUTTERWAVE_PUBLIC_KEY: 'FLWPUBK_TEST-fake',
  FLUTTERWAVE_SECRET_KEY: 'FLWSECK_TEST-fake',
  FLUTTERWAVE_ENCRYPTION_KEY: 'test-enc-key',
  FLUTTERWAVE_WEBHOOK_SECRET: 'test-webhook-secret',
  MEETING_LINK: 'https://calendly.com/test',
  PaymentLogo: 'https://example.com/logo.png',
};

// ─── App factory ─────────────────────────────────────────────────────────────
// Mirrors the app setup in src/index.ts so we test the real middleware chain.

function buildApp(envOverrides: Partial<Bindings> = {}) {
  const env: Bindings = { ...mockEnv, ...envOverrides };

  const app = new Hono<{ Bindings: Bindings }>();

  app.use(
    '*',
    cors({
      origin: (origin) => resolveAllowedOrigin(origin, env.FRONTEND_URL),
      allowMethods: ['GET', 'POST', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    })
  );

  // Mount contact routes and bind env so handlers can access c.env
  app.route('/api/v1', contactRoutes);

  // Inject env into every request context
  app.use('*', async (c, next) => {
    Object.assign(c.env, env);
    await next();
  });

  return { app, env };
}

// ─── Helper ──────────────────────────────────────────────────────────────────

async function preflight(app: Hono, origin: string) {
  const req = new Request('http://localhost/api/v1/contact', {
    method: 'OPTIONS',
    headers: { Origin: origin, 'Access-Control-Request-Method': 'POST' },
  });
  return app.fetch(req, mockEnv);
}

// ─── Unit tests for resolveAllowedOrigin ─────────────────────────────────────

describe('resolveAllowedOrigin (unit)', () => {
  const primaryFallback = 'https://stanley-portfolio.pages.dev';

  it('returns localhost:5173 (no trailing slash)', () => {
    expect(resolveAllowedOrigin('http://localhost:5173', mockEnv.FRONTEND_URL)).toBe(
      'http://localhost:5173'
    );
  });

  it('normalizes localhost:5173 with trailing slash', () => {
    expect(resolveAllowedOrigin('http://localhost:5173/', mockEnv.FRONTEND_URL)).toBe(
      'http://localhost:5173'
    );
  });

  it('allows production domain', () => {
    expect(resolveAllowedOrigin('https://stanleyowarieta.com', undefined)).toBe(
      'https://stanleyowarieta.com'
    );
  });

  it('allows www production domain', () => {
    expect(resolveAllowedOrigin('https://www.stanleyowarieta.com', undefined)).toBe(
      'https://www.stanleyowarieta.com'
    );
  });

  it('allows primary pages.dev origin', () => {
    expect(resolveAllowedOrigin('https://stanley-portfolio.pages.dev', undefined)).toBe(
      'https://stanley-portfolio.pages.dev'
    );
  });

  it('allows a Cloudflare preview subdomain', () => {
    const preview = 'https://abc123.stanley-portfolio.pages.dev';
    expect(resolveAllowedOrigin(preview, undefined)).toBe(preview);
  });

  it('falls back to primary pages.dev for unknown origin', () => {
    expect(resolveAllowedOrigin('https://evil.com', undefined)).toBe(primaryFallback);
  });

  it('falls back to primary pages.dev when origin is undefined', () => {
    expect(resolveAllowedOrigin(undefined, undefined)).toBe(primaryFallback);
  });

  it('allows FRONTEND_URL env override', () => {
    const customOrigin = 'https://custom-staging.example.com';
    expect(resolveAllowedOrigin(customOrigin, customOrigin)).toBe(customOrigin);
  });

  it('normalizes FRONTEND_URL with trailing slash', () => {
    const customOrigin = 'https://custom-staging.example.com';
    expect(resolveAllowedOrigin(customOrigin, `${customOrigin}/`)).toBe(customOrigin);
  });
});

// ─── Integration: CORS preflight on the contact route ────────────────────────

describe('Contact route CORS preflight (integration)', () => {
  let app: Hono;

  beforeEach(() => {
    ({ app } = buildApp());
  });

  it('returns 204 and echoes localhost:5173 in ACAO header', async () => {
    const res = await preflight(app, 'http://localhost:5173');
    expect(res.status).toBe(204);
    expect(res.headers.get('access-control-allow-origin')).toBe('http://localhost:5173');
  });

  it('handles localhost origin with trailing slash correctly', async () => {
    const res = await preflight(app, 'http://localhost:5173/');
    // Should still pass — normalized before comparison
    expect(res.status).toBe(204);
    expect(res.headers.get('access-control-allow-origin')).toBe('http://localhost:5173');
  });

  it('returns production domain in ACAO header for production origin', async () => {
    const res = await preflight(app, 'https://stanleyowarieta.com');
    expect(res.status).toBe(204);
    expect(res.headers.get('access-control-allow-origin')).toBe('https://stanleyowarieta.com');
  });

  it('returns 204 for Cloudflare preview subdomain', async () => {
    const res = await preflight(app, 'https://abc123.stanley-portfolio.pages.dev');
    expect(res.status).toBe(204);
    expect(res.headers.get('access-control-allow-origin')).toBe(
      'https://abc123.stanley-portfolio.pages.dev'
    );
  });

  it('falls back to primary pages.dev ACAO for unknown origin', async () => {
    const res = await preflight(app, 'https://attacker.com');
    expect(res.status).toBe(204);
    expect(res.headers.get('access-control-allow-origin')).toBe(
      'https://stanley-portfolio.pages.dev'
    );
  });

  it('allows POST and OPTIONS in ACAM header', async () => {
    const res = await preflight(app, 'http://localhost:5173');
    const methods = res.headers.get('access-control-allow-methods') ?? '';
    expect(methods).toContain('POST');
    expect(methods).toContain('OPTIONS');
  });

  it('includes Content-Type in access-control-allow-headers', async () => {
    const res = await preflight(app, 'http://localhost:5173');
    const allowedHeaders = res.headers.get('access-control-allow-headers') ?? '';
    expect(allowedHeaders.toLowerCase()).toContain('content-type');
  });

  it('sets vary: origin to prevent cache poisoning', async () => {
    const res = await preflight(app, 'http://localhost:5173');
    const vary = res.headers.get('vary') ?? '';
    expect(vary.toLowerCase()).toContain('origin');
  });
});
