import type { Database } from '../database.js';

// Row types
export type SavageMember = Database['public']['Tables']['savage_members']['Row'];
export type SavageMemberInsert = Database['public']['Tables']['savage_members']['Insert'];
export type SavageMemberUpdate = Database['public']['Tables']['savage_members']['Update'];

// Enum types
export type SavagePlanType = Database['public']['Enums']['savage_plan_type'];
export type SavageMemberStatus = Database['public']['Enums']['savage_member_status'];
export type SavageAccessLevel = Database['public']['Enums']['savage_access_level'];

// Composite types
export type SavageMemberWithProfile = SavageMember & {
  profile: Database['public']['Tables']['shared_profiles']['Row'];
};

// Type guards

export function isActiveMember(member: SavageMember): boolean {
  return member.status === 'active';
}

export function hasUnlimitedDesk(plan: SavagePlanType): boolean {
  return plan === 'nomad' || plan === 'all_star';
}

export function hasFixedDesk(plan: SavagePlanType): boolean {
  return plan === 'all_star';
}

export function hasMeetingRoomAccess(plan: SavagePlanType): boolean {
  return (
    plan === 'connector' ||
    plan === 'explorer' ||
    plan === 'nomad' ||
    plan === 'all_star'
  );
}

// Plan hierarchy — useful for upgrade/downgrade logic
export const PLAN_ORDER: Record<SavagePlanType, number> = {
  checkpoint: 0,
  connector: 1,
  explorer: 2,
  nomad: 3,
  all_star: 4,
} as const;

// Display labels
export const PLAN_LABELS: Record<SavagePlanType, string> = {
  checkpoint: 'Checkpoint',
  connector: 'Connector',
  explorer: 'Explorer',
  nomad: 'Nomad',
  all_star: 'All-Star',
} as const;

export const MEMBER_STATUS_LABELS: Record<SavageMemberStatus, string> = {
  active: 'Active',
  paused: 'Paused',
  past_due: 'Past Due',
  cancelled: 'Cancelled',
  churned: 'Churned',
} as const;
