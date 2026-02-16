import type { Client } from '../../client';
import type { SavagePass } from '@nic/shared-types';

/** Get all passes for a user */
export async function getPassesByUser(
  client: Client,
  userId: string
): Promise<SavagePass[]> {
  const { data } = await client
    .from('savage_passes')
    .select('*')
    .eq('user_id', userId)
    .order('start_date', { ascending: false });

  return data ?? [];
}

/** Get all active passes for a given date (admin: occupancy) */
export async function getActivePasses(
  client: Client,
  date: string
): Promise<SavagePass[]> {
  const { data } = await client
    .from('savage_passes')
    .select('*')
    .eq('status', 'active')
    .lte('start_date', date)
    .gte('end_date', date)
    .order('start_date', { ascending: true });

  return data ?? [];
}
