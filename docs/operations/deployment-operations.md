# Deployment & operations

This chapter aggregates **operations knowledge** from `ai-copilot-platform` (`README.md`, `docs/deployment-guide.md`, `docs/runbooks/platform-operations.md`). Use those files when you need command-for-command parity with the repo.

## Local / first environment

PowerShell helpers generate `.env.first.local` and compose overrides:

- `pnpm env:first`
- `pnpm deploy:first:up`
- `pnpm seed:first:demo`

Smoke:

- `pnpm smoke:first:env` — API/OIDC/session checks
- `pnpm smoke:first:ui` — Playwright admin UI
- `pnpm smoke:first:ui:approvals` — approval queue UX

Docker images cover **API**, **ingestion worker**, **admin portal**, **marketing web**.

## Staging CI

GitHub Actions workflows (in platform `.github/workflows/`):

- **`staging-deploy.yml`** — deployment records + optional auto smoke
- **`staging-smoke.yml`** — post-deploy verification

Configure GitHub **staging** environment variables and secrets as described in the platform `README.md` / `deployment-guide.md` (`STAGING_API_BASE`, `STAGING_ADMIN_URL`, credentials, etc.). Helper: `pnpm github:staging:configure` with `.env.staging.github`.

## Kubernetes

Reference manifests under **`infra/k8s/`**:

- Namespace, deployments/services for API, worker, web apps
- Ingress, secrets example, migration job

Typical order: apply secrets → run migration job → roll out workloads.

## Monitoring

- Prometheus scrapes **`GET /api/metrics`**
- Readiness: **`GET /api/health/ready`**
- Sample Prometheus config: `infra/monitoring/prometheus.yml`

## Environment variables (API)

Minimum (from runbook):

- `DATABASE_URL`, `REDIS_HOST`, `REDIS_PORT`, optional `REDIS_PASSWORD`
- Model keys: `OPENAI_API_KEY` (embeddings + OpenAI path), optional vendor keys
- `CREDENTIAL_ENCRYPTION_KEY` (tenant secret encryption)
- Chat limits: `CHAT_RATE_LIMIT_ENABLED`, `CHAT_RATE_LIMIT_MAX_REQUESTS`, `CHAT_RATE_LIMIT_WINDOW_MS`
- `READINESS_CHECK_REDIS` to include Redis in readiness

Worker additionally benefits from **`GITHUB_TOKEN`** / Bitbucket credentials for private repo ingestion.

## Database migrations

Apply SQL files in order or use `pnpm db:migrate`. See [Database & data model](../database/data-model.md).

## Incident checklist

1. Check **`/api/health` and `/api/health/ready`**
2. Verify **Postgres** connectivity and **pgvector**
3. Verify **Redis** if queues/rate limits enabled
4. Review **ingestion job** failures via admin **ingestion insights** API
5. Inspect **approval queue** if agent/test flows stall
