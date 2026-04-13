export type MarketCode =
  | "us"
  | "uk"
  | "au"
  | "sg"
  | "ae"
  | "nz"
  | "de"
  | "nl"
  | "fr"
  | "es"
  | "hk"
  | "jp"
  | "kr";

export type MarketRegion =
  | "north-america"
  | "europe"
  | "oceania"
  | "asia"
  | "middle-east";

export type CurrencyCode =
  | "USD"
  | "GBP"
  | "AUD"
  | "SGD"
  | "AED"
  | "NZD"
  | "EUR"
  | "HKD"
  | "JPY"
  | "KRW";

export type MeasurementSystem = "imperial" | "metric" | "mixed";

export type MarketRegulator =
  | "FDA"
  | "MHRA"
  | "TGA"
  | "HSA"
  | "DHA"
  | "MOHAP"
  | "Medsafe"
  | "BfArM"
  | "MEB"
  | "ANSM"
  | "AEMPS"
  | "Department of Health";

export type MarketReadiness =
  | "research"
  | "content-ready"
  | "tools-ready"
  | "app-ready"
  | "partner-ready"
  | "fully-monetized";

export type MonetizationState =
  | "none"
  | "email-capture"
  | "app-waitlist"
  | "digital-products"
  | "provider-referral"
  | "sponsored-partners"
  | "full-stack";

export type MarketLaunchState =
  | "not-planned"
  | "planned"
  | "in-review"
  | "soft-live"
  | "live"
  | "paused";

export interface RegulatorNotice {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  summary: string;
}

export interface MarketLanguageSupport {
  locale: string;
  isPrimary: boolean;
  isIndexable: boolean;
  notes?: string;
}

export interface MarketProductAvailability {
  productSlug: string;
  productName: string;
  treatmentSlug: string;
  approved: boolean;
  approvalScope: string | null;
  approvalNotes?: string | null;
  prescriptionRequired: boolean;
  telehealthAllowedNotes?: string | null;
  onlinePharmacyNotes?: string | null;
}

export interface MarketPricingContext {
  treatmentSlug: string;
  currency: CurrencyCode;
  typicalCashRangeMin: number | null;
  typicalCashRangeMax: number | null;
  insuranceCommon: boolean;
  priorAuthCommon: boolean;
  couponProgramsCommon: boolean;
  notes?: string | null;
  lastReviewed: string;
}

export interface MarketProviderRules {
  providerReferralsEnabled: boolean;
  sponsoredListingsEnabled: boolean;
  marketplaceEnabled: boolean;
  acceptedLeadTypes: string[];
  disclaimer: string;
  unsupportedFallbackCta: "email-capture" | "app-waitlist" | "tool-handoff";
}

export interface MarketContentPolicy {
  autoIndexDefault: boolean;
  appPagesIndexable: boolean;
  providerPagesIndexable: boolean;
  treatmentPagesIndexable: boolean;
  legalPagesIndexable: boolean;
  localePairIndexable: boolean;
  notes?: string;
}

export interface Market {
  code: MarketCode;
  name: string;
  region: MarketRegion;
  primaryCurrency: CurrencyCode;
  measurementSystem: MeasurementSystem;
  regulator: MarketRegulator;
  regulatorNotices: RegulatorNotice[];
  launchState: MarketLaunchState;
  readiness: MarketReadiness;
  monetizationState: MonetizationState;
  defaultLocale: string;
  localeSupport: MarketLanguageSupport[];
  products: MarketProductAvailability[];
  pricingContexts: MarketPricingContext[];
  providerRules: MarketProviderRules;
  contentPolicy: MarketContentPolicy;
  appEnabled: boolean;
  appWaitlistEnabled: boolean;
  notes?: string;
}

