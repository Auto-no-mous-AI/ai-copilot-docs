# Companion repositories

The directory `ai-copilot-workspace` groups the active repositories that make up the AI Copilot program. They are no longer just placeholders. Each repo now owns a specific slice of the implementation, release flow, or developer experience.

| Repository | Intent | Status |
|------------|--------|--------|
| `ai-copilot-platform` | Product monorepo: Angular admin, Angular marketing, NestJS API, ingestion worker, DB migrations, local bootstrap, staging automation | Implemented and primary runtime source |
| `ai-copilot-docs` | This GitBook-style book for engineering, product, and operations | Active documentation source |
| `ai-copilot-sdk` | Standalone core browser SDK and loader package | Implemented with CI and release workflow |
| `ai-copilot-sdk-angular` | Standalone Angular wrapper package | Implemented with CI and release workflow |
| `ai-copilot-sdk-react` | Standalone React wrapper package | Implemented with CI and release workflow |
| `ai-copilot-examples` | Runnable vanilla, React, and Angular host examples plus mock API and local bootstrap | Implemented with CI and release workflow |
| `ai-copilot-infra` | Standalone Terraform, Kubernetes, Keycloak, and secret-generation assets | Implemented with CI validation |
| `ai-copilot-marketing-site` | Standalone public marketing site with container build and release flow | Implemented with CI and release workflow |
| `ai-copilot-observability` | Prometheus, alerts, Grafana, OTEL, and runbooks | Implemented with CI validation |
| `ai-copilot-security` | Policies, threat models, Rego checks, control matrix, and evidence templates | Implemented with CI validation |
| `ai-copilot-workspace-hub` | Parent workspace bootstrap, shared handbook, repo manifest, and workspace smoke validation | Implemented with CI validation |

## How to think about source of truth

Use this rule:

- runtime behavior starts in `ai-copilot-platform`
- package publishing starts in the standalone SDK repos
- public-site publishing can happen from `ai-copilot-marketing-site`
- infra, observability, and security guidance lives in their dedicated repos
- cross-repo onboarding and smoke orchestration live in `ai-copilot-workspace-hub`

## Version and release coordination

The main coordination pattern today is:

1. implement and validate product behavior in `ai-copilot-platform`
2. keep the standalone repo equivalent aligned where relevant
3. publish packages or bundles from the standalone repo workflows
4. update this docs repo when contracts or onboarding steps change
