// Shared types for the chat app.

export type Role = "user" | "assistant";

export interface ChatMessage {
  role: Role;
  content: string;
}

// Claude models offered in the settings dropdown. Keep the default first.
export const MODELS = [
  "claude-opus-4-8",
  "claude-sonnet-4-6",
  "claude-haiku-4-5",
] as const;

export type Model = (typeof MODELS)[number];

export const DEFAULT_MODEL: Model = "claude-opus-4-8";

export const DEFAULT_SYSTEM_PROMPT =
  "You are a helpful, friendly AI assistant. Be clear and concise.";
