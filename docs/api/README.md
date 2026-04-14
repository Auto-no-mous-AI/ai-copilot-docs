# HTTP API reference

Base URL pattern: `/api/...`.

This chapter is the route inventory. For concrete payloads and expected responses, also read [API request and response examples](request-response-examples.md).

## Health and observability

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | Public | Liveness |
| GET | `/health/ready` | Public | Readiness (DB; optional Redis if `READINESS_CHECK_REDIS=true`) |
| GET | `/metrics` | Public | Prometheus text exposition |

## Authentication

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/auth/config` | Public | Public auth config plus optional `currentUser` |
| GET | `/auth/me` | Session | Current user and org memberships |
| POST | `/auth/dev-login` | Public | Developer login when enabled |
| GET | `/auth/oidc/start` | Public | Begin OIDC redirect |
| GET | `/auth/oidc/callback` | Public | OIDC callback |
| POST | `/auth/logout` | Session | Clear session |

## Onboarding

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/onboarding/bootstrap` | Session | Create org, app, and owner membership |
| GET | `/onboarding/organizations/:organizationId/members` | Session | List members |
| POST | `/onboarding/organizations/:organizationId/members` | Session (owner/admin) | Add or update member |
| PUT | `/onboarding/organizations/:organizationId/members/:userId/role` | Session (owner/admin) | Change role |

## Applications and operations

Prefix: `/apps`

| Method | Path | Roles / notes |
|--------|------|----------------|
| GET | `/apps?organizationId=` | List apps for user; optional org filter |
| POST | `/apps` | Create app (org owner/admin) |
| GET | `/apps/:appId` | App details |
| GET/PUT | `/apps/:appId/configuration` | Copilot configuration |
| PUT | `/apps/:appId/theme` | Theme-only update |
| GET | `/apps/:appId/sources` | List data sources |
| POST | `/apps/:appId/sources` | Add source |
| POST | `/apps/:appId/sources/:sourceId/reindex` | Queue ingestion job |
| GET | `/apps/:appId/jobs` | List ingestion jobs |
| GET | `/apps/:appId/sources/:sourceId/jobs` | Jobs for one source |
| GET | `/apps/:appId/ingestion/insights` | Ingestion summary and failures |
| POST | `/apps/:appId/install-token` | Issue install token (owner/admin) |
| GET/POST | `/apps/:appId/api-keys` | List or create API keys |
| POST | `/apps/:appId/api-keys/:keyId/revoke` | Revoke key |
| GET | `/apps/:appId/audit-logs` | Audit entries |
| GET | `/apps/:appId/usage` | Usage totals |
| GET | `/apps/:appId/usage/timeseries` | Usage time series |

## Settings

| Method | Path | Description |
|--------|------|-------------|
| GET | `/settings/models` | List configured model routes |
| POST | `/settings/models` | Upsert model definition |
| GET | `/settings/credentials?applicationId=` | List tenant provider secrets metadata |
| POST | `/settings/credentials` | Store tenant credential |
| DELETE | `/settings/credentials?applicationId=&provider=` | Remove tenant credential |

## Chat and approvals

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/chat` | Public with API key or install token | Non-streaming chat completion |
| GET | `/chat/stream` | Public | SSE response stream |
| GET | `/chat/conversations` | Session | List conversations |
| GET | `/chat/conversations/:id/messages` | Session | Messages plus citations |
| GET | `/chat/conversations/:id/agent-runs` | Session | Agent runs |
| GET | `/chat/agent-runs/:id/steps` | Session | Agent steps |
| GET | `/chat/approvals` | Session (owner/admin) | Approval queue |
| POST | `/chat/approvals/:approvalRequestId/review` | Session (owner/admin) | Approve or reject |

## Chat authentication

Public chat endpoints accept:

- API key via `Authorization: Bearer <key>`
- API key via `x-copilot-api-key: <key>`
- install token via `x-copilot-install-token`
- environment via `x-copilot-env`

Install-token requests may also be checked against the app domain allowlist.

## Embed

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/embed/config?appId=&environment=&token=` | Public | Theme and features for a valid install token |

## Error handling

- standard NestJS HTTP exceptions such as `400`, `401`, `403`, and `429`
- rate limiting returns `Retry-After` and `X-RateLimit-*` headers when enabled
