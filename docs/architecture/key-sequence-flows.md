# Key sequence flows

This chapter explains the three most important runtime flows using sequence diagrams.

## 1. Admin login through OIDC

```mermaid
sequenceDiagram
  actor User
  participant Admin as Admin Portal
  participant API as NestJS API
  participant IdP as Keycloak / OIDC Provider
  participant DB as PostgreSQL

  User->>Admin: Open /login
  User->>Admin: Click Continue with SSO
  Admin->>API: GET /api/auth/oidc/start
  API-->>Admin: Redirect to OIDC provider
  Admin->>IdP: Open login page
  User->>IdP: Submit credentials
  IdP-->>API: Redirect to /api/auth/oidc/callback with code
  API->>IdP: Exchange code for tokens
  API->>DB: Upsert user and memberships if needed
  API-->>Admin: Set session cookie and redirect to /apps
  Admin-->>User: Applications page loads
```

## 2. Widget bootstrap with install token

```mermaid
sequenceDiagram
  actor EndUser
  participant Host as Host Application
  participant Widget as Web SDK / Loader
  participant API as NestJS API
  participant DB as PostgreSQL

  EndUser->>Host: Open host page
  Host->>Widget: Load script tag or initCopilot()
  Widget->>API: GET /api/embed/config?appId&environment&token
  API->>DB: Verify install token and load config
  API-->>Widget: Theme and feature flags
  Widget-->>EndUser: Floating button and drawer initialized
```

## 3. Chat request with approval lifecycle

```mermaid
sequenceDiagram
  actor EndUser
  participant Widget as Widget / SDK
  participant API as ChatController
  participant RAG as RagService
  participant LLM as LlmRouterService
  participant DB as PostgreSQL
  participant Admin as Admin Portal
  actor Reviewer

  EndUser->>Widget: Submit TEST or AGENT request
  Widget->>API: POST /api/chat
  API->>RAG: Embed and retrieve relevant chunks
  RAG->>DB: Search application-scoped chunks
  RAG-->>API: Context chunks
  API->>LLM: Generate reply
  LLM-->>API: Draft response
  API->>DB: Persist conversation and message
  API->>DB: Create approval request and agent run updates
  API-->>Widget: Reply plus approvalRequestId
  Reviewer->>Admin: Open Conversations / Approval Queue
  Admin->>API: GET /api/chat/approvals
  Reviewer->>Admin: Approve or Reject
  Admin->>API: POST /api/chat/approvals/:id/review
  API->>DB: Update approval and agent run status
  API-->>Admin: Updated approval state
```

## Why these flows matter

These three flows cover the majority of the platform behavior a new engineer needs to understand:

- how operators get into the system
- how the widget boots inside a customer application
- how the AI runtime, approvals, and operations UI connect together
