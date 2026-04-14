# New developer first day checklist

This checklist is designed for a new engineer joining the project and trying to become productive on day one.

## Outcome for day one

By the end of the first day, a developer should be able to:

- run the platform locally
- sign in through the local OIDC flow
- understand the seeded demo applications
- find the main frontend, backend, worker, SDK, and automation code paths
- know where to make their first safe code change

## 1. Clone and orient yourself

Make sure you have these two repositories locally:

- `ai-copilot-platform`
- `ai-copilot-docs`

Read in this order:

1. [Current implementation status](../architecture/current-implementation.md)
2. [System architecture](../architecture/overview.md)
3. [Monorepo and services map](../platform/source-layout.md)
4. [Developer change workflow](../platform/developer-change-workflow.md)

## 2. Bring up the local platform

From `ai-copilot-platform` run:

```powershell
pnpm install
pnpm env:first
pnpm deploy:first:up
pnpm seed:first:demo
pnpm smoke:first:env
```

If this succeeds, the local stack is healthy enough for onboarding.

## 3. Sign in and confirm the happy path

Open `http://127.0.0.1:4200` and sign in with:

- `owner@local.autonomous.ai`
- `Copilot123!`

Expected result:

- you land on `/apps`
- you see the three seeded demo apps

If you want a quick visual reference, see the login and approval GIFs in [Local demo walkthrough](local-demo-walkthrough.md).

## 4. Walk the seeded applications

Review these seeded apps in the admin portal:

- Supplier Portal Copilot
- Procurement Operations Copilot
- Claims Review Copilot

As you explore them, use [Local demo walkthrough](local-demo-walkthrough.md).

## 5. Learn the main code zones

You do not need to memorize everything. Just know where to start.

### Frontend

- admin app: `apps/admin-portal`
- marketing app: `apps/marketing-web`

### Backend

- API: `services/api/src`
- worker: `services/ingestion-worker/src`
- repository layer: `services/api/src/platform-state/platform.repository.ts`

### SDKs

- `packages/web-sdk`
- `packages/react-sdk`
- `packages/angular-sdk`

### Automation and operations

- local bootstrap: `scripts/`
- GitHub Actions: `.github/workflows/`
- Kubernetes and infra: `infra/`

## 6. Run the deeper smoke checks

After you are comfortable with the local stack, run:

```powershell
pnpm smoke:first:ui
pnpm smoke:first:ui:approvals
```

This validates:

- the admin UI flow
- the approval lifecycle
- key seeded operational pages

## 7. Read the contracts you will touch most often

Important chapters:

- [HTTP API reference](../api/README.md)
- [API request and response examples](../api/request-response-examples.md)
- [Chat, RAG, LLM, and approvals](../features/chat-rag-approvals.md)
- [Authentication and authorization](../security/README.md)

## 8. Make one safe first change

Recommended first tasks for a new developer:

- small admin UI text or layout improvement
- add or clarify a docs section
- add one API example or walkthrough note
- add a low-risk seeded demo enhancement

Avoid starting with a large schema or auth change on day one unless you already know the platform well.

## 9. Validate before you stop for the day

At minimum, rerun the smallest checks that match your change.

Examples:

```powershell
pnpm --dir services/api build
pnpm --dir apps/admin-portal build
pnpm smoke:first:env
```

## 10. Day-one success checklist

A new developer has had a successful first day if they can say yes to these:

- I can explain what the platform does.
- I can run the local first environment.
- I can sign in and navigate the demo apps.
- I know where frontend, backend, worker, and SDK code live.
- I know how approvals fit into the product.
- I know which docs to read before editing a core flow.
