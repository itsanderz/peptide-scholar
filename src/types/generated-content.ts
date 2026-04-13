import type { EvidenceLevel, FDAStatus } from "@/data/peptides";
import type { MarketCode, MonetizationState } from "@/types/market";

export type ReviewState =
  | "draft"
  | "generated"
  | "generated-noindex"
  | "reviewed-indexable"
  | "monetizable"
  | "deprecated";

export interface SourceCitation {
  id: string;
  authority: string;
  title: string;
  url: string;
  publishedAt?: string;
  accessedAt?: string;
  claimType:
    | "clinical"
    | "regulatory"
    | "pricing"
    | "provider"
    | "safety"
    | "market";
}

export interface ContentMeta {
  id: string;
  slug: string;
  locale: string;
  market: MarketCode;
  reviewState: ReviewState;
  monetizationState: MonetizationState;
  indexable: boolean;
  generatedAt?: string;
  reviewedAt?: string;
  lastUpdated: string;
  contentType:
    | "treatment-hub"
    | "market-treatment"
    | "comparison"
    | "provider"
    | "cost"
    | "tool-landing"
    | "app-landing"
    | "legal-overview"
    | "safety-guide";
}

export interface SeoBlock {
  title: string;
  description: string;
  canonicalPath: string;
  keywords: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CtaBlock {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  notes?: string;
}

export interface TrustBlock {
  evidenceLevel?: EvidenceLevel;
  reviewedBy?: string;
  reviewedAt: string;
  sourceCount: number;
  disclaimer: string;
}

export interface TreatmentHubContent {
  meta: ContentMeta;
  seo: SeoBlock;
  trust: TrustBlock;
  treatmentSlug: string;
  treatmentName: string;
  evidenceLevel: EvidenceLevel;
  fdaStatus: FDAStatus;
  marketSummary: string;
  overview: string;
  approvedProducts: { slug: string; name: string; summary: string }[];
  benefits: string[];
  sideEffects: string[];
  routes: string[];
  costSummary: string;
  providerSummary: string;
  appSummary: string;
  faqs: FaqItem[];
  cta: CtaBlock;
  sources: SourceCitation[];
}

export interface MarketTreatmentContent {
  meta: ContentMeta;
  seo: SeoBlock;
  trust: TrustBlock;
  treatmentSlug: string;
  treatmentName: string;
  marketSummary: string;
  approvalStatus: "approved" | "restricted" | "unapproved";
  approvalScope: string | null;
  approvedProducts: {
    slug: string;
    name: string;
    summary: string;
  }[];
  costSummary: string;
  providerPathway: string;
  onlinePharmacyNotes: string;
  legalNotes: string[];
  faqs: FaqItem[];
  cta: CtaBlock;
  sources: SourceCitation[];
}

export interface ComparisonDimensionContent {
  name: string;
  treatmentAValue: string;
  treatmentBValue: string;
  winner: "a" | "b" | "tie" | null;
}

export interface ComparisonContent {
  meta: ContentMeta;
  seo: SeoBlock;
  trust: TrustBlock;
  treatmentASlug: string;
  treatmentAName: string;
  treatmentBSlug: string;
  treatmentBName: string;
  marketSummary: string;
  summary: string;
  dimensions: ComparisonDimensionContent[];
  recommendationSummary: string;
  faqs: FaqItem[];
  cta: CtaBlock;
  sources: SourceCitation[];
}

export interface ProviderContent {
  meta: ContentMeta;
  seo: SeoBlock;
  trust: TrustBlock;
  providerSlug: string;
  providerName: string;
  marketsServed: MarketCode[];
  treatmentSlugs: string[];
  telehealth: boolean;
  insuranceAccepted: boolean;
  pricingModel: string;
  verificationSummary: string;
  proofSignals: string[];
  fitSummary: string;
  cta: CtaBlock;
  sources: SourceCitation[];
}

export interface CostContent {
  meta: ContentMeta;
  seo: SeoBlock;
  trust: TrustBlock;
  treatmentSlug: string;
  treatmentName: string;
  marketSummary: string;
  listPrice: string;
  cashPayRange: string;
  insuranceSummary: string;
  couponSummary: string;
  priorAuthSummary: string;
  faqs: FaqItem[];
  cta: CtaBlock;
  sources: SourceCitation[];
}

export interface ToolLandingContent {
  meta: ContentMeta;
  seo: SeoBlock;
  trust: TrustBlock;
  toolSlug: string;
  toolName: string;
  summary: string;
  supportedTreatments: string[];
  requiredInputs: string[];
  exampleOutputs: string[];
  appHandoffSummary: string;
  faqs: FaqItem[];
  cta: CtaBlock;
  sources: SourceCitation[];
}

export interface AppLandingContent {
  meta: ContentMeta;
  seo: SeoBlock;
  trust: TrustBlock;
  appUseCaseSlug: string;
  title: string;
  summary: string;
  supportedTreatments: string[];
  supportedFeatures: string[];
  privacySummary: string;
  availabilitySummary: string;
  faqs: FaqItem[];
  cta: CtaBlock;
  sources: SourceCitation[];
}

