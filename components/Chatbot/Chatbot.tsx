"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { CHAT_STARTERS, type ChatMessage } from "@/lib/chatKnowledge";

type UiMessage = ChatMessage & { id: string };

const WELCOME: UiMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hej! Jag är Isak. Fråga om priser, vad som ingår i paketen, redesign eller något annat — jag svarar utifrån det som står på hemsidan.",
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

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
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
    <>
      {open ? (
        <section
          id={panelId}
          role="dialog"
          aria-label="Chatta med Isak"
          aria-modal="true"
          className="pointer-events-auto fixed inset-0 z-[60] flex flex-col overflow-hidden border-0 bg-canvas sm:inset-auto sm:right-6 sm:bottom-[5.5rem] sm:h-[min(34rem,calc(100svh-7.5rem))] sm:w-[24rem] sm:rounded-2xl sm:border sm:border-line sm:shadow-lift"
        >
          <header className="flex shrink-0 items-start justify-between gap-3 border-b border-line bg-mist px-4 py-3.5 text-ink pt-[max(0.875rem,env(safe-area-inset-top))] sm:pt-3.5">
            <div>
              <p className="text-sm font-semibold tracking-tight">
                Chatta med Isak
              </p>
              <p className="mt-0.5 text-xs text-muted">
                Svar utifrån hemsidans innehåll
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-2xl leading-none text-muted transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Stäng chatten"
            >
              ×
            </button>
          </header>

          <div
            ref={listRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain bg-mist/40 px-3 py-4"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                    msg.role === "user"
                      ? "rounded-br-md bg-white text-black"
                      : "rounded-bl-md border border-line bg-canvas text-ink shadow-card"
                  }`}
                >
                  {linkify(msg.content)}
                </div>
              </div>
            ))}
            {pending ? (
              <p className="text-xs text-muted">Skriver…</p>
            ) : null}
          </div>

          {messages.length <= 2 ? (
            <div className="flex shrink-0 flex-wrap gap-2 border-t border-line bg-canvas px-3 py-3">
              {CHAT_STARTERS.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  disabled={pending}
                  onClick={() => void send(starter)}
                  className="rounded-pill border border-line bg-surface px-3 py-2 text-left text-xs font-medium text-ink transition-colors hover:border-brand hover:text-brand disabled:opacity-50"
                >
                  {starter}
                </button>
              ))}
            </div>
          ) : null}

          <form
            className="shrink-0 border-t border-line bg-canvas p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-3"
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
                className="min-h-[2.75rem] max-h-28 flex-1 resize-none rounded-xl border border-line bg-surface px-3 py-2.5 text-base text-ink outline-none transition-colors focus:border-brand sm:text-sm"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                className="min-h-[2.75rem] shrink-0 rounded-xl border border-transparent bg-white px-4 py-2.5 text-sm font-medium text-black transition-[background-color,color,border-color] duration-150 hover:border-white/40 hover:bg-white/10 hover:text-white active:bg-white/15 disabled:opacity-40"
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
        aria-label={open ? "Stäng assistenten" : "Öppna assistenten"}
        className={`pointer-events-auto fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[61] flex h-14 w-14 items-center justify-center rounded-md border border-transparent bg-white text-black transition-[background-color,color,border-color,transform] duration-150 ease-out hover:scale-105 hover:border-white/40 hover:bg-white/10 hover:text-white active:bg-white/15 sm:right-6 sm:bottom-6 sm:h-16 sm:w-16 ${
          open ? "max-sm:hidden" : ""
        }`}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>
    </>
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
      className="h-7 w-7 sm:h-8 sm:w-8"
    >
      <path d="M21 12a8 8 0 0 1-11.7 7.1L3 21l1.9-6.3A8 8 0 1 1 21 12Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
      className="h-7 w-7 sm:h-8 sm:w-8"
    >
      <path d="M6 6l12 12M18 6L6 18" />
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
