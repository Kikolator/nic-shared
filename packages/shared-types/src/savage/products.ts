import type { Database } from '../database';

// Row types
export type SavageProduct = Database['public']['Tables']['savage_products']['Row'];
export type SavageProductInsert = Database['public']['Tables']['savage_products']['Insert'];
export type SavageProductUpdate = Database['public']['Tables']['savage_products']['Update'];

// Enum types
export type SavageProductCategory = Database['public']['Enums']['savage_product_category'];

// Helpers

/** Format price in cents to display string, e.g. 4900 -> "€49.00" */
export function formatPrice(priceCents: number): string {
  return `€${(priceCents / 100).toFixed(2)}`;
}

/** Calculate pre-tax amount from price including IVA */
export function getPriceExVat(priceCents: number, ivaRate: number): number {
  return Math.round(priceCents / (1 + ivaRate / 100));
}

/** Check if a product is a subscription plan */
export function isSubscriptionProduct(product: SavageProduct): boolean {
  return product.category === 'subscription';
}
