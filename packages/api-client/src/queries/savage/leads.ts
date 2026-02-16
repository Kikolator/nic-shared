import type { Client } from '../../client';
import type { SavageLead, SavageLeadStatus } from '@nic/shared-types';

interface LeadFilters {
  status?: SavageLeadStatus;
  from?: string;
  to?: string;
}

/** Get leads with optional filters (admin) */
export async function getLeads(
  client: Client,
  filters?: LeadFilters
): Promise<SavageLead[]> {
  let query = client
    .from('savage_leads')
    .select('*');

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  if (filters?.from) {
    query = query.gte('created_at', filters.from);
  }
  if (filters?.to) {
    query = query.lte('created_at', filters.to);
  }

  query = query.order('created_at', { ascending: false });

  const { data } = await query;
  return data ?? [];
}

/** Get leads filtered by status (admin) */
export async function getLeadsByStatus(
  client: Client,
  status: SavageLeadStatus
): Promise<SavageLead[]> {
  const { data } = await client
    .from('savage_leads')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });

  return data ?? [];
}

/** Get leads with upcoming trial dates (admin) */
export async function getUpcomingTrials(
  client: Client
): Promise<SavageLead[]> {
  const today = new Date().toISOString().split('T')[0]!;

  const { data } = await client
    .from('savage_leads')
    .select('*')
    .gte('trial_date', today)
    .order('trial_date', { ascending: true });

  return data ?? [];
}
