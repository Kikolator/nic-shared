import type { Client } from '../../client';
import type { SavageCredit, SavageCreditType } from '@kikolator/shared-types';

/** Get credit balance for a user and credit type (RPC) */
export async function getCreditBalance(
  client: Client,
  userId: string,
  creditType: SavageCreditType
): Promise<number> {
  const { data, error } = await client.rpc('savage_get_credit_balance', {
    p_user_id: userId,
    p_credit_type: creditType,
  });

  if (error) return 0;
  return data ?? 0;
}

/** Get credit history for a user, optionally filtered by credit type */
export async function getCreditHistory(
  client: Client,
  userId: string,
  creditType?: SavageCreditType
): Promise<SavageCredit[]> {
  let query = client
    .from('savage_credits')
    .select('*')
    .eq('user_id', userId);

  if (creditType) {
    query = query.eq('credit_type', creditType);
  }

  query = query.order('created_at', { ascending: false });

  const { data } = await query;
  return data ?? [];
}
