import type { Client } from '../../client';
import type { SavageBooking } from '@nic/shared-types';

interface DateRange {
  from: string;
  to: string;
}

/** Get bookings for a user, optionally filtered by date range */
export async function getBookingsByUser(
  client: Client,
  userId: string,
  dateRange?: DateRange
): Promise<SavageBooking[]> {
  let query = client
    .from('savage_bookings')
    .select('*')
    .eq('user_id', userId);

  if (dateRange) {
    query = query
      .gte('start_time', dateRange.from)
      .lte('start_time', dateRange.to);
  }

  query = query.order('start_time', { ascending: true });

  const { data } = await query;
  return data ?? [];
}

/** Get bookings for a specific resource on a given date */
export async function getBookingsByResource(
  client: Client,
  resourceId: string,
  date: string
): Promise<SavageBooking[]> {
  const dayStart = `${date}T00:00:00`;
  const dayEnd = `${date}T23:59:59`;

  const { data } = await client
    .from('savage_bookings')
    .select('*')
    .eq('resource_id', resourceId)
    .gte('start_time', dayStart)
    .lte('start_time', dayEnd)
    .in('status', ['confirmed', 'checked_in'])
    .order('start_time', { ascending: true });

  return data ?? [];
}

/** Get upcoming confirmed bookings for a user (start_time > now) */
export async function getUpcomingBookings(
  client: Client,
  userId: string
): Promise<SavageBooking[]> {
  const { data } = await client
    .from('savage_bookings')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'confirmed')
    .gt('start_time', new Date().toISOString())
    .order('start_time', { ascending: true });

  return data ?? [];
}
