# Authentication & authorization

## Session authentication (admin)

- **`SessionAuthGuard`** is registered globally in `AuthModule` (`APP_GUARD`).
- Routes marked **`@Public()`** skip session enforcement (health, metrics, OIDC, dev login, chat, embed).
- Session cookies back the **`/auth/me`** and admin **`/apps/**`** APIs.

### OIDC (enterprise SSO)

Configure standard OIDC variables (see platform `docs/auth-and-sso.md`):

- `OIDC_ISSUER_URL`, `OIDC_INTERNAL_ISSUER_URL` (split-horizon IdP access)
- `OIDC_CLIENT_ID`, `OIDC_CLIENT_SECRET`, `OIDC_REDIRECT_URI`, `OIDC_SCOPES`

Flows:

- `GET /api/auth/oidc/start` — begins redirect
- `GET /api/auth/oidc/callback` — exchanges code, establishes session

### Developer login

`POST /api/auth/dev-login` is **public** but should only be enabled in controlled environments (`DEV_LOGIN_ENABLED` pattern — confirm env flag name in `AuthService` / config in the platform repo).

### Production hardening (recommended)

- `COOKIE_SECURE=true`
- `AUTH_ALLOWED_EMAIL_DOMAINS` when restricting tenant access
- Rotate `AUTH_SESSION_SECRET` via secret manager

## Chat & embed authentication (host applications)

### API keys

Hashed keys stored in **`app_api_keys`**. Clients send:

- `Authorization: Bearer <key>` or
- `x-copilot-api-key: <key>`

Verified in `ChatController.authorizeChatRequest`.

### Install tokens

Short-lived tokens issued per **application** + **environment**. Clients send:

- `x-copilot-install-token`
- `x-copilot-env`: `dev` | `staging` | `prod`

### Domain allowlist

`applications.domain_allowlist` stores allowed **host** entries. For **install-token** auth, chat and embed endpoints compare **Origin** or **Referer** against the allowlist, supporting `*.example.com` suffix wildcards.

## Authorization (RBAC)

`AccessService` methods enforce:

- **Organization** membership and roles for onboarding and org-level APIs.
- **Application** membership for read APIs.
- **Application** role subsets for mutations (for example **owner/admin** for tokens and approvals, **owner/admin/developer** for configuration and sources).

## Audit

Sensitive actions in `AppsController` call `recordAuditLog` with actor from the authenticated user (or headers for service-style calls — see `actorFromRequest`).

## Related platform docs

Authoritative detail: `ai-copilot-platform/docs/auth-and-sso.md`.
