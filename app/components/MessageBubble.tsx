import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage } from "../types";

/**
 * A single chat bubble. User messages sit on the right with the brand accent;
 * assistant messages sit on the left on a dark card and render Markdown so
 * code blocks, lists, and emphasis look good.
 */
export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-[85%] gap-3 ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div
          className={`mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full text-sm font-semibold ${
            isUser
              ? "bg-brand-600 text-white"
              : "bg-slate-700 text-brand-400"
          }`}
          aria-hidden
        >
          {isUser ? "You" : "AI"}
        </div>

        {/* Bubble */}
        <div
          className={`rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-sm ${
            isUser
              ? "bg-brand-600 text-white"
              : "border border-slate-700/70 bg-slate-800/70 text-slate-100"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none break-words prose-pre:bg-slate-900/80 prose-pre:border prose-pre:border-slate-700">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
