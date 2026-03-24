"use client";

import { useState, useMemo } from "react";
import type { PeptideInteraction, InteractionSeverity } from "@/data/clinical-data";

/* ── Theme ─────────────────────────────────────────────────────────────── */
const C = {
  navy: "#1A3A5C",
  teal: "#3B7A9E",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
} as const;

/* ── Severity config ──────────────────────────────────────────────────── */
const SEVERITY_CONFIG: Record<
  InteractionSeverity,
  { label: string; color: string; bg: string; border: string; icon: string }
> = {
  avoid: {
    label: "Avoid",
    color: "#DC2626",
    bg: "#FEF2F2",
    border: "#FCA5A5",
    icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",
  },
  caution: {
    label: "Caution",
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#FCD34D",
    icon: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01",
  },
  monitor: {
    label: "Monitor",
    color: "#2563EB",
    bg: "#EFF6FF",
    border: "#93C5FD",
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  },
  "likely-safe": {
    label: "Likely Safe",
    color: "#059669",
    bg: "#F0FDF4",
    border: "#86EFAC",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  "no-data": {
    label: "No Data",
    color: "#6B7280",
    bg: "#F9FAFB",
    border: "#D1D5DB",
    icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
};

const EVIDENCE_LABELS: Record<string, string> = {
  established: "Established (clinical data)",
  theoretical: "Theoretical (mechanism-based)",
  "none-known": "None known",
};

/* ── Derive unique peptide list from interactions ─────────────────────── */
function getAllPeptides(interactions: PeptideInteraction[]): string[] {
  const set = new Set<string>();
  for (const i of interactions) {
    set.add(i.peptideA);
    set.add(i.peptideB);
  }
  return Array.from(set).sort();
}

/* ── Look up interaction (order-insensitive) ──────────────────────────── */
function findInteraction(
  interactions: PeptideInteraction[],
  a: string,
  b: string
): PeptideInteraction | null {
  return (
    interactions.find(
      (i) =>
        (i.peptideA === a && i.peptideB === b) ||
        (i.peptideA === b && i.peptideB === a)
    ) ?? null
  );
}

interface Props {
  interactions: PeptideInteraction[];
}

export default function InteractionCheckerClient({ interactions }: Props) {
  const peptides = useMemo(() => getAllPeptides(interactions), [interactions]);

  const [peptideA, setPeptideA] = useState<string>(peptides[0] ?? "");
  const [peptideB, setPeptideB] = useState<string>(peptides[1] ?? "");

  const sameSelected = peptideA !== "" && peptideA === peptideB;

  const result = useMemo(() => {
    if (!peptideA || !peptideB || sameSelected) return null;
    return findInteraction(interactions, peptideA, peptideB);
  }, [interactions, peptideA, peptideB, sameSelected]);

  const noDataResult: PeptideInteraction | null =
    peptideA && peptideB && !sameSelected && !result
      ? {
          peptideA,
          peptideB,
          severity: "no-data",
          evidence: "none-known",
          description:
            "No clinical interaction data has been published for this specific combination.",
          recommendation:
            "No interaction data exists in our database. This does not mean the combination is safe. Consult your healthcare provider before combining these substances.",
          source: "No published interaction studies identified",
        }
      : null;

  const displayed = result ?? noDataResult;

  return (
    <div
      className="rounded-2xl overflow-hidden mb-8"
      style={{ border: `1px solid ${C.border}`, backgroundColor: C.surface }}
    >
      {/* ── Selectors ────────────────────────────────────────────────── */}
      <div
        className="p-6"
        style={{ backgroundColor: C.bg, borderBottom: `1px solid ${C.border}` }}
      >
        <div className="grid sm:grid-cols-2 gap-4 items-end">
          {/* Peptide A */}
          <div>
            <label
              className="block text-sm font-semibold mb-1.5"
              style={{ color: C.navy }}
            >
              Peptide A
            </label>
            <select
              value={peptideA}
              onChange={(e) => setPeptideA(e.target.value)}
              className="w-full rounded-lg px-3 py-2.5 text-sm"
              style={{
                border: `1px solid ${C.border}`,
                backgroundColor: C.surface,
                color: C.navy,
                outline: "none",
              }}
            >
              <option value="">Select a peptide…</option>
              {peptides.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Swap button + Peptide B */}
          <div className="relative">
            <label
              className="block text-sm font-semibold mb-1.5"
              style={{ color: C.navy }}
            >
              Peptide B
            </label>
            <select
              value={peptideB}
              onChange={(e) => setPeptideB(e.target.value)}
              className="w-full rounded-lg px-3 py-2.5 text-sm"
              style={{
                border: `1px solid ${C.border}`,
                backgroundColor: C.surface,
                color: C.navy,
                outline: "none",
              }}
            >
              <option value="">Select a peptide…</option>
              {peptides.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap button */}
        {peptideA && peptideB && (
          <div className="mt-3 flex justify-center">
            <button
              onClick={() => {
                const tmp = peptideA;
                setPeptideA(peptideB);
                setPeptideB(tmp);
              }}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg"
              style={{
                color: C.teal,
                backgroundColor: "#EFF6FF",
                border: "1px solid #BFDBFE",
                cursor: "pointer",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="17 1 21 5 17 9" />
                <path d="M3 11V9a4 4 0 014-4h14" />
                <polyline points="7 23 3 19 7 15" />
                <path d="M21 13v2a4 4 0 01-4 4H3" />
              </svg>
              Swap A &amp; B
            </button>
          </div>
        )}
      </div>

      {/* ── Result ────────────────────────────────────────────────────── */}
      <div className="p-6">
        {sameSelected && (
          <div className="py-8 text-center">
            <p className="text-gray-500 text-sm">
              Please select two different peptides to check their interaction.
            </p>
          </div>
        )}

        {!peptideA || !peptideB ? (
          <div className="py-8 text-center">
            <p className="text-gray-400 text-sm">
              Select two peptides above to check their interaction.
            </p>
          </div>
        ) : null}

        {displayed && !sameSelected && (
          <InteractionResultCard
            interaction={displayed}
            peptideA={peptideA}
            peptideB={peptideB}
          />
        )}
      </div>
    </div>
  );
}

/* ── Result Card ──────────────────────────────────────────────────────── */
function InteractionResultCard({
  interaction,
  peptideA,
  peptideB,
}: {
  interaction: PeptideInteraction;
  peptideA: string;
  peptideB: string;
}) {
  const cfg = SEVERITY_CONFIG[interaction.severity];

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: `2px solid ${cfg.border}`, backgroundColor: cfg.bg }}
    >
      {/* Severity header */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{ backgroundColor: cfg.color }}
      >
        <div className="flex items-center gap-3">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={cfg.icon} />
          </svg>
          <div>
            <p className="text-white font-bold text-lg leading-none">{cfg.label}</p>
            <p className="text-white/80 text-xs mt-0.5">
              {peptideA} + {peptideB}
            </p>
          </div>
        </div>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" }}
        >
          {EVIDENCE_LABELS[interaction.evidence] ?? interaction.evidence}
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-5 space-y-4">
        {/* Description */}
        <div>
          <h4
            className="text-xs font-bold uppercase tracking-wider mb-1.5"
            style={{ color: cfg.color }}
          >
            What is known
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            {interaction.description}
          </p>
        </div>

        {/* Recommendation */}
        <div
          className="rounded-lg p-4"
          style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
        >
          <h4
            className="text-xs font-bold uppercase tracking-wider mb-1.5"
            style={{ color: C.navy }}
          >
            Recommendation
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed font-medium">
            {interaction.recommendation}
          </p>
        </div>

        {/* Source */}
        <p className="text-xs text-gray-400">
          Source: {interaction.source}
        </p>
      </div>
    </div>
  );
}
