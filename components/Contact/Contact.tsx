"use client";

import { ArrowRight, Check, CircleAlert, LoaderCircle } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { btn } from "@/components/ui/buttonStyles";
import { buildEmailBody, RESPONSE_TIME_DAYS } from "@/lib/contactEmail";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
const EMAIL = "info@isakweb.se";

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

export function Contact({
  initialMessage,
  asSection = false,
}: {
  initialMessage?: string;
  asSection?: boolean;
}) {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [message, setMessage] = useState(initialMessage ?? "");
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const alertRef = useRef<HTMLParagraphElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Flytta fokus till resultatet först när det faktiskt har renderats, så
  // att skärmläsare och tangentbord hamnar på felet eller bekräftelsen.
  useEffect(() => {
    if (status === "error") alertRef.current?.focus();
    if (status === "success") successRef.current?.focus();
  }, [status]);

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
      // Adressen läggs till som en riktig mailto-länk där felet visas.
      setFormError(
        "Något gick fel när förfrågan skulle skickas. Försök igen, eller mejla mig direkt på",
      );
    }
  };

  // En h1 på /kontakt, en h2 när blocket ligger som sektion på startsidan —
  // bekräftelsens rubrik hamnar då en nivå under.
  const Heading = asSection ? "h2" : "h1";
  const SubHeading = asSection ? "h3" : "h2";
  const submitting = status === "submitting";

  return (
    <section
      id="kontakt"
      className="bg-night text-white"
      aria-labelledby="kontakt-rubrik"
    >
      {/* Copper Shadow: behållaren får ingen egen bakgrund, se globals.css. */}
      <div className="aura-stage aura-stage--drift">
        <div className="aura-stage__layer-1" aria-hidden="true" />
        <div className="aura-stage__layer-2" aria-hidden="true" />
        <div className="aura-stage__layer-3" aria-hidden="true" />
        <div className="aura-stage__layer-4" aria-hidden="true" />

        <div className="aura-stage__content mx-auto grid max-w-6xl gap-x-16 gap-y-12 px-6 py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:grid-rows-[auto_1fr] lg:px-8 lg:py-28">
          <div className="lg:col-start-1 lg:row-start-1">
            <SectionLabel tone="dark">
              {asSection ? "Hör av dig" : "Starta ett projekt"}
            </SectionLabel>
            <Heading id="kontakt-rubrik" className="mt-6 text-h1 text-white">
              {asSection ? "Hur kan jag hjälpa dig?" : "Berätta vad du vill bygga."}
            </Heading>
            <p className="mt-6 max-w-md text-lead text-white/80">
              Skicka en kort beskrivning — jag återkommer med nästa steg. Det
              förbinder dig inte till något.
            </p>
          </div>

          {/* Formuläret — huvudfokus, direkt efter rubriken på mobil */}
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="flex h-full flex-col rounded-xl bg-surface p-6 text-ink shadow-window sm:p-8 lg:p-10">
              {status === "success" ? (
                <div
                  ref={successRef}
                  tabIndex={-1}
                  role="status"
                  className="flex flex-1 flex-col justify-center py-10 focus:outline-none"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-md bg-brand text-white"
                  >
                    <Check className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                  <SubHeading className="mt-8 text-h3">
                    Tack — jag har fått din förfrågan.
                  </SubHeading>
                  <p className="mt-4 max-w-sm text-muted">
                    Jag läser igenom den och återkommer inom{" "}
                    <strong className="font-semibold text-ink">
                      {RESPONSE_TIME_DAYS} arbetsdagar
                    </strong>
                    .
                  </p>
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className={btn.secondary}
                    >
                      Skicka en till
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-busy={submitting}
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
                    <legend className="text-sm font-semibold text-ink">
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
                            className={`${btn.chip} ${
                              selected ? btn.chipActive : btn.chipIdle
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
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

                  <div className="mt-6 flex flex-1 flex-col">
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
                      className="mt-6 flex gap-3 rounded-md border border-danger/30 bg-danger-tint p-4 text-sm text-danger focus:outline-none"
                    >
                      <CircleAlert
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0"
                      />
                      <span>
                        {formError}{" "}
                        <a
                          href={`mailto:${EMAIL}`}
                          className="font-semibold underline decoration-danger/40 decoration-2 underline-offset-4 transition-[text-decoration-color] duration-150 ease-out hover:decoration-danger"
                        >
                          {EMAIL}
                        </a>
                        .
                      </span>
                    </p>
                  )}

                  <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`group shrink-0 ${btn.primary}`}
                    >
                      {submitting ? (
                        <>
                          <LoaderCircle
                            aria-hidden="true"
                            className="h-4 w-4 motion-safe:animate-spin"
                          />
                          Skickar…
                        </>
                      ) : (
                        <>
                          Skicka förfrågan
                          <ArrowRight
                            aria-hidden="true"
                            className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                          />
                        </>
                      )}
                    </button>
                    <p className="text-sm leading-relaxed text-muted">
                      Ingen spam. Bara ett svar från mig på{" "}
                      <span className="font-medium text-ink">{EMAIL}</span>.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Vad som händer sen — en riktig sekvens, därför numrerad */}
          <aside className="lg:col-start-1 lg:row-start-2">
            <p className="text-sm font-medium text-brand-glow">Så går det till</p>
            <ol className="mt-4">
              {STEPS.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-5 border-t border-white/15 py-5"
                >
                  <span
                    aria-hidden="true"
                    className="pt-0.5 font-mono text-sm text-brand-glow"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/85">{step}</span>
                </li>
              ))}
            </ol>

            <dl className="grid gap-x-8 gap-y-6 border-t border-white/15 pt-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <dt className="text-sm text-white/70">Svarstid</dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight text-white">
                  Inom {RESPONSE_TIME_DAYS} arbetsdagar
                </dd>
              </div>
              <div>
                <dt className="text-sm text-white/70">Hellre mejl?</dt>
                <dd className="mt-1 text-xl tracking-tight">
                  <a href={`mailto:${EMAIL}`} className="link-on-dark">
                    {EMAIL}
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
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
  const shared = `mt-2 w-full rounded-md border bg-canvas px-4 py-3 text-ink placeholder:text-muted/70 transition-[border-color,box-shadow,background-color] duration-150 ease-out focus:bg-surface focus:outline-none focus:ring-3 ${
    error
      ? "border-danger focus:ring-danger/20"
      : "border-line-cool hover:border-brand/40 focus:border-brand focus:ring-brand/20"
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
        <p id={errorId} className="mt-2 flex gap-2 text-sm text-danger">
          <CircleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
