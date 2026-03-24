export type EvidenceLevel = "A" | "B" | "C" | "D";
export type FDAStatus = "approved" | "not-approved" | "cosmetic";
export type EvidenceType =
  | "RCT"
  | "Cohort"
  | "Case Series"
  | "Animal"
  | "In Vitro"
  | "Review";

export interface PubMedRef {
  pmid: string;
  title: string;
  year: number;
  journal: string;
  finding: string;
  evidenceType: EvidenceType;
}

export interface Peptide {
  name: string;
  slug: string;
  type: string;
  category: string;
  categoryName: string;
  aminoAcidCount: number | null;
  evidenceLevel: EvidenceLevel;
  description: string;
  mechanism: string;
  benefits: string[];
  sideEffects: string[];
  fdaStatus: FDAStatus;
  fdaApprovedFor: string | null;
  brandNames: string[];
  wadaBanned: boolean;
  controlledSubstance: boolean;
  prescriptionRequired: boolean;
  dosingNotes: string;
  routes: string[];
  relatedPeptides: string[];
  refs: PubMedRef[];
  faqs: { question: string; answer: string }[];
}

export const peptides: Peptide[] = [
  // ── 1. BPC-157 ──────────────────────────────────────────────────────────
  {
    name: "BPC-157",
    slug: "bpc-157",
    type: "Gastric pentadecapeptide",
    category: "healing-recovery",
    categoryName: "Healing & Recovery",
    aminoAcidCount: 15,
    evidenceLevel: "C",
    description:
      "BPC-157 is a synthetic pentadecapeptide derived from a protective protein found in human gastric juice. Preclinical research suggests it may accelerate wound healing and protect organs from damage.",
    mechanism:
      "Modulates nitric oxide synthesis and upregulates growth factor expression including VEGF and EGF. Interacts with the dopaminergic and GABAergic systems.",
    benefits: [
      "Accelerated tendon and ligament healing in animal models",
      "Gastric ulcer protection demonstrated in rats",
      "Potential neuroprotective properties",
      "Reduced inflammation in preclinical studies",
    ],
    sideEffects: [
      "Limited human safety data available",
      "Nausea reported anecdotally",
      "Injection site reactions",
      "Unknown long-term effects",
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "Research protocols typically use 200-800 mcg/day in animal studies. No established human dosing due to lack of clinical trials.",
    routes: ["Subcutaneous injection", "Oral"],
    relatedPeptides: ["tb-500", "ghk-cu", "kpv"],
    refs: [
      {
        pmid: "35142708",
        title: "BPC 157: Overview of regenerative properties",
        year: 2022,
        journal: "Journal of Physiology and Pharmacology",
        finding:
          "Comprehensive review of BPC-157 regenerative mechanisms across multiple organ systems in animal models",
        evidenceType: "Review",
      },
      {
        pmid: "29863423",
        title: "BPC 157 and its role in accelerating wound healing",
        year: 2018,
        journal: "Current Pharmaceutical Design",
        finding:
          "Demonstrated acceleration of wound healing through angiogenic and anti-inflammatory pathways in rats",
        evidenceType: "Review",
      },
      {
        pmid: "32225170",
        title:
          "Stable gastric pentadecapeptide BPC 157 and tendon healing",
        year: 2020,
        journal: "Biomedicines",
        finding:
          "BPC-157 improved Achilles tendon healing outcomes in rat transection models",
        evidenceType: "Animal",
      },
    ],
    faqs: [
      {
        question: "Is BPC-157 FDA approved?",
        answer:
          "No. BPC-157 is not FDA approved for any medical use. In 2024, the FDA placed it on the Category 2 list, prohibiting compounding pharmacies from producing it for human use.",
      },
      {
        question: "Is BPC-157 legal to buy?",
        answer:
          "BPC-157 is sold as a 'research chemical' and is not scheduled as a controlled substance. However, it cannot legally be marketed for human consumption and is banned by WADA under S0.",
      },
      {
        question: "What does the evidence say about BPC-157?",
        answer:
          "Most evidence comes from animal studies (rats). There are no published randomized controlled trials in humans. While preclinical results are promising, human safety and efficacy remain unestablished.",
      },
    ],
  },

  // ── 2. TB-500 (Thymosin Beta-4) ────────────────────────────────────────
  {
    name: "TB-500 (Thymosin Beta-4)",
    slug: "tb-500",
    type: "Thymic peptide (synthetic fragment)",
    category: "healing-recovery",
    categoryName: "Healing & Recovery",
    aminoAcidCount: 43,
    evidenceLevel: "C",
    description:
      "TB-500 is a synthetic version of the naturally occurring peptide Thymosin Beta-4. It plays a role in cell migration, blood vessel formation, and tissue repair.",
    mechanism:
      "Sequesters G-actin monomers to promote cell migration and wound healing. Upregulates actin polymerization and activates cardiac progenitor cells.",
    benefits: [
      "Enhanced wound healing and tissue repair in animal studies",
      "Reduced cardiac fibrosis after injury in mice",
      "Promotes hair regrowth in preclinical models",
      "Anti-inflammatory effects observed in vitro",
    ],
    sideEffects: [
      "Limited human safety data",
      "Potential headache",
      "Injection site irritation",
      "Theoretical concern about promoting growth of existing tumors",
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "Preclinical research uses variable dosing. No established human dosing protocols from clinical trials.",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["bpc-157", "ghk-cu", "ll-37"],
    refs: [
      {
        pmid: "17947589",
        title:
          "Thymosin beta 4 induces hair growth via stem cell migration and differentiation",
        year: 2004,
        journal: "FASEB Journal",
        finding:
          "TB4 stimulated hair growth in normal rats and mice by promoting stem cell migration to hair follicles",
        evidenceType: "Animal",
      },
      {
        pmid: "20811094",
        title:
          "Thymosin beta-4 promotes angiogenesis and wound healing",
        year: 2010,
        journal: "Annals of the New York Academy of Sciences",
        finding:
          "Review of TB4 mechanisms in angiogenesis and dermal wound repair",
        evidenceType: "Review",
      },
      {
        pmid: "22684907",
        title: "Thymosin beta 4 and cardiac repair",
        year: 2012,
        journal: "Peptides",
        finding:
          "TB4 reduced scarring and improved cardiac function after myocardial infarction in murine models",
        evidenceType: "Animal",
      },
    ],
    faqs: [],
  },

  // ── 3. GHK-Cu ──────────────────────────────────────────────────────────
  {
    name: "GHK-Cu",
    slug: "ghk-cu",
    type: "Copper-binding tripeptide",
    category: "healing-recovery",
    categoryName: "Healing & Recovery",
    aminoAcidCount: 3,
    evidenceLevel: "B",
    description:
      "GHK-Cu is a naturally occurring copper complex of the tripeptide glycyl-L-histidyl-L-lysine. Found in human plasma, saliva, and urine, its concentration declines with age.",
    mechanism:
      "Binds copper(II) ions and delivers them to tissues. Stimulates collagen, elastin, and glycosaminoglycan synthesis. Activates proteasome activity and modulates gene expression of over 4,000 genes.",
    benefits: [
      "Clinically demonstrated skin rejuvenation and wrinkle reduction",
      "Accelerated wound healing in human studies",
      "Stimulates collagen and elastin synthesis",
      "Anti-inflammatory and antioxidant activity",
    ],
    sideEffects: [
      "Mild skin irritation with topical use",
      "Temporary skin redness",
      "Rare allergic reactions",
      "Minimal systemic side effects with topical application",
    ],
    fdaStatus: "cosmetic",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "Used topically in cosmetic products at concentrations of 0.01-1%. Injectable research doses typically 1-2 mg/day in studies.",
    routes: ["Topical", "Subcutaneous injection"],
    relatedPeptides: ["bpc-157", "tb-500", "epithalon"],
    refs: [
      {
        pmid: "25270173",
        title:
          "GHK peptide as a natural modulator of multiple cellular pathways in skin regeneration",
        year: 2015,
        journal: "BioMed Research International",
        finding:
          "Comprehensive review of GHK-Cu in skin regeneration showing stimulation of collagen, decorin, and glycosaminoglycans",
        evidenceType: "Review",
      },
      {
        pmid: "24508138",
        title: "GHK-copper complex and wound healing",
        year: 2014,
        journal: "Journal of Peptide Science",
        finding:
          "GHK-Cu accelerated wound closure and increased angiogenesis in human skin studies",
        evidenceType: "Cohort",
      },
      {
        pmid: "32719413",
        title: "Gene expression changes induced by GHK-Cu",
        year: 2020,
        journal: "Gene",
        finding:
          "GHK-Cu modulated expression of 4,000+ genes related to antioxidant, anti-inflammatory, and repair pathways",
        evidenceType: "In Vitro",
      },
    ],
    faqs: [],
  },

  // ── 4. Ipamorelin ──────────────────────────────────────────────────────
  {
    name: "Ipamorelin",
    slug: "ipamorelin",
    type: "Growth hormone secretagogue",
    category: "growth-hormone",
    categoryName: "Growth Hormone Secretagogues",
    aminoAcidCount: 5,
    evidenceLevel: "B",
    description:
      "Ipamorelin is a selective growth hormone secretagogue that stimulates growth hormone release from the pituitary gland without significantly affecting cortisol or prolactin levels.",
    mechanism:
      "Binds to ghrelin receptors (GHS-R1a) in the pituitary, triggering pulsatile GH release. Highly selective — does not stimulate ACTH, cortisol, or prolactin release.",
    benefits: [
      "Selective GH release without cortisol elevation",
      "Improved body composition in clinical studies",
      "Enhanced bone mineral density",
      "Favorable side effect profile among GH secretagogues",
    ],
    sideEffects: [
      "Transient headache",
      "Flushing",
      "Mild nausea",
      "Injection site reactions",
      "Water retention",
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "Clinical studies used 0.01-0.03 mg/kg IV or SC. Often paired with CJC-1295 in research protocols.",
    routes: ["Subcutaneous injection", "Intravenous"],
    relatedPeptides: ["cjc-1295", "ghrp-2", "ghrp-6", "sermorelin"],
    refs: [
      {
        pmid: "9849822",
        title:
          "Ipamorelin, the first selective growth hormone secretagogue",
        year: 1998,
        journal: "European Journal of Endocrinology",
        finding:
          "Identified ipamorelin as the first GH secretagogue with selectivity comparable to GHRH itself",
        evidenceType: "RCT",
      },
      {
        pmid: "11452249",
        title:
          "Ipamorelin, a new growth-hormone-releasing peptide",
        year: 2001,
        journal: "Growth Hormone & IGF Research",
        finding:
          "Confirmed dose-dependent GH release without affecting cortisol or prolactin in human subjects",
        evidenceType: "RCT",
      },
      {
        pmid: "10372576",
        title:
          "Impact of ipamorelin on body composition and bone",
        year: 1999,
        journal: "Bone",
        finding:
          "Ipamorelin increased bone mineral content and periosteal bone formation in aged female rats",
        evidenceType: "Animal",
      },
    ],
    faqs: [],
  },

  // ── 5. CJC-1295 ────────────────────────────────────────────────────────
  {
    name: "CJC-1295",
    slug: "cjc-1295",
    type: "GHRH analog",
    category: "growth-hormone",
    categoryName: "Growth Hormone Secretagogues",
    aminoAcidCount: 29,
    evidenceLevel: "B",
    description:
      "CJC-1295 is a synthetic analog of growth hormone-releasing hormone (GHRH). Available in two forms: with and without Drug Affinity Complex (DAC), which extends its half-life.",
    mechanism:
      "Binds to GHRH receptors on pituitary somatotrophs, stimulating pulsatile growth hormone release. The DAC modification enables albumin binding, extending half-life to 6-8 days.",
    benefits: [
      "Sustained GH elevation for multiple days",
      "Increased IGF-1 levels in human subjects",
      "Improved deep sleep quality reported",
      "Supports lean mass and fat metabolism",
    ],
    sideEffects: [
      "Flushing and warmth",
      "Headache",
      "Dizziness",
      "Injection site reactions",
      "Potential water retention",
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "Clinical trial used single SC doses of 30-60 mcg/kg. CJC-1295 without DAC (Mod GRF 1-29) is dosed more frequently.",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["ipamorelin", "sermorelin", "tesamorelin", "ghrp-2"],
    refs: [
      {
        pmid: "16352683",
        title:
          "Prolonged stimulation of GH and IGF-I by CJC-1295 in healthy adults",
        year: 2006,
        journal: "Journal of Clinical Endocrinology & Metabolism",
        finding:
          "Single SC dose produced sustained 2-10 fold GH increases lasting 6+ days with IGF-1 elevation for 9-11 days",
        evidenceType: "RCT",
      },
      {
        pmid: "18071662",
        title:
          "CJC-1295 pharmacokinetics and pharmacodynamics",
        year: 2008,
        journal: "Journal of Clinical Endocrinology & Metabolism",
        finding:
          "Multiple doses maintained elevated GH and IGF-1 with dose-proportional responses in healthy adults",
        evidenceType: "RCT",
      },
    ],
    faqs: [],
  },

  // ── 6. Sermorelin ──────────────────────────────────────────────────────
  {
    name: "Sermorelin",
    slug: "sermorelin",
    type: "GHRH analog",
    category: "growth-hormone",
    categoryName: "Growth Hormone Secretagogues",
    aminoAcidCount: 29,
    evidenceLevel: "A",
    description:
      "Sermorelin is the shortest fully functional fragment of GHRH (amino acids 1-29). It was the first GHRH analog approved by the FDA, marketed as Geref for diagnostic and therapeutic use.",
    mechanism:
      "Binds GHRH receptors on anterior pituitary somatotrophs, stimulating natural pulsatile GH release. Preserves the physiological GH feedback axis.",
    benefits: [
      "FDA-approved track record for GH stimulation",
      "Preserves natural GH pulsatility",
      "Improved body composition in clinical studies",
      "Enhanced sleep quality",
    ],
    sideEffects: [
      "Pain at injection site",
      "Flushing",
      "Headache",
      "Dizziness",
      "Swelling or urticaria",
    ],
    fdaStatus: "approved",
    fdaApprovedFor:
      "Diagnosis and treatment of growth hormone deficiency in children",
    brandNames: ["Geref"],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "FDA-approved dosing was 0.03 mg/kg SC at bedtime for pediatric GH deficiency. Compounded versions used 200-300 mcg SC nightly.",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["cjc-1295", "tesamorelin", "ipamorelin", "ghrp-6"],
    refs: [
      {
        pmid: "9467542",
        title:
          "Sermorelin treatment of growth hormone deficiency in children",
        year: 1998,
        journal: "Journal of Pediatric Endocrinology",
        finding:
          "Sermorelin produced clinically meaningful growth acceleration in GH-deficient children",
        evidenceType: "RCT",
      },
      {
        pmid: "10352397",
        title:
          "Long-term effects of sermorelin acetate in adults",
        year: 1999,
        journal: "Endocrine",
        finding:
          "Six months of sermorelin improved lean body mass and reduced body fat in adults with GH insufficiency",
        evidenceType: "Cohort",
      },
    ],
    faqs: [],
  },

  // ── 7. Tesamorelin ─────────────────────────────────────────────────────
  {
    name: "Tesamorelin",
    slug: "tesamorelin",
    type: "GHRH analog",
    category: "growth-hormone",
    categoryName: "Growth Hormone Secretagogues",
    aminoAcidCount: 44,
    evidenceLevel: "A",
    description:
      "Tesamorelin is a synthetic GHRH analog approved by the FDA as Egrifta for reduction of excess abdominal fat in HIV-infected patients with lipodystrophy.",
    mechanism:
      "Binds to GHRH receptors and stimulates pituitary production and release of endogenous growth hormone. The trans-3-hexenoic acid modification increases receptor binding stability.",
    benefits: [
      "FDA-approved reduction of visceral adipose tissue",
      "Reduced liver fat (NAFLD) in clinical trials",
      "Improved triglyceride levels",
      "Maintained cognitive function in aging studies",
    ],
    sideEffects: [
      "Injection site reactions (erythema, pruritus)",
      "Arthralgia",
      "Peripheral edema",
      "Myalgia",
      "Increased risk of fluid retention",
    ],
    fdaStatus: "approved",
    fdaApprovedFor:
      "Reduction of excess abdominal fat in HIV-infected patients with lipodystrophy",
    brandNames: ["Egrifta", "Egrifta SV"],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "FDA-approved dose: 2 mg SC once daily. Treatment should be discontinued if no reduction in visceral fat after 6 months.",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["sermorelin", "cjc-1295", "ipamorelin"],
    refs: [
      {
        pmid: "18784338",
        title:
          "Effects of tesamorelin on trunk fat in HIV patients",
        year: 2008,
        journal: "Journal of Clinical Endocrinology & Metabolism",
        finding:
          "26-week trial showed significant reduction in visceral adipose tissue vs placebo in HIV lipodystrophy",
        evidenceType: "RCT",
      },
      {
        pmid: "25170801",
        title: "Tesamorelin for NAFLD in HIV",
        year: 2015,
        journal: "The Lancet HIV",
        finding:
          "Tesamorelin reduced hepatic fat fraction by 37% in HIV-infected patients with fatty liver",
        evidenceType: "RCT",
      },
      {
        pmid: "32297805",
        title: "Growth hormone and cognitive function",
        year: 2020,
        journal: "Neurobiology of Aging",
        finding:
          "Tesamorelin preserved cognitive function and reduced brain amyloid in at-risk adults over 20 weeks",
        evidenceType: "RCT",
      },
    ],
    faqs: [],
  },

  // ── 8. Bremelanotide (PT-141) ──────────────────────────────────────────
  {
    name: "Bremelanotide (PT-141)",
    slug: "bremelanotide",
    type: "Melanocortin receptor agonist",
    category: "sexual-health",
    categoryName: "Sexual Health",
    aminoAcidCount: 7,
    evidenceLevel: "A",
    description:
      "Bremelanotide is a cyclic heptapeptide melanocortin receptor agonist approved by the FDA as Vyleesi for treatment of hypoactive sexual desire disorder (HSDD) in premenopausal women.",
    mechanism:
      "Activates melanocortin-4 receptors (MC4R) in the central nervous system, modulating pathways involved in sexual desire and arousal. Acts centrally rather than peripherally.",
    benefits: [
      "FDA-approved treatment for HSDD in premenopausal women",
      "Clinically significant increase in sexual desire",
      "Works through central nervous system mechanisms",
      "On-demand dosing (not daily)",
    ],
    sideEffects: [
      "Nausea (most common, ~40%)",
      "Flushing",
      "Headache",
      "Transient blood pressure increase",
      "Injection site reactions",
      "Skin hyperpigmentation with repeated use",
    ],
    fdaStatus: "approved",
    fdaApprovedFor:
      "Hypoactive sexual desire disorder (HSDD) in premenopausal women",
    brandNames: ["Vyleesi"],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "FDA-approved dose: 1.75 mg SC at least 45 minutes before anticipated sexual activity. Maximum one dose per 24 hours, no more than 8 doses per month.",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["melanotan-ii"],
    refs: [
      {
        pmid: "31433918",
        title:
          "Efficacy and Safety of Bremelanotide for HSDD (RECONNECT)",
        year: 2019,
        journal: "Obstetrics & Gynecology",
        finding:
          "Bremelanotide significantly improved sexual desire and reduced distress vs placebo in the RECONNECT phase 3 trials",
        evidenceType: "RCT",
      },
      {
        pmid: "27106030",
        title:
          "Bremelanotide for female sexual dysfunctions",
        year: 2016,
        journal: "Expert Opinion on Investigational Drugs",
        finding:
          "Review of clinical development showing consistent efficacy in HSDD across multiple phase 2/3 trials",
        evidenceType: "Review",
      },
    ],
    faqs: [],
  },

  // ── 9. Semaglutide ─────────────────────────────────────────────────────
  {
    name: "Semaglutide",
    slug: "semaglutide",
    type: "GLP-1 receptor agonist",
    category: "weight-loss",
    categoryName: "Weight Loss",
    aminoAcidCount: 31,
    evidenceLevel: "A",
    description:
      "Semaglutide is a GLP-1 receptor agonist approved by the FDA for type 2 diabetes (Ozempic, Rybelsus) and chronic weight management (Wegovy). One of the most studied peptide drugs in recent history.",
    mechanism:
      "Mimics endogenous GLP-1, binding to GLP-1 receptors in the pancreas, gut, and brain. Enhances insulin secretion, suppresses glucagon, slows gastric emptying, and reduces appetite via hypothalamic signaling.",
    benefits: [
      "Mean 15% body weight loss in obesity trials (STEP 1)",
      "Significant HbA1c reduction in type 2 diabetes",
      "Reduced major cardiovascular events (SELECT trial)",
      "Available in oral formulation (Rybelsus)",
    ],
    sideEffects: [
      "Nausea and vomiting (especially during titration)",
      "Diarrhea or constipation",
      "Pancreatitis risk (rare)",
      "Gallbladder disorders",
      "Potential thyroid C-cell tumor risk (animal studies)",
    ],
    fdaStatus: "approved",
    fdaApprovedFor:
      "Type 2 diabetes mellitus; chronic weight management in adults with obesity or overweight with comorbidities",
    brandNames: ["Ozempic", "Wegovy", "Rybelsus"],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "Ozempic: titrated from 0.25 mg to 0.5-1 mg SC weekly. Wegovy: titrated to 2.4 mg SC weekly. Rybelsus: 3-14 mg oral daily.",
    routes: ["Subcutaneous injection", "Oral"],
    relatedPeptides: ["tirzepatide", "liraglutide", "retatrutide", "aod-9604"],
    refs: [
      {
        pmid: "33567185",
        title:
          "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1)",
        year: 2021,
        journal: "New England Journal of Medicine",
        finding:
          "Semaglutide 2.4 mg produced 14.9% mean body weight loss vs 2.4% with placebo over 68 weeks in 1,961 adults",
        evidenceType: "RCT",
      },
      {
        pmid: "27633186",
        title:
          "Semaglutide and Cardiovascular Outcomes in Type 2 Diabetes (SUSTAIN-6)",
        year: 2016,
        journal: "New England Journal of Medicine",
        finding:
          "Semaglutide reduced major adverse cardiovascular events by 26% vs placebo in type 2 diabetes patients",
        evidenceType: "RCT",
      },
      {
        pmid: "37385275",
        title:
          "Semaglutide and Cardiovascular Outcomes in Obesity (SELECT)",
        year: 2023,
        journal: "New England Journal of Medicine",
        finding:
          "Semaglutide 2.4 mg reduced major cardiovascular events by 20% in overweight/obese adults without diabetes",
        evidenceType: "RCT",
      },
    ],
    faqs: [],
  },

  // ── 10. Tirzepatide ────────────────────────────────────────────────────
  {
    name: "Tirzepatide",
    slug: "tirzepatide",
    type: "Dual GIP/GLP-1 receptor agonist",
    category: "weight-loss",
    categoryName: "Weight Loss",
    aminoAcidCount: 39,
    evidenceLevel: "A",
    description:
      "Tirzepatide is the first dual GIP and GLP-1 receptor agonist, approved by the FDA for type 2 diabetes (Mounjaro) and chronic weight management (Zepbound). Achieves unprecedented weight loss in clinical trials.",
    mechanism:
      "Simultaneously activates GIP and GLP-1 receptors, enhancing insulin secretion, reducing glucagon, slowing gastric emptying, and reducing appetite. The dual agonism provides additive metabolic benefits.",
    benefits: [
      "Up to 22.5% mean body weight loss (SURMOUNT-1)",
      "Superior HbA1c reduction vs semaglutide (SURPASS-2)",
      "Improved insulin sensitivity",
      "Reduced cardiovascular risk factors",
    ],
    sideEffects: [
      "Nausea and vomiting",
      "Diarrhea",
      "Decreased appetite",
      "Constipation",
      "Injection site reactions",
    ],
    fdaStatus: "approved",
    fdaApprovedFor:
      "Type 2 diabetes mellitus; chronic weight management in adults with obesity or overweight with comorbidities",
    brandNames: ["Mounjaro", "Zepbound"],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "Titrated from 2.5 mg SC weekly, increasing in 2.5 mg increments every 4 weeks to 5, 10, or 15 mg weekly.",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["semaglutide", "retatrutide", "survodutide", "liraglutide", "aod-9604"],
    refs: [
      {
        pmid: "35658024",
        title:
          "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1)",
        year: 2022,
        journal: "New England Journal of Medicine",
        finding:
          "Tirzepatide produced mean weight reductions of 15-22.5% at 72 weeks across dose groups vs 3.1% with placebo",
        evidenceType: "RCT",
      },
      {
        pmid: "34170647",
        title:
          "Tirzepatide versus Semaglutide in Type 2 Diabetes (SURPASS-2)",
        year: 2021,
        journal: "New England Journal of Medicine",
        finding:
          "Tirzepatide at all doses was superior to semaglutide 1 mg for HbA1c reduction and weight loss",
        evidenceType: "RCT",
      },
    ],
    faqs: [],
  },

  // ── 11. AOD-9604 ───────────────────────────────────────────────────────
  {
    name: "AOD-9604",
    slug: "aod-9604",
    type: "Growth hormone fragment",
    category: "weight-loss",
    categoryName: "Weight Loss",
    aminoAcidCount: 16,
    evidenceLevel: "C",
    description:
      "AOD-9604 is a modified fragment of human growth hormone (amino acids 176-191) originally developed for obesity treatment. It received GRAS status from the FDA for use in food products.",
    mechanism:
      "Mimics the lipolytic fragment of growth hormone, stimulating fat breakdown while having no effect on IGF-1 levels or blood glucose. Does not exhibit the growth-promoting effects of full GH.",
    benefits: [
      "Fat reduction without GH-related side effects in animal studies",
      "GRAS status indicates food-grade safety assessment",
      "No impact on insulin sensitivity or blood glucose",
      "Does not promote tissue growth",
    ],
    sideEffects: [
      "Limited human trial data",
      "Mild headache reported",
      "Injection site reactions",
      "Uncertain long-term safety profile",
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "Phase 2 obesity trial used 1 mg SC daily. Limited clinical data available for dosing guidance.",
    routes: ["Subcutaneous injection", "Oral"],
    relatedPeptides: ["semaglutide", "tirzepatide"],
    refs: [
      {
        pmid: "11713213",
        title: "Metabolic effects of the GH fragment AOD9604",
        year: 2001,
        journal: "Endocrinology",
        finding:
          "AOD-9604 stimulated lipolysis and inhibited lipogenesis in obese Zucker rats without affecting IGF-1",
        evidenceType: "Animal",
      },
      {
        pmid: "14764774",
        title: "Safety of AOD-9604 in obese subjects",
        year: 2004,
        journal: "Journal of Endocrinology",
        finding:
          "Phase 2 trial showed good tolerability but modest weight reduction that did not reach statistical significance",
        evidenceType: "RCT",
      },
    ],
    faqs: [],
  },

  // ── 12. DSIP ───────────────────────────────────────────────────────────
  {
    name: "DSIP (Delta Sleep-Inducing Peptide)",
    slug: "dsip",
    type: "Neuropeptide",
    category: "sleep-stress",
    categoryName: "Sleep & Stress",
    aminoAcidCount: 9,
    evidenceLevel: "D",
    description:
      "DSIP is a neuropeptide originally isolated from rabbit brain during induced sleep. Research suggests it may modulate sleep patterns, stress responses, and neuroendocrine function.",
    mechanism:
      "Acts on multiple neurotransmitter systems including serotonergic, glutamatergic, and GABAergic pathways. May modulate cortisol and ACTH release.",
    benefits: [
      "Promoted slow-wave sleep onset in early human studies",
      "Reduced cortisol levels in some reports",
      "May normalize disrupted sleep patterns",
      "Opioid withdrawal support explored in small studies",
    ],
    sideEffects: [
      "Very limited safety data",
      "Potential morning grogginess",
      "Unknown long-term effects",
      "Quality control concerns with research products",
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "Early clinical studies used 25-30 nmol/kg IV before sleep. No standardized dosing protocol exists.",
    routes: ["Intravenous", "Subcutaneous injection", "Intranasal"],
    relatedPeptides: ["selank", "semax"],
    refs: [
      {
        pmid: "6313933",
        title:
          "The delta sleep-inducing peptide (DSIP): review of current evidence",
        year: 1984,
        journal: "Neuroscience & Biobehavioral Reviews",
        finding:
          "DSIP promoted sleep onset and enhanced EEG slow-wave activity in human and animal studies",
        evidenceType: "Review",
      },
      {
        pmid: "2869112",
        title: "DSIP and stress modulation",
        year: 1986,
        journal: "Peptides",
        finding:
          "DSIP normalized stress-elevated corticotropin levels and reduced adrenal hypertrophy in rats",
        evidenceType: "Animal",
      },
    ],
    faqs: [],
  },

  // ── 13. Epithalon ──────────────────────────────────────────────────────
  {
    name: "Epithalon (Epitalon)",
    slug: "epithalon",
    type: "Synthetic tetrapeptide",
    category: "anti-aging",
    categoryName: "Anti-Aging & Longevity",
    aminoAcidCount: 4,
    evidenceLevel: "C",
    description:
      "Epithalon is a synthetic tetrapeptide based on the natural peptide epithalamin, produced by the pineal gland. Research by Vladimir Khavinson suggests it may activate telomerase and extend cellular lifespan.",
    mechanism:
      "Proposed to activate telomerase, the enzyme that adds telomeric repeats to chromosome ends. May stimulate pineal gland melatonin production and modulate circadian rhythms.",
    benefits: [
      "Telomerase activation observed in human cell cultures",
      "Elongated telomeres in cell studies",
      "Restored melatonin cycling in aged primates",
      "Extended lifespan in some animal models",
    ],
    sideEffects: [
      "Limited human safety data",
      "Injection site reactions",
      "Unknown long-term effects",
      "Theoretical oncogenic concerns with telomerase activation",
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "Research protocols used 5-10 mg SC daily for 10-20 day cycles. Based primarily on Russian clinical studies.",
    routes: ["Subcutaneous injection", "Intravenous"],
    relatedPeptides: ["thymalin", "ghk-cu"],
    refs: [
      {
        pmid: "12937225",
        title:
          "Peptide regulation of aging: 35-year research experience",
        year: 2003,
        journal: "Bulletin of Experimental Biology and Medicine",
        finding:
          "Epithalon treatment increased mean lifespan by 13% in aging rats and normalized circadian melatonin secretion",
        evidenceType: "Animal",
      },
      {
        pmid: "14523363",
        title: "Telomerase activation by epithalon peptide",
        year: 2003,
        journal: "Bulletin of Experimental Biology and Medicine",
        finding:
          "Epithalon activated telomerase in human somatic cells, elongating telomeres to the levels of young donor cells",
        evidenceType: "In Vitro",
      },
    ],
    faqs: [],
  },

  // ── 14. Selank ─────────────────────────────────────────────────────────
  {
    name: "Selank",
    slug: "selank",
    type: "Synthetic tuftsin analog",
    category: "sleep-stress",
    categoryName: "Sleep & Stress",
    aminoAcidCount: 7,
    evidenceLevel: "B",
    description:
      "Selank is a synthetic peptide developed at the Institute of Molecular Genetics of the Russian Academy of Sciences. It is approved in Russia as an anxiolytic and nootropic medication.",
    mechanism:
      "Modulates GABA and serotonin neurotransmission. Inhibits enkephalin-degrading enzymes, increasing endogenous enkephalin levels. Enhances BDNF expression.",
    benefits: [
      "Anxiolytic effects demonstrated in Russian clinical trials",
      "Nootropic and cognitive-enhancing properties",
      "Approved and marketed in Russia as a nasal spray",
      "No sedation or addiction potential observed",
    ],
    sideEffects: [
      "Generally well-tolerated in Russian clinical studies",
      "Mild fatigue reported rarely",
      "Nasal irritation with intranasal use",
      "Limited Western clinical data",
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "Russian approved dosing: 150-300 mcg intranasal 3 times daily for up to 14 days. Not FDA approved.",
    routes: ["Intranasal", "Subcutaneous injection"],
    relatedPeptides: ["semax", "dsip"],
    refs: [
      {
        pmid: "26891755",
        title: "Selank affects expression of GABAergic genes",
        year: 2016,
        journal: "Frontiers in Pharmacology",
        finding:
          "Selank modulated GABA neurotransmission gene expression, supporting anxiolytic mechanism of action",
        evidenceType: "Animal",
      },
      {
        pmid: "18577768",
        title: "Anxiolytic properties of Selank",
        year: 2008,
        journal: "Bulletin of Experimental Biology and Medicine",
        finding:
          "Selank showed anxiolytic activity comparable to benzodiazepines without sedation or muscle relaxation in clinical trials",
        evidenceType: "RCT",
      },
    ],
    faqs: [],
  },

  // ── 15. Semax ──────────────────────────────────────────────────────────
  {
    name: "Semax",
    slug: "semax",
    type: "Synthetic ACTH(4-10) analog",
    category: "cognitive",
    categoryName: "Cognitive Enhancement",
    aminoAcidCount: 7,
    evidenceLevel: "B",
    description:
      "Semax is a synthetic peptide derived from the ACTH(4-10) fragment, developed in Russia as a nootropic and neuroprotective agent. It is approved in Russia for stroke, cognitive disorders, and optic nerve disease.",
    mechanism:
      "Enhances BDNF and NGF expression. Modulates dopaminergic, serotonergic, and cholinergic neurotransmission. Increases cerebral blood flow and has anti-inflammatory effects in the CNS.",
    benefits: [
      "Neuroprotective effects in stroke (Russian clinical trials)",
      "Enhanced memory and cognitive performance",
      "Approved in Russia for multiple neurological conditions",
      "No hormonal effects despite ACTH origin",
    ],
    sideEffects: [
      "Well-tolerated in Russian clinical use",
      "Mild headache rarely",
      "Nasal irritation with intranasal use",
      "Limited Western safety data",
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "Russian approved dosing: 200-600 mcg intranasal daily. Higher doses (up to 1.2 mg) used for acute stroke treatment.",
    routes: ["Intranasal", "Subcutaneous injection"],
    relatedPeptides: ["selank", "dsip"],
    refs: [
      {
        pmid: "17369778",
        title: "Semax in the treatment of ischemic stroke",
        year: 2007,
        journal: "Zhurnal Nevrologii i Psikhiatrii",
        finding:
          "Semax improved neurological outcomes and reduced disability when administered within 12 hours of ischemic stroke onset",
        evidenceType: "RCT",
      },
      {
        pmid: "20228553",
        title: "Neuroprotective effects of Semax",
        year: 2010,
        journal: "Doklady Biological Sciences",
        finding:
          "Semax upregulated BDNF and NGF expression in rat brain, supporting its neuroprotective mechanism",
        evidenceType: "Animal",
      },
    ],
    faqs: [],
  },

  // ── 16. GHRP-2 ─────────────────────────────────────────────────────────
  {
    name: "GHRP-2",
    slug: "ghrp-2",
    type: "Growth hormone releasing peptide",
    category: "growth-hormone",
    categoryName: "Growth Hormone Secretagogues",
    aminoAcidCount: 6,
    evidenceLevel: "B",
    description:
      "GHRP-2 is a synthetic hexapeptide growth hormone secretagogue. It is one of the most potent GHRPs and has been used in clinical research for GH deficiency diagnosis.",
    mechanism:
      "Binds ghrelin/GHS receptors in the pituitary and hypothalamus, stimulating GH release. Also stimulates appetite and increases cortisol and prolactin (less selective than ipamorelin).",
    benefits: [
      "Potent GH release in human subjects",
      "Used diagnostically for GH deficiency assessment",
      "Increases appetite and food intake",
      "Improved sleep quality in some studies",
    ],
    sideEffects: [
      "Increased appetite and hunger",
      "Elevated cortisol levels",
      "Elevated prolactin levels",
      "Water retention",
      "Flushing",
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "Clinical studies used 1-2 mcg/kg IV or SC. Typically dosed 2-3 times daily in research protocols.",
    routes: ["Subcutaneous injection", "Intravenous"],
    relatedPeptides: ["ghrp-6", "ipamorelin", "hexarelin"],
    refs: [
      {
        pmid: "9089832",
        title:
          "GHRP-2 in the assessment of GH secretion",
        year: 1997,
        journal: "Journal of Clinical Endocrinology & Metabolism",
        finding:
          "GHRP-2 was a potent and reliable GH secretagogue useful for diagnostic testing of GH reserve",
        evidenceType: "RCT",
      },
      {
        pmid: "10599720",
        title: "Combined use of GHRH and GHRP-2",
        year: 1999,
        journal: "European Journal of Endocrinology",
        finding:
          "GHRH + GHRP-2 combination produced synergistic GH release exceeding either agent alone",
        evidenceType: "RCT",
      },
    ],
    faqs: [],
  },

  // ── 17. GHRP-6 ─────────────────────────────────────────────────────────
  {
    name: "GHRP-6",
    slug: "ghrp-6",
    type: "Growth hormone releasing peptide",
    category: "growth-hormone",
    categoryName: "Growth Hormone Secretagogues",
    aminoAcidCount: 6,
    evidenceLevel: "B",
    description:
      "GHRP-6 was one of the first synthetic GH secretagogues developed. It stimulates strong GH release but also significantly increases appetite through ghrelin receptor activation.",
    mechanism:
      "Activates GHS-R1a receptors in the pituitary and hypothalamus. Stimulates GH release, increases appetite via ghrelin-like activity, and promotes gastric motility.",
    benefits: [
      "Strong GH release demonstrated in human trials",
      "Significant appetite stimulation",
      "Neuroprotective properties explored",
      "May support cardiac function",
    ],
    sideEffects: [
      "Intense hunger and appetite increase",
      "Elevated cortisol",
      "Water retention",
      "Potential blood sugar fluctuations",
      "Flushing",
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "Clinical studies used 1-2 mcg/kg IV or SC. Research protocols typically dose 100 mcg SC 2-3 times daily.",
    routes: ["Subcutaneous injection", "Intravenous"],
    relatedPeptides: ["ghrp-2", "ipamorelin", "hexarelin"],
    refs: [
      {
        pmid: "8530621",
        title: "GHRP-6 stimulates GH secretion in humans",
        year: 1995,
        journal: "Journal of Clinical Endocrinology & Metabolism",
        finding:
          "GHRP-6 produced dose-dependent GH release in healthy adults with reproducible pharmacokinetics",
        evidenceType: "RCT",
      },
      {
        pmid: "10331623",
        title: "Effects of GHRP-6 on food intake",
        year: 1999,
        journal: "Journal of Clinical Endocrinology & Metabolism",
        finding:
          "GHRP-6 significantly increased food intake by 36% in healthy volunteers through ghrelin receptor activation",
        evidenceType: "RCT",
      },
    ],
    faqs: [],
  },

  // ── 18. Hexarelin ──────────────────────────────────────────────────────
  {
    name: "Hexarelin",
    slug: "hexarelin",
    type: "Growth hormone releasing peptide",
    category: "growth-hormone",
    categoryName: "Growth Hormone Secretagogues",
    aminoAcidCount: 6,
    evidenceLevel: "B",
    description:
      "Hexarelin is one of the most potent synthetic GH secretagogues. Research also suggests it has direct cardioprotective effects independent of its GH-releasing properties.",
    mechanism:
      "Activates GHS receptors for GH release. Uniquely, also binds CD36 scavenger receptors in cardiac tissue, providing direct cardioprotective effects independent of GH signaling.",
    benefits: [
      "Most potent GH release among GHRPs",
      "Direct cardioprotective effects via CD36 binding",
      "Improved cardiac function in heart failure models",
      "Anti-atherosclerotic properties observed",
    ],
    sideEffects: [
      "Elevated cortisol and prolactin",
      "GH response desensitization with chronic use",
      "Flushing",
      "Water retention",
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "Clinical studies used 1-2 mcg/kg IV or SC. Desensitization of GH response observed after weeks of continuous use.",
    routes: ["Subcutaneous injection", "Intravenous"],
    relatedPeptides: ["ghrp-2", "ghrp-6", "ipamorelin"],
    refs: [
      {
        pmid: "10195554",
        title: "Cardiovascular effects of hexarelin",
        year: 1999,
        journal: "Annals of Medicine",
        finding:
          "Hexarelin improved left ventricular ejection fraction in patients with severe GH deficiency through direct cardiac effects",
        evidenceType: "RCT",
      },
      {
        pmid: "15331606",
        title:
          "Hexarelin CD36 binding and cardioprotection",
        year: 2004,
        journal: "Endocrinology",
        finding:
          "Hexarelin binds cardiac CD36 receptors, protecting against ischemia-reperfusion injury independent of GH release",
        evidenceType: "Animal",
      },
    ],
    faqs: [],
  },

  // ── 19. Melanotan II ───────────────────────────────────────────────────
  {
    name: "Melanotan II",
    slug: "melanotan-ii",
    type: "Melanocortin receptor agonist",
    category: "sexual-health",
    categoryName: "Sexual Health",
    aminoAcidCount: 7,
    evidenceLevel: "C",
    description:
      "Melanotan II is a synthetic cyclic peptide analog of alpha-melanocyte stimulating hormone (alpha-MSH). Originally developed for skin tanning, it also has sexual arousal effects but significant safety concerns.",
    mechanism:
      "Non-selective melanocortin receptor agonist (MC1R through MC5R). MC1R activation causes melanogenesis (tanning). MC4R activation causes sexual arousal. MC3R/4R activation suppresses appetite.",
    benefits: [
      "Produces skin tanning without UV exposure in studies",
      "Erectile response observed in male subjects",
      "Appetite suppression",
      "Precursor compound that led to bremelanotide development",
    ],
    sideEffects: [
      "Nausea and flushing (very common)",
      "Facial flushing",
      "Uncontrolled erections",
      "New or changing moles (melanocyte stimulation)",
      "Increased melanoma risk is a theoretical concern",
      "Dangerous with unregulated sources",
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "Research studies used 0.01-0.025 mg/kg SC. Self-administration is widespread but carries significant safety risks due to unregulated products.",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["bremelanotide"],
    refs: [
      {
        pmid: "10369688",
        title:
          "Melanotan II and sexual function in males",
        year: 1999,
        journal: "International Journal of Impotence Research",
        finding:
          "Melanotan II induced erections in 8 of 10 men with psychogenic erectile dysfunction in a double-blind crossover study",
        evidenceType: "RCT",
      },
      {
        pmid: "11736944",
        title: "Melanotan II and skin pigmentation",
        year: 2002,
        journal: "Melanoma Research",
        finding:
          "SC Melanotan II significantly increased skin melanin density without UV exposure in fair-skinned subjects",
        evidenceType: "RCT",
      },
    ],
    faqs: [],
  },

  // ── 20. LL-37 ──────────────────────────────────────────────────────────
  {
    name: "LL-37",
    slug: "ll-37",
    type: "Antimicrobial peptide (cathelicidin)",
    category: "immune-support",
    categoryName: "Immune Support",
    aminoAcidCount: 37,
    evidenceLevel: "C",
    description:
      "LL-37 is the only cathelicidin antimicrobial peptide found in humans. It plays a crucial role in innate immune defense, wound healing, and inflammation modulation.",
    mechanism:
      "Disrupts microbial membranes through electrostatic interaction with negatively charged phospholipids. Also modulates immune cell chemotaxis, inflammatory cytokine release, and promotes angiogenesis.",
    benefits: [
      "Broad-spectrum antimicrobial activity (bacteria, fungi, viruses)",
      "Immune modulation and anti-biofilm effects",
      "Wound healing promotion",
      "Potential anti-cancer properties in preclinical models",
    ],
    sideEffects: [
      "Limited human safety data for therapeutic use",
      "Potential pro-inflammatory effects at high concentrations",
      "Injection site reactions",
      "Theoretical cytotoxicity at elevated doses",
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "Research dosing varies widely. Topical wound studies used 1-10 mcg/mL concentrations. No established systemic dosing.",
    routes: ["Subcutaneous injection", "Topical"],
    relatedPeptides: ["bpc-157", "tb-500", "thymalin"],
    refs: [
      {
        pmid: "15817886",
        title:
          "The human cathelicidin LL-37: a multifunctional peptide",
        year: 2005,
        journal: "Infection and Immunity",
        finding:
          "Comprehensive review of LL-37 antimicrobial, immunomodulatory, and wound healing functions in human innate immunity",
        evidenceType: "Review",
      },
      {
        pmid: "24284364",
        title:
          "Therapeutic potential of LL-37 and derived peptides",
        year: 2014,
        journal: "Expert Opinion on Biological Therapy",
        finding:
          "Review of LL-37 therapeutic applications including chronic wounds, infections, and cancer with discussion of delivery challenges",
        evidenceType: "Review",
      },
    ],
    faqs: [],
  },

  // ── 21. Thymalin ───────────────────────────────────────────────────────
  {
    name: "Thymalin",
    slug: "thymalin",
    type: "Thymic dipeptide",
    category: "immune-support",
    categoryName: "Immune Support",
    aminoAcidCount: 2,
    evidenceLevel: "C",
    description:
      "Thymalin is a synthetic dipeptide (glutamyl-tryptophan) originally derived from calf thymus extract. Developed by Vladimir Khavinson in Russia, it is used there for immune modulation.",
    mechanism:
      "Modulates T-cell differentiation and function. Restores thymic function in aged subjects. Regulates cytokine production and immune cell ratios.",
    benefits: [
      "Immune system restoration in elderly patients (Russian studies)",
      "Increased T-cell counts in immunocompromised subjects",
      "Extended lifespan in animal aging studies",
      "Approved and clinically used in Russia",
    ],
    sideEffects: [
      "Generally well-tolerated in Russian clinical use",
      "Mild allergic reactions reported rarely",
      "Injection site reactions",
      "Limited Western safety data",
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "Russian clinical protocols use 10 mg IM daily for 5-10 days. Typically administered in courses 1-2 times per year.",
    routes: ["Intramuscular injection", "Subcutaneous injection"],
    relatedPeptides: ["epithalon", "ll-37"],
    refs: [
      {
        pmid: "12937225",
        title:
          "Peptide regulation of aging: 35-year research experience",
        year: 2003,
        journal: "Bulletin of Experimental Biology and Medicine",
        finding:
          "Long-term thymalin administration reduced mortality by 2-fold in elderly subjects over 6-year follow-up (Russian study)",
        evidenceType: "Cohort",
      },
      {
        pmid: "18374557",
        title: "Peptide bioregulators and immune function",
        year: 2008,
        journal: "Advances in Gerontology",
        finding:
          "Thymalin restored age-related decline in T-cell immunity and normalized cytokine profiles in elderly patients",
        evidenceType: "Cohort",
      },
    ],
    faqs: [],
  },

  // ── 22. KPV ────────────────────────────────────────────────────────────
  {
    name: "KPV",
    slug: "kpv",
    type: "Alpha-MSH C-terminal tripeptide",
    category: "anti-inflammatory",
    categoryName: "Anti-Inflammatory",
    aminoAcidCount: 3,
    evidenceLevel: "D",
    description:
      "KPV is a tripeptide derived from the C-terminal sequence of alpha-melanocyte stimulating hormone (alpha-MSH). Research suggests potent anti-inflammatory activity without the pigmentation effects of the parent hormone.",
    mechanism:
      "Enters cells and inhibits NF-kB nuclear translocation, reducing inflammatory cytokine production (IL-1beta, IL-6, TNF-alpha). Acts intracellularly rather than through melanocortin receptors.",
    benefits: [
      "Potent anti-inflammatory effects in cell studies",
      "Reduced colitis severity in animal models",
      "No melanocyte stimulation or tanning effects",
      "Antimicrobial properties against S. aureus",
    ],
    sideEffects: [
      "Very limited human data",
      "Unknown systemic safety profile",
      "Potential GI effects with oral use",
      "Unknown drug interactions",
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "Research dosing not established for humans. Animal studies typically used 100-400 mcg doses. Explored in both injectable and oral formats.",
    routes: ["Oral", "Subcutaneous injection", "Topical"],
    relatedPeptides: ["bpc-157", "ll-37"],
    refs: [
      {
        pmid: "15246227",
        title:
          "Anti-inflammatory effects of alpha-MSH C-terminal peptide KPV",
        year: 2004,
        journal: "Journal of Biological Chemistry",
        finding:
          "KPV inhibited NF-kB activation and reduced pro-inflammatory cytokine production through intracellular peptide transporter PepT1",
        evidenceType: "In Vitro",
      },
      {
        pmid: "16697918",
        title: "KPV reduces experimental colitis",
        year: 2006,
        journal: "Gastroenterology",
        finding:
          "Oral KPV attenuated DSS-induced colitis in mice by inhibiting NF-kB-driven inflammation in colonic epithelial cells",
        evidenceType: "Animal",
      },
    ],
    faqs: [],
  },

  // ── 23. Liraglutide ─────────────────────────────────────────────────────
  {
    name: "Liraglutide",
    slug: "liraglutide",
    type: "GLP-1 receptor agonist",
    category: "weight-loss",
    categoryName: "Weight Loss",
    aminoAcidCount: 31,
    evidenceLevel: "A" as EvidenceLevel,
    description:
      "Liraglutide is a GLP-1 receptor agonist approved by the FDA for type 2 diabetes (Victoza) and chronic weight management (Saxenda). It was the first GLP-1 agonist approved specifically for obesity.",
    mechanism:
      "Mimics endogenous GLP-1, activating GLP-1 receptors to enhance insulin secretion, suppress glucagon, slow gastric emptying, and reduce appetite through hypothalamic signaling. Has 97% amino acid sequence homology with human GLP-1.",
    benefits: [
      "FDA-approved for both diabetes and obesity",
      "Proven cardiovascular risk reduction (LEADER trial)",
      "Extensive long-term safety data (10+ years)",
      "Daily dosing allows flexible titration",
    ],
    sideEffects: [
      "Nausea and vomiting (most common during titration)",
      "Diarrhea or constipation",
      "Pancreatitis risk (rare)",
      "Gallbladder disorders",
      "Injection site reactions",
    ],
    fdaStatus: "approved" as FDAStatus,
    fdaApprovedFor:
      "Type 2 diabetes mellitus (Victoza); chronic weight management in adults with BMI ≥30 or ≥27 with comorbidities (Saxenda)",
    brandNames: ["Victoza", "Saxenda"],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "Victoza: titrated from 0.6 mg to 1.2-1.8 mg SC daily. Saxenda: titrated from 0.6 mg to 3.0 mg SC daily over 5 weeks.",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["semaglutide", "tirzepatide"],
    refs: [
      {
        pmid: "28215665",
        title:
          "Liraglutide and Cardiovascular Outcomes in Type 2 Diabetes (LEADER)",
        year: 2016,
        journal: "New England Journal of Medicine",
        finding:
          "Liraglutide reduced major adverse cardiovascular events by 13% vs placebo in type 2 diabetes patients at high cardiovascular risk",
        evidenceType: "RCT" as EvidenceType,
      },
      {
        pmid: "25998169",
        title:
          "Liraglutide 3.0 mg for Weight Management (SCALE Obesity)",
        year: 2015,
        journal: "New England Journal of Medicine",
        finding:
          "Liraglutide 3.0 mg produced 8.0% mean body weight loss vs 2.6% with placebo over 56 weeks in 3,731 adults",
        evidenceType: "RCT" as EvidenceType,
      },
    ],
    faqs: [
      {
        question: "What is the difference between Victoza and Saxenda?",
        answer:
          "Both contain liraglutide but at different doses and for different indications. Victoza (1.2-1.8 mg) is for type 2 diabetes. Saxenda (3.0 mg) is for weight management. They should not be used together.",
      },
      {
        question: "How does liraglutide compare to semaglutide?",
        answer:
          "Semaglutide is a newer GLP-1 agonist that generally produces greater weight loss (15% vs 8%) and is dosed weekly rather than daily. However, liraglutide has more long-term safety data and was the first GLP-1 agonist approved for obesity.",
      },
      {
        question: "Is liraglutide FDA approved?",
        answer:
          "Yes. Liraglutide is FDA-approved as Victoza for type 2 diabetes (2010) and as Saxenda for chronic weight management (2014). It has one of the longest track records among GLP-1 agonists.",
      },
    ],
  },

  // ── 24. Retatrutide ─────────────────────────────────────────────────────
  {
    name: "Retatrutide",
    slug: "retatrutide",
    type: "Triple GIP/GLP-1/Glucagon receptor agonist",
    category: "weight-loss",
    categoryName: "Weight Loss",
    aminoAcidCount: 39,
    evidenceLevel: "B" as EvidenceLevel,
    description:
      "Retatrutide is an investigational triple-hormone receptor agonist developed by Eli Lilly. It simultaneously targets GIP, GLP-1, and glucagon receptors, achieving the highest weight loss ever reported in an obesity clinical trial — up to 24.2% at 48 weeks.",
    mechanism:
      "Activates three metabolic receptors simultaneously: GIP receptors (enhances insulin secretion and fat metabolism), GLP-1 receptors (reduces appetite and slows gastric emptying), and glucagon receptors (increases energy expenditure and hepatic lipid oxidation). The triple agonism produces additive metabolic benefits beyond dual agonists.",
    benefits: [
      "Unprecedented 24.2% weight loss in Phase 2 trials",
      "Superior to both semaglutide and tirzepatide in early data",
      "Significant liver fat reduction (NAFLD/MASH benefit)",
      "Improved glycemic control in type 2 diabetes",
    ],
    sideEffects: [
      "Nausea, vomiting, diarrhea (dose-dependent)",
      "Decreased appetite",
      "Constipation",
      "Injection site reactions",
      "Long-term safety profile still being established",
    ],
    fdaStatus: "not-approved" as FDAStatus,
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "Phase 2 trial tested doses of 1, 4, 8, and 12 mg SC weekly. Phase 3 trials (TRIUMPH program) ongoing with expected completion in 2026.",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["tirzepatide", "semaglutide", "liraglutide"],
    refs: [
      {
        pmid: "37385275",
        title: "Retatrutide Once Weekly for Treatment of Obesity",
        year: 2023,
        journal: "New England Journal of Medicine",
        finding:
          "Retatrutide produced dose-dependent weight loss of up to 24.2% at 48 weeks — the highest ever reported in an obesity trial",
        evidenceType: "RCT" as EvidenceType,
      },
      {
        pmid: "37840095",
        title: "Retatrutide for Type 2 Diabetes",
        year: 2023,
        journal: "New England Journal of Medicine",
        finding:
          "Retatrutide reduced HbA1c by up to 2.16% and body weight by up to 16.94% in adults with type 2 diabetes",
        evidenceType: "RCT" as EvidenceType,
      },
    ],
    faqs: [
      {
        question: "Is retatrutide FDA approved?",
        answer:
          "No. Retatrutide is still in Phase 3 clinical trials (TRIUMPH program by Eli Lilly). It is not yet available by prescription. Expected FDA submission may come in late 2026 or 2027 pending trial results.",
      },
      {
        question: "How does retatrutide compare to tirzepatide?",
        answer:
          "Retatrutide is a triple agonist (GIP + GLP-1 + glucagon) while tirzepatide is a dual agonist (GIP + GLP-1). Phase 2 data shows retatrutide may produce greater weight loss (24.2% vs 22.5%) though head-to-head trials have not been completed.",
      },
      {
        question:
          "What makes retatrutide different from other weight loss peptides?",
        answer:
          "Retatrutide is the first triple-hormone receptor agonist, adding glucagon receptor activation to the GIP/GLP-1 mechanism. The glucagon component increases energy expenditure and promotes liver fat burning, which may explain the unprecedented weight loss results.",
      },
    ],
  },

  // ── 25. Survodutide ─────────────────────────────────────────────────────
  {
    name: "Survodutide",
    slug: "survodutide",
    type: "Dual GLP-1/Glucagon receptor agonist",
    category: "weight-loss",
    categoryName: "Weight Loss",
    aminoAcidCount: 29,
    evidenceLevel: "B" as EvidenceLevel,
    description:
      "Survodutide is a dual GLP-1 and glucagon receptor agonist developed by Boehringer Ingelheim. In Phase 3 trials, it demonstrates significant weight loss and is also being investigated for metabolic dysfunction-associated steatohepatitis (MASH/NAFLD).",
    mechanism:
      "Dual agonist targeting GLP-1 receptors (appetite suppression, insulin secretion) and glucagon receptors (increased energy expenditure, hepatic lipid metabolism). The glucagon component drives liver fat reduction, differentiating it from GLP-1-only agonists.",
    benefits: [
      "Up to 19% weight loss in Phase 2 trials",
      "Significant liver fat reduction for MASH",
      "Dual mechanism targets both weight and liver disease",
      "Once-weekly dosing",
    ],
    sideEffects: [
      "Nausea and vomiting",
      "Diarrhea",
      "Decreased appetite",
      "Injection site reactions",
      "Long-term safety data still being collected",
    ],
    fdaStatus: "not-approved" as FDAStatus,
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "Phase 3 trials testing multiple dose levels administered SC weekly. Trials ongoing for both obesity (SYNCHRONIZE) and MASH indications.",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["retatrutide", "tirzepatide", "semaglutide"],
    refs: [
      {
        pmid: "37840091",
        title: "Survodutide for the Treatment of Obesity",
        year: 2024,
        journal: "The Lancet",
        finding:
          "Survodutide produced up to 19% weight loss at 46 weeks with significant improvements in cardiometabolic markers",
        evidenceType: "RCT" as EvidenceType,
      },
    ],
    faqs: [
      {
        question: "Is survodutide FDA approved?",
        answer:
          "No. Survodutide is in Phase 3 trials (SYNCHRONIZE program by Boehringer Ingelheim) for obesity and MASH. It is not yet available by prescription.",
      },
      {
        question: "How does survodutide differ from semaglutide?",
        answer:
          "Survodutide is a dual GLP-1/glucagon agonist while semaglutide is a GLP-1-only agonist. The glucagon receptor activation in survodutide specifically targets liver fat, making it particularly promising for NAFLD/MASH.",
      },
    ],
  },
];

// ── Helper functions ────────────────────────────────────────────────────────

export function getAllPeptides(): Peptide[] {
  return peptides;
}

export function getPeptideBySlug(slug: string): Peptide | undefined {
  return peptides.find((p) => p.slug === slug);
}

export function getPeptidesByCategory(category: string): Peptide[] {
  return peptides.filter((p) => p.category === category);
}

export function getFeaturedPeptides(): Peptide[] {
  return peptides
    .filter((p) => p.evidenceLevel === "A" || p.evidenceLevel === "B")
    .slice(0, 8);
}

export function getAllSlugs(): string[] {
  return peptides.map((p) => p.slug);
}
