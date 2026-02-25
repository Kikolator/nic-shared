import type { Client } from '../../client';
import type { SavageMember, SavageMemberUpdate } from '@kikolator/shared-types';

/** Update a member's details (admin) */
export async function updateMember(
  client: Client,
  memberId: string,
  data: SavageMemberUpdate
): Promise<{ data: SavageMember | null; error: string | null }> {
  const { data: member, error } = await client
    .from('savage_members')
    .update(data)
    .eq('id', memberId)
    .select()
    .single();

  return {
    data: member,
    error: error?.message ?? null,
  };
}

/** Pause a member's subscription */
export async function pauseMember(
  client: Client,
  memberId: string
): Promise<{ data: SavageMember | null; error: string | null }> {
  const { data, error } = await client
    .from('savage_members')
    .update({
      status: 'paused',
      paused_at: new Date().toISOString(),
    })
    .eq('id', memberId)
    .select()
    .single();

  return {
    data,
    error: error?.message ?? null,
  };
}

/** Request cancellation (starts 7-day notice period) */
export async function cancelMember(
  client: Client,
  memberId: string
): Promise<{ data: SavageMember | null; error: string | null }> {
  const { data, error } = await client
    .from('savage_members')
    .update({
      cancel_requested_at: new Date().toISOString(),
    })
    .eq('id', memberId)
    .select()
    .single();

  return {
    data,
    error: error?.message ?? null,
  };
}
