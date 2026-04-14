# Monorepo and services map

The implementation is a pnpm workspace rooted at `ai-copilot-platform`.

## Workspace layout

| Path | Role |
|------|------|
| `apps/admin-portal` | Angular enterprise admin for onboarding, apps, configuration, sources, theme, install tokens, API keys, usage, ingestion, audit, conversations, approvals, and settings |
| `apps/marketing-web` | Angular public marketing site |
| `services/api` | NestJS HTTP API for auth, onboarding, apps, settings, chat, embed, health, and metrics |
| `services/ingestion-worker` | NestJS worker for ingestion jobs |
| `packages/shared` | Shared types and helpers for SDKs |
| `packages/web-sdk` | `@auto-no-mous/copilot-web` core embed client and loader |
| `packages/react-sdk` | `@auto-no-mous/copilot-react` |
| `packages/angular-sdk` | `@auto-no-mous/copilot-angular` |
| `infra/` | Kubernetes manifests, Keycloak assets, Prometheus config |
| `scripts/` | first-environment generation, deploy, seed, smoke, and staging setup scripts |
| `docs/` | platform-owned operational docs inside the implementation repo |
| `demo/` | static HTML shell for widget validation |

## Root scripts

| Script | Purpose |
|--------|---------|
| `pnpm dev:marketing` | Run the marketing Angular app |
| `pnpm dev:admin` | Run the admin Angular app |
| `pnpm dev:api` | Run the NestJS API in watch mode |
| `pnpm dev:worker` | Run the ingestion worker |
| `pnpm db:up` / `pnpm db:down` | Start or stop local dependency containers |
| `pnpm build:sdk` | Build shared, web, React, and Angular SDK packages |
| `pnpm env:first` | Generate `.env.first.local` and the local Keycloak realm import |
| `pnpm deploy:first:up` / `pnpm deploy:first:down` | Bring the full local first environment up or down |
| `pnpm seed:first:demo` | Seed the demo tenant and demo applications |
| `pnpm smoke:first:env` | HTTP smoke validation |
| `pnpm smoke:first:ui` | Playwright UI smoke validation |
| `pnpm smoke:first:ui:approvals` | Playwright approval review validation |
| `pnpm github:staging:configure` | Sync staging GitHub environment settings |
| `pnpm github:staging:dispatch:deploy` | Dispatch the staging deploy workflow |
| `pnpm github:staging:dispatch:smoke` | Dispatch the staging smoke workflow |

## First environment topology

The local first environment brings up:

- PostgreSQL
- Redis
- MinIO
- Keycloak
- API
- ingestion worker
- admin portal
- marketing site
- Prometheus

Default local URLs:

- admin: `http://127.0.0.1:4200`
- API: `http://127.0.0.1:3000/api`
- marketing: `http://127.0.0.1:4300`
- Keycloak: `http://127.0.0.1:8080`
- Prometheus: `http://127.0.0.1:9090`

## Angular runtime configuration

The admin app supports runtime API base injection for deployed environments and uses route guards to protect every route except `/login`.

The marketing site is a public Angular application with product and onboarding pages.
