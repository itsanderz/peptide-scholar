"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { trackToolUse } from "@/lib/analytics";
import type { SourcedClaim } from "@/data/peptides";

/* ── Theme ─────────────────────────────────────────────────────────────── */
const C = {
  navy: "#1A3A5C",
  accent: "#D4553A",
  teal: "#3B7A9E",
  tealLight: "#E8F4F8",
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
  category: string;
  categoryName: string;
  evidenceLevel: string;
  description: string;
  fdaStatus: string;
  wadaBanned: boolean;
  benefits: SourcedClaim[];
  type: string;
}

interface PeptideFinderProps {
  peptides: PeptideItem[];
}

/* ── Category Definitions ──────────────────────────────────────────────── */
const CATEGORIES = [
  {
    slug: "healing-recovery",
    label: "Healing & Recovery",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20" />
        <rect x="5" y="5" width="14" height="14" rx="2" />
      </svg>
    ),
  },
  {
    slug: "growth-hormone",
    label: "Growth Hormone",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    ),
  },
  {
    slug: "weight-loss",
    label: "Weight Loss",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a9 9 0 100 18 9 9 0 000-18z" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    slug: "sexual-health",
    label: "Sexual Health",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    slug: "sleep-stress",
    label: "Sleep & Stress",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    ),
  },
  {
    slug: "cognitive",
    label: "Cognitive Enhancement",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6M10 22h4" />
        <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1h-6a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" />
      </svg>
    ),
  },
  {
    slug: "anti-aging",
    label: "Anti-Aging & Longevity",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    slug: "immune-support",
    label: "Immune Support",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    slug: "anti-inflammatory",
    label: "Anti-Inflammatory",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
];

/* ── Evidence Options ──────────────────────────────────────────────────── */
const EVIDENCE_OPTIONS = [
  {
    key: "fda-only",
    label: "FDA-Approved Only",
    desc: "I want peptides with full FDA approval and clinical trial data",
    badgeColor: "#16a34a",
    badgeBg: "#dcfce7",
    levels: ["A"],
    requireFDA: true,
  },
  {
    key: "strong-human",
    label: "Strong Human Evidence",
    desc: "Human clinical studies are important to me",
    badgeColor: "#2563eb",
    badgeBg: "#dbeafe",
    levels: ["A", "B"],
    requireFDA: false,
  },
  {
    key: "open-preclinical",
    label: "Open to Preclinical",
    desc: "I'm interested in emerging research including animal studies",
    badgeColor: "#d97706",
    badgeBg: "#fef3c7",
    levels: ["A", "B", "C"],
    requireFDA: false,
  },
  {
    key: "show-all",
    label: "Show Everything",
    desc: "I want to see all peptides regardless of evidence level",
    badgeColor: "#6b7280",
    badgeBg: "#f3f4f6",
    levels: ["A", "B", "C", "D"],
    requireFDA: false,
  },
];

/* ── US States (all 50) ────────────────────────────────────────────────── */
const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
  "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
  "Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico",
  "New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
  "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

function stateToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

/* ── Evidence Badge (inline for client) ────────────────────────────────── */
const EVIDENCE_COLORS: Record<string, { bg: string; border: string; text: string; label: string }> = {
  A: { bg: "#dcfce7", border: "#16a34a", text: "#15803d", label: "FDA Approved" },
  B: { bg: "#dbeafe", border: "#2563eb", text: "#1d4ed8", label: "Human Studies" },
  C: { bg: "#fef3c7", border: "#d97706", text: "#b45309", label: "Preclinical" },
  D: { bg: "#fee2e2", border: "#dc2626", text: "#b91c1c", label: "Limited Data" },
};

function EvidencePill({ level }: { level: string }) {
  const c = EVIDENCE_COLORS[level] || EVIDENCE_COLORS.D;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
        padding: "0.15rem 0.5rem",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: 700,
        backgroundColor: c.bg,
        border: `1.5px solid ${c.border}`,
        color: c.text,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "1.1rem",
          height: "1.1rem",
          borderRadius: "50%",
          backgroundColor: c.border,
          color: "#fff",
          fontSize: "0.65rem",
          fontWeight: 800,
        }}
      >
        {level}
      </span>
      {c.label}
    </span>
  );
}

/* ── FDA Status Pill ───────────────────────────────────────────────────── */
function FDAPill({ status }: { status: string }) {
  const approved = status === "approved";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.15rem 0.5rem",
        borderRadius: "9999px",
        fontSize: "0.7rem",
        fontWeight: 600,
        backgroundColor: approved ? "#dcfce7" : "#fef3c7",
        color: approved ? "#15803d" : "#92400e",
        border: `1px solid ${approved ? "#bbf7d0" : "#fde68a"}`,
        textTransform: "uppercase",
      }}
    >
      {approved ? "FDA Approved" : status === "cosmetic" ? "Cosmetic" : "Not FDA Approved"}
    </span>
  );
}

/* ── Main Component ────────────────────────────────────────────────────── */
export default function PeptideFinder({ peptides }: PeptideFinderProps) {
  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [evidenceChoice, setEvidenceChoice] = useState<string | null>(null);
  const [excludeWADA, setExcludeWADA] = useState(false);
  const [preferNonInjectable, setPreferNonInjectable] = useState(false);
  const [fdaOnly, setFdaOnly] = useState(false);
  const [selectedState, setSelectedState] = useState<string>("");
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const totalSteps = 4;

  /* ── Navigation ──────────────────────────────────────────────────────── */
  const goNext = useCallback(() => {
    setDirection("forward");
    setStep((s) => {
      const next = Math.min(s + 1, totalSteps + 1);
      if (next === totalSteps + 1) trackToolUse("peptide_finder", "view_results");
      return next;
    });
  }, []);

  const goBack = useCallback(() => {
    setDirection("back");
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const startOver = useCallback(() => {
    setStep(1);
    setSelectedCategories([]);
    setEvidenceChoice(null);
    setExcludeWADA(false);
    setPreferNonInjectable(false);
    setFdaOnly(false);
    setSelectedState("");
    setDirection("forward");
  }, []);

  /* ── Category toggle ─────────────────────────────────────────────────── */
  const toggleCategory = useCallback((slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  }, []);

  /* ── Next-button disabled logic ──────────────────────────────────────── */
  const nextDisabled =
    (step === 1 && selectedCategories.length === 0) ||
    (step === 2 && !evidenceChoice);

  /* ── Filtered results ────────────────────────────────────────────────── */
  const results = useMemo(() => {
    const evidenceOpt = EVIDENCE_OPTIONS.find((o) => o.key === evidenceChoice);

    const filtered = peptides.filter((p) => {
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
        return false;
      }

      // Evidence level filter
      if (evidenceOpt && !evidenceOpt.levels.includes(p.evidenceLevel)) {
        return false;
      }

      // FDA-only from evidence step
      if (evidenceOpt?.requireFDA && p.fdaStatus !== "approved") {
        return false;
      }

      // Step 3 filters
      if (excludeWADA && p.wadaBanned) return false;
      if (fdaOnly && p.fdaStatus !== "approved") return false;

      return true;
    });

    // Sort: evidence level A first, then B, C, D; then alphabetical
    const levelOrder: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
    filtered.sort((a, b) => {
      const la = levelOrder[a.evidenceLevel] ?? 9;
      const lb = levelOrder[b.evidenceLevel] ?? 9;
      if (la !== lb) return la - lb;
      return a.name.localeCompare(b.name);
    });

    return filtered;
  }, [peptides, selectedCategories, evidenceChoice, excludeWADA, fdaOnly]);

  /* ── Progress Bar ────────────────────────────────────────────────────── */
  const renderProgressBar = () => {
    const displayStep = Math.min(step, totalSteps);
    return (
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: C.navy }}>
            {step <= totalSteps ? `Step ${displayStep} of ${totalSteps}` : "Results"}
          </span>
          {step > 1 && step <= totalSteps && (
            <button
              onClick={goBack}
              style={{
                background: "none",
                border: "none",
                color: C.teal,
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}
        </div>
        <div style={{ height: "4px", backgroundColor: C.border, borderRadius: "2px", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${step <= totalSteps ? (displayStep / totalSteps) * 100 : 100}%`,
              backgroundColor: C.teal,
              borderRadius: "2px",
              transition: "width 0.4s ease",
            }}
          />
        </div>
        {/* Step dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "0.75rem" }}>
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              style={{
                width: "0.5rem",
                height: "0.5rem",
                borderRadius: "50%",
                backgroundColor: i + 1 <= displayStep ? C.teal : C.border,
                transition: "background-color 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  /* ── Step Wrapper with transitions ───────────────────────────────────── */
  const renderStepWrapper = (children: React.ReactNode) => (
    <div
      key={step}
      style={{
        animation: `${direction === "forward" ? "slideInRight" : "slideInLeft"} 0.35s ease`,
      }}
    >
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      {children}
    </div>
  );

  /* ── Step 1: Categories ──────────────────────────────────────────────── */
  const renderStep1 = () => renderStepWrapper(
    <>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: C.navy,
          fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
          marginBottom: "0.5rem",
        }}
      >
        What area of research interests you most?
      </h2>
      <p style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "1.5rem" }}>
        Select one or more areas
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.75rem" }}>
        {CATEGORIES.map((cat) => {
          const selected = selectedCategories.includes(cat.slug);
          return (
            <button
              key={cat.slug}
              onClick={() => toggleCategory(cat.slug)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1.25rem 0.75rem",
                borderRadius: "0.75rem",
                border: `2px solid ${selected ? C.teal : C.border}`,
                backgroundColor: selected ? C.tealLight : C.surface,
                cursor: "pointer",
                transition: "all 0.2s ease",
                color: selected ? C.teal : C.navy,
              }}
            >
              <div style={{ opacity: selected ? 1 : 0.7 }}>{cat.icon}</div>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, textAlign: "center", lineHeight: 1.3 }}>
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" }}>
        <button
          onClick={goNext}
          disabled={nextDisabled}
          style={{
            padding: "0.65rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            backgroundColor: nextDisabled ? C.border : C.teal,
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: nextDisabled ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            transition: "background-color 0.2s ease",
          }}
        >
          Next
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </>
  );

  /* ── Step 2: Evidence Level ──────────────────────────────────────────── */
  const renderStep2 = () => renderStepWrapper(
    <>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: C.navy,
          fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
          marginBottom: "0.5rem",
        }}
      >
        What level of evidence do you prefer?
      </h2>
      <p style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "1.5rem" }}>
        Select one option
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {EVIDENCE_OPTIONS.map((opt) => {
          const selected = evidenceChoice === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => setEvidenceChoice(opt.key)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "1rem 1.25rem",
                borderRadius: "0.75rem",
                border: `2px solid ${selected ? C.teal : C.border}`,
                backgroundColor: selected ? C.tealLight : C.surface,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "0.5rem",
                  backgroundColor: opt.badgeBg,
                  border: `2px solid ${opt.badgeColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: opt.badgeColor }}>
                  {opt.levels[opt.levels.length - 1]}
                </span>
              </div>
              <div>
                <span style={{ fontSize: "0.95rem", fontWeight: 700, color: C.navy, display: "block", marginBottom: "0.2rem" }}>
                  {opt.label}
                </span>
                <span style={{ fontSize: "0.8rem", color: "#6b7280", lineHeight: 1.4 }}>
                  {opt.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
        <button
          onClick={goBack}
          style={{
            padding: "0.65rem 1.5rem",
            borderRadius: "0.5rem",
            border: `1px solid ${C.border}`,
            backgroundColor: C.surface,
            color: C.navy,
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          onClick={goNext}
          disabled={nextDisabled}
          style={{
            padding: "0.65rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            backgroundColor: nextDisabled ? C.border : C.teal,
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: nextDisabled ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            transition: "background-color 0.2s ease",
          }}
        >
          Next
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </>
  );

  /* ── Step 3: Additional Preferences ──────────────────────────────────── */
  const renderStep3 = () => renderStepWrapper(
    <>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: C.navy,
          fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
          marginBottom: "0.5rem",
        }}
      >
        Any additional preferences?
      </h2>
      <p style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "1.5rem" }}>
        All optional — skip if none apply
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {/* Exclude WADA */}
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
            padding: "1rem 1.25rem",
            borderRadius: "0.75rem",
            border: `2px solid ${excludeWADA ? C.teal : C.border}`,
            backgroundColor: excludeWADA ? C.tealLight : C.surface,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <input
            type="checkbox"
            checked={excludeWADA}
            onChange={(e) => setExcludeWADA(e.target.checked)}
            style={{ width: "1.1rem", height: "1.1rem", marginTop: "0.15rem", accentColor: C.teal, flexShrink: 0 }}
          />
          <div>
            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: C.navy, display: "block", marginBottom: "0.2rem" }}>
              Must NOT be WADA prohibited
            </span>
            <span style={{ fontSize: "0.8rem", color: "#6b7280", lineHeight: 1.4 }}>
              Exclude peptides banned by the World Anti-Doping Agency
            </span>
          </div>
        </label>

        {/* Prefer non-injectable */}
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
            padding: "1rem 1.25rem",
            borderRadius: "0.75rem",
            border: `2px solid ${preferNonInjectable ? C.teal : C.border}`,
            backgroundColor: preferNonInjectable ? C.tealLight : C.surface,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <input
            type="checkbox"
            checked={preferNonInjectable}
            onChange={(e) => setPreferNonInjectable(e.target.checked)}
            style={{ width: "1.1rem", height: "1.1rem", marginTop: "0.15rem", accentColor: C.teal, flexShrink: 0 }}
          />
          <div>
            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: C.navy, display: "block", marginBottom: "0.2rem" }}>
              Prefer non-injectable options
            </span>
            <span style={{ fontSize: "0.8rem", color: "#6b7280", lineHeight: 1.4 }}>
              Highlights peptides available in oral, topical, or intranasal forms
            </span>
          </div>
        </label>

        {/* FDA approved formulations only */}
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
            padding: "1rem 1.25rem",
            borderRadius: "0.75rem",
            border: `2px solid ${fdaOnly ? C.teal : C.border}`,
            backgroundColor: fdaOnly ? C.tealLight : C.surface,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <input
            type="checkbox"
            checked={fdaOnly}
            onChange={(e) => setFdaOnly(e.target.checked)}
            style={{ width: "1.1rem", height: "1.1rem", marginTop: "0.15rem", accentColor: C.teal, flexShrink: 0 }}
          />
          <div>
            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: C.navy, display: "block", marginBottom: "0.2rem" }}>
              FDA-approved formulations only
            </span>
            <span style={{ fontSize: "0.8rem", color: "#6b7280", lineHeight: 1.4 }}>
              Only show peptides with at least one FDA-approved product
            </span>
          </div>
        </label>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
        <button
          onClick={goBack}
          style={{
            padding: "0.65rem 1.5rem",
            borderRadius: "0.5rem",
            border: `1px solid ${C.border}`,
            backgroundColor: C.surface,
            color: C.navy,
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={goNext}
            style={{
              padding: "0.65rem 1.5rem",
              borderRadius: "0.5rem",
              border: `1px solid ${C.border}`,
              backgroundColor: C.surface,
              color: C.navy,
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Skip
          </button>
          <button
            onClick={goNext}
            style={{
              padding: "0.65rem 1.5rem",
              borderRadius: "0.5rem",
              border: "none",
              backgroundColor: C.teal,
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            Next
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );

  /* ── Step 4: State Selection ─────────────────────────────────────────── */
  const renderStep4 = () => renderStepWrapper(
    <>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: C.navy,
          fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
          marginBottom: "0.5rem",
        }}
      >
        Do you need information about a specific U.S. state&apos;s regulations?
      </h2>
      <p style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "1.5rem" }}>
        Optional — adds state-specific legal links to your results
      </p>
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "0.75rem 1rem",
          borderRadius: "0.5rem",
          border: `2px solid ${selectedState ? C.teal : C.border}`,
          backgroundColor: C.surface,
          fontSize: "0.95rem",
          color: C.navy,
          cursor: "pointer",
          appearance: "auto",
        }}
      >
        <option value="">Skip — show all</option>
        {US_STATES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
        <button
          onClick={goBack}
          style={{
            padding: "0.65rem 1.5rem",
            borderRadius: "0.5rem",
            border: `1px solid ${C.border}`,
            backgroundColor: C.surface,
            color: C.navy,
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          onClick={goNext}
          style={{
            padding: "0.65rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            backgroundColor: C.teal,
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          See Results
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </>
  );

  /* ── Results ─────────────────────────────────────────────────────────── */
  const renderResults = () => {
    // Map category slugs to labels for the "Why this matches" section
    const catLabels: Record<string, string> = {};
    CATEGORIES.forEach((c) => {
      catLabels[c.slug] = c.label;
    });

    return renderStepWrapper(
        <>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
          <div>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: C.navy,
                fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                marginBottom: "0.25rem",
              }}
            >
              Your Personalized Peptide Research Guide
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
              {results.length} peptide{results.length !== 1 ? "s" : ""} match{results.length === 1 ? "es" : ""} your criteria
            </p>
          </div>
          <button
            onClick={startOver}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: `1px solid ${C.border}`,
              backgroundColor: C.surface,
              color: C.navy,
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              whiteSpace: "nowrap",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 4v6h6M23 20v-6h-6" />
              <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
            </svg>
            Start Over
          </button>
        </div>

        {/* Disclaimer */}
        <div
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            backgroundColor: "#fffbeb",
            border: "1px solid #fde68a",
            marginBottom: "1.5rem",
            fontSize: "0.8rem",
            color: "#92400e",
            lineHeight: 1.5,
          }}
        >
          These results are for educational purposes only and do not constitute medical recommendations.
          Always consult a qualified healthcare professional before making any decisions about peptide research.
        </div>

        {results.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem 1.5rem",
              borderRadius: "0.75rem",
              backgroundColor: C.bg,
              border: `1px solid ${C.border}`,
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={C.border} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 1rem" }}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            <p style={{ fontSize: "1.1rem", fontWeight: 600, color: C.navy, marginBottom: "0.5rem" }}>
              No peptides match all your criteria
            </p>
            <p style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "1.5rem" }}>
              Try broadening your filters for more results.
            </p>
            <button
              onClick={startOver}
              style={{
                padding: "0.65rem 1.5rem",
                borderRadius: "0.5rem",
                border: "none",
                backgroundColor: C.teal,
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              Start Over
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {results.map((p) => {
              const matchingCats = selectedCategories.filter((c) => c === p.category);
              const topBenefits = p.benefits.slice(0, 2);
              const truncDesc = p.description.length > 160 ? p.description.slice(0, 160) + "..." : p.description;

              return (
                <div
                  key={p.slug}
                  style={{
                    padding: "1.25rem",
                    borderRadius: "0.75rem",
                    border: `1px solid ${C.border}`,
                    backgroundColor: C.surface,
                    transition: "box-shadow 0.2s ease",
                  }}
                >
                  {/* Header row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    <h3
                      style={{
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: C.navy,
                        margin: 0,
                        fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                      }}
                    >
                      {p.name}
                    </h3>
                    <EvidencePill level={p.evidenceLevel} />
                  </div>

                  {/* Pills row */}
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "9999px",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        backgroundColor: C.bg,
                        color: C.teal,
                        border: `1px solid ${C.border}`,
                        textTransform: "uppercase",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {p.categoryName}
                    </span>
                    <FDAPill status={p.fdaStatus} />
                    {p.wadaBanned && (
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.15rem 0.5rem",
                          borderRadius: "9999px",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          backgroundColor: "#fee2e2",
                          color: "#b91c1c",
                          border: "1px solid #fecaca",
                        }}
                      >
                        WADA Prohibited
                      </span>
                    )}
                    {preferNonInjectable && p.type && (
                      (() => {
                        const nonInjectableKeywords = ["oral", "topical", "intranasal", "cream", "spray", "capsule"];
                        const typeLC = p.type.toLowerCase();
                        const hasNonInjectable = nonInjectableKeywords.some((k) => typeLC.includes(k));
                        if (hasNonInjectable) {
                          return (
                            <span
                              style={{
                                display: "inline-block",
                                padding: "0.15rem 0.5rem",
                                borderRadius: "9999px",
                                fontSize: "0.7rem",
                                fontWeight: 600,
                                backgroundColor: "#dcfce7",
                                color: "#15803d",
                                border: "1px solid #bbf7d0",
                              }}
                            >
                              Non-Injectable Available
                            </span>
                          );
                        }
                        return null;
                      })()
                    )}
                  </div>

                  {/* Why this matches */}
                  {matchingCats.length > 0 && (
                    <div style={{ marginBottom: "0.65rem" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Why this matches:
                      </span>
                      <span style={{ fontSize: "0.8rem", color: "#6b7280", marginLeft: "0.4rem" }}>
                        {matchingCats.map((c) => catLabels[c]).join(", ")}
                      </span>
                    </div>
                  )}

                  {/* Top benefits */}
                  {topBenefits.length > 0 && (
                    <ul style={{ margin: "0 0 0.65rem", paddingLeft: "1.25rem", fontSize: "0.85rem", color: "#374151", lineHeight: 1.6 }}>
                      {topBenefits.map((b, i) => (
                        <li key={i}>{b.text}</li>
                      ))}
                    </ul>
                  )}

                  {/* Description */}
                  <p style={{ fontSize: "0.85rem", color: "#6b7280", lineHeight: 1.5, margin: "0 0 0.75rem" }}>
                    {truncDesc}
                  </p>

                  {/* Links */}
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <Link
                      href={`/peptides/${p.slug}`}
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: C.teal,
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      View Full Profile
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    {selectedState && (
                      <Link
                        href={`/peptides/${p.slug}/legal/${stateToSlug(selectedState)}`}
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: C.navy,
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                        }}
                      >
                        {selectedState} Legal Status
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom start-over */}
        {results.length > 0 && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button
              onClick={startOver}
              style={{
                padding: "0.65rem 1.5rem",
                borderRadius: "0.5rem",
                border: `1px solid ${C.border}`,
                backgroundColor: C.surface,
                color: C.navy,
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 4v6h6M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
              </svg>
              Start Over
            </button>
          </div>
        )}
        </>
    );
  };

  /* ── Render ──────────────────────────────────────────────────────────── */
  return (
    <div
      className="finder-shell"
      style={{
        backgroundColor: C.surface,
        borderRadius: "1rem",
        border: `1px solid ${C.border}`,
        padding: "1.5rem",
        maxWidth: "48rem",
        margin: "0 auto",
      }}
    >
      {renderProgressBar()}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
      {step > totalSteps && renderResults()}
    </div>
  );
}
