"use client";

import { useState } from "react";
import type { Peptide } from "@/data/peptides";
import { getTrustScore } from "@/lib/trust-score";

interface TrustBadgeProps {
  peptide: Peptide;
}

export function TrustBadge({ peptide }: TrustBadgeProps) {
  const { score, label, color, details } = getTrustScore(peptide);
  const [showTooltip, setShowTooltip] = useState(false);
  const studyLabel = peptide.refs.length === 1 ? "1 cited study" : `${peptide.refs.length} cited studies`;

  return (
    <div
      className="trust-badge"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="trust-score" style={{ backgroundColor: color }}>
        {score}
      </div>
      <div>
        <div className="trust-label" style={{ color }}>
          {label} Credibility
        </div>
        <div className="trust-meta">
          {studyLabel} | Evidence level {peptide.evidenceLevel}
        </div>
      </div>

      {showTooltip && (
        <div className="trust-tooltip">
          <div className="trust-tooltip-title">Trust Score Breakdown</div>
          <div>
            <div className="trust-tooltip-row">
              <span>Evidence level ({peptide.evidenceLevel})</span>
              <span>+{details.evidenceLevelScore}</span>
            </div>
            <div className="trust-tooltip-row">
              <span>Claim sourcing</span>
              <span>+{details.claimCoverageScore}</span>
            </div>
            <div className="trust-tooltip-row">
              <span>Reference depth ({peptide.refs.length})</span>
              <span>+{details.referenceBonus}</span>
            </div>
            <div className="trust-tooltip-row">
              <span>Grade consistency</span>
              <span>+{details.gradeConsistencyBonus}</span>
            </div>
          </div>
          <div className="trust-tooltip-total">
            <span>Total</span>
            <span>{score}/100</span>
          </div>
        </div>
      )}
    </div>
  );
}
