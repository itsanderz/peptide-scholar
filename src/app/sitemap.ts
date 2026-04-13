import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/data/peptides";
import { getAllComparisonSlugs } from "@/data/comparisons";
import { getAllCategories } from "@/data/categories";
import { getAllStatesLegal } from "@/data/states-legal";
import { getBlogSlugs } from "@/data/blog-posts";
import {
  getAllProviderGoalSlugs,
  getAllProviderInsuranceSlugs,
  getAllProviderIntakeModes,
  getAllProviderPartners,
  getAllProviderTreatmentSlugs,
} from "@/data/provider-partners";
import {
  getGeneratedAppLandingSlugs,
  getGeneratedCostSlugs,
  getGeneratedTreatmentHubSlugs,
} from "@/lib/generated-content";
import { getDefaultMarket } from "@/lib/market";
import { LOCALES } from "@/lib/i18n";
import { getRequestSite } from "@/lib/request-site";

export const dynamic = "force-dynamic";

function localeUrl(base: string, locale: string, path: string): string {
  if (locale === "en") return `${base}${path}`;
  return `${base}/${locale}${path}`;
}

function hreflangMap(base: string, path: string, locales: readonly string[]) {
  return {
    languages: Object.fromEntries(locales.map((l) => [l, localeUrl(base, l, path)])),
  };
}

function entries(
  base: string,
  path: string,
  locales: readonly string[],
  lastmod: string
): MetadataRoute.Sitemap {
  const alternates = hreflangMap(base, path, locales);
  return locales.map((locale) => ({
    url: localeUrl(base, locale, path),
    lastModified: lastmod,
    alternates,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getRequestSite();

  if (!site.capabilities.allowPublicSitemap || site.noindexByDefault) {
    return [];
  }

  const base = site.domain;
  const market = getDefaultMarket();
  const indexableLocales = market.localeSupport
    .filter((entry) => entry.isIndexable)
    .map((entry) => entry.locale)
    .filter(
      (locale): locale is (typeof LOCALES)[number] =>
        LOCALES.includes(locale as (typeof LOCALES)[number])
    );
  const peptideSlugs = getAllSlugs();
  const comparisonSlugs = getAllComparisonSlugs();
  const categorySlugs = getAllCategories().map((c) => c.slug);
  const stateSlugs = getAllStatesLegal().map((s) => s.stateSlug);
  const blogSlugs = getBlogSlugs();
  const providerSlugs = getAllProviderPartners().map((partner) => partner.slug);
  const providerTreatmentSlugs = getAllProviderTreatmentSlugs();
  const providerGoalSlugs = getAllProviderGoalSlugs();
  const providerInsuranceSlugs = getAllProviderInsuranceSlugs();
  const providerIntakeSlugs = getAllProviderIntakeModes();
  const treatmentSlugs = getGeneratedTreatmentHubSlugs("us");
  const costSlugs = getGeneratedCostSlugs("us");
  const appSlugs = getGeneratedAppLandingSlugs("us");
  const lastmod = "2026-04-11";

  const corePaths: string[] = [
    "",
    "/peptides",
    "/compare",
    "/providers",
    ...providerSlugs.map((slug) => `/providers/${slug}`),
    ...providerTreatmentSlugs.map((slug) => `/providers/treatment/${slug}`),
    ...providerGoalSlugs.map((slug) => `/providers/goal/${slug}`),
    ...providerInsuranceSlugs.map((slug) => `/providers/insurance/${slug}`),
    ...providerIntakeSlugs.map((slug) => `/providers/intake/${slug}`),
    ...stateSlugs.map((slug) => `/providers/state/${slug}`),
    "/legal",
    "/treatments",
    ...treatmentSlugs.map((slug) => `/treatments/${slug}`),
    "/costs",
    ...costSlugs.map((slug) => `/costs/${slug}`),
    "/app",
    ...appSlugs.map((slug) => `/app/${slug}`),
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
    "/guide/insurance-prior-auth",
    "/guide/glp1-nutrition",
    "/guide/wolverine-stack",
    "/guide/reading-coa",
    "/guide/after-stopping-glp1",
    "/blog",
    ...blogSlugs.map((s) => `/blog/${s}`),
    "/glossary",
    "/about",
    "/contact",
    "/disclaimer",
  ];

  return corePaths.flatMap((p) =>
    entries(base, p, indexableLocales.length > 0 ? indexableLocales : LOCALES, lastmod)
  );
}
