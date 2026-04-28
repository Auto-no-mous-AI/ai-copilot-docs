# Enterprise Readiness Checklist

Use this checklist before positioning an environment or repository as enterprise ready.

- Repository has `SECURITY.md`, `CODEOWNERS`, `CHANGELOG.md`, license clarity, PR template, and issue templates.
- CI runs build, tests, dependency checks, secret scanning, and vulnerability scanning.
- Runtime services use explicit CORS allowlists, secure cookies, structured logs, and request IDs.
- Auth uses verified OIDC tokens, restricted return URLs, and disabled dev login outside local/test.
- Tenant access controls are covered by regression tests.
- Kubernetes and Terraform are validated before deploy.
- Production deployments use protected environments and immutable artifacts.
- Observability includes SLOs, alerts, dashboards, and runbooks.
- Compliance evidence is linked from the security repo.
