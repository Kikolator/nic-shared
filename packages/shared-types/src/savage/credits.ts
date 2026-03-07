import type { Database } from '../database.js';

// Row types
export type SavageCreditGrant = Database['public']['Tables']['savage_credit_grants']['Row'];
export type SavageCreditGrantInsert = Database['public']['Tables']['savage_credit_grants']['Insert'];
export type SavageCreditGrantUpdate = Database['public']['Tables']['savage_credit_grants']['Update'];

// Enum types
export type SavageCreditType = Database['public']['Enums']['savage_credit_type'];
export type SavageCreditGrantSource = Database['public']['Enums']['savage_credit_grant_source'];

// Related table types
export type SavageBookingCreditDeduction = Database['public']['Tables']['savage_booking_credit_deductions']['Row'];
export type SavagePlanCredits = Database['public']['Tables']['savage_plan_credits']['Row'];

// RPC return types
export type SavageCreditBalance = Database['public']['Functions']['savage_get_credit_balance']['Returns'][number];
