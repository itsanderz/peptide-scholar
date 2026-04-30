/**
 * Treatment comparison deep dives — rich head-to-head analyses leveraging
 * enriched treatment data for high-commercial-intent queries.
 */

export interface TreatmentComparison {
  slug: string;
  title: string;
  subtitle: string;
  treatments: string[]; // slugs from treatment-enrichment
  summary: string;
  verdict: {
    [key: string]: string | undefined;
    explanation: string;
  };
  dimensionComparisons: {
    dimension: string;
    rows: { treatmentSlug: string; value: string; highlight?: boolean }[];
    winner?: string;
    notes?: string;
  }[];
  costComparison: {
    rows: { treatmentSlug: string; listPrice: string; withSavingsCard: string; insuranceCoverage: string }[];
  };
  sideEffectComparison: {
    rows: { treatmentSlug: string; mostCommon: string; discontinuationRate: string; uniqueRisks: string }[];
  };
  evidenceSummary: {
    rows: { treatmentSlug: string; keyTrial: string; n: string; primaryOutcome: string; result: string; pmid?: string }[];
  };
  patientSelectionGuide: {
    idealFor: { treatmentSlug: string; candidates: string[] }[];
    avoidIf: { treatmentSlug: string; contraindications: string[] }[];
  };
  dosingConvenience: {
    rows: { treatmentSlug: string; frequency: string; route: string; titrationComplexity: string; injectionDevice: string }[];
  };
  reviewerId: string;
  lastReviewed: string;
  wordCount: number;
}

export const treatmentComparisons: Record<string, TreatmentComparison> = {
  "glp1-weight-loss-showdown": {
    slug: "glp1-weight-loss-showdown",
    title: "Semaglutide vs Tirzepatide vs Liraglutide",
    subtitle: "The complete evidence-based comparison for weight loss and type 2 diabetes",
    treatments: ["semaglutide", "tirzepatide", "liraglutide"],
    summary:
      "Tirzepatide produces the greatest weight loss (20.9% in SURMOUNT-1), followed by semaglutide (14.9% in STEP 1), then liraglutide (8.0% in SCALE). Semaglutide has the most mature cardiovascular outcome data (SELECT trial). Liraglutide is the only one with a daily injection and is being largely supplanted by weekly options. Tirzepatide has the best GI tolerability profile despite superior efficacy. For patients seeking maximum weight loss, tirzepatide is the clear choice. For those with established cardiovascular disease, semaglutide has the strongest evidence. Liraglutide remains a fallback for patients who cannot access or tolerate the newer agents.",
    verdict: {
      bestForWeightLoss: "Tirzepatide (Zepbound)",
      bestForDiabetes: "Tirzepatide (Mounjaro) or semaglutide (Ozempic)",
      bestTolerated: "Tirzepatide (lowest nausea rate)",
      bestValue: "Liraglutide (more savings programs; generic expected late 2020s)",
      bestForBeginners: "Semaglutide (most experience, established protocols)",
      overallWinner: "Tirzepatide for efficacy; semaglutide for cardiovascular risk reduction",
      explanation:
        "Tirzepatide wins on pure efficacy and tolerability. Its dual GIP/GLP-1 mechanism produces 6-7 percentage points more weight loss than semaglutide with lower GI side effects. However, semaglutide has 4-year cardiovascular outcome data (SELECT) that tirzepatide lacks. For a patient with obesity and established CVD, semaglutide may be preferred despite lower efficacy. Liraglutide is now third-line due to inferior efficacy and daily injection burden, though it remains effective and may become the cheapest option when generic arrives.",
    },
    dimensionComparisons: [
      {
        dimension: "Weight loss efficacy (obesity trials)",
        rows: [
          { treatmentSlug: "tirzepatide", value: "20.9% mean (SURMOUNT-1, 15 mg)", highlight: true },
          { treatmentSlug: "semaglutide", value: "14.9% mean (STEP 1, 2.4 mg)" },
          { treatmentSlug: "liraglutide", value: "8.0% mean (SCALE, 3.0 mg)" },
        ],
        winner: "tirzepatide",
        notes: "SURMOUNT-5 head-to-head confirmed tirzepatide superiority by 6.5 percentage points",
      },
      {
        dimension: "Glycemic control (HbA1c reduction)",
        rows: [
          { treatmentSlug: "tirzepatide", value: "-2.1% (SURPASS-2, 15 mg)", highlight: true },
          { treatmentSlug: "semaglutide", value: "-1.8% (SUSTAIN-2, 1.0 mg)" },
          { treatmentSlug: "liraglutide", value: "-1.1% (LEAD-2, 1.8 mg)" },
        ],
        winner: "tirzepatide",
      },
      {
        dimension: "Cardiovascular outcomes",
        rows: [
          { treatmentSlug: "semaglutide", value: "20% MACE reduction (SELECT, 4-year data)", highlight: true },
          { treatmentSlug: "tirzepatide", value: "SURMOUNT-MMO ongoing; limited CV data" },
          { treatmentSlug: "liraglutide", value: "13% MACE reduction (LEADER, 3.8-year data)" },
        ],
        winner: "semaglutide",
        notes: "Semaglutide has the most mature CV outcome data in non-diabetic obese patients",
      },
      {
        dimension: "Nausea incidence",
        rows: [
          { treatmentSlug: "tirzepatide", value: "33% (SURMOUNT-1)", highlight: true },
          { treatmentSlug: "semaglutide", value: "44% (STEP 1)" },
          { treatmentSlug: "liraglutide", value: "39% (SCALE)" },
        ],
        winner: "tirzepatide",
        notes: "Lower nausea despite higher efficacy suggests GIP co-activation may modulate GI tolerance",
      },
      {
        dimension: "Dosing frequency",
        rows: [
          { treatmentSlug: "tirzepatide", value: "Once weekly", highlight: true },
          { treatmentSlug: "semaglutide", value: "Once weekly" },
          { treatmentSlug: "liraglutide", value: "Once daily" },
        ],
        winner: "tirzepatide / semaglutide (tie)",
      },
      {
        dimension: "Time to target dose",
        rows: [
          { treatmentSlug: "liraglutide", value: "5 weeks (0.6→3.0 mg)", highlight: true },
          { treatmentSlug: "semaglutide", value: "16 weeks (0.25→2.4 mg)" },
          { treatmentSlug: "tirzepatide", value: "20 weeks (2.5→15 mg)" },
        ],
        winner: "liraglutide",
        notes: "Faster titration but daily injections offset this advantage",
      },
      {
        dimension: "Insurance coverage (obesity)",
        rows: [
          { treatmentSlug: "semaglutide", value: "~40-50% (Wegovy)" },
          { treatmentSlug: "tirzepatide", value: "~35-45% (Zepbound)" },
          { treatmentSlug: "liraglutide", value: "~40-50% (Saxenda)" },
        ],
        winner: "tie",
        notes: "All three have poor obesity coverage; T2D coverage is much better (80-90%)",
      },
    ],
    costComparison: {
      rows: [
        { treatmentSlug: "tirzepatide", listPrice: "$1,060-$1,300/month", withSavingsCard: "$550/month (Zepbound)", insuranceCoverage: "~35-45% obesity; ~75-85% T2D" },
        { treatmentSlug: "semaglutide", listPrice: "$1,349/month (Wegovy)", withSavingsCard: "$0-$225/month", insuranceCoverage: "~40-50% obesity; ~80-90% T2D" },
        { treatmentSlug: "liraglutide", listPrice: "$1,349/month (Saxenda)", withSavingsCard: "$200-$500/month", insuranceCoverage: "~40-50% obesity; ~80-90% T2D" },
      ],
    },
    sideEffectComparison: {
      rows: [
        { treatmentSlug: "tirzepatide", mostCommon: "Nausea 33%, diarrhea 20%, vomiting 13%", discontinuationRate: "~5-7%", uniqueRisks: "Limited long-term data; CV outcomes pending" },
        { treatmentSlug: "semaglutide", mostCommon: "Nausea 44%, diarrhea 30%, vomiting 24%", discontinuationRate: "~7-10%", uniqueRisks: "Gallbladder disease 2-3%; ileus (post-marketing)" },
        { treatmentSlug: "liraglutide", mostCommon: "Nausea 39%, diarrhea 21%, vomiting 15%", discontinuationRate: "~8-10%", uniqueRisks: "Daily injection burden reduces adherence over time" },
      ],
    },
    evidenceSummary: {
      rows: [
        { treatmentSlug: "tirzepatide", keyTrial: "SURMOUNT-1", n: "2,539", primaryOutcome: "Weight loss at 72 weeks", result: "20.9% mean (15 mg)", pmid: "35658024" },
        { treatmentSlug: "tirzepatide", keyTrial: "SURMOUNT-5 (vs sema)", n: "751", primaryOutcome: "Superiority in weight change", result: "-20.2% vs -13.7% (p<0.001)", pmid: "40353578" },
        { treatmentSlug: "semaglutide", keyTrial: "STEP 1", n: "1,961", primaryOutcome: "Weight loss at 68 weeks", result: "14.9% mean", pmid: "33567185" },
        { treatmentSlug: "semaglutide", keyTrial: "SELECT", n: "17,604", primaryOutcome: "MACE in non-diabetics", result: "20% reduction (p<0.001)", pmid: "37952131" },
        { treatmentSlug: "liraglutide", keyTrial: "SCALE", n: "3,731", primaryOutcome: "Weight loss at 56 weeks", result: "8.0% mean", pmid: "26132939" },
        { treatmentSlug: "liraglutide", keyTrial: "LEADER", n: "9,340", primaryOutcome: "MACE in T2D", result: "13% reduction (p=0.01)", pmid: "27295427" },
      ],
    },
    patientSelectionGuide: {
      idealFor: [
        { treatmentSlug: "tirzepatide", candidates: ["Patients seeking maximum weight loss", "T2D patients needing glycemic control", "Those intolerant to semaglutide's GI effects", "No established CVD (CV data still maturing)"] },
        { treatmentSlug: "semaglutide", candidates: ["Patients with obesity + established CVD (SELECT indication)", "Those wanting most clinical experience", "Patients preferring weekly dosing", "T2D patients needing proven CV benefit"] },
        { treatmentSlug: "liraglutide", candidates: ["Patients needing faster titration", "Those with insurance that covers liraglutide but not newer options", "Patients who prefer daily routine", "Budget-conscious patients awaiting generic"] },
      ],
      avoidIf: [
        { treatmentSlug: "tirzepatide", contraindications: ["MTC or MEN2 history", "Pregnancy", "Severe GI disease", "Established CVD requiring proven CV benefit (data still pending)"] },
        { treatmentSlug: "semaglutide", contraindications: ["MTC or MEN2 history", "Pregnancy", "Prior pancreatitis", "Severe GI disease"] },
        { treatmentSlug: "liraglutide", contraindications: ["MTC or MEN2 history", "Pregnancy", "Prior pancreatitis", "Patients unable to commit to daily injections long-term"] },
      ],
    },
    dosingConvenience: {
      rows: [
        { treatmentSlug: "tirzepatide", frequency: "Once weekly", route: "Subcutaneous", titrationComplexity: "Moderate (6 steps over 20 weeks)", injectionDevice: "Single-dose pen or vial" },
        { treatmentSlug: "semaglutide", frequency: "Once weekly", route: "Subcutaneous (or oral Rybelsus)", titrationComplexity: "Moderate (4 steps over 16 weeks)", injectionDevice: "Multi-dose pen" },
        { treatmentSlug: "liraglutide", frequency: "Once daily", route: "Subcutaneous", titrationComplexity: "Simple (4 steps over 4 weeks)", injectionDevice: "Multi-dose pen" },
      ],
    },
    reviewerId: "sarah-chen-md",
    lastReviewed: "2026-04-27",
    wordCount: 2500,
  },

  "anabolic-osteoporosis-battle": {
    slug: "anabolic-osteoporosis-battle",
    title: "Teriparatide vs Abaloparatide",
    subtitle: "Head-to-head comparison of the two FDA-approved anabolic osteoporosis therapies",
    treatments: ["teriparatide", "abaloparatide"],
    summary:
      "Both teriparatide (Forteo) and abaloparatide (Tymlos) are PTH/PTHrP receptor agonists that stimulate bone formation rather than just inhibiting resorption. Abaloparatide produced greater BMD gains in the ACTIVE trial (9.2% vs 7.2% at lumbar spine at 18 months) and a higher vertebral fracture reduction rate (86% vs 65%). However, abaloparatide causes more orthostatic hypotension. Both are limited to 2 years of cumulative lifetime use due to theoretical osteosarcoma risk. After either drug, patients must transition to an antiresorptive agent (bisphosphonate or denosumab) to preserve gains. The choice between them often comes down to insurance coverage, patient tolerance, and prescriber familiarity.",
    verdict: {
      bestForBMD: "Abaloparatide (greater spine and hip gains)",
      bestForFracturePrevention: "Abaloparatide (86% vertebral fracture reduction)",
      bestTolerated: "Teriparatide (less orthostatic hypotension)",
      bestForSevereOsteoporosis: "Abaloparatide (faster onset, greater gains)",
      overallWinner: "Abaloparatide for efficacy; teriparatide for tolerability",
      explanation:
        "Abaloparatide has demonstrated superior BMD gains and fracture reduction in head-to-head data. Its transient receptor activation pattern may produce a more favorable anabolic window with less resorption stimulation. However, it causes more dizziness and orthostatic hypotension, which matters for elderly patients with fall risk. Teriparatide has a much longer track record (since 2002) and broader indication coverage including glucocorticoid-induced osteoporosis. For a patient with very low BMD and no fall risk, abaloparatide is preferred. For a patient with orthostatic tendencies or who needs the glucocorticoid indication, teriparatide remains the choice.",
    },
    dimensionComparisons: [
      {
        dimension: "Lumbar spine BMD increase (18 months)",
        rows: [
          { treatmentSlug: "abaloparatide", value: "+9.2% (ACTIVE trial)", highlight: true },
          { treatmentSlug: "teriparatide", value: "+7.2% (ACTIVE trial)" },
        ],
        winner: "abaloparatide",
      },
      {
        dimension: "Femoral neck BMD increase (18 months)",
        rows: [
          { treatmentSlug: "abaloparatide", value: "+3.4%", highlight: true },
          { treatmentSlug: "teriparatide", value: "+2.0%" },
        ],
        winner: "abaloparatide",
      },
      {
        dimension: "Vertebral fracture reduction",
        rows: [
          { treatmentSlug: "abaloparatide", value: "86% (ACTIVE)", highlight: true },
          { treatmentSlug: "teriparatide", value: "65% (pivotal trial)" },
        ],
        winner: "abaloparatide",
      },
      {
        dimension: "Non-vertebral fracture reduction",
        rows: [
          { treatmentSlug: "teriparatide", value: "53% (pivotal trial)", highlight: true },
          { treatmentSlug: "abaloparatide", value: "43% (ACTIVE)" },
        ],
        winner: "teriparatide",
        notes: "Teriparatide's pivotal trial showed slightly better non-vertebral protection",
      },
      {
        dimension: "Orthostatic hypotension incidence",
        rows: [
          { treatmentSlug: "teriparatide", value: "<1%", highlight: true },
          { treatmentSlug: "abaloparatide", value: "3-5%" },
        ],
        winner: "teriparatide",
        notes: "Important for elderly patients with fall risk",
      },
      {
        dimension: "FDA-approved indications",
        rows: [
          { treatmentSlug: "teriparatide", value: "Postmenopausal osteoporosis, male osteoporosis, glucocorticoid-induced osteoporosis", highlight: true },
          { treatmentSlug: "abaloparatide", value: "Postmenopausal osteoporosis at high fracture risk only" },
        ],
        winner: "teriparatide",
      },
      {
        dimension: "Years of clinical experience",
        rows: [
          { treatmentSlug: "teriparatide", value: "20+ years (since 2002)", highlight: true },
          { treatmentSlug: "abaloparatide", value: "~7 years (since 2017)" },
        ],
        winner: "teriparatide",
      },
    ],
    costComparison: {
      rows: [
        { treatmentSlug: "teriparatide", listPrice: "~$3,500/month (Forteo); ~$4,200 (Bonsity AG)", withSavingsCard: "Copay assistance available", insuranceCoverage: "~70-85% with documentation" },
        { treatmentSlug: "abaloparatide", listPrice: "~$3,500-$4,000/month", withSavingsCard: "Copay assistance available", insuranceCoverage: "~70-85% with documentation" },
      ],
    },
    sideEffectComparison: {
      rows: [
        { treatmentSlug: "teriparatide", mostCommon: "Nausea 8%, dizziness 8%, headache 8%", discontinuationRate: "~3-5%", uniqueRisks: "Hypercalcemia 3%; urolithiasis risk" },
        { treatmentSlug: "abaloparatide", mostCommon: "Hypercalciuria 18%, dizziness 10%, nausea 8%", discontinuationRate: "~5-7%", uniqueRisks: "Orthostatic hypotension 3-5%; palpitations 5%" },
      ],
    },
    evidenceSummary: {
      rows: [
        { treatmentSlug: "abaloparatide", keyTrial: "ACTIVE", n: "2,463", primaryOutcome: "Vertebral fractures at 18 months", result: "86% reduction vs placebo" },
        { treatmentSlug: "teriparatide", keyTrial: "Neer pivotal", n: "1,637", primaryOutcome: "Vertebral fractures", result: "65% reduction vs placebo" },
        { treatmentSlug: "teriparatide", keyTrial: "Male osteoporosis", n: "437", primaryOutcome: "BMD change", result: "+5.9% spine BMD" },
      ],
    },
    patientSelectionGuide: {
      idealFor: [
        { treatmentSlug: "abaloparatide", candidates: ["Severe osteoporosis (T-score ≤-3.5)", "Prior vertebral fracture", "Patients needing fastest BMD gains", "No orthostatic hypotension history"] },
        { treatmentSlug: "teriparatide", candidates: ["Glucocorticoid-induced osteoporosis", "Male osteoporosis", "Patients with fall risk or orthostatic tendencies", "Prescriber preference for longest track record"] },
      ],
      avoidIf: [
        { treatmentSlug: "abaloparatide", contraindications: ["Paget disease", "Prior skeletal radiation", "Bone metastases", "Hypercalcemia", "Significant orthostatic hypotension"] },
        { treatmentSlug: "teriparatide", contraindications: ["Paget disease", "Prior skeletal radiation", "Bone metastases", "Hypercalcemia", "Severe renal impairment"] },
      ],
    },
    dosingConvenience: {
      rows: [
        { treatmentSlug: "teriparatide", frequency: "Once daily", route: "Subcutaneous", titrationComplexity: "None (fixed 20 mcg)", injectionDevice: "Prefilled pen, 28 doses" },
        { treatmentSlug: "abaloparatide", frequency: "Once daily", route: "Subcutaneous", titrationComplexity: "None (fixed 80 mcg)", injectionDevice: "Prefilled pen, 30 doses" },
      ],
    },
    reviewerId: "sarah-chen-md",
    lastReviewed: "2026-04-27",
    wordCount: 1800,
  },

  "somastatin-analogs-net-acromegaly": {
    slug: "somastatin-analogs-net-acromegaly",
    title: "Octreotide vs Lanreotide",
    subtitle: "Somatostatin analog comparison for neuroendocrine tumors and acromegaly",
    treatments: ["octreotide", "lanreotide"],
    summary:
      "Octreotide (Sandostatin) and lanreotide (Somatuline) are both somatostatin receptor subtype 2 (SSTR2) agonists used for acromegaly and neuroendocrine tumors. They have comparable efficacy for GH/IGF-1 control in acromegaly and both demonstrate antiproliferative effects in NETs. Octreotide has the PROMID trial data for midgut NETs, while lanreotide has the CLARINET trial for GI/pancreatic NETs. Octreotide uses intramuscular injection; lanreotide uses deep subcutaneous injection. Neither normalizes IGF-1 as effectively as pegvisomant, but both are far less expensive. The choice is often based on patient injection preference, insurance formulary, and prescriber familiarity.",
    verdict: {
      bestForNETAntiproliferative: "Lanreotide (CLARINET: broader NET population)",
      bestForAcromegaly: "Tie (comparable GH/IGF-1 control)",
      bestTolerated: "Lanreotide (slightly better GI side effect profile in some studies)",
      bestValue: "Tie (similar pricing)",
      overallWinner: "Tie — choice depends on indication and patient preference",
      explanation:
        "For acromegaly, both produce similar biochemical control rates (~50-60% GH normalization). For NETs, octreotide has PROMID data in midgut tumors, while lanreotide has CLARINET data in GI and pancreatic NETs. Lanreotide's deep subcutaneous injection may be preferable for patients who want to avoid intramuscular injection. Both require monthly administration and carry similar risks (gallstones, glucose dysregulation).",
    },
    dimensionComparisons: [
      {
        dimension: "GH normalization (acromegaly)",
        rows: [
          { treatmentSlug: "octreotide", value: "~60% (LAR)", highlight: true },
          { treatmentSlug: "lanreotide", value: "~54% (autogel)" },
        ],
        winner: "tie",
      },
      {
        dimension: "IGF-1 normalization",
        rows: [
          { treatmentSlug: "octreotide", value: "~50%", highlight: true },
          { treatmentSlug: "lanreotide", value: "~38%" },
        ],
        winner: "octreotide",
      },
      {
        dimension: "NET antiproliferative evidence",
        rows: [
          { treatmentSlug: "lanreotide", value: "CLARINET: HR 0.47 in GI/pancreatic NETs", highlight: true },
          { treatmentSlug: "octreotide", value: "PROMID: HR 0.34 in midgut NETs" },
        ],
        winner: "tie",
        notes: "Different trial populations; both show significant PFS benefit",
      },
      {
        dimension: "Injection route",
        rows: [
          { treatmentSlug: "lanreotide", value: "Deep subcutaneous (buttock)", highlight: true },
          { treatmentSlug: "octreotide", value: "Intramuscular (gluteal)" },
        ],
        winner: "lanreotide",
        notes: "Patient preference varies",
      },
      {
        dimension: "Diarrhea incidence",
        rows: [
          { treatmentSlug: "octreotide", value: "8%", highlight: true },
          { treatmentSlug: "lanreotide", value: "26%" },
        ],
        winner: "octreotide",
      },
      {
        dimension: "Cholelithiasis risk",
        rows: [
          { treatmentSlug: "octreotide", value: "20-30%", highlight: true },
          { treatmentSlug: "lanreotide", value: "20%" },
        ],
        winner: "tie",
      },
    ],
    costComparison: {
      rows: [
        { treatmentSlug: "octreotide", listPrice: "~$3,000-$4,000/month", withSavingsCard: "Copay assistance available", insuranceCoverage: "~80-90%" },
        { treatmentSlug: "lanreotide", listPrice: "~$4,000-$5,000/month", withSavingsCard: "Copay assistance available", insuranceCoverage: "~80-90%" },
      ],
    },
    sideEffectComparison: {
      rows: [
        { treatmentSlug: "octreotide", mostCommon: "Diarrhea 8%, abdominal pain 8%, injection site pain 5%", discontinuationRate: "~5%", uniqueRisks: "Cholelithiasis 20-30%; hyperglycemia" },
        { treatmentSlug: "lanreotide", mostCommon: "Diarrhea 26%, abdominal pain 20%, nausea 15%", discontinuationRate: "~5-8%", uniqueRisks: "Cholelithiasis 20%; hyperglycemia; bradycardia" },
      ],
    },
    evidenceSummary: {
      rows: [
        { treatmentSlug: "octreotide", keyTrial: "PROMID", n: "85", primaryOutcome: "Time to progression (midgut NETs)", result: "HR 0.34 (p=0.0003)" },
        { treatmentSlug: "lanreotide", keyTrial: "CLARINET", n: "204", primaryOutcome: "PFS (GI/pancreatic NETs)", result: "HR 0.47 (p<0.001)" },
      ],
    },
    patientSelectionGuide: {
      idealFor: [
        { treatmentSlug: "octreotide", candidates: ["Midgut NETs (PROMID population)", "Patients preferring IM injection", "Those with prior octreotide response", "Acromegaly requiring GH suppression"] },
        { treatmentSlug: "lanreotide", candidates: ["GI or pancreatic NETs (CLARINET population)", "Patients preferring deep SC injection", "Acromegaly patients", "Those wanting monthly autogel convenience"] },
      ],
      avoidIf: [
        { treatmentSlug: "octreotide", contraindications: ["Hypersensitivity", "SSTR2-negative tumors", "Uncontrolled diabetes"] },
        { treatmentSlug: "lanreotide", contraindications: ["Hypersensitivity", "SSTR2-negative tumors", "Uncontrolled diabetes", "Severe cardiac conduction disease"] },
      ],
    },
    dosingConvenience: {
      rows: [
        { treatmentSlug: "octreotide", frequency: "Every 4 weeks", route: "Intramuscular", titrationComplexity: "Simple (20→30 mg if needed)", injectionDevice: "LAR microsphere suspension" },
        { treatmentSlug: "lanreotide", frequency: "Every 4 weeks", route: "Deep subcutaneous", titrationComplexity: "Simple (90→120 mg if needed)", injectionDevice: "Autogel prefilled syringe" },
      ],
    },
    reviewerId: "james-patterson-md",
    lastReviewed: "2026-04-27",
    wordCount: 1500,
  },

  "ibs-c-cic-guanylate-cyclase": {
    slug: "ibs-c-cic-guanylate-cyclase",
    title: "Linaclotide vs Plecanatide",
    subtitle: "GC-C agonist comparison for irritable bowel syndrome with constipation and chronic idiopathic constipation",
    treatments: ["linaclotide", "plecanatide"],
    summary:
      "Linaclotide (Linzess) and plecanatide (Trulance) are both guanylate cyclase-C agonists that increase intestinal fluid secretion and reduce visceral pain. They have equivalent efficacy for both IBS-C and CIC, but plecanatide has a dramatically better tolerability profile with a diarrhea rate of only 5% compared to linaclotide's 16-20%. This lower discontinuation rate makes plecanatide preferable for patients who are sensitive to GI side effects or who discontinued linaclotide due to diarrhea. Linaclotide has been on the market longer (since 2012 vs 2017) and has more real-world data. Both are once-daily oral medications with minimal systemic absorption and no significant drug interactions.",
    verdict: {
      bestForIBS_C: "Tie (equivalent responder rates)",
      bestForCIC: "Tie (equivalent responder rates)",
      bestTolerated: "Plecanatide (5% diarrhea vs 16-20%)",
      bestValue: "Tie (similar pricing)",
      bestForLinaclotideIntolerance: "Plecanatide (natural switch target)",
      overallWinner: "Plecanatide for tolerability; tie for efficacy",
      explanation:
        "The efficacy of these two drugs is essentially identical in head-to-head clinical trial comparisons. The differentiating factor is tolerability. Plecanatide's structure is more similar to endogenous human uroguanylin, which may explain its improved GI side effect profile. For a patient starting GC-C agonist therapy for the first time, plecanatide is the better choice due to lower diarrhea risk. For a patient already stable on linaclotide, there is no reason to switch unless side effects emerge. Both require the same pediatric contraindication (avoid in patients ≤18 years).",
    },
    dimensionComparisons: [
      {
        dimension: "IBS-C responder rate (composite)",
        rows: [
          { treatmentSlug: "linaclotide", value: "33-34% (290 mcg)", highlight: true },
          { treatmentSlug: "plecanatide", value: "30% (3 mg)" },
        ],
        winner: "tie",
        notes: "Statistically similar; both superior to placebo",
      },
      {
        dimension: "CIC responder rate",
        rows: [
          { treatmentSlug: "linaclotide", value: "16-21%", highlight: true },
          { treatmentSlug: "plecanatide", value: "21% (3 mg)" },
        ],
        winner: "tie",
      },
      {
        dimension: "Diarrhea incidence",
        rows: [
          { treatmentSlug: "plecanatide", value: "5%", highlight: true },
          { treatmentSlug: "linaclotide", value: "16-20%" },
        ],
        winner: "plecanatide",
        notes: "Major differentiator; plecanatide 3-4x better tolerated",
      },
      {
        dimension: "Diarrhea-related discontinuation",
        rows: [
          { treatmentSlug: "plecanatide", value: "1-2%", highlight: true },
          { treatmentSlug: "linaclotide", value: "5%" },
        ],
        winner: "plecanatide",
      },
      {
        dimension: "Onset of action",
        rows: [
          { treatmentSlug: "linaclotide", value: "Within 1 week", highlight: true },
          { treatmentSlug: "plecanatide", value: "Within 1 week" },
        ],
        winner: "tie",
      },
      {
        dimension: "Dosing flexibility",
        rows: [
          { treatmentSlug: "linaclotide", value: "72, 145, 290 mcg", highlight: true },
          { treatmentSlug: "plecanatide", value: "3 mg only" },
        ],
        winner: "linaclotide",
        notes: "Multiple doses allow titration for CIC",
      },
      {
        dimension: "Meal restrictions",
        rows: [
          { treatmentSlug: "linaclotide", value: "30 minutes before first meal", highlight: true },
          { treatmentSlug: "plecanatide", value: "No restrictions" },
        ],
        winner: "plecanatide",
      },
    ],
    costComparison: {
      rows: [
        { treatmentSlug: "linaclotide", listPrice: "~$400-$500/month", withSavingsCard: "$30/month", insuranceCoverage: "~70-80% after step therapy" },
        { treatmentSlug: "plecanatide", listPrice: "~$400-$500/month", withSavingsCard: "$25/month", insuranceCoverage: "~70-80% after step therapy" },
      ],
    },
    sideEffectComparison: {
      rows: [
        { treatmentSlug: "linaclotide", mostCommon: "Diarrhea 16-20%, abdominal pain 7%, flatulence 6%", discontinuationRate: "~5-7%", uniqueRisks: "Severe diarrhea with dehydration (pediatric contraindication)" },
        { treatmentSlug: "plecanatide", mostCommon: "Diarrhea 5%, URI 5%, sinusitis 4%", discontinuationRate: "~2-3%", uniqueRisks: "Same pediatric contraindication; otherwise very clean profile" },
      ],
    },
    evidenceSummary: {
      rows: [
        { treatmentSlug: "linaclotide", keyTrial: "IBS-C phase 3", n: "1,606", primaryOutcome: "Composite responder", result: "33-34% vs 20-21% placebo" },
        { treatmentSlug: "plecanatide", keyTrial: "IBS-C phase 3", n: "2,183", primaryOutcome: "Composite responder", result: "30% vs 18% placebo" },
      ],
    },
    patientSelectionGuide: {
      idealFor: [
        { treatmentSlug: "linaclotide", candidates: ["Patients wanting dose titration options (72-290 mcg)", "Those who respond well and tolerate it", "Patients who prefer longest track record (since 2012)"] },
        { treatmentSlug: "plecanatide", candidates: ["Patients sensitive to GI side effects", "Those who discontinued linaclotide due to diarrhea", "Patients wanting no meal restrictions", "First-time GC-C agonist users"] },
      ],
      avoidIf: [
        { treatmentSlug: "linaclotide", contraindications: ["Age ≤18 years", "Mechanical GI obstruction", "Severe chronic diarrhea"] },
        { treatmentSlug: "plecanatide", contraindications: ["Age ≤18 years", "Mechanical GI obstruction", "Severe chronic diarrhea"] },
      ],
    },
    dosingConvenience: {
      rows: [
        { treatmentSlug: "linaclotide", frequency: "Once daily", route: "Oral capsule", titrationComplexity: "Multiple strengths (72, 145, 290 mcg)", injectionDevice: "N/A" },
        { treatmentSlug: "plecanatide", frequency: "Once daily", route: "Oral tablet", titrationComplexity: "Single strength (3 mg)", injectionDevice: "N/A" },
      ],
    },
    reviewerId: "sarah-chen-md",
    lastReviewed: "2026-04-27",
    wordCount: 1400,
  },

  "glp1-ra-generations-t2d": {
    slug: "glp1-ra-generations-t2d",
    title: "Exenatide vs Dulaglutide vs Semaglutide",
    subtitle: "GLP-1 receptor agonist generations for type 2 diabetes: efficacy, tolerability, and cardiovascular evidence",
    treatments: ["exenatide", "dulaglutide", "semaglutide"],
    summary:
      "Semaglutide (Ozempic) is the most potent GLP-1 RA for glycemic control and weight loss, with HbA1c reductions of 1.5-1.8% and weight loss of 6-10 kg. Dulaglutide (Trulicity) offers the best balance of efficacy and tolerability, with HbA1c -1.2-1.5%, the lowest nausea rate (21%), and proven 12% MACE reduction in the REWIND trial. Exenatide (Byetta/Bydureon) is the first-in-class agent with the longest track record (since 2005) and lowest cost, but it is less potent (HbA1c -0.8-1.0%) and requires twice-daily dosing (or weekly Bydureon). For patients needing maximum efficacy, semaglutide is preferred. For patients with established cardiovascular disease who need proven benefit with minimal GI side effects, dulaglutide is ideal. Exenatide remains a budget-conscious option or for those who need pronounced gastric emptying delay.",
    verdict: {
      bestForDiabetes: "Semaglutide (Ozempic)",
      bestTolerated: "Dulaglutide (Trulicity)",
      bestValue: "Exenatide (Byetta/Bydureon)",
      bestForCVProtection: "Dulaglutide (REWIND trial)",
      overallWinner: "Dulaglutide for most patients; semaglutide for maximum efficacy",
      explanation:
        "Dulaglutide wins for the typical T2D patient because it matches semaglutide's weekly convenience with markedly better GI tolerability (nausea 21% vs 44%) and a dedicated cardiovascular outcome trial showing 12% MACE reduction. Semaglutide is the choice when maximum glycemic control and weight loss are paramount. Exenatide is now third-line due to inferior efficacy and more frequent dosing, though its weekly formulation (Bydureon) and lower cost keep it relevant for budget-limited patients.",
    },
    dimensionComparisons: [
      {
        dimension: "HbA1c reduction (T2D trials)",
        rows: [
          { treatmentSlug: "semaglutide", value: "-1.5% to -1.8% (SUSTAIN-2, 1.0 mg)", highlight: true },
          { treatmentSlug: "dulaglutide", value: "-1.2% to -1.5% (AWARD program, 1.5 mg)" },
          { treatmentSlug: "exenatide", value: "-0.8% to -1.0% (pivotal trials, 10 mcg BID)" },
        ],
        winner: "semaglutide",
      },
      {
        dimension: "Weight loss",
        rows: [
          { treatmentSlug: "semaglutide", value: "6-10 kg (SUSTAIN program)", highlight: true },
          { treatmentSlug: "dulaglutide", value: "2-5 kg (AWARD program)" },
          { treatmentSlug: "exenatide", value: "2-3 kg (pivotal trials)" },
        ],
        winner: "semaglutide",
      },
      {
        dimension: "Nausea incidence",
        rows: [
          { treatmentSlug: "dulaglutide", value: "21%", highlight: true },
          { treatmentSlug: "exenatide", value: "44%" },
          { treatmentSlug: "semaglutide", value: "44%" },
        ],
        winner: "dulaglutide",
        notes: "Dulaglutide's Fc-fusion structure may produce smoother pharmacokinetics and less GI stimulation",
      },
      {
        dimension: "Cardiovascular outcomes",
        rows: [
          { treatmentSlug: "semaglutide", value: "26% MACE reduction (SUSTAIN-6)", highlight: true },
          { treatmentSlug: "dulaglutide", value: "12% MACE reduction (REWIND)" },
          { treatmentSlug: "exenatide", value: "Non-inferior only (EXSCEL, p=0.06)" },
        ],
        winner: "semaglutide",
        notes: "Semaglutide has the largest relative risk reduction; dulaglutide demonstrated benefit in a broader population (68% without prior CVD)",
      },
      {
        dimension: "Dosing frequency",
        rows: [
          { treatmentSlug: "semaglutide", value: "Once weekly", highlight: true },
          { treatmentSlug: "dulaglutide", value: "Once weekly" },
          { treatmentSlug: "exenatide", value: "Twice daily (Byetta) or weekly (Bydureon)" },
        ],
        winner: "semaglutide / dulaglutide (tie)",
      },
      {
        dimension: "Years of clinical experience",
        rows: [
          { treatmentSlug: "exenatide", value: "20+ years (since 2005)", highlight: true },
          { treatmentSlug: "dulaglutide", value: "~7 years (since 2014)" },
          { treatmentSlug: "semaglutide", value: "~5 years (since 2017)" },
        ],
        winner: "exenatide",
      },
    ],
    costComparison: {
      rows: [
        { treatmentSlug: "exenatide", listPrice: "~$700-$900/month", withSavingsCard: "Copay ~$25/month", insuranceCoverage: "~80-90% for T2D" },
        { treatmentSlug: "dulaglutide", listPrice: "~$900-$1,100/month", withSavingsCard: "Copay ~$25/month", insuranceCoverage: "~85-95% for T2D" },
        { treatmentSlug: "semaglutide", listPrice: "~$1,000-$1,200/month", withSavingsCard: "$0-$225/month", insuranceCoverage: "~80-90% for T2D" },
      ],
    },
    sideEffectComparison: {
      rows: [
        { treatmentSlug: "exenatide", mostCommon: "Nausea 44%, vomiting 13%, diarrhea 13%", discontinuationRate: "~8-10%", uniqueRisks: "Injection site nodules (Bydureon); more pronounced gastric emptying delay" },
        { treatmentSlug: "dulaglutide", mostCommon: "Nausea 21%, diarrhea 12%, vomiting 6%", discontinuationRate: "~5-7%", uniqueRisks: "Acute kidney injury from dehydration; diabetic retinopathy complications with rapid glucose lowering" },
        { treatmentSlug: "semaglutide", mostCommon: "Nausea 44%, diarrhea 30%, vomiting 24%", discontinuationRate: "~7-10%", uniqueRisks: "Gallbladder disease 2-3%; ileus (post-marketing); thyroid C-cell tumor boxed warning" },
      ],
    },
    evidenceSummary: {
      rows: [
        { treatmentSlug: "semaglutide", keyTrial: "SUSTAIN-6", n: "3,297", primaryOutcome: "MACE in T2D", result: "26% reduction (p<0.001)" },
        { treatmentSlug: "dulaglutide", keyTrial: "REWIND", n: "9,901", primaryOutcome: "MACE in T2D", result: "12% reduction (p=0.026)" },
        { treatmentSlug: "exenatide", keyTrial: "EXSCEL", n: "14,752", primaryOutcome: "MACE in T2D", result: "Non-inferior (HR 0.91, p=0.06 for superiority)" },
      ],
    },
    patientSelectionGuide: {
      idealFor: [
        { treatmentSlug: "exenatide", candidates: ["Budget-conscious patients", "Those needing pronounced gastric emptying delay", "Patients with prior response to exenatide", "T2D on metformin needing modest HbA1c reduction"] },
        { treatmentSlug: "dulaglutide", candidates: ["T2D patients with established CVD or high CV risk", "Those intolerant of GI side effects", "Patients preferring weekly injection with minimal titration", "Overweight/obese T2D patients needing weight-neutral or weight-loss therapy"] },
        { treatmentSlug: "semaglutide", candidates: ["Patients needing maximum glycemic control", "Those needing significant weight loss", "T2D with CVD requiring strongest CV evidence", "Patients who can tolerate higher GI side effect burden"] },
      ],
      avoidIf: [
        { treatmentSlug: "exenatide", contraindications: ["MTC or MEN2 history", "Severe renal impairment (eGFR <30)", "Severe GI disease (gastroparesis)", "Pregnancy"] },
        { treatmentSlug: "dulaglutide", contraindications: ["MTC or MEN2 history", "Pregnancy", "History of serious hypersensitivity", "Severe GI motility disorders"] },
        { treatmentSlug: "semaglutide", contraindications: ["MTC or MEN2 history", "Pregnancy", "Prior pancreatitis", "Severe GI disease", "Personal/family history of medullary thyroid carcinoma"] },
      ],
    },
    dosingConvenience: {
      rows: [
        { treatmentSlug: "exenatide", frequency: "Twice daily or once weekly", route: "Subcutaneous", titrationComplexity: "Simple (5→10 mcg BID; fixed 2 mg weekly)", injectionDevice: "Prefilled pen" },
        { treatmentSlug: "dulaglutide", frequency: "Once weekly", route: "Subcutaneous", titrationComplexity: "Simple (0.75→1.5 mg)", injectionDevice: "Single-dose pen" },
        { treatmentSlug: "semaglutide", frequency: "Once weekly", route: "Subcutaneous (or oral Rybelsus)", titrationComplexity: "Moderate (0.25→2.4 mg over 16 weeks)", injectionDevice: "Multi-dose pen" },
      ],
    },
    reviewerId: "sarah-chen-md",
    lastReviewed: "2026-04-27",
    wordCount: 2200,
  },

  "melanocortin-peptide-therapeutics": {
    slug: "melanocortin-peptide-therapeutics",
    title: "Bremelanotide vs Setmelanotide",
    subtitle: "Melanocortin-4 receptor agonists for sexual health and rare genetic obesity",
    treatments: ["bremelanotide", "setmelanotide"],
    summary:
      "Bremelanotide (Vyleesi) and setmelanotide (Imcivree) both activate the melanocortin-4 receptor (MC4R) but serve entirely different patient populations. Bremelanotide is an as-needed injection for hypoactive sexual desire disorder (HSDD) in premenopausal women, producing modest improvements in desire scores with a high nausea rate (40%). Setmelanotide is a daily injection for ultra-rare genetic obesity caused by POMC, PCSK1, or LEPR deficiency, producing dramatic weight loss (up to 23%) in patients with no other effective options. Bremelanotide requires no genetic testing and works within 45 minutes; setmelanotide requires confirmed genetic diagnosis and works over weeks. They should not be viewed as competitors but as examples of how a single receptor target can be leveraged for radically different therapeutic goals.",
    verdict: {
      bestForSexualDesire: "Bremelanotide (Vyleesi)",
      bestForGeneticObesity: "Setmelanotide (Imcivree)",
      bestTolerated: "Setmelanotide (lower acute GI side effects)",
      overallWinner: "Not comparable — different indications, populations, and goals",
      explanation:
        "These drugs share a receptor target but cannot be compared head-to-head. Bremelanotide addresses a common but challenging sexual health condition with modest effect size and significant nausea. Setmelanotide is a transformative precision therapy for an ultra-rare population, producing life-changing weight loss in patients who were previously refractory to all interventions. The choice is determined entirely by diagnosis.",
    },
    dimensionComparisons: [
      {
        dimension: "Primary indication",
        rows: [
          { treatmentSlug: "bremelanotide", value: "HSDD in premenopausal women", highlight: true },
          { treatmentSlug: "setmelanotide", value: "Genetic obesity (POMC/PCSK1/LEPR deficiency)" },
        ],
        winner: "n/a",
      },
      {
        dimension: "Weight loss efficacy",
        rows: [
          { treatmentSlug: "setmelanotide", value: "23.1% (POMC deficiency), 9.7% (LEPR deficiency)", highlight: true },
          { treatmentSlug: "bremelanotide", value: "Not indicated for weight loss" },
        ],
        winner: "setmelanotide",
      },
      {
        dimension: "Sexual desire improvement",
        rows: [
          { treatmentSlug: "bremelanotide", value: "FSFI-D +0.3 vs placebo (p<0.01)", highlight: true },
          { treatmentSlug: "setmelanotide", value: "Not indicated for sexual desire" },
        ],
        winner: "bremelanotide",
      },
      {
        dimension: "Nausea incidence",
        rows: [
          { treatmentSlug: "setmelanotide", value: "25%", highlight: true },
          { treatmentSlug: "bremelanotide", value: "40%" },
        ],
        winner: "setmelanotide",
      },
      {
        dimension: "Genetic testing required",
        rows: [
          { treatmentSlug: "bremelanotide", value: "No", highlight: true },
          { treatmentSlug: "setmelanotide", value: "Yes (mandatory before prescribing)" },
        ],
        winner: "bremelanotide",
      },
      {
        dimension: "Dosing schedule",
        rows: [
          { treatmentSlug: "bremelanotide", value: "As-needed before sexual activity", highlight: true },
          { treatmentSlug: "setmelanotide", value: "Once daily" },
        ],
        winner: "preference-dependent",
      },
      {
        dimension: "Monthly cost",
        rows: [
          { treatmentSlug: "bremelanotide", value: "~$900-$1,200", highlight: true },
          { treatmentSlug: "setmelanotide", value: "~$15,000-$20,000" },
        ],
        winner: "bremelanotide",
        notes: "Setmelanotide is among the most expensive peptide therapies due to ultra-rare indication and small market",
      },
    ],
    costComparison: {
      rows: [
        { treatmentSlug: "bremelanotide", listPrice: "~$900-$1,200/month", withSavingsCard: "Copay $0-$99/month", insuranceCoverage: "~30-40% for HSDD" },
        { treatmentSlug: "setmelanotide", listPrice: "~$15,000-$20,000/month", withSavingsCard: "Case-by-case assistance", insuranceCoverage: "~70-80% with confirmed genetic diagnosis" },
      ],
    },
    sideEffectComparison: {
      rows: [
        { treatmentSlug: "bremelanotide", mostCommon: "Nausea 40%, flushing 20%, injection site 13%", discontinuationRate: "~30-40% (due to nausea or modest benefit)", uniqueRisks: "Transient blood pressure elevation; hyperpigmentation (MC1R-mediated); contraindicated in uncontrolled hypertension" },
        { treatmentSlug: "setmelanotide", mostCommon: "Injection site reactions 45%, hyperpigmentation 40%, nausea 25%", discontinuationRate: "~10-15%", uniqueRisks: "Spontaneous erections in males; requires genetic diagnosis; not effective in MC4R mutation carriers" },
      ],
    },
    evidenceSummary: {
      rows: [
        { treatmentSlug: "bremelanotide", keyTrial: "RECONNECT", n: "1,247", primaryOutcome: "FSFI-D and FSDS-R scores", result: "FSFI-D +0.3, FSDS-R -7.5 vs placebo" },
        { treatmentSlug: "setmelanotide", keyTrial: "POMC/PCSK1 trial", n: "10", primaryOutcome: "Weight change at 52 weeks", result: "23.1% mean weight loss" },
        { treatmentSlug: "setmelanotide", keyTrial: "LEPR trial", n: "11", primaryOutcome: "Weight change at 52 weeks", result: "9.7% mean weight loss" },
      ],
    },
    patientSelectionGuide: {
      idealFor: [
        { treatmentSlug: "bremelanotide", candidates: ["Premenopausal women with acquired, generalized HSDD", "Patients who prefer as-needed rather than daily therapy", "Women who consume alcohol socially (no alcohol restriction)", "Those who failed or cannot tolerate flibanserin"] },
        { treatmentSlug: "setmelanotide", candidates: ["Patients with confirmed biallelic POMC, PCSK1, or LEPR deficiency", "Severe early-onset obesity with hyperphagia refractory to behavioral interventions", "Children ≥6 years and adults with genetic diagnosis", "Families seeking targeted precision therapy for monogenic obesity"] },
      ],
      avoidIf: [
        { treatmentSlug: "bremelanotide", contraindications: ["Uncontrolled hypertension", "Significant cardiovascular disease", "Postmenopausal women (not studied)", "Pregnancy", "Patients unwilling to self-inject"] },
        { treatmentSlug: "setmelanotide", contraindications: ["Confirmed MC4R mutation (drug will not work)", "Common polygenic obesity without genetic defect", "Pregnancy or planned pregnancy", "History of melanoma or suspicious nevi changes"] },
      ],
    },
    dosingConvenience: {
      rows: [
        { treatmentSlug: "bremelanotide", frequency: "As-needed", route: "Subcutaneous", titrationComplexity: "None (fixed 1.75 mg)", injectionDevice: "Single-dose autoinjector" },
        { treatmentSlug: "setmelanotide", frequency: "Once daily", route: "Subcutaneous", titrationComplexity: "Simple (2→3 mg after 2 weeks)", injectionDevice: "Reconstituted vial, standard syringe" },
      ],
    },
    reviewerId: "sarah-chen-md",
    lastReviewed: "2026-04-27",
    wordCount: 2100,
  },

  "intrathecal-pain-therapies": {
    slug: "intrathecal-pain-therapies",
    title: "Ziconotide vs Intrathecal Morphine",
    subtitle: "Non-opioid vs opioid intrathecal analgesia for severe refractory chronic pain",
    treatments: ["ziconotide", "intrathecal-morphine"],
    summary:
      "Ziconotide (Prialt) and intrathecal morphine represent two distinct mechanistic approaches to severe chronic pain that has failed all conservative and systemic therapies. Ziconotide is a synthetic cone-snail peptide that selectively blocks N-type calcium channels, inhibiting nociceptive neurotransmitter release without acting on opioid receptors. It carries no risk of respiratory depression, tolerance, or addiction — a critical advantage in patients with respiratory compromise or opioid use disorder. However, it causes severe neuropsychiatric adverse effects (confusion, hallucinations, suicidal ideation) in up to 25% of patients, requiring slow titration and frequent monitoring. Intrathecal morphine is the established standard of care, with rapid onset and extensive evidence, but it carries risks of respiratory depression, tolerance, constipation, and urinary retention. Most pain specialists use intrathecal morphine first-line and reserve ziconotide for morphine failures, opioid-induced hyperalgesia, or patients with contraindications to opioids.",
    verdict: {
      bestForRespiratorySafety: "Ziconotide (Prialt)",
      bestForFirstLineIntrathecal: "Intrathecal morphine",
      bestForLongTermTolerance: "Ziconotide (no tolerance or dose escalation)",
      bestTolerated: "Intrathecal morphine (fewer severe neuropsychiatric effects)",
      overallWinner: "Intrathecal morphine first-line; ziconotide for opioid failures or respiratory risk",
      explanation:
        "Intrathecal morphine remains the default intrathecal analgesic due to its rapid onset, dose flexibility, and better overall tolerability profile. Ziconotide is a valuable second-line or alternative agent for the subset of patients who cannot tolerate opioids, have developed tolerance/hyperalgesia, or have respiratory compromise. The requirement for extremely slow titration and psychiatric monitoring limits ziconotide's utility as a first-line intrathecal agent.",
    },
    dimensionComparisons: [
      {
        dimension: "Mechanism of action",
        rows: [
          { treatmentSlug: "ziconotide", value: "N-type calcium channel blocker (Cav2.2)", highlight: true },
          { treatmentSlug: "intrathecal-morphine", value: "Mu-opioid receptor agonist" },
        ],
        winner: "n/a",
      },
      {
        dimension: "Respiratory depression",
        rows: [
          { treatmentSlug: "ziconotide", value: "None", highlight: true },
          { treatmentSlug: "intrathecal-morphine", value: "Risk present (dose-dependent)" },
        ],
        winner: "ziconotide",
        notes: "Critical advantage in patients with sleep apnea, COPD, or obesity hypoventilation",
      },
      {
        dimension: "Tolerance over time",
        rows: [
          { treatmentSlug: "ziconotide", value: "No tolerance observed", highlight: true },
          { treatmentSlug: "intrathecal-morphine", value: "Tolerance develops; dose escalation common" },
        ],
        winner: "ziconotide",
      },
      {
        dimension: "Neuropsychiatric side effects",
        rows: [
          { treatmentSlug: "intrathecal-morphine", value: "Mild-moderate (sedation, confusion at high doses)", highlight: true },
          { treatmentSlug: "ziconotide", value: "Severe (confusion 15%, hallucinations 10%, suicidal ideation 5%)" },
        ],
        winner: "intrathecal-morphine",
      },
      {
        dimension: "Onset of analgesia",
        rows: [
          { treatmentSlug: "intrathecal-morphine", value: "Rapid (hours to days)", highlight: true },
          { treatmentSlug: "ziconotide", value: "Gradual (days to weeks)" },
        ],
        winner: "intrathecal-morphine",
      },
      {
        dimension: "Discontinuation due to adverse effects",
        rows: [
          { treatmentSlug: "intrathecal-morphine", value: "~10-15%", highlight: true },
          { treatmentSlug: "ziconotide", value: "~25%" },
        ],
        winner: "intrathecal-morphine",
      },
      {
        dimension: "Monthly drug cost",
        rows: [
          { treatmentSlug: "intrathecal-morphine", value: "~$500-$1,500", highlight: true },
          { treatmentSlug: "ziconotide", value: "~$2,500-$3,500" },
        ],
        winner: "intrathecal-morphine",
        notes: "Both require implanted pump and catheter, adding substantial procedural and maintenance costs",
      },
    ],
    costComparison: {
      rows: [
        { treatmentSlug: "ziconotide", listPrice: "~$2,500-$3,500/month (drug only)", withSavingsCard: "Limited; case-by-case manufacturer assistance", insuranceCoverage: "~70-80% for refractory pain with extensive prior auth" },
        { treatmentSlug: "intrathecal-morphine", listPrice: "~$500-$1,500/month (drug only)", withSavingsCard: "Generic morphine; limited assistance programs", insuranceCoverage: "~80-90% for refractory pain with prior auth" },
      ],
    },
    sideEffectComparison: {
      rows: [
        { treatmentSlug: "ziconotide", mostCommon: "Nausea 25%, dizziness 20%, confusion 15%, headache 15%", discontinuationRate: "~25%", uniqueRisks: "Boxed warning for severe psychiatric symptoms and neurological impairment; suicidal ideation; nystagmus; ataxia" },
        { treatmentSlug: "intrathecal-morphine", mostCommon: "Nausea 20-30%, constipation 30-40%, urinary retention 15%, pruritus 10%", discontinuationRate: "~10-15%", uniqueRisks: "Respiratory depression; tolerance and dose escalation; opioid-induced hyperalgesia; endocrine dysfunction with chronic use" },
      ],
    },
    evidenceSummary: {
      rows: [
        { treatmentSlug: "ziconotide", keyTrial: "Severe chronic pain program", n: "256", primaryOutcome: "Pain reduction (VAS)", result: "~50% of patients achieve significant relief at optimal dose" },
        { treatmentSlug: "intrathecal-morphine", keyTrial: "Multiple RCTs and registry data", n: "1,000+", primaryOutcome: "Pain reduction and functional improvement", result: "Established efficacy in malignant and non-malignant refractory pain" },
      ],
    },
    patientSelectionGuide: {
      idealFor: [
        { treatmentSlug: "ziconotide", candidates: ["Severe refractory pain with respiratory compromise", "Patients who developed opioid tolerance or hyperalgesia", "Those with contraindications to opioids", "Patients with implanted pump who need non-opioid intrathecal agent"] },
        { treatmentSlug: "intrathecal-morphine", candidates: ["Standard refractory chronic pain (malignant or non-malignant)", "Patients with intact respiratory function", "Those needing rapid analgesic onset", "First-line intrathecal therapy candidates"] },
      ],
      avoidIf: [
        { treatmentSlug: "ziconotide", contraindications: ["History of psychosis or severe depression", "Untreated suicidal ideation", "Bleeding diathesis (intrathecal insertion risk)", "Spinal canal obstruction", "Patients unable to comply with frequent psychiatric monitoring"] },
        { treatmentSlug: "intrathecal-morphine", contraindications: ["Severe respiratory compromise", "Active substance use disorder (relative)", "Untreated sleep apnea (relative)", "Allergy to morphine or preservatives", "Infection at pump/catheter site"] },
      ],
    },
    dosingConvenience: {
      rows: [
        { treatmentSlug: "ziconotide", frequency: "Continuous intrathecal infusion", route: "Intrathecal (implanted pump)", titrationComplexity: "Very slow (0.1→0.8 mcg/hr over weeks)", injectionDevice: "Implanted programmable pump with catheter" },
        { treatmentSlug: "intrathecal-morphine", frequency: "Continuous intrathecal infusion", route: "Intrathecal (implanted pump)", titrationComplexity: "Moderate (titrated to response)", injectionDevice: "Implanted programmable pump with catheter" },
      ],
    },
    reviewerId: "james-patterson-md",
    lastReviewed: "2026-04-27",
    wordCount: 2300,
  },

  "next-gen-obesity-treatments": {
    slug: "next-gen-obesity-treatments",
    title: "Retatrutide vs Tirzepatide vs Semaglutide vs Survodutide",
    subtitle: "The next generation of incretin-based obesity pharmacotherapy compared head-to-head",
    treatments: ["retatrutide", "tirzepatide", "semaglutide", "survodutide"],
    summary:
      "Retatrutide leads on weight loss efficacy in Phase 2 data (24.2%) but remains investigational. Tirzepatide is the current market leader with FDA approval and 22.5% weight loss. Semaglutide has the most mature safety and cardiovascular data. Survodutide offers strong liver fat reduction with 19% weight loss and is also in Phase 3. For patients choosing today, tirzepatide and semaglutide are the only approved options. Retatrutide and survodutide are for clinical trial enrollment or future prescribing.",
    verdict: {
      bestForWeightLoss: "Retatrutide (Phase 2: 24.2%) — pending Phase 3 confirmation",
      bestForDiabetes: "Tirzepatide or Retatrutide (both ~2.1% HbA1c reduction)",
      bestTolerated: "Tirzepatide (lowest nausea rate despite high efficacy)",
      bestForCVD: "Semaglutide (proven 20% MACE reduction in SELECT)",
      bestForLiver: "Survodutide or Retatrutide (both show significant liver fat reduction; survodutide has dedicated MASH trials)",
      bestAvailableNow: "Tirzepatide (Zepbound)",
      overallWinner: "Tirzepatide for current prescribing; Retatrutide for future potential",
      explanation:
        "Tirzepatide is the pragmatic choice today: approved, effective, and well-tolerated. Retatrutide may become the new standard if Phase 3 confirms its Phase 2 superiority and if cardiovascular outcome trials are positive. Semaglutide remains essential for patients with established CVD who need proven risk reduction. Survodutide is an intriguing alternative for patients with MASLD/MASH who may benefit from its GLP-1/glucagon dual mechanism.",
    },
    dimensionComparisons: [
      {
        dimension: "Weight loss efficacy (obesity trials)",
        rows: [
          { treatmentSlug: "retatrutide", value: "24.2% mean (Phase 2, 12 mg, 48 wks)", highlight: true },
          { treatmentSlug: "tirzepatide", value: "22.5% mean (SURMOUNT-1, 15 mg, 72 wks)" },
          { treatmentSlug: "survodutide", value: "19.0% mean (Phase 2, 46 wks)" },
          { treatmentSlug: "semaglutide", value: "14.9% mean (STEP 1, 2.4 mg, 68 wks)" },
        ],
        winner: "retatrutide",
        notes: "Retatrutide Phase 3 data pending. SURMOUNT-5 head-to-head vs. tirzepatide ongoing.",
      },
      {
        dimension: "Glycemic control (HbA1c reduction)",
        rows: [
          { treatmentSlug: "retatrutide", value: "-2.16% (Phase 2 diabetes, 12 mg)", highlight: true },
          { treatmentSlug: "tirzepatide", value: "-2.1% (SURPASS-2, 15 mg)" },
          { treatmentSlug: "semaglutide", value: "-1.8% (SUSTAIN-2, 1.0 mg)" },
          { treatmentSlug: "survodutide", value: "~-1.5% (Phase 2 diabetes, estimated)" },
        ],
        winner: "retatrutide / tirzepatide (tie)",
      },
      {
        dimension: "Mechanism",
        rows: [
          { treatmentSlug: "retatrutide", value: "Triple: GIP + GLP-1 + glucagon", highlight: true },
          { treatmentSlug: "tirzepatide", value: "Dual: GIP + GLP-1" },
          { treatmentSlug: "survodutide", value: "Dual: GLP-1 + glucagon" },
          { treatmentSlug: "semaglutide", value: "Single: GLP-1 only" },
        ],
        notes: "More receptors does not always mean better outcomes; balance and tissue selectivity matter. No clear winner — mechanism depends on patient profile.",
      },
      {
        dimension: "Cardiovascular outcomes",
        rows: [
          { treatmentSlug: "semaglutide", value: "20% MACE reduction (SELECT, 4-year)", highlight: true },
          { treatmentSlug: "tirzepatide", value: "SURMOUNT-MMO ongoing" },
          { treatmentSlug: "retatrutide", value: "TRIUMPH-OUTCOMES ongoing (10,000 pts, 5-year)" },
          { treatmentSlug: "survodutide", value: "No dedicated CV outcome trial yet" },
        ],
        winner: "semaglutide",
        notes: "Semaglutide is the only agent with completed CV outcomes in non-diabetic obesity patients.",
      },
      {
        dimension: "Liver fat / MASH benefit",
        rows: [
          { treatmentSlug: "survodutide", value: "Significant; dedicated MASH Phase 3 trials", highlight: true },
          { treatmentSlug: "retatrutide", value: "Significant liver fat reduction (Phase 2a MASLD)" },
          { treatmentSlug: "tirzepatide", value: "Moderate reduction observed" },
          { treatmentSlug: "semaglutide", value: "Some reduction in exploratory analyses" },
        ],
        winner: "survodutide / retatrutide",
        notes: "Glucagon receptor agonism appears to drive hepatic fat oxidation independent of weight loss.",
      },
      {
        dimension: "Nausea incidence",
        rows: [
          { treatmentSlug: "tirzepatide", value: "33% (SURMOUNT-1, 15 mg)", highlight: true },
          { treatmentSlug: "survodutide", value: "~35% (Phase 2, estimated)" },
          { treatmentSlug: "semaglutide", value: "44% (STEP 1)" },
          { treatmentSlug: "retatrutide", value: "52% (Phase 2, 12 mg)" },
        ],
        winner: "tirzepatide",
        notes: "Retatrutide's higher nausea rate may reflect more aggressive dose escalation or stronger appetite suppression.",
      },
      {
        dimension: "FDA status",
        rows: [
          { treatmentSlug: "tirzepatide", value: "Approved (Mounjaro T2D, Zepbound obesity)", highlight: true },
          { treatmentSlug: "semaglutide", value: "Approved (Ozempic T2D, Wegovy obesity)" },
          { treatmentSlug: "retatrutide", value: "Phase 3 (TRIUMPH program)" },
          { treatmentSlug: "survodutide", value: "Phase 3 (SYNCHRONIZE program)" },
        ],
        winner: "tirzepatide / semaglutide",
      },
      {
        dimension: "Availability",
        rows: [
          { treatmentSlug: "tirzepatide", value: "Available by prescription now", highlight: true },
          { treatmentSlug: "semaglutide", value: "Available by prescription now" },
          { treatmentSlug: "retatrutide", value: "Clinical trials only; expected 2026–2027" },
          { treatmentSlug: "survodutide", value: "Clinical trials only; timeline TBD" },
        ],
        winner: "tirzepatide / semaglutide",
      },
    ],
    costComparison: {
      rows: [
        { treatmentSlug: "tirzepatide", listPrice: "$1,060/month", withSavingsCard: "$550/month", insuranceCoverage: "~35-45% obesity; ~75-85% T2D" },
        { treatmentSlug: "semaglutide", listPrice: "$1,349/month", withSavingsCard: "$0-$225/month", insuranceCoverage: "~40-50% obesity; ~80-90% T2D" },
        { treatmentSlug: "retatrutide", listPrice: "TBD (estimated $1,000–1,300/month)", withSavingsCard: "TBD", insuranceCoverage: "Not yet available" },
        { treatmentSlug: "survodutide", listPrice: "TBD", withSavingsCard: "TBD", insuranceCoverage: "Not yet available" },
      ],
    },
    sideEffectComparison: {
      rows: [
        { treatmentSlug: "retatrutide", mostCommon: "Nausea 52%, diarrhea 31%, vomiting 26%", discontinuationRate: "~5-6% (Phase 2)", uniqueRisks: "Long-term safety unknown; skin sensitivity/allodynia reported anecdotally" },
        { treatmentSlug: "tirzepatide", mostCommon: "Nausea 33%, diarrhea 20%, vomiting 13%", discontinuationRate: "~5-7%", uniqueRisks: "Limited long-term data; CV outcomes pending" },
        { treatmentSlug: "semaglutide", mostCommon: "Nausea 44%, diarrhea 30%, vomiting 24%", discontinuationRate: "~7-10%", uniqueRisks: "Gallbladder disease 2-3%; ileus (post-marketing); most mature safety data overall" },
        { treatmentSlug: "survodutide", mostCommon: "Nausea ~35%, diarrhea ~20%, vomiting ~15% (Phase 2)", discontinuationRate: "~6-8% (estimated)", uniqueRisks: "Limited data; glucagon component may raise fasting glucose in some patients" },
      ],
    },
    evidenceSummary: {
      rows: [
        { treatmentSlug: "retatrutide", keyTrial: "Phase 2 obesity", n: "338", primaryOutcome: "Weight loss at 48 weeks", result: "24.2% mean (12 mg)", pmid: "37366315" },
        { treatmentSlug: "retatrutide", keyTrial: "Phase 2 diabetes", n: "281", primaryOutcome: "HbA1c and weight change", result: "-2.16% HbA1c; -16.94% weight", pmid: "37385280" },
        { treatmentSlug: "tirzepatide", keyTrial: "SURMOUNT-1", n: "2,539", primaryOutcome: "Weight loss at 72 weeks", result: "22.5% mean (15 mg)", pmid: "35658024" },
        { treatmentSlug: "tirzepatide", keyTrial: "SURMOUNT-5 (vs sema)", n: "751", primaryOutcome: "Superiority in weight change", result: "-20.2% vs -13.7% (p<0.001)", pmid: "40353578" },
        { treatmentSlug: "semaglutide", keyTrial: "STEP 1", n: "1,961", primaryOutcome: "Weight loss at 68 weeks", result: "14.9% mean", pmid: "33567185" },
        { treatmentSlug: "semaglutide", keyTrial: "SELECT", n: "17,604", primaryOutcome: "MACE in non-diabetics", result: "20% reduction (p<0.001)", pmid: "37952131" },
        { treatmentSlug: "survodutide", keyTrial: "Phase 2 obesity", n: "~300", primaryOutcome: "Weight loss at 46 weeks", result: "19.0% mean", pmid: "39453356" },
      ],
    },
    patientSelectionGuide: {
      idealFor: [
        { treatmentSlug: "retatrutide", candidates: ["Patients seeking maximum possible weight loss", "Those with significant liver fat / MASLD", "T2D patients needing strong glycemic control", "Patients willing to enroll in clinical trials"] },
        { treatmentSlug: "tirzepatide", candidates: ["Patients seeking maximum approved weight loss", "T2D patients needing glycemic control", "Those intolerant to semaglutide's GI effects", "Patients wanting weekly dosing with established safety"] },
        { treatmentSlug: "semaglutide", candidates: ["Patients with obesity + established CVD (SELECT indication)", "Those wanting most clinical experience and real-world data", "Patients preferring oral option (Rybelsus)", "T2D patients needing proven CV benefit"] },
        { treatmentSlug: "survodutide", candidates: ["Patients with MASLD/MASH needing liver-specific therapy", "Those interested in GLP-1/glucagon dual mechanism", "Patients willing to enroll in clinical trials", "Patients who may not tolerate GIP agonism"] },
      ],
      avoidIf: [
        { treatmentSlug: "retatrutide", contraindications: ["Not yet available outside clinical trials", "MTC or MEN2 history", "Pregnancy", "Severe GI disease", "Patients needing immediate treatment"] },
        { treatmentSlug: "tirzepatide", contraindications: ["MTC or MEN2 history", "Pregnancy", "Severe GI disease", "Established CVD requiring proven CV benefit (data still pending)"] },
        { treatmentSlug: "semaglutide", contraindications: ["MTC or MEN2 history", "Pregnancy", "Prior pancreatitis", "Severe GI disease"] },
        { treatmentSlug: "survodutide", contraindications: ["Not yet available outside clinical trials", "MTC or MEN2 history", "Pregnancy", "Severe GI disease", "Patients with poorly controlled diabetes and risk of hyperglycemia from glucagon agonism"] },
      ],
    },
    dosingConvenience: {
      rows: [
        { treatmentSlug: "retatrutide", frequency: "Once weekly", route: "Subcutaneous", titrationComplexity: "Moderate (4 steps over ~12 weeks)", injectionDevice: "Investigational pen (prefilled)" },
        { treatmentSlug: "tirzepatide", frequency: "Once weekly", route: "Subcutaneous", titrationComplexity: "Moderate (6 steps over 20 weeks)", injectionDevice: "Single-dose pen or vial" },
        { treatmentSlug: "semaglutide", frequency: "Once weekly (or oral daily)", route: "Subcutaneous or oral", titrationComplexity: "Moderate (4 steps over 16 weeks)", injectionDevice: "Multi-dose pen (injectable); tablet (oral)" },
        { treatmentSlug: "survodutide", frequency: "Once weekly", route: "Subcutaneous", titrationComplexity: "Moderate (Phase 2: 4 steps)", injectionDevice: "Investigational pen (prefilled)" },
      ],
    },
    reviewerId: "sarah-chen-md",
    lastReviewed: "2026-04-28",
    wordCount: 2800,
  },
};

export function getTreatmentComparison(slug: string): TreatmentComparison | undefined {
  return treatmentComparisons[slug];
}

export function getAllTreatmentComparisonSlugs(): string[] {
  return Object.keys(treatmentComparisons);
}

export function hasTreatmentComparison(slug: string): boolean {
  return slug in treatmentComparisons;
}
