/**
 * Side effect timeline data for the "Is This Normal?" tool.
 * Sources: PMC9293236 (semaglutide GI tolerability), SURMOUNT pooled analysis,
 * Saxenda FDA label. All data verified 2026-03-24.
 */

export interface SymptomTimeline {
  symptom: string;
  medianDurationDays: number | null;
  peakWeek: number | null;
  typicalOnset: string;
  typicalResolution: string;
  prevalencePercent: number;
  placeboPercent: number;
  notes: string;
}

export interface MedicationTimeline {
  slug: string;
  brandName: string;
  genericName: string;
  totalDurationWeeks: number;
  doseEscalationEndWeek: number;
  symptoms: SymptomTimeline[];
  generalNotes: string;
  source: string;
  sourceUrl: string;
  pmid: string | null;
}

export const medicationTimelines: MedicationTimeline[] = [
  {
    slug: "semaglutide-wegovy",
    brandName: "Wegovy",
    genericName: "Semaglutide 2.4mg",
    totalDurationWeeks: 68,
    doseEscalationEndWeek: 16,
    symptoms: [
      {
        symptom: "Nausea",
        medianDurationDays: 8,
        peakWeek: 20,
        typicalOnset: "First 1-2 weeks of treatment or dose increase",
        typicalResolution: "Prevalence declines after week 20; most episodes resolve within 8 days",
        prevalencePercent: 44,
        placeboPercent: 16,
        notes: "Most common side effect. 99.5% of GI events were non-serious. Prevalence peaked at week 20 and decreased thereafter.",
      },
      {
        symptom: "Diarrhea",
        medianDurationDays: 3,
        peakWeek: 20,
        typicalOnset: "During dose escalation, often within days of dose increase",
        typicalResolution: "Most episodes resolve within 3 days",
        prevalencePercent: 30,
        placeboPercent: 16,
        notes: "Second most common GI event. Short median duration.",
      },
      {
        symptom: "Vomiting",
        medianDurationDays: 2,
        peakWeek: 20,
        typicalOnset: "Typically accompanies nausea episodes during dose escalation",
        typicalResolution: "Most episodes resolve within 2 days",
        prevalencePercent: 25,
        placeboPercent: 6,
        notes: "Usually transient. If persistent or severe, contact your healthcare provider.",
      },
      {
        symptom: "Constipation",
        medianDurationDays: 47,
        peakWeek: 10,
        typicalOnset: "Can begin early in treatment",
        typicalResolution: "Longer lasting than other GI effects. Plateaus around week 10.",
        prevalencePercent: 24,
        placeboPercent: 11,
        notes: "Notably longer duration than other symptoms. May require dietary management (fiber, hydration).",
      },
      {
        symptom: "Abdominal pain",
        medianDurationDays: null,
        peakWeek: null,
        typicalOnset: "Variable, often during dose escalation",
        typicalResolution: "Usually improves as body adjusts",
        prevalencePercent: 13,
        placeboPercent: 7,
        notes: "If severe or persistent, contact healthcare provider to rule out pancreatitis.",
      },
      {
        symptom: "Headache",
        medianDurationDays: null,
        peakWeek: null,
        typicalOnset: "First few weeks of treatment",
        typicalResolution: "Usually resolves within the first month",
        prevalencePercent: 6,
        placeboPercent: 5,
        notes: "Only slightly above placebo rate. Ensure adequate hydration.",
      },
      {
        symptom: "Fatigue",
        medianDurationDays: null,
        peakWeek: null,
        typicalOnset: "First few weeks, especially with caloric deficit",
        typicalResolution: "Usually improves as body adjusts to reduced caloric intake",
        prevalencePercent: 5,
        placeboPercent: 4,
        notes: "Close to placebo rate. May be related to caloric deficit rather than medication directly.",
      },
    ],
    generalNotes: "72.9% of semaglutide recipients reported any GI side effect. 98.1% were mild-to-moderate. Only 4.3% discontinued due to GI events (vs 0.7% placebo). Side effects are most common during dose escalation and decrease after reaching maintenance dose.",
    source: "Wharton et al. (2022) — Gastrointestinal tolerability of semaglutide 2.4mg. Diabetes Obes Metab.",
    sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9293236/",
    pmid: "34514682",
  },
  {
    slug: "tirzepatide-zepbound",
    brandName: "Zepbound / Mounjaro",
    genericName: "Tirzepatide",
    totalDurationWeeks: 72,
    doseEscalationEndWeek: 20,
    symptoms: [
      {
        symptom: "Nausea",
        medianDurationDays: null,
        peakWeek: null,
        typicalOnset: "Within first week of each dose increase. Body adjusts within 3-7 days.",
        typicalResolution: "Declines at each dose level after initial 3-7 day adjustment period",
        prevalencePercent: 31,
        placeboPercent: 10,
        notes: "Incidence varies by dose: 5mg (25%), 10mg (33%), 15mg (31%). Most common during escalation.",
      },
      {
        symptom: "Diarrhea",
        medianDurationDays: null,
        peakWeek: null,
        typicalOnset: "Within days of dose increase",
        typicalResolution: "Usually transient, resolving within days",
        prevalencePercent: 23,
        placeboPercent: 7,
        notes: "Dose-related: 5mg (19%), 10mg (21%), 15mg (23%).",
      },
      {
        symptom: "Constipation",
        medianDurationDays: null,
        peakWeek: null,
        typicalOnset: "Can occur at any point during treatment",
        typicalResolution: "May persist but typically manageable",
        prevalencePercent: 17,
        placeboPercent: 6,
        notes: "5mg (17%), 10mg (17%), 15mg (12%). Adequate hydration and fiber recommended.",
      },
      {
        symptom: "Vomiting",
        medianDurationDays: null,
        peakWeek: null,
        typicalOnset: "During dose escalation, typically with nausea",
        typicalResolution: "Usually resolves within a few days of each dose step",
        prevalencePercent: 12,
        placeboPercent: 2,
        notes: "5mg (8%), 10mg (11%), 15mg (12%). Contact provider if persistent.",
      },
      {
        symptom: "Decreased appetite",
        medianDurationDays: null,
        peakWeek: null,
        typicalOnset: "Often noticed within the first few weeks",
        typicalResolution: "Typically persists (this is part of the intended effect)",
        prevalencePercent: 11,
        placeboPercent: 1,
        notes: "Expected pharmacological effect. Ensure adequate protein intake (1.0-1.5g/kg/day) despite reduced appetite.",
      },
      {
        symptom: "Dyspepsia",
        medianDurationDays: null,
        peakWeek: null,
        typicalOnset: "During dose escalation",
        typicalResolution: "Usually improves after body adjusts to current dose",
        prevalencePercent: 8,
        placeboPercent: 3,
        notes: "Eating smaller meals and avoiding high-fat foods may help.",
      },
    ],
    generalNotes: "Side effects track closely with the dose escalation schedule. Each 2.5mg increase (at weeks 4, 8, 12, 16, 20) may trigger a new wave of mild symptoms that typically resolve within 3-7 days. Discontinuation due to GI events: 1-10.5% across SURMOUNT trials. Using a lower starting dose (2.5mg vs 4mg) partially mitigated GI side effects.",
    source: "Rubino et al. (2025) — GI tolerability of tirzepatide, SURMOUNT-1 to -4 pooled. Diabetes Obes Metab. + SURMOUNT-1 NEJM data.",
    sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11885085/",
    pmid: "39789843",
  },
  {
    slug: "liraglutide-saxenda",
    brandName: "Saxenda",
    genericName: "Liraglutide 3.0mg",
    totalDurationWeeks: 56,
    doseEscalationEndWeek: 5,
    symptoms: [
      {
        symptom: "Nausea",
        medianDurationDays: null,
        peakWeek: null,
        typicalOnset: "Within first 1-2 weeks of treatment or dose increase",
        typicalResolution: "Usually improves within a few weeks of reaching maintenance dose",
        prevalencePercent: 39,
        placeboPercent: 14,
        notes: "Most common side effect. Most common reason for discontinuation (2.9% vs 0.2% placebo).",
      },
      {
        symptom: "Diarrhea",
        medianDurationDays: null,
        peakWeek: null,
        typicalOnset: "During dose escalation (weeks 1-5)",
        typicalResolution: "Usually transient",
        prevalencePercent: 21,
        placeboPercent: 10,
        notes: "Ensure adequate hydration.",
      },
      {
        symptom: "Constipation",
        medianDurationDays: null,
        peakWeek: null,
        typicalOnset: "Can occur at any point",
        typicalResolution: "May persist; dietary management recommended",
        prevalencePercent: 19,
        placeboPercent: 8,
        notes: "Increase fiber and fluid intake.",
      },
      {
        symptom: "Vomiting",
        medianDurationDays: null,
        peakWeek: null,
        typicalOnset: "During dose escalation",
        typicalResolution: "Usually resolves after reaching stable dose",
        prevalencePercent: 16,
        placeboPercent: 4,
        notes: "Contact provider if persistent or severe.",
      },
      {
        symptom: "Headache",
        medianDurationDays: null,
        peakWeek: null,
        typicalOnset: "First few weeks",
        typicalResolution: "Usually resolves within first month",
        prevalencePercent: 14,
        placeboPercent: 10,
        notes: "Ensure adequate hydration and caloric intake.",
      },
    ],
    generalNotes: "Saxenda has a faster titration (5 weeks) than weekly injectables. Approximately 68% of patients reported GI disorders vs 39% placebo. If >3 days missed, must reinitiate at 0.6mg and re-titrate. Severe GI events: 4.8% (vs 1.4% placebo).",
    source: "Saxenda FDA Prescribing Information (2025) — SCALE trial data.",
    sourceUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/206321s020lbl.pdf",
    pmid: null,
  },
];

// ── Protein Calculator Data ──────────────────────────────────────────────
// Source: Joint advisory from ACLM, ASN, OMA, and Obesity Society (PMC12125019)
// + Endocrine Society ENDO 2025 data

export const proteinGuidelines = {
  source: "Joint advisory: ACLM, ASN, OMA, Obesity Society (2025)",
  sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12125019/",
  recommendations: {
    generalRange: { min: 1.0, max: 1.5, unit: "g/kg body weight/day" },
    absoluteTarget: { min: 80, max: 120, unit: "g/day" },
    perMeal: { min: 25, max: 40, unit: "g/meal" },
    olderAdults: { min: 1.2, max: 1.5, unit: "g/kg/day", note: "Higher end for adults >65 years" },
  },
  keyFacts: [
    { fact: "~40% of weight lost on semaglutide comes from lean mass", source: "Endocrine Society ENDO 2025" },
    { fact: "Resistance training 3x/week + adequate protein preserves muscle", source: "Joint advisory ACLM/ASN/OMA/TOS" },
    { fact: "Protein intake alone is likely inadequate without structured exercise", source: "Joint advisory ACLM/ASN/OMA/TOS" },
    { fact: "Aim for 150 min/week moderate aerobic exercise + strength training", source: "Joint advisory ACLM/ASN/OMA/TOS" },
  ],
};

// ── Post-Treatment Weight Data ───────────────────────────────────────────
// Source: STEP 1 Extension (PubMed 35441470)

export const postTreatmentData = {
  source: "Wilding et al. (2022) — Weight regain after semaglutide withdrawal. STEP 1 extension. Diabetes Obes Metab.",
  sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/35441470/",
  pmid: "35441470",
  participants: 327,
  treatmentPhase: {
    durationWeeks: 68,
    meanWeightLossPercent: 17.3,
    sdPercent: 9.3,
  },
  offTreatmentPhase: {
    durationWeeks: 52,
    meanWeightRegainPercentagePoints: 11.6,
    sdPercentagePoints: 7.7,
    placeboRegainPercentagePoints: 1.9,
  },
  netOutcome: {
    meanNetWeightLossPercent: 5.6,
    sdPercent: 8.9,
    percentMaintaining5PercentLoss: 48.2,
  },
  keyFindings: [
    "Participants regained two-thirds (67%) of their prior weight loss within 1 year of stopping semaglutide",
    "48.2% of participants still maintained clinically meaningful weight loss (≥5%) at week 120",
    "Cardiometabolic improvements reverted towards baseline after stopping",
    "A 2024 study found that tapering (vs abrupt stop) helped maintain stable body weight",
  ],
};
