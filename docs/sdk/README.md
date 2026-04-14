# Web, React & Angular SDKs

Packages are built from **`ai-copilot-platform/packages/`** and published as scoped npm modules under the **`@auto-no-mous/*`** namespace (see `docs/sdk-release.md` in the platform repo).

## Package matrix

| Package | Name | Role |
|---------|------|------|
| `packages/shared` | `@auto-no-mous/copilot-shared` | Shared types/utilities |
| `packages/web-sdk` | `@auto-no-mous/copilot-web` | Core client + **loader** entry points |
| `packages/react-sdk` | `@auto-no-mous/copilot-react` | React bindings |
| `packages/angular-sdk` | `@auto-no-mous/copilot-angular` | Angular library |

## Build

From `ai-copilot-platform` root:

```bash
pnpm build:sdk
```

This runs shared, then web, react, and angular builds in sequence (`package.json` script `build:sdk`).

## CDN loader

The install token API returns a **script snippet** pointing at a CDN loader (placeholder host `cdn.yourcopilot.ai` in current snippets). The web package builds an **IIFE** bundle for browsers (`packages/web-sdk` exports `./loader` and a browser build under `dist/browser`).

Example (from platform documentation):

```html
<script
  src="https://cdn.yourcopilot.ai/v1/loader.js"
  data-app-id="<APPLICATION_ID>"
  data-env="prod"
  data-install-token="<TOKEN>">
</script>
```

## npm initialization

Install token responses also include an **`npmSnippet`** such as `initCopilot({ appId, environment, installToken })` for programmatic bootstrap.

## Release automation

- Workflow: **`.github/workflows/release-sdks.yml`** in `ai-copilot-platform`
- Tag pattern: **`sdk-v*`**
- Requires **`NPM_TOKEN`** for npm publish
- Uploads CDN-ready **`loader.global.js`** artifact from the web SDK build output

## Runtime contract

Embedded clients ultimately call:

- **`GET /api/embed/config`** — validate install token; receive theme + feature flags
- **`POST /api/chat`** or **`GET /api/chat/stream`** — model inference (see [HTTP API reference](../api/README.md))

Always pass **`x-copilot-env`** and token headers as documented when using install-token auth.
