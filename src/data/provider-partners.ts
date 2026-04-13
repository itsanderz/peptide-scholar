import type { MarketCode } from "@/types/market";

export type ProviderInsurancePreference = "insured" | "cash-pay" | "either";
export type ProviderBudgetBand = "under-200" | "200-500" | "500-plus" | "unsure";
export type ProviderUrgencyBand = "this-week" | "this-month" | "researching";
export type ProviderIntakeMode = "telehealth" | "hybrid";

export interface ProviderPartner {
  slug: string;
  name: string;
  markets: MarketCode[];
  treatments: string[];
  goals: string[];
  insurancePreferences: ProviderInsurancePreference[];
  budgetBands: ProviderBudgetBand[];
  urgencyBands: ProviderUrgencyBand[];
  supportedStates?: string[] | null;
  intakeMode: ProviderIntakeMode;
  turnaroundLabel: string;
  description: string;
  bestFit: string;
  nextStepLabel: string;
  verificationSummary?: string;
  leadDestinationKey?: string;
  partnerStatus?: "internal-routing-profile" | "partner-ready";
  proofSignals?: string[];
}

export interface ProviderDirectoryFilters {
  marketCode?: MarketCode;
  treatment?: string;
  goal?: string;
  insurancePreference?: ProviderInsurancePreference | "all";
  budgetBand?: ProviderBudgetBand | "all";
  urgencyBand?: ProviderUrgencyBand | "all";
  intakeMode?: ProviderIntakeMode | "all";
  activeOnly?: boolean;
}

export const providerPartners: ProviderPartner[] = [
  {
    slug: "insurance-navigation-clinic",
    name: "Insurance Navigation Route",
    markets: ["us"],
    treatments: ["semaglutide", "tirzepatide", "general"],
    goals: ["weight-management", "metabolic-health", "education-first"],
    insurancePreferences: ["insured", "either"],
    budgetBands: ["200-500", "500-plus", "unsure"],
    urgencyBands: ["this-month", "researching"],
    supportedStates: null,
    intakeMode: "telehealth",
    turnaroundLabel: "Best when insurance navigation matters",
    description:
      "PeptideScholar routing profile for users who want to prioritize insurance navigation, plan checks, and a more traditional reimbursement path.",
    bestFit: "Insurance-backed GLP-1 pathways",
    nextStepLabel: "Review this route profile",
    verificationSummary: "Internal routing profile reviewed against treatment, insurance, and market-readiness rules.",
    leadDestinationKey: "internal_glp1_navigation_queue",
    partnerStatus: "internal-routing-profile",
    proofSignals: ["Insurance-first routing", "US market enabled", "GLP-1 treatment fit"],
  },
  {
    slug: "cash-pay-metabolic-care",
    name: "Cash-Pay Metabolic Route",
    markets: ["us"],
    treatments: ["semaglutide", "tirzepatide", "general"],
    goals: ["weight-management", "metabolic-health", "education-first"],
    insurancePreferences: ["cash-pay", "either"],
    budgetBands: ["under-200", "200-500", "unsure"],
    urgencyBands: ["this-week", "this-month", "researching"],
    supportedStates: null,
    intakeMode: "telehealth",
    turnaroundLabel: "Best when cash-pay simplicity matters",
    description:
      "PeptideScholar routing profile for users optimizing for a clearer cash-pay path, simpler checkout, and fewer insurance delays.",
    bestFit: "Budget-aware GLP-1 starts",
    nextStepLabel: "Review this route profile",
    verificationSummary: "Internal routing profile reviewed for budget-sensitive GLP-1 workflows.",
    leadDestinationKey: "internal_cash_pay_queue",
    partnerStatus: "internal-routing-profile",
    proofSignals: ["Cash-pay routing", "US market enabled", "Weight-management fit"],
  },
  {
    slug: "rapid-intake-telehealth",
    name: "Rapid Telehealth Route",
    markets: ["us"],
    treatments: ["semaglutide", "tirzepatide", "bremelanotide", "general"],
    goals: ["weight-management", "metabolic-health", "sexual-health", "education-first"],
    insurancePreferences: ["cash-pay", "either", "insured"],
    budgetBands: ["200-500", "500-plus", "unsure"],
    urgencyBands: ["this-week", "this-month"],
    supportedStates: null,
    intakeMode: "telehealth",
    turnaroundLabel: "Best when speed and telehealth fit matter",
    description:
      "PeptideScholar routing profile for users who want a faster route, telehealth-heavy workflow, and less administrative back-and-forth.",
    bestFit: "Speed and convenience",
    nextStepLabel: "Review this route profile",
    verificationSummary: "Internal routing profile reviewed for telehealth-first intake and faster-response workflows.",
    leadDestinationKey: "internal_rapid_intake_queue",
    partnerStatus: "internal-routing-profile",
    proofSignals: ["Telehealth-first", "Urgent-intake fit", "Broad approved-treatment coverage"],
  },
  {
    slug: "hormone-specialist-network",
    name: "Hormone Support Route",
    markets: ["us"],
    treatments: ["tesamorelin", "sermorelin", "general"],
    goals: ["hormone-support", "education-first"],
    insurancePreferences: ["cash-pay", "either"],
    budgetBands: ["200-500", "500-plus", "unsure"],
    urgencyBands: ["this-month", "researching"],
    supportedStates: null,
    intakeMode: "hybrid",
    turnaroundLabel: "Best when deeper hormone-support context matters",
    description:
      "PeptideScholar routing profile for users who need deeper endocrine or protocol context before starting a hormone-support pathway.",
    bestFit: "Hormone-support decision support",
    nextStepLabel: "Review this route profile",
    verificationSummary: "Internal routing profile reviewed for hormone-support and longer-form intake needs.",
    leadDestinationKey: "internal_hormone_support_queue",
    partnerStatus: "internal-routing-profile",
    proofSignals: ["Hormone-support fit", "Hybrid intake", "US market enabled"],
  },
  {
    slug: "specialty-sexual-health-clinic",
    name: "Sexual Health Route",
    markets: ["us"],
    treatments: ["bremelanotide", "general"],
    goals: ["sexual-health", "education-first"],
    insurancePreferences: ["cash-pay", "either"],
    budgetBands: ["200-500", "500-plus", "unsure"],
    urgencyBands: ["this-week", "this-month", "researching"],
    supportedStates: null,
    intakeMode: "telehealth",
    turnaroundLabel: "Best when narrower sexual-health triage matters",
    description:
      "PeptideScholar routing profile for users looking for a narrower specialty path with clearer counseling around sexual-health goals.",
    bestFit: "Sexual-health treatment matching",
    nextStepLabel: "Review this route profile",
    verificationSummary: "Internal routing profile reviewed for sexual-health treatment triage in the US market.",
    leadDestinationKey: "internal_sexual_health_queue",
    partnerStatus: "internal-routing-profile",
    proofSignals: ["Sexual-health fit", "Telehealth-first", "US market enabled"],
  },
];

export function getAllProviderPartners(): ProviderPartner[] {
  return providerPartners;
}

export function getProviderPartnerBySlug(slug: string): ProviderPartner | undefined {
  return providerPartners.find((partner) => partner.slug === slug);
}

export function getAllProviderTreatmentSlugs(): string[] {
  return Array.from(
    new Set(
      providerPartners.flatMap((partner) => partner.treatments).filter((slug) => slug !== "general")
    )
  ).sort();
}

export function getAllProviderGoalSlugs(): string[] {
  return Array.from(
    new Set(
      providerPartners.flatMap((partner) => partner.goals).filter((slug) => slug !== "education-first")
    )
  ).sort();
}

export function getProviderPartnersByTreatment(slug: string): ProviderPartner[] {
  return providerPartners.filter((partner) => partner.treatments.includes(slug));
}

export function getProviderPartnersByGoal(slug: string): ProviderPartner[] {
  return providerPartners.filter((partner) => partner.goals.includes(slug));
}

export function getAllProviderInsuranceSlugs(): ProviderInsurancePreference[] {
  return Array.from(
    new Set(providerPartners.flatMap((partner) => partner.insurancePreferences))
  ).sort() as ProviderInsurancePreference[];
}

export function getAllProviderIntakeModes(): ProviderIntakeMode[] {
  return Array.from(
    new Set(providerPartners.map((partner) => partner.intakeMode))
  ).sort() as ProviderIntakeMode[];
}

export function getProviderPartnersByInsurancePreference(
  slug: ProviderInsurancePreference
): ProviderPartner[] {
  return providerPartners.filter((partner) => partner.insurancePreferences.includes(slug));
}

export function getProviderPartnersByIntakeMode(
  mode: ProviderIntakeMode
): ProviderPartner[] {
  return providerPartners.filter((partner) => partner.intakeMode === mode);
}

export function getFilteredProviderPartners(filters: ProviderDirectoryFilters): ProviderPartner[] {
  return providerPartners.filter((partner) => {
    if (filters.marketCode && filters.activeOnly && !partner.markets.includes(filters.marketCode)) {
      return false;
    }

    if (filters.treatment && filters.treatment !== "all" && !partner.treatments.includes(filters.treatment)) {
      return false;
    }

    if (filters.goal && filters.goal !== "all" && !partner.goals.includes(filters.goal)) {
      return false;
    }

    if (
      filters.insurancePreference &&
      filters.insurancePreference !== "all" &&
      !partner.insurancePreferences.includes(filters.insurancePreference)
    ) {
      return false;
    }

    if (filters.budgetBand && filters.budgetBand !== "all" && !partner.budgetBands.includes(filters.budgetBand)) {
      return false;
    }

    if (filters.urgencyBand && filters.urgencyBand !== "all" && !partner.urgencyBands.includes(filters.urgencyBand)) {
      return false;
    }

    if (filters.intakeMode && filters.intakeMode !== "all" && partner.intakeMode !== filters.intakeMode) {
      return false;
    }

    return true;
  });
}
