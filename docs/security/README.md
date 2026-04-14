# Authentication and authorization

## Session authentication for the admin portal

- `SessionAuthGuard` is registered globally in `AuthModule`.
- Routes marked with `@Public()` bypass session enforcement.
- Session cookies protect `/api/auth/me` and the admin application APIs.

## OIDC support

The platform supports generic OIDC SSO.

Important variables:

- `OIDC_ISSUER_URL`
- `OIDC_INTERNAL_ISSUER_URL`
- `OIDC_CLIENT_ID`
- `OIDC_CLIENT_SECRET`
- `OIDC_REDIRECT_URI`
- `OIDC_SCOPES`

Key routes:

- `GET /api/auth/oidc/start`
- `GET /api/auth/oidc/callback`

The first environment uses local Keycloak as the OIDC provider.

## Developer login

For local development outside the first environment, the platform can use developer login through:

- `POST /api/auth/dev-login`

This is controlled by:

- `DEV_LOGIN_ENABLED`

In the generated first environment, this is intentionally disabled because the docs and smoke flows validate the real OIDC path.

## Chat and embed authentication

### API keys

Application API keys are stored hashed in `app_api_keys`.

Supported client headers:

- `Authorization: Bearer <key>`
- `x-copilot-api-key: <key>`

### Install tokens

Install tokens are issued per application and environment.

Supported client headers:

- `x-copilot-install-token`
- `x-copilot-env`

These are used by the widget and embed config flow.

## Domain allowlist

`applications.domain_allowlist` contains allowed hosts.

For install-token authentication, chat and embed flows compare the request `Origin` or `Referer` against this allowlist, including wildcard entries like `*.example.com`.

## Authorization model

`AccessService` enforces organization and application roles.

Common roles:

- `owner`
- `admin`
- `developer`
- `viewer`

Typical expectations:

- owner and admin manage tokens, credentials, and approvals
- owner, admin, and developer manage configuration and sources
- viewers mostly consume read-only operational pages

## Audit considerations

Sensitive operational actions record audit log entries, including:

- configuration changes
- token issuance
- API key creation and revocation
- source reindex requests
- tenant credential changes
- approval reviews

## Production hardening

Recommended production settings include:

- `COOKIE_SECURE=true`
- `AUTH_ALLOWED_EMAIL_DOMAINS` when needed
- secret-manager-backed rotation for `AUTH_SESSION_SECRET`
- properly scoped tenant credentials instead of broad shared provider keys
