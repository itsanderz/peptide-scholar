import type { Market, MarketCode } from "@/types/market";

const REVIEWED_AT = "2026-04-11";
const PROVIDER_DISCLAIMER =
  "Provider routing appears only in markets that have passed editorial, commercial, and compliance review.";
const WAITLIST_DISCLAIMER =
  "When partner routing is unavailable, PeptideScholar should fall back to education, tools, and app capture.";

function locale(locale: string, isPrimary: boolean, isIndexable: boolean, notes?: string) {
  return { locale, isPrimary, isIndexable, notes };
}

function product(
  productSlug: string,
  productName: string,
  treatmentSlug: string,
  approved: boolean,
  approvalScope: string | null
) {
  return {
    productSlug,
    productName,
    treatmentSlug,
    approved,
    approvalScope,
    prescriptionRequired: true,
    approvalNotes: null,
    telehealthAllowedNotes: null,
    onlinePharmacyNotes: null,
  };
}

function pricing(
  treatmentSlug: string,
  currency: Market["primaryCurrency"],
  typicalCashRangeMin: number | null,
  typicalCashRangeMax: number | null,
  notes?: string
) {
  return {
    treatmentSlug,
    currency,
    typicalCashRangeMin,
    typicalCashRangeMax,
    insuranceCommon: false,
    priorAuthCommon: false,
    couponProgramsCommon: false,
    notes: notes ?? null,
    lastReviewed: REVIEWED_AT,
  };
}

function providerRules(
  providerReferralsEnabled: boolean,
  sponsoredListingsEnabled: boolean,
  unsupportedFallbackCta: Market["providerRules"]["unsupportedFallbackCta"],
  acceptedLeadTypes: string[],
  disclaimer: string
) {
  return {
    providerReferralsEnabled,
    sponsoredListingsEnabled,
    marketplaceEnabled: false,
    acceptedLeadTypes,
    disclaimer,
    unsupportedFallbackCta,
  };
}

function contentPolicy(
  autoIndexDefault: boolean,
  appPagesIndexable: boolean,
  providerPagesIndexable: boolean,
  treatmentPagesIndexable: boolean,
  legalPagesIndexable: boolean,
  localePairIndexable: boolean,
  notes?: string
) {
  return {
    autoIndexDefault,
    appPagesIndexable,
    providerPagesIndexable,
    treatmentPagesIndexable,
    legalPagesIndexable,
    localePairIndexable,
    notes,
  };
}

const commonGlp1Products = [
  product("wegovy", "Wegovy", "semaglutide", true, "Weight management"),
  product("mounjaro", "Mounjaro", "tirzepatide", true, "Type 2 diabetes and obesity pathway"),
];

const euPricing = [
  pricing("semaglutide", "EUR", 250, 450),
  pricing("tirzepatide", "EUR", 300, 500),
];

export const DEFAULT_MARKET_CODE: MarketCode = "us";

export const LAUNCH_SEQUENCE: MarketCode[] = [
  "us",
  "uk",
  "au",
  "sg",
  "ae",
  "nz",
  "de",
  "nl",
  "fr",
  "es",
  "hk",
  "jp",
  "kr",
];

export const markets: Market[] = [
  {
    code: "us",
    name: "United States",
    region: "north-america",
    primaryCurrency: "USD",
    measurementSystem: "imperial",
    regulator: "FDA",
    regulatorNotices: [
      {
        id: "fda-glp1-telehealth-2026-03-03",
        title: "FDA warns telehealth companies against illegal marketing of compounded GLP-1s",
        url: "https://www.fda.gov/news-events/press-announcements/fda-warns-30-telehealth-companies-against-illegal-marketing-compounded-glp-1s",
        publishedAt: "2026-03-03",
        summary: "US monetization should stay focused on approved-treatment pathways.",
      },
    ],
    launchState: "live",
    readiness: "fully-monetized",
    monetizationState: "full-stack",
    defaultLocale: "en",
    localeSupport: [
      locale("en", true, true, "Primary revenue locale"),
      locale("es", false, true, "Secondary acquisition locale"),
    ],
    products: [
      product("wegovy", "Wegovy", "semaglutide", true, "Chronic weight management"),
      product("ozempic", "Ozempic", "semaglutide", true, "Type 2 diabetes"),
      product("zepbound", "Zepbound", "tirzepatide", true, "Chronic weight management"),
      product("mounjaro", "Mounjaro", "tirzepatide", true, "Type 2 diabetes"),
      product("egrifta", "Egrifta SV", "tesamorelin", true, "HIV-associated lipodystrophy"),
    ],
    pricingContexts: [
      pricing("semaglutide", "USD", 900, 1400, "Insurance and savings vary by benefit design."),
      pricing("tirzepatide", "USD", 1000, 1550, "Cash-pay demand is high and pricing swings."),
    ],
    providerRules: providerRules(
      true,
      true,
      "tool-handoff",
      ["telehealth-intake", "insurance-screen", "weight-management-match"],
      PROVIDER_DISCLAIMER
    ),
    contentPolicy: contentPolicy(true, true, true, true, true, true, "Keep thin peptide x state variants noindex."),
    appEnabled: true,
    appWaitlistEnabled: true,
    notes: "Primary proving ground for revenue and retention.",
  },
  {
    code: "uk",
    name: "United Kingdom",
    region: "europe",
    primaryCurrency: "GBP",
    measurementSystem: "metric",
    regulator: "MHRA",
    regulatorNotices: [],
    launchState: "planned",
    readiness: "tools-ready",
    monetizationState: "app-waitlist",
    defaultLocale: "en",
    localeSupport: [locale("en", true, true, "English-first expansion market")],
    products: commonGlp1Products,
    pricingContexts: [
      pricing("semaglutide", "GBP", 175, 350),
      pricing("tirzepatide", "GBP", 190, 375),
    ],
    providerRules: providerRules(false, false, "app-waitlist", [], WAITLIST_DISCLAIMER),
    contentPolicy: contentPolicy(false, true, false, true, true, false, "Treatment, tool, and app pages first."),
    appEnabled: false,
    appWaitlistEnabled: true,
    notes: "Second market by priority due to language leverage and demand.",
  },
  {
    code: "au",
    name: "Australia",
    region: "oceania",
    primaryCurrency: "AUD",
    measurementSystem: "metric",
    regulator: "TGA",
    regulatorNotices: [
      {
        id: "tga-ozempic-advertising-2025-03-11",
        title: "Advertising prescription medicine Ozempic is prohibited",
        url: "https://www.tga.gov.au/advertising-prescription-medicine-ozempic-semaglutide-prohibited",
        publishedAt: "2025-03-11",
        summary: "Australian launch needs conservative prescription-drug marketing language.",
      },
    ],
    launchState: "planned",
    readiness: "content-ready",
    monetizationState: "email-capture",
    defaultLocale: "en",
    localeSupport: [locale("en", true, true, "Primary AU rollout locale")],
    products: commonGlp1Products,
    pricingContexts: [
      pricing("semaglutide", "AUD", 250, 550),
      pricing("tirzepatide", "AUD", 300, 650),
    ],
    providerRules: providerRules(false, false, "email-capture", [], WAITLIST_DISCLAIMER),
    contentPolicy: contentPolicy(false, true, false, true, true, false, "Education and tools before provider routing."),
    appEnabled: false,
    appWaitlistEnabled: true,
    notes: "High-value market, but compliance and wording need extra care.",
  },
  {
    code: "sg",
    name: "Singapore",
    region: "asia",
    primaryCurrency: "SGD",
    measurementSystem: "metric",
    regulator: "HSA",
    regulatorNotices: [
      {
        id: "hsa-illegal-products-2025",
        title: "HSA seized over 1 million illegal health products in 2025",
        url: "https://www.hsa.gov.sg/announcements/press-release/hsa-seized-over-1-million-illegal-health-products-and-removed-more-than-2-300-online-listings-in-2025",
        publishedAt: "2026-02-03",
        summary: "Singapore content should lean heavily into legitimacy and safety.",
      },
    ],
    launchState: "planned",
    readiness: "content-ready",
    monetizationState: "app-waitlist",
    defaultLocale: "en",
    localeSupport: [
      locale("en", true, true, "Primary Singapore rollout locale"),
      locale("zh", false, false, "Localization later if justified"),
    ],
    products: commonGlp1Products,
    pricingContexts: [
      pricing("semaglutide", "SGD", 300, 650),
      pricing("tirzepatide", "SGD", 350, 700),
    ],
    providerRules: providerRules(false, false, "app-waitlist", [], WAITLIST_DISCLAIMER),
    contentPolicy: contentPolicy(false, true, false, true, true, false, "Trust-first market: legality, safety, and tools."),
    appEnabled: false,
    appWaitlistEnabled: true,
    notes: "Strong fit for evidence-first positioning.",
  },
  {
    code: "ae",
    name: "United Arab Emirates",
    region: "middle-east",
    primaryCurrency: "AED",
    measurementSystem: "metric",
    regulator: "DHA",
    regulatorNotices: [
      {
        id: "dha-telehealth-standards-2025",
        title: "Dubai telehealth standards update",
        url: "https://dha.gov.ae/en/circulars/details/CIR-2025-00000212",
        publishedAt: "2025-11-14",
        summary: "Local telehealth and prescribing review should precede monetization.",
      },
    ],
    launchState: "planned",
    readiness: "content-ready",
    monetizationState: "app-waitlist",
    defaultLocale: "en",
    localeSupport: [locale("en", true, true, "Primary UAE rollout locale")],
    products: commonGlp1Products,
    pricingContexts: [
      pricing("semaglutide", "AED", 900, 1800),
      pricing("tirzepatide", "AED", 1100, 2100),
    ],
    providerRules: providerRules(false, false, "app-waitlist", [], WAITLIST_DISCLAIMER),
    contentPolicy: contentPolicy(false, true, false, true, true, false, "Premium educational launch first."),
    appEnabled: false,
    appWaitlistEnabled: true,
    notes: "High-spend market with partnership work required before aggressive conversion flows.",
  },
  {
    code: "nz",
    name: "New Zealand",
    region: "oceania",
    primaryCurrency: "NZD",
    measurementSystem: "metric",
    regulator: "Medsafe",
    regulatorNotices: [
      {
        id: "medsafe-online-medicines-warning",
        title: "Dangers of purchasing medicines online",
        url: "https://www.medsafe.govt.nz/hot/media/2011/DangersOfPurchasingMedicinesOnline.asp",
        publishedAt: "2025-12-12",
        summary: "Pharmacy legitimacy and provider routing guidance should be emphasized.",
      },
    ],
    launchState: "planned",
    readiness: "content-ready",
    monetizationState: "email-capture",
    defaultLocale: "en",
    localeSupport: [locale("en", true, true, "Primary NZ rollout locale")],
    products: [product("wegovy", "Wegovy", "semaglutide", true, "Weight management")],
    pricingContexts: [pricing("semaglutide", "NZD", 300, 600)],
    providerRules: providerRules(false, false, "email-capture", [], WAITLIST_DISCLAIMER),
    contentPolicy: contentPolicy(false, true, false, true, true, false, "Follow Australia once the playbook is proven."),
    appEnabled: false,
    appWaitlistEnabled: true,
    notes: "Smaller but operationally manageable after Australia.",
  },
  {
    code: "de",
    name: "Germany",
    region: "europe",
    primaryCurrency: "EUR",
    measurementSystem: "metric",
    regulator: "BfArM",
    regulatorNotices: [],
    launchState: "planned",
    readiness: "research",
    monetizationState: "none",
    defaultLocale: "de",
    localeSupport: [
      locale("de", true, false, "Country-specific localization required"),
      locale("en", false, false, "Secondary support later"),
    ],
    products: commonGlp1Products,
    pricingContexts: euPricing,
    providerRules: providerRules(false, false, "email-capture", [], WAITLIST_DISCLAIMER),
    contentPolicy: contentPolicy(false, false, false, false, false, false, "Do not index until localized and reviewed."),
    appEnabled: false,
    appWaitlistEnabled: false,
    notes: "Important EU market, but not first wave.",
  },
  {
    code: "nl",
    name: "Netherlands",
    region: "europe",
    primaryCurrency: "EUR",
    measurementSystem: "metric",
    regulator: "MEB",
    regulatorNotices: [],
    launchState: "planned",
    readiness: "research",
    monetizationState: "none",
    defaultLocale: "nl",
    localeSupport: [
      locale("nl", true, false, "Country-specific localization required"),
      locale("en", false, false, "Secondary support later"),
    ],
    products: commonGlp1Products,
    pricingContexts: euPricing,
    providerRules: providerRules(false, false, "email-capture", [], WAITLIST_DISCLAIMER),
    contentPolicy: contentPolicy(false, false, false, false, false, false),
    appEnabled: false,
    appWaitlistEnabled: false,
    notes: "Later EU rollout market.",
  },
  {
    code: "fr",
    name: "France",
    region: "europe",
    primaryCurrency: "EUR",
    measurementSystem: "metric",
    regulator: "ANSM",
    regulatorNotices: [],
    launchState: "planned",
    readiness: "research",
    monetizationState: "none",
    defaultLocale: "fr",
    localeSupport: [
      locale("fr", true, false, "Country-specific localization required"),
      locale("en", false, false, "Secondary support later"),
    ],
    products: commonGlp1Products,
    pricingContexts: euPricing,
    providerRules: providerRules(false, false, "email-capture", [], WAITLIST_DISCLAIMER),
    contentPolicy: contentPolicy(false, false, false, false, false, false),
    appEnabled: false,
    appWaitlistEnabled: false,
    notes: "Large market but later due to language and review overhead.",
  },
  {
    code: "es",
    name: "Spain",
    region: "europe",
    primaryCurrency: "EUR",
    measurementSystem: "metric",
    regulator: "AEMPS",
    regulatorNotices: [],
    launchState: "planned",
    readiness: "research",
    monetizationState: "none",
    defaultLocale: "es",
    localeSupport: [
      locale("es", true, false, "Spain-specific Spanish should not be conflated with US Spanish"),
      locale("en", false, false, "Secondary support later"),
    ],
    products: commonGlp1Products,
    pricingContexts: euPricing,
    providerRules: providerRules(false, false, "email-capture", [], WAITLIST_DISCLAIMER),
    contentPolicy: contentPolicy(false, false, false, false, false, false),
    appEnabled: false,
    appWaitlistEnabled: false,
    notes: "EU expansion market, not a first indexing target.",
  },
  {
    code: "hk",
    name: "Hong Kong",
    region: "asia",
    primaryCurrency: "HKD",
    measurementSystem: "metric",
    regulator: "Department of Health",
    regulatorNotices: [],
    launchState: "planned",
    readiness: "research",
    monetizationState: "none",
    defaultLocale: "en",
    localeSupport: [
      locale("en", true, false, "English-first research market"),
      locale("zh", false, false, "Localization later if justified"),
    ],
    products: commonGlp1Products,
    pricingContexts: [
      pricing("semaglutide", "HKD", 1800, 3500),
      pricing("tirzepatide", "HKD", 2200, 4200),
    ],
    providerRules: providerRules(false, false, "app-waitlist", [], WAITLIST_DISCLAIMER),
    contentPolicy: contentPolicy(false, false, false, false, false, false),
    appEnabled: false,
    appWaitlistEnabled: false,
    notes: "Potential Asia foothold later.",
  },
  {
    code: "jp",
    name: "Japan",
    region: "asia",
    primaryCurrency: "JPY",
    measurementSystem: "metric",
    regulator: "Department of Health",
    regulatorNotices: [],
    launchState: "planned",
    readiness: "research",
    monetizationState: "none",
    defaultLocale: "ja",
    localeSupport: [
      locale("ja", true, false, "Localization required"),
      locale("en", false, false, "Secondary support later"),
    ],
    products: [product("wegovy", "Wegovy", "semaglutide", true, "Weight management")],
    pricingContexts: [pricing("semaglutide", "JPY", 20000, 45000)],
    providerRules: providerRules(false, false, "app-waitlist", [], WAITLIST_DISCLAIMER),
    contentPolicy: contentPolicy(false, false, false, false, false, false),
    appEnabled: false,
    appWaitlistEnabled: false,
    notes: "Large upside, higher localization burden.",
  },
  {
    code: "kr",
    name: "South Korea",
    region: "asia",
    primaryCurrency: "KRW",
    measurementSystem: "metric",
    regulator: "Department of Health",
    regulatorNotices: [],
    launchState: "planned",
    readiness: "research",
    monetizationState: "none",
    defaultLocale: "ko",
    localeSupport: [
      locale("ko", true, false, "Localization required"),
      locale("en", false, false, "Secondary support later"),
    ],
    products: commonGlp1Products,
    pricingContexts: [
      pricing("semaglutide", "KRW", 350000, 650000),
      pricing("tirzepatide", "KRW", 420000, 750000),
    ],
    providerRules: providerRules(false, false, "app-waitlist", [], WAITLIST_DISCLAIMER),
    contentPolicy: contentPolicy(false, false, false, false, false, false),
    appEnabled: false,
    appWaitlistEnabled: false,
    notes: "Likely an app-first market much later in the rollout.",
  },
];

export const marketMap = markets.reduce<Record<MarketCode, Market>>((acc, market) => {
  acc[market.code] = market;
  return acc;
}, {} as Record<MarketCode, Market>);

export function getAllMarkets(): Market[] {
  return markets;
}

export function getMarketByCode(code: MarketCode | string): Market | undefined {
  return markets.find((market) => market.code === code);
}

export function getLiveMarkets(): Market[] {
  return markets.filter((market) => market.launchState === "live" || market.launchState === "soft-live");
}

export function getIndexableMarkets(): Market[] {
  return markets.filter((market) => market.contentPolicy.autoIndexDefault);
}

export function getMarketsWithAppWaitlist(): Market[] {
  return markets.filter((market) => market.appWaitlistEnabled);
}

export function getLaunchSequenceMarkets(): Market[] {
  return LAUNCH_SEQUENCE.map((code) => marketMap[code]);
}
