import type { Client } from '../../client';
import type { SharedProfile, FiscalIdType } from '@nic/shared-types';

interface UpdateProfileInput {
  full_name?: string | null;
  phone?: string | null;
  avatar_url?: string | null;
  preferred_lang?: string | null;
}

/** Update a user's profile (name, phone, avatar, language) */
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

interface UpdateFiscalIdInput {
  fiscal_id_type: FiscalIdType;
  fiscal_id: string;
  billing_address_line1: string;
  billing_address_line2?: string | null;
  billing_city: string;
  billing_postal_code: string;
  billing_province?: string | null;
  billing_country?: string;
}

/** Update a user's fiscal ID and billing address */
export async function updateFiscalId(
  client: Client,
  userId: string,
  data: UpdateFiscalIdInput
): Promise<{ data: SharedProfile | null; error: string | null }> {
  const { data: profile, error } = await client
    .from('shared_profiles')
    .update({
      fiscal_id_type: data.fiscal_id_type,
      fiscal_id: data.fiscal_id,
      billing_address_line1: data.billing_address_line1,
      billing_address_line2: data.billing_address_line2 ?? null,
      billing_city: data.billing_city,
      billing_postal_code: data.billing_postal_code,
      billing_province: data.billing_province ?? null,
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
