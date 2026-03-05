import type { Client } from '../../client';
import type { SavageCreditBalance, SavageCreditGrant, SavageCreditType } from '@kikolator/shared-types';

/** Get credit balance for a user and credit type (RPC) */
export async function getCreditBalance(
  client: Client,
  userId: string,
  creditType: SavageCreditType
): Promise<SavageCreditBalance | null> {
  const { data, error } = await client
    .rpc('savage_get_credit_balance', {
      p_user_id: userId,
      p_credit_type: creditType,
    })
    .single();

  if (error) return null;
  return data;
}

/** Get credit grant history for a user, optionally filtered by credit type */
export async function getCreditHistory(
  client: Client,
  userId: string,
  creditType?: SavageCreditType
): Promise<SavageCreditGrant[]> {
  let query = client
    .from('savage_credit_grants')
    .select('*')
    .eq('user_id', userId);

  if (creditType) {
    query = query.eq('credit_type', creditType);
  }

  query = query.order('created_at', { ascending: false });

  const { data } = await query;
  return data ?? [];
}
