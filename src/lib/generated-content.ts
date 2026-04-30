import { readFileSync } from "node:fs";
import { join } from "node:path";
import type {
  AppLandingContent,
  ContentMeta,
  CostContent,
  CtaBlock,
  FaqItem,
  MarketTreatmentContent,
  SeoBlock,
  SourceCitation,
  ToolLandingContent,
  TreatmentHubContent,
  TrustBlock,
} from "@/types/generated-content";
import type { MarketCode } from "@/types/market";

type UnknownRecord = Record<string, unknown>;

const GENERATED_ROOT = join(process.cwd(), "src", "data", "generated");

const TREATMENT_FILE_MAP: Record<MarketCode, string[]> = {
  us: [
    "treatment/us-semaglutide-treatment.json",
    "treatment/us-tirzepatide-treatment.json",
    "treatment/us-liraglutide-treatment.json",
    "treatment/us-exenatide-treatment.json",
    "treatment/us-dulaglutide-treatment.json",
    "treatment/us-tesamorelin-treatment.json",
    "treatment/us-bremelanotide-treatment.json",
    "treatment/us-sermorelin-treatment.json",
    "treatment/us-teriparatide-treatment.json",
    "treatment/us-octreotide-treatment.json",
    "treatment/us-triptorelin-treatment.json",
    "treatment/us-desmopressin-treatment.json",
    "treatment/us-setmelanotide-treatment.json",
    "treatment/us-linaclotide-treatment.json",
    "treatment/us-plecanatide-treatment.json",
    "treatment/us-teduglutide-treatment.json",
    "treatment/us-abaloparatide-treatment.json",
    "treatment/us-lanreotide-treatment.json",
    "treatment/us-ziconotide-treatment.json",
    "treatment/us-vosoritide-treatment.json",
    "treatment/us-oxytocin-treatment.json",
  ],
  uk: [],
  au: [],
  sg: [],
  ae: [],
  nz: [],
  de: [],
  nl: [],
  fr: [],
  es: [],
  hk: [],
  jp: [],
  kr: [],
};

const COST_FILE_MAP: Record<MarketCode, string[]> = {
  us: [
    "cost/us-semaglutide-cost.json",
    "cost/us-tirzepatide-cost.json",
    "cost/us-liraglutide-cost.json",
    "cost/us-exenatide-cost.json",
    "cost/us-dulaglutide-cost.json",
    "cost/us-tesamorelin-cost.json",
    "cost/us-bremelanotide-cost.json",
    "cost/us-sermorelin-cost.json",
    "cost/us-teriparatide-cost.json",
    "cost/us-octreotide-cost.json",
    "cost/us-triptorelin-cost.json",
    "cost/us-desmopressin-cost.json",
    "cost/us-setmelanotide-cost.json",
    "cost/us-linaclotide-cost.json",
    "cost/us-plecanatide-cost.json",
    "cost/us-teduglutide-cost.json",
    "cost/us-abaloparatide-cost.json",
    "cost/us-lanreotide-cost.json",
    "cost/us-ziconotide-cost.json",
    "cost/us-vosoritide-cost.json",
    "cost/us-oxytocin-cost.json",
  ],
  uk: [],
  au: [],
  sg: [],
  ae: [],
  nz: [],
  de: [],
  nl: [],
  fr: [],
  es: [],
  hk: [],
  jp: [],
  kr: [],
};

const APP_FILE_MAP: Record<MarketCode, string[]> = {
  us: [
    "app/us-semaglutide-tracker.json",
    "app/us-tirzepatide-tracker.json",
    "app/us-glp1-reminder.json",
    "app/us-peptide-protocol-tracker.json",
  ],
  uk: [],
  au: [],
  sg: [],
  ae: [],
  nz: [],
  de: [],
  nl: [],
  fr: [],
  es: [],
  hk: [],
  jp: [],
  kr: [],
};

const TOOL_LANDING_FILE_MAP: Record<MarketCode, string[]> = {
  us: [
    "tool/us-semaglutide-half-life.json",
    "tool/us-tirzepatide-half-life.json",
    "tool/us-semaglutide-vial-calculator.json",
    "tool/us-tirzepatide-vial-calculator.json",
  ],
  uk: [],
  au: [],
  sg: [],
  ae: [],
  nz: [],
  de: [],
  nl: [],
  fr: [],
  es: [],
  hk: [],
  jp: [],
  kr: [],
};

const MARKET_TREATMENT_FILE_MAP: Record<MarketCode, string[]> = {
  us: [],
  uk: ["treatment/uk-semaglutide-market-treatment.json"],
  au: ["treatment/au-tirzepatide-market-treatment.json"],
  sg: [],
  ae: [],
  nz: [],
  de: [],
  nl: [],
  fr: [],
  es: [],
  hk: [],
  jp: [],
  kr: [],
};

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function validateMeta(value: unknown): value is ContentMeta {
  return (
    isRecord(value) &&
    isString(value.id) &&
    isString(value.slug) &&
    isString(value.locale) &&
    isString(value.market) &&
    isString(value.reviewState) &&
    isString(value.monetizationState) &&
    typeof value.indexable === "boolean" &&
    isString(value.lastUpdated) &&
    isString(value.contentType)
  );
}

function validateSeo(value: unknown): value is SeoBlock {
  return (
    isRecord(value) &&
    isString(value.title) &&
    isString(value.description) &&
    isString(value.canonicalPath) &&
    isStringArray(value.keywords)
  );
}

function validateTrust(value: unknown): value is TrustBlock {
  return (
    isRecord(value) &&
    isString(value.reviewedAt) &&
    typeof value.sourceCount === "number" &&
    isString(value.disclaimer)
  );
}

function validateFaqArray(value: unknown): value is FaqItem[] {
  return (
    Array.isArray(value) &&
    value.every((item) => isRecord(item) && isString(item.question) && isString(item.answer))
  );
}

function validateCta(value: unknown): value is CtaBlock {
  return (
    isRecord(value) &&
    isString(value.primaryLabel) &&
    isString(value.primaryHref) &&
    (value.secondaryLabel === undefined || typeof value.secondaryLabel === "string") &&
    (value.secondaryHref === undefined || typeof value.secondaryHref === "string") &&
    (value.notes === undefined || typeof value.notes === "string")
  );
}

function validateSources(value: unknown): value is SourceCitation[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        isRecord(item) &&
        isString(item.id) &&
        isString(item.authority) &&
        isString(item.title) &&
        isString(item.url) &&
        isString(item.claimType)
    )
  );
}

function assertTreatmentHubContent(value: unknown): asserts value is TreatmentHubContent {
  if (
    !isRecord(value) ||
    !validateMeta(value.meta) ||
    value.meta.contentType !== "treatment-hub" ||
    !validateSeo(value.seo) ||
    !validateTrust(value.trust) ||
    !isString(value.treatmentSlug) ||
    !isString(value.treatmentName) ||
    !isString(value.marketSummary) ||
    !isString(value.overview) ||
    !isStringArray(value.benefits) ||
    !isStringArray(value.sideEffects) ||
    !isStringArray(value.routes) ||
    !isString(value.costSummary) ||
    !isString(value.providerSummary) ||
    !isString(value.appSummary) ||
    !Array.isArray(value.approvedProducts) ||
    !value.approvedProducts.every(
      (item) =>
        isRecord(item) &&
        isString(item.slug) &&
        isString(item.name) &&
        isString(item.summary)
    ) ||
    !validateFaqArray(value.faqs) ||
    !validateCta(value.cta) ||
    !validateSources(value.sources)
  ) {
    throw new Error("Invalid generated treatment hub asset.");
  }

  if (value.trust.sourceCount !== value.sources.length) {
    throw new Error(
      `Invalid generated treatment hub asset '${value.meta.slug}': sourceCount mismatch.`
    );
  }
}

function assertCostContent(value: unknown): asserts value is CostContent {
  if (
    !isRecord(value) ||
    !validateMeta(value.meta) ||
    value.meta.contentType !== "cost" ||
    !validateSeo(value.seo) ||
    !validateTrust(value.trust) ||
    !isString(value.treatmentSlug) ||
    !isString(value.treatmentName) ||
    !isString(value.marketSummary) ||
    !isString(value.listPrice) ||
    !isString(value.cashPayRange) ||
    !isString(value.insuranceSummary) ||
    !isString(value.couponSummary) ||
    !isString(value.priorAuthSummary) ||
    !validateFaqArray(value.faqs) ||
    !validateCta(value.cta) ||
    !validateSources(value.sources)
  ) {
    throw new Error("Invalid generated cost content asset.");
  }

  if (value.trust.sourceCount !== value.sources.length) {
    throw new Error(`Invalid generated cost content asset '${value.meta.slug}': sourceCount mismatch.`);
  }
}

function assertAppLandingContent(value: unknown): asserts value is AppLandingContent {
  if (
    !isRecord(value) ||
    !validateMeta(value.meta) ||
    value.meta.contentType !== "app-landing" ||
    !validateSeo(value.seo) ||
    !validateTrust(value.trust) ||
    !isString(value.appUseCaseSlug) ||
    !isString(value.title) ||
    !isString(value.summary) ||
    !isStringArray(value.supportedTreatments) ||
    !isStringArray(value.supportedFeatures) ||
    !isString(value.privacySummary) ||
    !isString(value.availabilitySummary) ||
    !validateFaqArray(value.faqs) ||
    !validateCta(value.cta) ||
    !validateSources(value.sources)
  ) {
    throw new Error("Invalid generated app landing asset.");
  }

  if (value.trust.sourceCount !== value.sources.length) {
    throw new Error(`Invalid generated app landing asset '${value.meta.slug}': sourceCount mismatch.`);
  }
}

function assertMarketTreatmentContent(value: unknown): asserts value is MarketTreatmentContent {
  if (
    !isRecord(value) ||
    !validateMeta(value.meta) ||
    value.meta.contentType !== "market-treatment" ||
    !validateSeo(value.seo) ||
    !validateTrust(value.trust) ||
    !isString(value.treatmentSlug) ||
    !isString(value.treatmentName) ||
    !isString(value.marketSummary) ||
    !["approved", "restricted", "unapproved"].includes(value.approvalStatus as string) ||
    !Array.isArray(value.approvedProducts) ||
    !value.approvedProducts.every(
      (item) => isRecord(item) && isString(item.slug) && isString(item.name) && isString(item.summary)
    ) ||
    !isString(value.costSummary) ||
    !isString(value.providerPathway) ||
    !isString(value.onlinePharmacyNotes) ||
    !isStringArray(value.legalNotes) ||
    !validateFaqArray(value.faqs) ||
    !validateCta(value.cta) ||
    !validateSources(value.sources)
  ) {
    throw new Error("Invalid generated market-treatment asset.");
  }

  if (value.trust.sourceCount !== value.sources.length) {
    throw new Error(
      `Invalid generated market-treatment asset '${value.meta.slug}': sourceCount mismatch.`
    );
  }
}

function assertToolLandingContent(value: unknown): asserts value is ToolLandingContent {
  if (
    !isRecord(value) ||
    !validateMeta(value.meta) ||
    value.meta.contentType !== "tool-landing" ||
    !validateSeo(value.seo) ||
    !validateTrust(value.trust) ||
    !isString(value.toolSlug) ||
    !isString(value.toolName) ||
    !isString(value.summary) ||
    !isStringArray(value.supportedTreatments) ||
    !isStringArray(value.requiredInputs) ||
    !isStringArray(value.exampleOutputs) ||
    !isString(value.appHandoffSummary) ||
    !validateFaqArray(value.faqs) ||
    !validateCta(value.cta) ||
    !validateSources(value.sources)
  ) {
    throw new Error("Invalid generated tool-landing asset.");
  }

  if (value.trust.sourceCount !== value.sources.length) {
    throw new Error(
      `Invalid generated tool-landing asset '${value.meta.slug}': sourceCount mismatch.`
    );
  }
}

function parseJsonFile(pathname: string) {
  const raw = readFileSync(join(GENERATED_ROOT, pathname), "utf8");
  return JSON.parse(raw) as unknown;
}

function loadTreatmentAssets(marketCode: MarketCode) {
  return TREATMENT_FILE_MAP[marketCode].map((pathname) => {
    const asset = parseJsonFile(pathname);
    assertTreatmentHubContent(asset);
    return asset;
  });
}

function loadCostAssets(marketCode: MarketCode) {
  return COST_FILE_MAP[marketCode].map((pathname) => {
    const asset = parseJsonFile(pathname);
    assertCostContent(asset);
    return asset;
  });
}

function loadAppAssets(marketCode: MarketCode) {
  return APP_FILE_MAP[marketCode].map((pathname) => {
    const asset = parseJsonFile(pathname);
    assertAppLandingContent(asset);
    return asset;
  });
}

export function getGeneratedTreatmentHubContent(slug: string, marketCode: MarketCode = "us") {
  return loadTreatmentAssets(marketCode).find((asset) => asset.meta.slug === slug);
}

export function getGeneratedTreatmentHubSlugs(marketCode: MarketCode = "us") {
  return loadTreatmentAssets(marketCode).map((asset) => asset.meta.slug);
}

export function getGeneratedTreatmentHubSummaries(marketCode: MarketCode = "us") {
  return loadTreatmentAssets(marketCode);
}

export function getGeneratedCostContent(slug: string, marketCode: MarketCode = "us") {
  return loadCostAssets(marketCode).find((asset) => asset.meta.slug === slug);
}

export function getGeneratedAppLandingContent(slug: string, marketCode: MarketCode = "us") {
  return loadAppAssets(marketCode).find((asset) => asset.meta.slug === slug);
}

export function getGeneratedCostSlugs(marketCode: MarketCode = "us") {
  return loadCostAssets(marketCode).map((asset) => asset.meta.slug);
}

export function getGeneratedAppLandingSlugs(marketCode: MarketCode = "us") {
  return loadAppAssets(marketCode).map((asset) => asset.meta.slug);
}

export function getGeneratedCostSummaries(marketCode: MarketCode = "us") {
  return loadCostAssets(marketCode);
}

export function getGeneratedAppLandingSummaries(marketCode: MarketCode = "us") {
  return loadAppAssets(marketCode);
}

export function getGeneratedTreatmentHref(slug: string) {
  return `/treatments/${slug}`;
}

function loadMarketTreatmentAssets(marketCode: MarketCode) {
  return MARKET_TREATMENT_FILE_MAP[marketCode].map((pathname) => {
    const asset = parseJsonFile(pathname);
    assertMarketTreatmentContent(asset);
    return asset;
  });
}

export function getGeneratedMarketTreatmentContent(
  slug: string,
  marketCode: MarketCode
): MarketTreatmentContent | undefined {
  return loadMarketTreatmentAssets(marketCode).find((asset) => asset.meta.slug === slug);
}

export function getGeneratedMarketTreatmentSlugs(marketCode: MarketCode): string[] {
  return loadMarketTreatmentAssets(marketCode).map((asset) => asset.meta.slug);
}

export function getGeneratedMarketTreatmentSummaries(marketCode: MarketCode): MarketTreatmentContent[] {
  return loadMarketTreatmentAssets(marketCode);
}

export function getMarketCodesWithTreatmentContent(): MarketCode[] {
  return (Object.keys(MARKET_TREATMENT_FILE_MAP) as MarketCode[]).filter(
    (code) => MARKET_TREATMENT_FILE_MAP[code].length > 0
  );
}

export function getGeneratedMarketTreatmentHref(marketCode: string, slug: string) {
  return `/markets/${marketCode}/treatments/${slug}`;
}

export function getGeneratedCostHref(slug: string) {
  return `/costs/${slug}`;
}

export function getGeneratedAppHref(slug: string) {
  return `/app/${slug}`;
}

function loadToolLandingAssets(marketCode: MarketCode) {
  return TOOL_LANDING_FILE_MAP[marketCode].map((pathname) => {
    const asset = parseJsonFile(pathname);
    assertToolLandingContent(asset);
    return asset;
  });
}

export function getGeneratedToolLandingContent(
  slug: string,
  marketCode: MarketCode = "us"
): ToolLandingContent | undefined {
  return loadToolLandingAssets(marketCode).find((asset) => asset.meta.slug === slug);
}

export function getGeneratedToolLandingSlugs(marketCode: MarketCode = "us"): string[] {
  return loadToolLandingAssets(marketCode).map((asset) => asset.meta.slug);
}

export function getGeneratedToolLandingSummaries(marketCode: MarketCode = "us"): ToolLandingContent[] {
  return loadToolLandingAssets(marketCode);
}

export function getGeneratedToolLandingHref(slug: string) {
  return `/tools/${slug}`;
}
