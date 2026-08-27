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
  "Du skickar en kort beskrivning.",
  `Jag svarar inom ${RESPONSE_TIME_DAYS} arbetsdagar.`,
  "Vi tar ett samtal om det behövs — gratis och utan förpliktelser.",
];

const PROJECT_TYPES = [
  "Landningssida",
  "Företagssajt",
  "E-handel",
  "Omdesign",
  "Annat",
] as const;

type ProjectType = (typeof PROJECT_TYPES)[number];

export function Contact({ initialMessage }: { initialMessage?: string }) {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [message, setMessage] = useState(initialMessage ?? "");
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const alertRef = useRef<HTMLParagraphElement>(null);

  const validate = (data: FormData): FieldErrors => {
    const next: FieldErrors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) next.name = "Skriv ditt namn, så vet jag vem jag svarar till.";
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
      const rawMessage = String(data.get("message") ?? "").trim();
      const fullMessage = projectType
        ? `Projekttyp: ${projectType}\n\n${rawMessage}`
        : rawMessage;

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
            message: fullMessage,
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
      setProjectType(null);
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
      className="border-t border-line"
      aria-labelledby="kontakt-rubrik"
    >
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
            <SectionLabel>Starta ett projekt</SectionLabel>
            <h1 id="kontakt-rubrik" className="mt-6 text-h1 lg:text-display">
              Berätta vad du vill bygga.
            </h1>
            <p className="mt-5 text-lead text-muted">
              Skicka en kort beskrivning — jag återkommer med nästa steg. Det
              förbinder dig inte till något.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-12 grid items-stretch gap-8 lg:mt-16 lg:grid-cols-[0.9fr_1.2fr] lg:gap-12">
          {/* Sidokolumn — samma höjd som formuläret */}
          <aside className="order-2 flex h-full flex-col lg:order-1">
            <div className="flex h-full flex-1 flex-col rounded-lg border border-line glass p-6 sm:p-7">
              <p className="text-eyebrow font-medium tracking-[0.12em] text-brand uppercase">
                Så går det till
              </p>
              <ol className="mt-5 flex flex-1 flex-col justify-evenly gap-5">
                {STEPS.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line bg-canvas font-mono text-sm font-semibold text-brand"
                    >
                      {i + 1}
                    </span>
                    <span className="pt-1.5 text-sm leading-relaxed text-muted sm:text-base">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-auto rounded-md border border-line bg-mist px-5 py-4 text-ink">
                <p className="text-sm text-muted">Svarstid</p>
                <p className="mt-1 text-xl font-semibold tracking-tight">
                  Inom {RESPONSE_TIME_DAYS} arbetsdagar
                </p>
                <p className="mt-3 text-sm text-muted">
                  Hellre mejl?{" "}
                  <a
                    href="mailto:info@isakweb.se"
                    className="font-medium text-brand underline underline-offset-4 transition-opacity hover:opacity-80"
                  >
                    info@isakweb.se
                  </a>
                </p>
              </div>
            </div>
          </aside>

          {/* Formulär — huvudfokus */}
          <div className="order-1 flex h-full lg:order-2">
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-line glass shadow-card">
              <div className="flex flex-1 flex-col p-6 sm:p-9 lg:p-10">
                {status === "success" ? (
                  <div
                    role="status"
                    className="flex flex-1 flex-col items-center justify-center py-8 text-center sm:py-12"
                  >
                    <span
                      aria-hidden="true"
                      className="mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-white text-2xl text-black"
                    >
                      ✓
                    </span>
                    <h2 className="mt-7 text-h3">
                      Tack — jag har fått din förfrågan.
                    </h2>
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
                      className="mt-8 rounded-md border border-line bg-canvas px-6 py-3 text-sm font-medium transition-colors duration-150 hover:border-ink/25 hover:text-brand"
                    >
                      Skicka en till
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="relative flex flex-1 flex-col"
                  >
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

                    <fieldset className="min-w-0">
                      <legend className="text-sm font-medium text-ink">
                        Vad vill du bygga?
                        <span className="ml-1.5 font-normal text-muted">
                          (valfritt)
                        </span>
                      </legend>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {PROJECT_TYPES.map((type) => {
                          const selected = projectType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              aria-pressed={selected}
                              onClick={() =>
                                setProjectType(selected ? null : type)
                              }
                              className={`rounded-md border px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${
                                selected
                                  ? "border-white bg-white text-black"
                                  : "border-line bg-canvas text-ink hover:border-ink/20 hover:bg-surface"
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>

                    <div className="mt-7 grid gap-5 sm:grid-cols-2">
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

                    <div className="mt-5 flex flex-1 flex-col">
                      <Field
                        id={`${formId}-message`}
                        name="message"
                        label="Vad behöver du hjälp med?"
                        multiline
                        fill
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
                        className="mt-6 rounded-xl border border-danger/30 bg-danger-tint p-4 text-sm text-danger"
                      >
                        {formError}
                      </p>
                    )}

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-8 py-3.5 font-semibold text-black transition-opacity duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto"
                      >
                        {status === "submitting"
                          ? "Skickar…"
                          : "Skicka förfrågan"}
                        <span aria-hidden="true">→</span>
                      </button>
                      <p className="text-center text-xs leading-relaxed text-muted sm:max-w-[14rem] sm:text-left">
                        Ingen spam. Bara ett svar från mig på{" "}
                        <span className="font-medium text-ink">
                          info@isakweb.se
                        </span>
                        .
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
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
  /** Låt textarea fylla kvarvarande höjd i flex-kolumnen. */
  fill?: boolean;
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
  fill,
  placeholder,
  autoComplete,
  value,
  onChange,
}: FieldProps) {
  const errorId = `${id}-error`;
  const shared = `mt-2 w-full rounded-md border bg-canvas px-4 py-3.5 text-ink placeholder:text-muted/45 transition-[border-color,background-color] duration-150 ease-out focus:bg-surface focus:outline-none ${
    error
      ? "border-danger focus:border-danger"
      : "border-line hover:border-ink/20 focus:border-brand"
  }`;

  return (
    <div className={fill ? "flex min-h-0 flex-1 flex-col" : undefined}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={fill ? undefined : 6}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`${shared} ${fill ? "min-h-[11rem] flex-1 resize-none" : "min-h-[9rem] resize-y"}`}
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
