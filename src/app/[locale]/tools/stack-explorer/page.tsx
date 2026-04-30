"use client";

import { useState } from "react";
import Link from "next/link";
import { peptideStacks, stackCategories } from "@/data/peptide-stacks";

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

function gradeBg(grade: string) {
  switch (grade) {
    case "A":
      return "#F0FDF4";
    case "B":
      return "#F0F9FF";
    case "C":
      return "#FEF3C7";
    default:
      return "#F8FAFC";
  }
}

export default function StackExplorerPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedStack, setExpandedStack] = useState<string | null>(null);
  const [wadaOnly, setWadaOnly] = useState(false);

  const wadaBannedStacks = ["wolverine-stack", "gh-cjc-ipamorelin", "gh-cjc-ghrp2", "gh-sermorelin-ghrp2", "athlete-recovery-community"];

  const filtered = peptideStacks.filter((s) => {
    if (selectedCategory && s.category !== selectedCategory) return false;
    if (wadaOnly && wadaBannedStacks.includes(s.slug)) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
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
          Peptide Stack Explorer
        </h1>
        <p className="text-base leading-relaxed max-w-3xl" style={{ color: C.muted }}>
          Explore known peptide combinations with documented synergy rationale, evidence grades,
          and safety warnings. Each stack includes mechanism explanations, FDA status, and explicit
          evidence boundaries. No stack should be interpreted as a clinical recommendation.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/tools/stack-generator"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: C.teal }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Find Stacks by Symptom
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold border transition-colors"
            style={{
              backgroundColor: selectedCategory === null ? C.teal : C.surface,
              color: selectedCategory === null ? "#FFFFFF" : C.navy,
              borderColor: selectedCategory === null ? C.teal : C.border,
            }}
          >
            All Stacks
          </button>
          {stackCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold border transition-colors"
              style={{
                backgroundColor: selectedCategory === cat.id ? cat.color : C.surface,
                color: selectedCategory === cat.id ? "#FFFFFF" : C.navy,
                borderColor: selectedCategory === cat.id ? cat.color : C.border,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="h-6 w-px bg-gray-300 mx-1 hidden sm:block" />
        <button
          onClick={() => setWadaOnly(!wadaOnly)}
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold border transition-colors"
          style={{
            backgroundColor: wadaOnly ? "#F0FDF4" : C.surface,
            color: wadaOnly ? C.success : C.navy,
            borderColor: wadaOnly ? C.success : C.border,
          }}
          title="Hide stacks containing WADA-banned peptides"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          {wadaOnly ? "Showing WADA-Safe Only" : "WADA-Safe Filter"}
        </button>
      </div>

      {/* Stack Cards */}
      <div className="space-y-6 mb-10">
        {filtered.map((stack) => {
          const isExpanded = expandedStack === stack.slug;
          const cat = stackCategories.find((c) => c.id === stack.category);

          return (
            <div
              key={stack.slug}
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
            >
              {/* Card Header */}
              <button
                onClick={() => setExpandedStack(isExpanded ? null : stack.slug)}
                className="w-full p-5 text-left"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold" style={{ color: C.navy }}>
                        {stack.name}
                      </h3>
                      {stack.type === "community" && (
                        <span
                          className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
                          style={{
                            backgroundColor: "#F3F4F6",
                            color: "#374151",
                            border: "1px solid #D1D5DB",
                          }}
                        >
                          Community / Anecdotal
                        </span>
                      )}
                      {cat && (
                        <span
                          className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
                          style={{
                            backgroundColor: cat.color + "15",
                            color: cat.color,
                            border: `1px solid ${cat.color}30`,
                          }}
                        >
                          {cat.label}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm" style={{ color: C.muted }}>
                      {stack.peptides.map((p, i) => (
                        <span key={p.slug}>
                          <Link
                            href={`/peptides/${p.slug}`}
                            className="font-semibold hover:underline"
                            style={{ color: C.teal }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {p.name}
                          </Link>
                          {i < stack.peptides.length - 1 && (
                            <span className="mx-1" style={{ color: C.border }}>+</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{
                        backgroundColor: gradeBg(stack.evidenceLevel),
                        color: gradeColor(stack.evidenceLevel),
                        border: `1px solid ${gradeColor(stack.evidenceLevel)}30`,
                      }}
                    >
                      Evidence {stack.evidenceLevel}
                    </span>
                    {stack.warningLevel !== "none" && (
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        style={{
                          backgroundColor: stack.warningLevel === "contraindicated" ? "#FEF2F2" : "#FFF7ED",
                          color: stack.warningLevel === "contraindicated" ? C.accent : "#C2410C",
                          border: `1px solid ${stack.warningLevel === "contraindicated" ? "#FECACA" : "#FDBA74"}`,
                        }}
                      >
                        {stack.warningLevel === "contraindicated" ? "Do Not Combine" : "Caution"}
                      </span>
                    )}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={C.muted}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-5 pb-5 border-t" style={{ borderColor: C.border }}>
                  {/* Peptide Roles */}
                  <div className="grid md:grid-cols-2 gap-3 my-4">
                    {stack.peptides.map((p) => (
                      <div
                        key={p.slug}
                        className="rounded-lg p-3"
                        style={{ backgroundColor: C.bg }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Link
                            href={`/peptides/${p.slug}`}
                            className="text-sm font-bold hover:underline"
                            style={{ color: C.navy }}
                          >
                            {p.name}
                          </Link>
                        </div>
                        <p className="text-xs" style={{ color: C.muted }}>
                          {p.role}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Community Note */}
                  {stack.type === "community" && stack.communityNote && (
                    <div
                      className="rounded-lg p-3 mb-4"
                      style={{
                        backgroundColor: "#F3F4F6",
                        border: "1px solid #D1D5DB",
                      }}
                    >
                      <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#6B7280" }}>
                        Community Origin
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
                        {stack.communityNote}
                      </p>
                    </div>
                  )}

                  {/* Synergy */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: C.teal }}>
                      Synergy Rationale
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#1C2028" }}>
                      {stack.synergyRationale}
                    </p>
                  </div>

                  {/* Evidence */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="rounded-lg p-3" style={{ backgroundColor: C.bg }}>
                      <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: C.teal }}>
                        Evidence Summary
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "#1C2028" }}>
                        {stack.evidenceSummary}
                      </p>
                    </div>
                    <div className="rounded-lg p-3" style={{ backgroundColor: C.bg }}>
                      <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: C.teal }}>
                        FDA / Regulatory Status
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "#1C2028" }}>
                        {stack.fdaStatus}
                      </p>
                    </div>
                  </div>

                  {/* Safety */}
                  <div
                    className="rounded-lg p-3 mb-3"
                    style={{
                      backgroundColor: stack.warningLevel === "contraindicated" ? "#FEF2F2" : "#FFF7ED",
                      border: `1px solid ${stack.warningLevel === "contraindicated" ? "#FECACA" : "#FDBA74"}`,
                    }}
                  >
                    <div
                      className="text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: stack.warningLevel === "contraindicated" ? C.accent : "#C2410C" }}
                    >
                      Safety Notes
                    </div>
                    <ul className="space-y-1">
                      {stack.safetyNotes.map((note, i) => (
                        <li key={i} className="flex gap-2 text-sm" style={{ color: stack.warningLevel === "contraindicated" ? "#991B1B" : "#9A3412" }}>
                          <span className="mt-0.5 shrink-0">•</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Warning text if present */}
                  {stack.warningText && (
                    <div
                      className="rounded-lg p-3 text-sm font-semibold"
                      style={{
                        backgroundColor: "#FEF2F2",
                        border: "1px solid #FECACA",
                        color: "#991B1B",
                      }}
                    >
                      ⚠ {stack.warningText}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div
        className="rounded-xl p-4 text-sm leading-relaxed"
        style={{ backgroundColor: "#FFF7ED", border: "1px solid #FDBA74", color: "#9A3412" }}
      >
        <strong>Research reference only.</strong> These stacks represent combinations discussed in
        research and online communities. None are FDA-approved as combinations. Evidence grades reflect
        the quality of available published research, not clinical recommendations. Synergy rationales
        are mechanistic hypotheses, not proven therapeutic effects. All peptide research should be
        conducted under appropriate regulatory oversight and institutional review.
      </div>
    </div>
  );
}
