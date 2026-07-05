import { createClient } from '@supabase/supabase-js';

let supabaseClient: any = null;

/**
 * Lazy initialization of the Supabase client.
 * This prevents the app from crashing if environment variables are not yet set.
 */
export function getSupabase() {
  if (!supabaseClient) {
    const url = import.meta.env.VITE_SUPABASE_URL || '';
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

    if (!url || !key) {
      console.warn('Supabase credentials missing. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in secrets.');
      return null;
    }

    supabaseClient = createClient(url, key);
  }
  return supabaseClient;
}

export const BUCKET_NAME = import.meta.env.VITE_SUPABASE_BUCKET || 'ProjetoCerto';
