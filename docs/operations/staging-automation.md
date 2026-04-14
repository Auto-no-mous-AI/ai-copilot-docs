# Staging automation

This chapter documents the current staging automation that lives in `ai-copilot-platform`.

## Current workflow set

The platform currently uses two GitHub Actions workflows for staging:

- `staging-deploy.yml`
- `staging-smoke.yml`

## What `staging-deploy.yml` does

This workflow:

1. creates a GitHub deployment for the `staging` environment
2. marks it `in_progress`
3. builds the platform artifacts
4. performs the deploy through either:
   - a runner-side deploy command, or
   - a deploy webhook
5. marks the deployment `success`, `failure`, or `error`

It can run:

- manually through `workflow_dispatch`
- automatically on `main` pushes when `STAGING_AUTO_DEPLOY=true`

## What `staging-smoke.yml` does

This workflow runs:

- after successful GitHub deployment status events for the `staging` environment
- or manually through `workflow_dispatch`

It performs:

1. HTTP smoke checks
2. Playwright UI smoke checks
3. Playwright approval review smoke checks

## Required GitHub staging variables

Set these as GitHub environment variables on the `staging` environment:

- `STAGING_API_BASE`
- `STAGING_ADMIN_URL`
- `STAGING_MARKETING_URL`
- `STAGING_OIDC_ISSUER`
- `STAGING_AUTO_DEPLOY`
- `STAGING_DEPLOY_COMMAND`
- optional `STAGING_SMOKE_APP_NAMES`

## Required GitHub staging secrets

Set these as GitHub environment secrets on the `staging` environment:

- `STAGING_SMOKE_USERNAME`
- `STAGING_SMOKE_PASSWORD`
- `STAGING_DEPLOY_WEBHOOK_URL`
- `STAGING_DEPLOY_WEBHOOK_TOKEN`

Use either:

- `STAGING_DEPLOY_COMMAND`

or:

- `STAGING_DEPLOY_WEBHOOK_URL`

You do not need both.

## GitHub setup automation script

The platform repo includes:

`scripts/configure-github-staging.mjs`

This script can:

- create or update the `staging` environment
- sync environment variables through the GitHub REST API
- sync environment secrets through `gh secret set` when `gh` is installed
- dispatch the deploy workflow
- dispatch the smoke workflow

## Example setup flow

From `ai-copilot-platform`:

1. copy `.env.staging.github.example` to `.env.staging.github`
2. fill in real staging values
3. export `GITHUB_TOKEN` or `GH_TOKEN`
4. run `pnpm github:staging:configure`

Optional:

```powershell
pnpm github:staging:dispatch:deploy
pnpm github:staging:dispatch:smoke
```

## Why the staging values are not stored in the repo

The repo intentionally does not contain:

- live staging URLs
- staging smoke credentials
- deploy webhook tokens

That keeps the repo portable and avoids committing environment-specific secrets or unreachable local values such as `127.0.0.1`.

## Relationship to the local first environment

The local first environment is for developer machines.

The staging workflows run on GitHub-hosted runners, so they must target real staging URLs that those runners can access.

Do not copy local loopback values like `http://127.0.0.1:3000/api` into GitHub staging settings.
