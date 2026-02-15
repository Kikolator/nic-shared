# nic-shared — Claude Project File

You are working on **nic-shared**, the shared packages repo for the Nic Ecosystem — a multi-app platform connecting Savage Coworking, Musa Coffee, and Listy in Estepona, Spain.

## What This Repo Is

This repo contains **shared TypeScript packages** consumed by all app repos (`savage-web`, `musa-web`, and future mobile apps). It exists so that types, API helpers, and cross-app logic live in one place — never duplicated across apps.

This repo does **NOT** contain:
- App-specific UI or pages → `savage-web`, `musa-web`
- Database migrations, RLS, or Edge Functions → `nic-supabase`
- Business logic that requires database access → `nic-supabase` (Postgres functions or Edge Functions)

## Repo Structure

```
nic-shared/
├── packages/
│   ├── shared-types/           # @nic/shared-types
│   │   ├── src/
│   │   │   ├── database.ts         # Auto-generated Supabase types (NEVER hand-edit)
│   │   │   ├── savage/
│   │   │   │   ├── members.ts      # Savage member type helpers + derivations
│   │   │   │   ├── bookings.ts     # Booking type helpers
│   │   │   │   ├── products.ts     # Product type helpers
│   │   │   │   ├── resources.ts    # Resource type helpers
│   │   │   │   ├── passes.ts       # Pass type helpers
│   │   │   │   ├── credits.ts      # Credit type helpers
│   │   │   │   ├── leads.ts        # Lead type helpers
│   │   │   │   └── index.ts        # Barrel export for savage/
│   │   │   ├── musa/
│   │   │   │   └── index.ts        # Barrel export (placeholder for now)
│   │   │   ├── shared/
│   │   │   │   ├── profiles.ts     # Profile type helpers
│   │   │   │   ├── admins.ts       # Admin type helpers
│   │   │   │   ├── perks.ts        # Perk type helpers
│   │   │   │   └── index.ts        # Barrel export for shared/
│   │   │   └── index.ts            # Root barrel export
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── api-client/             # @nic/api-client
│   │   ├── src/
│   │   │   ├── client.ts           # Typed Supabase client factory
│   │   │   ├── queries/
│   │   │   │   ├── savage/
│   │   │   │   │   ├── members.ts  # getMember, getMembers, getMemberByUserId
│   │   │   │   │   ├── bookings.ts # getBookings, getBookingsByResource
│   │   │   │   │   ├── resources.ts# getResources, getDeskAvailability
│   │   │   │   │   ├── products.ts # getProducts, getVisibleProducts
│   │   │   │   │   ├── passes.ts   # getPasses, getActivePasses
│   │   │   │   │   ├── credits.ts  # getCreditBalance
│   │   │   │   │   ├── leads.ts    # getLeads, getLeadsByStatus
│   │   │   │   │   ├── stats.ts    # getMonthlyStats, getDailyStats
│   │   │   │   │   └── index.ts
│   │   │   │   ├── shared/
│   │   │   │   │   ├── profiles.ts # getProfile, getAdminStatus
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── mutations/
│   │   │   │   ├── savage/
│   │   │   │   │   ├── bookings.ts # createBooking, cancelBooking
│   │   │   │   │   ├── passes.ts   # createPass
│   │   │   │   │   ├── leads.ts    # createLead, updateLeadStatus
│   │   │   │   │   ├── members.ts  # updateMember (admin)
│   │   │   │   │   └── index.ts
│   │   │   │   ├── shared/
│   │   │   │   │   ├── profiles.ts # updateProfile, updateFiscalId
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts            # Root barrel export
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── shared-ui/              # @nic/shared-ui
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── login-form.tsx
│   │   │   │   │   └── magic-link-sent.tsx
│   │   │   │   ├── profile/
│   │   │   │   │   ├── profile-form.tsx
│   │   │   │   │   └── fiscal-id-form.tsx
│   │   │   │   ├── perks/
│   │   │   │   │   └── perks-badge.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── perks-sdk/              # @nic/perks-sdk
│       ├── src/
│       │   ├── engine.ts           # Perk eligibility + calculation logic
│       │   ├── types.ts            # Perk types (independent of database.ts)
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
├── package.json                # Workspace root
├── tsconfig.base.json          # Shared TS config all packages extend
├── CLAUDE.md                   # This file
└── README.md
```

## Key Commands

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

## Package Details

---

### `@nic/shared-types`

**Purpose**: TypeScript types for the entire ecosystem. The single source of truth.

**Core file**: `database.ts` is auto-generated from the Supabase schema. Never edit it manually. All other files in this package derive helper types from it.

**Type generation flow**:
```
nic-supabase: schema change → migration → push
    ↓
supabase gen types typescript --local > packages/shared-types/src/database.ts
    ↓
Commit + push → apps get updated types on next install
```

**Pattern — deriving helper types from the generated database types**:

```typescript
// packages/shared-types/src/database.ts (auto-generated, DO NOT EDIT)
export type Database = {
  public: {
    Tables: {
      savage_members: {
        Row: { id: string; user_id: string; plan: string; status: string; /* ... */ };
        Insert: { /* ... */ };
        Update: { /* ... */ };
      };
      // ... all other tables
    };
    Enums: {
      savage_plan_type: 'checkpoint' | 'connector' | 'explorer' | 'nomad' | 'all_star';
      savage_member_status: 'active' | 'paused' | 'past_due' | 'cancelled' | 'churned';
      // ...
    };
  };
};
```

```typescript
// packages/shared-types/src/savage/members.ts
import type { Database } from '../database';

// Row types — what you get back from a SELECT
export type SavageMember = Database['public']['Tables']['savage_members']['Row'];
export type SavageMemberInsert = Database['public']['Tables']['savage_members']['Insert'];
export type SavageMemberUpdate = Database['public']['Tables']['savage_members']['Update'];

// Enum types — extracted for direct use
export type SavagePlanType = Database['public']['Enums']['savage_plan_type'];
export type SavageMemberStatus = Database['public']['Enums']['savage_member_status'];

// Derived types — for specific use cases
export type SavageMemberWithProfile = SavageMember & {
  profile: Database['public']['Tables']['shared_profiles']['Row'];
};

// Type guards
export function isActiveMember(member: SavageMember): boolean {
  return member.status === 'active';
}

export function hasUnlimitedDesk(plan: SavagePlanType): boolean {
  return plan === 'nomad' || plan === 'all_star';
}

export function hasFixedDesk(plan: SavagePlanType): boolean {
  return plan === 'all_star';
}
```

```typescript
// packages/shared-types/src/index.ts (root barrel export)
// Database types
export type { Database } from './database';

// Savage types
export * from './savage';

// Musa types (future)
export * from './musa';

// Shared types
export * from './shared';
```

**What belongs here**:
- Type aliases derived from `database.ts`
- Type guards and narrowing functions
- Const objects for enum values (for use in UI selects, filters)
- Composite types (e.g., `MemberWithProfile`)

**What does NOT belong here**:
- Runtime logic (validation, formatting, calculations)
- Zod schemas (those live in the consuming app)
- API calls or database queries
- React components

---

### `@nic/api-client`

**Purpose**: Typed query and mutation functions that wrap Supabase client calls. Used by both web and future mobile apps.

**Why this exists**: Without it, every app writes its own Supabase queries. This leads to drift — `savage-web` queries members one way, `savage-mobile` queries them differently. The api-client ensures one query definition, reused everywhere.

**Pattern — query functions**:

```typescript
// packages/api-client/src/queries/savage/members.ts
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database, SavageMember, SavageMemberWithProfile } from '@nic/shared-types';

type Client = SupabaseClient<Database>;

export async function getMemberByUserId(
  client: Client,
  userId: string
): Promise<SavageMember | null> {
  const { data, error } = await client
    .from('savage_members')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) return null;
  return data;
}

export async function getMemberWithProfile(
  client: Client,
  userId: string
): Promise<SavageMemberWithProfile | null> {
  const { data, error } = await client
    .from('savage_members')
    .select('*, profile:shared_profiles(*)')
    .eq('user_id', userId)
    .single();

  if (error) return null;
  return data as SavageMemberWithProfile;
}

export async function getActiveMembers(
  client: Client
): Promise<SavageMember[]> {
  const { data } = await client
    .from('savage_members')
    .select('*')
    .eq('status', 'active')
    .order('joined_at', { ascending: false });

  return data ?? [];
}
```

**Pattern — mutation functions**:

```typescript
// packages/api-client/src/mutations/savage/bookings.ts
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database, SavageBooking } from '@nic/shared-types';

type Client = SupabaseClient<Database>;

interface CreateBookingInput {
  userId: string;
  resourceId: string;
  startTime: string;
  endTime: string;
}

export async function createBooking(
  client: Client,
  input: CreateBookingInput
): Promise<{ data: SavageBooking | null; error: string | null }> {
  const { data, error } = await client
    .from('savage_bookings')
    .insert({
      user_id: input.userId,
      resource_id: input.resourceId,
      start_time: input.startTime,
      end_time: input.endTime,
      status: 'confirmed',
    })
    .select()
    .single();

  return {
    data,
    error: error?.message ?? null,
  };
}
```

**Client factory**:

```typescript
// packages/api-client/src/client.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@nic/shared-types';

// For use in environments without framework-specific helpers
// (e.g., scripts, Edge Functions, React Native)
export function createApiClient(url: string, key: string) {
  return createSupabaseClient<Database>(url, key);
}
```

**How apps consume it**:

```typescript
// In savage-web Server Component:
import { createClient } from '@/lib/supabase/server';
import { getMemberByUserId } from '@nic/api-client';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const member = await getMemberByUserId(supabase, user!.id);
  // ...
}

// In savage-web Client Component with TanStack Query:
import { createClient } from '@/lib/supabase/client';
import { getActiveMembers } from '@nic/api-client';
import { useQuery } from '@tanstack/react-query';

export function MemberList() {
  const supabase = createClient();
  const { data: members } = useQuery({
    queryKey: ['members', 'active'],
    queryFn: () => getActiveMembers(supabase),
  });
  // ...
}
```

**What belongs here**:
- Typed Supabase queries (SELECT)
- Typed Supabase mutations (INSERT, UPDATE, DELETE)
- RPC wrappers (calling Postgres functions)
- Client factory for non-framework environments

**What does NOT belong here**:
- Auth logic (that's Supabase Auth, handled by the app)
- Stripe logic (app-specific, involves server secrets)
- React hooks (those wrap api-client calls in the app)
- Validation logic (Zod schemas live in the app)

---

### `@nic/shared-ui`

**Purpose**: Cross-app React components that look and behave the same in Savage and Musa.

**Scope is intentionally small.** Most UI is app-specific (booking calendar is Savage-only, menu is Musa-only). Only truly shared components live here.

**Current components**:

| Component | Used By | Purpose |
|-----------|---------|---------|
| `LoginForm` | Savage, Musa | Email input + magic link trigger |
| `MagicLinkSent` | Savage, Musa | "Check your email" confirmation |
| `ProfileForm` | Savage, Musa | Edit name, phone, language |
| `FiscalIdForm` | Savage, Musa | NIF/NIE/Passport + billing address |
| `PerksBadge` | Savage, Musa | Shows active perks from other businesses |

**Pattern**:

```typescript
// packages/shared-ui/src/components/auth/login-form.tsx
'use client';

import { useState } from 'react';

interface LoginFormProps {
  onSubmit: (email: string) => Promise<{ error?: string }>;
  appName: string;        // "Savage Coworking" or "Musa Coffee"
  appLogo?: string;       // App-specific branding
}

export function LoginForm({ onSubmit, appName, appLogo }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const result = await onSubmit(email);
    if (result.error) setError(result.error);
    setLoading(false);
  }

  return (
    // UI using shadcn primitives — app passes its own branding via props
  );
}
```

**Important**: shared-ui components accept **callbacks and config via props**. They never import app-specific code, Supabase clients, or Server Actions. The consuming app wires them up.

**Dependency**: shared-ui depends on shadcn/ui primitives. Apps must have shadcn/ui installed. shared-ui does NOT bundle shadcn — it imports from `@/components/ui/*` which the app resolves.

**What belongs here**:
- Auth flow components (login, verify, magic link)
- Profile components (edit profile, fiscal ID)
- Perks display components
- Any component that would otherwise be copy-pasted between Savage and Musa

**What does NOT belong here**:
- App-specific UI (booking calendar, coffee menu, admin dashboards)
- shadcn/ui primitives themselves (each app installs its own)
- Components that need app-specific data fetching
- Layout components (each app has its own nav, sidebar, branding)

---

### `@nic/perks-sdk`

**Purpose**: Calculate perk eligibility and discounts across businesses. The cross-business differentiator of the Nic Ecosystem.

**v1 (MVP) — hardcoded rules**:

```typescript
// packages/perks-sdk/src/types.ts
export interface Perk {
  id: string;
  sourceApp: 'savage' | 'musa' | 'listy';
  targetApp: 'savage' | 'musa' | 'listy';
  name: string;
  description: string;
  discountType: 'percentage' | 'fixed' | 'freebie';
  discountValue: number;
  conditions: PerkConditions;
}

export interface PerkConditions {
  minPlan?: string;           // Minimum plan required (e.g., 'explorer')
  activeMemberOnly?: boolean; // Must have active subscription
  maxRedemptions?: number;    // Per billing cycle
}

export interface PerkEligibility {
  eligible: boolean;
  perk: Perk;
  reason?: string;            // Why not eligible
}
```

```typescript
// packages/perks-sdk/src/engine.ts
import type { Perk, PerkEligibility, PerkConditions } from './types';

// v1: hardcoded perk definitions
const PERKS: Perk[] = [
  {
    id: 'savage-musa-member-discount',
    sourceApp: 'savage',
    targetApp: 'musa',
    name: '10% off at Musa',
    description: 'Savage members get 10% off all drinks at Musa Coffee',
    discountType: 'percentage',
    discountValue: 10,
    conditions: {
      activeMemberOnly: true,
    },
  },
  // Add more perks as needed
];

export function getAvailablePerks(
  targetApp: 'savage' | 'musa' | 'listy',
  userMemberships: { app: string; plan: string; status: string }[]
): PerkEligibility[] {
  return PERKS
    .filter(perk => perk.targetApp === targetApp)
    .map(perk => checkEligibility(perk, userMemberships));
}

function checkEligibility(
  perk: Perk,
  memberships: { app: string; plan: string; status: string }[]
): PerkEligibility {
  const sourceMembership = memberships.find(m => m.app === perk.sourceApp);

  if (!sourceMembership) {
    return { eligible: false, perk, reason: `No ${perk.sourceApp} membership` };
  }

  if (perk.conditions.activeMemberOnly && sourceMembership.status !== 'active') {
    return { eligible: false, perk, reason: 'Membership not active' };
  }

  return { eligible: true, perk };
}
```

**v2 (Future)**: Replace hardcoded `PERKS` array with database queries to `shared_perks` table. Add admin UI for configuring perks. Add redemption tracking.

**What belongs here**:
- Perk eligibility calculation
- Discount application logic
- Perk type definitions

**What does NOT belong here**:
- Database queries (the consuming app fetches membership data and passes it in)
- UI components (those go in shared-ui or app-specific)
- Stripe discount logic (that's handled in checkout flow)

---

## Package Configuration

### Workspace Root (`package.json`)

```json
{
  "name": "nic-shared",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "npm run build --workspaces",
    "type-check": "npm run type-check --workspaces"
  }
}
```

### Shared TypeScript Config (`tsconfig.base.json`)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": "src"
  }
}
```

### Per-Package (`tsconfig.json`)

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

### Per-Package (`package.json` example for shared-types)

```json
{
  "name": "@nic/shared-types",
  "version": "0.1.0",
  "private": true,
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.6.0"
  }
}
```

---

## How Apps Consume These Packages

### Option A: GitHub References (Production)

```json
// In savage-web/package.json
{
  "dependencies": {
    "@nic/shared-types": "github:Kikolator/nic-shared#main&path=packages/shared-types",
    "@nic/api-client": "github:Kikolator/nic-shared#main&path=packages/api-client",
    "@nic/shared-ui": "github:Kikolator/nic-shared#main&path=packages/shared-ui",
    "@nic/perks-sdk": "github:Kikolator/nic-shared#main&path=packages/perks-sdk"
  }
}
```

### Option B: npm link (Local Development)

```bash
# In nic-shared/packages/shared-types
npm link

# In savage-web
npm link @nic/shared-types
```

### Option C: File References (Simplest for Solo Dev)

```json
// In savage-web/package.json
{
  "dependencies": {
    "@nic/shared-types": "file:../nic-shared/packages/shared-types",
    "@nic/api-client": "file:../nic-shared/packages/api-client"
  }
}
```

**Recommendation**: Start with Option C (`file:` references) during active development. Switch to Option A (GitHub refs) once packages stabilize. Option C gives you instant feedback on type changes without needing to commit/push.

---

## What NOT To Do

- **Never hand-edit `database.ts`** — always regenerate from Supabase schema
- **Never put app-specific logic in shared packages** — if only Savage uses it, it belongs in `savage-web`
- **Never import from app repos** — shared packages depend on nothing except each other and external libraries
- **Never add React to shared-types or api-client** — only shared-ui has React as a dependency
- **Never add Supabase client creation to api-client** — it accepts a client as a parameter, the app creates it
- **Never duplicate types** — if it's in `database.ts`, derive from it. Don't redefine.
- **Never skip barrel exports** — every directory gets an `index.ts` that re-exports its contents
- **Never put validation (Zod) in shared-types** — types are pure TypeScript. Validation lives in the consuming app.
- **Never put secrets or env vars in shared packages** — they're environment-agnostic

---

## Dependency Graph

```
@nic/shared-types    (zero dependencies — pure types)
    ↑
@nic/api-client      (depends on: shared-types, @supabase/supabase-js)
    ↑
@nic/shared-ui       (depends on: shared-types, react, shadcn peer deps)
    ↑
@nic/perks-sdk       (depends on: shared-types only)

App repos (savage-web, musa-web)
    ↑ consume all four packages
```

`shared-types` is the foundation. If it breaks, everything breaks. Treat it with care — regenerate types after every schema change, verify the build passes, then update consuming apps.
