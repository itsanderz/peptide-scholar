/**
 * Peptide Benchmarking / Rating System
 *
 * Provides typed dimensions, scoring helpers, and an overall aggregator
 * for three entities: Peptides, Providers, and Stacks.
 */

/* -------------------------------------------------------------------------- */
/*                                 Base Types                                 */
/* -------------------------------------------------------------------------- */

/** Standard dimension score (0–100). */
export type Score = number;

/** Binary compliance score (0 = non-compliant/banned, 100 = compliant/allowed). */
export type BinaryScore = 0 | 100;

/** Validated constraint: 0 <= Score <= 100. */
function assertValidScore(value: number, label: string): Score {
  if (!Number.isFinite(value) || value < 0 || value > 100) {
    throw new Error(
      `${label} must be a finite number between 0 and 100 (got ${value}).`
    );
  }
  return value;
}

/* -------------------------------------------------------------------------- */
/*                               Peptide Inputs                               */
/* -------------------------------------------------------------------------- */

export enum FDAStatus {
  Approved = "approved",
  Phase3 = "phase3",
  Phase2 = "phase2",
  Phase1 = "phase1",
  Investigational = "investigational",
  CompoundedOnly = "compounded_only",
}

export enum AdministrationRoute {
  Oral = "oral",
  Nasal = "nasal",
  Subcutaneous = "subcutaneous",
  Intramuscular = "intramuscular",
  Intravenous = "intravenous",
}

/** Base evidence score contributed by FDA status (0–100). */
export const FDA_STATUS_BASE_SCORE: Record<FDAStatus, Score> = {
  [FDAStatus.Approved]: 100,
  [FDAStatus.Phase3]: 85,
  [FDAStatus.Phase2]: 65,
  [FDAStatus.Phase1]: 45,
  [FDAStatus.Investigational]: 25,
  [FDAStatus.CompoundedOnly]: 15,
};

/** Route convenience ranking (higher = more convenient). */
export const ROUTE_CONVENIENCE_RANK: Record<AdministrationRoute, Score> = {
  [AdministrationRoute.Oral]: 100,
  [AdministrationRoute.Nasal]: 80,
  [AdministrationRoute.Subcutaneous]: 60,
  [AdministrationRoute.Intramuscular]: 40,
  [AdministrationRoute.Intravenous]: 20,
};

/* -------------------------------------------------------------------------- */
/*                            Peptide Dimensions                              */
/* -------------------------------------------------------------------------- */

export interface PeptideScores {
  /** Weighted by FDA status + trial size. */
  evidenceQuality: Score;
  /** Lower cost = higher score. */
  costAccessibility: Score;
  /** Fewer / milder side effects = higher score. */
  safetyProfile: Score;
  /** Oral > nasal > subcutaneous > intramuscular > intravenous. */
  administrationConvenience: Score;
  /** Banned = 0, allowed = 100. */
  wadaCompliance: BinaryScore;
  /** Well-understood mechanism of action = higher score. */
  mechanismClarity: Score;
}

export type PeptideWeights = Partial<Record<keyof PeptideScores, number>>;

/**
 * Calculate Evidence Quality from FDA status and trial size.
 *
 * Formula: base(FDA status) + log10(trialSize) * multiplier, capped at 100.
 *
 * @param fdaStatus   FDA approval stage.
 * @param trialSize   Number of participants in largest relevant human trial.
 * @param multiplier  Scaling factor for trial size (default 5).
 */
export function calculateEvidenceQuality(
  fdaStatus: FDAStatus,
  trialSize: number,
  multiplier = 5
): Score {
  if (!Number.isFinite(trialSize) || trialSize < 0) {
    throw new Error("trialSize must be a non-negative finite number.");
  }
  const base = FDA_STATUS_BASE_SCORE[fdaStatus];
  const trialBonus = trialSize === 0 ? 0 : Math.log10(trialSize) * multiplier;
  return assertValidScore(Math.min(100, Math.round(base + trialBonus)), "evidenceQuality");
}

/**
 * Calculate Cost Accessibility.
 *
 * Lower relative cost = higher score. Uses a simple linear map against a benchmark.
 *
 * @param monthlyCost      Monthly cost in USD.
 * @param benchmarkCost    Reference benchmark cost in USD (default 500).
 */
export function calculateCostAccessibility(
  monthlyCost: number,
  benchmarkCost = 500
): Score {
  if (!Number.isFinite(monthlyCost) || monthlyCost < 0) {
    throw new Error("monthlyCost must be a non-negative finite number.");
  }
  if (!Number.isFinite(benchmarkCost) || benchmarkCost <= 0) {
    throw new Error("benchmarkCost must be a positive finite number.");
  }
  const raw = 100 - (monthlyCost / benchmarkCost) * 100;
  return assertValidScore(Math.max(0, Math.min(100, Math.round(raw))), "costAccessibility");
}

/**
 * Calculate Administration Convenience from route of administration.
 */
export function calculateAdministrationConvenience(
  route: AdministrationRoute
): Score {
  return ROUTE_CONVENIENCE_RANK[route];
}

/**
 * Calculate WADA Compliance.
 *
 * @param isBanned true if the substance appears on the WADA Prohibited List.
 */
export function calculateWADACompliance(isBanned: boolean): BinaryScore {
  return isBanned ? 0 : 100;
}

/* -------------------------------------------------------------------------- */
/*                           Provider Dimensions                              */
/* -------------------------------------------------------------------------- */

export interface ProviderScores {
  /** Clear, upfront pricing = higher score. */
  pricingTransparency: Score;
  /** MD/DO/NP involvement depth (consultation, monitoring, prescriptions). */
  medicalOversight: Score;
  /** Breadth of peptide catalogue offered. */
  peptideVariety: Score;
  /** Adherence to federal/state pharmacy and telehealth regulations. */
  legalityCompliance: Score;
  /** Responsiveness and quality of patient support. */
  customerSupport: Score;
  /** Speed from order to delivery. */
  shippingSpeed: Score;
}

export type ProviderWeights = Partial<Record<keyof ProviderScores, number>>;

/* -------------------------------------------------------------------------- */
/*                            Stack Dimensions                                */
/* -------------------------------------------------------------------------- */

export interface StackScores {
  /** Quality of evidence supporting synergistic effects. */
  synergyEvidence: Score;
  /** Combined cost vs. individual peptide value. */
  costEfficiency: Score;
  /** Margin between therapeutic and adverse effect windows. */
  safetyMargin: Score;
  /** Banned = 0, allowed = 100 (strictest component wins). */
  wadaCompliance: BinaryScore;
  /** Ease of sourcing, dosing schedule complexity, injection burden. */
  practicality: Score;
}

export type StackWeights = Partial<Record<keyof StackScores, number>>;

/**
 * Calculate Stack WADA Compliance.
 *
 * A stack is non-compliant if ANY component is banned.
 */
export function calculateStackWADACompliance(
  componentCompliances: BinaryScore[]
): BinaryScore {
  return componentCompliances.some((c) => c === 0) ? 0 : 100;
}

/**
 * Calculate Stack Safety Margin.
 *
 * Conservative approach: lowest component safety score minus an interaction
 * penalty (default 10 points per additional interacting peptide beyond the
 * first, capped so the result never drops below 0).
 *
 * @param componentSafetyScores Safety scores of individual peptides.
 * @param interactionPenalty    Penalty per extra peptide (default 10).
 */
export function calculateStackSafetyMargin(
  componentSafetyScores: Score[],
  interactionPenalty = 10
): Score {
  if (componentSafetyScores.length === 0) {
    throw new Error("componentSafetyScores must not be empty.");
  }
  const minSafety = Math.min(...componentSafetyScores);
  const penalty = Math.max(0, componentSafetyScores.length - 1) * interactionPenalty;
  return assertValidScore(Math.max(0, Math.round(minSafety - penalty)), "safetyMargin");
}

/* -------------------------------------------------------------------------- */
/*                           Overall Aggregator                               */
/* -------------------------------------------------------------------------- */

/**
 * Compute a weighted average across any set of dimension scores.
 *
 * Unspecified weights default to 1 (equal weighting). Weights are normalized
 * automatically, so only their relative proportions matter.
 *
 * @param scores   Dimension scores (each 0–100).
 * @param weights  Optional weights per dimension.
 * @returns Overall score rounded to the nearest integer (0–100).
 */
export function getOverallScore<K extends string>(
  scores: Record<K, number>,
  weights?: Partial<Record<K, number>>
): Score {
  const keys = Object.keys(scores) as K[];
  if (keys.length === 0) {
    throw new Error("scores object must contain at least one dimension.");
  }

  let totalWeighted = 0;
  let totalWeight = 0;

  for (const key of keys) {
    const value = scores[key];
    assertValidScore(value, key);
    const weight =
      weights && Number.isFinite(weights[key]!) ? (weights[key] as number) : 1;
    if (weight < 0) {
      throw new Error(`Weight for ${key} must be non-negative.`);
    }
    totalWeighted += value * weight;
    totalWeight += weight;
  }

  if (totalWeight === 0) {
    throw new Error("Sum of weights must be greater than 0.");
  }

  return Math.round(totalWeighted / totalWeight);
}

/* -------------------------------------------------------------------------- */
/*                         Convenience Wrappers                               */
/* -------------------------------------------------------------------------- */

/**
 * Convenience wrapper to score a Peptide with optional dimension weights.
 */
export function getPeptideOverallScore(
  scores: PeptideScores,
  weights?: PeptideWeights
): Score {
  return getOverallScore(scores, weights);
}

/**
 * Convenience wrapper to score a Provider with optional dimension weights.
 */
export function getProviderOverallScore(
  scores: ProviderScores,
  weights?: ProviderWeights
): Score {
  return getOverallScore(scores, weights);
}

/**
 * Convenience wrapper to score a Stack with optional dimension weights.
 */
export function getStackOverallScore(
  scores: StackScores,
  weights?: StackWeights
): Score {
  return getOverallScore(scores, weights);
}
