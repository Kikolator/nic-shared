import type { Client } from '../../client';
import type { SavageLead, SavageLeadStatus } from '@kikolator/shared-types';

interface CreateLeadInput {
  email: string;
  full_name?: string;
  phone?: string;
  company?: string;
  source?: string;
  trial_date?: string;
  admin_notes?: string;
}

/** Create a new lead */
export async function createLead(
  client: Client,
  input: CreateLeadInput
): Promise<{ data: SavageLead | null; error: string | null }> {
  const { data, error } = await client
    .from('savage_leads')
    .insert({
      email: input.email,
      full_name: input.full_name ?? null,
      phone: input.phone ?? null,
      company: input.company ?? null,
      source: input.source ?? null,
      trial_date: input.trial_date ?? null,
      admin_notes: input.admin_notes ?? null,
      status: 'new',
    })
    .select()
    .single();

  return {
    data,
    error: error?.message ?? null,
  };
}

/** Update a lead's status with optional admin notes */
export async function updateLeadStatus(
  client: Client,
  leadId: string,
  status: SavageLeadStatus,
  notes?: string
): Promise<{ data: SavageLead | null; error: string | null }> {
  const update: Record<string, unknown> = { status };
  if (notes !== undefined) {
    update.admin_notes = notes;
  }
  update.last_contacted_at = new Date().toISOString();

  const { data, error } = await client
    .from('savage_leads')
    .update(update)
    .eq('id', leadId)
    .select()
    .single();

  return {
    data,
    error: error?.message ?? null,
  };
}

/** Convert a lead to a member (set status converted + link user) */
export async function convertLead(
  client: Client,
  leadId: string,
  userId: string
): Promise<{ data: SavageLead | null; error: string | null }> {
  const { data, error } = await client
    .from('savage_leads')
    .update({
      status: 'converted' as SavageLeadStatus,
      converted_user_id: userId,
    })
    .eq('id', leadId)
    .select()
    .single();

  return {
    data,
    error: error?.message ?? null,
  };
}
