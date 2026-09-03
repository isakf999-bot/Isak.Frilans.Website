import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/SeoLanding/SeoLandingPage";
import { getSeoLanding, seoLandings } from "@/lib/seoLandings";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return seoLandings.map((l) => ({ slug: l.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const landing = getSeoLanding(slug);
  if (!landing) return { title: "Sidan hittades inte" };
  return {
    title: { absolute: landing.title },
    description: landing.description,
    alternates: { canonical: absoluteUrl(`/${landing.slug}`) },
    openGraph: {
      title: landing.title,
      description: landing.description,
      url: absoluteUrl(`/${landing.slug}`),
    },
  };
}

export default async function SeoLandingRoute({ params }: Props) {
  const { slug } = await params;
  const landing = getSeoLanding(slug);
  if (!landing) notFound();
  return <SeoLandingPage landing={landing} />;
}
