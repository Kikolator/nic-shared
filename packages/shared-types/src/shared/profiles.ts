import type { Database } from '../database.js';

// Row types
export type SharedProfile = Database['public']['Tables']['shared_profiles']['Row'];
export type SharedProfileInsert = Database['public']['Tables']['shared_profiles']['Insert'];
export type SharedProfileUpdate = Database['public']['Tables']['shared_profiles']['Update'];

// Enum types
export type FiscalIdType = Database['public']['Enums']['fiscal_id_type'];

// Helper types (billing_entity_type is a CHECK constraint, not a DB enum)
export type BillingEntityType = 'individual' | 'company';

// Type guards

/** Check if a profile has a complete personal fiscal ID (type + id + billing address) */
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

/** Check if a profile has complete billing info based on entity type */
export function hasCompleteBillingInfo(profile: SharedProfile): boolean {
  const hasAddress =
    profile.billing_address_line1 !== null &&
    profile.billing_city !== null &&
    profile.billing_postal_code !== null &&
    profile.billing_country !== null;

  if (profile.billing_entity_type === 'company') {
    return (
      hasAddress &&
      profile.billing_company_tax_id_type !== null &&
      profile.billing_company_tax_id !== null
    );
  }

  // Individual (default)
  return (
    hasAddress &&
    profile.fiscal_id_type !== null &&
    profile.fiscal_id !== null
  );
}
