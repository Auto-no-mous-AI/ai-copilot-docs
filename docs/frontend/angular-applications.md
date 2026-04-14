# Angular applications

Two first-party Angular applications ship from `ai-copilot-platform/apps`.

## Admin portal

Path: `apps/admin-portal`

Purpose: authenticated enterprise operations console.

### Main routes

| Path | Screen |
|------|--------|
| `/login` | login screen |
| `/onboarding` | organization and first app bootstrap |
| `/apps` | applications list |
| `/apps/:id/configuration` | repo, branch, docs, feature flags |
| `/apps/:id/sources` | source management |
| `/apps/:id/theme` | chat theme editor |
| `/apps/:id/install` | install tokens and embed snippets |
| `/apps/:id/usage` | usage analytics |
| `/apps/:id/ingestion` | ingestion jobs and insights |
| `/apps/:id/audit` | audit log |
| `/apps/:id/conversations` | conversations, approvals, agent runs |
| `/settings/access` | organization members and roles |
| `/settings/models` | model routing settings |

All routes except `/login` use the auth guard.

### Runtime integration

The admin app talks to the NestJS API under `/api`.

For deployed environments, it supports runtime API-base injection through `public/runtime-config.js`.

## Marketing web

Path: `apps/marketing-web`

Purpose: public-facing product website.

### Main routes

| Path | Screen |
|------|--------|
| `/` | home |
| `/product` | product overview |
| `/security` | security story |
| `/pricing` | pricing |
| `/get-started` | onboarding and CTA page |
| `/docs` | docs placeholder |
| `/contact-sales` | contact page |

This app does not require a session.

## Why these two apps matter for developers

- the admin portal is the operational source of truth for the platform
- the marketing site demonstrates the public product story and launch flow
- together they cover the top-level user journeys for internal operators and external prospects
