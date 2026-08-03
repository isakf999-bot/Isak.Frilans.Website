import type { Metadata } from "next";
import { Footer } from "@/components/Footer/Footer";
import { HomePackages } from "@/components/Home/HomePackages";
import { Nav } from "@/components/Nav/Nav";

export const metadata: Metadata = {
  title: "Paket — IsakWeb",
  description:
    "Tydliga paket utan byråpåslag — från Starter till Enterprise, med tillägg du kan välja efter behov.",
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
