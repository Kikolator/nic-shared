import type { Database } from '../database.js';

// Row types
export type SharedProfile = Database['public']['Tables']['shared_profiles']['Row'];
export type SharedProfileInsert = Database['public']['Tables']['shared_profiles']['Insert'];
export type SharedProfileUpdate = Database['public']['Tables']['shared_profiles']['Update'];

// Enum types
export type FiscalIdType = Database['public']['Enums']['fiscal_id_type'];

// Type guards

/** Check if a profile has a complete fiscal ID setup (type + id + billing address) */
export function hasCompleteFiscalId(profile: SharedProfile): boolean {
  return (
    profile.fiscal_id_type !== null &&
    profile.fiscal_id !== null &&
    profile.billing_address_line1 !== null &&
    profile.billing_city !== null &&
    profile.billing_postal_code !== null &&
    profile.billing_country !== null
  );
}
