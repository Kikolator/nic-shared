import type { Client } from '../../client';
import type { SavageBooking } from '@nic/shared-types';

interface CreateBookingInput {
  user_id: string;
  resource_id: string;
  start_time: string;
  end_time: string;
  amount_cents?: number;
  recurring_rule_id?: string;
}

/** Create a new booking */
export async function createBooking(
  client: Client,
  input: CreateBookingInput
): Promise<{ data: SavageBooking | null; error: string | null }> {
  const { data, error } = await client
    .from('savage_bookings')
    .insert({
      user_id: input.user_id,
      resource_id: input.resource_id,
      start_time: input.start_time,
      end_time: input.end_time,
      amount_cents: input.amount_cents ?? null,
      recurring_rule_id: input.recurring_rule_id ?? null,
      status: 'confirmed',
    })
    .select()
    .single();

  return {
    data,
    error: error?.message ?? null,
  };
}

/** Cancel a booking with optional reason */
export async function cancelBooking(
  client: Client,
  bookingId: string,
  reason?: string
): Promise<{ data: SavageBooking | null; error: string | null }> {
  const { data, error } = await client
    .from('savage_bookings')
    .update({
      status: 'cancelled',
      cancelled_at: new Date().toISOString(),
      cancel_reason: reason ?? null,
    })
    .eq('id', bookingId)
    .select()
    .single();

  return {
    data,
    error: error?.message ?? null,
  };
}

/** Check in to a booking */
export async function checkInBooking(
  client: Client,
  bookingId: string
): Promise<{ data: SavageBooking | null; error: string | null }> {
  const { data, error } = await client
    .from('savage_bookings')
    .update({
      status: 'checked_in',
      checked_in_at: new Date().toISOString(),
    })
    .eq('id', bookingId)
    .select()
    .single();

  return {
    data,
    error: error?.message ?? null,
  };
}
