// Works with Cloudflare Workers nodejs_compat flag
import { timingSafeEqual as nodeTimingSafeEqual } from 'node:crypto';

export const timingSafeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false;
  return nodeTimingSafeEqual(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8'));
};
