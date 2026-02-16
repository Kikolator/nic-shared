import type { Database } from '../database';

// Row types
export type SavageLead = Database['public']['Tables']['savage_leads']['Row'];
export type SavageLeadInsert = Database['public']['Tables']['savage_leads']['Insert'];
export type SavageLeadUpdate = Database['public']['Tables']['savage_leads']['Update'];

// Enum types
export type SavageLeadStatus = Database['public']['Enums']['savage_lead_status'];

// Display labels
export const LEAD_STATUS_LABELS: Record<SavageLeadStatus, string> = {
  new: 'New',
  confirmed: 'Confirmed',
  completed: 'Completed',
  follow_up: 'Follow Up',
  converted: 'Converted',
  lost: 'Lost',
} as const;

// Type guards

/** Lead is in a status where it can be converted to a member */
export function isConvertibleLead(lead: SavageLead): boolean {
  return (
    lead.status === 'new' ||
    lead.status === 'confirmed' ||
    lead.status === 'completed' ||
    lead.status === 'follow_up'
  );
}
