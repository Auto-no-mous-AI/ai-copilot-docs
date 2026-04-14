# Monorepo and services map

The core runtime implementation is a pnpm workspace rooted at `ai-copilot-platform`, but it now sits inside a larger multi-repo workspace with companion repositories for SDKs, examples, infra, observability, security, and shared onboarding.

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

## Companion repo map

These sibling repositories round out the full implementation:

| Repository | Main contents |
|------------|---------------|
| `ai-copilot-sdk` | framework-agnostic browser SDK, loader build, package release docs |
| `ai-copilot-sdk-react` | React hook and wrapper around the browser SDK |
| `ai-copilot-sdk-angular` | Angular provider and wrapper around the browser SDK |
| `ai-copilot-marketing-site` | standalone Angular marketing site, Dockerfile, CI, release workflow |
| `ai-copilot-examples` | vanilla, React, and Angular example hosts plus local bootstrap |
| `ai-copilot-infra` | Kubernetes overlays, Terraform starter module, secret generation scripts |
| `ai-copilot-observability` | Prometheus config, alerts, Grafana dashboards, OTEL collector config |
| `ai-copilot-security` | policies, Rego checks, control matrix, evidence templates |
| `ai-copilot-workspace-hub` | repo manifest, workspace bootstrap, workspace smoke, developer handbook |

## Where developers usually start

Pick the repo based on the thing you are changing:

- product feature or admin/API behavior: `ai-copilot-platform`
- SDK packaging or wrapper API: `ai-copilot-sdk*`
- host-app integration examples: `ai-copilot-examples`
- standalone public site delivery: `ai-copilot-marketing-site`
- infra or deployment building blocks: `ai-copilot-infra`
- monitoring and dashboards: `ai-copilot-observability`
- policies and security controls: `ai-copilot-security`
- cross-repo bootstrap or shared handbook: `ai-copilot-workspace-hub`
