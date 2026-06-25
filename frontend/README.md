### 💬 Front End

A sleek, streaming chat UI built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**. It talks to the FastAPI backend in [`/api`](../api), which streams replies from **Claude** (Anthropic) token-by-token, ChatGPT-style.

## 🧭 Wait — where's the code?

The Next.js app lives at the **repository root** (`app/`, `package.json`, `next.config.mjs`, …), *not* inside this `frontend/` folder. That's intentional: Vercel deploys the Next.js frontend **and** the Python `/api` serverless function as a single project when they share one root. Splitting them across folders would mean two deploys and a lot of CORS sadness. 🙃

So this folder is just the signpost — the action is one level up. ☝️

## ✨ Features

- **Streaming responses** — watch answers appear word-by-word.
- **Session memory** — the whole conversation is sent each turn, so it remembers context.
- **Model picker** — `claude-sonnet-4-6` (add more in `app/types.ts` if your endpoint exposes them).
- **Custom persona** — edit the system prompt to change the assistant's vibe.
- **Bring-your-own-key** — paste an Anthropic key (password-masked, never stored) or rely on the server's `ANTHROPIC_API_KEY`.
- **Markdown rendering** — code blocks, lists, and emphasis look right.
- **Login gate** — every page and the API sit behind a shared password (see the root README).

## 🏃 Run it locally

You need **two terminals**: one for the API, one for the UI.

**Terminal 1 — backend** (from the repo root):

```bash
uv sync
export ANTHROPIC_API_KEY=sk-ant-your-key-here   # optional if you paste a key in the UI
uv run uvicorn api.index:app --reload    # http://localhost:8000
```

**Terminal 2 — frontend** (from the repo root):

```bash
npm install
export APP_PASSWORD=letmein               # optional — turns on the login gate
npm run dev                              # http://localhost:3000
```

Open **http://localhost:3000** and start chatting (you'll hit `/login` first if
`APP_PASSWORD` is set). In dev, the frontend
proxies every `/api/*` call to the backend on port 8000 (see
[`next.config.mjs`](../next.config.mjs)), so you can use the app from a single
tab. 🎉

## 🚀 Production build (optional sanity check)

```bash
npm run build && npm run start
```

For deploying to Vercel, see the **Deploying** section in the [root README](../README.md).
