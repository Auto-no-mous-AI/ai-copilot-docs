# API request and response examples

This chapter gives example payloads for the most important admin and chat endpoints.

Base URL in local first environment:

`http://127.0.0.1:3000/api`

## 1. Read auth config

### Request

```http
GET /api/auth/config
```

### Example response

```json
{
  "oidcEnabled": true,
  "devLoginEnabled": false,
  "adminPortalUrl": "http://127.0.0.1:4200/apps",
  "currentUser": null
}
```

## 2. Bootstrap the first organization and app

### Request

```http
POST /api/onboarding/bootstrap
Content-Type: application/json
Cookie: <session-cookie>
```

```json
{
  "organizationName": "Acme Procurement",
  "organizationSlug": "acme-procurement",
  "applicationName": "Supplier Workspace Copilot",
  "framework": "angular"
}
```

### Example response

```json
{
  "organization": {
    "id": "org_123",
    "name": "Acme Procurement",
    "slug": "acme-procurement"
  },
  "application": {
    "id": "app_123",
    "name": "Supplier Workspace Copilot",
    "framework": "angular"
  }
}
```

## 3. List accessible applications

### Request

```http
GET /api/apps
Cookie: <session-cookie>
```

### Example response

```json
[
  {
    "id": "app_123",
    "organizationId": "org_123",
    "name": "Supplier Portal Copilot",
    "framework": "angular",
    "domainAllowlist": ["127.0.0.1", "localhost", "demo.autonomous.ai"]
  }
]
```

## 4. Save copilot configuration

### Request

```http
PUT /api/apps/app_123/configuration
Content-Type: application/json
Cookie: <session-cookie>
```

```json
{
  "repoProvider": "github",
  "repoUrl": "https://github.com/Auto-no-mous-AI/ai-copilot-platform",
  "branch": "main",
  "docsUrl": "https://demo.autonomous.ai/docs/supplier-portal",
  "theme": {
    "primary": "#1338be",
    "icon": "spark",
    "drawerWidth": 420,
    "placement": "right"
  },
  "features": {
    "ask": true,
    "test": true,
    "agent": true
  }
}
```

### Example response

```json
{
  "applicationId": "app_123",
  "repoProvider": "github",
  "repoUrl": "https://github.com/Auto-no-mous-AI/ai-copilot-platform",
  "branch": "main",
  "docsUrl": "https://demo.autonomous.ai/docs/supplier-portal",
  "theme": {
    "primary": "#1338be",
    "icon": "spark",
    "drawerWidth": 420,
    "placement": "right"
  },
  "features": {
    "ask": true,
    "test": true,
    "agent": true
  }
}
```

## 5. Add a source

### Request

```http
POST /api/apps/app_123/sources
Content-Type: application/json
Cookie: <session-cookie>
```

```json
{
  "sourceType": "docs",
  "sourceUrl": "https://demo.autonomous.ai/docs/supplier-portal"
}
```

### Example response

```json
{
  "id": "source_123",
  "applicationId": "app_123",
  "sourceType": "docs",
  "sourceUrl": "https://demo.autonomous.ai/docs/supplier-portal",
  "branch": null,
  "isActive": true
}
```

## 6. Trigger reindex

### Request

```http
POST /api/apps/app_123/sources/source_123/reindex
Cookie: <session-cookie>
```

### Example response

```json
{
  "success": true,
  "ingestionJob": {
    "id": "job_123",
    "status": "queued"
  }
}
```

## 7. Create an install token

### Request

```http
POST /api/apps/app_123/install-token
Content-Type: application/json
Cookie: <session-cookie>
```

```json
{
  "environment": "prod"
}
```

### Example response

```json
{
  "appId": "app_123",
  "environment": "prod",
  "expiresInSeconds": 3600,
  "expiresAt": "2026-04-15T09:10:00.000Z",
  "token": "itkn_xxx",
  "tokenPreview": "12ab34cd56",
  "scriptSnippet": "<script src=\"https://cdn.yourcopilot.ai/v1/loader.js\" data-app-id=\"app_123\" data-env=\"prod\" data-install-token=\"itkn_xxx\"></script>",
  "npmSnippet": "initCopilot({ appId: 'app_123', environment: 'prod', installToken: 'itkn_xxx' })"
}
```

## 8. Create an application API key

### Request

```http
POST /api/apps/app_123/api-keys
Content-Type: application/json
Cookie: <session-cookie>
```

```json
{
  "name": "playwright-approve-20260414",
  "expiresInDays": 7
}
```

### Example response

```json
{
  "applicationId": "app_123",
  "key": {
    "id": "key_123",
    "name": "playwright-approve-20260414",
    "keyPrefix": "cp_live_abc",
    "expiresAt": "2026-04-21T09:10:00.000Z",
    "revokedAt": null
  },
  "apiKey": "cp_live_secret_value"
}
```

## 9. Read usage timeseries

### Request

```http
GET /api/apps/app_123/usage/timeseries?days=30&bucket=day
Cookie: <session-cookie>
```

### Example response

```json
{
  "applicationId": "app_123",
  "period": "30d",
  "bucket": "day",
  "points": [
    { "bucketStart": "2026-04-10T00:00:00.000Z", "requests": 12, "inputTokens": 1400, "outputTokens": 2100, "costUsd": 0.42 }
  ],
  "modeBreakdown": [
    { "mode": "ask", "requests": 42 },
    { "mode": "test", "requests": 18 },
    { "mode": "agent", "requests": 7 }
  ]
}
```

## 10. Send a chat request with API key auth

### Request

```http
POST /api/chat
Content-Type: application/json
x-copilot-api-key: cp_live_secret_value
```

```json
{
  "applicationId": "app_123",
  "endUserId": "user-42",
  "mode": "ask",
  "message": "How do I embed the widget into our supplier portal?",
  "model": "gpt-4.1-mini"
}
```

### Example response

```json
{
  "conversationId": "conv_123",
  "messageId": "msg_456",
  "reply": "Use the generated loader script or the web SDK, then configure the install token and theme.",
  "provider": "openai",
  "model": "gpt-4.1-mini",
  "citations": [
    {
      "chunkId": "chunk_1",
      "title": "Loader install",
      "score": 0.91
    }
  ],
  "requiresApproval": false
}
```

## 11. Send a TEST or AGENT chat request that creates approval

### Request

```http
POST /api/chat
Content-Type: application/json
x-copilot-api-key: cp_live_secret_value
```

```json
{
  "applicationId": "app_123",
  "endUserId": "ops-runner",
  "mode": "agent",
  "message": "Validate the supplier registration flow and pause before browser execution.",
  "model": "gpt-4.1-mini"
}
```

### Example response

```json
{
  "conversationId": "conv_123",
  "messageId": "msg_789",
  "reply": "Planner created a run and paused because the requested action needs approval.",
  "provider": "openai",
  "model": "gpt-4.1-mini",
  "requiresApproval": true,
  "approvalRequestId": "approval_123",
  "agentRunId": "run_123"
}
```

## 12. Read the approval queue

### Request

```http
GET /api/chat/approvals?applicationId=app_123&status=pending
Cookie: <session-cookie>
```

### Example response

```json
{
  "applicationId": "app_123",
  "approvals": [
    {
      "id": "approval_123",
      "mode": "agent",
      "summary": "AGENT approval required: Validate the supplier registration flow and pause before browser...",
      "status": "pending",
      "conversationId": "conv_123",
      "agentRunId": "run_123",
      "requestedBy": "ops-runner"
    }
  ]
}
```

## 13. Review an approval

### Request

```http
POST /api/chat/approvals/approval_123/review
Content-Type: application/json
Cookie: <session-cookie>
```

```json
{
  "decision": "approved",
  "note": "Approved during daily operations review."
}
```

### Example response

```json
{
  "approvalRequestId": "approval_123",
  "status": "approved",
  "reviewedAt": "2026-04-14T09:10:00.000Z",
  "reviewNote": "Approved during daily operations review."
}
```

## 14. Resolve embed config with install token

### Request

```http
GET /api/embed/config?appId=app_123&environment=prod&token=itkn_xxx
Origin: https://demo.autonomous.ai
```

### Example response

```json
{
  "applicationId": "app_123",
  "theme": {
    "primary": "#1338be",
    "icon": "spark",
    "drawerWidth": 420,
    "placement": "right"
  },
  "features": {
    "ask": true,
    "test": true,
    "agent": true
  }
}
```

## 15. Example SSE stream shape

### Request

```http
GET /api/chat/stream?applicationId=app_123&message=Hello&mode=ask
x-copilot-api-key: cp_live_secret_value
```

### Example event sequence

```text
event: delta
data: {"text":"Hello"}

event: delta
data: {"text":" from the copilot"}

event: done
data: {"conversationId":"conv_123","citations":[],"requiresApproval":false}
```

## Notes for developers

- these are representative examples based on the current implementation and seeded data patterns
- field names can evolve, so verify against `ai-copilot-platform` before using these examples as hard contracts in third-party integrations
- use this chapter together with the route inventory in [HTTP API reference](README.md)
