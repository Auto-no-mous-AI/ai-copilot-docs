# Angular applications

Two first-party SPAs ship from `ai-copilot-platform/apps/`.

## Admin portal (`apps/admin-portal`)

**Purpose:** authenticated operations console for tenants.

### Routes (from `app.routes.ts`)

| Path | Screen |
|------|--------|
| `/login` | Login (dev / SSO) |
| `/onboarding` | Initial org/app bootstrap |
| `/apps` | Application list |
| `/apps/:id/configuration` | Repo, branch, docs, feature flags |
| `/apps/:id/sources` | Data sources |
| `/apps/:id/theme` | Theme editor |
| `/apps/:id/install` | Install token + embed snippets |
| `/apps/:id/usage` | Usage analytics |
| `/apps/:id/ingestion` | Ingestion jobs & insights |
| `/apps/:id/audit` | Audit log |
| `/apps/:id/conversations` | Conversation explorer |
| `/settings/access` | Access / membership settings |
| `/settings/models` | Model catalog management |

All routes except `/login` use **`authGuard`** (`canActivate`).

### Integration pattern

The admin UI calls the Nest API under `/api` (configure environment `apiBaseUrl` or equivalent in the app’s environment files — see `apps/admin-portal/src/environments` in the platform repo).

## Marketing web (`apps/marketing-web`)

**Purpose:** public marketing pages.

### Routes

| Path | Screen |
|------|--------|
| `/` | Home |
| `/product` | Product |
| `/security` | Security |
| `/pricing` | Pricing |
| `/get-started` | Get started |
| `/docs` | Docs placeholder |
| `/contact-sales` | Contact |

No session guard on these routes.

## SDK usage from Angular hosts

Customer applications can consume **`@auto-no-mous/copilot-angular`** (see [SDKs](../sdk/README.md)) or the **web loader** script tag produced by the install token API.
