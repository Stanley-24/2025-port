import type { Bindings } from '../configs/bindings';

const primaryPagesOrigin = 'https://stanley-portfolio.pages.dev';
const trustedOrigins = [
  primaryPagesOrigin,
  'http://localhost:5173',
  'https://stanleyowarieta.com',
  'https://www.stanleyowarieta.com',
] as const;

const pagesSubdomainPattern = /^https:\/\/[a-z0-9-]+\.stanley-portfolio\.pages\.dev$/i;

const normalizeOrigin = (origin: string) => origin.replace(/\/+$/, '');

export const resolveAllowedOrigin = (origin: string | undefined, envFrontendUrl?: string) => {
  if (!origin) {
    return primaryPagesOrigin;
  }

  const normalizedOrigin = normalizeOrigin(origin);

  const allowedOrigins = envFrontendUrl
    ? [...trustedOrigins, normalizeOrigin(envFrontendUrl)]
    : [...trustedOrigins];

  if (allowedOrigins.includes(normalizedOrigin) || pagesSubdomainPattern.test(normalizedOrigin)) {
    return normalizedOrigin;
  }

  return primaryPagesOrigin;
};

export const getCorsHeaders = (origin: string | undefined, env: Bindings) => ({
  'Access-Control-Allow-Origin': resolveAllowedOrigin(origin, env.FRONTEND_URL),
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
  Vary: 'Origin',
});
