// Shared types for the chat app.

export type Role = "user" | "assistant";

export interface ChatMessage {
  role: Role;
  content: string;
}

// Models offered in the settings dropdown. Keep the default first.
export const MODELS = [
  "gpt-4.1-mini",
  "gpt-4.1",
  "gpt-4.1-nano",
  "gpt-4o",
  "gpt-4o-mini",
  "gpt-5",
] as const;

export type Model = (typeof MODELS)[number];

export const DEFAULT_MODEL: Model = "gpt-4.1-mini";

export const DEFAULT_SYSTEM_PROMPT =
  "You are a helpful, friendly AI assistant. Be clear and concise.";
