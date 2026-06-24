import { MODELS, type Model } from "../types";

interface SettingsPanelProps {
  model: Model;
  systemPrompt: string;
  apiKey: string;
  onModelChange: (model: Model) => void;
  onSystemPromptChange: (prompt: string) => void;
  onApiKeyChange: (key: string) => void;
  onClose: () => void;
}

/**
 * Collapsible settings drawer: pick the model, shape the assistant's persona
 * with a system prompt, and optionally paste an Anthropic key. The key uses a
 * password-style input and is kept in memory only (never persisted).
 */
export default function SettingsPanel({
  model,
  systemPrompt,
  apiKey,
  onModelChange,
  onSystemPromptChange,
  onApiKeyChange,
  onClose,
}: SettingsPanelProps) {
  return (
    <div className="border-b border-slate-800 bg-slate-900/80 px-4 py-4 backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-slate-100"
          >
            Done
          </button>
        </div>

        {/* Model picker */}
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-300">Model</span>
          <select
            value={model}
            onChange={(e) => onModelChange(e.target.value as Model)}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40"
          >
            {MODELS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        {/* System prompt */}
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-300">
            System prompt
          </span>
          <textarea
            value={systemPrompt}
            onChange={(e) => onSystemPromptChange(e.target.value)}
            rows={3}
            placeholder="Describe how the assistant should behave…"
            className="resize-y rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40"
          />
        </label>

        {/* Optional API key (password-style, in-memory only) */}
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-300">
            Anthropic API key{" "}
            <span className="font-normal text-slate-500">(optional)</span>
          </span>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="sk-ant-…  (leave blank to use the server's key)"
            autoComplete="off"
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40"
          />
          <span className="text-xs text-slate-500">
            Used only for your requests and never stored or persisted.
          </span>
        </label>
      </div>
    </div>
  );
}
