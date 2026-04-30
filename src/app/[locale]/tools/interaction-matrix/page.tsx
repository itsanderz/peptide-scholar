"use client";

import { useState } from "react";

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

interface InteractionEntry {
  peptideA: string;
  peptideB: string;
  riskLevel: "synergistic" | "low" | "moderate" | "high";
  mechanism: string;
  clinicalNotes: string;
  evidence: string;
}

const interactions: InteractionEntry[] = [
  {
    peptideA: "CJC-1295",
    peptideB: "Ipamorelin",
    riskLevel: "synergistic",
    mechanism: "GHRH analog + GHRP produce complementary GH release pathways. CJC-1295 stimulates somatotrophs via GHRH receptor; Ipamorelin activates ghrelin receptor (GHSR). Combined effect exceeds sum of individual effects.",
    clinicalNotes: "This is the most commonly studied combination in anti-aging clinics. No direct harmful interaction known. Monitor IGF-1 levels.",
    evidence: "Mechanistic synergy established in endocrinology literature. No published RCTs of combination in healthy adults.",
  },
  {
    peptideA: "CJC-1295",
    peptideB: "GHRP-2",
    riskLevel: "synergistic",
    mechanism: "Same complementary pathway as Ipamorelin, but GHRP-2 is less selective — also elevates cortisol and prolactin.",
    clinicalNotes: "More side effects than CJC/Ipamorelin combo. Cortisol elevation may cause water retention, mood changes, and impaired glucose tolerance.",
    evidence: "GHRP-2 pharmacology well-characterized. Combination not specifically studied in controlled trials.",
  },
  {
    peptideA: "Semaglutide",
    peptideB: "Tirzepatide",
    riskLevel: "high",
    mechanism: "Both are GLP-1 receptor agonists. Combined use causes additive GLP-1 receptor stimulation, leading to excessive appetite suppression, nausea, and hypoglycemia risk.",
    clinicalNotes: "Never combine two GLP-1 agonists. This combination has no therapeutic rationale and significantly increases GI side effects and hypoglycemia risk.",
    evidence: "Class contraindication. No clinical trials support combined GLP-1 agonist therapy.",
  },
  {
    peptideA: "Semaglutide",
    peptideB: "BPC-157",
    riskLevel: "low",
    mechanism: "No direct pharmacodynamic interaction. BPC-157's gastroprotective effects may theoretically mitigate GLP-1-induced GI discomfort.",
    clinicalNotes: "Commonly stacked in biohacking communities. No documented adverse interaction. BPC-157 is not FDA-approved.",
    evidence: "No interaction studies published. Theoretical benefit only.",
  },
  {
    peptideA: "BPC-157",
    peptideB: "TB-500",
    riskLevel: "synergistic",
    mechanism: "BPC-157 promotes angiogenesis and collagen synthesis via NO/cGMP pathway. TB-500 (Thymosin Beta-4) regulates actin polymerization and cell migration. Mechanisms are complementary for tissue repair.",
    clinicalNotes: "The 'Wolverine Stack' — most popular healing combination. Both are research peptides with no human RCTs. No harmful interaction known.",
    evidence: "Both have extensive animal data for tissue repair. No human interaction studies exist.",
  },
  {
    peptideA: "BPC-157",
    peptideB: "GHK-Cu",
    riskLevel: "low",
    mechanism: "Both promote wound healing through different pathways. BPC-157 via growth factor modulation; GHK-Cu via copper-dependent collagen synthesis and angiogenesis.",
    clinicalNotes: "Commonly combined in recovery stacks. KLOW stack (BPC-157 + TB-500 + GHK-Cu + KPV) is popular. Some users report GI distress from GHK-Cu histamine effects.",
    evidence: "No direct interaction studies. Anecdotal reports of GI sensitivity when combined.",
  },
  {
    peptideA: "Semax",
    peptideB: "Selank",
    riskLevel: "synergistic",
    mechanism: "Semax is a synthetic ACTH fragment with nootropic and neuroprotective effects. Selank is a synthetic tuftsin analog with anxiolytic properties. Both cross the blood-brain barrier and modulate neurotransmitter systems.",
    clinicalNotes: "Frequently combined for cognitive enhancement + anxiety reduction. Russian clinical data exists for both individually. No harmful interaction reported.",
    evidence: "Individual Russian studies for each peptide. Combination use is anecdotal/community-based.",
  },
  {
    peptideA: "Semaglutide",
    peptideB: "CJC-1295",
    riskLevel: "moderate",
    mechanism: "GLP-1 agonists slow gastric emptying and may affect nutrient absorption. GH peptides increase metabolic rate and may alter glucose homeostasis. Both affect metabolic pathways.",
    clinicalNotes: "Monitor blood glucose closely. GLP-1s lower glucose; GH peptides can raise it via IGF-1. Net effect is unpredictable and individual-dependent.",
    evidence: "No direct interaction studies. Theoretical based on individual mechanisms.",
  },
  {
    peptideA: "Tesamorelin",
    peptideB: "Ipamorelin",
    riskLevel: "moderate",
    mechanism: "Both stimulate GH release — Tesamorelin via GHRH receptor, Ipamorelin via ghrelin receptor. Combined use produces supraphysiological GH elevation.",
    clinicalNotes: "Redundant mechanism. Consider using one or the other, not both, unless under endocrinology supervision. Elevated IGF-1 increases theoretical cancer risk.",
    evidence: "No combination studies. Mechanistic redundancy suggests limited added benefit with increased risk.",
  },
  {
    peptideA: "Bremelanotide",
    peptideB: "PT-141",
    riskLevel: "high",
    mechanism: "Bremelanotide IS PT-141. These are the same compound (different names). Taking both is effectively double-dosing.",
    clinicalNotes: "Never combine — this is the same peptide. Bremelanotide (Vyleesi) is FDA-approved for female HSDD.",
    evidence: "Identity confirmed in drug databases. Same melanocortin receptor agonist.",
  },
  {
    peptideA: "BPC-157",
    peptideB: "NSAIDs",
    riskLevel: "moderate",
    mechanism: "BPC-157 protects gastric mucosa from NSAID-induced damage in animal models. In humans, this may mask early signs of NSAID gastropathy.",
    clinicalNotes: "BPC-157 was originally isolated for gastroprotection. Animal data shows protection against NSAID ulcers. Human use alongside chronic NSAIDs may provide gastric protection but does not eliminate renal or cardiovascular NSAID risks.",
    evidence: "Strong animal data for gastroprotection. No human clinical trials.",
  },
  {
    peptideA: "GHK-Cu",
    peptideB: "KPV",
    riskLevel: "low",
    mechanism: "Both have anti-inflammatory properties. GHK-Cu modulates gene expression; KPV (Lys-Pro-Val) is a melanocortin fragment with anti-inflammatory effects.",
    clinicalNotes: "Combined in KLOW/GLOW stacks. No known harmful interaction. Some users report histamine-related GI symptoms from GHK-Cu.",
    evidence: "No interaction studies. Mechanistically complementary for inflammation.",
  },
  {
    peptideA: "Retatrutide",
    peptideB: "Semaglutide",
    riskLevel: "high",
    mechanism: "Retatrutide is a triple GIP/GLP-1/glucagon receptor agonist. Semaglutide is a GLP-1 agonist. Combined use produces excessive incretin pathway activation.",
    clinicalNotes: "Never combine. Retatrutide already includes GLP-1 activity. This would be redundant and dangerous.",
    evidence: "Class overlap. No clinical rationale for combination.",
  },
  {
    peptideA: "Epithalon",
    peptideB: "Thymalin",
    riskLevel: "low",
    mechanism: "Epithalon is a synthetic pineal peptide (Ala-Glu-Asp-Gly) that may affect telomerase. Thymalin is a thymus peptide immunomodulator. Different target tissues.",
    clinicalNotes: "Combined in longevity stacks. No known harmful interaction. Both have limited human clinical data.",
    evidence: "No interaction studies. Individual Russian studies exist for both.",
  },
  {
    peptideA: "MOTS-c",
    peptideB: "CJC-1295",
    riskLevel: "low",
    mechanism: "MOTS-c is a mitochondrial-derived peptide that improves insulin sensitivity. CJC-1295 increases GH/IGF-1 which can reduce insulin sensitivity. Potentially opposing metabolic effects.",
    clinicalNotes: "Theoretical metabolic opposition. No evidence this is clinically significant. Monitor fasting glucose and HbA1c if combining long-term.",
    evidence: "No interaction studies. Mechanistic speculation only.",
  },
];

const allPeptides = Array.from(
  new Set(interactions.flatMap((i) => [i.peptideA, i.peptideB]))
).sort();

const riskConfig = {
  synergistic: { label: "Synergistic / Safe", color: "#2B8A5E", bg: "#F0FDF4", border: "#BBF7D0" },
  low: { label: "Low Risk", color: "#3B7A9E", bg: "#F0F9FF", border: "#BAE6FD" },
  moderate: { label: "Moderate Risk", color: "#D4912A", bg: "#FFFBEB", border: "#FDE68A" },
  high: { label: "High Risk / Avoid", color: "#D4553A", bg: "#FEF2F2", border: "#FECACA" },
};

export default function InteractionMatrixPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const [selected, setSelected] = useState<InteractionEntry | null>(null);

  const filtered = filter
    ? interactions.filter((i) => i.peptideA === filter || i.peptideB === filter)
    : interactions;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4" style={{ backgroundColor: "#F8FAFC", borderColor: C.border, color: C.navy }}>
          <span>Tool</span>
          <span style={{ color: C.teal }}>Beta</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: C.navy }}>
          Peptide Interaction Matrix
        </h1>
        <p className="text-base leading-relaxed max-w-3xl" style={{ color: C.muted }}>
          A pharmacologically grounded reference for known and theoretical interactions between peptides. 
          This matrix covers synergistic combinations, redundant mechanisms, and combinations that should be avoided. 
          Not medical advice — always consult a clinician before combining compounds.
        </p>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2" style={{ color: C.navy }}>Filter by peptide</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter(null)}
            className="rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors"
            style={{
              backgroundColor: filter === null ? C.teal : C.surface,
              color: filter === null ? "#fff" : C.navy,
              borderColor: filter === null ? C.teal : C.border,
            }}
          >
            Show All
          </button>
          {allPeptides.map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className="rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors"
              style={{
                backgroundColor: filter === p ? C.teal : C.surface,
                color: filter === p ? "#fff" : C.navy,
                borderColor: filter === p ? C.teal : C.border,
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-6">
        {Object.entries(riskConfig).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cfg.color }} />
            <span className="text-xs font-medium" style={{ color: C.muted }}>{cfg.label}</span>
          </div>
        ))}
      </div>

      {/* Matrix Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {filtered.map((entry, idx) => {
          const cfg = riskConfig[entry.riskLevel];
          return (
            <button
              key={idx}
              onClick={() => setSelected(entry)}
              className="rounded-xl border p-4 text-left transition-all hover:shadow-md"
              style={{ backgroundColor: cfg.bg, borderColor: cfg.border }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold" style={{ color: C.navy }}>{entry.peptideA}</span>
                  <span style={{ color: C.muted }}>+</span>
                  <span className="text-sm font-bold" style={{ color: C.navy }}>{entry.peptideB}</span>
                </div>
                <span className="rounded-full px-2 py-0.5 text-xs font-bold" style={{ backgroundColor: cfg.color, color: "#fff" }}>
                  {cfg.label}
                </span>
              </div>
              <p className="text-xs line-clamp-2" style={{ color: C.muted }}>{entry.mechanism}</p>
            </button>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-w-xl w-full rounded-2xl border p-6" style={{ backgroundColor: C.surface, borderColor: C.border }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold" style={{ color: C.navy }}>{selected.peptideA}</span>
                <span style={{ color: C.muted }}>+</span>
                <span className="text-lg font-bold" style={{ color: C.navy }}>{selected.peptideB}</span>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg p-1 hover:bg-gray-100"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: riskConfig[selected.riskLevel].color, color: "#fff" }}>
                {riskConfig[selected.riskLevel].label}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold mb-1" style={{ color: C.navy }}>Mechanism</h4>
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{selected.mechanism}</p>
              </div>
              <div>
                <h4 className="text-sm font-bold mb-1" style={{ color: C.navy }}>Clinical Notes</h4>
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{selected.clinicalNotes}</p>
              </div>
              <div>
                <h4 className="text-sm font-bold mb-1" style={{ color: C.navy }}>Evidence</h4>
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{selected.evidence}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t text-xs" style={{ borderColor: C.border, color: C.muted }}>
              This interaction assessment is based on published pharmacological data and mechanistic reasoning. 
              It does not constitute medical advice. Always consult a qualified clinician before combining peptides.
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="rounded-xl p-4 text-sm leading-relaxed" style={{ backgroundColor: "#FFF7ED", border: "1px solid #FDBA74", color: "#9A3412" }}>
        <strong>Important:</strong> This matrix covers known and theoretical interactions based on pharmacological mechanisms. 
        Many peptides lack formal drug-drug interaction studies. The absence of an interaction in this matrix does not 
        guarantee safety. When in doubt, introduce one peptide at a time and monitor for adverse effects. 
        Never combine peptides with identical mechanisms (e.g., two GLP-1 agonists).
      </div>
    </div>
  );
}
