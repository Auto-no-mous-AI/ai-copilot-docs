# AI Copilot developer documentation

This GitBook-style documentation describes the current implementation of the AI Copilot enterprise platform.

The running system lives in `ai-copilot-platform`:

- Angular admin portal
- Angular marketing web
- NestJS API
- NestJS ingestion worker
- PostgreSQL with pgvector
- Redis and BullMQ
- embeddable web, React, and Angular SDKs
- first-environment bootstrap, smoke tests, and staging workflows

Other repositories under `ai-copilot-workspace` are mostly scaffolds or planned future splits. See [Companion repositories](docs/workspace/companion-repositories.md).

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
4. [Run locally step by step](docs/getting-started/run-locally-step-by-step.md)
5. [Local demo walkthrough](docs/getting-started/local-demo-walkthrough.md)

## Source of truth

This repository explains the platform, but the source of truth is always the code in `ai-copilot-platform`.

When code and docs diverge:

1. trust the platform repository
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
- demo tenant seed data and what each seeded app demonstrates
- all current admin portal areas
- current API surface
- auth, SDK, RAG, approvals, audit, usage, and staging automation

## Maintenance note

This docs repo should be updated whenever any of these change in `ai-copilot-platform`:

- routes
- environment variables
- smoke tests
- staging workflows
- demo tenant shape
- SDK install contracts
