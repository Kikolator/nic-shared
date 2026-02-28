# nic-shared

Shared TypeScript packages for the Nic Ecosystem — connecting Savage Coworking, Musa Coffee, and Listy.

## Packages

| Package | Description |
|---------|-------------|
| `@nic/shared-types` | TypeScript types derived from the Supabase schema |
| `@nic/api-client` | Typed Supabase query and mutation functions |
| `@nic/shared-ui` | Cross-app React components (auth, profile, perks) |
| `@nic/perks-sdk` | Perk eligibility and discount calculation engine |

## Setup

```bash
npm install
```

## Commands

```bash
# Build all packages
npm run build

# Type-check all packages
npm run type-check

# Build a specific package
npm run build --workspace=packages/shared-types

# Type-check a specific package
npm run type-check --workspace=packages/api-client
```

## Consuming in App Repos

Add file references during local development:

```json
{
  "dependencies": {
    "@nic/shared-types": "file:../nic-shared/packages/shared-types",
    "@nic/api-client": "file:../nic-shared/packages/api-client",
    "@nic/shared-ui": "file:../nic-shared/packages/shared-ui",
    "@nic/perks-sdk": "file:../nic-shared/packages/perks-sdk"
  }
}
```

## Dependency Graph

```
@nic/shared-types    (zero dependencies — pure types)
    ^
@nic/api-client      (depends on: shared-types, @supabase/supabase-js)
    ^
@nic/shared-ui       (depends on: shared-types, react peer deps)
    ^
@nic/perks-sdk       (depends on: shared-types only)

App repos (savage-web, musa-web) consume all four packages.
```

## Billing Entity Redesign (v0.3.0 / v0.2.0)

Breaking changes to support international invoicing with personal vs company billing.

### What Changed in nic-shared

- `company` and `role_title` moved from `savage_members` to `shared_profiles`
- `billing_province` renamed to `billing_state_province`
- New `shared_profiles` fields: `billing_entity_type`, `billing_company_name`, `billing_company_tax_id_type`, `billing_company_tax_id`
- `fiscal_id_type` enum expanded: added `eu_vat`, `foreign_tax_id`, `other`
- `updateFiscalId()` replaced by `updateBillingInfo()` in `@nic/api-client`
- `updateProfile()` now accepts `company` and `role_title`
- New type export: `BillingEntityType` (`'individual' | 'company'`)
- New type guard: `hasCompleteBillingInfo(profile)`
- `savage_update_member_profile` RPC function removed

### Frontend Files to Update

**Profile page** (`app/(member)/profile/`)
- Read `company` and `role_title` from `shared_profiles` instead of `savage_members`
- Add `billing_entity_type` toggle (Individual / Company)
- Show company billing fields (name, tax ID type, tax ID) when entity type is `company`
- Replace "Province" label with "State / Province / Region"
- Add country dropdown (default: Spain)
- Conditional postal code validation (5-digit for Spain, relaxed for others)

**Profile server actions** (`app/(member)/profile/actions.ts`)
- Use `updateBillingInfo()` instead of `updateFiscalId()`
- Pass `company` and `role_title` via `updateProfile()`
- Remove any calls to `savage_update_member_profile` RPC

**Validators** (`lib/utils/validators.ts`)
- Update `fiscalIdSchema` to include `eu_vat`, `foreign_tax_id`, `other`
- Update `billingAddressSchema`: `billing_province` to `billing_state_province`, country-aware postal code validation
- Add `billingEntitySchema` for company billing fields

**Store / Checkout** (fiscal ID gate)
- Individual: require `fiscal_id` for invoices > 1,000 EUR
- Company: require `billing_company_tax_id`

**Stripe webhook** (`stripe-webhook/index.ts`)
- Stop setting `company` on `savage_members`
- Update any profile lookups that joined `savage_members.company`

**Dashboard widgets**
- Read `company` from `shared_profiles` instead of `savage_members`
