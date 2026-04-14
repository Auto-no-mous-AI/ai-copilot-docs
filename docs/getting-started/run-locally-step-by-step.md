# Run locally step by step

This is the practical developer runbook for understanding the implementation by running it on your own machine.

All commands below are run from:

`C:\Users\aparekh\Desktop\Projects\ai-copilot-workspace\ai-copilot-platform`

## 1. Prerequisites

Install and verify:

- Node.js 20.x
- pnpm 8.x
- Docker Desktop
- WSL on Windows if Docker Desktop depends on it
- PowerShell

Optional but useful:

- `gh` for GitHub automation
- a real provider key such as `OPENAI_API_KEY` if you want live model responses instead of fallback behavior

## 2. Understand the two environment models

### Minimal local mode

You run infra and apps separately:

- `pnpm db:up`
- `pnpm dev:api`
- `pnpm dev:worker`
- `pnpm dev:admin`
- `pnpm dev:marketing`

This is best for day-to-day development.

### First environment mode

You use the bootstrap scripts:

```powershell
pnpm env:first
pnpm deploy:first:up
pnpm seed:first:demo
pnpm smoke:first:env
pnpm smoke:first:ui
pnpm smoke:first:ui:approvals
```

This is best for onboarding, demos, and end-to-end validation.

For most new developers, start with first environment mode.

## 2b. Understand the companion repo validation flow

After the main platform is healthy, validate the sibling repositories from:

`C:\Users\aparekh\Desktop\Projects\ai-copilot-workspace-hub`

Use:

```bash
npm install
npm run smoke:workspace
```

This checks:

- web SDK build and lint
- React SDK build and lint
- Angular SDK build and lint
- examples bootstrap and example builds
- standalone marketing site build

## 3. Install dependencies

From the platform root:

```powershell
pnpm install
```

This installs workspace dependencies for:

- `apps/admin-portal`
- `apps/marketing-web`
- `services/api`
- `services/ingestion-worker`
- `packages/*`

## 4. Generate the local first-environment file

Run:

```powershell
pnpm env:first
```

This generates:

- `.env.first.local`
- `.runtime/keycloak/realm-import.local.json`

Important generated defaults:

- `DEV_LOGIN_ENABLED=false`
- OIDC enabled through local Keycloak
- demo email `owner@local.autonomous.ai`
- demo password `Copilot123!`
- readiness checks include Redis

## 5. Start the full local environment

Run:

```powershell
pnpm deploy:first:up
```

What this script does:

1. loads `.env.first.local`
2. starts Docker Compose services
3. waits for PostgreSQL readiness
4. runs SQL migrations through `services/api/scripts/run-migrations.mjs`
5. syncs the Keycloak client
6. waits for `GET /api/health/ready` to return `200`

If you intentionally want fresh image pulls and rebuilds:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-first-env.ps1 -RefreshImages
```

## 6. Seed the demo tenant

Run:

```powershell
pnpm seed:first:demo
```

This creates:

- organization: `Auto-no-mous AI Demo`
- applications:
  - `Supplier Portal Copilot`
  - `Procurement Operations Copilot`
  - `Claims Review Copilot`

It also seeds:

- org members and roles
- environments
- copilot config
- sources
- ingestion jobs
- documents and chunks
- usage events
- audit logs
- conversations
- approvals
- agent runs and steps

## 7. Validate the stack

Run the smoke checks in this order:

```powershell
pnpm smoke:first:env
pnpm smoke:first:ui
pnpm smoke:first:ui:approvals
```

What they validate:

### `pnpm smoke:first:env`

- API readiness
- admin portal is reachable
- marketing site is reachable
- Keycloak discovery works
- OIDC login creates a session
- seeded applications are visible to the signed-in user

### `pnpm smoke:first:ui`

- SSO login through the admin portal
- application list loads
- usage page loads
- ingestion page loads
- audit page loads
- conversations page and approval queue load

### `pnpm smoke:first:ui:approvals`

- creates fresh API keys
- creates fresh TEST and AGENT approvals through the chat API
- opens the admin conversations UI
- approves one request
- rejects one request
- verifies the status transitions through the API

## 8. Open the main local URLs

After a successful bootstrap, use:

- admin portal: `http://127.0.0.1:4200`
- API base: `http://127.0.0.1:3000/api`
- marketing site: `http://127.0.0.1:4300`
- Keycloak: `http://127.0.0.1:8080`
- Prometheus: `http://127.0.0.1:9090`
- MinIO console: `http://127.0.0.1:9001`

## 9. Sign in to the admin portal

Open:

`http://127.0.0.1:4200`

Use:

- email: `owner@local.autonomous.ai`
- password: `Copilot123!`

Expected behavior:

1. click `Continue with SSO`
2. Keycloak login page opens
3. after successful sign-in you land on `/apps`
4. the three seeded demo applications are visible

## 10. Verify each major admin area

Use the walkthrough in [Local demo walkthrough](local-demo-walkthrough.md).

That chapter explains what each seeded application is meant to demonstrate and what data you should expect to see on each page.

## 11. Exercise the embed flow

There are two common ways to validate the widget.

### Admin install page

For any application:

1. open the app
2. go to `Install`
3. generate an install token
4. inspect the returned script snippet and npm snippet

### Demo shell

The platform repo includes:

`demo/tenant-shell.html`

Use it to validate:

- install token flow
- widget theming
- floating button behavior
- resizable drawer behavior
- TEST and AGENT approval flow

## 12. Common developer commands

### Build

```powershell
pnpm --dir services/api build
pnpm --dir services/ingestion-worker build
pnpm --dir apps/admin-portal build
pnpm --dir apps/marketing-web build
pnpm build:sdk
```

### Bring the first environment down

```powershell
pnpm deploy:first:down
```

### Minimal local development

```powershell
pnpm db:up
pnpm dev:api
pnpm dev:worker
pnpm dev:admin
pnpm dev:marketing
```

## 13. Troubleshooting

### Port already in use

If `4200`, `4300`, or `3000` is already busy, stop the conflicting local process first. The platform bootstrap expects the default ports unless you deliberately reconfigure them.

### Docker Desktop does not start

On Windows, confirm WSL is installed and Docker Desktop can access it.

### OIDC login fails

Check:

- Keycloak is running on `127.0.0.1:8080`
- `.env.first.local` exists
- `OIDC_ISSUER_URL` and `OIDC_REDIRECT_URI` match the generated local settings

### Readiness check fails

Check:

- Postgres container is healthy
- Redis container is healthy
- migrations completed
- API logs show successful startup on `0.0.0.0:3000`

### Smoke tests fail because applications are missing

Run:

```powershell
pnpm seed:first:demo
```

again, then rerun the smoke tests.

## 14. Validate the wider workspace

Once the platform repo is healthy, validate the companion repos too.

From `ai-copilot-workspace-hub`:

```bash
npm install
npm run smoke:workspace
```

If you are working on SDK, examples, or standalone marketing changes, this cross-repo smoke is part of the expected developer workflow.
