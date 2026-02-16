import type { Database } from '../database';

// Row types
export type SharedAdmin = Database['public']['Tables']['shared_admins']['Row'];

// Enum types
export type AppType = Database['public']['Enums']['app_type'];

// Helpers

/** Check if user has admin role for a given app */
export function isAdminOf(admins: SharedAdmin[], app: AppType): boolean {
  return admins.some((admin) => admin.app === app);
}
