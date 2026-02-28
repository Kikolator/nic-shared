import type { Client } from '../../client';
import type { SharedProfile, FiscalIdType, BillingEntityType } from '@kikolator/shared-types';

interface UpdateProfileInput {
  full_name?: string | null;
  phone?: string | null;
  avatar_url?: string | null;
  preferred_lang?: string | null;
  company?: string | null;
  role_title?: string | null;
}

/** Update a user's profile (name, phone, avatar, language, company, role) */
export async function updateProfile(
  client: Client,
  userId: string,
  data: UpdateProfileInput
): Promise<{ data: SharedProfile | null; error: string | null }> {
  const { data: profile, error } = await client
    .from('shared_profiles')
    .update(data)
    .eq('id', userId)
    .select()
    .single();

  return {
    data: profile,
    error: error?.message ?? null,
  };
}

interface UpdateBillingInfoInput {
  billing_entity_type: BillingEntityType;
  // Personal fiscal ID (used when billing_entity_type = 'individual')
  fiscal_id_type?: FiscalIdType | null;
  fiscal_id?: string | null;
  // Company billing (used when billing_entity_type = 'company')
  billing_company_name?: string | null;
  billing_company_tax_id_type?: FiscalIdType | null;
  billing_company_tax_id?: string | null;
  // Billing address
  billing_address_line1: string;
  billing_address_line2?: string | null;
  billing_city: string;
  billing_postal_code: string;
  billing_state_province?: string | null;
  billing_country?: string;
}

/** Update a user's billing entity type, fiscal/company tax IDs, and billing address */
export async function updateBillingInfo(
  client: Client,
  userId: string,
  data: UpdateBillingInfoInput
): Promise<{ data: SharedProfile | null; error: string | null }> {
  const { data: profile, error } = await client
    .from('shared_profiles')
    .update({
      billing_entity_type: data.billing_entity_type,
      fiscal_id_type: data.fiscal_id_type ?? null,
      fiscal_id: data.fiscal_id ?? null,
      billing_company_name: data.billing_company_name ?? null,
      billing_company_tax_id_type: data.billing_company_tax_id_type ?? null,
      billing_company_tax_id: data.billing_company_tax_id ?? null,
      billing_address_line1: data.billing_address_line1,
      billing_address_line2: data.billing_address_line2 ?? null,
      billing_city: data.billing_city,
      billing_postal_code: data.billing_postal_code,
      billing_state_province: data.billing_state_province ?? null,
      billing_country: data.billing_country ?? 'ES',
    })
    .eq('id', userId)
    .select()
    .single();

  return {
    data: profile,
    error: error?.message ?? null,
  };
}
