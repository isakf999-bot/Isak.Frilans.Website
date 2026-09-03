import type { MetadataRoute } from "next";
import { publishedCases } from "@/lib/cases";
import { seoLandings } from "@/lib/seoLandings";
import { services } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/paket",
    "/tjanster",
    "/process",
    "/faq",
    "/om",
    "/case",
    "/kontakt",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const landingRoutes = seoLandings.map((l) => ({
    url: `${SITE_URL}/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${SITE_URL}/tjanster/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseRoutes = publishedCases.map((c) => ({
    url: `${SITE_URL}/case/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...landingRoutes, ...serviceRoutes, ...caseRoutes];
}
