import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/data/peptides";
import { getAllComparisonSlugs } from "@/data/comparisons";
import { getAllCategories } from "@/data/categories";
import { getAllStatesLegal } from "@/data/states-legal";
import { LOCALES } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://peptidescholar.com";
  const now = new Date();

  const peptideSlugs = getAllSlugs();
  const comparisonSlugs = getAllComparisonSlugs();
  const categories = getAllCategories();
  const states = getAllStatesLegal();

  const paths: { path: string; priority: number; changeFreq: "weekly" | "monthly" }[] = [
    // Homepage
    { path: "", priority: 1.0, changeFreq: "weekly" },

    // Peptide detail pages
    ...peptideSlugs.map((slug) => ({
      path: `/peptides/${slug}`,
      priority: 0.8,
      changeFreq: "monthly" as const,
    })),

    // Comparison pages
    ...comparisonSlugs.map((slug) => ({
      path: `/compare/${slug}`,
      priority: 0.7,
      changeFreq: "monthly" as const,
    })),

    // Category pages
    ...categories.map((cat) => ({
      path: `/best-for/${cat}`,
      priority: 0.7,
      changeFreq: "monthly" as const,
    })),

    // State legal pages
    ...states.map((state) => ({
      path: `/legal/${state}`,
      priority: 0.6,
      changeFreq: "monthly" as const,
    })),

    // Static pages
    { path: "/glossary", priority: 0.5, changeFreq: "monthly" },
    { path: "/about", priority: 0.5, changeFreq: "monthly" },
    { path: "/disclaimer", priority: 0.5, changeFreq: "monthly" },
  ];

  return paths.flatMap(({ path, priority, changeFreq }) =>
    LOCALES.map((locale) => ({
      url: locale === "en" ? `${baseUrl}${path || "/"}` : `${baseUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency: changeFreq,
      priority,
    }))
  );
}
