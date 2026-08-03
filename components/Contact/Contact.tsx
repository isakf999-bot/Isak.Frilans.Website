"use client";

import { useId, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { buildEmailBody, RESPONSE_TIME_DAYS } from "@/lib/contactEmail";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const STEPS = [
  "Du skickar formuläret och berättar kort vad du behöver.",
  `Jag hör av mig inom ${RESPONSE_TIME_DAYS} arbetsdagar.`,
  "Vi tar ett samtal om det behövs — kostar ingenting, förpliktar ingenting.",
];

export function Contact({ initialMessage }: { initialMessage?: string }) {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [message, setMessage] = useState(initialMessage ?? "");
  const alertRef = useRef<HTMLParagraphElement>(null);

  const validate = (data: FormData): FieldErrors => {
    const next: FieldErrors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) next.name = "Skriv ditt namn, så vet jag vem jag svarar.";
    if (!email) next.email = "Jag behöver en e-postadress för att kunna svara.";
    else if (!EMAIL_PATTERN.test(email))
      next.email = "Det där ser inte ut som en e-postadress — kolla stavningen.";
    if (!message)
      next.message = "Berätta kort vad du behöver hjälp med. En mening räcker.";

    return next;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const fieldErrors = validate(data);
    setErrors(fieldErrors);
    setFormError(null);

    if (Object.keys(fieldErrors).length > 0) {
      const firstKey = Object.keys(fieldErrors)[0];
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    if (String(data.get("company") ?? "").trim()) {
      setStatus("success");
      return;
    }

    setStatus("submitting");

    try {
      if (!ACCESS_KEY) throw new Error("Access key saknas");

      const name = String(data.get("name") ?? "").trim();
      const emailAddress = String(data.get("email") ?? "").trim();

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Ny förfrågan från ${name}`,
          from_name: "Isak Web",
          replyto: emailAddress,
          name,
          email: emailAddress,
          message: buildEmailBody({
            name,
            email: emailAddress,
            message: String(data.get("message") ?? "").trim(),
          }),
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) {
        throw new Error(`Web3Forms svarade ${response.status}`);
      }

      setStatus("success");
      form.reset();
      setMessage("");
    } catch {
      setStatus("error");
      setFormError(
        "Något gick fel när förfrågan skulle skickas. Försök igen, eller mejla mig direkt på info@isakweb.se.",
      );
      alertRef.current?.focus();
    }
  };

  return (
    <section
      id="kontakt"
      className="scroll-mt-24 border-t border-line-cool bg-mist"
      aria-labelledby="kontakt-rubrik"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionLabel>Kontakt</SectionLabel>

            <h2 id="kontakt-rubrik" className="mt-6 text-h2">
              Berätta vad du behöver.
            </h2>

            <p className="mt-5 text-lead text-muted">
              Skicka en kort beskrivning — jag återkommer med nästa steg. Inget
              säljsnack, inga förpliktelser.
            </p>

            <ol className="mt-10">
              {STEPS.map((step, i) => {
                const isLast = i === STEPS.length - 1;
                return (
                  <li key={step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        aria-hidden="true"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-medium text-white shadow-brand"
                      >
                        {i + 1}
                      </span>
                      {!isLast && (
                        <span
                          aria-hidden="true"
                          className="my-1.5 w-px grow bg-gradient-to-b from-brand/45 to-brand/10"
                        />
                      )}
                    </div>
                    <span className={`pt-1 text-muted ${isLast ? "" : "pb-7"}`}>
                      {step}
                    </span>
                  </li>
                );
              })}
            </ol>

            <p className="mt-10 border-t border-line-cool pt-6 text-sm text-muted">
              Hellre mejl?{" "}
              <a
                href="mailto:info@isakweb.se"
                className="font-medium text-brand underline underline-offset-4 transition-opacity duration-200 hover:opacity-70"
              >
                info@isakweb.se
              </a>
            </p>
          </div>

          <div className="rounded-xl border border-line-cool bg-gradient-to-b from-surface to-surface-soft p-6 shadow-lift sm:p-9">
            {status === "success" ? (
              <div role="status" className="py-10 text-center">
                <span
                  aria-hidden="true"
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-2xl text-white"
                >
                  ✓
                </span>
                <h3 className="mt-6 text-h3">Tack — jag har fått din förfrågan.</h3>
                <p className="mx-auto mt-4 max-w-sm text-muted">
                  Jag läser igenom den och återkommer inom{" "}
                  <strong className="font-medium text-ink">
                    {RESPONSE_TIME_DAYS} arbetsdagar
                  </strong>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-8 rounded-pill border border-line px-6 py-3 text-sm font-medium transition-colors duration-200 ease-out hover:bg-canvas"
                >
                  Skicka en till
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div aria-hidden="true" className="absolute -left-[9999px]">
                  <label htmlFor={`${formId}-company`}>Företag</label>
                  <input
                    id={`${formId}-company`}
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id={`${formId}-name`}
                    name="name"
                    label="Namn"
                    autoComplete="name"
                    placeholder="Anna Andersson"
                    error={errors.name}
                  />
                  <Field
                    id={`${formId}-email`}
                    name="email"
                    type="email"
                    label="E-post"
                    autoComplete="email"
                    placeholder="anna@foretaget.se"
                    error={errors.email}
                  />
                </div>

                <div className="mt-5">
                  <Field
                    id={`${formId}-message`}
                    name="message"
                    label="Vad behöver du hjälp med?"
                    multiline
                    placeholder="Vi driver ett café och har en sajt från 2016 som inte fungerar i mobilen…"
                    error={errors.message}
                    value={message}
                    onChange={setMessage}
                  />
                </div>

                {formError && (
                  <p
                    ref={alertRef}
                    tabIndex={-1}
                    role="alert"
                    className="mt-6 rounded-lg border border-danger/30 bg-danger-tint p-4 text-sm text-danger"
                  >
                    {formError}
                  </p>
                )}

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="shine group inline-flex items-center gap-2.5 rounded-pill bg-brand px-7 py-4 font-medium text-white shadow-brand transition-all duration-200 ease-out hover:bg-brand-dark active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
                  >
                    {status === "submitting" ? "Skickar…" : "Skicka förfrågan"}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  error?: string;
  multiline?: boolean;
  optional?: boolean;
  placeholder?: string;
  autoComplete?: string;
  value?: string;
  onChange?: (value: string) => void;
};

function Field({
  id,
  name,
  label,
  type = "text",
  error,
  multiline,
  optional,
  placeholder,
  autoComplete,
  value,
  onChange,
}: FieldProps) {
  const errorId = `${id}-error`;
  const shared = `mt-2 w-full rounded-lg border bg-canvas px-4 py-3 text-ink placeholder:text-muted/50 transition-all duration-200 ease-out focus:bg-surface focus:outline-none ${
    error
      ? "border-danger focus:border-danger focus:shadow-[0_0_0_3px_rgba(180,35,24,0.12)]"
      : "border-line hover:border-muted focus:border-brand focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--palette-brand)_18%,transparent)]"
  }`;

  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-baseline gap-2 text-sm font-medium text-ink"
      >
        {label}
        {optional && <span className="font-normal text-muted">(valfritt)</span>}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`${shared} resize-y`}
          {...(onChange
            ? { value: value ?? "", onChange: (e) => onChange(e.target.value) }
            : {})}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={shared}
        />
      )}

      {error && (
        <p id={errorId} className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
