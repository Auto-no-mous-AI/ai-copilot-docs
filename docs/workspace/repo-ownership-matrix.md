# Repo ownership matrix

This page gives the team one quick answer to a common question: where should a given change start?

## Quick rule

Start in the repository that owns the contract you are changing.

- runtime behavior starts in `ai-copilot-platform`
- long-form documentation starts in `ai-copilot-docs`
- standalone package release behavior starts in the relevant standalone SDK repo
- cross-repo bootstrap and workspace smoke start in `ai-copilot-workspace-hub`

## Ownership matrix

| Change type | Start here | Usually also touch |
|-------------|------------|--------------------|
| Admin UI page or route | `ai-copilot-platform` | `ai-copilot-docs` |
| API route, DTO, auth, approval, usage, or audit behavior | `ai-copilot-platform` | `ai-copilot-docs` |
| DB migration or repository query | `ai-copilot-platform` | `ai-copilot-docs` |
| Ingestion worker logic | `ai-copilot-platform` | `ai-copilot-docs` |
| Main runtime SDK behavior used by the product | `ai-copilot-platform` | relevant standalone SDK repo, `ai-copilot-docs` |
| Web SDK packaging, npm publish flow, release notes | `ai-copilot-sdk` | `ai-copilot-docs` |
| React wrapper API or release flow | `ai-copilot-sdk-react` | `ai-copilot-sdk`, `ai-copilot-docs` |
| Angular wrapper API or release flow | `ai-copilot-sdk-angular` | `ai-copilot-sdk`, `ai-copilot-docs` |
| Example host app behavior or onboarding sample | `ai-copilot-examples` | relevant SDK repo, `ai-copilot-docs` |
| Standalone marketing site release or container packaging | `ai-copilot-marketing-site` | `ai-copilot-docs` |
| Platform deployment runtime behavior | `ai-copilot-platform` | `ai-copilot-infra`, `ai-copilot-docs` |
| Terraform, Kubernetes overlays, secret generation helpers | `ai-copilot-infra` | `ai-copilot-platform`, `ai-copilot-docs` |
| Prometheus, Grafana, OTEL, alerts | `ai-copilot-observability` | `ai-copilot-platform`, `ai-copilot-docs` |
| Threat models, policy packs, control matrix, evidence templates | `ai-copilot-security` | `ai-copilot-docs` |
| Cross-repo bootstrap or smoke validation | `ai-copilot-workspace-hub` | any affected companion repo, `ai-copilot-docs` |
| Walkthroughs, onboarding docs, architecture docs | `ai-copilot-docs` | whichever repo changed |

## Escalation rule for cross-repo changes

If a change touches more than one contract, use this order:

1. update the repo that owns the runtime or release contract
2. update the dependent repo that consumes that contract
3. update `ai-copilot-docs`
4. rerun the smallest smoke path that proves the end-to-end flow still works

## Fast examples

### Example: adding a new copilot configuration field

1. start in `ai-copilot-platform`
2. update admin UI, API handling, persistence, and seed data
3. update `ai-copilot-docs`

### Example: changing the React wrapper public API

1. start in `ai-copilot-sdk-react`
2. align with `ai-copilot-sdk` if the base SDK contract changes too
3. validate with `ai-copilot-examples`
4. update `ai-copilot-docs`

### Example: changing staging deployment behavior

1. start in `ai-copilot-platform` if the runtime deploy contract changed
2. update `ai-copilot-infra` or `ai-copilot-workspace-hub` if their scripts are affected
3. update `ai-copilot-docs`
