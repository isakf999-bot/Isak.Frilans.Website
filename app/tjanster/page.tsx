import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { Nav } from "@/components/Nav/Nav";
import { Services } from "@/components/Services/Services";

export const metadata: Metadata = {
  title: "Tjänster — IsakWeb",
  description:
    "Landningssidor, e-handel, SEO, hosting, AI-integrationer och mer — klicka in på varje tjänst för detaljer, tidslinje och pris.",
};

export default function TjansterPage() {
  return (
    <>
      <Nav />
      <main>
        <Services />
      </main>
      <Footer />
    </>
  );
}
