import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { HomePackages } from "@/components/Home/HomePackages";
import { Nav } from "@/components/Nav/Nav";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Paket — IsakWeb",
  description:
    "Tydliga paket utan byråpåslag — Bas, Premium och Full Service, plus Enterprise vid behov.",
  alternates: { canonical: absoluteUrl("/paket") },
};

export default function PaketPage() {
  return (
    <>
      <Nav />
      <main>
        <HomePackages />
      </main>
      <Footer />
    </>
  );
}
