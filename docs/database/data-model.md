# Database & data model

PostgreSQL is the system of record. Migrations live in **`ai-copilot-platform/services/api/db/migrations/`**.

## Migration sequence

Apply in order (see also platform runbook):

1. `0001_init.sql` — core schema
2. `0002_app_api_keys.sql` — per-application API keys
3. `0003_approval_requests.sql` — human approval queue

Use `pnpm db:migrate` from the platform root (delegates to the API package’s migration runner).

## Extensions

- `pgcrypto`
- `vector` (pgvector)
- `citext` (case-insensitive email)

## Enumerated types (selected)

| Enum | Values (conceptual) |
|------|---------------------|
| `plan_type` | `free`, `starter`, `growth`, `enterprise` |
| `member_role` | `owner`, `admin`, `developer`, `viewer` |
| `framework_type` | `angular`, `react`, `vanilla` |
| `source_type` | `repo`, `docs` |
| `provider_type` | `openai`, `anthropic`, `gemini`, `ollama`, `custom` |
| `environment_type` | `dev`, `staging`, `prod` |
| `chat_mode` | `ask`, `test`, `agent` |
| `ingestion_status` | `queued`, `running`, `succeeded`, `failed`, `cancelled` |
| `run_status` | `queued`, `running`, `succeeded`, `failed`, `cancelled`, `requires_approval` |
| `approval_status` | `pending`, `approved`, `rejected` |

## Core entities

| Table | Purpose |
|-------|---------|
| `organizations` | Tenant boundary, plan, status |
| `users` | Identity (email, auth provider) |
| `organization_members` | User ↔ org with role |
| `applications` | Product within org; framework; **domain_allowlist** JSON |
| `app_environments` | Per-environment base URL |
| `copilot_configs` | Repo/docs URLs, **theme_json**, **features_json** |
| `install_tokens` | Hashed tokens for embed auth |
| `app_api_keys` | Hashed API keys for programmatic chat |
| `model_providers` | Catalog of models per provider |
| `tenant_model_credentials` | Encrypted provider secrets per org |
| `data_sources` | Repo/docs sources for ingestion |
| `ingestion_jobs` | Job status timeline |
| `documents` / `document_chunks` | Ingested text |
| `embeddings` | **vector(1536)** per chunk + ivfflat index |
| `conversations` / `messages` | Chat history; modes include `ask`/`test`/`agent` |
| `message_citations` | Links assistant messages to chunks |
| `agent_runs` / `agent_steps` | Agent mode execution audit |
| `approval_requests` | Human review for sensitive modes |
| `usage_events` | Metering (requests, tokens, cost metadata) |
| `audit_logs` | Administrative actions |

## Vector search

Embeddings are stored per chunk with cosine distance via **ivfflat** index. Retrieval is scoped by **application** in the repository layer (see `RagService` + `PlatformRepository.searchRelevantChunks`).

## Related chapters

- [Chat, RAG, LLM & approvals](../features/chat-rag-approvals.md)
