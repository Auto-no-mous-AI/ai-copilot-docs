# Web, React & Angular SDKs

The SDK story now has two layers:

- `ai-copilot-platform/packages/*`: runtime source used by the main product monorepo
- standalone repos: `ai-copilot-sdk`, `ai-copilot-sdk-react`, and `ai-copilot-sdk-angular` for package-specific CI, release, and docs

## Package matrix

| Package | Name | Role |
|---------|------|------|
| `packages/shared` | `@auto-no-mous/copilot-shared` | Shared types/utilities |
| `packages/web-sdk` | `@auto-no-mous/copilot-web` | Core client plus loader entry points |
| `packages/react-sdk` | `@auto-no-mous/copilot-react` | React bindings |
| `packages/angular-sdk` | `@auto-no-mous/copilot-angular` | Angular library |

## Build from the platform repo

From `ai-copilot-platform` root:

```bash
pnpm build:sdk
```

This runs shared, then web, react, and angular builds in sequence.

## Build from the standalone repos

Use these when working on package-specific CI, npm publishing, or repo-local docs:

- `ai-copilot-sdk`
- `ai-copilot-sdk-react`
- `ai-copilot-sdk-angular`

Each standalone repo has its own `README.md`, `docs/releasing.md`, CI workflow, and release workflow.

## CDN loader

The install token API returns a script snippet pointing at a CDN loader. The web package builds an IIFE bundle for browsers, and the standalone web SDK repo carries the same loader contract for package-specific release work.

Example:

```html
<script
  src="https://cdn.yourcopilot.ai/v1/loader.js"
  data-app-id="<APPLICATION_ID>"
  data-env="prod"
  data-install-token="<TOKEN>">
</script>
```

## npm initialization

Install token responses also include an `npmSnippet` such as `initCopilot({ appId, environment, installToken })` for programmatic bootstrap.

## Release automation

There are now two release paths.

### Platform repo release path

- Workflow: `.github/workflows/release-sdks.yml` in `ai-copilot-platform`
- Used when coordinating SDK artifacts directly from the main product repo

### Standalone repo release path

- Workflow: `.github/workflows/release.yml` in each SDK repo
- Used when publishing the package owned by that repository
- Requires `NPM_TOKEN` for npm publish
- Generates a GitHub Release with grouped release notes

## Runtime contract

Embedded clients ultimately call:

- `GET /api/embed/config` to validate install token and receive theme plus feature flags
- `POST /api/chat` or `GET /api/chat/stream` for model inference

Always pass `x-copilot-env` and token headers as documented when using install-token auth.
