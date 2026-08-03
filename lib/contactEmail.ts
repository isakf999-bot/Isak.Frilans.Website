/** Svarstiden som utlovas i bekräftelsen. Ändra på ETT ställe. */
export const RESPONSE_TIME_DAYS = 2;

export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
};

/**
 * Bygger mejlets brödtext.
 */
export function buildEmailBody(submission: ContactSubmission): string {
  return [
    `Ny förfrågan från ${submission.name}.`,
    "",
    "MEDDELANDE",
    submission.message,
    "",
    "---",
    `Svara inom ${RESPONSE_TIME_DAYS} arbetsdagar.`,
  ].join("\n");
}
