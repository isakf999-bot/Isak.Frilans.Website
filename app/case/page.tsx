import type { Metadata } from "next";
import Link from "next/link";
import { Case } from "@/components/Case/Case";
import { Footer } from "@/components/Footer/Footer";
import { Nav } from "@/components/Nav/Nav";
import { cases } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Kundcase — Isak Web",
  description:
    "Riktiga projekt: hur en föråldrad sajt blev en modern, snabb och mobilanpassad upplevelse som speglar verksamheten.",
};

export default function CasePage() {
  const study = cases[0];

  return (
    <>
      <Nav />
      <main>
        {!study ? (
          <section className="mx-auto max-w-6xl px-6 py-32 text-center lg:px-8">
            <p className="text-lead text-muted">
              Inga case publicerade ännu. Kom snart tillbaka.
            </p>
            <Link
              href="/#kontakt"
              className="mt-6 inline-block font-medium text-brand underline underline-offset-4"
            >
              Vill du bli det första?
            </Link>
          </section>
        ) : (
          <Case study={study} />
        )}
      </main>
      <Footer />
    </>
  );
}
