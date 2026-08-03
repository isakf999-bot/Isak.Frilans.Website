"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { CHAT_STARTERS, type ChatMessage } from "@/lib/chatKnowledge";

type UiMessage = ChatMessage & { id: string };

const WELCOME: UiMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hej! Jag är IsakWebs assistent. Fråga om priser, paket, om Isak kan modernisera din gamla sajt — eller vad som ingår. Jag svarar utifrån innehållet på hemsidan.",
};

export function Chatbot() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<UiMessage[]>([WELCOME]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    inputRef.current?.focus();
  }, [open, messages, pending]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || pending) return;

    const userMsg: UiMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content,
    };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setPending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      const reply =
        data.reply?.trim() ||
        data.error ||
        "Jag kunde inte svara just nu. Prova /kontakt eller mejla info@isakweb.se.";

      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: "assistant", content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content:
            "Nätverksfel — prova igen, eller gå till kontaktformuläret.",
        },
      ]);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[60] flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open ? (
        <section
          id={panelId}
          role="dialog"
          aria-label="IsakWeb-assistenten"
          aria-modal="false"
          className="pointer-events-auto flex h-[min(34rem,calc(100svh-6.5rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-canvas shadow-lift"
        >
          <header className="flex items-start justify-between gap-3 border-b border-line bg-brand px-4 py-3.5 text-white">
            <div>
              <p className="text-sm font-semibold tracking-tight">
                IsakWeb-assistenten
              </p>
              <p className="mt-0.5 text-xs text-white/75">
                Svar utifrån hemsidans innehåll
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-1 text-lg leading-none text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Stäng chatten"
            >
              ×
            </button>
          </header>

          <div
            ref={listRef}
            className="flex-1 space-y-3 overflow-y-auto bg-mist/40 px-3 py-4"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "rounded-br-md bg-brand text-white"
                      : "rounded-bl-md border border-line bg-canvas text-ink shadow-card"
                  }`}
                >
                  {linkify(msg.content)}
                </div>
              </div>
            ))}
            {pending ? (
              <p className="text-xs text-muted">Assistenten skriver…</p>
            ) : null}
          </div>

          {messages.length <= 2 ? (
            <div className="flex flex-wrap gap-2 border-t border-line bg-canvas px-3 py-3">
              {CHAT_STARTERS.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  disabled={pending}
                  onClick={() => void send(starter)}
                  className="rounded-pill border border-line bg-surface px-3 py-1.5 text-left text-xs font-medium text-ink transition-colors hover:border-brand hover:text-brand disabled:opacity-50"
                >
                  {starter}
                </button>
              ))}
            </div>
          ) : null}

          <form
            className="border-t border-line bg-canvas p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <label className="sr-only" htmlFor={`${panelId}-input`}>
              Din fråga
            </label>
            <div className="flex items-end gap-2">
              <textarea
                id={`${panelId}-input`}
                ref={inputRef}
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send(input);
                  }
                }}
                placeholder="Fråga om pris, paket, gammal sajt…"
                className="min-h-[2.75rem] flex-1 resize-none rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-brand"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                className="rounded-xl bg-brand px-3.5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark disabled:opacity-40"
              >
                Skicka
              </button>
            </div>
            <p className="mt-2 text-[11px] text-muted">
              Behöver du Isak direkt?{" "}
              <Link href="/kontakt" className="font-medium text-brand hover:underline">
                Kontakt
              </Link>
            </p>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-pill bg-brand px-4 py-3 text-sm font-semibold text-white shadow-brand transition-all duration-200 ease-out hover:bg-brand-dark hover:shadow-lift active:scale-[0.98]"
      >
        <ChatIcon />
        {open ? "Stäng" : "Fråga assistenten"}
      </button>
    </div>
  );
}

function ChatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-[18px] w-[18px]"
    >
      <path d="M21 12a8 8 0 0 1-11.7 7.1L3 21l1.9-6.3A8 8 0 1 1 21 12Z" />
    </svg>
  );
}

/** Gör interna /sökvägar och mejl klickbara i svarstext. */
function linkify(text: string) {
  const parts = text.split(/(\/[a-z0-9\-/#]+|info@isakweb\.se)/gi);
  return parts.map((part, i) => {
    if (/^\/[a-z0-9\-/#]+$/i.test(part)) {
      return (
        <Link
          key={`${part}-${i}`}
          href={part.split("#")[0] || "/"}
          className="font-medium underline underline-offset-2"
        >
          {part}
        </Link>
      );
    }
    if (/^info@isakweb\.se$/i.test(part)) {
      return (
        <a
          key={`${part}-${i}`}
          href={`mailto:${part}`}
          className="font-medium underline underline-offset-2"
        >
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
