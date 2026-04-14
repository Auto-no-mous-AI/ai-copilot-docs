# Companion repositories

The directory **`ai-copilot-workspace`** groups multiple git repositories. Only **`ai-copilot-platform`** currently contains the **full product implementation**. The others are **scaffolds** or **future splits** (per their `README.md` files).

| Repository | Intent | Status |
|------------|--------|--------|
| `ai-copilot-platform` | Monorepo: Angular apps, NestJS API, worker, SDK packages, infra scripts | **Implemented** |
| `ai-copilot-docs` | **This book** — developer & product documentation | Active documentation |
| `ai-copilot-sdk` | Standalone core JS SDK | Scaffold |
| `ai-copilot-sdk-angular` | Standalone Angular wrapper | Scaffold |
| `ai-copilot-sdk-react` | Standalone React bindings | Scaffold |
| `ai-copilot-examples` | Sample apps | Scaffold |
| `ai-copilot-infra` | Terraform / K8s overlays | Scaffold |
| `ai-copilot-marketing-site` | Standalone marketing site | Scaffold (platform also ships `apps/marketing-web`) |
| `ai-copilot-observability` | Dashboards, OTEL, runbooks | Scaffold |
| `ai-copilot-security` | Policies, threat models, compliance | Scaffold |

When extracting packages to standalone repos, align versions and publish workflows with **`ai-copilot-platform/docs/sdk-release.md`** and `.github/workflows/release-sdks.yml`.
