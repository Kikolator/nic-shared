import type { Client } from '../../client';
import type { SavageResource, SavageResourceType } from '@kikolator/shared-types';

/** Get resources, optionally filtered by type */
export async function getResources(
  client: Client,
  type?: SavageResourceType
): Promise<SavageResource[]> {
  let query = client
    .from('savage_resources')
    .select('*');

  if (type) {
    query = query.eq('resource_type', type);
  }

  query = query.order('sort_order', { ascending: true });

  const { data } = await query;
  return data ?? [];
}

/** Get desk availability count for a given date (RPC) */
export async function getDeskAvailability(
  client: Client,
  date: string
): Promise<number> {
  const { data, error } = await client.rpc('savage_get_desk_availability', {
    p_date: date,
  });

  if (error) return 0;
  return data ?? 0;
}

/** Get room availability slots for a given resource and date (RPC) */
export async function getRoomAvailability(
  client: Client,
  resourceId: string,
  date: string
): Promise<{ slot_start: string; slot_end: string }[]> {
  const { data, error } = await client.rpc('savage_get_room_availability', {
    p_resource_id: resourceId,
    p_date: date,
  });

  if (error) return [];
  return data ?? [];
}
