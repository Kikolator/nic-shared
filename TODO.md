# nic-shared — Implementation Todo

## Phase 0: Repo Setup

- [ ] Create GitHub repo `Kikolator/nic-shared` (private)
- [ ] Initialize workspace root:
  - [ ] `package.json` with `"workspaces": ["packages/*"]`
  - [ ] `tsconfig.base.json` (strict, ES2022, ESNext, bundler resolution, declarations)
  - [ ] `.gitignore` (node_modules, dist, .env)
- [ ] Create package scaffolds (empty `src/index.ts` + `package.json` + `tsconfig.json`):
  - [ ] `packages/shared-types/` — `@nic/shared-types`
  - [ ] `packages/api-client/` — `@nic/api-client`
  - [ ] `packages/shared-ui/` — `@nic/shared-ui`
  - [ ] `packages/perks-sdk/` — `@nic/perks-sdk`
- [ ] `npm install` at root — verify workspaces resolve
- [ ] `npm run build` — verify all packages compile (empty but valid)
- [ ] Create `CLAUDE.md` (project file — already written)
- [ ] Create `README.md` (human-readable setup guide)
- [ ] Initial commit + push

---

## Phase 1: `@nic/shared-types` — Database Types

**Prerequisite**: nic-supabase Phases 1–9 complete (schema + seed exist, types can be generated).

### Auto-Generated Types
- [ ] Copy `database.ts` from nic-supabase type generation output into `packages/shared-types/src/database.ts`
- [ ] Add `// AUTO-GENERATED — DO NOT EDIT` header comment
- [ ] Verify it exports `Database` type with all tables and enums

### Verify
- [ ] `npm run type-check --workspace=packages/shared-types` passes
- [ ] `npm run build --workspace=packages/shared-types` produces `dist/`

---

## Phase 2: `@nic/shared-types` — Shared Type Helpers

### `src/shared/profiles.ts`
- [ ] `SharedProfile` — Row type
- [ ] `SharedProfileInsert`, `SharedProfileUpdate` — Insert/Update types
- [ ] `FiscalIdType` — enum type
- [ ] `hasCompleteFiscalId(profile)` — type guard: fiscal_id_type + fiscal_id + billing address all present

### `src/shared/admins.ts`
- [ ] `SharedAdmin` — Row type
- [ ] `AppType` — enum type
- [ ] `isAdminOf(admins, app)` — checks if user has admin role for given app

### `src/shared/perks.ts`
- [ ] `SharedPerk` — Row type
- [ ] `SharedPerkRedemption` — Row type
- [ ] `DiscountType` — union type ('percentage' | 'fixed' | 'freebie')

### Barrel Exports
- [ ] `src/shared/index.ts` — re-export all shared types
- [ ] `src/index.ts` — re-export `shared/` + `Database`

### Verify
- [ ] Build passes, all types accessible from root import

---

## Phase 3: `@nic/shared-types` — Savage Type Helpers

### `src/savage/members.ts`
- [ ] `SavageMember`, `SavageMemberInsert`, `SavageMemberUpdate` — Row/Insert/Update
- [ ] `SavagePlanType`, `SavageMemberStatus`, `SavageAccessLevel` — enum types
- [ ] `SavageMemberWithProfile` — composite type (member + joined profile)
- [ ] `isActiveMember(member)` — status === 'active'
- [ ] `hasUnlimitedDesk(plan)` — nomad or all_star
- [ ] `hasFixedDesk(plan)` — all_star only
- [ ] `hasMeetingRoomAccess(plan)` — connector, explorer, nomad, all_star
- [ ] `PLAN_ORDER` — const object for plan hierarchy (checkpoint=0, connector=1, explorer=2, nomad=3, all_star=4) — useful for upgrade/downgrade logic
- [ ] `PLAN_LABELS` — const object for display names (all_star → "All-Star", etc.)

### `src/savage/bookings.ts`
- [ ] `SavageBooking`, `SavageBookingInsert` — Row/Insert
- [ ] `SavageBookingStatus` — enum type
- [ ] `SavageRecurringRule` — Row type
- [ ] `SavageRecurrencePattern` — enum type
- [ ] `isActiveBooking(booking)` — status in (confirmed, checked_in)
- [ ] `isCancellable(booking)` — status === 'confirmed' and start_time in future

### `src/savage/products.ts`
- [ ] `SavageProduct` — Row type
- [ ] `SavageProductCategory` — enum type
- [ ] `formatPrice(priceCents)` — returns formatted string "€49.00"
- [ ] `getPriceExVat(priceCents, ivaRate)` — calculates pre-tax amount
- [ ] `isSubscriptionProduct(product)` — category === 'subscription'

### `src/savage/resources.ts`
- [ ] `SavageResource` — Row type
- [ ] `SavageResourceType`, `SavageResourceStatus` — enum types
- [ ] `isBookableResource(resource)` — status === 'available'
- [ ] `RESOURCE_TYPE_LABELS` — const object for display names

### `src/savage/passes.ts`
- [ ] `SavagePass` — Row type
- [ ] `SavagePassType`, `SavagePassStatus` — enum types
- [ ] `isActivePass(pass)` — status === 'active' and date within range

### `src/savage/credits.ts`
- [ ] `SavageCredit` — Row type
- [ ] `SavageCreditType`, `SavageCreditSource` — enum types
- [ ] `formatMinutesAsHours(minutes)` — "4h 30min", "20h", etc.

### `src/savage/leads.ts`
- [ ] `SavageLead` — Row type
- [ ] `SavageLeadStatus` — enum types
- [ ] `LEAD_STATUS_LABELS` — const object for display names
- [ ] `isConvertibleLead(lead)` — status in (new, confirmed, completed, follow_up)

### Barrel Exports
- [ ] `src/savage/index.ts` — re-export all savage types
- [ ] Update `src/index.ts` — add savage re-export

### Verify
- [ ] Build passes
- [ ] All types importable: `import { SavageMember, SavagePlanType, isActiveMember } from '@nic/shared-types'`

---

## Phase 4: `@nic/api-client` — Setup + Client Factory

**Prerequisite**: Phase 3 complete (shared-types has all Savage types).

### Dependencies
- [ ] `npm install @supabase/supabase-js` in api-client package
- [ ] Add `@nic/shared-types` as dependency (file reference: `"file:../shared-types"`)

### Client Factory
- [ ] `src/client.ts` — `createApiClient(url, key)` returns typed `SupabaseClient<Database>`
- [ ] Export `Client` type alias: `type Client = SupabaseClient<Database>`

### Barrel Export
- [ ] `src/index.ts` — export client factory + Client type

### Verify
- [ ] Build passes
- [ ] Can create typed client in a test script

---

## Phase 5: `@nic/api-client` — Shared Queries & Mutations

### `src/queries/shared/profiles.ts`
- [ ] `getProfile(client, userId)` → `SharedProfile | null`
- [ ] `getAdminStatus(client, userId, app)` → `boolean`
- [ ] `getAdminApps(client, userId)` → `AppType[]` (which apps is user admin of)

### `src/mutations/shared/profiles.ts`
- [ ] `updateProfile(client, userId, data)` → update name, phone, avatar, lang
- [ ] `updateFiscalId(client, userId, data)` → update fiscal_id_type, fiscal_id, billing address fields

### Barrel Exports
- [ ] `src/queries/shared/index.ts`
- [ ] `src/mutations/shared/index.ts`
- [ ] `src/queries/index.ts`
- [ ] `src/mutations/index.ts`
- [ ] Update `src/index.ts`

### Verify
- [ ] Build passes
- [ ] All query/mutation functions importable from root

---

## Phase 6: `@nic/api-client` — Savage Queries

### `src/queries/savage/members.ts`
- [ ] `getMemberByUserId(client, userId)` → `SavageMember | null`
- [ ] `getMemberWithProfile(client, userId)` → `SavageMemberWithProfile | null`
- [ ] `getActiveMembers(client)` → `SavageMember[]` (admin)
- [ ] `getAllMembers(client, filters?)` → paginated, filterable by plan/status (admin)

### `src/queries/savage/bookings.ts`
- [ ] `getBookingsByUser(client, userId, dateRange?)` → `SavageBooking[]`
- [ ] `getBookingsByResource(client, resourceId, date)` → `SavageBooking[]`
- [ ] `getUpcomingBookings(client, userId)` → confirmed bookings, start_time > now

### `src/queries/savage/resources.ts`
- [ ] `getResources(client, type?)` → `SavageResource[]`, optionally filtered by type
- [ ] `getDeskAvailability(client, date)` → calls `savage_get_desk_availability` RPC
- [ ] `getRoomAvailability(client, resourceId, date)` → calls `savage_get_room_availability` RPC

### `src/queries/savage/products.ts`
- [ ] `getProducts(client)` → all active products (admin)
- [ ] `getVisibleProducts(client, plan?)` → products visible to a given plan (member store)

### `src/queries/savage/passes.ts`
- [ ] `getPassesByUser(client, userId)` → `SavagePass[]`
- [ ] `getActivePasses(client, date)` → all active passes for a given date (admin: occupancy)

### `src/queries/savage/credits.ts`
- [ ] `getCreditBalance(client, userId, creditType)` → calls `savage_get_credit_balance` RPC
- [ ] `getCreditHistory(client, userId, creditType?)` → `SavageCredit[]` ordered by created_at DESC

### `src/queries/savage/leads.ts`
- [ ] `getLeads(client, filters?)` → filterable by status, date range (admin)
- [ ] `getLeadsByStatus(client, status)` → `SavageLead[]` (admin)
- [ ] `getUpcomingTrials(client)` → leads with trial_date >= today (admin)

### `src/queries/savage/stats.ts`
- [ ] `getMonthlyStats(client, months?)` → last N months of stats (admin)
- [ ] `getDailyStats(client, dateRange)` → daily stats for range (admin)

### Barrel Exports
- [ ] `src/queries/savage/index.ts` — re-export all query files

### Verify
- [ ] Build passes
- [ ] All savage queries importable from root

---

## Phase 7: `@nic/api-client` — Savage Mutations

### `src/mutations/savage/bookings.ts`
- [ ] `createBooking(client, input)` → insert booking, return created row or error
- [ ] `cancelBooking(client, bookingId, reason?)` → set status cancelled, cancelled_at, cancel_reason
- [ ] `checkInBooking(client, bookingId)` → set status checked_in, checked_in_at

### `src/mutations/savage/passes.ts`
- [ ] `createPass(client, input)` → insert pass with pending_payment status
- [ ] `activatePass(client, passId)` → set status active (called after payment)

### `src/mutations/savage/leads.ts`
- [ ] `createLead(client, input)` → insert lead
- [ ] `updateLeadStatus(client, leadId, status, notes?)` → update status + admin_notes
- [ ] `convertLead(client, leadId, userId)` → set status converted, converted_user_id

### `src/mutations/savage/members.ts`
- [ ] `updateMember(client, memberId, data)` → admin update (plan, status, notes, desk assignment, nuki, alarm)
- [ ] `pauseMember(client, memberId)` → set status paused, paused_at
- [ ] `cancelMember(client, memberId)` → set cancel_requested_at (7-day notice starts)

### Barrel Exports
- [ ] `src/mutations/savage/index.ts`
- [ ] Update `src/mutations/index.ts`
- [ ] Update `src/index.ts`

### Verify
- [ ] Build passes
- [ ] All mutations importable from root

---

## Phase 8: `@nic/perks-sdk`

**Prerequisite**: Phase 3 complete (shared-types available). No dependency on api-client.

### Dependencies
- [ ] Add `@nic/shared-types` as dependency (file reference)

### Types
- [ ] `src/types.ts`:
  - [ ] `Perk` interface (id, sourceApp, targetApp, name, description, discountType, discountValue, conditions)
  - [ ] `PerkConditions` interface (minPlan?, activeMemberOnly?, maxRedemptions?)
  - [ ] `PerkEligibility` interface (eligible, perk, reason?)
  - [ ] `UserMembership` interface (app, plan, status) — input format

### Engine
- [ ] `src/engine.ts`:
  - [ ] `PERKS` const array — v1 hardcoded perk definitions:
    - [ ] Savage → Musa: 10% off all drinks (active member)
    - [ ] Add placeholder comment for future perks
  - [ ] `getAvailablePerks(targetApp, userMemberships)` → `PerkEligibility[]`
  - [ ] `checkEligibility(perk, memberships)` → `PerkEligibility` (internal)
  - [ ] `calculateDiscount(perk, originalPrice)` → discounted price in cents

### Barrel Export
- [ ] `src/index.ts` — export types + engine functions

### Verify
- [ ] Build passes
- [ ] Unit test: active Savage member → eligible for Musa discount
- [ ] Unit test: no membership → not eligible
- [ ] Unit test: cancelled member → not eligible
- [ ] `calculateDiscount` returns correct amounts for percentage, fixed, freebie

---

## Phase 9: `@nic/shared-ui` — Setup

**Prerequisite**: Phase 3 complete (shared-types available).

### Dependencies
- [ ] Add `@nic/shared-types` as dependency (file reference)
- [ ] Add `react`, `react-dom` as peer dependencies
- [ ] Add `typescript` as dev dependency
- [ ] Update `tsconfig.json`: add `"jsx": "react-jsx"` to compilerOptions

### Barrel Export
- [ ] `src/index.ts` — empty for now, will re-export components
- [ ] `src/components/index.ts`

### Verify
- [ ] Build passes (empty but valid)

---

## Phase 10: `@nic/shared-ui` — Auth Components

### `src/components/auth/login-form.tsx`
- [ ] Props: `onSubmit(email) → Promise<{ error?: string }>`, `appName`, `appLogo?`
- [ ] Email input with basic validation
- [ ] Submit button with loading state
- [ ] Error display
- [ ] Uses `'use client'` directive
- [ ] Does NOT import Supabase or any app-specific code — callback only
- [ ] Note: uses shadcn primitives (Button, Input, Label) — resolved by consuming app

### `src/components/auth/magic-link-sent.tsx`
- [ ] Props: `email`, `appName`, `onResend?`
- [ ] "Check your email" message with the email displayed
- [ ] Optional resend button with cooldown timer
- [ ] Uses `'use client'` directive

### Barrel Exports
- [ ] `src/components/auth/index.ts`
- [ ] Update `src/components/index.ts`
- [ ] Update `src/index.ts`

### Verify
- [ ] Build passes
- [ ] Components importable: `import { LoginForm, MagicLinkSent } from '@nic/shared-ui'`

---

## Phase 11: `@nic/shared-ui` — Profile Components

### `src/components/profile/profile-form.tsx`
- [ ] Props: `profile: SharedProfile`, `onSubmit(data) → Promise<{ error?: string }>`, `loading?`
- [ ] Fields: full_name, phone, preferred_lang (en/es select)
- [ ] Uses `'use client'` directive
- [ ] Does NOT handle avatar upload (app-specific, involves Storage)

### `src/components/profile/fiscal-id-form.tsx`
- [ ] Props: `profile: SharedProfile`, `onSubmit(data) → Promise<{ error?: string }>`, `loading?`
- [ ] Fields: fiscal_id_type (select), fiscal_id (text), billing address fields
- [ ] Country defaults to 'ES'
- [ ] Note: validation (NIF/NIE regex) lives in the consuming app's server action, not here

### Barrel Exports
- [ ] `src/components/profile/index.ts`
- [ ] Update `src/components/index.ts`

### Verify
- [ ] Build passes

---

## Phase 12: `@nic/shared-ui` — Perks Badge

### `src/components/perks/perks-badge.tsx`
- [ ] Props: `perks: PerkEligibility[]` (from perks-sdk), `compact?`
- [ ] Shows active perks as badge/chips
- [ ] Compact mode: just an icon + count
- [ ] Full mode: list with perk name + discount description
- [ ] Uses `'use client'` directive

### Barrel Exports
- [ ] `src/components/perks/index.ts`
- [ ] Update `src/components/index.ts`

### Verify
- [ ] Build passes
- [ ] Full workspace build: `npm run build` from root passes

---

## Phase 13: Integration Verification

- [ ] Full workspace build: `npm run build` — all 4 packages compile
- [ ] Full workspace type-check: `npm run type-check` — zero errors
- [ ] Test import chain in savage-web:
  - [ ] Add `file:` references to savage-web `package.json` for all 4 packages
  - [ ] `npm install` in savage-web
  - [ ] Create test file that imports from each package — verify types resolve
- [ ] Verify dependency graph is correct:
  - [ ] `shared-types` has zero runtime dependencies
  - [ ] `api-client` depends only on `shared-types` + `@supabase/supabase-js`
  - [ ] `perks-sdk` depends only on `shared-types`
  - [ ] `shared-ui` depends only on `shared-types` + react (peer)

---

## Dependencies

| Phase | Depends On | Blocks |
|-------|-----------|--------|
| 0 — Setup | — | Everything |
| 1 — DB Types | nic-supabase Phases 1–9 | Phases 2–8 |
| 2 — Shared Types | Phase 1 | Phases 4–7 (api-client needs types) |
| 3 — Savage Types | Phase 1 | Phases 4–8 |
| 4 — API Client Setup | Phases 2, 3 | Phases 5–7 |
| 5 — Shared Queries | Phase 4 | savage-web |
| 6 — Savage Queries | Phase 4 | savage-web |
| 7 — Savage Mutations | Phase 4 | savage-web |
| 8 — Perks SDK | Phase 3 | Phase 12 (perks badge), savage-web |
| 9 — Shared UI Setup | Phase 3 | Phases 10–12 |
| 10 — Auth Components | Phase 9 | savage-web auth flow |
| 11 — Profile Components | Phase 9 | savage-web profile pages |
| 12 — Perks Badge | Phases 8, 9 | savage-web perks display |
| 13 — Integration | Phases 1–12 | savage-web full development |

---

## Cross-Repo Dependencies

```
nic-supabase (Phases 1–9)
    ↓ generates database.ts
nic-shared Phase 1 (this repo)
    ↓ types available
nic-shared Phases 2–12 (this repo)
    ↓ packages ready
savage-web (can begin)
```

**Key blocker**: nic-shared cannot meaningfully start until nic-supabase has a working schema and generated types. Phase 0 (repo setup + scaffolding) can happen anytime, but Phase 1 needs `database.ts`.

---

## Notes

- **Phases 2–3 are the foundation.** Get the type helpers right — every query, mutation, and component downstream depends on them. Spend time here.
- **Phases 5–7 (api-client queries/mutations) will grow** as savage-web development reveals needed queries. Start with the documented set, add more as features require them.
- **shared-ui is intentionally minimal.** Resist the urge to move app-specific components here. If only Savage uses it, it stays in savage-web.
- **perks-sdk (Phase 8) is independent** of api-client. It can be built in parallel with Phases 5–7 if needed.
- **shadcn/ui resolution**: shared-ui imports `Button`, `Input`, etc. from paths the consuming app resolves. This means shared-ui components can't be tested in isolation without a host app. Consider adding a simple test harness later if needed.
