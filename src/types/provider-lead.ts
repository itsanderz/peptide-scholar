import type { MarketCode } from "@/types/market";

export type ProviderLeadType = "provider-match" | "waitlist-match" | "cost-support" | "tracker-interest";

export type ProviderLeadStatus =
  | "received"
  | "queued"
  | "routed"
  | "waitlist"
  | "manual-review";

/** Outcome statuses posted back by partner systems via /api/leads/provider/status */
export type ProviderLeadOutcome =
  | "booked"
  | "converted"
  | "not-qualified"
  | "no-show"
  | "churned";

export interface ProviderLeadStatusUpdate {
  leadId: string;
  partnerSlug: string;
  outcome: ProviderLeadOutcome;
  occurredAt: string; // ISO 8601
  notes?: string;
}

export type ProviderQualificationBand = "high" | "medium" | "low";

export interface ProviderLeadInput {
  marketCode: MarketCode;
  partnerSlug?: string;
  leadType: ProviderLeadType;
  treatmentSlug: string;
  goal: string;
  state: string;
  insuranceStatus: string;
  budgetBand: string;
  urgency: string;
  email: string;
  entryPoint?: string;
}

export interface ProviderLeadScore {
  score: number;
  band: ProviderQualificationBand;
  reasons: string[];
}

export interface ProviderLeadRecord extends ProviderLeadInput {
  id: string;
  submittedAt: string;
  status: ProviderLeadStatus;
  providerEnabled: boolean;
  primaryPartnerSlug: string;
  recommendedPartnerSlugs: string[];
  score: ProviderLeadScore;
}

export interface ProviderCrmPayload {
  leadId: string;
  submittedAt: string;
  status: ProviderLeadStatus;
  market: MarketCode;
  leadType: ProviderLeadType;
  treatmentSlug: string;
  goal: string;
  state: string;
  insuranceStatus: string;
  budgetBand: string;
  urgency: string;
  email: string;
  entryPoint: string;
  providerEnabled: boolean;
  primaryPartnerSlug: string;
  recommendedPartnerSlugs: string[];
  qualificationScore: number;
  qualificationBand: ProviderQualificationBand;
  scoreReasons: string[];
}
