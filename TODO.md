# nic-shared — Implementation Todo

## Phase 0: Repo Setup ✅

- [x] Create GitHub repo `Kikolator/nic-shared` (private)
- [x] Initialize workspace root:
  - [x] `package.json` with `"workspaces": ["packages/*"]`
  - [x] `tsconfig.base.json` (strict, ES2022, ESNext, bundler resolution, declarations)
  - [x] `.gitignore` (node_modules, dist, .env)
- [x] Create package scaffolds (empty `src/index.ts` + `package.json` + `tsconfig.json`):
  - [x] `packages/shared-types/` — `@nic/shared-types`
  - [x] `packages/api-client/` — `@nic/api-client`
  - [x] `packages/shared-ui/` — `@nic/shared-ui`
  - [x] `packages/perks-sdk/` — `@nic/perks-sdk`
- [x] `npm install` at root — verify workspaces resolve
- [x] `npm run build` — verify all packages compile (empty but valid)
- [x] Create `CLAUDE.md` (project file — already written)
- [x] Create `README.md` (human-readable setup guide)
- [x] Initial commit + push

---

## Phase 1: `@nic/shared-types` — Database Types ✅

**Prerequisite**: nic-supabase Phases 1–9 complete (schema + seed exist, types can be generated).

### Auto-Generated Types
- [x] Copy `database.ts` from nic-supabase type generation output into `packages/shared-types/src/database.ts`
- [x] Add `// AUTO-GENERATED — DO NOT EDIT` header comment
- [x] Verify it exports `Database` type with all tables and enums

### Verify
- [x] `npm run type-check --workspace=packages/shared-types` passes
- [x] `npm run build --workspace=packages/shared-types` produces `dist/`

---

## Phase 2: `@nic/shared-types` — Shared Type Helpers ✅

### `src/shared/profiles.ts`
- [x] `SharedProfile` — Row type
- [x] `SharedProfileInsert`, `SharedProfileUpdate` — Insert/Update types
- [x] `FiscalIdType` — enum type
- [x] `hasCompleteFiscalId(profile)` — type guard: fiscal_id_type + fiscal_id + billing address all present

### `src/shared/admins.ts`
- [x] `SharedAdmin` — Row type
- [x] `AppType` — enum type
- [x] `isAdminOf(admins, app)` — checks if user has admin role for given app

### `src/shared/perks.ts`
- [x] `SharedPerk` — Row type
- [x] `SharedPerkRedemption` — Row type
- [x] `DiscountType` — union type ('percentage' | 'fixed' | 'freebie')

### Barrel Exports
- [x] `src/shared/index.ts` — re-export all shared types
- [x] `src/index.ts` — re-export `shared/` + `Database`

### Verify
- [x] Build passes, all types accessible from root import

---

## Phase 3: `@nic/shared-types` — Savage Type Helpers ✅

### `src/savage/members.ts`
- [x] `SavageMember`, `SavageMemberInsert`, `SavageMemberUpdate` — Row/Insert/Update
- [x] `SavagePlanType`, `SavageMemberStatus`, `SavageAccessLevel` — enum types
- [x] `SavageMemberWithProfile` — composite type (member + joined profile)
- [x] `isActiveMember(member)` — status === 'active'
- [x] `hasUnlimitedDesk(plan)` — nomad or all_star
- [x] `hasFixedDesk(plan)` — all_star only
- [x] `hasMeetingRoomAccess(plan)` — connector, explorer, nomad, all_star
- [x] `PLAN_ORDER` — const object for plan hierarchy (checkpoint=0, connector=1, explorer=2, nomad=3, all_star=4) — useful for upgrade/downgrade logic
- [x] `PLAN_LABELS` — const object for display names (all_star → "All-Star", etc.)

### `src/savage/bookings.ts`
- [x] `SavageBooking`, `SavageBookingInsert` — Row/Insert
- [x] `SavageBookingStatus` — enum type
- [x] `SavageRecurringRule` — Row type
- [x] `SavageRecurrencePattern` — enum type
- [x] `isActiveBooking(booking)` — status in (confirmed, checked_in)
- [x] `isCancellable(booking)` — status === 'confirmed' and start_time in future

### `src/savage/products.ts`
- [x] `SavageProduct` — Row type
- [x] `SavageProductCategory` — enum type
- [x] `formatPrice(priceCents)` — returns formatted string "€49.00"
- [x] `getPriceExVat(priceCents, ivaRate)` — calculates pre-tax amount
- [x] `isSubscriptionProduct(product)` — category === 'subscription'

### `src/savage/resources.ts`
- [x] `SavageResource` — Row type
- [x] `SavageResourceType`, `SavageResourceStatus` — enum types
- [x] `isBookableResource(resource)` — status === 'available'
- [x] `RESOURCE_TYPE_LABELS` — const object for display names

### `src/savage/passes.ts`
- [x] `SavagePass` — Row type
- [x] `SavagePassType`, `SavagePassStatus` — enum types
- [x] `isActivePass(pass)` — status === 'active' and date within range

### `src/savage/credits.ts`
- [x] `SavageCredit` — Row type
- [x] `SavageCreditType`, `SavageCreditSource` — enum types
- [x] `formatMinutesAsHours(minutes)` — "4h 30min", "20h", etc.

### `src/savage/leads.ts`
- [x] `SavageLead` — Row type
- [x] `SavageLeadStatus` — enum types
- [x] `LEAD_STATUS_LABELS` — const object for display names
- [x] `isConvertibleLead(lead)` — status in (new, confirmed, completed, follow_up)

### Barrel Exports
- [x] `src/savage/index.ts` — re-export all savage types
- [x] Update `src/index.ts` — add savage re-export

### Verify
- [x] Build passes
- [x] All types importable: `import { SavageMember, SavagePlanType, isActiveMember } from '@nic/shared-types'`

---

## Phase 4: `@nic/api-client` — Setup + Client Factory ✅

**Prerequisite**: Phase 3 complete (shared-types has all Savage types).

### Dependencies
- [x] `npm install @supabase/supabase-js` in api-client package
- [x] Add `@nic/shared-types` as dependency (file reference: `"file:../shared-types"`)

### Client Factory
- [x] `src/client.ts` — `createApiClient(url, key)` returns typed `SupabaseClient<Database>`
- [x] Export `Client` type alias: `type Client = SupabaseClient<Database>`

### Barrel Export
- [x] `src/index.ts` — export client factory + Client type

### Verify
- [x] Build passes
- [x] Can create typed client in a test script

---

## Phase 5: `@nic/api-client` — Shared Queries & Mutations ✅

### `src/queries/shared/profiles.ts`
- [x] `getProfile(client, userId)` → `SharedProfile | null`
- [x] `getAdminStatus(client, userId, app)` → `boolean`
- [x] `getAdminApps(client, userId)` → `AppType[]` (which apps is user admin of)

### `src/mutations/shared/profiles.ts`
- [x] `updateProfile(client, userId, data)` → update name, phone, avatar, lang
- [x] `updateFiscalId(client, userId, data)` → update fiscal_id_type, fiscal_id, billing address fields

### Barrel Exports
- [x] `src/queries/shared/index.ts`
- [x] `src/mutations/shared/index.ts`
- [x] `src/queries/index.ts`
- [x] `src/mutations/index.ts`
- [x] Update `src/index.ts`

### Verify
- [x] Build passes
- [x] All query/mutation functions importable from root

---

## Phase 6: `@nic/api-client` — Savage Queries ✅

### `src/queries/savage/members.ts`
- [x] `getMemberByUserId(client, userId)` → `SavageMember | null`
- [x] `getMemberWithProfile(client, userId)` → `SavageMemberWithProfile | null`
- [x] `getActiveMembers(client)` → `SavageMember[]` (admin)
- [x] `getAllMembers(client, filters?)` → paginated, filterable by plan/status (admin)

### `src/queries/savage/bookings.ts`
- [x] `getBookingsByUser(client, userId, dateRange?)` → `SavageBooking[]`
- [x] `getBookingsByResource(client, resourceId, date)` → `SavageBooking[]`
- [x] `getUpcomingBookings(client, userId)` → confirmed bookings, start_time > now

### `src/queries/savage/resources.ts`
- [x] `getResources(client, type?)` → `SavageResource[]`, optionally filtered by type
- [x] `getDeskAvailability(client, date)` → calls `savage_get_desk_availability` RPC
- [x] `getRoomAvailability(client, resourceId, date)` → calls `savage_get_room_availability` RPC

### `src/queries/savage/products.ts`
- [x] `getProducts(client)` → all active products (admin)
- [x] `getVisibleProducts(client, plan?)` → products visible to a given plan (member store)

### `src/queries/savage/passes.ts`
- [x] `getPassesByUser(client, userId)` → `SavagePass[]`
- [x] `getActivePasses(client, date)` → all active passes for a given date (admin: occupancy)

### `src/queries/savage/credits.ts`
- [x] `getCreditBalance(client, userId, creditType)` → calls `savage_get_credit_balance` RPC
- [x] `getCreditHistory(client, userId, creditType?)` → `SavageCredit[]` ordered by created_at DESC

### `src/queries/savage/leads.ts`
- [x] `getLeads(client, filters?)` → filterable by status, date range (admin)
- [x] `getLeadsByStatus(client, status)` → `SavageLead[]` (admin)
- [x] `getUpcomingTrials(client)` → leads with trial_date >= today (admin)

### `src/queries/savage/stats.ts`
- [x] `getMonthlyStats(client, months?)` → last N months of stats (admin)
- [x] `getDailyStats(client, dateRange)` → daily stats for range (admin)

### Barrel Exports
- [x] `src/queries/savage/index.ts` — re-export all query files

### Verify
- [x] Build passes
- [x] All savage queries importable from root

---

## Phase 7: `@nic/api-client` — Savage Mutations ✅

### `src/mutations/savage/bookings.ts`
- [x] `createBooking(client, input)` → insert booking, return created row or error
- [x] `cancelBooking(client, bookingId, reason?)` → set status cancelled, cancelled_at, cancel_reason
- [x] `checkInBooking(client, bookingId)` → set status checked_in, checked_in_at

### `src/mutations/savage/passes.ts`
- [x] `createPass(client, input)` → insert pass with pending_payment status
- [x] `activatePass(client, passId)` → set status active (called after payment)

### `src/mutations/savage/leads.ts`
- [x] `createLead(client, input)` → insert lead
- [x] `updateLeadStatus(client, leadId, status, notes?)` → update status + admin_notes
- [x] `convertLead(client, leadId, userId)` → set status converted, converted_user_id

### `src/mutations/savage/members.ts`
- [x] `updateMember(client, memberId, data)` → admin update (plan, status, notes, desk assignment, nuki, alarm)
- [x] `pauseMember(client, memberId)` → set status paused, paused_at
- [x] `cancelMember(client, memberId)` → set cancel_requested_at (7-day notice starts)

### Barrel Exports
- [x] `src/mutations/savage/index.ts`
- [x] Update `src/mutations/index.ts`
- [x] Update `src/index.ts`

### Verify
- [x] Build passes
- [x] All mutations importable from root

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

## Phase 9: `@nic/shared-ui` — Setup ⏳

**Prerequisite**: Phase 3 complete (shared-types available).

### Dependencies
- [ ] Add `@nic/shared-types` as dependency (file reference)
- [x] Add `react`, `react-dom` as peer dependencies
- [x] Add `typescript` as dev dependency
- [x] Update `tsconfig.json`: add `"jsx": "react-jsx"` to compilerOptions

### Barrel Export
- [x] `src/index.ts` — empty for now, will re-export components
- [ ] `src/components/index.ts`

### Verify
- [x] Build passes (empty but valid)

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
