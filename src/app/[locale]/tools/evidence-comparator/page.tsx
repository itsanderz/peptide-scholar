"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { peptides } from "@/data/peptides";

/* ── Types ─────────────────────────────────────────────────────────────── */
type Peptide = (typeof peptides)[number];

/* ── Theme ─────────────────────────────────────────────────────────────── */
const C = {
  navy: "#1A3A5C",
  teal: "#3B7A9E",
  accent: "#D4553A",
  success: "#2B8A5E",
  warning: "#D4912A",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
  muted: "#5A6577",
} as const;

/* ── Helpers ───────────────────────────────────────────────────────────── */
function gradeColor(grade: string) {
  switch (grade) {
    case "A":
      return C.success;
    case "B":
      return C.teal;
    case "C":
      return C.warning;
    default:
      return C.muted;
  }
}

function statusBadge(status: string) {
  switch (status) {
    case "approved":
      return { text: "FDA Approved", bg: "#F0FDF4", color: C.success, border: "#BBF7D0" };
    case "not-approved":
      return { text: "Not FDA Approved", bg: "#F8FAFC", color: C.navy, border: C.border };
    case "cosmetic":
      return { text: "Cosmetic", bg: "#FAF5FF", color: "#7C3AED", border: "#E9D5FF" };
    case "discontinued":
      return { text: "Discontinued", bg: "#FFF7ED", color: C.accent, border: "#FDBA74" };
    default:
      return { text: status, bg: "#F8FAFC", color: C.navy, border: C.border };
  }
}

/* ── Components ────────────────────────────────────────────────────────── */
function PeptideSelector({
  value,
  onChange,
  exclude,
}: {
  value: string;
  onChange: (slug: string) => void;
  exclude: string[];
}) {
  const options = peptides.filter((p) => !exclude.includes(p.slug));
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border px-3 py-2 text-sm font-medium"
      style={{ borderColor: C.border, color: C.navy, backgroundColor: C.surface }}
    >
      <option value="">Select a peptide...</option>
      {options.map((p) => (
        <option key={p.slug} value={p.slug}>
          {p.name} ({p.evidenceLevel}-grade · {p.fdaStatus.replace("-", " ")})
        </option>
      ))}
    </select>
  );
}

function ComparisonCard({ peptide }: { peptide: Peptide }) {
  const badge = statusBadge(peptide.fdaStatus);
  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col"
      style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
    >
      {/* Header */}
      <div className="p-5 border-b" style={{ borderColor: C.border }}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold" style={{ color: C.navy }}>
            {peptide.name}
          </h3>
          <span
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
            style={{ backgroundColor: badge.bg, color: badge.color, borderColor: badge.border }}
          >
            {badge.text}
          </span>
        </div>
        <div className="text-xs" style={{ color: C.muted }}>
          {peptide.type} · {peptide.categoryName}
        </div>
      </div>

      <div className="p-5 space-y-5 flex-1">
        {/* Evidence & meta */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg p-3" style={{ backgroundColor: C.bg }}>
            <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: C.teal }}>
              Evidence
            </div>
            <div className="text-sm font-bold" style={{ color: gradeColor(peptide.evidenceLevel) }}>
              Grade {peptide.evidenceLevel}
            </div>
          </div>
          <div className="rounded-lg p-3" style={{ backgroundColor: C.bg }}>
            <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: C.teal }}>
              WADA
            </div>
            <div className="text-sm font-bold" style={{ color: peptide.wadaBanned ? C.accent : C.success }}>
              {peptide.wadaBanned ? "Banned" : "Not Banned"}
            </div>
          </div>
        </div>

        {/* Mechanism */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: C.teal }}>
            Mechanism
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#1C2028" }}>
            {peptide.mechanism}
          </p>
        </div>

        {/* Benefits */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: C.success }}>
            Key Benefits
          </div>
          <ul className="space-y-2">
            {peptide.benefits.slice(0, 4).map((b, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: "#1C2028" }}>
                <span className="mt-0.5 shrink-0" style={{ color: C.success }}>
                  ✓
                </span>
                <span>
                  {b.text}
                  {b.evidenceGrade && (
                    <span className="ml-1 text-xs font-semibold" style={{ color: gradeColor(b.evidenceGrade) }}>
                      [{b.evidenceGrade}]
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Side Effects */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: C.accent }}>
            Key Side Effects / Risks
          </div>
          <ul className="space-y-2">
            {peptide.sideEffects.slice(0, 4).map((s, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: "#1C2028" }}>
                <span className="mt-0.5 shrink-0" style={{ color: C.accent }}>
                  •
                </span>
                <span>
                  {s.text}
                  {s.evidenceGrade && (
                    <span className="ml-1 text-xs font-semibold" style={{ color: gradeColor(s.evidenceGrade) }}>
                      [{s.evidenceGrade}]
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top references */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: C.teal }}>
            Top References
          </div>
          <ul className="space-y-2">
            {peptide.refs.slice(0, 3).map((ref) => (
              <li key={ref.pmid} className="text-xs leading-relaxed" style={{ color: C.muted }}>
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                  style={{ color: C.teal }}
                >
                  PMID {ref.pmid}
                </a>{" "}
                · {ref.title} ({ref.year}) ·{" "}
                <span className="font-semibold" style={{ color: C.navy }}>
                  {ref.evidenceType}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t" style={{ borderColor: C.border, backgroundColor: C.bg }}>
        <Link
          href={`/peptides/${peptide.slug}`}
          className="text-sm font-semibold hover:underline"
          style={{ color: C.navy }}
        >
          View full profile →
        </Link>
      </div>
    </div>
  );
}

/* ── Main Page Component ───────────────────────────────────────────────── */
export default function EvidenceComparatorPage() {
  const [selected, setSelected] = useState<string[]>(["semaglutide", "tirzepatide"]);

  const selectedPeptides = useMemo(
    () => selected.map((slug) => peptides.find((p) => p.slug === slug)).filter(Boolean) as Peptide[],
    [selected]
  );

  function updateSelection(index: number, slug: string) {
    const next = [...selected];
    next[index] = slug;
    setSelected(next);
  }

  function addPeptide() {
    if (selected.length >= 4) return;
    const used = new Set(selected);
    const next = peptides.find((p) => !used.has(p.slug));
    if (next) setSelected([...selected, next.slug]);
  }

  function removePeptide(index: number) {
    if (selected.length <= 2) return;
    const next = [...selected];
    next.splice(index, 1);
    setSelected(next);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4"
          style={{ backgroundColor: "#F8FAFC", borderColor: C.border, color: C.navy }}
        >
          <span>Labs Tool</span>
          <span style={{ color: C.teal }}>Beta</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: C.navy }}>
          Evidence Comparator
        </h1>
        <p className="text-base leading-relaxed max-w-3xl" style={{ color: C.muted }}>
          Side-by-side comparison of peptide clinical evidence, benefits, side effects, and regulatory
          status. Select 2–4 peptides to compare across our structured database of 51 peptides and 80+
          PubMed references.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          {selected.map((slug, i) => (
            <div key={i} className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.teal }}>
                  Peptide {i + 1}
                </label>
                {selected.length > 2 && (
                  <button
                    onClick={() => removePeptide(i)}
                    className="text-xs hover:underline"
                    style={{ color: C.accent }}
                  >
                    Remove
                  </button>
                )}
              </div>
              <PeptideSelector
                value={slug}
                onChange={(s) => updateSelection(i, s)}
                exclude={selected.filter((_, idx) => idx !== i)}
              />
            </div>
          ))}
          {selected.length < 4 && (
            <div className="flex-shrink-0">
              <button
                onClick={addPeptide}
                className="rounded-lg px-4 py-2 text-sm font-semibold border"
                style={{
                  backgroundColor: C.surface,
                  borderColor: C.border,
                  color: C.navy,
                }}
              >
                + Add peptide
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Grid */}
      <div
        className="grid gap-6 mb-12"
        style={{
          gridTemplateColumns: `repeat(${Math.min(selectedPeptides.length, 4)}, minmax(0, 1fr))`,
        }}
      >
        {selectedPeptides.map((peptide) => (
          <ComparisonCard key={peptide.slug} peptide={peptide} />
        ))}
      </div>

      {/* Legend */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
      >
        <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: C.teal }}>
          Evidence Grade Legend
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: C.success }} />
            <span style={{ color: C.navy }}>
              <strong>A</strong> — Multiple RCTs or meta-analyses
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: C.teal }} />
            <span style={{ color: C.navy }}>
              <strong>B</strong> — Limited RCTs or strong observational data
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: C.warning }} />
            <span style={{ color: C.navy }}>
              <strong>C</strong> — Case reports or small studies
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: C.muted }} />
            <span style={{ color: C.navy }}>
              <strong>D</strong> — Anecdotal or theoretical
            </span>
          </span>
        </div>
      </div>

      {/* Disclaimer */}
      <div
        className="rounded-xl p-4 text-sm leading-relaxed"
        style={{ backgroundColor: "#FFF7ED", border: "1px solid #FDBA74", color: "#9A3412" }}
      >
        <strong>Research use only.</strong> This comparator summarizes published evidence and does not
        constitute medical advice. All treatment decisions require consultation with a licensed clinician.
        Evidence grades reflect the quantity and quality of available human studies, not clinical
        recommendations.
      </div>
    </div>
  );
}
