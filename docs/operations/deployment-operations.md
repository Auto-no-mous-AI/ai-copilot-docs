# Deployment and operations

This chapter summarizes how the platform is currently deployed and operated. Use it together with [Run locally step by step](../getting-started/run-locally-step-by-step.md) and [Staging automation](staging-automation.md).

## Local first environment

The preferred local bootstrap flow is:

```powershell
pnpm env:first
pnpm deploy:first:up
pnpm seed:first:demo
pnpm smoke:first:env
pnpm smoke:first:ui
pnpm smoke:first:ui:approvals
```

What this gives you:

- PostgreSQL
- Redis
- MinIO
- Keycloak
- API
- ingestion worker
- admin portal
- marketing web
- Prometheus

## What each bootstrap command does

### `pnpm env:first`

Generates local secrets and writes:

- `.env.first.local`
- `.runtime/keycloak/realm-import.local.json`

### `pnpm deploy:first:up`

- starts Docker Compose services
- waits for PostgreSQL readiness
- runs migrations
- syncs the Keycloak client
- waits for `GET /api/health/ready`

### `pnpm seed:first:demo`

Seeds the demo tenant, apps, sources, usage, audit logs, conversations, approvals, and agent runs.

### `pnpm smoke:first:env`

Runs HTTP-level validation for readiness, OIDC login, session creation, and seeded apps.

### `pnpm smoke:first:ui`

Runs Playwright browser validation for the admin UI.

### `pnpm smoke:first:ui:approvals`

Creates fresh approvals and validates approve and reject flows through the admin UI.

## Default local endpoints

- admin: `http://127.0.0.1:4200`
- API: `http://127.0.0.1:3000/api`
- marketing: `http://127.0.0.1:4300`
- Keycloak: `http://127.0.0.1:8080`
- Prometheus: `http://127.0.0.1:9090`
- MinIO console: `http://127.0.0.1:9001`

## Staging CI and deployment

The platform currently uses:

- `staging-deploy.yml`
- `staging-smoke.yml`
- `scripts/configure-github-staging.mjs`

See [Staging automation](staging-automation.md) for the complete setup flow.

## Kubernetes

Reference manifests live under `ai-copilot-platform/infra/k8s` and cover:

- namespace
- API deployment and service
- worker deployment
- admin and marketing deployments and services
- ingress
- secret example
- API migration job

Typical order:

1. apply secrets
2. run the migration job
3. deploy API and worker
4. deploy admin and marketing
5. apply ingress

## Monitoring

The API exposes:

- `GET /api/health`
- `GET /api/health/ready`
- `GET /api/metrics`

Prometheus bootstrap config is in:

`ai-copilot-platform/infra/monitoring/prometheus.yml`

## Important environment variables

Common API variables:

- `DATABASE_URL` or the `PG*` connection values
- `REDIS_HOST`
- `REDIS_PORT`
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `GEMINI_API_KEY`
- `CUSTOM_LLM_API_KEY`
- `CUSTOM_LLM_BASE_URL`
- `CREDENTIAL_ENCRYPTION_KEY`
- `CHAT_RATE_LIMIT_ENABLED`
- `CHAT_RATE_LIMIT_MAX_REQUESTS`
- `CHAT_RATE_LIMIT_WINDOW_MS`
- `READINESS_CHECK_REDIS`
- `AUTH_SESSION_SECRET`
- `DEV_LOGIN_ENABLED`
- `OIDC_ISSUER_URL`
- `OIDC_INTERNAL_ISSUER_URL`
- `OIDC_CLIENT_ID`
- `OIDC_CLIENT_SECRET`
- `OIDC_REDIRECT_URI`

Worker-specific useful variables:

- `GITHUB_TOKEN`
- `BITBUCKET_TOKEN`
- `BITBUCKET_USERNAME`
- `BITBUCKET_APP_PASSWORD`

## Operations checklist

When something looks wrong, check in this order:

1. `GET /api/health`
2. `GET /api/health/ready`
3. Docker container status
4. PostgreSQL connectivity and extensions
5. Redis connectivity
6. Keycloak reachability and OIDC discovery
7. admin login flow
8. seeded apps and approval queue
9. ingestion failures and audit logs
