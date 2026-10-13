import { serviceNavGroups } from "@/lib/nav";
import { services, type Service } from "@/lib/services";

export type ServiceGroup = {
  heading: string;
  /** En mening på vanlig svenska om vad gruppen handlar om. */
  summary: string;
  services: Service[];
};

const summaries: Record<string, string> = {
  "Hemsida & webb":
    "Själva sajten: en ny, en ombyggd eller en som sköts om efter lansering.",
  "Synlighet & teknik":
    "Det som gör att sajten hittas, laddar snabbt och pratar med era andra verktyg.",
  Design: "Hur sajten ser ut och känns, innan eller samtidigt som den byggs.",
};

/** Tjänsterna i samma tre grupper och samma ordning som menyn (lib/nav.ts). */
export const serviceGroups: ServiceGroup[] = serviceNavGroups.map((group) => ({
  heading: group.heading,
  summary: summaries[group.heading] ?? "",
  services: group.items
    .map((item) => services.find((s) => item.href === `/tjanster/${s.slug}`))
    .filter((s): s is Service => s !== undefined),
}));

export function getServiceGroup(slug: string): ServiceGroup | undefined {
  return serviceGroups.find((g) => g.services.some((s) => s.slug === slug));
}
