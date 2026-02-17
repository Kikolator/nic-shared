import type { Database } from '../database';

// Row types
export type SavageCredit = Database['public']['Tables']['savage_credits']['Row'];
export type SavageCreditInsert = Database['public']['Tables']['savage_credits']['Insert'];

// Enum types
export type SavageCreditType = Database['public']['Enums']['savage_credit_type'];
export type SavageCreditSource = Database['public']['Enums']['savage_credit_source'];

