# NestJS architecture

The HTTP API is implemented under `services/api/src` with a **global prefix** `api` (see `main.ts`: `app.setGlobalPrefix('api')`).

## Application module graph

`AppModule` composes feature modules:

| Module | Responsibility |
|--------|----------------|
| `ConfigModule` | Global environment configuration |
| `AuthModule` | Session auth, OIDC, dev login, `SessionAuthGuard` as `APP_GUARD` |
| `PlatformStateModule` | Database access via `PlatformRepository`, shared domain types |
| `QueueModule` | Redis / BullMQ integration for ingestion jobs |
| `HealthModule` | `/api/health`, `/api/health/ready` |
| `MonitoringModule` | `/api/metrics` (Prometheus) |
| `OnboardingModule` | Organization bootstrap, member management |
| `AppsModule` | Applications, configuration, sources, jobs, tokens, API keys, usage, audit |
| `SettingsModule` | Model catalog, tenant credentials |
| `LlmModule` | `LlmRouterService` — OpenAI, Anthropic, Gemini, Ollama, custom OpenAI-compatible |
| `ChatModule` | Chat HTTP + SSE, RAG, rate limits, approvals integration |
| `EmbedModule` | Public embed config for install token flows |

**Note:** `RagModule` is imported by `ChatModule` (not directly listed in `AppModule`).

## Cross-cutting concerns

- **CORS**: enabled with `credentials: true` for browser clients.
- **Request ID**: middleware assigns `x-request-id` and records HTTP duration histograms via `MonitoringService`.
- **Public routes**: controllers or actions marked with `@Public()` bypass `SessionAuthGuard` (e.g. health, metrics, dev login, OIDC, chat POST/SSE, embed config).

## Authentication model

- **`SessionAuthGuard`**: default for all routes unless `@Public()`.
- **Access control**: `AccessService` enforces organization and application **roles** (`owner`, `admin`, `developer`, `viewer`) for mutating and read operations.

## Queue & worker

- API enqueues **ingestion jobs** through `QueueService` when an admin triggers **reindex**.
- `services/ingestion-worker` boots a Nest **application context** and registers BullMQ processors (`IngestionService`).

## Related chapters

- [HTTP API reference](../api/README.md)
- [Database & data model](../database/data-model.md)
