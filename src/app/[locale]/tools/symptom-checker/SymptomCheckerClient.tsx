"use client";

import { useState } from "react";
import type { MedicationTimeline, SymptomTimeline } from "@/data/side-effect-timeline";

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
  text: "#1C2028",
  muted: "#5A6577",
} as const;

interface Props {
  medications: MedicationTimeline[];
}

function getPrevalenceBadge(
  prevalence: number,
  placebo: number
): { label: string; color: string; bg: string; border: string } {
  const delta = prevalence - placebo;
  if (prevalence > 10) {
    return {
      label: "Typical & Expected",
      color: C.success,
      bg: "#F0FDF4",
      border: "#BBF7D0",
    };
  }
  if (prevalence >= 5) {
    return {
      label: "Less Common",
      color: C.warning,
      bg: "#FFFBEB",
      border: "#FDE68A",
    };
  }
  return {
    label: `Uncommon (${delta > 0 ? "+" : ""}${delta.toFixed(0)}pp vs placebo)`,
    color: C.teal,
    bg: "#EFF6FF",
    border: "#BFDBFE",
  };
}

export default function SymptomCheckerClient({ medications }: Props) {
  const [selectedMedSlug, setSelectedMedSlug] = useState<string>("");
  const [selectedSymptom, setSelectedSymptom] = useState<string>("");

  const selectedMed = medications.find((m) => m.slug === selectedMedSlug) ?? null;
  const selectedSymptomData: SymptomTimeline | null =
    selectedMed?.symptoms.find((s) => s.symptom === selectedSymptom) ?? null;

  function handleMedChange(slug: string) {
    setSelectedMedSlug(slug);
    setSelectedSymptom("");
  }

  const badge = selectedSymptomData
    ? getPrevalenceBadge(selectedSymptomData.prevalencePercent, selectedSymptomData.placeboPercent)
    : null;

  return (
    <div>
      {/* ── Selectors ──────────────────────────────────────────────────── */}
      <div
        className="rounded-2xl p-6 mb-6"
        style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
      >
        <h2
          className="text-xl font-bold mb-4"
          style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
        >
          Step 1: Select Your Medication
        </h2>
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          {medications.map((med) => (
            <button
              key={med.slug}
              onClick={() => handleMedChange(med.slug)}
              className="rounded-xl p-4 text-left transition-all"
              style={{
                backgroundColor: selectedMedSlug === med.slug ? C.navy : C.bg,
                border: `2px solid ${selectedMedSlug === med.slug ? C.navy : C.border}`,
                color: selectedMedSlug === med.slug ? "#FFFFFF" : C.text,
              }}
            >
              <div className="font-bold text-sm">{med.brandName}</div>
              <div
                className="text-xs mt-0.5"
                style={{ color: selectedMedSlug === med.slug ? "rgba(255,255,255,0.75)" : C.muted }}
              >
                {med.genericName}
              </div>
            </button>
          ))}
        </div>

        {selectedMed && (
          <>
            <h2
              className="text-xl font-bold mb-3"
              style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
            >
              Step 2: Select a Symptom
            </h2>
            <div className="flex flex-wrap gap-2">
              {selectedMed.symptoms.map((s) => (
                <button
                  key={s.symptom}
                  onClick={() => setSelectedSymptom(s.symptom)}
                  className="rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  style={{
                    backgroundColor: selectedSymptom === s.symptom ? C.accent : C.bg,
                    border: `1.5px solid ${selectedSymptom === s.symptom ? C.accent : C.border}`,
                    color: selectedSymptom === s.symptom ? "#FFFFFF" : C.text,
                  }}
                >
                  {s.symptom}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Results Panel ───────────────────────────────────────────────── */}
      {selectedSymptomData && selectedMed && badge && (
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
        >
          {/* Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold"
              style={{ backgroundColor: badge.bg, border: `1.5px solid ${badge.border}`, color: badge.color }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 110 20A10 10 0 0112 2zm0 2a8 8 0 100 16A8 8 0 0012 4zm-1 11h2v2h-2v-2zm0-8h2v6h-2V7z" />
              </svg>
              {badge.label}
            </span>
            <h3 className="text-lg font-bold" style={{ color: C.navy }}>
              {selectedSymptomData.symptom} — {selectedMed.brandName}
            </h3>
          </div>

          {/* Key message */}
          <div
            className="rounded-xl p-4 mb-6"
            style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
          >
            <p className="text-sm leading-relaxed" style={{ color: C.text }}>
              <strong>{selectedSymptomData.prevalencePercent}% of patients</strong> in the{" "}
              <strong>{selectedMed.source.split("—")[0].trim()}</strong> experienced{" "}
              {selectedSymptomData.symptom.toLowerCase()}.
              {selectedSymptomData.medianDurationDays !== null && (
                <> Median duration: <strong>{selectedSymptomData.medianDurationDays} days</strong>.</>
              )}
            </p>
          </div>

          {/* Prevalence bars */}
          <div className="mb-6">
            <h4 className="text-sm font-bold mb-3" style={{ color: C.navy }}>
              Prevalence: Drug vs. Placebo
            </h4>
            <div className="space-y-3">
              {[
                { label: selectedMed.brandName, value: selectedSymptomData.prevalencePercent, color: C.accent },
                { label: "Placebo", value: selectedSymptomData.placeboPercent, color: "#94A3B8" },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between text-xs mb-1" style={{ color: C.muted }}>
                    <span>{bar.label}</span>
                    <span className="font-semibold">{bar.value}%</span>
                  </div>
                  <div
                    className="h-5 rounded-full overflow-hidden"
                    style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(bar.value, 100)}%`, backgroundColor: bar.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-2" style={{ color: C.muted }}>
              Net drug effect: +{(selectedSymptomData.prevalencePercent - selectedSymptomData.placeboPercent).toFixed(0)} percentage points above placebo
            </p>
          </div>

          {/* Timeline info grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div
              className="rounded-xl p-4"
              style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
            >
              <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: C.muted }}>
                Typical Onset
              </div>
              <p className="text-sm" style={{ color: C.text }}>{selectedSymptomData.typicalOnset}</p>
            </div>
            <div
              className="rounded-xl p-4"
              style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
            >
              <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: C.muted }}>
                Typical Resolution
              </div>
              <p className="text-sm" style={{ color: C.text }}>{selectedSymptomData.typicalResolution}</p>
            </div>
            {selectedSymptomData.peakWeek !== null && (
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: C.muted }}>
                  Peak Prevalence
                </div>
                <p className="text-sm" style={{ color: C.text }}>
                  Around week <strong>{selectedSymptomData.peakWeek}</strong> of treatment
                </p>
              </div>
            )}
            {selectedSymptomData.medianDurationDays !== null && (
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: C.muted }}>
                  Median Duration
                </div>
                <p className="text-sm" style={{ color: C.text }}>
                  <strong>{selectedSymptomData.medianDurationDays} days</strong> per episode
                </p>
              </div>
            )}
          </div>

          {/* Visual treatment timeline bar */}
          {selectedMed.doseEscalationEndWeek && (
            <div className="mb-6">
              <h4 className="text-sm font-bold mb-2" style={{ color: C.navy }}>
                Your Treatment Journey
              </h4>
              <div className="relative h-8 rounded-full overflow-hidden" style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}>
                {/* Dose escalation zone */}
                <div
                  className="absolute top-0 left-0 h-full flex items-center justify-center"
                  style={{
                    width: `${(selectedMed.doseEscalationEndWeek / selectedMed.totalDurationWeeks) * 100}%`,
                    backgroundColor: "#FEF3C7",
                  }}
                >
                  <span className="text-xs font-medium" style={{ color: C.warning }}>
                    Dose escalation (wk 1–{selectedMed.doseEscalationEndWeek})
                  </span>
                </div>
                {/* Maintenance zone */}
                <div
                  className="absolute top-0 h-full flex items-center justify-center"
                  style={{
                    left: `${(selectedMed.doseEscalationEndWeek / selectedMed.totalDurationWeeks) * 100}%`,
                    right: 0,
                    backgroundColor: "#F0FDF4",
                  }}
                >
                  <span className="text-xs font-medium" style={{ color: C.success }}>
                    Maintenance (wk {selectedMed.doseEscalationEndWeek + 1}–{selectedMed.totalDurationWeeks})
                  </span>
                </div>
              </div>
              <p className="text-xs mt-1.5" style={{ color: C.muted }}>
                Side effects are most common during dose escalation and typically decrease after reaching maintenance dose.
              </p>
            </div>
          )}

          {/* Notes */}
          {selectedSymptomData.notes && (
            <div
              className="rounded-xl p-4 mb-4"
              style={{ backgroundColor: "#EFF6FF", border: `1px solid #BFDBFE` }}
            >
              <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: C.teal }}>
                Clinical Notes
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#1E40AF" }}>
                {selectedSymptomData.notes}
              </p>
            </div>
          )}

          {/* Inline disclaimer */}
          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#FEF2F2", border: `1px solid #FECACA` }}
          >
            <p className="text-sm font-bold mb-1" style={{ color: "#991B1B" }}>
              Important
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#7F1D1D" }}>
              This tool uses clinical trial data and cannot replace medical advice. Contact your
              healthcare provider if symptoms are severe, persistent, or interfering with daily life.
            </p>
          </div>

          {/* Source */}
          <div className="mt-4">
            <p className="text-xs" style={{ color: C.muted }}>
              Data source:{" "}
              <a
                href={selectedMed.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-700"
                style={{ color: C.teal }}
              >
                {selectedMed.source}
              </a>
              {selectedMed.pmid && (
                <>
                  {" "}·{" "}
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${selectedMed.pmid}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-700"
                    style={{ color: C.teal }}
                  >
                    PubMed PMID {selectedMed.pmid}
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      )}

      {/* ── Empty state prompt ──────────────────────────────────────────── */}
      {!selectedSymptomData && selectedMed && (
        <div
          className="rounded-2xl p-8 text-center"
          style={{ backgroundColor: C.bg, border: `1px dashed ${C.border}` }}
        >
          <p className="text-sm" style={{ color: C.muted }}>
            Select a symptom above to see clinical trial data.
          </p>
        </div>
      )}

      {!selectedMed && (
        <div
          className="rounded-2xl p-8 text-center"
          style={{ backgroundColor: C.bg, border: `1px dashed ${C.border}` }}
        >
          <p className="text-sm" style={{ color: C.muted }}>
            Select your medication above to get started.
          </p>
        </div>
      )}

      {/* ── General notes ───────────────────────────────────────────────── */}
      {selectedMed && (
        <div
          className="rounded-2xl p-5 mt-4"
          style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
        >
          <h3 className="text-sm font-bold mb-2" style={{ color: C.navy }}>
            {selectedMed.brandName}: General Tolerability
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
            {selectedMed.generalNotes}
          </p>
        </div>
      )}
    </div>
  );
}
