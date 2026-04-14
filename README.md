# AI Copilot developer documentation

This GitBook-style documentation describes the current AI Copilot implementation across the full repository family.

The codebase now spans multiple active repositories:

- `ai-copilot-platform`: main product monorepo with Angular apps, NestJS API, ingestion worker, first-environment bootstrap, and staging automation
- `ai-copilot-sdk`: standalone framework-agnostic web SDK
- `ai-copilot-sdk-react`: standalone React wrapper
- `ai-copilot-sdk-angular`: standalone Angular wrapper
- `ai-copilot-marketing-site`: standalone public website build and release pipeline
- `ai-copilot-examples`: runnable vanilla, React, and Angular host examples
- `ai-copilot-infra`: standalone Terraform, Kubernetes, and operator scripts
- `ai-copilot-observability`: monitoring, dashboards, OTEL, and alerting assets
- `ai-copilot-security`: policies, control matrix, threat models, and policy checks
- `ai-copilot-workspace-hub`: parent workspace bootstrap, smoke validation, and handbook

See [Companion repositories](docs/workspace/companion-repositories.md) for the current role of each repo.

## Who this is for

- engineers onboarding to the platform
- frontend teams embedding the copilot widget
- backend teams extending APIs, ingestion, and model routing
- DevOps and SRE teams operating the local, staging, and production environments

## How to use this book

Start here if you want to understand the system quickly:

1. [Current implementation status](docs/architecture/current-implementation.md)
2. [System architecture](docs/architecture/overview.md)
3. [Monorepo and services map](docs/platform/source-layout.md)
4. [Companion repositories](docs/workspace/companion-repositories.md)
5. [Run locally step by step](docs/getting-started/run-locally-step-by-step.md)
6. [Local demo walkthrough](docs/getting-started/local-demo-walkthrough.md)

## Source of truth

This repository explains the platform, but the source of truth is always the code in the active implementation repositories.

When code and docs diverge:

1. trust the relevant implementation repository
2. update this docs repository immediately after

## GitBook / HonKit layout

This repository uses a classic GitBook-compatible structure:

- `SUMMARY.md`: table of contents
- `docs/`: chapter content
- `book.json`: HonKit and plugin configuration

## Preview locally

From this repository root:

```bash
npm install
npm start
```

The local preview usually starts on `http://localhost:4000`.

To use another port:

```bash
npx honkit serve --port 4321
```

To build static HTML:

```bash
npm run build
```

Generated output is written to `_book/`.

## What this book now covers

- the real local first-environment bootstrap flow
- the workspace-hub bootstrap and smoke flow across companion repos
- demo tenant seed data and what each seeded app demonstrates
- all current admin portal areas
- current API surface
- auth, SDK, RAG, approvals, audit, usage, release, observability, security, and staging automation

## Maintenance note

This docs repo should be updated whenever any of these change in the implementation repos:

- routes
- environment variables
- smoke tests
- staging workflows
- demo tenant shape
- SDK install contracts
- standalone release workflows
- workspace bootstrap expectations
