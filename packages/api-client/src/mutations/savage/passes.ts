import type { Client } from '../../client';
import type { SavagePass, SavagePassType } from '@nic/shared-types';

interface CreatePassInput {
  user_id: string;
  pass_type: SavagePassType;
  start_date: string;
  end_date: string;
  amount_cents: number;
}

/** Create a new pass with pending_payment status */
export async function createPass(
  client: Client,
  input: CreatePassInput
): Promise<{ data: SavagePass | null; error: string | null }> {
  const { data, error } = await client
    .from('savage_passes')
    .insert({
      user_id: input.user_id,
      pass_type: input.pass_type,
      start_date: input.start_date,
      end_date: input.end_date,
      amount_cents: input.amount_cents,
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
