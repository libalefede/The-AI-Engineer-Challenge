"""FastAPI backend for the AI Engineer Challenge chat app.

Exposes a single streaming chat endpoint that talks to the OpenAI Chat
Completions API. It is intentionally small so it can run both locally
(`uv run uvicorn api.index:app --reload`) and as a Vercel Python
serverless function (see `vercel.json`).
"""

import os
from typing import List, Literal, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from openai import OpenAI
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
    # Which OpenAI model to use. Defaults to a fast, widely-available model.
    model: str = "gpt-4.1-mini"
    # Optional per-request key. If omitted, we fall back to the server env var.
    api_key: Optional[str] = None


def _resolve_api_key(request_key: Optional[str]) -> str:
    """Prefer a key supplied by the request, else the server environment."""

    key = (request_key or "").strip() or os.getenv("OPENAI_API_KEY")
    if not key:
        raise HTTPException(
            status_code=400,
            detail=(
                "No OpenAI API key found. Set OPENAI_API_KEY on the server "
                "or paste a key into the app's settings."
            ),
        )
    return key


@app.get("/")
def root():
    return {"status": "ok"}


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/chat")
def chat(request: ChatRequest):
    """Stream a chat completion back to the client as plain-text chunks."""

    client = OpenAI(api_key=_resolve_api_key(request.api_key))

    # Prepend the persona prompt, then replay the conversation history.
    messages = [{"role": "system", "content": request.developer_message}]
    messages += [{"role": m.role, "content": m.content} for m in request.messages]

    def token_stream():
        try:
            stream = client.chat.completions.create(
                model=request.model,
                messages=messages,
                stream=True,
            )
            for chunk in stream:
                delta = chunk.choices[0].delta.content
                if delta:
                    yield delta
        except Exception as exc:  # surface a readable error to the UI
            yield f"\n\n[Error contacting OpenAI: {exc}]"

    return StreamingResponse(token_stream(), media_type="text/plain")
