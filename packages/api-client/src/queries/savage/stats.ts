import type { Client } from '../../client';
import type { Database } from '@kikolator/shared-types';

type SavageMonthlyStats = Database['public']['Tables']['savage_monthly_stats']['Row'];
type SavageDailyStats = Database['public']['Tables']['savage_daily_stats']['Row'];

/** Get monthly stats for the last N months (admin) */
export async function getMonthlyStats(
  client: Client,
  months: number = 12
): Promise<SavageMonthlyStats[]> {
  const { data } = await client
    .from('savage_monthly_stats')
    .select('*')
    .order('month', { ascending: false })
    .limit(months);

  return data ?? [];
}

interface DateRange {
  from: string;
  to: string;
}

/** Get daily stats for a date range (admin) */
export async function getDailyStats(
  client: Client,
  dateRange: DateRange
): Promise<SavageDailyStats[]> {
  const { data } = await client
    .from('savage_daily_stats')
    .select('*')
    .gte('date', dateRange.from)
    .lte('date', dateRange.to)
    .order('date', { ascending: true });

  return data ?? [];
}
