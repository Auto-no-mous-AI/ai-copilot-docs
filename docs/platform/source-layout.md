# Monorepo & services map

The implementation is a **pnpm workspace** rooted at **`ai-copilot-platform`**.

## Workspace layout

| Path | Role |
|------|------|
| `apps/admin-portal` | Angular **enterprise admin**: onboarding, apps, config, sources, theme, install tokens, API keys, usage, ingestion, audit, conversations, approvals, settings |
| `apps/marketing-web` | Angular **public marketing** site (product, pricing, security, docs, contact) |
| `services/api` | **NestJS** HTTP API: auth, onboarding, apps, settings, chat, embed, health, metrics |
| `services/ingestion-worker` | **NestJS** worker: BullMQ processors for ingestion jobs |
| `packages/shared` | Shared types/utilities for SDKs |
| `packages/web-sdk` | `@auto-no-mous/copilot-web` — embeddable loader + core client |
| `packages/react-sdk` | `@auto-no-mous/copilot-react` |
| `packages/angular-sdk` | `@auto-no-mous/copilot-angular` |
| `packages/config` | Shared configuration helpers (if present) |
| `infra/` | Kubernetes manifests, Prometheus config |
| `scripts/` | First-env generation, deploy, seed, smoke (Node + Playwright) |
| `docs/` | Runbooks and guides **inside the platform repo** (deployment, SSO, SDK release) |
| `demo/` | Static demo shell HTML for token/widget validation |

## Root scripts (from `package.json`)

| Script | Purpose |
|--------|---------|
| `pnpm dev:marketing` | Run marketing Angular app |
| `pnpm dev:admin` | Run admin Angular app |
| `pnpm dev:api` | Run API (`nest start --watch`) |
| `pnpm dev:worker` | Run ingestion worker |
| `pnpm db:up` / `db:down` | Docker Compose for local dependencies |
| `pnpm build:sdk` | Build shared + web + react + angular SDK packages |
| `pnpm env:first` / `deploy:first:up` / `seed:first:demo` | Bootstrap full local stack (see getting started) |
| `pnpm smoke:first:env` / `smoke:first:ui` | Automated smoke tests |

## Docker / first environment

The **first deployed environment** flow (documented in the platform `README.md`) brings up PostgreSQL, Redis, MinIO, Keycloak, API, worker, admin portal, marketing site, and Prometheus. Default local URLs:

- Admin: `http://127.0.0.1:4200`
- API: `http://127.0.0.1:3000/api`
- Marketing: `http://127.0.0.1:4300`
- Keycloak: `http://127.0.0.1:8080`
- Prometheus: `http://127.0.0.1:9090`

## Angular versions

Admin and marketing apps use the **Angular CLI** project layout (`angular.json`). Build and serve commands are defined per app under `apps/*/package.json`.
