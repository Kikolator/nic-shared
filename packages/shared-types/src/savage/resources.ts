import type { Database } from '../database';

// Row types
export type SavageResource = Database['public']['Tables']['savage_resources']['Row'];
export type SavageResourceInsert = Database['public']['Tables']['savage_resources']['Insert'];
export type SavageResourceUpdate = Database['public']['Tables']['savage_resources']['Update'];

// Enum types
export type SavageResourceType = Database['public']['Enums']['savage_resource_type'];
export type SavageResourceStatus = Database['public']['Enums']['savage_resource_status'];

// Type guards

/** Resource is available for booking */
export function isBookableResource(resource: SavageResource): boolean {
  return resource.status === 'available';
}

// Display labels
export const RESOURCE_TYPE_LABELS: Record<SavageResourceType, string> = {
  desk: 'Desk',
  meeting_room: 'Meeting Room',
  podcast_room: 'Podcast Room',
} as const;
