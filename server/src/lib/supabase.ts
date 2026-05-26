import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Bindings } from '../configs/bindings';
import logger from './loggers';

const globalForSupabase = globalThis as typeof globalThis & {
  __supabaseClient?: SupabaseClient;
  __supabaseClientKey?: string;
};

const directPortPattern = /:5432(?:\/|$|\?)/;

export const isUsingDirectPostgresPort = (connectionString: string) =>
  directPortPattern.test(connectionString);

export function getSupabaseClient(env: Bindings): SupabaseClient {
  if (process.env.NODE_ENV === 'test') {
    return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  }

  const cacheKey = `${env.SUPABASE_URL}:${env.SUPABASE_SERVICE_ROLE_KEY.slice(0, 12)}`;

  if (
    globalForSupabase.__supabaseClient &&
    globalForSupabase.__supabaseClientKey === cacheKey
  ) {
    return globalForSupabase.__supabaseClient;
  }

  const client = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  globalForSupabase.__supabaseClient = client;
  globalForSupabase.__supabaseClientKey = cacheKey;

  return client;
}

export function logPoolerRecommendation(env: Bindings) {
  if (!env.SUPABASE_DB_URL) {
    return;
  }

  if (isUsingDirectPostgresPort(env.SUPABASE_DB_URL)) {
    logger.warn('SUPABASE_DB_URL is using direct PostgreSQL port 5432. Use Supabase pooler port 6543 for serverless runtimes.');
  }
}
