import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/data/peptides";
import { getAllComparisonSlugs } from "@/data/comparisons";
import { getAllCategories } from "@/data/categories";
import { getAllStatesLegal } from "@/data/states-legal";
import { LOCALES } from "@/lib/i18n";
import { BUILD_LOCALES } from "@/lib/locale-params";

const BASE = "https://peptidescholar.com";

function localeUrl(locale: string, path: string): string {
  if (locale === "en") return `${BASE}${path || "/"}`;
  return `${BASE}/${locale}${path}`;
}

function hreflangMap(path: string, locales: readonly string[]) {
  return {
    languages: Object.fromEntries(
      locales.map((l) => [l, localeUrl(l, path)])
    ),
  };
}

function entries(
  path: string,
  locales: readonly string[],
  lastmod: string
): MetadataRoute.Sitemap {
  const alternates = hreflangMap(path, locales);
  return locales.map((locale) => ({
    url: localeUrl(locale, path),
    lastModified: lastmod,
    alternates,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const peptideSlugs = getAllSlugs();
  const comparisonSlugs = getAllComparisonSlugs();
  const categorySlugs = getAllCategories().map((c) => c.slug);
  const stateSlugs = getAllStatesLegal().map((s) => s.stateSlug);
  const lastmod = "2026-03-26";

  // Core pages — all 14 locales with full hreflang
  const corePaths: string[] = [
    "",
    "/peptides",
    "/compare",
    "/legal",
    ...peptideSlugs.map((s) => `/peptides/${s}`),
    ...comparisonSlugs.map((s) => `/compare/${s}`),
    ...categorySlugs.map((c) => `/best-for/${c}`),
    ...stateSlugs.map((s) => `/legal/${s}`),
    "/tools",
    "/tools/peptide-finder",
    "/tools/calculator",
    "/tools/legal-checker",
    "/tools/titration-planner",
    "/tools/side-effects",
    "/tools/interaction-checker",
    "/tools/cost-calculator",
    "/tools/symptom-checker",
    "/tools/protein-calculator",
    "/guide",
    "/guide/glp1-nutrition",
    "/guide/wolverine-stack",
    "/guide/reading-coa",
    "/guide/after-stopping-glp1",
    "/glossary",
    "/about",
    "/disclaimer",
  ];

  // Peptide × State — EN + ES only to avoid scaled-content-abuse signal
  // for auto-translated template pages. Other locales discoverable via
  // hreflang in HTML <link> tags on the EN/ES pages.
  const peptideStatePaths = peptideSlugs.flatMap((slug) =>
    stateSlugs.map((state) => `/peptides/${slug}/legal/${state}`)
  );

  return [
    ...corePaths.flatMap((p) => entries(p, LOCALES, lastmod)),
    ...peptideStatePaths.flatMap((p) => entries(p, BUILD_LOCALES, lastmod)),
  ];
}
