import type { Peptide } from "@/data/peptides";

export interface TrustScore {
  score: number; // 0-100
  label: string;
  color: string;
  details: {
    evidenceLevelScore: number;
    claimCoverageScore: number;
    referenceBonus: number;
    gradeConsistencyBonus: number;
  };
}

/**
 * Calculate a trust/credibility score for a peptide page.
 * Factors:
 * - Peptide-level evidence level (A-D)
 * - % of claims with linked sources
 * - Number & quality of references
 * - Whether all claims have explicit evidence grades
 */
export function getTrustScore(peptide: Peptide): TrustScore {
  const allClaims = [...peptide.benefits, ...peptide.sideEffects];
  const totalClaims = allClaims.length;
  const sourcedClaims = allClaims.filter(
    (c) => c.sourceIds && c.sourceIds.length > 0
  ).length;
  const coverageRatio = totalClaims > 0 ? sourcedClaims / totalClaims : 0;

  // 1. Evidence level base (max 40)
  const levelMap: Record<string, number> = { A: 40, B: 30, C: 20, D: 10 };
  const evidenceLevelScore = levelMap[peptide.evidenceLevel] ?? 10;

  // 2. Claim coverage (max 30)
  let claimCoverageScore = 0;
  if (coverageRatio >= 0.75) claimCoverageScore = 30;
  else if (coverageRatio >= 0.5) claimCoverageScore = 20;
  else if (coverageRatio >= 0.25) claimCoverageScore = 10;
  else if (coverageRatio > 0) claimCoverageScore = 5;

  // 3. Reference bonus (max 20)
  const refCount = peptide.refs.length;
  let referenceBonus = 0;
  if (refCount >= 5) referenceBonus = 20;
  else if (refCount >= 3) referenceBonus = 15;
  else if (refCount >= 1) referenceBonus = 10;

  // 4. Grade consistency (max 10)
  const gradedClaims = allClaims.filter((c) => !!c.evidenceGrade).length;
  const gradeConsistencyBonus =
    totalClaims > 0 && gradedClaims === totalClaims ? 10 : 0;

  const rawScore =
    evidenceLevelScore +
    claimCoverageScore +
    referenceBonus +
    gradeConsistencyBonus;

  const score = Math.min(100, rawScore);

  let label = "Low";
  let color = "#D4553A"; // red
  if (score >= 85) {
    label = "Excellent";
    color = "#2B8A5E"; // green
  } else if (score >= 70) {
    label = "Good";
    color = "#3B7A9E"; // blue
  } else if (score >= 55) {
    label = "Moderate";
    color = "#E09F3E"; // amber
  } else if (score >= 40) {
    label = "Fair";
    color = "#E09F3E"; // amber
  }

  return {
    score,
    label,
    color,
    details: {
      evidenceLevelScore,
      claimCoverageScore,
      referenceBonus,
      gradeConsistencyBonus,
    },
  };
}
