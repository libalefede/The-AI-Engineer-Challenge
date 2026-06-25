// Shared types for the chat app.

export type Role = "user" | "assistant";

export interface ChatMessage {
  role: Role;
  content: string;
}

// Claude models offered in the settings dropdown. Keep the default first.
// This is the deployment available through the configured gateway; add more
// here if your endpoint exposes them.
export const MODELS = ["claude-sonnet-4-6"] as const;

export type Model = (typeof MODELS)[number];

export const DEFAULT_MODEL: Model = "claude-sonnet-4-6";

export const DEFAULT_SYSTEM_PROMPT =
  "You are a helpful, friendly AI assistant. Be clear and concise.";
