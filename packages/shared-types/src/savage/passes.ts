import type { Database } from '../database.js';

// Row types
export type SavagePass = Database['public']['Tables']['savage_passes']['Row'];
export type SavagePassInsert = Database['public']['Tables']['savage_passes']['Insert'];
export type SavagePassUpdate = Database['public']['Tables']['savage_passes']['Update'];

// Enum types
export type SavagePassType = Database['public']['Enums']['savage_pass_type'];
export type SavagePassStatus = Database['public']['Enums']['savage_pass_status'];

// Type guards

/** Pass is currently active (status active and date within range) */
export function isActivePass(pass: SavagePass): boolean {
  const now = new Date();
  const start = new Date(pass.start_date);
  const end = new Date(pass.end_date);
  return pass.status === 'active' && now >= start && now <= end;
}
