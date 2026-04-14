# Local setup and first environment

This section is the best place to start when you want to understand the implementation by running it on your machine.

## Recommended reading order

1. [Run locally step by step](run-locally-step-by-step.md)
2. [Local demo walkthrough](local-demo-walkthrough.md)
3. [Authentication and authorization](../security/README.md)
4. [Deployment and operations](../operations/deployment-operations.md)

## Two ways to run the platform

### Option 1: first environment bootstrap

Use this when you want the closest thing to a real environment on a developer machine.

It brings up:

- PostgreSQL
- Redis
- MinIO
- Keycloak
- API
- ingestion worker
- admin portal
- marketing site
- Prometheus

This is the preferred path for onboarding and verification.

### Option 2: minimal local development

Use this when you only need to work on part of the system and want faster iteration.

Typical pattern:

1. run local infra
2. start the API in watch mode
3. start the worker in watch mode
4. start the Angular apps separately

## Current local defaults

The first environment uses these default local URLs:

- admin: `http://127.0.0.1:4200`
- API: `http://127.0.0.1:3000/api`
- marketing: `http://127.0.0.1:4300`
- Keycloak: `http://127.0.0.1:8080`
- Prometheus: `http://127.0.0.1:9090`
- MinIO console: `http://127.0.0.1:9001`

## Demo login

The generated first environment uses this demo account:

- email: `owner@local.autonomous.ai`
- password: `Copilot123!`

## What happens after bootstrap

After running the first-environment commands, the demo seed creates:

- one demo organization
- three demo applications
- demo usage analytics
- demo audit logs
- demo sources and ingestion jobs
- demo conversations
- demo approval requests
- demo agent runs and agent steps

That seeded data is what powers the walkthrough in [Local demo walkthrough](local-demo-walkthrough.md).
