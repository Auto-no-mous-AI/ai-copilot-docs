# Chat, RAG, LLM & approvals

## Chat modes

| Mode | Behavior (summary) |
|------|---------------------|
| `ask` | Standard Q&A with RAG context |
| `test` | Elevated — response still generated, but an **approval request** is recorded |
| `agent` | Creates an **agent run** with steps (planner → navigator → human approval or validator); **approval request** for test/agent |

Implementation: `ChatController` in `services/api/src/chat/chat.controller.ts`.

## Retrieval (RAG)

1. User message is embedded via `RagService.embed` (OpenAI embeddings when `OPENAI_API_KEY` is set; otherwise deterministic fallback).
2. `PlatformRepository.searchRelevantChunks` performs vector similarity against stored embeddings for the **application**.
3. Retrieved chunks are passed into `LlmRouterService.generateReply` as **system context** in addition to conversation history.

## LLM routing

`LlmRouterService` resolves the target **provider** and **model** from:

- Platform **model catalog** (`model_providers`) via `resolveModelRoute`, or
- Inference from the requested model string.

Supported providers in code paths include **OpenAI**, **Anthropic**, **Gemini**, **Ollama**, and **custom** OpenAI-compatible endpoints. Credentials resolve in order: **tenant credential** for the org/app vs **environment** default API keys (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, `CUSTOM_LLM_API_KEY`).

On provider failure, the service returns a **user-visible error string** rather than throwing in some branches (see `generateReply` try/catch).

## Streaming

`GET /api/chat/stream` uses **Server-Sent Events** (`text/event-stream`). The server chunks the model output into artificial **delta** events, then emits a **done** event with citations and approval metadata. Errors emit an `error` event payload.

## Rate limiting

`ChatRateLimiterService` enforces per-application limits using Redis when enabled via environment variables (`CHAT_RATE_LIMIT_*`).

## Human approvals

- Table: **`approval_requests`** (migration `0003_approval_requests.sql`).
- Created when mode is `test` or `agent` after a successful generation.
- Admin **owner/admin** roles review via `POST /api/chat/approvals/:id/review`.
- On resolution, agent runs may receive a synthetic **`approval_resolution`** step and run status updates (`succeeded` vs `cancelled`).

## Usage metering

Each chat records **usage_events** for request count and token-in/token-out estimates (rough token estimate from character length in controller).
