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
  getGeneratedMarketTreatmentSlugs,
  getGeneratedToolLandingSlugs,
  getGeneratedTreatmentHubSlugs,
  getMarketCodesWithTreatmentContent,
} from "@/lib/generated-content";
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
  const indexableLocales = LOCALES;
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
  const toolLandingSlugs = getGeneratedToolLandingSlugs("us");
  const appSlugs = getGeneratedAppLandingSlugs("us");
  const marketTreatmentCodes = getMarketCodesWithTreatmentContent();
  const marketTreatmentPaths = marketTreatmentCodes.flatMap((code) =>
    getGeneratedMarketTreatmentSlugs(code).map((slug) => `/markets/${code}/treatments/${slug}`)
  );
  const lastmod = "2026-04-13";

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
    // /legal temporarily removed from sitemap — state data under sourcing review (P0.2)
    // "/legal",
    "/treatments",
    ...treatmentSlugs.map((slug) => `/treatments/${slug}`),
    "/costs",
    ...costSlugs.map((slug) => `/costs/${slug}`),
    "/app",
    "/app/tracker",
    ...appSlugs.map((slug) => `/app/${slug}`),
    ...peptideSlugs.map((s) => `/peptides/${s}`),
    ...comparisonSlugs.map((s) => `/compare/${s}`),
    ...categorySlugs.map((c) => `/best-for/${c}`),
    // State legal pages temporarily removed from sitemap — content under review for sourcing (P0.2)
    "/tools",
    "/tools/peptide-finder",
    "/tools/calculator",
    "/tools/legal-checker",
    "/tools/titration-planner",
    "/tools/side-effects",
    "/tools/interaction-checker",
    "/tools/cost-calculator",
    "/tools/half-life-visualizer",
    "/tools/vial-planner",
    "/tools/cycle-planner",
    "/tools/doctor-export",
    ...toolLandingSlugs.map((slug) => `/tools/${slug}`),
    "/tools/symptom-checker",
    "/markets",
    ...marketTreatmentPaths,
    "/tools/protein-calculator",
    "/tools/stack-cost-calculator",
    "/tools/interaction-matrix",
    "/tools/benchmark",
    "/tools/stack-generator",
    "/tools/stack-explorer",
    "/tools/structure-predictor",
    "/tools/community-stacks",
    "/tools/evidence-comparator",
    "/tools/sequence-analyzer",
    "/tools/literature-alerts",
    "/tools/beginner-assessment",
    "/tools/side-effect-triage",
    "/tools/coa-verifier",
    "/guide",
    "/guide/insurance-prior-auth",
    "/guide/glp1-nutrition",
    "/guide/wolverine-stack",
    "/guide/reading-coa",
    "/guide/after-stopping-glp1",
    "/resources",
    "/blog",
    ...blogSlugs.map((s) => `/blog/${s}`),
    "/glossary",
    "/about",
    "/contact",
    "/disclaimer",
  ];

  return corePaths.flatMap((p) =>
    entries(base, p, indexableLocales, lastmod)
  );
}
