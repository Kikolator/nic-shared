import type { Database } from '../database.js';
import type { SavagePlanType } from './members.js';
import type { SavageCreditType } from './credits.js';

// Row types
export type SavageProduct = Database['public']['Tables']['savage_products']['Row'];
export type SavageProductInsert = Database['public']['Tables']['savage_products']['Insert'];
export type SavageProductUpdate = Database['public']['Tables']['savage_products']['Update'];

// Enum types
export type SavageProductCategory = Database['public']['Enums']['savage_product_category'];

// JSON column types

export interface VisibilityRules {
  members_only?: boolean;
  non_members_only?: boolean;
  plans?: SavagePlanType[];
  exclude_unlimited?: boolean;
}

export interface CreditGrantConfig {
  credit_type: SavageCreditType;
  minutes: number;
}

// Purchase flow pseudo-enum (CHECK constraint, not a DB enum)
export const PURCHASE_FLOWS = ['checkout', 'subscription', 'date_picker', 'subscription_addon'] as const;
export type PurchaseFlow = typeof PURCHASE_FLOWS[number];

// Type guards

/** Narrow the Json | null credit_grant_config column */
export function hasCreditGrantConfig(
  product: SavageProduct
): product is SavageProduct & { credit_grant_config: CreditGrantConfig } {
  const cfg = product.credit_grant_config;
  return (
    cfg !== null &&
    typeof cfg === 'object' &&
    !Array.isArray(cfg) &&
    'credit_type' in cfg &&
    'minutes' in cfg
  );
}

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
