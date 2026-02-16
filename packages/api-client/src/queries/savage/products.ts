import type { Client } from '../../client';
import type { SavageProduct, SavagePlanType } from '@nic/shared-types';

/** Get all active products (admin) */
export async function getProducts(
  client: Client
): Promise<SavageProduct[]> {
  const { data } = await client
    .from('savage_products')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true });

  return data ?? [];
}

/** Get products visible to a given plan (member store) */
export async function getVisibleProducts(
  client: Client,
  plan?: SavagePlanType
): Promise<SavageProduct[]> {
  let query = client
    .from('savage_products')
    .select('*')
    .eq('active', true);

  if (!plan) {
    // Non-member: only products visible to non-members
    query = query.eq('visible_to_non_members', true);
  } else {
    // Member: products visible to non-members OR to their plan
    query = query.or(`visible_to_non_members.eq.true,visible_to_plans.cs.{${plan}}`);
  }

  query = query.order('sort_order', { ascending: true });

  const { data } = await query;
  return data ?? [];
}
