import type { Database } from '../database.js';

// Row types
export type SavageDailyStats = Database['public']['Tables']['savage_daily_stats']['Row'];
export type SavageMonthlyStats = Database['public']['Tables']['savage_monthly_stats']['Row'];
