/**
 * Kundcase-data.
 *
 * Just nu tom — den gamla Mats Svensson-casen och laptop-showcasen är
 * borttagna och ska byggas om från grunden. Typen nedan står kvar som
 * byggställning; forma om den fritt när det nya upplägget är bestämt.
 *
 * När det finns case igen: lägg objekt i arrayen och koppla in en
 * list-/detaljvy i app/case/.
 */
export type CaseResult = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  title: string;
  intro: string;
  liveUrl: string;
  challenge: string;
  work: { title: string; body: string }[];
  results: CaseResult[];
  /** Kundens betyg 1–5. */
  rating: number;
  quote?: { text: string; author: string };
  images: {
    afterDesktop?: string;
    afterMobile?: string;
    before?: string;
  };
};

export const cases: CaseStudy[] = [];
