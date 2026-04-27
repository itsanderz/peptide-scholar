/**
 * Verified clinical data from FDA prescribing labels and published trials.
 * Sources cited inline. Last verified: 2026-03-24.
 *
 * DO NOT modify these numbers without re-verifying against primary sources.
 */

// ── Titration Schedules ──────────────────────────────────────────────────
// Source: FDA prescribing information for each drug

export interface TitrationStep {
  week: number; // start week (1-indexed)
  durationWeeks: number;
  doseMg: number;
  frequency: string;
  isMaintenanceDose: boolean;
}

export interface TitrationSchedule {
  slug: string;
  brandName: string;
  genericName: string;
  indication: string;
  route: string;
  maxDoseMg: number;
  steps: TitrationStep[];
  source: string;
  sourceUrl: string;
  notes: string;
}

export const titrationSchedules: TitrationSchedule[] = [
  {
    slug: "semaglutide-wegovy",
    brandName: "Wegovy",
    genericName: "Semaglutide",
    indication: "Chronic weight management",
    route: "Subcutaneous injection",
    maxDoseMg: 2.4,
    steps: [
      { week: 1, durationWeeks: 4, doseMg: 0.25, frequency: "Once weekly", isMaintenanceDose: false },
      { week: 5, durationWeeks: 4, doseMg: 0.5, frequency: "Once weekly", isMaintenanceDose: false },
      { week: 9, durationWeeks: 4, doseMg: 1.0, frequency: "Once weekly", isMaintenanceDose: false },
      { week: 13, durationWeeks: 4, doseMg: 1.7, frequency: "Once weekly", isMaintenanceDose: true },
      { week: 17, durationWeeks: 0, doseMg: 2.4, frequency: "Once weekly", isMaintenanceDose: true },
    ],
    source: "Wegovy FDA Prescribing Information (2025)",
    sourceUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
    notes: "If unable to tolerate dose escalation, may extend current dose by 4 additional weeks before increasing.",
  },
  {
    slug: "semaglutide-ozempic",
    brandName: "Ozempic",
    genericName: "Semaglutide",
    indication: "Type 2 diabetes",
    route: "Subcutaneous injection",
    maxDoseMg: 2.0,
    steps: [
      { week: 1, durationWeeks: 4, doseMg: 0.25, frequency: "Once weekly", isMaintenanceDose: false },
      { week: 5, durationWeeks: 4, doseMg: 0.5, frequency: "Once weekly", isMaintenanceDose: true },
      { week: 9, durationWeeks: 4, doseMg: 1.0, frequency: "Once weekly", isMaintenanceDose: true },
      { week: 13, durationWeeks: 0, doseMg: 2.0, frequency: "Once weekly", isMaintenanceDose: true },
    ],
    source: "Ozempic FDA Prescribing Information",
    sourceUrl: "https://www.novo-pi.com/ozempic.pdf",
    notes: "Maintenance doses are 0.5mg, 1mg, or 2mg depending on glycemic response.",
  },
  {
    slug: "tirzepatide-zepbound",
    brandName: "Zepbound",
    genericName: "Tirzepatide",
    indication: "Chronic weight management",
    route: "Subcutaneous injection",
    maxDoseMg: 15,
    steps: [
      { week: 1, durationWeeks: 4, doseMg: 2.5, frequency: "Once weekly", isMaintenanceDose: false },
      { week: 5, durationWeeks: 4, doseMg: 5, frequency: "Once weekly", isMaintenanceDose: true },
      { week: 9, durationWeeks: 4, doseMg: 7.5, frequency: "Once weekly", isMaintenanceDose: false },
      { week: 13, durationWeeks: 4, doseMg: 10, frequency: "Once weekly", isMaintenanceDose: true },
      { week: 17, durationWeeks: 4, doseMg: 12.5, frequency: "Once weekly", isMaintenanceDose: false },
      { week: 21, durationWeeks: 0, doseMg: 15, frequency: "Once weekly", isMaintenanceDose: true },
    ],
    source: "Zepbound FDA Prescribing Information (2025)",
    sourceUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s031lbl.pdf",
    notes: "Maintenance doses are 5mg, 10mg, or 15mg. The 2.5mg, 7.5mg, and 12.5mg are transitional only.",
  },
  {
    slug: "tirzepatide-mounjaro",
    brandName: "Mounjaro",
    genericName: "Tirzepatide",
    indication: "Type 2 diabetes",
    route: "Subcutaneous injection",
    maxDoseMg: 15,
    steps: [
      { week: 1, durationWeeks: 4, doseMg: 2.5, frequency: "Once weekly", isMaintenanceDose: false },
      { week: 5, durationWeeks: 4, doseMg: 5, frequency: "Once weekly", isMaintenanceDose: true },
      { week: 9, durationWeeks: 4, doseMg: 7.5, frequency: "Once weekly", isMaintenanceDose: false },
      { week: 13, durationWeeks: 4, doseMg: 10, frequency: "Once weekly", isMaintenanceDose: true },
      { week: 17, durationWeeks: 4, doseMg: 12.5, frequency: "Once weekly", isMaintenanceDose: false },
      { week: 21, durationWeeks: 0, doseMg: 15, frequency: "Once weekly", isMaintenanceDose: true },
    ],
    source: "Mounjaro FDA Prescribing Information (2025)",
    sourceUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215866s039lbl.pdf",
    notes: "Maintenance doses are 5mg, 10mg, or 15mg.",
  },
  {
    slug: "liraglutide-saxenda",
    brandName: "Saxenda",
    genericName: "Liraglutide",
    indication: "Chronic weight management",
    route: "Subcutaneous injection",
    maxDoseMg: 3.0,
    steps: [
      { week: 1, durationWeeks: 1, doseMg: 0.6, frequency: "Once daily", isMaintenanceDose: false },
      { week: 2, durationWeeks: 1, doseMg: 1.2, frequency: "Once daily", isMaintenanceDose: false },
      { week: 3, durationWeeks: 1, doseMg: 1.8, frequency: "Once daily", isMaintenanceDose: false },
      { week: 4, durationWeeks: 1, doseMg: 2.4, frequency: "Once daily", isMaintenanceDose: false },
      { week: 5, durationWeeks: 0, doseMg: 3.0, frequency: "Once daily", isMaintenanceDose: true },
    ],
    source: "Saxenda FDA Prescribing Information (2025)",
    sourceUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/206321s020lbl.pdf",
    notes: "If >3 days missed, reinitiate at 0.6mg and re-titrate. Daily injection (not weekly).",
  },
];

// ── Side Effect Data ─────────────────────────────────────────────────────
// Sources: FDA prescribing labels, pooled STEP/SURMOUNT/SCALE trial data

export interface SideEffectEntry {
  name: string;
  drugPercent: number;
  placeboPercent: number;
}

export interface SideEffectProfile {
  slug: string;
  brandName: string;
  genericName: string;
  dose: string;
  trialName: string;
  sideEffects: SideEffectEntry[];
  discontinuationRate: { drug: number; placebo: number };
  source: string;
  sourceUrl: string;
}

export const sideEffectProfiles: SideEffectProfile[] = [
  {
    slug: "semaglutide-wegovy",
    brandName: "Wegovy",
    genericName: "Semaglutide 2.4mg",
    dose: "2.4mg weekly",
    trialName: "STEP 1-3 (pooled)",
    sideEffects: [
      { name: "Nausea", drugPercent: 44, placeboPercent: 16 },
      { name: "Diarrhea", drugPercent: 30, placeboPercent: 16 },
      { name: "Vomiting", drugPercent: 24, placeboPercent: 6 },
      { name: "Constipation", drugPercent: 24, placeboPercent: 11 },
      { name: "Abdominal pain", drugPercent: 20, placeboPercent: 10 },
      { name: "Headache", drugPercent: 16, placeboPercent: 12 },
      { name: "Fatigue", drugPercent: 11, placeboPercent: 8 },
      { name: "Dyspepsia", drugPercent: 9, placeboPercent: 5 },
      { name: "Dizziness", drugPercent: 8, placeboPercent: 6 },
      { name: "Abdominal distension", drugPercent: 7, placeboPercent: 4 },
      { name: "Eructation", drugPercent: 5, placeboPercent: 2 },
      { name: "Hypoglycemia", drugPercent: 4, placeboPercent: 2 },
    ],
    discontinuationRate: { drug: 6.8, placebo: 3.2 },
    source: "Wegovy FDA Prescribing Information, Table 3 — Pooled STEP 1, 3, 4 data (adverse events ≥2% and greater than placebo)",
    sourceUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
  },
  {
    slug: "tirzepatide-5mg",
    brandName: "Mounjaro / Zepbound",
    genericName: "Tirzepatide 5mg",
    dose: "5mg weekly",
    trialName: "SURMOUNT-1 (obesity)",
    sideEffects: [
      { name: "Nausea", drugPercent: 25, placeboPercent: 10 },
      { name: "Diarrhea", drugPercent: 19, placeboPercent: 7 },
      { name: "Constipation", drugPercent: 17, placeboPercent: 6 },
      { name: "Vomiting", drugPercent: 8, placeboPercent: 2 },
      { name: "Decreased appetite", drugPercent: 8, placeboPercent: 1 },
      { name: "Dyspepsia", drugPercent: 6, placeboPercent: 3 },
      { name: "Abdominal pain", drugPercent: 5, placeboPercent: 4 },
    ],
    discontinuationRate: { drug: 4.3, placebo: 2.6 },
    source: "Zepbound FDA Prescribing Information, Table 3 — SURMOUNT-1 data (adverse events ≥2% and greater than placebo)",
    sourceUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/21844s001lbl.pdf",
  },
  {
    slug: "tirzepatide-10mg",
    brandName: "Mounjaro / Zepbound",
    genericName: "Tirzepatide 10mg",
    dose: "10mg weekly",
    trialName: "SURMOUNT-1 (obesity)",
    sideEffects: [
      { name: "Nausea", drugPercent: 33, placeboPercent: 10 },
      { name: "Diarrhea", drugPercent: 21, placeboPercent: 7 },
      { name: "Constipation", drugPercent: 17, placeboPercent: 6 },
      { name: "Vomiting", drugPercent: 11, placeboPercent: 2 },
      { name: "Decreased appetite", drugPercent: 11, placeboPercent: 1 },
      { name: "Dyspepsia", drugPercent: 8, placeboPercent: 3 },
      { name: "Abdominal pain", drugPercent: 5, placeboPercent: 4 },
    ],
    discontinuationRate: { drug: 7.1, placebo: 2.6 },
    source: "Zepbound FDA Prescribing Information, Table 3 — SURMOUNT-1 data (adverse events ≥2% and greater than placebo)",
    sourceUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/21844s001lbl.pdf",
  },
  {
    slug: "tirzepatide-15mg",
    brandName: "Mounjaro / Zepbound",
    genericName: "Tirzepatide 15mg",
    dose: "15mg weekly",
    trialName: "SURMOUNT-1 (obesity)",
    sideEffects: [
      { name: "Nausea", drugPercent: 31, placeboPercent: 10 },
      { name: "Diarrhea", drugPercent: 23, placeboPercent: 7 },
      { name: "Constipation", drugPercent: 12, placeboPercent: 6 },
      { name: "Vomiting", drugPercent: 12, placeboPercent: 2 },
      { name: "Decreased appetite", drugPercent: 11, placeboPercent: 1 },
      { name: "Dyspepsia", drugPercent: 8, placeboPercent: 3 },
      { name: "Abdominal pain", drugPercent: 5, placeboPercent: 4 },
    ],
    discontinuationRate: { drug: 6.2, placebo: 2.6 },
    source: "Zepbound FDA Prescribing Information, Table 3 — SURMOUNT-1 data (adverse events ≥2% and greater than placebo)",
    sourceUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/21844s001lbl.pdf",
  },
  {
    slug: "liraglutide-saxenda",
    brandName: "Saxenda",
    genericName: "Liraglutide 3.0mg",
    dose: "3.0mg daily",
    trialName: "SCALE (pooled)",
    sideEffects: [
      { name: "Nausea", drugPercent: 39, placeboPercent: 14 },
      { name: "Diarrhea", drugPercent: 21, placeboPercent: 10 },
      { name: "Vomiting", drugPercent: 16, placeboPercent: 4 },
      { name: "Constipation", drugPercent: 19, placeboPercent: 8 },
      { name: "Headache", drugPercent: 14, placeboPercent: 10 },
      { name: "Dyspepsia", drugPercent: 10, placeboPercent: 4 },
      { name: "Fatigue", drugPercent: 8, placeboPercent: 4 },
      { name: "Dizziness", drugPercent: 7, placeboPercent: 5 },
      { name: "Abdominal pain", drugPercent: 5, placeboPercent: 4 },
    ],
    discontinuationRate: { drug: 9.8, placebo: 3.8 },
    source: "Saxenda FDA Label — SCALE trial data",
    sourceUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/206321s020lbl.pdf",
  },
];

// ── Cost Data ────────────────────────────────────────────────────────────
// Sources: Manufacturer list prices, GoodRx, LillyDirect. Verified March 2026.

export interface CostEntry {
  slug: string;
  brandName: string;
  genericName: string;
  frequency: string;
  listPriceMonthly: number;
  withInsuranceLow: number;
  withInsuranceHigh: number;
  discountProgramPrice: number | null;
  discountProgramName: string | null;
  compoundedLow: number | null;
  compoundedHigh: number | null;
  lastVerified: string;
  source: string;
}

export const costData: CostEntry[] = [
  {
    slug: "semaglutide-wegovy",
    brandName: "Wegovy (injection)",
    genericName: "Semaglutide",
    frequency: "Weekly injection",
    listPriceMonthly: 1350,
    withInsuranceLow: 25,
    withInsuranceHigh: 500,
    discountProgramPrice: 199,
    discountProgramName: "GoodRx introductory price",
    compoundedLow: null,
    compoundedHigh: null,
    lastVerified: "2026-03-24",
    source: "GoodRx, Novo Nordisk",
  },
  {
    slug: "semaglutide-ozempic",
    brandName: "Ozempic",
    genericName: "Semaglutide",
    frequency: "Weekly injection",
    listPriceMonthly: 1028,
    withInsuranceLow: 25,
    withInsuranceHigh: 300,
    discountProgramPrice: 199,
    discountProgramName: "GoodRx introductory price",
    compoundedLow: null,
    compoundedHigh: null,
    lastVerified: "2026-03-24",
    source: "GoodRx, Novo Nordisk",
  },
  {
    slug: "tirzepatide-zepbound",
    brandName: "Zepbound",
    genericName: "Tirzepatide",
    frequency: "Weekly injection",
    listPriceMonthly: 1086,
    withInsuranceLow: 25,
    withInsuranceHigh: 500,
    discountProgramPrice: 299,
    discountProgramName: "LillyDirect self-pay",
    compoundedLow: 349,
    compoundedHigh: 699,
    lastVerified: "2026-03-24",
    source: "Eli Lilly, LillyDirect",
  },
  {
    slug: "tirzepatide-mounjaro",
    brandName: "Mounjaro",
    genericName: "Tirzepatide",
    frequency: "Weekly injection",
    listPriceMonthly: 1080,
    withInsuranceLow: 25,
    withInsuranceHigh: 500,
    discountProgramPrice: 299,
    discountProgramName: "LillyDirect self-pay",
    compoundedLow: 349,
    compoundedHigh: 699,
    lastVerified: "2026-03-24",
    source: "Eli Lilly, LillyDirect",
  },
  {
    slug: "liraglutide-saxenda",
    brandName: "Saxenda",
    genericName: "Liraglutide",
    frequency: "Daily injection",
    listPriceMonthly: 1430,
    withInsuranceLow: 25,
    withInsuranceHigh: 500,
    discountProgramPrice: null,
    discountProgramName: null,
    compoundedLow: null,
    compoundedHigh: null,
    lastVerified: "2026-03-24",
    source: "Novo Nordisk",
  },
];

// ── Interaction Data ─────────────────────────────────────────────────────
// Evidence level: "established" = documented in literature
//                 "theoretical" = mechanism-based concern, not studied
//                 "none-known" = no known interaction

export type InteractionSeverity = "avoid" | "caution" | "monitor" | "likely-safe" | "no-data";

export interface PeptideInteraction {
  peptideA: string;
  peptideB: string;
  severity: InteractionSeverity;
  evidence: "established" | "theoretical" | "none-known";
  description: string;
  recommendation: string;
  source: string;
}

export const peptideInteractions: PeptideInteraction[] = [
  // GLP-1 + GLP-1 combinations
  {
    peptideA: "Semaglutide",
    peptideB: "Tirzepatide",
    severity: "avoid",
    evidence: "established",
    description: "Both are GLP-1 receptor agonists. Combining increases risk of severe GI adverse events and hypoglycemia.",
    recommendation: "Do not combine. Switch between these medications under physician supervision with appropriate washout period.",
    source: "FDA prescribing labels for Wegovy and Zepbound both contraindicate concurrent GLP-1 RA use",
  },
  {
    peptideA: "Semaglutide",
    peptideB: "Liraglutide",
    severity: "avoid",
    evidence: "established",
    description: "Both are GLP-1 receptor agonists. Concurrent use has not been studied and is not recommended.",
    recommendation: "Do not combine. The FDA label for both medications states they should not be used with other GLP-1 receptor agonists.",
    source: "Wegovy and Saxenda FDA prescribing information",
  },
  {
    peptideA: "Tirzepatide",
    peptideB: "Liraglutide",
    severity: "avoid",
    evidence: "established",
    description: "Tirzepatide includes GLP-1 receptor agonism. Combining with another GLP-1 RA is contraindicated.",
    recommendation: "Do not combine.",
    source: "Mounjaro/Zepbound FDA prescribing information",
  },
  // GLP-1 + non-GLP-1 (common questions)
  {
    peptideA: "Semaglutide",
    peptideB: "BPC-157",
    severity: "no-data",
    evidence: "none-known",
    description: "No clinical studies have evaluated this combination. BPC-157 is not FDA-approved and has limited human data.",
    recommendation: "No interaction data exists. BPC-157 is a research peptide without FDA approval. Consult your healthcare provider.",
    source: "No published interaction studies exist",
  },
  {
    peptideA: "Tirzepatide",
    peptideB: "BPC-157",
    severity: "no-data",
    evidence: "none-known",
    description: "No clinical studies have evaluated this combination. BPC-157 is not FDA-approved.",
    recommendation: "No interaction data exists. Consult your healthcare provider before combining any medications.",
    source: "No published interaction studies exist",
  },
  {
    peptideA: "Semaglutide",
    peptideB: "TB-500",
    severity: "no-data",
    evidence: "none-known",
    description: "No clinical studies exist for this combination. TB-500 (Thymosin Beta-4) is not FDA-approved.",
    recommendation: "No interaction data exists. Consult your healthcare provider.",
    source: "No published interaction studies exist",
  },
  {
    peptideA: "BPC-157",
    peptideB: "TB-500",
    severity: "no-data",
    evidence: "none-known",
    description: "Commonly discussed together in online communities but no published clinical data on this combination exists.",
    recommendation: "Neither peptide is FDA-approved. No safety data exists for this combination. Consult a healthcare provider.",
    source: "No published interaction studies exist",
  },
  {
    peptideA: "Ipamorelin",
    peptideB: "CJC-1295",
    severity: "no-data",
    evidence: "theoretical",
    description: "Often discussed together as a GH-releasing stack. Both stimulate growth hormone through different mechanisms (GHRP + GHRH analog). No published clinical trial data on the combination.",
    recommendation: "Neither is FDA-approved. While the theoretical mechanism suggests complementary action, no safety data for the combination has been published. Consult a healthcare provider.",
    source: "Theoretical — based on individual mechanisms of action",
  },
  // GLP-1 drug interactions from FDA labels
  {
    peptideA: "Semaglutide",
    peptideB: "Insulin",
    severity: "caution",
    evidence: "established",
    description: "Combining semaglutide with insulin increases risk of hypoglycemia. Documented in FDA label.",
    recommendation: "Dose reduction of insulin may be necessary. Monitor blood glucose closely when initiating or adjusting semaglutide.",
    source: "Wegovy/Ozempic FDA prescribing information — Drug Interactions section",
  },
  {
    peptideA: "Tirzepatide",
    peptideB: "Insulin",
    severity: "caution",
    evidence: "established",
    description: "Combining tirzepatide with insulin increases risk of hypoglycemia. Documented in FDA label.",
    recommendation: "Consider reducing insulin dose when initiating tirzepatide. Monitor blood glucose.",
    source: "Mounjaro/Zepbound FDA prescribing information — Drug Interactions section",
  },
  {
    peptideA: "Semaglutide",
    peptideB: "Oral contraceptives",
    severity: "monitor",
    evidence: "established",
    description: "GLP-1 agonists delay gastric emptying which may reduce absorption of oral medications. The clinical significance with oral contraceptives specifically has not been established.",
    recommendation: "Consider timing of oral contraceptive relative to semaglutide injection. Use backup contraception if concerned.",
    source: "Wegovy FDA prescribing information — Drug Interactions section",
  },
];
