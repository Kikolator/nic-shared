import type { Database } from '../database';

// Row types
export type SharedPerk = Database['public']['Tables']['shared_perks']['Row'];
export type SharedPerkInsert = Database['public']['Tables']['shared_perks']['Insert'];
export type SharedPerkUpdate = Database['public']['Tables']['shared_perks']['Update'];

export type SharedPerkRedemption = Database['public']['Tables']['shared_perk_redemptions']['Row'];
export type SharedPerkRedemptionInsert = Database['public']['Tables']['shared_perk_redemptions']['Insert'];

// Derived types
export type DiscountType = 'percentage' | 'fixed' | 'freebie';
