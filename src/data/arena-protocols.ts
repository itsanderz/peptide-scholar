/**
 * Seed protocols for the arena benchmark (P7 design pilot).
 *
 * These are deliberately conservative, source-backed framings — not prescriptions.
 * Pairwise voting collects preference signal per goal; we do not claim any
 * protocol is medically superior.
 *
 * Adding new protocols: give each a stable slug (never reused), a `goals` set,
 * and one citation-worthy source.
 */

export type ArenaGoal =
  | "glp1-weight-loss"
  | "glp1-gi-tolerance"
  | "sleep-recovery"
  | "injury-recovery"
  | "longevity-general";

export interface ArenaProtocol {
  slug: string;
  title: string;
  compound: string;
  summary: string;
  frameSentence: string;
  goals: ArenaGoal[];
  sourceTitle: string;
  sourceUrl: string;
}

export const ARENA_GOALS: { slug: ArenaGoal; label: string; blurb: string }[] = [
  {
    slug: "glp1-weight-loss",
    label: "GLP-1 weight loss",
    blurb: "Framing trade-offs for sustainable weight loss on GLP-1 therapy.",
  },
  {
    slug: "glp1-gi-tolerance",
    label: "GLP-1 GI tolerance",
    blurb: "Reducing nausea, constipation, and GI friction on semaglutide or tirzepatide.",
  },
  {
    slug: "sleep-recovery",
    label: "Sleep & recovery",
    blurb: "Peptide-adjacent strategies for deeper sleep and faster overnight recovery.",
  },
  {
    slug: "injury-recovery",
    label: "Injury recovery",
    blurb: "Soft-tissue and tendon recovery framings (research-use peptides included).",
  },
  {
    slug: "longevity-general",
    label: "Longevity (general)",
    blurb: "General healthspan framings with meaningful evidence bases.",
  },
];

export const ARENA_PROTOCOLS: ArenaProtocol[] = [
  {
    slug: "semaglutide-slow-titration",
    title: "Slow titration semaglutide",
    compound: "semaglutide",
    summary:
      "Step up one dose level every 4 weeks minimum; only escalate once the current dose is tolerated with stable appetite response.",
    frameSentence:
      "Prioritizes tolerance and adherence over fastest-possible dose escalation.",
    goals: ["glp1-weight-loss", "glp1-gi-tolerance"],
    sourceTitle: "FDA Wegovy prescribing information",
    sourceUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/215256s000lbl.pdf",
  },
  {
    slug: "tirzepatide-standard-escalation",
    title: "Standard tirzepatide escalation",
    compound: "tirzepatide",
    summary:
      "2.5mg / 5mg / 7.5mg / 10mg / 12.5mg / 15mg, stepping every 4 weeks per FDA label; maintenance at the lowest dose that holds weight.",
    frameSentence:
      "Follows the FDA label exactly rather than adjusting for individual tolerance.",
    goals: ["glp1-weight-loss"],
    sourceTitle: "FDA Zepbound prescribing information",
    sourceUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/217806s000lbl.pdf",
  },
  {
    slug: "tirzepatide-microdose-hold",
    title: "Microdose hold (tirzepatide)",
    compound: "tirzepatide",
    summary:
      "Hold at 2.5mg or 5mg longer than standard if GI side effects are heavy; only escalate after 8+ weeks tolerance at current dose.",
    frameSentence:
      "Trades slower loss for lower GI burden and higher adherence.",
    goals: ["glp1-gi-tolerance"],
    sourceTitle: "AACE 2023 GLP-1 consensus statement",
    sourceUrl:
      "https://www.endocrinepractice.org/article/S1530-891X(22)00576-X/fulltext",
  },
  {
    slug: "semaglutide-fiber-forward",
    title: "Fiber-forward GI protocol (semaglutide)",
    compound: "semaglutide",
    summary:
      "Layer 25–35g daily fiber (mostly soluble), 2.5–3L water, and split large meals in half during the first 2 weeks of each dose step.",
    frameSentence:
      "Uses nutrition and hydration to blunt GI side effects rather than dose holds.",
    goals: ["glp1-gi-tolerance"],
    sourceTitle: "Obesity Medicine Association GLP-1 nutrition guidance",
    sourceUrl: "https://obesitymedicine.org/resources/position-statements/",
  },
  {
    slug: "bpc157-soft-tissue-cycle",
    title: "BPC-157 soft-tissue cycle (research)",
    compound: "BPC-157",
    summary:
      "Short research-use cycles targeted at a specific injury window; off-cycle rest at least equal to on-cycle length. Strict research-context framing only.",
    frameSentence:
      "Time-bounded research cycles rather than continuous administration.",
    goals: ["injury-recovery"],
    sourceTitle: "PubMed BPC-157 review",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157",
  },
  {
    slug: "tb500-focal-recovery",
    title: "TB-500 focal recovery (research)",
    compound: "TB-500",
    summary:
      "Narrow-window research-use protocol focused on a single soft-tissue injury; discontinue once recovery plateaus.",
    frameSentence:
      "Single-injury focus rather than general anti-aging framing.",
    goals: ["injury-recovery"],
    sourceTitle: "PubMed Thymosin Beta-4 review",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=Thymosin+Beta-4",
  },
  {
    slug: "ipamorelin-sleep-window",
    title: "Ipamorelin pre-sleep window (research)",
    compound: "ipamorelin",
    summary:
      "Research framing that concentrates administration late-evening to align with the natural GH pulse, rather than splitting dosing across the day.",
    frameSentence:
      "Timing-based research framing aligned with the endogenous GH rhythm.",
    goals: ["sleep-recovery"],
    sourceTitle: "PubMed ipamorelin pharmacokinetics",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/?term=ipamorelin",
  },
  {
    slug: "longevity-lifestyle-foundations",
    title: "Lifestyle-first longevity stack",
    compound: "(non-peptide)",
    summary:
      "Strength training 2–3x/wk, zone-2 cardio 150+ min/wk, 7–9h sleep, protein 1.6g/kg, nightly 12h fasting window — before any compound.",
    frameSentence:
      "Baseline lifestyle stack that any peptide protocol should build on top of, not replace.",
    goals: ["longevity-general", "sleep-recovery"],
    sourceTitle: "CDC physical activity guidelines",
    sourceUrl: "https://www.cdc.gov/physicalactivity/basics/adults/index.htm",
  },
  {
    slug: "nad-precursor-baseline",
    title: "NAD precursor baseline",
    compound: "NAD+ precursors",
    summary:
      "Daily NR or NMN at studied dose ranges as a low-risk longevity baseline, combined with weekly bloodwork every 90 days.",
    frameSentence:
      "Low-risk daily baseline with bloodwork-driven reassessment cadence.",
    goals: ["longevity-general"],
    sourceTitle: "NIH ODS Nicotinamide factsheet",
    sourceUrl: "https://ods.od.nih.gov/factsheets/VitaminB3-HealthProfessional/",
  },
];

export function getProtocolsForGoal(goal: ArenaGoal): ArenaProtocol[] {
  return ARENA_PROTOCOLS.filter((p) => p.goals.includes(goal));
}

export function findProtocol(slug: string): ArenaProtocol | undefined {
  return ARENA_PROTOCOLS.find((p) => p.slug === slug);
}
