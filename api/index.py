"""FastAPI backend for the AI Engineer Challenge chat app.

Exposes a single streaming chat endpoint that talks to Anthropic's Claude
Messages API. It is intentionally small so it can run both locally
(`uv run uvicorn api.index:app --reload`) and as a Vercel Python
serverless function (see `vercel.json`).
"""

import os
from typing import List, Literal, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
import anthropic
from dotenv import load_dotenv

# Load variables from a local .env file when developing.
load_dotenv()

app = FastAPI(title="AI Engineer Challenge API")

# Allow the browser frontend to call the API from any origin. For a real
# product you'd lock this down to your own domain, but "*" keeps local dev
# and Vercel preview deployments friction-free for this challenge.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cap the response length. We stream, so this is a safety ceiling rather than
# an expected size — plenty of headroom for chat-style answers.
MAX_TOKENS = 8192

# Optional custom endpoint. Set this to talk to a gateway in front of Claude
# (e.g. an Azure API Management proxy) instead of api.anthropic.com. When set,
# the key is treated as the gateway's `subscription-key` query parameter.
ANTHROPIC_BASE_URL = os.getenv("ANTHROPIC_BASE_URL")


class Message(BaseModel):
    """A single turn in the conversation."""

    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    """Payload sent by the frontend for each chat request."""

    # Full conversation so the assistant has memory within the session.
    messages: List[Message] = Field(..., min_length=1)
    # The "system"/persona prompt that shapes the assistant's behaviour.
    developer_message: str = "You are a helpful, friendly AI assistant."
    # Which Claude model / deployment to use.
    model: str = "claude-sonnet-4-6"
    # Optional per-request key. If omitted, we fall back to the server env var.
    api_key: Optional[str] = None


def _build_client(request_key: Optional[str]) -> anthropic.Anthropic:
    """Build an Anthropic client, honouring an optional gateway base URL.

    The key comes from the request (if supplied) or the server environment.
    When ANTHROPIC_BASE_URL points at a gateway, the key is also sent as the
    `subscription-key` query parameter that the gateway expects.
    """

    key = (request_key or "").strip() or os.getenv("ANTHROPIC_API_KEY")
    if not key:
        raise HTTPException(
            status_code=400,
            detail=(
                "No API key found. Set ANTHROPIC_API_KEY on the server "
                "or paste a key into the app's settings."
            ),
        )

    if ANTHROPIC_BASE_URL:
        return anthropic.Anthropic(
            api_key=key,
            base_url=ANTHROPIC_BASE_URL,
            default_query={"subscription-key": key},
        )
    return anthropic.Anthropic(api_key=key)


@app.get("/")
def root():
    return {"status": "ok"}


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/chat")
def chat(request: ChatRequest):
    """Stream a chat completion back to the client as plain-text chunks."""

    client = _build_client(request.api_key)

    # Claude takes the persona as a top-level `system` string and the
    # conversation as alternating user/assistant turns.
    messages = [{"role": m.role, "content": m.content} for m in request.messages]

    def token_stream():
        try:
            with client.messages.stream(
                model=request.model,
                max_tokens=MAX_TOKENS,
                system=request.developer_message,
                messages=messages,
            ) as stream:
                for text in stream.text_stream:
                    yield text
        except Exception as exc:  # surface a readable error to the UI
            yield f"\n\n[Error contacting Anthropic: {exc}]"

    return StreamingResponse(token_stream(), media_type="text/plain")
