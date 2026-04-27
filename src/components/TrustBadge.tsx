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

  return (
    <div
      className="relative inline-flex items-center gap-2"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className="flex items-center justify-center rounded-full text-white font-bold text-xs w-10 h-10 shadow-sm cursor-help"
        style={{ backgroundColor: color }}
      >
        {score}
      </div>
      <div>
        <div className="text-sm font-semibold" style={{ color }}>
          {label} Credibility
        </div>
        <div className="text-xs text-gray-500">
          {peptide.refs.length} cited study{peptide.refs.length !== 1 ? "ies" : "y"} · Evidence level {peptide.evidenceLevel}
        </div>
      </div>

      {showTooltip && (
        <div className="absolute left-0 top-full mt-2 z-50 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs">
          <div className="font-semibold text-gray-800 mb-2 border-b pb-1">
            Trust Score Breakdown
          </div>
          <div className="space-y-1.5 text-gray-600">
            <div className="flex justify-between">
              <span>Evidence level ({peptide.evidenceLevel})</span>
              <span className="font-medium text-gray-800">+{details.evidenceLevelScore}</span>
            </div>
            <div className="flex justify-between">
              <span>Claim sourcing</span>
              <span className="font-medium text-gray-800">+{details.claimCoverageScore}</span>
            </div>
            <div className="flex justify-between">
              <span>Reference depth ({peptide.refs.length})</span>
              <span className="font-medium text-gray-800">+{details.referenceBonus}</span>
            </div>
            <div className="flex justify-between">
              <span>Grade consistency</span>
              <span className="font-medium text-gray-800">+{details.gradeConsistencyBonus}</span>
            </div>
          </div>
          <div className="mt-2 pt-1.5 border-t flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span>{score}/100</span>
          </div>
          <div className="mt-1.5 text-[10px] text-gray-400 italic">
            Hover to see methodology
          </div>
        </div>
      )}
    </div>
  );
}
