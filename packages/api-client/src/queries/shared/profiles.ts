import type { Client } from '../../client';
import type { SharedProfile, AppType } from '@kikolator/shared-types';

/** Get a user's profile by their auth user ID */
export async function getProfile(
  client: Client,
  userId: string
): Promise<SharedProfile | null> {
  const { data, error } = await client
    .from('shared_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) return null;
  return data;
}

/** Check if a user has admin status for a given app */
export async function getAdminStatus(
  client: Client,
  userId: string,
  app: AppType
): Promise<boolean> {
  const { data, error } = await client
    .from('shared_admins')
    .select('id')
    .eq('user_id', userId)
    .eq('app', app)
    .maybeSingle();

  if (error) return false;
  return data !== null;
}

/** Get all apps a user is admin of */
export async function getAdminApps(
  client: Client,
  userId: string
): Promise<AppType[]> {
  const { data } = await client
    .from('shared_admins')
    .select('app')
    .eq('user_id', userId);

  return (data ?? []).map((row) => row.app);
}
