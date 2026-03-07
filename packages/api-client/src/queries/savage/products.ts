import type { Client } from '../../client';
import type { SavageProduct } from '@kikolator/shared-types';

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
