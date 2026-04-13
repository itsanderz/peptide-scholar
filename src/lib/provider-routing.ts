import { providerPartners, type ProviderPartner } from "@/data/provider-partners";
import { getStateBySlug } from "@/data/states-legal";
import { canShowProviderReferrals } from "@/lib/market";
import type { MarketCode } from "@/types/market";

export interface ProviderRoutingInput {
  marketCode: MarketCode;
  treatmentSlug: string;
  goal: string;
  state: string;
  insuranceStatus: string;
  budgetBand: string;
  urgency: string;
}

export interface ProviderRoutingResult {
  providerEnabled: boolean;
  primaryPartnerSlug: string;
  matches: ProviderPartner[];
}

export interface ProviderStateGuidance {
  headline: string;
  summary: string;
  emphasis: string;
  caution: string;
}

function scorePartner(partner: ProviderPartner, input: ProviderRoutingInput) {
  let score = 0;

  if (partner.markets.includes(input.marketCode)) score += 4;
  if (partner.treatments.includes(input.treatmentSlug)) score += 5;
  else if (partner.treatments.includes("general")) score += 2;

  if (partner.goals.includes(input.goal)) score += 4;
  if (partner.insurancePreferences.includes(input.insuranceStatus as ProviderPartner["insurancePreferences"][number])) score += 4;
  if (partner.budgetBands.includes(input.budgetBand as ProviderPartner["budgetBands"][number])) score += 3;
  if (partner.urgencyBands.includes(input.urgency as ProviderPartner["urgencyBands"][number])) score += 2;

  if (!partner.supportedStates || partner.supportedStates.length === 0) {
    score += 1;
  } else if (partner.supportedStates.includes(input.state)) {
    score += 3;
  }

  if (input.urgency === "this-week" && partner.intakeMode === "telehealth") {
    score += 2;
  }

  return score;
}

export function getProviderMatches(input: ProviderRoutingInput): ProviderRoutingResult {
  const providerEnabled = canShowProviderReferrals(input.marketCode);

  if (!providerEnabled) {
    return {
      providerEnabled,
      primaryPartnerSlug: "waitlist-only",
      matches: [],
    };
  }

  const matches = providerPartners
    .map((partner) => ({ partner, score: scorePartner(partner, input) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ partner }) => partner);

  return {
    providerEnabled,
    primaryPartnerSlug: matches[0]?.slug ?? "manual-review",
    matches,
  };
}

export function getProviderStateGuidance(stateSlug: string): ProviderStateGuidance | null {
  const state = getStateBySlug(stateSlug);
  if (!state) return null;

  if (state.stance === "restrictive") {
    return {
      headline: `${state.stateName} routing should stay approval-first`,
      summary:
        "PeptideScholar's current state model treats restrictive states as a higher-friction environment for non-approved or loosely marketed pathways.",
      emphasis:
        "Prioritize approved-treatment conversations, stronger insurance/documentation workflows, and clearer prescribing oversight.",
      caution:
        "Do not treat this as a claim about any one clinic. It is internal routing guidance based on the current legal-state model.",
    };
  }

  if (state.stance === "permissive") {
    return {
      headline: `${state.stateName} routing can stay broader`,
      summary:
        "PeptideScholar's current state model treats permissive states as lower-friction environments for telehealth-heavy and cash-pay-first routing decisions.",
      emphasis:
        "Broader intake styles can be considered, but approved-treatment pathways should still anchor any higher-trust recommendation.",
      caution:
        "This does not verify external provider behavior or availability. It is internal routing guidance only.",
    };
  }

  return {
    headline: `${state.stateName} routing should stay balanced`,
    summary:
      "PeptideScholar's current state model treats moderate states as standard-oversight environments where approved pathways and routine telehealth routing can both be considered.",
    emphasis:
      "Balance treatment fit, budget, and insurance preferences rather than over-weighting one routing style.",
    caution:
      "This is routing guidance based on the site's state model, not a verified claim about specific provider operations.",
  };
}
