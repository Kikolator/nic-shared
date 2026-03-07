import type { Client } from '../../client';
import type { SavagePass, SavagePassType } from '@kikolator/shared-types';

interface CreatePassInput {
  user_id: string;
  pass_type: SavagePassType;
  start_date: string;
  end_date: string;
  amount_cents: number;
  is_guest?: boolean;
  purchased_by?: string;
  /** Not a DB column — forwarded to Stripe session metadata for guest user lookup/creation */
  guest_email?: string;
}

/** Create a new pass with pending_payment status */
export async function createPass(
  client: Client,
  input: CreatePassInput
): Promise<{ data: SavagePass | null; error: string | null }> {
  const { guest_email: _guest_email, ...dbFields } = input;

  const { data, error } = await client
    .from('savage_passes')
    .insert({
      ...dbFields,
      status: 'pending_payment',
    })
    .select()
    .single();

  return {
    data,
    error: error?.message ?? null,
  };
}

/** Activate a pass (called after payment) */
export async function activatePass(
  client: Client,
  passId: string
): Promise<{ data: SavagePass | null; error: string | null }> {
  const { data, error } = await client
    .from('savage_passes')
    .update({ status: 'active' })
    .eq('id', passId)
    .select()
    .single();

  return {
    data,
    error: error?.message ?? null,
  };
}
