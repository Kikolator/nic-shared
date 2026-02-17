import type { Database } from '../database.js';

// Row types
export type SavageBooking = Database['public']['Tables']['savage_bookings']['Row'];
export type SavageBookingInsert = Database['public']['Tables']['savage_bookings']['Insert'];
export type SavageBookingUpdate = Database['public']['Tables']['savage_bookings']['Update'];

export type SavageRecurringRule = Database['public']['Tables']['savage_recurring_rules']['Row'];

// Enum types
export type SavageBookingStatus = Database['public']['Enums']['savage_booking_status'];
export type SavageRecurrencePattern = Database['public']['Enums']['savage_recurrence_pattern'];

// Type guards

/** Booking is currently active (confirmed or checked in) */
export function isActiveBooking(booking: SavageBooking): boolean {
  return booking.status === 'confirmed' || booking.status === 'checked_in';
}

/** Booking can be cancelled (confirmed and start time is in the future) */
export function isCancellable(booking: SavageBooking): boolean {
  return (
    booking.status === 'confirmed' &&
    new Date(booking.start_time) > new Date()
  );
}

export const BOOKING_STATUS_LABELS: Record<SavageBookingStatus, string> = {
  pending_payment: 'Pending Payment',
  confirmed: 'Confirmed',
  checked_in: 'Checked In',
  completed: 'Completed',
  cancelled: 'Cancelled',
  no_show: 'No Show',
} as const;
