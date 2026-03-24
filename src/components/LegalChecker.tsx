"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { trackToolUse } from "@/lib/analytics";

/* ── Theme ─────────────────────────────────────────────────────────────── */
const C = {
  navy: "#1A3A5C",
  accent: "#D4553A",
  teal: "#3B7A9E",
  success: "#2B8A5E",
  warning: "#D4912A",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
} as const;

/* ── Types ─────────────────────────────────────────────────────────────── */
interface PeptideItem {
  name: string;
  slug: string;
  fdaStatus: string;
  prescriptionRequired: boolean;
  wadaBanned: boolean;
  controlledSubstance: boolean;
}

interface StateItem {
  stateName: string;
  stateSlug: string;
  stance: string;
  compoundingAllowed: boolean;
  ageRestrictions: boolean;
  notes: string;
}

interface LegalCheckerProps {
  peptides: PeptideItem[];
  states: StateItem[];
}

/* ── Helpers ───────────────────────────────────────────────────────────── */
function stanceColor(stance: string): { bg: string; text: string; border: string } {
  switch (stance) {
    case "permissive":
      return { bg: "#ECFDF5", text: C.success, border: C.success };
    case "moderate":
      return { bg: "#FFFBEB", text: "#92400E", border: C.warning };
    case "restrictive":
      return { bg: "#FEF2F2", text: C.accent, border: C.accent };
    default:
      return { bg: C.bg, text: C.navy, border: C.border };
  }
}

function stanceLabel(stance: string): string {
  switch (stance) {
    case "permissive":
      return "Permissive";
    case "moderate":
      return "Moderate";
    case "restrictive":
      return "Restrictive";
    default:
      return stance;
  }
}

/* ── Quick Fact Card ───────────────────────────────────────────────────── */
function QuickFact({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive: boolean;
}) {
  return (
    <div
      className="rounded-lg p-3 text-center"
      style={{
        backgroundColor: positive ? "#ECFDF5" : "#FEF2F2",
        border: `1px solid ${positive ? C.success : C.accent}33`,
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#6B7280" }}>
        {label}
      </p>
      <p className="text-sm font-bold" style={{ color: positive ? C.success : C.accent }}>
        {value}
      </p>
    </div>
  );
}

/* ── Main Component ────────────────────────────────────────────────────── */
export default function LegalChecker({ peptides, states }: LegalCheckerProps) {
  const [selectedPeptide, setSelectedPeptide] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");

  const peptide = useMemo(
    () => peptides.find((p) => p.slug === selectedPeptide) ?? null,
    [peptides, selectedPeptide]
  );

  const state = useMemo(
    () => states.find((s) => s.stateSlug === selectedState) ?? null,
    [states, selectedState]
  );

  const hasBothSelections = peptide !== null && state !== null;
  if (hasBothSelections) trackToolUse("legal_checker", `${peptide.slug}_${state.stateSlug}`);
  const isFdaApproved = peptide?.fdaStatus === "approved";

  return (
    <div
      className="rounded-xl shadow-lg overflow-hidden"
      style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
    >
      {/* Header */}
      <div className="px-6 py-4" style={{ backgroundColor: C.navy }}>
        <h2
          className="text-xl md:text-2xl font-bold text-white"
          style={{ fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
        >
          Peptide Legal Status Checker
        </h2>
        <p className="text-sm text-white/70 mt-1">
          Select a peptide and your state for an instant legal summary
        </p>
      </div>

      <div className="p-6">
        {/* ── Dropdowns ──────────────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {/* Peptide dropdown */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: C.navy }}>
              Select a Peptide
            </label>
            <select
              value={selectedPeptide}
              onChange={(e) => setSelectedPeptide(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg text-sm appearance-none cursor-pointer transition-shadow"
              style={{
                border: `1.5px solid ${C.border}`,
                outline: "none",
                backgroundColor: C.bg,
                color: selectedPeptide ? C.navy : "#9CA3AF",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%231A3A5C' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
                paddingRight: "36px",
              }}
              onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${C.teal}33`)}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            >
              <option value="">-- Choose a peptide --</option>
              {peptides.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* State dropdown */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: C.navy }}>
              Select Your State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg text-sm appearance-none cursor-pointer transition-shadow"
              style={{
                border: `1.5px solid ${C.border}`,
                outline: "none",
                backgroundColor: C.bg,
                color: selectedState ? C.navy : "#9CA3AF",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%231A3A5C' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
                paddingRight: "36px",
              }}
              onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${C.teal}33`)}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            >
              <option value="">-- Choose a state --</option>
              {states.map((s) => (
                <option key={s.stateSlug} value={s.stateSlug}>
                  {s.stateName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Empty State ────────────────────────────────────────────── */}
        {!hasBothSelections && (
          <div
            className="rounded-lg p-8 text-center"
            style={{ backgroundColor: C.bg, border: `2px dashed ${C.border}` }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={C.border} strokeWidth="1.5" className="mx-auto mb-3">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p className="text-sm" style={{ color: "#9CA3AF" }}>
              Select a peptide and state to check legal status
            </p>
          </div>
        )}

        {/* ── Result Card ────────────────────────────────────────────── */}
        {hasBothSelections && peptide && state && (
          <div className="space-y-4">
            {/* Header */}
            <div
              className="rounded-lg p-5"
              style={{
                backgroundColor: isFdaApproved ? "#ECFDF5" : C.bg,
                border: `1px solid ${isFdaApproved ? C.success : C.border}`,
              }}
            >
              <h3
                className="text-lg md:text-xl font-bold mb-3"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                {peptide.name} in {state.stateName}
              </h3>

              {isFdaApproved ? (
                <div className="flex items-start gap-3">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10" fill={C.success} />
                    <path d="M8 12l2.5 3L16 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <p className="font-bold text-sm" style={{ color: C.success }}>
                      Available by Prescription
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      As an FDA-approved medication, {peptide.name} is available by prescription in all 50 states
                      including {state.stateName}.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Stance badge */}
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: stanceColor(state.stance).bg,
                        color: stanceColor(state.stance).text,
                        border: `1px solid ${stanceColor(state.stance).border}33`,
                      }}
                    >
                      {stanceLabel(state.stance)} State
                    </span>
                  </div>

                  {/* Details */}
                  <div className="grid sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span style={{ color: state.compoundingAllowed ? C.success : C.accent }}>
                        {state.compoundingAllowed ? "Yes" : "No"}
                      </span>
                      <span className="text-gray-600">Compounding Allowed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span style={{ color: state.ageRestrictions ? C.accent : C.success }}>
                        {state.ageRestrictions ? "Yes" : "None"}
                      </span>
                      <span className="text-gray-600">Age Restrictions</span>
                    </div>
                  </div>

                  {/* Notes */}
                  {state.notes && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {state.notes}
                    </p>
                  )}

                  {/* Not FDA approved warning */}
                  <div
                    className="rounded-md p-3 text-xs flex items-start gap-2"
                    style={{
                      backgroundColor: "#FFFBEB",
                      border: `1px solid ${C.warning}33`,
                      color: "#92400E",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.warning} strokeWidth="2" className="flex-shrink-0 mt-0.5">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <span>Not FDA approved. Availability may be limited.</span>
                  </div>
                </div>
              )}

              {/* WADA badge */}
              {peptide.wadaBanned && (
                <div
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold"
                  style={{
                    backgroundColor: "#FEF2F2",
                    border: `1px solid ${C.accent}33`,
                    color: C.accent,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  </svg>
                  WADA Prohibited (Banned in Sport)
                </div>
              )}
            </div>

            {/* Quick Facts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <QuickFact
                label="FDA Status"
                value={
                  peptide.fdaStatus === "approved"
                    ? "Approved"
                    : peptide.fdaStatus === "cosmetic"
                    ? "Cosmetic"
                    : "Not Approved"
                }
                positive={peptide.fdaStatus === "approved"}
              />
              <QuickFact
                label="Rx Required"
                value={peptide.prescriptionRequired ? "Yes" : "No"}
                positive={!peptide.prescriptionRequired}
              />
              <QuickFact
                label="WADA Banned"
                value={peptide.wadaBanned ? "Yes" : "No"}
                positive={!peptide.wadaBanned}
              />
              <QuickFact
                label="Controlled"
                value={peptide.controlledSubstance ? "Yes" : "No"}
                positive={!peptide.controlledSubstance}
              />
            </div>

            {/* Link to detail page */}
            <Link
              href={`/peptides/${peptide.slug}/legal/${state.stateSlug}`}
              className="block text-center py-3 px-4 rounded-lg font-semibold text-sm transition-colors"
              style={{
                backgroundColor: C.navy,
                color: "#fff",
              }}
            >
              View full {peptide.name} legal analysis in {state.stateName} &rarr;
            </Link>
          </div>
        )}

        {/* Disclaimer */}
        <div
          className="mt-6 rounded-lg p-3 text-xs text-center"
          style={{
            backgroundColor: "#FFFBEB",
            border: `1px solid ${C.warning}33`,
            color: "#92400E",
          }}
        >
          For educational purposes only. This tool provides general legal information, not legal advice. Laws change frequently. Always consult a licensed attorney or healthcare provider for specific guidance.
        </div>
      </div>
    </div>
  );
}
