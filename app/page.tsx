"use client";

import { useEffect, useRef, useState } from "react";
import MessageBubble from "./components/MessageBubble";
import SettingsPanel from "./components/SettingsPanel";
import ChatInput from "./components/ChatInput";
import {
  DEFAULT_MODEL,
  DEFAULT_SYSTEM_PROMPT,
  MODELS,
  type ChatMessage,
  type Model,
} from "./types";

// A few starter prompts shown on the empty state.
const SUGGESTIONS = [
  "Explain object-oriented programming to a beginner",
  "Write a 100-word story about a lonely robot",
  "Summarize the plot of Romeo and Juliet in 3 bullets",
  "Help me plan a focused 1-hour study session",
];

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState<Model>(DEFAULT_MODEL);
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const [apiKey, setApiKey] = useState(""); // in-memory only
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Restore non-sensitive settings from a previous visit. Ignore a stale saved
  // model that's no longer in the list (e.g. left over from an older version).
  useEffect(() => {
    const savedModel = localStorage.getItem("model");
    const savedPrompt = localStorage.getItem("systemPrompt");
    if (savedModel && (MODELS as readonly string[]).includes(savedModel)) {
      setModel(savedModel as Model);
    }
    if (savedPrompt) setSystemPrompt(savedPrompt);
  }, []);

  // Persist model + system prompt (but never the API key).
  useEffect(() => {
    localStorage.setItem("model", model);
  }, [model]);
  useEffect(() => {
    localStorage.setItem("systemPrompt", systemPrompt);
  }, [systemPrompt]);

  // Keep the transcript pinned to the latest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    setError(null);
    const userMessage: ChatMessage = { role: "user", content: trimmed };
    // Snapshot the conversation we send to the API (history + new turn).
    const conversation = [...messages, userMessage];

    // Show the user turn and a placeholder assistant turn to stream into.
    setMessages([...conversation, { role: "assistant", content: "" }]);
    setInput("");
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: conversation,
          developer_message: systemPrompt,
          model,
          api_key: apiKey || undefined,
        }),
      });

      // Session expired or not logged in — bounce to the login page.
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }

      if (!res.ok || !res.body) {
        const detail = await res
          .json()
          .then((d) => d.detail as string)
          .catch(() => `Request failed (${res.status})`);
        throw new Error(detail);
      }

      // Read the streamed plain-text body and append tokens as they arrive.
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: acc };
          return next;
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
      // Drop the empty assistant placeholder if nothing streamed in.
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.content === "") {
          return prev.slice(0, -1);
        }
        return prev;
      });
    } finally {
      setIsStreaming(false);
    }
  }

  async function handleLogout() {
    await fetch("/auth/logout", { method: "POST" }).catch(() => {});
    window.location.href = "/login";
  }

  const lastMessage = messages[messages.length - 1];
  const waitingForFirstToken =
    isStreaming &&
    lastMessage?.role === "assistant" &&
    lastMessage.content === "";

  return (
    <main className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900/60 px-4 py-3 backdrop-blur sm:px-6">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <h1 className="text-base font-semibold text-slate-100">
              AI Engineer Challenge
            </h1>
            <span className="hidden rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400 sm:inline">
              {model}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                onClick={() => {
                  setMessages([]);
                  setError(null);
                }}
                className="rounded-md px-3 py-1.5 text-sm text-slate-300 transition hover:bg-slate-800"
              >
                New chat
              </button>
            )}
            <button
              onClick={() => setShowSettings((s) => !s)}
              className="rounded-md px-3 py-1.5 text-sm text-slate-300 transition hover:bg-slate-800"
              aria-expanded={showSettings}
            >
              ⚙️ Settings
            </button>
            <button
              onClick={handleLogout}
              className="rounded-md px-3 py-1.5 text-sm text-slate-300 transition hover:bg-slate-800"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {showSettings && (
        <SettingsPanel
          model={model}
          systemPrompt={systemPrompt}
          apiKey={apiKey}
          onModelChange={setModel}
          onSystemPromptChange={setSystemPrompt}
          onApiKeyChange={setApiKey}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Transcript */}
      <div
        ref={scrollRef}
        className="scrollbar-thin flex-1 overflow-y-auto px-4 py-6 sm:px-6"
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          {messages.length === 0 ? (
            <EmptyState onPick={sendMessage} />
          ) : (
            messages.map((m, i) => <MessageBubble key={i} message={m} />)
          )}

          {waitingForFirstToken && <TypingIndicator />}

          {error && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Composer */}
      <ChatInput
        value={input}
        disabled={isStreaming}
        onChange={setInput}
        onSend={() => sendMessage(input)}
      />
    </main>
  );
}

function EmptyState({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="flex flex-col items-center gap-6 py-12 text-center">
      <div className="text-5xl">💬</div>
      <div>
        <h2 className="text-xl font-semibold text-slate-100">
          Start a conversation
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Powered by FastAPI + Claude. Try one of these, or ask anything.
        </p>
      </div>
      <div className="grid w-full max-w-xl grid-cols-1 gap-2 sm:grid-cols-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onPick(s)}
            className="rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-brand-500 hover:bg-slate-800"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 pl-11 text-slate-400">
      <span className="h-2 w-2 animate-blink rounded-full bg-slate-400 [animation-delay:0s]" />
      <span className="h-2 w-2 animate-blink rounded-full bg-slate-400 [animation-delay:0.2s]" />
      <span className="h-2 w-2 animate-blink rounded-full bg-slate-400 [animation-delay:0.4s]" />
    </div>
  );
}
