import type { Database } from '../database.js';
import type { SavageResourceType } from './resources.js';

// Row types
export type SavageRateConfig = Database['public']['Tables']['savage_rate_config']['Row'];
export type SavageRateConfigInsert = Database['public']['Tables']['savage_rate_config']['Insert'];
export type SavageRateConfigUpdate = Database['public']['Tables']['savage_rate_config']['Update'];

// Lookup helper — rates indexed by resource type (cents)
export type RatesByResourceType = Record<SavageResourceType, number>;
