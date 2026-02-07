import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Env } from '../env';

export function getSupabaseClient(env: Env, token: string): SupabaseClient {
  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}

export function getSupabaseAdmin(env: Env): SupabaseClient {
  return createClient(env.SUPABASE_URL.trim(), env.SUPABASE_SERVICE_ROLE_KEY.trim(), {
    auth: { persistSession: false },
  });
}
