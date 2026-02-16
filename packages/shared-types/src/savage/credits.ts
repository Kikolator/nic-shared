import type { Database } from '../database';

// Row types
export type SavageCredit = Database['public']['Tables']['savage_credits']['Row'];
export type SavageCreditInsert = Database['public']['Tables']['savage_credits']['Insert'];

// Enum types
export type SavageCreditType = Database['public']['Enums']['savage_credit_type'];
export type SavageCreditSource = Database['public']['Enums']['savage_credit_source'];

// Helpers

/** Format minutes as human-readable hours string, e.g. 270 -> "4h 30min", 1200 -> "20h", 45 -> "45min" */
export function formatMinutesAsHours(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;

  if (hours === 0) return `${remaining}min`;
  if (remaining === 0) return `${hours}h`;
  return `${hours}h ${remaining}min`;
}
