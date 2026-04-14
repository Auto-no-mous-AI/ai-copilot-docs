# HTTP API reference

Base URL pattern: **`/api/...`** (global prefix). All paths below are relative to that prefix.

## Health & observability

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | Public | Liveness |
| GET | `/health/ready` | Public | Readiness (DB; optional Redis if `READINESS_CHECK_REDIS=true`) |
| GET | `/metrics` | Public | Prometheus text exposition |

## Authentication

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/auth/config` | Public | Public auth config + optional `currentUser` from session |
| GET | `/auth/me` | Session | Current user and org memberships |
| POST | `/auth/dev-login` | Public | Developer login (when enabled) — sets session cookie |
| GET | `/auth/oidc/start` | Public | Begin OIDC redirect |
| GET | `/auth/oidc/callback` | Public | OIDC callback |
| POST | `/auth/logout` | Session | Clear session |

## Onboarding

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/onboarding/bootstrap` | Session | Create org + app, assign owner |
| GET | `/onboarding/organizations/:organizationId/members` | Session | List members |
| POST | `/onboarding/organizations/:organizationId/members` | Session (owner/admin) | Add/update member |
| PUT | `/onboarding/organizations/:organizationId/members/:userId/role` | Session (owner/admin) | Change role |

## Applications & operations

Prefix: **`/apps`**. Unless noted, routes require a **session** and appropriate org/app membership.

| Method | Path | Roles / notes |
|--------|------|----------------|
| GET | `/apps?organizationId=` | List apps for user; optional org filter |
| POST | `/apps` | Create app (org owner/admin) |
| GET | `/apps/:appId` | App details |
| GET/PUT | `/apps/:appId/configuration` | Copilot configuration (repo, theme, features) |
| PUT | `/apps/:appId/theme` | Theme-only update |
| GET | `/apps/:appId/sources` | List data sources |
| POST | `/apps/:appId/sources` | Add source |
| POST | `/apps/:appId/sources/:sourceId/reindex` | Queue ingestion job |
| GET | `/apps/:appId/jobs` | List ingestion jobs |
| GET | `/apps/:appId/sources/:sourceId/jobs` | Jobs for one source |
| GET | `/apps/:appId/ingestion/insights` | Ingestion summary & failures |
| POST | `/apps/:appId/install-token` | Issue install token (owner/admin) |
| GET/POST | `/apps/:appId/api-keys` | List / create API keys (owner/admin) |
| POST | `/apps/:appId/api-keys/:keyId/revoke` | Revoke key |
| GET | `/apps/:appId/audit-logs` | Audit entries (owner/admin) |
| GET | `/apps/:appId/usage` | Usage totals |
| GET | `/apps/:appId/usage/timeseries` | Usage time series (`bucket=day|hour`) |

## Settings (models & credentials)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/settings/models` | List configured model routes |
| POST | `/settings/models` | Upsert model definition |
| GET | `/settings/credentials?applicationId=` | List tenant provider secrets (metadata) |
| POST | `/settings/credentials` | Store tenant credential (`applicationId`, `provider`, `secret`, optional `kmsKeyId`) |
| DELETE | `/settings/credentials?applicationId=&provider=` | Remove tenant credential (`provider` must be one of the supported enum values) |

## Chat & approvals

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/chat` | **Public** with API key or install token | Non-streaming chat completion |
| GET | `/chat/stream` | **Public** (SSE) | Streaming tokens (`EventSource`) |
| GET | `/chat/conversations` | Session (app member) | List conversations (filters) |
| GET | `/chat/conversations/:id/messages` | Session | Messages + citations |
| GET | `/chat/conversations/:id/agent-runs` | Session | Agent runs |
| GET | `/chat/agent-runs/:id/steps` | Session | Agent steps |
| GET | `/chat/approvals` | Session (owner/admin) | Approval queue |
| POST | `/chat/approvals/:approvalRequestId/review` | Session (owner/admin) | Approve/reject |

### Chat authentication (embed / SDK)

Public chat endpoints accept:

- **API key**: `Authorization: Bearer <key>` or `x-copilot-api-key: <key>`.
- **Install token**: `x-copilot-install-token` + `x-copilot-env` (`dev` | `staging` | `prod`).

When using **install token** auth, requests may be checked against the app **domain allowlist** (Origin/Referer host matching, including `*.` wildcard entries).

## Embed

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/embed/config?appId=&environment=&token=` | Public | Theme + features for valid install token |

## Error handling

- Standard NestJS HTTP exceptions (`400`, `401`, `403`, `429`, etc.).
- Rate limiting returns `Retry-After` and `X-RateLimit-*` headers when enabled.
