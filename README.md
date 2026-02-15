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
