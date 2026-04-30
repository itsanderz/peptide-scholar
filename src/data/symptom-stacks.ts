// src/data/symptom-stacks.ts
// Evidence-based symptom-to-peptide mapping
// GENERATED FROM: peptide_symptom_mapping.json
// WARNING: This is for research/informational purposes only. Not medical advice.

export interface SymptomPeptideMapping {
  symptom: string;
  symptomId: string;
  icon: string;
  peptides: {
    name: string;
    slug?: string;
    evidenceQuality: "A" | "B" | "C" | "D";
    evidenceDescription: string;
    keyReferences: string[];
    caveats: string;
    fdaApprovedForIndication: boolean;
    category: string;
  }[];
}

export const symptomMappings: SymptomPeptideMapping[] = [
  {
    symptom: "Poor sleep / insomnia",
    symptomId: "poor-sleep",
    icon: "moon",
    peptides: [
      {
        name: "DSIP (Delta Sleep-Inducing Peptide)",
        slug: "dsip",
        evidenceQuality: "D",
        evidenceDescription:
          "Predominantly preclinical/animal studies; human data is limited to small, older trials and case reports.",
        keyReferences: [
          "PMID: 41490200 (review noting lack of clinical trials)",
          "PMID: 28462721 (animal pharmacological study)",
        ],
        caveats:
          "Not FDA-approved for any indication. Human efficacy for insomnia is unproven. Commercial products are often unregulated.",
        fdaApprovedForIndication: false,
        category: "sleep",
      },
    ],
  },
  {
    symptom: "Erectile dysfunction / sexual dysfunction",
    symptomId: "sexual-dysfunction",
    icon: "heart",
    peptides: [
      {
        name: "Bremelanotide (PT-141)",
        slug: "bremelanotide",
        evidenceQuality: "A",
        evidenceDescription:
          "FDA-approved (Vyleesi) for acquired, generalized hypoactive sexual desire disorder (HSDD) in premenopausal women. Showed promise in early male ED trials but not FDA-approved for men.",
        keyReferences: [
          "FDA Approval: Vyleesi (bremelanotide) June 2019",
          "PMID: 25096243 (review of melanocortin agonists)",
        ],
        caveats:
          "Approved only for women with HSDD. Can cause nausea, flushing, and transient blood pressure increases. Contraindicated in uncontrolled hypertension.",
        fdaApprovedForIndication: true,
        category: "sexual-health",
      },
      {
        name: "Melanotan II",
        slug: "melanotan-ii",
        evidenceQuality: "C",
        evidenceDescription:
          "Case studies and anecdotal reports for erectile function and libido; no rigorous RCTs.",
        keyReferences: ["PMID: 25096243 (review mentioning melanocortin agonists)"],
        caveats:
          "Not FDA-approved. Associated with serious side effects including melanoma risk, priapism, and appetite suppression. Banned or unregulated in many jurisdictions.",
        fdaApprovedForIndication: false,
        category: "sexual-health",
      },
    ],
  },
  {
    symptom: "Hair loss",
    symptomId: "hair-loss",
    icon: "scissors",
    peptides: [
      {
        name: "GHK-Cu (Copper tripeptide-1)",
        slug: "ghk-cu",
        evidenceQuality: "C",
        evidenceDescription:
          "Preclinical and small cosmetic studies suggest stimulation of hair growth and follicle enlargement; robust clinical trials vs minoxidil/finasteride are lacking.",
        keyReferences: [
          "PMID: 38026438 (mouse hair regeneration study)",
          "PMID: 27489425 (review of copper peptides in skin/hair)",
        ],
        caveats:
          "Not FDA-approved for androgenetic alopecia. Evidence is mostly from in-vitro and animal models. Human data is limited to cosmetic formulations.",
        fdaApprovedForIndication: false,
        category: "cosmetic",
      },
    ],
  },
  {
    symptom: "Anxiety",
    symptomId: "anxiety",
    icon: "brain",
    peptides: [
      {
        name: "Selank",
        slug: "selank",
        evidenceQuality: "B",
        evidenceDescription:
          "Small Russian clinical trials suggest anxiolytic effects, possibly via modulation of GABA and monoamine systems. No large international RCTs.",
        keyReferences: [
          "PMID: 34396551 (review noting limited data outside Russia)",
          "PMID: 32342318 (clinical pharmacology review)",
        ],
        caveats:
          "Not FDA-approved. Regulatory status is unclear in many Western countries. Sold as a dietary supplement in some markets, which is scientifically dubious.",
        fdaApprovedForIndication: false,
        category: "cognitive",
      },
    ],
  },
  {
    symptom: "Depression",
    symptomId: "depression",
    icon: "cloud",
    peptides: [
      {
        name: "Selank",
        slug: "selank",
        evidenceQuality: "C",
        evidenceDescription:
          "Very limited clinical data specifically for depression; some Russian studies suggest mood stabilization in anxiety-depressive disorders.",
        keyReferences: ["PMID: 34396551 (review of Russian peptide agents)"],
        caveats: "Not a replacement for standard antidepressant therapy. Evidence is weak and region-specific.",
        fdaApprovedForIndication: false,
        category: "cognitive",
      },
      {
        name: "Semax",
        slug: "semax",
        evidenceQuality: "C",
        evidenceDescription:
          "Primarily studied for cognitive/neuroprotective effects in Russia; direct evidence for major depressive disorder is sparse.",
        keyReferences: ["PMID: 33418449 (neuroprotective mechanisms review)"],
        caveats: "Not FDA-approved. Human depression trials are lacking.",
        fdaApprovedForIndication: false,
        category: "cognitive",
      },
    ],
  },
  {
    symptom: "Cognitive decline / brain fog",
    symptomId: "cognitive-decline",
    icon: "lightbulb",
    peptides: [
      {
        name: "Cerebrolysin",
        slug: "cerebrolysin",
        evidenceQuality: "B",
        evidenceDescription:
          "Multiple meta-analyses and systematic reviews show small-to-moderate cognitive benefits in vascular dementia and Alzheimer's disease. Used clinically in some European and Asian countries.",
        keyReferences: [
          "PMID: 41198594 (2025 systematic review and meta-analysis for vascular cognitive impairment)",
        ],
        caveats:
          "Not FDA-approved in the United States. Requires intravenous administration. Effects are modest and heterogeneous across studies.",
        fdaApprovedForIndication: false,
        category: "cognitive",
      },
      {
        name: "Semax",
        slug: "semax",
        evidenceQuality: "B",
        evidenceDescription:
          "Russian clinical studies suggest benefits in cognitive impairment after stroke and in optic nerve atrophy; no large Western RCTs.",
        keyReferences: [
          "PMID: 40692165 (mechanistic study, animal)",
          "PMID: 31667971 (neuroprotective review)",
        ],
        caveats:
          "Not FDA-approved. Most high-quality evidence is from Russian literature with limited independent replication.",
        fdaApprovedForIndication: false,
        category: "cognitive",
      },
      {
        name: "Dihexa (PNB-0408)",
        slug: "dihexa",
        evidenceQuality: "D",
        evidenceDescription:
          "Preclinical only. Angiotensin IV analog with procognitive properties in rodent models of neurodegeneration; one recent study showed no benefit in a Huntington's model.",
        keyReferences: ["PMID: 38489193 (rat study showing no protection in 3-NP model)"],
        caveats: "No human clinical trials. Highly experimental. Safety profile in humans is unknown.",
        fdaApprovedForIndication: false,
        category: "cognitive",
      },
    ],
  },
  {
    symptom: "Injury / wound healing",
    symptomId: "injury-healing",
    icon: "bandage",
    peptides: [
      {
        name: "BPC-157",
        slug: "bpc-157",
        evidenceQuality: "D",
        evidenceDescription:
          "Extensive preclinical (animal) data for tendon, ligament, muscle, and gastric injury. No published peer-reviewed human clinical trials.",
        keyReferences: [
          "PMID: 41901308 (wound healing review)",
          "PMID: 41471311 (review of BPC-157 in corneal and tendon healing)",
        ],
        caveats:
          "No human efficacy data. Not FDA-approved. Regulatory status is uncertain; widely sold as an unregulated research chemical. Long-term safety unknown.",
        fdaApprovedForIndication: false,
        category: "healing",
      },
      {
        name: "TB-500 (Thymosin beta-4)",
        slug: "tb-500",
        evidenceQuality: "C",
        evidenceDescription:
          "Preclinical studies support wound healing and tissue repair. Limited early-phase human trials showed some signal but were small.",
        keyReferences: [
          "PMID: 41235866 (recent review)",
          "PMID: 39448028 (wound healing research)",
        ],
        caveats:
          "Not FDA-approved for wound healing in the general population. WADA banned in competitive sports. Clinical development has been limited.",
        fdaApprovedForIndication: false,
        category: "healing",
      },
      {
        name: "GHK-Cu",
        slug: "ghk-cu",
        evidenceQuality: "C",
        evidenceDescription:
          "Shown to accelerate wound healing and tissue repair in animal models and some small human skin studies.",
        keyReferences: ["PMID: 27489425 (review of GHK-Cu biological actions)"],
        caveats: "Not FDA-approved as a drug for wound healing. Most evidence is preclinical or cosmetic.",
        fdaApprovedForIndication: false,
        category: "healing",
      },
    ],
  },
  {
    symptom: "Muscle loss / sarcopenia",
    symptomId: "muscle-loss",
    icon: "dumbbell",
    peptides: [
      {
        name: "Tesamorelin",
        slug: "tesamorelin",
        evidenceQuality: "A",
        evidenceDescription:
          "FDA-approved (Egrifta) for HIV-associated lipodystrophy. Increases IGF-1 and lean body mass in HIV-infected patients with central fat accumulation.",
        keyReferences: [
          "FDA Approval: Egrifta (tesamorelin) 2010",
          "PMID: 41545261 (recent review of growth hormone secretagogues)",
        ],
        caveats:
          "Approved only for HIV lipodystrophy. Can raise blood glucose. Expensive and requires daily subcutaneous injection. Not indicated for age-related sarcopenia.",
        fdaApprovedForIndication: true,
        category: "growth-hormone",
      },
      {
        name: "CJC-1295 / Ipamorelin",
        slug: "cjc-1295",
        evidenceQuality: "C",
        evidenceDescription:
          "Growth hormone secretagogues studied in small trials; robust RCTs for sarcopenia are lacking.",
        keyReferences: [
          "PMID: 41490200 (review classifying them as recovery-enhancing agents with lack of clinical trials)",
        ],
        caveats:
          "Not FDA-approved for muscle wasting. May cause water retention, insulin resistance, and elevated cortisol/prolactin.",
        fdaApprovedForIndication: false,
        category: "growth-hormone",
      },
    ],
  },
  {
    symptom: "Fat loss / obesity",
    symptomId: "fat-loss",
    icon: "scale",
    peptides: [
      {
        name: "Semaglutide",
        slug: "semaglutide",
        evidenceQuality: "A",
        evidenceDescription:
          "FDA-approved (Wegovy for obesity; Ozempic for T2D). Large RCTs (STEP program) demonstrate 10-15% body weight loss.",
        keyReferences: [
          "FDA Approval: Wegovy (semaglutide) 2021",
          "PMID: 42036071 (representative STEP trial publication)",
        ],
        caveats:
          "Requires injection. Common GI side effects. Risk of gallbladder disease, pancreatitis, and thyroid C-cell tumors in rodents. Contraindicated in MEN2 or MTC.",
        fdaApprovedForIndication: true,
        category: "metabolic",
      },
      {
        name: "Tirzepatide",
        slug: "tirzepatide",
        evidenceQuality: "A",
        evidenceDescription:
          "FDA-approved (Zepbound for obesity; Mounjaro for T2D). Dual GIP/GLP-1 agonist. Large RCTs show up to 20% weight loss.",
        keyReferences: [
          "FDA Approval: Zepbound (tirzepatide) 2023",
          "PMID: 41953528 (SURMOUNT/STEP-related trial)",
        ],
        caveats:
          "Injectable. GI side effects are common. Long-term data still accumulating. Similar safety warnings to GLP-1 agonists.",
        fdaApprovedForIndication: true,
        category: "metabolic",
      },
      {
        name: "Liraglutide",
        slug: "liraglutide",
        evidenceQuality: "A",
        evidenceDescription:
          "FDA-approved (Saxenda for obesity; Victoza for T2D). Earlier-generation GLP-1 agonist with robust RCT evidence (SCALE trials).",
        keyReferences: [
          "FDA Approval: Saxenda (liraglutide) 2014",
          "PMID: 41947645 (representative SCALE trial)",
        ],
        caveats:
          "Daily injection. Lower efficacy than semaglutide/tirzepatide. GI side effects and gallbladder/pancreatitis risks.",
        fdaApprovedForIndication: true,
        category: "metabolic",
      },
      {
        name: "AOD9604",
        slug: "aod9604",
        evidenceQuality: "C",
        evidenceDescription:
          "Fragment of human growth hormone. Small human trials showed modest fat loss effects; larger confirmatory trials failed or were equivocal.",
        keyReferences: [
          "PMID: 22435392 (clinical study)",
          "PMID: 17971763 (earlier trial)",
        ],
        caveats: "Not FDA-approved for obesity. Evidence is inconsistent. WADA banned in sports.",
        fdaApprovedForIndication: false,
        category: "metabolic",
      },
    ],
  },
  {
    symptom: "Aging / longevity",
    symptomId: "aging",
    icon: "clock",
    peptides: [
      {
        name: "Epithalon (Epitalon)",
        slug: "epithalon",
        evidenceQuality: "B",
        evidenceDescription:
          "Small Russian and Ukrainian clinical trials suggest normalization of melatonin rhythms and potential telomerase activation. No large international RCTs.",
        keyReferences: [
          "PMID: 17969590 (study on melatonin rhythm in elderly)",
          "PMID: 12374906 (related pineal peptide research)",
        ],
        caveats:
          "Not FDA-approved. Longevity claims are extrapolated from small, short-term studies. No mortality data from large trials.",
        fdaApprovedForIndication: false,
        category: "longevity",
      },
      {
        name: "GHK-Cu",
        slug: "ghk-cu",
        evidenceQuality: "D",
        evidenceDescription:
          "Preclinical work on gene expression resetting and tissue repair; no clinical longevity trials.",
        keyReferences: ["PMID: 27489425 (review of biological actions)"],
        caveats: "Longevity claims are speculative. Evidence is entirely preclinical.",
        fdaApprovedForIndication: false,
        category: "longevity",
      },
    ],
  },
  {
    symptom: "Gut issues / IBS",
    symptomId: "gut-issues",
    icon: "utensils",
    peptides: [
      {
        name: "Teduglutide",
        slug: "teduglutide",
        evidenceQuality: "A",
        evidenceDescription:
          "FDA-approved (Gattex) for short bowel syndrome (SBS) dependent on parenteral support. GLP-2 analog that improves intestinal absorption.",
        keyReferences: [
          "FDA Approval: Gattex (teduglutide) 2012",
          "PMID: 41961990 (recent review)",
        ],
        caveats:
          "Approved only for SBS. Can cause intestinal obstruction, gallbladder/biliary tract disease, and fluid overload. Very expensive.",
        fdaApprovedForIndication: true,
        category: "gut",
      },
      {
        name: "BPC-157",
        slug: "bpc-157",
        evidenceQuality: "D",
        evidenceDescription:
          "Extensive animal data for gastric ulcer, inflammatory bowel disease models, and intestinal healing. No human clinical trials.",
        keyReferences: [
          "PMID: 32329684 (gastric ulcer model studies)",
          "PMID: 41471311 (review of cytoprotective effects)",
        ],
        caveats:
          "No human efficacy or safety data. Not FDA-approved. Widely misrepresented as safe due to animal data.",
        fdaApprovedForIndication: false,
        category: "gut",
      },
    ],
  },
  {
    symptom: "Immune weakness",
    symptomId: "immune-weakness",
    icon: "shield",
    peptides: [
      {
        name: "Thymosin alpha-1 (Thymalfasin)",
        slug: "thymosin-alpha-1",
        evidenceQuality: "B",
        evidenceDescription:
          "Approved in some countries for hepatitis B/C and as an immunomodulator. Evidence from oncology and infectious disease settings suggests immune enhancement. Not FDA-approved in the US.",
        keyReferences: [
          "PMID: 41994384 (recent retrospective study in NSCLC)",
          "PMID: 41887933 (immune modulation review)",
        ],
        caveats:
          "Not FDA-approved in the USA. Evidence is mixed depending on indication. Often used off-label in integrative medicine without robust support.",
        fdaApprovedForIndication: false,
        category: "immune",
      },
      {
        name: "Thymalin",
        slug: "thymalin",
        evidenceQuality: "C",
        evidenceDescription:
          "Thymic peptide used in Russian geriatric practice; small studies suggest immune modulation in elderly.",
        keyReferences: ["Khavinson VKh et al. Bull Exp Biol Med. 2002;134(6):563-5."],
        caveats: "Not FDA-approved. Very limited independent replication outside Russia.",
        fdaApprovedForIndication: false,
        category: "immune",
      },
    ],
  },
  {
    symptom: "Chronic inflammation",
    symptomId: "chronic-inflammation",
    icon: "fire",
    peptides: [
      {
        name: "KPV (Lys-Pro-Val)",
        slug: "kpv",
        evidenceQuality: "D",
        evidenceDescription:
          "Alpha-MSH fragment with anti-inflammatory effects in colitis and dermatitis animal models. No human clinical trials.",
        keyReferences: [
          "PMID: 41533788 (recent inflammation research)",
          "PMID: 41241376 (preclinical study)",
        ],
        caveats: "Highly experimental. No human safety or efficacy data.",
        fdaApprovedForIndication: false,
        category: "immune",
      },
      {
        name: "BPC-157",
        slug: "bpc-157",
        evidenceQuality: "D",
        evidenceDescription:
          "Animal studies show anti-inflammatory effects in multiple models (gut, joint, tendon). No human trials.",
        keyReferences: ["PMID: 41901308 (review)"],
        caveats: "No human data. Not approved for any inflammatory condition.",
        fdaApprovedForIndication: false,
        category: "healing",
      },
    ],
  },
  {
    symptom: "Skin aging / wrinkles",
    symptomId: "skin-aging",
    icon: "sparkles",
    peptides: [
      {
        name: "GHK-Cu",
        slug: "ghk-cu",
        evidenceQuality: "B",
        evidenceDescription:
          "Small human trials and extensive cosmetic use suggest improved skin elasticity, firmness, and wrinkle reduction. Mechanism involves collagen synthesis and matrix remodeling.",
        keyReferences: [
          "PMID: 39795193 (review of GHK-Cu in anti-aging)",
          "PMID: 38394858 (skin research)",
        ],
        caveats:
          "Classified as a cosmetic ingredient, not an FDA-approved drug for wrinkles. Evidence quality is moderate at best.",
        fdaApprovedForIndication: false,
        category: "cosmetic",
      },
      {
        name: "Palmitoyl pentapeptide-4 (Matrixyl)",
        slug: "matrixyl",
        evidenceQuality: "C",
        evidenceDescription:
          "In-vitro and small cosmetic studies show stimulation of collagen I, fibronectin, and hyaluronic acid. Large clinical trials are lacking.",
        keyReferences: ["PMID: 40871567 (in-vitro fibroblast study)"],
        caveats: "Cosmetic ingredient only. Not an FDA-approved therapeutic.",
        fdaApprovedForIndication: false,
        category: "cosmetic",
      },
    ],
  },
  {
    symptom: "Low energy / fatigue",
    symptomId: "low-energy",
    icon: "zap",
    peptides: [
      {
        name: "Elamipretide (SS-31)",
        slug: "elamipretide",
        evidenceQuality: "B",
        evidenceDescription:
          "FDA granted accelerated approval (September 2025) for Barth syndrome. Mitochondria-targeted peptide that binds cardiolipin.",
        keyReferences: [
          "FDA Accelerated Approval: elamipretide September 2025",
          "PMID: 41260682 (review of approval and trial data)",
        ],
        caveats:
          "Approved only for Barth syndrome under accelerated approval; confirmatory trial required. Not approved for general fatigue or mitochondrial myopathies.",
        fdaApprovedForIndication: true,
        category: "metabolic",
      },
      {
        name: "MOTS-c",
        slug: "mots-c",
        evidenceQuality: "C",
        evidenceDescription:
          "Mitochondrial-derived peptide. Preclinical and very limited human data suggest metabolic benefits and exercise mimetic effects. No robust RCTs for fatigue.",
        keyReferences: [
          "PMID: 41543486 (human/metabolism research)",
          "PMID: 41520850 (exercise-related study)",
        ],
        caveats: "Experimental. Not FDA-approved. Human safety and efficacy data are minimal.",
        fdaApprovedForIndication: false,
        category: "metabolic",
      },
    ],
  },
  {
    symptom: "Joint pain",
    symptomId: "joint-pain",
    icon: "bone",
    peptides: [
      {
        name: "Collagen peptides",
        slug: "collagen-peptides",
        evidenceQuality: "B",
        evidenceDescription:
          "Mixed evidence. Some earlier RCTs and meta-analyses reported modest pain reduction in knee osteoarthritis, but a recent rigorous RCT (2025) found combined UC-II and hydrolyzed collagen no better than placebo.",
        keyReferences: [
          "PMID: 40897777 (2025 RCT showing no significant benefit vs placebo)",
          "PMID: 39980497 (earlier systematic review)",
        ],
        caveats:
          "Dietary supplement, not FDA-approved drug. Evidence is inconsistent and largely industry-funded. Not a substitute for physical therapy, NSAIDs, or surgery when indicated.",
        fdaApprovedForIndication: false,
        category: "healing",
      },
      {
        name: "BPC-157",
        slug: "bpc-157",
        evidenceQuality: "D",
        evidenceDescription:
          "Strong animal data for tendon, ligament, and joint healing. No human clinical trials.",
        keyReferences: [
          "PMID: 41490200 (orthopedic review noting lack of clinical trials)",
          "PMID: 41471311 (tendon healing review)",
        ],
        caveats: "No human efficacy data. Frequently misused by athletes. Safety unknown.",
        fdaApprovedForIndication: false,
        category: "healing",
      },
    ],
  },
  {
    symptom: "Low testosterone / hormonal imbalance",
    symptomId: "low-testosterone",
    icon: "activity",
    peptides: [
      {
        name: "Gonadorelin (GnRH)",
        slug: "gonadorelin",
        evidenceQuality: "A",
        evidenceDescription:
          "FDA-approved (Factrel) for evaluating hypothalamic-pituitary-gonadal axis function. Can stimulate endogenous testosterone production in hypogonadotropic hypogonadism.",
        keyReferences: [
          "FDA Approval: Factrel (gonadorelin hydrochloride)",
          "PMID: 41765865 (hypogonadism review)",
        ],
        caveats:
          "Requires pulsatile administration to avoid desensitization (downregulation). Impractical for chronic testosterone replacement compared to hCG or testosterone itself.",
        fdaApprovedForIndication: true,
        category: "hormonal",
      },
      {
        name: "Kisspeptin-10",
        slug: "kisspeptin-10",
        evidenceQuality: "B",
        evidenceDescription:
          "Clinical trials demonstrate that kisspeptin stimulates GnRH and subsequent LH/testosterone secretion in men, including those with hypogonadism.",
        keyReferences: [
          "PMID: 30590872 (clinical study of kisspeptin stimulating reproductive hormones)",
          "PMID: 40519205 (recent trial data)",
        ],
        caveats:
          "Investigational. Not FDA-approved for hypogonadism. Requires injection. Optimal dosing and long-term safety are still being determined.",
        fdaApprovedForIndication: false,
        category: "hormonal",
      },
    ],
  },
  {
    symptom: "Memory issues",
    symptomId: "memory-issues",
    icon: "bookmark",
    peptides: [
      {
        name: "Cerebrolysin",
        slug: "cerebrolysin",
        evidenceQuality: "B",
        evidenceDescription:
          "Meta-analyses indicate small-to-moderate benefits in vascular dementia and Alzheimer's disease, particularly on global cognition and functional outcomes.",
        keyReferences: ["PMID: 41198594 (2025 systematic review/meta-analysis)"],
        caveats:
          "Not FDA-approved in the US. Requires IV infusion. Effects are modest and variable.",
        fdaApprovedForIndication: false,
        category: "cognitive",
      },
      {
        name: "Semax",
        slug: "semax",
        evidenceQuality: "B",
        evidenceDescription:
          "Russian clinical studies in vascular dementia and post-stroke cognitive impairment suggest memory and attention benefits.",
        keyReferences: ["PMID: 31667971 (cognitive effects review)"],
        caveats: "Not FDA-approved. Limited Western validation.",
        fdaApprovedForIndication: false,
        category: "cognitive",
      },
    ],
  },
  {
    symptom: "Stress",
    symptomId: "stress",
    icon: "cloud-lightning",
    peptides: [
      {
        name: "Selank",
        slug: "selank",
        evidenceQuality: "B",
        evidenceDescription:
          "Small Russian trials suggest reduction of stress-related symptoms and anxiety, possibly through enkephalinase inhibition and GABA modulation.",
        keyReferences: [
          "PMID: 32651826 (stress-related study)",
          "PMID: 31243679 (mechanistic review)",
        ],
        caveats: "Not FDA-approved. Evidence base is small and geographically limited.",
        fdaApprovedForIndication: false,
        category: "cognitive",
      },
    ],
  },
  {
    symptom: "Athletic performance / recovery",
    symptomId: "athletic-performance",
    icon: "trophy",
    peptides: [
      {
        name: "BPC-157",
        slug: "bpc-157",
        evidenceQuality: "D",
        evidenceDescription:
          "No human clinical trials for athletic performance or recovery. Animal studies suggest accelerated healing of tendon, muscle, and bone injuries.",
        keyReferences: [
          "PMID: 41490200 (review noting lack of clinical trials in orthopedics)",
          "PMID: 41901308 (wound healing review)",
        ],
        caveats:
          "BANNED by WADA. No human efficacy data. Unregulated products are common. Long-term safety unknown.",
        fdaApprovedForIndication: false,
        category: "healing",
      },
      {
        name: "TB-500",
        slug: "tb-500",
        evidenceQuality: "C",
        evidenceDescription:
          "Preclinical and limited early human data on wound healing. No rigorous RCTs for athletic recovery.",
        keyReferences: [
          "PMID: 41235866 (review)",
          "PMID: 39448028 (wound healing data)",
        ],
        caveats:
          "BANNED by WADA. Not FDA-approved for athletic use. Evidence is speculative.",
        fdaApprovedForIndication: false,
        category: "healing",
      },
      {
        name: "ARA-290 (Cibinetide)",
        slug: "ara-290",
        evidenceQuality: "C",
        evidenceDescription:
          "Non-erythropoietic erythropoietin analog. Small Phase 2 trials in neuropathy and sarcoidosis-related fatigue.",
        keyReferences: [
          "PMID: 41933665 (recent review)",
          "PMID: 41659975 (clinical data)",
        ],
        caveats:
          "Not FDA-approved for athletic performance. Evidence for recovery is extremely limited. Experimental status.",
        fdaApprovedForIndication: false,
        category: "healing",
      },
    ],
  },
];

export function getSymptomById(id: string): SymptomPeptideMapping | undefined {
  return symptomMappings.find((s) => s.symptomId === id);
}

export function getAllSymptoms(): SymptomPeptideMapping[] {
  return symptomMappings;
}

export function getPeptidesByEvidence(
  minEvidence: "A" | "B" | "C" | "D"
): { symptom: string; peptide: SymptomPeptideMapping["peptides"][0] }[] {
  const order = { A: 0, B: 1, C: 2, D: 3 };
  const results: { symptom: string; peptide: SymptomPeptideMapping["peptides"][0] }[] = [];
  symptomMappings.forEach((symptom) => {
    symptom.peptides.forEach((peptide) => {
      if (order[peptide.evidenceQuality] <= order[minEvidence]) {
        results.push({ symptom: symptom.symptom, peptide });
      }
    });
  });
  return results;
}
