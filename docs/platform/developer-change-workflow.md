# Developer change workflow

This chapter explains where developers should make changes in the workspace depending on the feature they are working on.

## Rule one: start in `ai-copilot-platform`

Today, almost all real implementation changes belong in `ai-copilot-platform`.

Do not start by editing the scaffold repositories unless the work has explicitly been extracted there.

## Quick decision guide

### I need to change the admin UI

Go to:

- `apps/admin-portal/src/app/pages`
- `apps/admin-portal/src/app/core`
- `apps/admin-portal/src/app/components`

Typical examples:

- onboarding pages
- app configuration forms
- usage and ingestion screens
- approval queue UI
- auth guard and session flows

### I need to change the marketing site

Go to:

- `apps/marketing-web/src/app`
- `apps/marketing-web/src/styles.scss`

Typical examples:

- landing pages
- pricing and security pages
- public CTA flow

### I need to change the HTTP API

Go to:

- `services/api/src`

Typical modules:

- `auth`
- `onboarding`
- `apps`
- `settings`
- `chat`
- `embed`
- `health`
- `monitoring`
- `llm`
- `platform-state`

Typical examples:

- route handlers
- access control
- response contracts
- audit logging
- model routing
- chat and approval logic

### I need to change database behavior

Go to:

- `services/api/db/migrations`
- `services/api/src/platform-state/platform.repository.ts`
- `services/api/src/platform-state/types.ts`

Typical examples:

- adding tables or columns
- adjusting query behavior
- changing usage aggregation or approval queries

### I need to change ingestion behavior

Go to:

- `services/ingestion-worker/src`
- queue-related pieces under `services/api/src/queue`

Typical examples:

- crawler logic
- parsing logic
- job processing
- queue payloads and retry behavior

### I need to change SDK behavior

Go to:

- `packages/shared`
- `packages/web-sdk`
- `packages/react-sdk`
- `packages/angular-sdk`

Typical examples:

- loader initialization
- chat client behavior
- framework wrappers
- widget bootstrap contract

### I need to change deployment or smoke automation

Go to:

- `scripts/`
- `.github/workflows/`
- `infra/`

Typical examples:

- first environment bootstrap
- demo tenant seeding
- smoke tests
- staging automation
- Docker or Kubernetes assets

## Recommended implementation flow

For most changes, use this sequence.

### 1. Identify the user-facing outcome

Examples:

- new admin form field
- new API response field
- new approval behavior
- new SDK initialization option

### 2. Find the vertical slice

Trace the feature through:

- UI page or SDK entry point
- API controller and service logic
- repository and database layer
- smoke tests or seed data if needed

### 3. Update the right layers together

For a typical feature, this often means touching more than one place.

Example: adding a new configuration option

1. admin UI form
2. API DTO/controller handling
3. repository save and load behavior
4. seed data or smoke tests if the flow depends on it
5. docs

### 4. Validate locally

Use the smallest useful validation first.

Examples:

- `pnpm --dir services/api build`
- `pnpm --dir apps/admin-portal build`
- `pnpm smoke:first:env`
- `pnpm smoke:first:ui`
- `pnpm smoke:first:ui:approvals`

### 5. Update docs when the contract changes

Update `ai-copilot-docs` whenever you change:

- routes
- environment variables
- seeded demo behavior
- onboarding flow
- install snippets
- staging automation

## Suggested file-by-file navigation

### Admin screens

Look under:

- `apps/admin-portal/src/app/pages`

Each page roughly maps to one route or one operational area.

### Shared admin concerns

Look under:

- `apps/admin-portal/src/app/core`

Typical examples:

- auth guard
- API access helpers
- app-level services

### API modules

Look under:

- `services/api/src/*/*.controller.ts`
- `services/api/src/*/*.module.ts`
- `services/api/src/*/*.service.ts`

Use the controller to find the route, then trace into repository and service code.

### Repository layer

Most persistence and query logic is centralized in:

- `services/api/src/platform-state/platform.repository.ts`

This is one of the most important files in the whole product.

### Smoke tests

Look under:

- `scripts/smoke-first-env.mjs`
- `scripts/playwright-smoke.mjs`
- `scripts/playwright-approval-smoke.mjs`

When you change a critical user flow, consider whether one of these should change too.

## When to touch the seed data

Update `scripts/seed-demo-tenant.mjs` when:

- a page depends on new seeded data to render meaningfully
- you need new demo scenarios for onboarding
- smoke tests need deterministic data

Do not treat the seed script as disposable. It is now part of the developer experience.

## When to touch staging automation

Update staging automation when you change:

- smoke entrypoints
- workflow file names
- required environment variables
- deploy command or webhook contract

Relevant files:

- `.github/workflows/staging-deploy.yml`
- `.github/workflows/staging-smoke.yml`
- `scripts/configure-github-staging.mjs`

## Checklist before merging a meaningful change

1. code builds in the touched workspace
2. affected smoke tests still pass
3. seed data still supports the walkthrough
4. docs are updated if the behavior changed
5. staging automation is updated if environment or deploy expectations changed
