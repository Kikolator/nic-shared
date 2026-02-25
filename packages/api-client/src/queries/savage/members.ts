import type { Client } from '../../client';
import type {
  SavageMember,
  SavageMemberWithProfile,
  SharedProfile,
  SavagePlanType,
  SavageMemberStatus,
} from '@kikolator/shared-types';

/** Get a member by their auth user ID */
export async function getMemberByUserId(
  client: Client,
  userId: string
): Promise<SavageMember | null> {
  const { data, error } = await client
    .from('savage_members')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) return null;
  return data;
}

/** Get a member with their joined profile (two queries — no FK relationship) */
export async function getMemberWithProfile(
  client: Client,
  userId: string
): Promise<SavageMemberWithProfile | null> {
  const { data: member, error: memberError } = await client
    .from('savage_members')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (memberError || !member) return null;

  const { data: profile, error: profileError } = await client
    .from('shared_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (profileError || !profile) return null;

  return { ...member, profile } as SavageMemberWithProfile;
}

/** Get all active members, ordered by join date (admin) */
export async function getActiveMembers(
  client: Client
): Promise<SavageMember[]> {
  const { data } = await client
    .from('savage_members')
    .select('*')
    .eq('status', 'active')
    .order('joined_at', { ascending: false });

  return data ?? [];
}

interface MemberFilters {
  plan?: SavagePlanType;
  status?: SavageMemberStatus;
  limit?: number;
  offset?: number;
}

/** Get all members with optional filters, paginated (admin) */
export async function getAllMembers(
  client: Client,
  filters?: MemberFilters
): Promise<SavageMember[]> {
  let query = client
    .from('savage_members')
    .select('*');

  if (filters?.plan) {
    query = query.eq('plan', filters.plan);
  }
  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  query = query.order('joined_at', { ascending: false });

  if (filters?.limit) {
    const from = filters.offset ?? 0;
    query = query.range(from, from + filters.limit - 1);
  }

  const { data } = await query;
  return data ?? [];
}
