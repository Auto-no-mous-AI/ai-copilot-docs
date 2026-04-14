# Current implementation status

This chapter answers a simple question for the engineering team: what is real today, what is partially implemented, and where each kind of work now lives.

## Repositories that matter right now

The current implementation is split across active repositories:

- `ai-copilot-platform`: product runtime, admin UI, API, worker, data model, local environment, staging automation
- `ai-copilot-docs`: developer and product documentation
- `ai-copilot-sdk`: standalone browser SDK package
- `ai-copilot-sdk-react`: standalone React wrapper package
- `ai-copilot-sdk-angular`: standalone Angular wrapper package
- `ai-copilot-marketing-site`: standalone marketing site with CI and release flow
- `ai-copilot-examples`: runnable host application examples and local mock API
- `ai-copilot-infra`: standalone infrastructure code and bootstrap helpers
- `ai-copilot-observability`: monitoring, dashboards, alerts, and OTEL assets
- `ai-copilot-security`: threat models, policies, controls, and policy checks
- `ai-copilot-workspace-hub`: workspace bootstrap, workspace smoke, and cross-repo onboarding

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
- standalone SDK build and release workflows
- staging deploy and staging smoke workflows
- GitHub staging setup automation script
- Prometheus metrics endpoint and sample config
- Kubernetes reference manifests
- standalone infra, observability, and security repositories with CI
- workspace-hub bootstrap and cross-repo smoke validation

## What is intentionally lightweight today

These areas exist, but they are intentionally pragmatic rather than fully enterprise-hardened:

- ingestion parsing depth and crawl sophistication
- autonomous browser execution breadth
- full production-grade secret management integration
- production IdP hardening beyond the generic OIDC flow
- cross-repo version coordination and shared release orchestration
- production deployment specifics for a real staging or production cloud account

## What is scaffolded or future-facing

Some areas are still reference-heavy or starter-grade even though the repos are now real and usable:

- cloud-specific Terraform modules beyond the starter platform module
- production alert tuning and Grafana dashboard depth
- advanced policy packs and evidence automation in the security repo
- richer example applications that hit a live deployed tenant instead of the local mock path

## Recommended onboarding path

For a new developer joining the project, the shortest path to understanding the system is:

1. read [System architecture](overview.md)
2. read [Monorepo and services map](../platform/source-layout.md)
3. read [Companion repositories](../workspace/companion-repositories.md)
4. follow [Run locally step by step](../getting-started/run-locally-step-by-step.md)
5. follow [Local demo walkthrough](../getting-started/local-demo-walkthrough.md)
6. use [HTTP API reference](../api/README.md) and [Chat, RAG, LLM, and approvals](../features/chat-rag-approvals.md) while making changes
