import { RESPONSE_TIME_DAYS, formatAvailability } from "@/lib/availability";

export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
  /** Id:n som "tue:afternoon". Okända värden filtreras bort. */
  availability: string[];
  availabilityNote: string;
};

/**
 * Bygger mejlets brödtext.
 *
 * Ligger här och inte i komponenten av två skäl: Contact.tsx ska handla om UI,
 * och formateringen går att läsa/ändra utan att röra formulärlogiken.
 */
export function buildEmailBody(submission: ContactSubmission): string {
  const times = submission.availability
    .map(formatAvailability)
    .filter((label): label is string => label !== null);

  return [
    `Ny förfrågan från ${submission.name}.`,
    "",
    "MEDDELANDE",
    submission.message,
    "",
    "TIDER SOM PASSAR",
    times.length > 0
      ? times.map((label) => `• ${label}`).join("\n")
      : "Inga tider markerade.",
    submission.availabilityNote
      ? `\nÖVRIGT OM TILLGÄNGLIGHET\n${submission.availabilityNote}`
      : "",
    "",
    "---",
    `Svara inom ${RESPONSE_TIME_DAYS} arbetsdagar med en bekräftad tid.`,
  ]
    .filter((line) => line !== "")
    .join("\n");
}
