"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { MessageCircle, SendHorizontal, X } from "lucide-react";
import { btn, btnWhite } from "@/components/ui/buttonStyles";
import { CHAT_STARTERS, type ChatMessage } from "@/lib/chatKnowledge";

type UiMessage = ChatMessage & { id: string };

const WELCOME: UiMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hej! Jag är Isak. Fråga om tjänster, redesign, hur ett projekt går till eller hur du tar kontakt — jag svarar utifrån det som står på hemsidan.",
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
          className="pointer-events-auto fixed inset-0 z-[60] flex flex-col overflow-hidden bg-canvas sm:inset-auto sm:right-6 sm:bottom-24 sm:h-[min(34rem,calc(100svh-8rem))] sm:w-[24rem] sm:rounded-lg sm:shadow-lift"
        >
          <header className="flex shrink-0 items-center justify-between gap-3 bg-night px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 text-white sm:pt-3">
            <div>
              <p className="text-[0.9375rem] font-semibold tracking-[-0.01em]">
                Chatta med Isak
              </p>
              <p className="mt-0.5 text-xs text-white/70">
                Svar utifrån hemsidans innehåll
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/15 text-white/80 transition-[background-color,border-color,color] duration-150 ease-out hover:border-brand-glow hover:bg-night-raised hover:text-white focus-visible:outline-brand-glow"
              aria-label="Stäng chatten"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </header>

          <div
            ref={listRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                    msg.role === "user"
                      ? "rounded-br-[2px] bg-brand text-white"
                      : "rounded-bl-[2px] border border-line bg-surface text-ink"
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
            <div className="flex shrink-0 flex-wrap gap-2 border-t border-line bg-surface px-4 py-3">
              {CHAT_STARTERS.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  disabled={pending}
                  onClick={() => void send(starter)}
                  className={`${btn.chip} ${btn.chipIdle} px-3! text-left text-xs! leading-snug!`}
                >
                  {starter}
                </button>
              ))}
            </div>
          ) : null}

          <form
            className="shrink-0 border-t border-line bg-surface px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-3"
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
                placeholder="Fråga om tjänster, redesign, tid…"
                className="max-h-28 min-h-[4rem] flex-1 resize-none rounded-md border border-line-cool bg-canvas px-3 py-2.5 text-base text-ink transition-[border-color,box-shadow] duration-150 ease-out outline-none placeholder:text-muted focus:border-brand focus:shadow-brand sm:text-sm"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                className={`${btn.primary} mb-[3px] shrink-0 px-4! py-3! text-sm!`}
              >
                Skicka
                <SendHorizontal aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-xs text-muted">
              Behöver du Isak direkt?{" "}
              <Link href="/kontakt" className="link">
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
        className={`pointer-events-auto fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[61] flex h-14 w-14 items-center justify-center rounded-lg transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-[2px] active:duration-75 sm:right-6 sm:bottom-6 ${btnWhite} ${
          open ? "max-sm:hidden" : ""
        }`}
      >
        {open ? (
          <X aria-hidden="true" className="h-6 w-6" />
        ) : (
          <MessageCircle aria-hidden="true" className="h-6 w-6" />
        )}
      </button>
    </>
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
