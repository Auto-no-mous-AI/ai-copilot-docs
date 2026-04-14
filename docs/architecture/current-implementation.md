# Current implementation status

This chapter answers a simple question for the engineering team: what is real today, what is partially implemented, and what is still scaffolded.

## Repositories that matter right now

The real product implementation is in `ai-copilot-platform`.

The real documentation is in `ai-copilot-docs`.

The other repositories in `ai-copilot-workspace` exist for future separation or packaging, but they are not the source of truth for runtime behavior today.

## What is implemented end to end

### Platform foundation

- multi-tenant data model in PostgreSQL
- pgvector-backed embeddings storage
- Redis-backed queues and optional rate limiting
- NestJS API with `/api` global prefix
- NestJS ingestion worker
- Angular admin portal
- Angular marketing website
- embeddable web SDK plus React and Angular wrappers

### Authentication and authorization

- developer login for local environments
- OIDC login with Keycloak or another compatible provider
- session-backed admin authentication
- application and organization role checks
- public chat and embed endpoints secured by install token or API key
- domain allowlist enforcement for embed and chat flows

### Admin product areas

- onboarding
- applications list
- copilot configuration
- sources management
- theme editor
- install token generation
- application API key management
- usage analytics
- ingestion insights
- audit logs
- conversations explorer
- approval queue
- access settings
- model settings

### AI runtime

- ASK, TEST, and AGENT chat modes
- RAG retrieval from ingested documents and code
- provider routing for OpenAI, Anthropic, Gemini, Ollama, and custom OpenAI-compatible endpoints
- tenant-level provider secrets
- human approval flow for TEST and AGENT
- agent run and agent step persistence
- citations attached to assistant messages

### Delivery and operations

- Docker-based first environment bootstrap
- demo tenant seeding
- HTTP smoke test
- Playwright UI smoke test
- Playwright approval review smoke test
- SDK build and release workflow
- staging deploy and staging smoke workflows
- GitHub staging setup automation script
- Prometheus metrics endpoint and sample config
- Kubernetes reference manifests

## What is intentionally lightweight today

These areas exist, but they are intentionally pragmatic rather than fully enterprise-hardened:

- ingestion parsing depth and crawl sophistication
- autonomous browser execution breadth
- full production-grade secret management integration
- production IdP hardening beyond the generic OIDC flow
- dedicated standalone repos for SDKs, infra, security, and observability

## What is scaffolded or future-facing

These repositories are not the current runtime source of truth:

- `ai-copilot-sdk`
- `ai-copilot-sdk-react`
- `ai-copilot-sdk-angular`
- `ai-copilot-examples`
- `ai-copilot-infra`
- `ai-copilot-marketing-site`
- `ai-copilot-observability`
- `ai-copilot-security`

Use them only as placeholders or future extraction targets.

## Recommended onboarding path

For a new developer joining the project, the shortest path to understanding the system is:

1. read [System architecture](overview.md)
2. read [Monorepo and services map](../platform/source-layout.md)
3. follow [Run locally step by step](../getting-started/run-locally-step-by-step.md)
4. follow [Local demo walkthrough](../getting-started/local-demo-walkthrough.md)
5. use [HTTP API reference](../api/README.md) and [Chat, RAG, LLM, and approvals](../features/chat-rag-approvals.md) while making changes
