# Local setup & first environment

This chapter summarizes how developers run the full stack. Authoritative step-by-step detail also exists in **`ai-copilot-platform`** (`README.md`, `docs/get-started.md`, `docs/deployment-guide.md`).

## Prerequisites

- **Node.js** 20.x
- **pnpm** 8.x (version pinned in platform `package.json` as `packageManager`)
- **Docker** (for Postgres, Redis, Keycloak, etc. in the bundled environment)
- **PowerShell** on Windows for first-env scripts (optional on Unix if you adapt paths)

## Minimal local development

1. Copy **`.env.example`** to **`.env`** in `ai-copilot-platform` and set database, Redis, auth, and model provider variables.
2. Start infrastructure: `pnpm db:up` (from platform root).
3. Install dependencies: `pnpm install`.
4. Apply migrations: `pnpm db:migrate` (runs API migration runner).
5. Run processes in separate terminals:
   - `pnpm dev:api`
   - `pnpm dev:worker`
   - `pnpm dev:admin`
   - `pnpm dev:marketing`

## First login

- With **`DEV_LOGIN_ENABLED=true`**, use the admin portal **developer login** screen.
- For **OIDC**, configure `OIDC_*` variables and use `/api/auth/oidc/start` (see [Authentication & authorization](../security/README.md)).

## Full “first environment” bootstrap

From `ai-copilot-platform` root:

```powershell
pnpm env:first
pnpm deploy:first:up
pnpm seed:first:demo
pnpm smoke:first:env
pnpm smoke:first:ui
pnpm smoke:first:ui:approvals
```

This provisions demo data, verifies API readiness and OIDC session behavior, and runs **Playwright** flows against the admin UI (including approvals).

## Tenant bootstrap (manual)

After login:

1. Create an **organization** and **application** (onboarding flow in admin UI or `POST /api/onboarding/bootstrap`).
2. Configure **copilot config** (repo, branch, theme, feature flags).
3. Add **sources** and trigger **reindex** (`POST /api/apps/:appId/sources/:sourceId/reindex`).
4. Issue an **install token** from the install page (`POST /api/apps/:appId/install-token`).
5. Embed using the **CDN loader** or **npm SDK** (see [SDKs](../sdk/README.md)).

## Demo HTML shell

The platform repo includes `demo/tenant-shell.html` to validate install token, theming, and approval UX against a real app ID and token.
