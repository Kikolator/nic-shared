import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@nic/shared-types';

/** Typed Supabase client for the Nic Ecosystem database */
export type Client = SupabaseClient<Database>;

/**
 * Create a typed Supabase client.
 *
 * For use in environments without framework-specific helpers
 * (e.g., scripts, Edge Functions, React Native).
 *
 * In Next.js apps, use the framework's createClient helpers
 * (server/client) and pass the resulting client to query/mutation functions.
 */
export function createApiClient(url: string, key: string): Client {
  return createSupabaseClient<Database>(url, key);
}
