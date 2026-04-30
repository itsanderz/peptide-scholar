"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  getPeptideOverallScore,
  getProviderOverallScore,
  getStackOverallScore,
  FDAStatus,
  AdministrationRoute,
  calculateEvidenceQuality,
  calculateCostAccessibility,
  calculateAdministrationConvenience,
  calculateWADACompliance,
  type PeptideScores,
  type ProviderScores,
  type StackScores,
} from "@/data/peptide-benchmarks";

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

/* -------------------------------------------------------------------------- */
/*                               Scored Peptides                              */
/* -------------------------------------------------------------------------- */

interface ScoredPeptide {
  name: string;
  slug?: string;
  category: string;
  scores: PeptideScores;
  notes: string;
}

const scoredPeptides: ScoredPeptide[] = [
  {
    name: "Semaglutide",
    slug: "semaglutide",
    category: "GLP-1 Agonist",
    scores: {
      evidenceQuality: calculateEvidenceQuality(FDAStatus.Approved, 17000),
      costAccessibility: calculateCostAccessibility(1100),
      safetyProfile: 78,
      administrationConvenience: calculateAdministrationConvenience(AdministrationRoute.Subcutaneous),
      wadaCompliance: calculateWADACompliance(false),
      mechanismClarity: 95,
    },
    notes: "FDA-approved for obesity and T2DM. Strongest evidence base among all peptides. Expensive without insurance.",
  },
  {
    name: "Tirzepatide",
    slug: "tirzepatide",
    category: "Dual GIP/GLP-1",
    scores: {
      evidenceQuality: calculateEvidenceQuality(FDAStatus.Approved, 2500),
      costAccessibility: calculateCostAccessibility(1200),
      safetyProfile: 76,
      administrationConvenience: calculateAdministrationConvenience(AdministrationRoute.Subcutaneous),
      wadaCompliance: calculateWADACompliance(false),
      mechanismClarity: 90,
    },
    notes: "FDA-approved. Superior weight loss vs semaglutide in head-to-head trial. Less cardiovascular outcome data.",
  },
  {
    name: "BPC-157",
    category: "Healing Peptide",
    scores: {
      evidenceQuality: calculateEvidenceQuality(FDAStatus.Investigational, 0),
      costAccessibility: calculateCostAccessibility(70),
      safetyProfile: 55,
      administrationConvenience: calculateAdministrationConvenience(AdministrationRoute.Subcutaneous),
      wadaCompliance: calculateWADACompliance(true),
      mechanismClarity: 45,
    },
    notes: "200+ animal studies, zero published human RCTs. WADA-banned. Mechanism unclear. Quality control concerns.",
  },
  {
    name: "TB-500",
    category: "Healing Peptide",
    scores: {
      evidenceQuality: calculateEvidenceQuality(FDAStatus.Investigational, 0),
      costAccessibility: calculateCostAccessibility(90),
      safetyProfile: 50,
      administrationConvenience: calculateAdministrationConvenience(AdministrationRoute.Subcutaneous),
      wadaCompliance: calculateWADACompliance(true),
      mechanismClarity: 40,
    },
    notes: "Thymosin Beta-4 fragment. Animal data only. WADA-banned. No human efficacy data.",
  },
  {
    name: "GHK-Cu",
    category: "Copper Peptide",
    scores: {
      evidenceQuality: calculateEvidenceQuality(FDAStatus.CompoundedOnly, 120),
      costAccessibility: calculateCostAccessibility(50),
      safetyProfile: 82,
      administrationConvenience: calculateAdministrationConvenience(AdministrationRoute.Subcutaneous),
      wadaCompliance: calculateWADACompliance(false),
      mechanismClarity: 60,
    },
    notes: "Strong topical evidence for skin aging. Injectable human RCTs lacking. Naturally occurring, favorable safety.",
  },
  {
    name: "CJC-1295",
    category: "GHRH Analog",
    scores: {
      evidenceQuality: calculateEvidenceQuality(FDAStatus.Investigational, 45),
      costAccessibility: calculateCostAccessibility(75),
      safetyProfile: 58,
      administrationConvenience: calculateAdministrationConvenience(AdministrationRoute.Subcutaneous),
      wadaCompliance: calculateWADACompliance(true),
      mechanismClarity: 70,
    },
    notes: "Pharmacokinetic data exists. No RCTs for body composition in healthy adults. WADA-banned. Elevates IGF-1.",
  },
  {
    name: "Ipamorelin",
    category: "GHRP",
    scores: {
      evidenceQuality: calculateEvidenceQuality(FDAStatus.Investigational, 60),
      costAccessibility: calculateCostAccessibility(60),
      safetyProfile: 65,
      administrationConvenience: calculateAdministrationConvenience(AdministrationRoute.Subcutaneous),
      wadaCompliance: calculateWADACompliance(true),
      mechanismClarity: 75,
    },
    notes: "Cleanest GHRP profile — minimal cortisol/prolactin elevation. Phase I-II data. WADA-banned. No body comp RCTs.",
  },
  {
    name: "Sermorelin",
    category: "GHRH Analog",
    scores: {
      evidenceQuality: calculateEvidenceQuality(FDAStatus.Approved, 200),
      costAccessibility: calculateCostAccessibility(225),
      safetyProfile: 72,
      administrationConvenience: calculateAdministrationConvenience(AdministrationRoute.Subcutaneous),
      wadaCompliance: calculateWADACompliance(true),
      mechanismClarity: 80,
    },
    notes: "Formerly FDA-approved for pediatric GH deficiency (discontinued). Good safety data. WADA-banned despite approval.",
  },
  {
    name: "Tesamorelin",
    slug: "tesamorelin",
    category: "GHRH Analog",
    scores: {
      evidenceQuality: calculateEvidenceQuality(FDAStatus.Approved, 800),
      costAccessibility: calculateCostAccessibility(1000),
      safetyProfile: 74,
      administrationConvenience: calculateAdministrationConvenience(AdministrationRoute.Subcutaneous),
      wadaCompliance: calculateWADACompliance(true),
      mechanismClarity: 85,
    },
    notes: "FDA-approved for HIV lipodystrophy only. Strong evidence in that population. Expensive. WADA-banned.",
  },
  {
    name: "Bremelanotide",
    slug: "bremelanotide",
    category: "Melanocortin Agonist",
    scores: {
      evidenceQuality: calculateEvidenceQuality(FDAStatus.Approved, 1200),
      costAccessibility: calculateCostAccessibility(750),
      safetyProfile: 68,
      administrationConvenience: calculateAdministrationConvenience(AdministrationRoute.Subcutaneous),
      wadaCompliance: calculateWADACompliance(false),
      mechanismClarity: 70,
    },
    notes: "FDA-approved for female HSDD (Vyleesi). Male ED data exists but not approved. ~40% nausea rate.",
  },
  {
    name: "Semax",
    category: "Nootropic Peptide",
    scores: {
      evidenceQuality: calculateEvidenceQuality(FDAStatus.Investigational, 80),
      costAccessibility: calculateCostAccessibility(65),
      safetyProfile: 78,
      administrationConvenience: calculateAdministrationConvenience(AdministrationRoute.Nasal),
      wadaCompliance: calculateWADACompliance(false),
      mechanismClarity: 55,
    },
    notes: "Russian clinical data for cognitive impairment. Not FDA-approved. Nasal route is convenient. Limited Western trials.",
  },
  {
    name: "Selank",
    category: "Anxiolytic Peptide",
    scores: {
      evidenceQuality: calculateEvidenceQuality(FDAStatus.Investigational, 60),
      costAccessibility: calculateCostAccessibility(55),
      safetyProfile: 80,
      administrationConvenience: calculateAdministrationConvenience(AdministrationRoute.Nasal),
      wadaCompliance: calculateWADACompliance(false),
      mechanismClarity: 50,
    },
    notes: "Russian data for anxiety. Not FDA-approved. Favorable safety. Mechanism poorly understood in Western literature.",
  },
  {
    name: "Epithalon",
    category: "Longevity Peptide",
    scores: {
      evidenceQuality: calculateEvidenceQuality(FDAStatus.Investigational, 0),
      costAccessibility: calculateCostAccessibility(90),
      safetyProfile: 70,
      administrationConvenience: calculateAdministrationConvenience(AdministrationRoute.Subcutaneous),
      wadaCompliance: calculateWADACompliance(false),
      mechanismClarity: 35,
    },
    notes: "Telomerase activation claims. Small Russian studies. No replication in Western literature. Highly speculative.",
  },
  {
    name: "Kisspeptin-10",
    category: "GnRH Stimulator",
    scores: {
      evidenceQuality: calculateEvidenceQuality(FDAStatus.Phase2, 85),
      costAccessibility: calculateCostAccessibility(225),
      safetyProfile: 72,
      administrationConvenience: calculateAdministrationConvenience(AdministrationRoute.Subcutaneous),
      wadaCompliance: calculateWADACompliance(false),
      mechanismClarity: 85,
    },
    notes: "Preserves HPT axis and fertility. Phase I-II data in men. Not FDA-approved. Mechanism well-understood.",
  },
  {
    name: "Cerebrolysin",
    category: "Neurotrophic",
    scores: {
      evidenceQuality: calculateEvidenceQuality(FDAStatus.Phase3, 1200),
      costAccessibility: calculateCostAccessibility(450),
      safetyProfile: 80,
      administrationConvenience: calculateAdministrationConvenience(AdministrationRoute.Intravenous),
      wadaCompliance: calculateWADACompliance(false),
      mechanismClarity: 65,
    },
    notes: "IV-only (inconvenient). Strong vascular dementia evidence. Not FDA-approved. Requires infusion center.",
  },
  {
    name: "MOTS-c",
    category: "Mitochondrial Peptide",
    scores: {
      evidenceQuality: calculateEvidenceQuality(FDAStatus.Investigational, 0),
      costAccessibility: calculateCostAccessibility(150),
      safetyProfile: 60,
      administrationConvenience: calculateAdministrationConvenience(AdministrationRoute.Subcutaneous),
      wadaCompliance: calculateWADACompliance(false),
      mechanismClarity: 45,
    },
    notes: "Mitochondrial-derived peptide. Animal data for metabolic health. No human RCTs. Emerging research area.",
  },
];

/* -------------------------------------------------------------------------- */
/*                              Scored Providers                              */
/* -------------------------------------------------------------------------- */

interface ScoredProvider {
  name: string;
  url: string;
  type: string;
  scores: ProviderScores;
  notes: string;
}

const scoredProviders: ScoredProvider[] = [
  {
    name: "Henry Meds",
    url: "https://www.henrymeds.com",
    type: "Telehealth",
    scores: {
      pricingTransparency: 85,
      medicalOversight: 80,
      peptideVariety: 65,
      legalityCompliance: 88,
      customerSupport: 78,
      shippingSpeed: 82,
    },
    notes: "Strong telehealth platform. Offers GLP-1s, testosterone, and some peptides. Transparent pricing. Licensed providers.",
  },
  {
    name: "Ro Body",
    url: "https://ro.co/body",
    type: "Telehealth",
    scores: {
      pricingTransparency: 82,
      medicalOversight: 85,
      peptideVariety: 60,
      legalityCompliance: 90,
      customerSupport: 80,
      shippingSpeed: 85,
    },
    notes: "Well-funded telehealth platform. Strong medical oversight. Focus on weight management and sexual health. Limited peptide variety.",
  },
  {
    name: "NuImage Medical",
    url: "https://www.nuimagemedical.com",
    type: "Telehealth",
    scores: {
      pricingTransparency: 70,
      medicalOversight: 75,
      peptideVariety: 80,
      legalityCompliance: 72,
      customerSupport: 70,
      shippingSpeed: 75,
    },
    notes: "Broader peptide catalog including some research peptides. Pricing less transparent. Medical oversight varies by state.",
  },
  {
    name: "Compounding Pharmacy (503A)",
    url: "#",
    type: "Pharmacy",
    scores: {
      pricingTransparency: 60,
      medicalOversight: 90,
      peptideVariety: 85,
      legalityCompliance: 85,
      customerSupport: 70,
      shippingSpeed: 65,
    },
    notes: "Local compounding with prescription. Highest medical oversight. State-regulated. Limited to prescribed compounds.",
  },
];

/* -------------------------------------------------------------------------- */
/*                                Scored Stacks                               */
/* -------------------------------------------------------------------------- */

interface ScoredStack {
  name: string;
  peptides: string[];
  category: string;
  scores: StackScores;
  notes: string;
}

const scoredStacks: ScoredStack[] = [
  {
    name: "Wolverine Stack",
    peptides: ["BPC-157", "TB-500"],
    category: "Recovery",
    scores: {
      synergyEvidence: 55,
      costEfficiency: 75,
      safetyMargin: 55,
      wadaCompliance: 0,
      practicality: 70,
    },
    notes: "Most popular healing stack. Complementary mechanisms. Both WADA-banned. No human RCTs.",
  },
  {
    name: "GH Optimization",
    peptides: ["CJC-1295", "Ipamorelin"],
    category: "Anti-Aging",
    scores: {
      synergyEvidence: 70,
      costEfficiency: 65,
      safetyMargin: 62,
      wadaCompliance: 0,
      practicality: 75,
    },
    notes: "Mechanistically sound synergy. Cleanest GHRP profile. WADA-banned. No body composition RCTs in healthy adults.",
  },
  {
    name: "GLP-1 Monotherapy",
    peptides: ["Semaglutide"],
    category: "Weight Loss",
    scores: {
      synergyEvidence: 100,
      costEfficiency: 50,
      safetyMargin: 78,
      wadaCompliance: 100,
      practicality: 85,
    },
    notes: "Single FDA-approved drug. Strongest evidence. Expensive. Once-weekly dosing is convenient.",
  },
  {
    name: "Cognitive Enhancement",
    peptides: ["Semax", "Selank"],
    category: "Nootropic",
    scores: {
      synergyEvidence: 45,
      costEfficiency: 70,
      safetyMargin: 78,
      wadaCompliance: 100,
      practicality: 80,
    },
    notes: "Both Russian peptides with individual clinical data. Nasal administration. Limited Western replication.",
  },
  {
    name: "KLOW Stack",
    peptides: ["BPC-157", "TB-500", "GHK-Cu", "KPV"],
    category: "Recovery",
    scores: {
      synergyEvidence: 40,
      costEfficiency: 55,
      safetyMargin: 50,
      wadaCompliance: 0,
      practicality: 55,
    },
    notes: "4-peptide community stack. Complex dosing. Some users report GI distress. Expensive combined cost.",
  },
  {
    name: "Fertility Preservation",
    peptides: ["Kisspeptin-10", "hCG"],
    category: "Men's Health",
    scores: {
      synergyEvidence: 60,
      costEfficiency: 60,
      safetyMargin: 72,
      wadaCompliance: 100,
      practicality: 65,
    },
    notes: "Preserves HPT axis vs exogenous testosterone. Kisspeptin is experimental. hCG is FDA-approved.",
  },
];

/* -------------------------------------------------------------------------- */
/*                                    UI                                      */
/* -------------------------------------------------------------------------- */

type Tab = "peptides" | "providers" | "stacks";

function ScoreBar({ score, label, color }: { score: number; label: string; color?: string }) {
  const c = color || (score >= 80 ? C.success : score >= 60 ? C.warning : C.accent);
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="font-medium" style={{ color: C.navy }}>{label}</span>
        <span className="font-bold" style={{ color: c }}>{score}/100</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#E2E8F0" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, backgroundColor: c }} />
      </div>
    </div>
  );
}

function OverallBadge({ score }: { score: number }) {
  const { label, color } =
    score >= 80 ? { label: "Excellent", color: C.success }
    : score >= 65 ? { label: "Good", color: C.teal }
    : score >= 50 ? { label: "Fair", color: C.warning }
    : { label: "Poor", color: C.accent };
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: color, color: "#fff" }}>
      {label} — {score}/100
    </span>
  );
}

export default function BenchmarkPage() {
  const [tab, setTab] = useState<Tab>("peptides");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"overall" | "evidence" | "cost" | "safety">("overall");

  const categories = useMemo(() => {
    if (tab === "peptides") return Array.from(new Set(scoredPeptides.map((p) => p.category)));
    if (tab === "stacks") return Array.from(new Set(scoredStacks.map((s) => s.category)));
    return [];
  }, [tab]);

  const sortedPeptides = useMemo(() => {
    const base = categoryFilter ? scoredPeptides.filter((p) => p.category === categoryFilter) : [...scoredPeptides];
    const scored = base.map((p) => ({ ...p, overall: getPeptideOverallScore(p.scores) }));
    if (sortBy === "overall") scored.sort((a, b) => b.overall - a.overall);
    if (sortBy === "evidence") scored.sort((a, b) => b.scores.evidenceQuality - a.scores.evidenceQuality);
    if (sortBy === "cost") scored.sort((a, b) => b.scores.costAccessibility - a.scores.costAccessibility);
    if (sortBy === "safety") scored.sort((a, b) => b.scores.safetyProfile - a.scores.safetyProfile);
    return scored;
  }, [categoryFilter, sortBy]);

  const sortedProviders = useMemo(() => {
    const list = scoredProviders.map((p) => ({ ...p, overall: getProviderOverallScore(p.scores) }));
    list.sort((a, b) => b.overall - a.overall);
    return list;
  }, []);

  const sortedStacks = useMemo(() => {
    const base = categoryFilter ? scoredStacks.filter((s) => s.category === categoryFilter) : [...scoredStacks];
    const scored = base.map((s) => ({ ...s, overall: getStackOverallScore(s.scores) }));
    scored.sort((a, b) => b.overall - a.overall);
    return scored;
  }, [categoryFilter]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4" style={{ backgroundColor: "#F8FAFC", borderColor: C.border, color: C.navy }}>
          <span>Tool</span>
          <span style={{ color: C.teal }}>Beta</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: C.navy }}>
          Peptide Benchmark System
        </h1>
        <p className="text-base leading-relaxed max-w-3xl" style={{ color: C.muted }}>
          An evidence-based scoring system for peptides, providers, and stacks across multiple dimensions. 
          Scores are calculated from FDA status, clinical trial data, cost, safety profiles, and practical factors. 
          Use this to compare options objectively — not as a substitute for medical advice.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["peptides", "providers", "stacks"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setCategoryFilter(null); }}
            className="rounded-lg px-4 py-2 text-sm font-semibold border capitalize transition-colors"
            style={{
              backgroundColor: tab === t ? C.teal : C.surface,
              color: tab === t ? "#fff" : C.navy,
              borderColor: tab === t ? C.teal : C.border,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Filters */}
      {tab !== "providers" && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setCategoryFilter(null)}
            className="rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors"
            style={{
              backgroundColor: categoryFilter === null ? C.navy : C.surface,
              color: categoryFilter === null ? "#fff" : C.navy,
              borderColor: categoryFilter === null ? C.navy : C.border,
            }}
          >
            All Categories
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className="rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors"
              style={{
                backgroundColor: categoryFilter === c ? C.navy : C.surface,
                color: categoryFilter === c ? "#fff" : C.navy,
                borderColor: categoryFilter === c ? C.navy : C.border,
              }}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {tab === "peptides" && (
        <>
          <div className="flex gap-2 mb-4">
            <span className="text-xs font-semibold self-center" style={{ color: C.muted }}>Sort by:</span>
            {(["overall", "evidence", "cost", "safety"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className="rounded-full px-3 py-1 text-xs font-semibold border capitalize"
                style={{
                  backgroundColor: sortBy === s ? C.teal : C.surface,
                  color: sortBy === s ? "#fff" : C.navy,
                  borderColor: sortBy === s ? C.teal : C.border,
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {sortedPeptides.map((p) => {
              const overall = getPeptideOverallScore(p.scores);
              return (
                <div key={p.name} className="rounded-xl border p-5" style={{ backgroundColor: C.surface, borderColor: C.border }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-base font-bold" style={{ color: C.navy }}>
                        {p.slug ? (
                          <Link href={`/peptides/${p.slug}`} className="hover:underline">{p.name}</Link>
                        ) : (
                          p.name
                        )}
                      </div>
                      <div className="text-xs font-medium mt-0.5" style={{ color: C.teal }}>{p.category}</div>
                    </div>
                    <OverallBadge score={overall} />
                  </div>
                  <ScoreBar score={p.scores.evidenceQuality} label="Evidence Quality" />
                  <ScoreBar score={p.scores.costAccessibility} label="Cost Accessibility" />
                  <ScoreBar score={p.scores.safetyProfile} label="Safety Profile" />
                  <ScoreBar score={p.scores.administrationConvenience} label="Administration" />
                  <ScoreBar score={p.scores.wadaCompliance} label="WADA Compliance" />
                  <ScoreBar score={p.scores.mechanismClarity} label="Mechanism Clarity" />
                  <p className="mt-3 text-xs leading-relaxed" style={{ color: C.muted }}>{p.notes}</p>
                </div>
              );
            })}
          </div>
        </>
      )}

      {tab === "providers" && (
        <div className="grid md:grid-cols-2 gap-4">
          {sortedProviders.map((p) => {
            const overall = getProviderOverallScore(p.scores);
            return (
              <div key={p.name} className="rounded-xl border p-5" style={{ backgroundColor: C.surface, borderColor: C.border }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-base font-bold" style={{ color: C.navy }}>{p.name}</div>
                    <div className="text-xs font-medium mt-0.5" style={{ color: C.teal }}>{p.type}</div>
                  </div>
                  <OverallBadge score={overall} />
                </div>
                <ScoreBar score={p.scores.pricingTransparency} label="Pricing Transparency" />
                <ScoreBar score={p.scores.medicalOversight} label="Medical Oversight" />
                <ScoreBar score={p.scores.peptideVariety} label="Peptide Variety" />
                <ScoreBar score={p.scores.legalityCompliance} label="Legality & Compliance" />
                <ScoreBar score={p.scores.customerSupport} label="Customer Support" />
                <ScoreBar score={p.scores.shippingSpeed} label="Shipping Speed" />
                <p className="mt-3 text-xs leading-relaxed" style={{ color: C.muted }}>{p.notes}</p>
                {p.url !== "#" && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs font-semibold hover:underline" style={{ color: C.teal }}>
                    Visit website →
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === "stacks" && (
        <div className="grid md:grid-cols-2 gap-4">
          {sortedStacks.map((s) => {
            const overall = getStackOverallScore(s.scores);
            return (
              <div key={s.name} className="rounded-xl border p-5" style={{ backgroundColor: C.surface, borderColor: C.border }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-base font-bold" style={{ color: C.navy }}>{s.name}</div>
                    <div className="text-xs font-medium mt-0.5" style={{ color: C.teal }}>{s.category}</div>
                  </div>
                  <OverallBadge score={overall} />
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {s.peptides.map((pep) => (
                    <span key={pep} className="rounded px-2 py-0.5 text-xs font-medium" style={{ backgroundColor: C.bg, color: C.navy, border: `1px solid ${C.border}` }}>
                      {pep}
                    </span>
                  ))}
                </div>
                <ScoreBar score={s.scores.synergyEvidence} label="Synergy Evidence" />
                <ScoreBar score={s.scores.costEfficiency} label="Cost Efficiency" />
                <ScoreBar score={s.scores.safetyMargin} label="Safety Margin" />
                <ScoreBar score={s.scores.wadaCompliance} label="WADA Compliance" />
                <ScoreBar score={s.scores.practicality} label="Practicality" />
                <p className="mt-3 text-xs leading-relaxed" style={{ color: C.muted }}>{s.notes}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Methodology */}
      <div className="mt-12 rounded-xl border p-5" style={{ backgroundColor: C.surface, borderColor: C.border }}>
        <h3 className="text-lg font-bold mb-3" style={{ color: C.navy }}>Scoring Methodology</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm" style={{ color: C.muted }}>
          <div>
            <strong style={{ color: C.navy }}>Evidence Quality:</strong> Weighted by FDA approval status + log₁₀(largest trial size). Approved drugs with large RCTs score highest.
          </div>
          <div>
            <strong style={{ color: C.navy }}>Cost Accessibility:</strong> Linear scale against $500/month benchmark. Lower cost = higher score.
          </div>
          <div>
            <strong style={{ color: C.navy }}>Safety Profile:</strong> Composite of known side effect severity, frequency, and reversibility. Based on published adverse event data.
          </div>
          <div>
            <strong style={{ color: C.navy }}>Administration:</strong> Oral (100) → Nasal (80) → Subcutaneous (60) → IM (40) → IV (20).
          </div>
          <div>
            <strong style={{ color: C.navy }}>WADA Compliance:</strong> Binary — banned = 0, allowed = 100. Based on 2026 Prohibited List.
          </div>
          <div>
            <strong style={{ color: C.navy }}>Mechanism Clarity:</strong> How well the molecular target and downstream effects are characterized in peer-reviewed literature.
          </div>
        </div>
        <p className="mt-4 text-xs" style={{ color: C.muted }}>
          Overall scores are unweighted averages of all dimensions unless otherwise noted. 
          You can adjust weights in the scoring API to prioritize dimensions that matter most to your use case.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 rounded-xl p-4 text-sm leading-relaxed" style={{ backgroundColor: "#FFF7ED", border: "1px solid #FDBA74", color: "#9A3412" }}>
        <strong>Benchmark scores are for research and comparison purposes only.</strong> They do not constitute 
        medical advice, product endorsement, or guarantee of safety or efficacy. Individual responses to peptides 
        vary. Always consult a qualified healthcare provider before starting any peptide therapy.
      </div>
    </div>
  );
}
