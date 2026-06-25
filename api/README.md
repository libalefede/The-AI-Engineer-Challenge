# 🧠 Claude Chat API Backend

A tiny [FastAPI](https://fastapi.tiangolo.com/) service that proxies chat
requests to Anthropic's [Claude Messages API](https://docs.claude.com/) and
**streams** the answer back token-by-token. It powers the Next.js frontend in
this repo and runs happily both locally and as a Vercel Python serverless
function.

## Prerequisites

- [`uv`](https://github.com/astral-sh/uv) package manager (`pip install uv`)
- `uv` provisions Python 3.12 automatically — no separate interpreter needed
- An Anthropic API key (used either via `ANTHROPIC_API_KEY` or passed per-request)

## Setup & running locally

All commands assume you're at the repository root.

```bash
# 1. Install dependencies into a uv-managed .venv
uv sync

# 2. Give it your key (or paste one into the app UI later)
export ANTHROPIC_API_KEY=sk-ant-your-key-here

# 3. Start the server with auto-reload
uv run uvicorn api.index:app --reload
```

The API now listens on `http://localhost:8000`.

> **Using a gateway in front of Claude?** Set `ANTHROPIC_BASE_URL` (e.g. an
> Azure API Management URL like `https://…azure-api.net/claude/anthropic`) and
> let `ANTHROPIC_API_KEY` hold the gateway's **subscription key**. The SDK then
> sends it as the `subscription-key` query parameter, and `model` should be the
> gateway's **deployment name**.

> Stuck on "Address already in use"? Free port 8000 with
> `lsof -ti:8000 | xargs kill -9`.

## API endpoints

### `POST /api/chat`

Streams a chat completion as `text/plain` chunks.

**Request body**

```json
{
  "messages": [
    { "role": "user", "content": "Hello!" },
    { "role": "assistant", "content": "Hi there!" },
    { "role": "user", "content": "Tell me a joke." }
  ],
  "developer_message": "You are a witty stand-up comedian.",
  "model": "claude-sonnet-4-6",
  "api_key": "sk-ant-... (optional — overrides ANTHROPIC_API_KEY)"
}
```

| Field               | Required | Default                                  | Notes                                            |
| ------------------- | -------- | ---------------------------------------- | ------------------------------------------------ |
| `messages`          | ✅       | —                                        | Full conversation so the model has session memory |
| `developer_message` | ❌       | `"You are a helpful, friendly AI assistant."` | The Claude `system` prompt                   |
| `model`             | ❌       | `"claude-sonnet-4-6"`                    | A Claude model ID, or your gateway's deployment name |
| `api_key`           | ❌       | server's `ANTHROPIC_API_KEY`             | Per-request override; never stored               |

**Response** — a streamed plain-text body. Read it incrementally on the client
to render tokens as they arrive.

Under the hood this calls `client.messages.stream(...)` with the official
[`anthropic`](https://github.com/anthropics/anthropic-sdk-python) SDK, passing
`developer_message` as Claude's top-level `system` prompt and the conversation
as alternating user/assistant turns.

### `GET /api/health` and `GET /`

Both return `{"status": "ok"}` for quick liveness checks.

## Interactive docs

With the server running, explore the auto-generated docs at:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Test it with curl

```bash
curl -N -X POST http://127.0.0.1:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Say hi in one sentence."}]}'
```

The `-N` flag disables buffering so you can watch the response stream in.

## Notes

- **CORS** is wide open (`*`) for painless local + preview development. Lock it
  down to your own domain in `index.py` for production.
- **Errors** from Anthropic are streamed back inline as `[Error contacting Anthropic: ...]`
  so they surface directly in the chat UI; a missing key returns HTTP 400.
- The deployed app also sits behind a **login gate** — see the root README for
  the `APP_PASSWORD` setup.
