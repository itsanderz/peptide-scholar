export type EvidenceLevel = "A" | "B" | "C" | "D";
export type FDAStatus = "approved" | "not-approved" | "cosmetic" | "discontinued";
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

export interface SourcedClaim {
  text: string;
  sourceIds: string[];
  evidenceGrade?: EvidenceLevel;
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
  benefits: SourcedClaim[];
  sideEffects: SourcedClaim[];
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
  /** Override the auto-generated meta title for this peptide page */
  seoTitle?: string;
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
      { text: "Accelerated tendon and ligament healing in animal models", sourceIds: ["21548867", "21030672", "14554208"], evidenceGrade: "C" },
      { text: "Gastric ulcer protection demonstrated in rats", sourceIds: ["21030672"], evidenceGrade: "C" },
      { text: "Potential neuroprotective properties", sourceIds: ["21548867"], evidenceGrade: "C" },
      { text: "Reduced inflammation in preclinical studies", sourceIds: ["21548867"], evidenceGrade: "C" }
    ],
    sideEffects: [
      { text: "Limited human safety data available", sourceIds: ["40789979"], evidenceGrade: "C" },
      { text: "Nausea reported anecdotally", sourceIds: [], evidenceGrade: "C" },
      { text: "Injection site reactions", sourceIds: ["21548867"], evidenceGrade: "C" },
      { text: "Unknown long-term effects", sourceIds: ["40789979"], evidenceGrade: "C" }
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
        pmid: "21548867",
        title: "Stable gastric pentadecapeptide BPC 157: novel therapy in gastrointestinal tract.",
        year: 2011,
        journal: "Curr Pharm Des",
        finding: "Review of BPC-157 protective effects on the gastrointestinal tract and mucosal integrity in animal models",
        evidenceType: "Review",
      },
      {
        pmid: "21030672",
        title: "The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth, cell survival, and cell migration.",
        year: 2011,
        journal: "J Appl Physiol (1985)",
        finding: "Demonstrated acceleration of wound healing through angiogenic and anti-inflammatory pathways in rats",
        evidenceType: "Animal",
      },
      {
        pmid: "14554208",
        title: "Gastric pentadecapeptide BPC 157 accelerates healing of transected rat Achilles tendon and in vitro stimulates tendocytes growth.",
        year: 2003,
        journal: "J Orthop Res",
        finding: "BPC-157 improved Achilles tendon healing outcomes in rat transection models",
        evidenceType: "Animal",
      },
      {
        pmid: "40789979",
        title: "Regeneration or Risk? A Narrative Review of BPC-157 for Musculoskeletal Healing.",
        year: 2025,
        journal: "Curr Rev Musculoskelet Med",
        finding: "Human data are extremely limited. Only three pilot studies have examined BPC-157 in humans. Until well-designed clinical trials are conducted, BPC-157 should be considered investigational.",
        evidenceType: "Review",
      },
      {
        pmid: "40005999",
        title: "Multifunctionality and Possible Medical Application of the BPC 157 Peptide-Literature and Patent Review.",
        year: 2025,
        journal: "Pharmaceuticals (Basel)",
        finding: "BPC 157 has not been approved for use in standard medicine by the FDA and other global regulatory authorities due to the absence of sufficient and comprehensive clinical studies confirming its health benefits in humans.",
        evidenceType: "Review",
      }],
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
      {
        question: "Is BPC-157 banned by WADA?",
        answer:
          "Yes. BPC-157 is prohibited by WADA under the S0 (Non-Approved Substances) category, which bans all pharmacological substances not currently approved by any regulatory authority. Competitive athletes subject to anti-doping rules should not use BPC-157.",
      }],
    seoTitle: "BPC-157 Research: Benefits, Mechanism & Legal Status (2026)",
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
      { text: "Enhanced wound healing and tissue repair in animal studies", sourceIds: ["27450738"], evidenceGrade: "C" },
      { text: "Reduced cardiac fibrosis after injury in mice", sourceIds: ["20536454"], evidenceGrade: "C" },
      { text: "Promotes hair regrowth in preclinical models", sourceIds: ["17947589"], evidenceGrade: "C" },
      { text: "Anti-inflammatory effects observed in vitro", sourceIds: ["17947589"], evidenceGrade: "C" }
    ],
    sideEffects: [
      { text: "Limited human safety data", sourceIds: [], evidenceGrade: "C" },
      { text: "Potential headache", sourceIds: ["17947589"], evidenceGrade: "C" },
      { text: "Injection site irritation", sourceIds: ["17947589"], evidenceGrade: "C" },
      { text: "Theoretical concern about promoting growth of existing tumors", sourceIds: [], evidenceGrade: "C" }
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
    seoTitle: "TB-500 (Thymosin Beta-4): Research, Legal Status & WADA Guide (2026)",
    refs: [
      {
        pmid: "17947589",
        title:
          "Thymosin beta 4 induces hair growth via stem cell migration and differentiation",
        year: 2007,
        journal: "Ann N Y Acad Sci",
        finding:
          "TB4 stimulated hair growth in normal rats and mice by promoting stem cell migration to hair follicles",
        evidenceType: "Animal",
      },
      {
        pmid: "27450738",
        title: "Thymosin β4 Promotes Dermal Healing.",
        year: 2016,
        journal: "Vitam Horm",
        finding: "Review of TB4 mechanisms in angiogenesis and dermal wound repair",
        evidenceType: "Review",
      },
      {
        pmid: "20536454",
        title: "Thymosin beta4 and cardiac repair.",
        year: 2010,
        journal: "Ann N Y Acad Sci",
        finding: "TB4 reduced scarring and improved cardiac function after myocardial infarction in murine models",
        evidenceType: "Review",
      }],
    faqs: [
      {
        question: "Is TB-500 on the WADA prohibited list?",
        answer:
          "Yes. TB-500 (Thymosin Beta-4) is prohibited by WADA under S0 (Non-Approved Substances) and also falls under S2 (Peptide Hormones, Growth Factors, Related Substances and Mimetics). It has been detected in athlete doping tests. Any athlete in a WADA-regulated sport should not use TB-500.",
      },
      {
        question: "Is TB-500 the same as Thymosin Beta-4?",
        answer:
          "TB-500 is the research/commercial name for a synthetic fragment of Thymosin Beta-4, specifically the actin-binding domain (amino acids 17–23 with extensions). The naturally occurring protein is called Thymosin Beta-4. The terms are used interchangeably but TB-500 is technically the synthetic analog.",
      }],
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
      "GHK-Cu (copper peptide, GHK copper) is a naturally occurring copper complex of the tripeptide glycyl-L-histidyl-L-lysine. Found in human plasma, saliva, and urine, its concentration declines with age.",
    mechanism:
      "Binds copper(II) ions and delivers them to tissues. Stimulates collagen, elastin, and glycosaminoglycan synthesis. Activates proteasome activity and modulates gene expression of over 4,000 genes.",
    benefits: [
      { text: "Clinically demonstrated skin rejuvenation and wrinkle reduction", sourceIds: ["26236730"], evidenceGrade: "B" },
      { text: "Accelerated wound healing in human studies", sourceIds: ["29986520"], evidenceGrade: "B" },
      { text: "Stimulates collagen and elastin synthesis", sourceIds: ["26236730"], evidenceGrade: "B" },
      { text: "Anti-inflammatory and antioxidant activity", sourceIds: ["35083444"], evidenceGrade: "B" }
    ],
    sideEffects: [
      { text: "Mild skin irritation with topical use", sourceIds: ["26236730"], evidenceGrade: "B" },
      { text: "Temporary skin redness", sourceIds: ["26236730"], evidenceGrade: "B" },
      { text: "Rare allergic reactions", sourceIds: ["26236730"], evidenceGrade: "B" },
      { text: "Minimal systemic side effects with topical application", sourceIds: [], evidenceGrade: "B" }
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
        pmid: "26236730",
        title: "GHK Peptide as a Natural Modulator of Multiple Cellular Pathways in Skin Regeneration.",
        year: 2015,
        journal: "Biomed Res Int",
        finding: "Comprehensive review of GHK-Cu in skin regeneration showing stimulation of collagen, decorin, and glycosaminoglycans",
        evidenceType: "Review",
      },
      {
        pmid: "29986520",
        title: "Regenerative and Protective Actions of the GHK-Cu Peptide in the Light of the New Gene Data.",
        year: 2018,
        journal: "Int J Mol Sci",
        finding: "GHK-Cu accelerated wound closure and increased angiogenesis in human skin studies",
        evidenceType: "Review",
      },
      {
        pmid: "35083444",
        title: "The potential of GHK as an anti-aging peptide.",
        year: 2020,
        journal: "Aging Pathobiol Ther",
        finding: "GHK-Cu modulated expression of genes related to antioxidant, anti-inflammatory, and repair pathways",
        evidenceType: "Review",
      }],
    faqs: [
      {
        question: "Is GHK-Cu the same as 'copper peptide'?",
        answer:
          "Yes. 'Copper peptide' in skincare and research contexts almost always refers to GHK-Cu (glycyl-L-histidyl-L-lysine copper complex). It is the most studied copper-binding peptide in humans. You may also see it written as GHK copper, copper tripeptide-1, or simply GHK. All refer to the same molecule.",
      },
      {
        question: "What is GHK-Cu used for in skincare?",
        answer:
          "GHK-Cu is used topically in cosmetic formulations to stimulate collagen and elastin synthesis, reduce fine lines, and accelerate skin repair. It is classified as a cosmetic ingredient (not a drug) in the US. Human studies show improvement in skin density, firmness, and wrinkle depth. Unlike many peptide ingredients, it has peer-reviewed human evidence — though most trials are small.",
      },
      {
        question: "Can GHK-Cu be injected?",
        answer:
          "Injectable GHK-Cu is used in research and has been explored for wound healing and hair loss. It is not FDA-approved for any injectable therapeutic use. Injectable preparations sold online are unregulated research compounds with no pharmaceutical oversight. Topical use is the only context with established cosmetic regulatory status.",
      }],
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
      { text: "Selective GH release without cortisol elevation", sourceIds: ["11322495"], evidenceGrade: "B" },
      { text: "Improved body composition in clinical studies", sourceIds: ["9849822"], evidenceGrade: "B" },
      { text: "Enhanced bone mineral density", sourceIds: ["10828840"], evidenceGrade: "B" },
      { text: "Favorable side effect profile among GH secretagogues", sourceIds: ["9849822"], evidenceGrade: "B" }
    ],
    sideEffects: [
      { text: "Transient headache", sourceIds: ["9849822"], evidenceGrade: "B" },
      { text: "Flushing", sourceIds: ["9849822"], evidenceGrade: "B" },
      { text: "Mild nausea", sourceIds: ["9849822"], evidenceGrade: "B" },
      { text: "Injection site reactions", sourceIds: ["9849822"], evidenceGrade: "B" },
      { text: "Water retention", sourceIds: ["9849822"], evidenceGrade: "B" }
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
    relatedPeptides: ["cjc-1295", "ghrp-2", "ghrp-6", "sermorelin", "teriparatide", "igf-1-lr3", "follistatin-344", "mgf"],
    seoTitle: "Ipamorelin Research: GH Benefits, Dosing & WADA Status (2026)",
    refs: [
      {
        pmid: "9849822",
        title:
          "Ipamorelin, the first selective growth hormone secretagogue",
        year: 1998,
        journal: "Eur J Endocrinol",
        finding:
          "Identified ipamorelin as the first GH secretagogue with selectivity comparable to GHRH itself",
        evidenceType: "RCT",
      },
      {
        pmid: "11322495",
        title: "Do growth hormone-releasing peptides act as ghrelin secretagogues?",
        year: 2001,
        journal: "Endocrine",
        finding: "Confirmed dose-dependent GH release without affecting cortisol or prolactin in human subjects",
        evidenceType: "Review",
      },
      {
        pmid: "10828840",
        title: "The GH secretagogues ipamorelin and GH-releasing peptide-6 increase bone mineral content in adult female rats.",
        year: 2000,
        journal: "J Endocrinol",
        finding: "Ipamorelin increased bone mineral content and periosteal bone formation in aged female rats",
        evidenceType: "Animal",
      }],
    faqs: [
      {
        question: "Is ipamorelin banned by WADA?",
        answer:
          "Yes. Ipamorelin is prohibited under WADA's S2 category (Peptide Hormones, Growth Factors, Related Substances and Mimetics) because it stimulates endogenous growth hormone release. It is banned both in-competition and out-of-competition for athletes subject to anti-doping rules.",
      },
      {
        question: "Is ipamorelin a prescription drug?",
        answer:
          "In the US, ipamorelin requires a prescription and must be obtained through a licensed compounding pharmacy or clinic. It is not FDA-approved as a standalone drug but can be prescribed off-label. It is not a controlled substance.",
      }],
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
      { text: "Sustained GH elevation for multiple days", sourceIds: ["16352683"], evidenceGrade: "B" },
      { text: "Increased IGF-1 levels in human subjects", sourceIds: ["16352683"], evidenceGrade: "B" },
      { text: "Improved deep sleep quality reported", sourceIds: ["16352683"], evidenceGrade: "B" },
      { text: "Supports lean mass and fat metabolism", sourceIds: ["16352683"], evidenceGrade: "B" }
    ],
    sideEffects: [
      { text: "Flushing and warmth", sourceIds: ["16352683"], evidenceGrade: "B" },
      { text: "Headache", sourceIds: ["16352683"], evidenceGrade: "B" },
      { text: "Dizziness", sourceIds: ["16352683"], evidenceGrade: "B" },
      { text: "Injection site reactions", sourceIds: ["16352683"], evidenceGrade: "B" },
      { text: "Potential water retention", sourceIds: ["16352683"], evidenceGrade: "B" }
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
    relatedPeptides: ["ipamorelin", "sermorelin", "tesamorelin", "ghrp-2", "teriparatide", "igf-1-lr3", "follistatin-344", "mgf"],
    refs: [
      {
        pmid: "16352683",
        title: "Prolonged stimulation of growth hormone (GH) and insulin-like growth factor I secretion by CJC-1295, a long-acting analog of GH-releasing hormone, in healthy adults.",
        year: 2006,
        journal: "J Clin Endocrinol Metab",
        finding:
          "Single SC dose produced sustained 2-10 fold GH increases lasting 6+ days with IGF-1 elevation for 9-11 days",
        evidenceType: "RCT",
      },
      {
        pmid: "34665524",
        title: "Advances in the detection of growth hormone releasing hormone synthetic analogs.",
        year: 2021,
        journal: "Drug Test Anal",
        finding: "Review of analytical methods for detecting GHRH synthetic analogs including CJC-1295 in anti-doping testing",
        evidenceType: "Review",
      }],
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
      "Sermorelin is the shortest fully functional fragment of GHRH (amino acids 1-29). It was the first GHRH analog approved by the FDA, marketed as Geref for diagnostic and therapeutic use. Geref was subsequently discontinued in the U.S. market, though sermorelin remains available through compounding pharmacies. Geref was subsequently discontinued in the U.S. market, though sermorelin remains available through compounding pharmacies.",
    mechanism:
      "Binds GHRH receptors on anterior pituitary somatotrophs, stimulating natural pulsatile GH release. Preserves the physiological GH feedback axis.",
    benefits: [
      { text: "FDA-approved track record for GH stimulation", sourceIds: ["18031173"], evidenceGrade: "A" },
      { text: "Preserves natural GH pulsatility", sourceIds: ["18031173"], evidenceGrade: "A" },
      { text: "Improved body composition in clinical studies", sourceIds: ["9141536"], evidenceGrade: "A" },
      { text: "Enhanced sleep quality", sourceIds: ["18031173"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "Pain at injection site", sourceIds: ["18031173"], evidenceGrade: "A" },
      { text: "Flushing", sourceIds: ["18031173"], evidenceGrade: "A" },
      { text: "Headache", sourceIds: ["18031173"], evidenceGrade: "A" },
      { text: "Dizziness", sourceIds: ["18031173"], evidenceGrade: "A" },
      { text: "Swelling or urticaria", sourceIds: ["18031173"], evidenceGrade: "A" }
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
    relatedPeptides: ["cjc-1295", "tesamorelin", "ipamorelin", "ghrp-6", "teriparatide", "igf-1-lr3", "follistatin-344", "mgf"],
    refs: [
      {
        pmid: "18031173",
        title: "Sermorelin: a review of its use in the diagnosis and treatment of children with idiopathic growth hormone deficiency.",
        year: 1999,
        journal: "BioDrugs",
        finding: "Sermorelin produced clinically meaningful growth acceleration in GH-deficient children",
        evidenceType: "Review",
      },
      {
        pmid: "9141536",
        title: "Endocrine and metabolic effects of long-term administration of [Nle27]growth hormone-releasing hormone-(1-29)-NH2 in age-advanced men and women.",
        year: 1997,
        journal: "J Clin Endocrinol Metab",
        finding: "Six months of sermorelin improved lean body mass and reduced body fat in adults with GH insufficiency",
        evidenceType: "Cohort",
      }],
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
      { text: "FDA-approved reduction of visceral adipose tissue", sourceIds: ["21668043"], evidenceGrade: "A" },
      { text: "Reduced liver fat (NAFLD) in clinical trials", sourceIds: ["31611038"], evidenceGrade: "A" },
      { text: "Improved triglyceride levels", sourceIds: ["21668043"], evidenceGrade: "A" },
      { text: "Maintained cognitive function in aging studies", sourceIds: ["22869065"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "Injection site reactions (erythema, pruritus)", sourceIds: ["21668043"], evidenceGrade: "A" },
      { text: "Arthralgia", sourceIds: ["21668043"], evidenceGrade: "A" },
      { text: "Peripheral edema", sourceIds: ["21668043"], evidenceGrade: "A" },
      { text: "Myalgia", sourceIds: ["21668043"], evidenceGrade: "A" },
      { text: "Increased risk of fluid retention", sourceIds: ["21668043"], evidenceGrade: "A" }
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
    relatedPeptides: ["sermorelin", "cjc-1295", "ipamorelin", "teriparatide", "igf-1-lr3", "follistatin-344", "mgf"],
    refs: [
      {
        pmid: "21668043",
        title: "Tesamorelin: a review of its use in the management of HIV-associated lipodystrophy.",
        year: 2011,
        journal: "Drugs",
        finding: "26-week trial showed significant reduction in visceral adipose tissue vs placebo in HIV lipodystrophy",
        evidenceType: "Review",
      },
      {
        pmid: "31611038",
        title: "Effects of tesamorelin on non-alcoholic fatty liver disease in HIV: a randomised, double-blind, multicentre trial.",
        year: 2019,
        journal: "Lancet HIV",
        finding: "Tesamorelin reduced hepatic fat fraction by 37% in HIV-infected patients with fatty liver",
        evidenceType: "RCT",
      },
      {
        pmid: "22869065",
        title: "Effects of growth hormone–releasing hormone on cognitive function in adults with mild cognitive impairment and healthy older adults: results of a controlled trial.",
        year: 2012,
        journal: "Arch Neurol",
        finding: "Tesamorelin preserved cognitive function and reduced brain amyloid in at-risk adults over 20 weeks",
        evidenceType: "RCT",
      }],
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
      { text: "FDA-approved treatment for HSDD in premenopausal women", sourceIds: ["35230162"], evidenceGrade: "A" },
      { text: "Clinically significant increase in sexual desire", sourceIds: ["35230162"], evidenceGrade: "A" },
      { text: "Works through central nervous system mechanisms", sourceIds: ["35230162"], evidenceGrade: "A" },
      { text: "On-demand dosing (not daily)", sourceIds: ["35230162"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "Nausea (most common, ~40%)", sourceIds: ["35230162"], evidenceGrade: "A" },
      { text: "Flushing", sourceIds: ["35230162"], evidenceGrade: "A" },
      { text: "Headache", sourceIds: ["35230162"], evidenceGrade: "A" },
      { text: "Transient blood pressure increase", sourceIds: ["35230162"], evidenceGrade: "A" },
      { text: "Injection site reactions", sourceIds: ["35230162"], evidenceGrade: "A" },
      { text: "Skin hyperpigmentation with repeated use", sourceIds: ["35230162"], evidenceGrade: "A" }
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
    relatedPeptides: ["melanotan-ii", "triptorelin"],
    refs: [
      {
        pmid: "35230162",
        title: "Prespecified and Integrated Subgroup Analyses from the RECONNECT Phase 3 Studies of Bremelanotide.",
        year: 2022,
        journal: "J Womens Health (Larchmt)",
        finding: "Bremelanotide significantly improved sexual desire and reduced distress vs placebo in the RECONNECT phase 3 trials",
        evidenceType: "RCT",
      },
      {
        pmid: "31429064",
        title: "Bremelanotide: First Approval.",
        year: 2019,
        journal: "Drugs",
        finding: "Review of clinical development showing consistent efficacy in HSDD across multiple phase 2/3 trials",
        evidenceType: "Review",
      }],
    faqs: [
      {
        question: "What is PT-141 and is it the same as bremelanotide?",
        answer:
          "PT-141 is the research compound designation for bremelanotide — they are the same peptide. PT-141 was its name during preclinical and early clinical development; bremelanotide is the INN (international nonproprietary name) used after FDA approval. The brand name Vyleesi refers to the same compound in its FDA-approved injectable formulation.",
      },
      {
        question: "Is Vyleesi the same as PT-141?",
        answer:
          "Yes. Vyleesi is the FDA-approved brand name for bremelanotide (PT-141). The approved product is a prefilled autoinjector for premenopausal women with hypoactive sexual desire disorder (HSDD). The compound is identical; the difference is quality control, manufacturing standards, and legal status. Unregulated 'PT-141' sold as a research peptide is the same molecule but lacks pharmaceutical oversight.",
      },
      {
        question: "Does PT-141 / bremelanotide work for men?",
        answer:
          "Bremelanotide is FDA-approved only for HSDD in premenopausal women. However, early clinical research — including the trials that led to its development — showed erectile response in men, and it is used off-label by some men. The evidence base for male use is older and smaller than for female use, and it is not an approved indication.",
      }],
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
      { text: "Mean 15% body weight loss in obesity trials (STEP 1)", sourceIds: ["33567185"], evidenceGrade: "A" },
      { text: "Significant HbA1c reduction in type 2 diabetes", sourceIds: ["27633186"], evidenceGrade: "A" },
      { text: "Reduced major cardiovascular events (SELECT trial)", sourceIds: ["37952131"], evidenceGrade: "A" },
      { text: "Available in oral formulation (Rybelsus)", sourceIds: ["27633186"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "Nausea and vomiting (especially during titration)", sourceIds: ["33567185"], evidenceGrade: "A" },
      { text: "Diarrhea or constipation", sourceIds: ["33567185"], evidenceGrade: "A" },
      { text: "Pancreatitis risk (rare)", sourceIds: ["33567185"], evidenceGrade: "A" },
      { text: "Gallbladder disorders", sourceIds: ["33567185"], evidenceGrade: "A" },
      { text: "Potential thyroid C-cell tumor risk (animal studies)", sourceIds: ["33567185"], evidenceGrade: "D" }
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
    relatedPeptides: ["tirzepatide", "liraglutide", "retatrutide", "aod-9604", "exenatide", "dulaglutide", "pramlintide"],
    refs: [
      {
        pmid: "33567185",
        title:
          "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1)",
        year: 2021,
        journal: "N Engl J Med",
        finding:
          "Semaglutide 2.4 mg produced 14.9% mean body weight loss vs 2.4% with placebo over 68 weeks in 1,961 adults",
        evidenceType: "RCT",
      },
      {
        pmid: "27633186",
        title: "Semaglutide and Cardiovascular Outcomes in Patients with Type 2 Diabetes.",
        year: 2016,
        journal: "N Engl J Med",
        finding:
          "Semaglutide reduced major adverse cardiovascular events by 26% vs placebo in type 2 diabetes patients",
        evidenceType: "RCT",
      },
      {
        pmid: "37952131",
        title: "Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes (SELECT).",
        year: 2023,
        journal: "N Engl J Med",
        finding:
          "Semaglutide reduced major adverse cardiovascular events by 20% vs placebo in adults with obesity and established CVD but no diabetes",
        evidenceType: "RCT",
      }],
    faqs: [
      {
        question: "Is Ozempic the same as Wegovy?",
        answer:
          "Ozempic and Wegovy are both semaglutide — the same peptide — but they are different products approved for different indications. Ozempic (0.5, 1, or 2 mg SC weekly) is approved for type 2 diabetes. Wegovy (2.4 mg SC weekly) is approved for chronic weight management. The higher Wegovy dose accounts for the greater weight loss observed in obesity trials.",
      },
      {
        question: "What is compounded semaglutide?",
        answer:
          "Compounded semaglutide is semaglutide prepared by compounding pharmacies, typically offered at lower cost than branded Ozempic or Wegovy. During the FDA drug shortage period, compounding was permitted under specific conditions. As of 2025, the FDA has declared the shortage resolved, which limits the legal basis for compounding. Compounded semaglutide is not FDA-approved and potency/purity is not independently verified.",
      },
      {
        question: "Is semaglutide a peptide?",
        answer:
          "Yes. Semaglutide is a 31-amino acid GLP-1 analog — a modified peptide. Its backbone is similar to endogenous GLP-1 but with modifications (a C18 fatty diacid side chain and amino acid substitutions) that extend its half-life to approximately 7 days, enabling once-weekly dosing.",
      }],
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
      { text: "Up to 22.5% mean body weight loss (SURMOUNT-1)", sourceIds: ["35658024"], evidenceGrade: "A" },
      { text: "Superior HbA1c reduction vs semaglutide (SURPASS-2)", sourceIds: ["34170647"], evidenceGrade: "A" },
      { text: "Improved insulin sensitivity", sourceIds: ["34170647"], evidenceGrade: "A" },
      { text: "Reduced cardiovascular risk factors", sourceIds: ["34170647"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "Nausea and vomiting", sourceIds: ["35658024"], evidenceGrade: "A" },
      { text: "Diarrhea", sourceIds: ["35658024"], evidenceGrade: "A" },
      { text: "Decreased appetite", sourceIds: ["35658024"], evidenceGrade: "A" },
      { text: "Constipation", sourceIds: ["35658024"], evidenceGrade: "A" },
      { text: "Injection site reactions", sourceIds: ["35658024"], evidenceGrade: "A" }
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
    relatedPeptides: ["semaglutide", "retatrutide", "survodutide", "liraglutide", "aod-9604", "exenatide", "dulaglutide", "pramlintide", "setmelanotide"],
    refs: [
      {
        pmid: "35658024",
        title:
          "Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1)",
        year: 2022,
        journal: "N Engl J Med",
        finding:
          "Tirzepatide produced mean weight reductions of 15-22.5% at 72 weeks across dose groups vs 3.1% with placebo",
        evidenceType: "RCT",
      },
      {
        pmid: "34170647",
        title: "Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes.",
        year: 2021,
        journal: "N Engl J Med",
        finding:
          "Tirzepatide at all doses was superior to semaglutide 1 mg for HbA1c reduction and weight loss",
        evidenceType: "RCT",
      }],
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
      "AOD-9604 is a modified fragment of human growth hormone (amino acids 176-191) originally developed for obesity treatment. It has been explored as a lipolytic agent in research but has not received FDA approval or GRAS status for any use.",
    mechanism:
      "Mimics the lipolytic fragment of growth hormone, stimulating fat breakdown while having no effect on IGF-1 levels or blood glucose. Does not exhibit the growth-promoting effects of full GH.",
    benefits: [
      { text: "Fat reduction without GH-related side effects in animal studies", sourceIds: ["11713213"], evidenceGrade: "C" },
      { text: "Research exploration in animal models only — no regulatory approval", sourceIds: ["11713213"], evidenceGrade: "C" },
      { text: "No impact on insulin sensitivity or blood glucose", sourceIds: ["11713213"], evidenceGrade: "C" },
      { text: "Does not promote tissue growth", sourceIds: ["11713213"], evidenceGrade: "C" }
    ],
    sideEffects: [
      { text: "Limited human trial data", sourceIds: ["11713213"], evidenceGrade: "C" },
      { text: "Mild headache reported", sourceIds: ["11713213"], evidenceGrade: "C" },
      { text: "Injection site reactions", sourceIds: ["11713213"], evidenceGrade: "C" },
      { text: "Uncertain long-term safety profile", sourceIds: [], evidenceGrade: "C" }
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "Phase 2 obesity trial used 1 mg SC daily. Limited clinical data available for dosing guidance.",
    routes: ["Subcutaneous injection", "Oral"],
    relatedPeptides: ["semaglutide", "tirzepatide", "exenatide", "dulaglutide", "pramlintide", "setmelanotide"],
    refs: [
      {
        pmid: "11713213",
        title: "The effects of human GH and its lipolytic fragment (AOD9604) on lipid metabolism following chronic treatment in obese mice and beta(3)-AR knock-out mice.",
        year: 2001,
        journal: "Endocrinology",
        finding: "AOD-9604 reduced fat mass in obese mice via beta(3)-adrenergic receptor mediated lipolysis without affecting blood glucose or IGF-1",
        evidenceType: "Animal",
      }],
    faqs: [
      {
        question: "Is AOD-9604 banned by WADA?",
        answer:
          "Yes. AOD-9604 is prohibited by WADA under section S2.2.3 (Growth Hormone Fragments). It is explicitly named on the 2026 WADA Prohibited List as a banned substance at all times. Competitive athletes subject to anti-doping rules should not use AOD-9604.",
      },
    ],
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
      { text: "Promoted slow-wave sleep onset in early human studies", sourceIds: ["6145137"], evidenceGrade: "D" },
      { text: "Reduced cortisol levels in some reports", sourceIds: ["6548970"], evidenceGrade: "D" },
      { text: "May normalize disrupted sleep patterns", sourceIds: ["6145137"], evidenceGrade: "D" },
      { text: "Opioid withdrawal support explored in small studies", sourceIds: ["6145137"], evidenceGrade: "D" }
    ],
    sideEffects: [
      { text: "Very limited safety data", sourceIds: ["6145137"], evidenceGrade: "D" },
      { text: "Potential morning grogginess", sourceIds: ["6145137"], evidenceGrade: "D" },
      { text: "Unknown long-term effects", sourceIds: [], evidenceGrade: "D" },
      { text: "Quality control concerns with research products", sourceIds: ["6145137"], evidenceGrade: "D" }
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
    relatedPeptides: ["selank", "semax", "oxytocin"],
    refs: [
      {
        pmid: "6145137",
        title: "Delta-sleep-inducing peptide (DSIP): a review.",
        year: 1984,
        journal: "Neurosci Biobehav Rev",
        finding: "DSIP promoted sleep onset and enhanced EEG slow-wave activity in human and animal studies",
        evidenceType: "Review",
      },
      {
        pmid: "6548970",
        title: "Therapeutic effects of delta-sleep-inducing peptide (DSIP) in patients with chronic, pronounced pain episodes. A clinical pilot study.",
        year: 1984,
        journal: "Eur Neurol",
        finding: "DSIP normalized stress-elevated corticotropin levels and reduced adrenal hypertrophy in rats",
        evidenceType: "Cohort",
      }],
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
      "Epithalon (also spelled Epitalon or Epitalone) is a synthetic tetrapeptide based on the natural peptide epithalamin, produced by the pineal gland. Research by Vladimir Khavinson suggests it may activate telomerase and extend cellular lifespan.",
    mechanism:
      "Proposed to activate telomerase, the enzyme that adds telomeric repeats to chromosome ends. May stimulate pineal gland melatonin production and modulate circadian rhythms.",
    benefits: [
      { text: "Telomerase activation observed in human cell cultures", sourceIds: ["12374906"], evidenceGrade: "C" },
      { text: "Elongated telomeres in cell studies", sourceIds: ["12374906"], evidenceGrade: "C" },
      { text: "Restored melatonin cycling in aged primates", sourceIds: ["12374906"], evidenceGrade: "C" },
      { text: "Extended lifespan in some animal models", sourceIds: ["12374906"], evidenceGrade: "C" }
    ],
    sideEffects: [
      { text: "Limited human safety data", sourceIds: [], evidenceGrade: "C" },
      { text: "Injection site reactions", sourceIds: ["12374906"], evidenceGrade: "C" },
      { text: "Unknown long-term effects", sourceIds: [], evidenceGrade: "C" },
      { text: "Theoretical oncogenic concerns with telomerase activation", sourceIds: ["12374906"], evidenceGrade: "C" }
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
    relatedPeptides: ["thymalin", "ghk-cu", "elamipretide"],
    refs: [
      {
        pmid: "12374906",
        title: "Peptides and Ageing.",
        year: 2002,
        journal: "Neuro Endocrinol Lett",
        finding: "Epithalon treatment increased mean lifespan by 13% in aging rats and normalized circadian melatonin secretion",
        evidenceType: "Review",
      },
      {
        pmid: "11087911",
        title: "Effect of epitalon on the lifespan increase in Drosophila melanogaster.",
        year: 2000,
        journal: "Mech Ageing Dev",
        finding: "Epithalon extended lifespan in Drosophila melanogaster (fruit flies) through antioxidant and stress-resistance mechanisms",
        evidenceType: "Animal",
      }],
    faqs: [
      {
        question: "Is Epithalon the same as Epitalon?",
        answer:
          "Yes — Epithalon and Epitalon (sometimes spelled Epitalone) are the same compound: the synthetic tetrapeptide Ala-Glu-Asp-Gly. 'Epitalon' is the transliteration used by its Russian discoverer Vladimir Khavinson; 'Epithalon' is the alternate Westernized spelling. Both names appear in research literature and supplement markets and refer to the identical molecule.",
      },
      {
        question: "Is Epithalon banned by WADA?",
        answer:
          "Yes. Epithalon (Epitalon) is prohibited under WADA's S0 (Non-Approved Substances) category. It has not received approval from the FDA, EMA, or any major regulatory authority for human therapeutic use, making it a prohibited substance for athletes in WADA-regulated competition.",
      },
      {
        question: "What is Epithalon's proposed mechanism for anti-aging?",
        answer:
          "Epithalon is proposed to activate telomerase — the enzyme that rebuilds the protective telomere caps on chromosomes. Shorter telomeres are associated with cellular aging. In vitro studies by the Khavinson group showed telomerase activation and telomere elongation in human somatic cells. It may also stimulate pineal gland function and normalize melatonin secretion in aged animals. All human evidence is limited and most research comes from one Russian laboratory.",
      }],
  },

  // ── 14. Selank ─────────────────────────────────────────────────────────
  {
    name: "Selank",
    slug: "selank",
    seoTitle: "Selank: WADA Status, Anxiolytic Research & Dosing Guide (2026)",
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
      { text: "Anxiolytic effects demonstrated in Russian clinical trials", sourceIds: ["18454096"], evidenceGrade: "B" },
      { text: "Nootropic and cognitive-enhancing properties", sourceIds: ["26924987"], evidenceGrade: "B" },
      { text: "Approved and marketed in Russia as a nasal spray", sourceIds: ["26924987"], evidenceGrade: "B" },
      { text: "No sedation or addiction potential observed", sourceIds: ["26924987"], evidenceGrade: "B" }
    ],
    sideEffects: [
      { text: "Generally well-tolerated in Russian clinical studies", sourceIds: [], evidenceGrade: "B" },
      { text: "Mild fatigue reported rarely", sourceIds: ["26924987"], evidenceGrade: "B" },
      { text: "Nasal irritation with intranasal use", sourceIds: ["26924987"], evidenceGrade: "B" },
      { text: "Limited Western clinical data", sourceIds: ["26924987"], evidenceGrade: "B" }
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
    relatedPeptides: ["semax", "dsip", "oxytocin", "cerebrolysin", "dihexa", "p21"],
    refs: [
      {
        pmid: "26924987",
        title: "Selank Administration Affects the Expression of Some Genes Involved in GABAergic Neurotransmission.",
        year: 2016,
        journal: "Front Pharmacol",
        finding: "Selank modulated GABA neurotransmission gene expression, supporting anxiolytic mechanism of action",
        evidenceType: "Animal",
      },
      {
        pmid: "18454096",
        title: "[Efficacy and possible mechanisms of action of a new peptide anxiolytic selank in the therapy of generalized anxiety disorders and neurasthenia].",
        year: 2008,
        journal: "Zh Nevrol Psikhiatr Im S S Korsakova",
        finding: "Selank showed anxiolytic activity comparable to benzodiazepines without sedation or muscle relaxation in clinical trials",
        evidenceType: "RCT",
      }],
    faqs: [
      {
        question: "Is Selank on the WADA prohibited list?",
        answer:
          "Yes. Selank is prohibited by WADA under the S0 (Non-Approved Substances) category. WADA's S0 bans all pharmacological substances not approved by any regulatory authority for therapeutic use in humans. Because Selank is not approved by the FDA or EMA (only by Russian regulators), it falls under S0. Athletes subject to WADA anti-doping rules should not use Selank.",
      },
      {
        question: "Is Selank legal in the United States?",
        answer:
          "Selank is not FDA-approved and cannot be legally marketed for human use in the US. It is available from research chemical vendors as a peptide for research purposes only. It is not a scheduled controlled substance, so possession is not a criminal offense, but sale for human consumption is prohibited.",
      }],
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
      { text: "Neuroprotective effects in stroke (Russian clinical trials)", sourceIds: ["11517472"], evidenceGrade: "B" },
      { text: "Enhanced memory and cognitive performance", sourceIds: ["11517472"], evidenceGrade: "B" },
      { text: "Approved in Russia for multiple neurological conditions", sourceIds: ["11517472"], evidenceGrade: "B" },
      { text: "No hormonal effects despite ACTH origin", sourceIds: ["11517472"], evidenceGrade: "B" }
    ],
    sideEffects: [
      { text: "Well-tolerated in Russian clinical use", sourceIds: ["11517472"], evidenceGrade: "B" },
      { text: "Mild headache rarely", sourceIds: ["11517472"], evidenceGrade: "B" },
      { text: "Nasal irritation with intranasal use", sourceIds: ["11517472"], evidenceGrade: "B" },
      { text: "Limited Western safety data", sourceIds: ["11517472"], evidenceGrade: "B" }
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
    relatedPeptides: ["selank", "dsip", "oxytocin", "cerebrolysin", "dihexa", "p21"],
    refs: [
      {
        pmid: "11517472",
        title: "[Effectiveness of semax in acute period of hemispheric ischemic stroke (a clinical and electrophysiological study)].",
        year: 1997,
        journal: "Zh Nevrol Psikhiatr Im S S Korsakova",
        finding: "Semax improved neurological outcomes and reduced disability when administered within 12 hours of ischemic stroke onset",
        evidenceType: "RCT",
      },
      {
        pmid: "14556513",
        title: "The heptapeptide SEMAX stimulates BDNF expression in different areas of the rat brain in vivo.",
        year: 2003,
        journal: "Dokl Biol Sci",
        finding: "Semax upregulated BDNF and NGF expression in rat brain, supporting its neuroprotective mechanism",
        evidenceType: "Animal",
      }],
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
      { text: "Potent GH release in human subjects", sourceIds: ["9186261"], evidenceGrade: "B" },
      { text: "Used diagnostically for GH deficiency assessment", sourceIds: ["9186261"], evidenceGrade: "B" },
      { text: "Increases appetite and food intake", sourceIds: ["9186261"], evidenceGrade: "B" },
      { text: "Improved sleep quality in some studies", sourceIds: ["9186261"], evidenceGrade: "B" }
    ],
    sideEffects: [
      { text: "Increased appetite and hunger", sourceIds: ["9186261"], evidenceGrade: "B" },
      { text: "Elevated cortisol levels", sourceIds: ["9186261"], evidenceGrade: "B" },
      { text: "Elevated prolactin levels", sourceIds: ["9186261"], evidenceGrade: "B" },
      { text: "Water retention", sourceIds: ["9186261"], evidenceGrade: "B" },
      { text: "Flushing", sourceIds: ["9186261"], evidenceGrade: "B" }
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
    relatedPeptides: ["ghrp-6", "ipamorelin", "hexarelin", "igf-1-lr3", "follistatin-344", "mgf"],
    refs: [
      {
        pmid: "9186261",
        title: "Growth hormone-releasing peptides.",
        year: 1997,
        journal: "Eur J Endocrinol",
        finding: "GHRP-2 was a potent and reliable GH secretagogue useful for diagnostic testing of GH reserve",
        evidenceType: "Review",
      },
      {
        pmid: "14763922",
        title: "Effect of GHRH and GHRP-2 treatment in vitro on GH secretion and levels of GH, pituitary transcription factor-1, GHRH-receptor, GH-secretagogue-receptor and somatostatin receptor mRNAs in ovine pituitary cells.",
        year: 2004,
        journal: "Eur J Endocrinol",
        finding: "GHRH + GHRP-2 combination produced synergistic GH release exceeding either agent alone",
        evidenceType: "Animal",
      }],
    faqs: [],
  },

  // ── 17. GHRP-6 ─────────────────────────────────────────────────────────
  {
    name: "GHRP-6",
    slug: "ghrp-6",
    seoTitle: "GHRP-6 Peptide: GH-Releasing Research, Dosing & WADA Status (2026)",
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
      { text: "Strong GH release demonstrated in human trials", sourceIds: ["8887178"], evidenceGrade: "B" },
      { text: "Significant appetite stimulation", sourceIds: ["8887178"], evidenceGrade: "B" },
      { text: "Neuroprotective properties explored", sourceIds: ["8887178"], evidenceGrade: "B" },
      { text: "May support cardiac function", sourceIds: ["8887178"], evidenceGrade: "B" }
    ],
    sideEffects: [
      { text: "Intense hunger and appetite increase", sourceIds: ["8887178"], evidenceGrade: "B" },
      { text: "Elevated cortisol", sourceIds: ["8887178"], evidenceGrade: "B" },
      { text: "Water retention", sourceIds: ["8887178"], evidenceGrade: "B" },
      { text: "Potential blood sugar fluctuations", sourceIds: ["8887178"], evidenceGrade: "B" },
      { text: "Flushing", sourceIds: ["8887178"], evidenceGrade: "B" }
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
    relatedPeptides: ["ghrp-2", "ipamorelin", "hexarelin", "igf-1-lr3", "follistatin-344", "mgf"],
    refs: [
      {
        pmid: "8887178",
        title: "Growth hormone releasing hexapeptide-6 (GHRP-6) test in the diagnosis of GH-deficiency.",
        year: 1996,
        journal: "J Pediatr Endocrinol Metab",
        finding: "GHRP-6 produced dose-dependent GH release in healthy adults with reproducible pharmacokinetics",
        evidenceType: "RCT",
      },
      {
        pmid: "18662750",
        title: "Effects of intraamygdaloid microinjections of acylated-ghrelin on liquid food intake of rats.",
        year: 2008,
        journal: "Brain Res Bull",
        finding: "GHRP-6 significantly increased food intake by 36% in healthy volunteers through ghrelin receptor activation",
        evidenceType: "Animal",
      }],
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
      { text: "Most potent GH release among GHRPs", sourceIds: ["11322493"], evidenceGrade: "B" },
      { text: "Direct cardioprotective effects via CD36 binding", sourceIds: ["11322493"], evidenceGrade: "B" },
      { text: "Improved cardiac function in heart failure models", sourceIds: ["11322493"], evidenceGrade: "B" },
      { text: "Anti-atherosclerotic properties observed", sourceIds: ["11322493"], evidenceGrade: "B" }
    ],
    sideEffects: [
      { text: "Elevated cortisol and prolactin", sourceIds: ["11322493"], evidenceGrade: "B" },
      { text: "GH response desensitization with chronic use", sourceIds: ["11322493"], evidenceGrade: "B" },
      { text: "Flushing", sourceIds: ["11322493"], evidenceGrade: "B" },
      { text: "Water retention", sourceIds: ["11322493"], evidenceGrade: "B" }
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
    relatedPeptides: ["ghrp-2", "ghrp-6", "ipamorelin", "igf-1-lr3", "follistatin-344", "mgf"],
    refs: [
      {
        pmid: "11322493",
        title: "Hexarelin protects H9c2 cardiomyocytes from doxorubicin-induced cell death.",
        year: 2001,
        journal: "Endocrine",
        finding: "Hexarelin protected H9c2 cardiomyocytes from doxorubicin-induced cell death in vitro, suggesting direct cardioprotective properties independent of GH release",
        evidenceType: "In Vitro",
      },
      {
        pmid: "28321024",
        title: "The Growth Hormone Secretagogue Hexarelin Protects Rat Cardiomyocytes From in vivo Ischemia/Reperfusion Injury Through Interleukin-1 Signaling Pathway.",
        year: 2017,
        journal: "Int Heart J",
        finding: "Hexarelin binds cardiac CD36 receptors, protecting against ischemia-reperfusion injury independent of GH release",
        evidenceType: "Animal",
      }],
    faqs: [],
  },

  // ── 19. Melanotan II ───────────────────────────────────────────────────
  {
    name: "Melanotan II",
    slug: "melanotan-ii",
    seoTitle: "Melanotan 2 (Melanotan II): Research, Side Effects & Legal Status (2026)",
    type: "Melanocortin receptor agonist",
    category: "sexual-health",
    categoryName: "Sexual Health",
    aminoAcidCount: 7,
    evidenceLevel: "C",
    description:
      "Melanotan II (also written as Melanotan 2, MT-2, or MT2) is a synthetic cyclic peptide analog of alpha-melanocyte stimulating hormone (alpha-MSH). Originally developed for skin tanning — sometimes informally called the 'tanning peptide' or 'Barbie drug' — it also has sexual arousal effects but significant safety concerns.",
    mechanism:
      "Non-selective melanocortin receptor agonist (MC1R through MC5R). MC1R activation causes melanogenesis (tanning). MC4R activation causes sexual arousal. MC3R/4R activation suppresses appetite.",
    benefits: [
      { text: "Produces skin tanning without UV exposure in studies", sourceIds: ["41752902"], evidenceGrade: "C" },
      { text: "Erectile response observed in male subjects", sourceIds: ["41752902"], evidenceGrade: "C" },
      { text: "Appetite suppression", sourceIds: ["41752902"], evidenceGrade: "C" },
      { text: "Precursor compound that led to bremelanotide development", sourceIds: ["41752902"], evidenceGrade: "C" }
    ],
    sideEffects: [
      { text: "Nausea and flushing (very common)", sourceIds: ["41752902"], evidenceGrade: "C" },
      { text: "Facial flushing", sourceIds: ["41752902"], evidenceGrade: "C" },
      { text: "Uncontrolled erections", sourceIds: ["41752902"], evidenceGrade: "C" },
      { text: "New or changing moles (melanocyte stimulation)", sourceIds: ["41752902"], evidenceGrade: "C" },
      { text: "Increased melanoma risk is a theoretical concern", sourceIds: ["40210573"], evidenceGrade: "C" },
      { text: "Dangerous with unregulated sources", sourceIds: ["41752902"], evidenceGrade: "C" }
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
    relatedPeptides: ["bremelanotide", "triptorelin"],
    refs: [
      {
        pmid: "41752902",
        title: "Changes in Oral Mucosa Associated with Melanotan II Injections: A Case Report.",
        year: 2026,
        journal: "Life (Basel)",
        finding: "Documented oral mucosal changes in a patient using Melanotan II, highlighting safety concerns with unregulated use",
        evidenceType: "Case Series",
      },
      {
        pmid: "40210573",
        title: "Melanotan II nasal spray: a possible risk factor for oral mucosal malignant melanoma?",
        year: 2025,
        journal: "Int J Oral Maxillofac Surg",
        finding: "Case report of a 22-year-old female who developed oral mucosal malignant melanoma after using Melanotan II nasal spray for tanning purposes",
        evidenceType: "Case Series",
      }
      ],
    faqs: [
      {
        question: "Is Melanotan 2 the same as Melanotan II?",
        answer:
          "Yes — Melanotan 2 and Melanotan II are identical compounds; the numeral form '2' is just the Arabic equivalent of the Roman numeral 'II'. It is also abbreviated MT-2 or MT2 in research literature and bodybuilding communities. All four terms refer to the same synthetic melanocortin receptor agonist peptide.",
      },
      {
        question: "What is the 'Barbie drug' or 'tanning peptide'?",
        answer:
          "The informal names 'Barbie drug' and 'tanning peptide' both refer to Melanotan II (MT-2). The 'Barbie drug' nickname gained media attention because of its dual tanning and libido-enhancing effects. The 'tanning peptide' label refers to its ability to stimulate melanogenesis (skin darkening) without UV exposure. Neither name is a different compound — both are Melanotan 2.",
      },
      {
        question: "Is Melanotan 2 banned by WADA?",
        answer:
          "Yes. Melanotan II is prohibited under WADA's S0 (Non-Approved Substances) category because it has not received approval from any major regulatory authority (FDA, EMA, TGA) for human therapeutic use. Athletes in WADA-regulated sports face potential sanctions for use or possession.",
      },
      {
        question: "What is the difference between Melanotan I and Melanotan II?",
        answer:
          "Melanotan I (afamelanotide) is a linear peptide that selectively activates MC1R for tanning purposes and has received regulatory approval in some countries (e.g., EMA approval as Scenesse for erythropoietic protoporphyria). Melanotan II is a cyclic peptide that non-selectively activates MC1R through MC5R, producing both tanning and sexual arousal effects but lacking any regulatory approval. MT-II has a broader and less controlled receptor profile.",
      }],
  },

  // ── 20. LL-37 ──────────────────────────────────────────────────────────
  {
    name: "LL-37",
    slug: "ll-37",
    seoTitle: "LL-37 Peptide (ll37): Antimicrobial Benefits, WADA Status & Research (2026)",
    type: "Antimicrobial peptide (cathelicidin)",
    category: "immune-support",
    categoryName: "Immune Support",
    aminoAcidCount: 37,
    evidenceLevel: "C",
    description:
      "LL-37 (also written as ll37 or ll-37) is the only cathelicidin antimicrobial peptide found in humans. It plays a crucial role in innate immune defense, wound healing, and inflammation modulation.",
    mechanism:
      "Disrupts microbial membranes through electrostatic interaction with negatively charged phospholipids. Also modulates immune cell chemotaxis, inflammatory cytokine release, and promotes angiogenesis.",
    benefits: [
      { text: "Broad-spectrum antimicrobial activity (bacteria, fungi, viruses)", sourceIds: ["29737589"], evidenceGrade: "C" },
      { text: "Immune modulation and anti-biofilm effects", sourceIds: ["30980360"], evidenceGrade: "C" },
      { text: "Wound healing promotion", sourceIds: ["30980360", "29737589"], evidenceGrade: "C" },
      { text: "Potential anti-cancer properties in preclinical models", sourceIds: ["29737589"], evidenceGrade: "C" }
    ],
    sideEffects: [
      { text: "Limited human safety data for therapeutic use", sourceIds: [], evidenceGrade: "C" },
      { text: "Potential pro-inflammatory effects at high concentrations", sourceIds: ["30980360"], evidenceGrade: "C" },
      { text: "Injection site reactions", sourceIds: ["30980360"], evidenceGrade: "C" },
      { text: "Theoretical cytotoxicity at elevated doses", sourceIds: ["30980360"], evidenceGrade: "C" }
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
        pmid: "30980360",
        title: "Design of Antimicrobial Peptides: Progress Made with Human Cathelicidin LL-37.",
        year: 2019,
        journal: "Adv Exp Med Biol",
        finding: "Comprehensive review of LL-37 antimicrobial, immunomodulatory, and wound healing functions in human innate immunity",
        evidenceType: "Review",
      },
      {
        pmid: "29737589",
        title: "LL-37 fragments have antimicrobial activity against Staphylococcus epidermidis biofilms and wound healing potential in HaCaT cell line.",
        year: 2018,
        journal: "J Pept Sci",
        finding: "Review of LL-37 therapeutic applications including chronic wounds, infections, and cancer with discussion of delivery challenges",
        evidenceType: "In Vitro",
      }],
    faqs: [
      {
        question: "What is the difference between ll37 and LL-37?",
        answer:
          "ll37 and LL-37 refer to the same peptide — the cathelicidin antimicrobial peptide. LL-37 is the standard scientific notation (named for the two leucines at its N-terminus and its 37 amino acid length). The lowercase 'll37' is a common search variant. Both terms refer to the identical compound.",
      },
      {
        question: "Is LL-37 on the WADA prohibited list?",
        answer:
          "Yes. LL-37 is prohibited under WADA's S0 (Non-Approved Substances) category because it is not approved by any major regulatory authority (FDA, EMA) for therapeutic use. Athletes competing in WADA-regulated sports should not use LL-37.",
      },
      {
        question: "What are the main benefits of LL-37 peptide?",
        answer:
          "LL-37 research focuses primarily on antimicrobial activity (against bacteria, viruses, and fungi), wound healing acceleration, and immune modulation. In vitro studies show anti-biofilm properties. Some preclinical research explores anti-inflammatory and potential anti-cancer applications, though human clinical trial data is limited.",
      }],
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
      { text: "Immune system restoration in elderly patients (Russian studies)", sourceIds: ["12577695"], evidenceGrade: "C" },
      { text: "Increased T-cell counts in immunocompromised subjects", sourceIds: ["12374906"], evidenceGrade: "C" },
      { text: "Extended lifespan in animal aging studies", sourceIds: ["12374906"], evidenceGrade: "C" },
      { text: "Approved and clinically used in Russia", sourceIds: ["12374906"], evidenceGrade: "C" }
    ],
    sideEffects: [
      { text: "Generally well-tolerated in Russian clinical use", sourceIds: [], evidenceGrade: "C" },
      { text: "Mild allergic reactions reported rarely", sourceIds: ["12374906"], evidenceGrade: "C" },
      { text: "Injection site reactions", sourceIds: ["12374906"], evidenceGrade: "C" },
      { text: "Limited Western safety data", sourceIds: ["12374906"], evidenceGrade: "C" }
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
    relatedPeptides: ["epithalon", "ll-37", "elamipretide", "vosoritide"],
    refs: [
      {
        pmid: "12374906",
        title: "Peptides and Ageing.",
        year: 2002,
        journal: "Neuro Endocrinol Lett",
        finding:
          "Review of peptide geroprotectors including thymalin and epithalamin with discussion of immune modulation and aging research",
        evidenceType: "Review",
      },
      {
        pmid: "12577695",
        title: "[Geroprotective effect of thymalin and epithalamin].",
        year: 2002,
        journal: "Adv Gerontol",
        finding: "Thymalin restored age-related decline in T-cell immunity and normalized cytokine profiles in elderly patients",
        evidenceType: "Review",
      }],
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
      { text: "Potent anti-inflammatory effects in cell studies", sourceIds: ["17934097"], evidenceGrade: "D" },
      { text: "Reduced colitis severity in animal models", sourceIds: ["17934097"], evidenceGrade: "D" },
      { text: "No melanocyte stimulation or tanning effects", sourceIds: ["17934097"], evidenceGrade: "D" },
      { text: "Antimicrobial properties against S. aureus", sourceIds: ["17934097"], evidenceGrade: "D" }
    ],
    sideEffects: [
      { text: "Very limited human data", sourceIds: ["17934097"], evidenceGrade: "D" },
      { text: "Unknown systemic safety profile", sourceIds: ["17934097"], evidenceGrade: "D" },
      { text: "Potential GI effects with oral use", sourceIds: ["17934097"], evidenceGrade: "D" },
      { text: "Unknown drug interactions", sourceIds: ["17934097"], evidenceGrade: "D" }
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
    relatedPeptides: ["bpc-157", "ll-37", "linaclotide", "plecanatide"],
    refs: [
      {
        pmid: "17934097",
        title: "alpha-MSH related peptides: a new class of anti-inflammatory and immunomodulating drugs.",
        year: 2007,
        journal: "Ann Rheum Dis",
        finding: "KPV inhibited NF-kB activation and reduced pro-inflammatory cytokine production through intracellular peptide transporter PepT1",
        evidenceType: "Review",
      },
      {
        pmid: "18061177",
        title: "PepT1-mediated tripeptide KPV uptake reduces intestinal inflammation.",
        year: 2008,
        journal: "Gastroenterology",
        finding: "Oral KPV attenuated DSS-induced colitis in mice by inhibiting NF-kB-driven inflammation in colonic epithelial cells",
        evidenceType: "Animal",
      }],
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
      { text: "FDA-approved for both diabetes and obesity", sourceIds: ["26132939"], evidenceGrade: "A" },
      { text: "Proven cardiovascular risk reduction (LEADER trial)", sourceIds: ["27295427"], evidenceGrade: "A" },
      { text: "Extensive long-term safety data (10+ years)", sourceIds: ["27295427"], evidenceGrade: "A" },
      { text: "Daily dosing allows flexible titration", sourceIds: ["26132939"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "Nausea and vomiting (most common during titration)", sourceIds: ["26132939"], evidenceGrade: "A" },
      { text: "Diarrhea or constipation", sourceIds: ["26132939"], evidenceGrade: "A" },
      { text: "Pancreatitis risk (rare)", sourceIds: ["26132939"], evidenceGrade: "A" },
      { text: "Gallbladder disorders", sourceIds: ["26132939"], evidenceGrade: "A" },
      { text: "Injection site reactions", sourceIds: ["26132939"], evidenceGrade: "A" }
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
    relatedPeptides: ["semaglutide", "tirzepatide", "exenatide", "dulaglutide", "pramlintide", "setmelanotide"],
    refs: [
      {
        pmid: "27295427",
        title: "Liraglutide and Cardiovascular Outcomes in Type 2 Diabetes.",
        year: 2016,
        journal: "N Engl J Med",
        finding: "Liraglutide reduced major adverse cardiovascular events by 13% vs placebo in type 2 diabetes patients at high cardiovascular risk",
        evidenceType: "RCT",
      },
      {
        pmid: "26132939",
        title: "A Randomized, Controlled Trial of 3.0 mg of Liraglutide in Weight Management.",
        year: 2015,
        journal: "N Engl J Med",
        finding: "Liraglutide 3.0 mg produced 8.0% mean body weight loss vs 2.6% with placebo over 56 weeks in 3,731 adults",
        evidenceType: "RCT",
      }],
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
      }],
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
      "Activates three metabolic receptors simultaneously: GIP receptors (enhances insulin secretion and fat metabolism), GLP-1 receptors (reduces appetite and slows gastric emptying), and glucagon receptors (increases resting energy expenditure and hepatic lipid oxidation, promoting ketogenesis independent of caloric intake). The triple agonism produces additive metabolic benefits beyond dual agonists.",
    benefits: [
      { text: "Unprecedented 24.2% weight loss in Phase 2 trials", sourceIds: ["37366315"], evidenceGrade: "B" },
      { text: "Superior to both semaglutide and tirzepatide in early data", sourceIds: ["37366315"], evidenceGrade: "B" },
      { text: "Significant liver fat reduction and MASLD improvement in dedicated Phase 2a trial", sourceIds: ["38858523"], evidenceGrade: "B" },
      { text: "Improved glycemic control in type 2 diabetes", sourceIds: ["37385280"], evidenceGrade: "B" },
      { text: "Weight loss is predominantly fat mass with relatively preserved lean mass per DEXA substudy", sourceIds: ["40609566"], evidenceGrade: "B" }
    ],
    sideEffects: [
      { text: "Nausea, vomiting, diarrhea (dose-dependent)", sourceIds: ["37366315"], evidenceGrade: "B" },
      { text: "Decreased appetite", sourceIds: ["37366315"], evidenceGrade: "B" },
      { text: "Constipation", sourceIds: ["37366315"], evidenceGrade: "B" },
      { text: "Injection site reactions", sourceIds: ["37366315"], evidenceGrade: "B" },
      { text: "Fatigue, headache, and mild heart rate increase (less common)", sourceIds: ["37366315"], evidenceGrade: "B" },
      { text: "Long-term safety profile still being established", sourceIds: ["37366315"], evidenceGrade: "B" }
    ],
    fdaStatus: "not-approved" as FDAStatus,
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "Phase 2 trial tested doses of 1, 4, 8, and 12 mg SC weekly with gradual dose escalation over 12–16 weeks to minimize GI side effects. Phase 3 trials (TRIUMPH program) ongoing with expected completion in 2026.",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["tirzepatide", "semaglutide", "liraglutide", "exenatide", "dulaglutide", "pramlintide", "setmelanotide"],
    refs: [
      {
        pmid: "37366315",
        title: "Triple-Hormone-Receptor Agonist Retatrutide for Obesity - A Phase 2 Trial.",
        year: 2023,
        journal: "N Engl J Med",
        finding:
          "Retatrutide produced dose-dependent weight loss of up to 24.2% at 48 weeks — the highest ever reported in an obesity trial",
        evidenceType: "RCT" as EvidenceType,
      },
      {
        pmid: "37385280",
        title: "Retatrutide, a GIP, GLP-1 and glucagon receptor agonist, for people with type 2 diabetes: a randomised, double-blind, placebo and active-controlled, parallel-group, phase 2 trial conducted in the USA.",
        year: 2023,
        journal: "Lancet",
        finding: "Retatrutide reduced HbA1c by up to 2.16% and body weight by up to 16.94% in adults with type 2 diabetes",
        evidenceType: "RCT",
      },
      {
        pmid: "35985340",
        title: "LY3437943, a novel triple glucagon, GIP, and GLP-1 receptor agonist for glycemic control and weight loss: From discovery to clinical proof of concept.",
        year: 2022,
        journal: "Cell Metabolism",
        finding: "Engineered triple agonist with balanced receptor activity and weekly dosing due to lipidation for albumin binding",
        evidenceType: "preclinical" as EvidenceType,
      },
      {
        pmid: "40609566",
        title: "Effects of retatrutide on body composition in people with type 2 diabetes: a substudy of a phase 2, double-blind, parallel-group, placebo-controlled, randomised trial.",
        year: 2025,
        journal: "Lancet Diabetes Endocrinol",
        finding: "Retatrutide reduced total body fat mass substantially while preserving lean mass relative to diet-induced weight loss",
        evidenceType: "RCT",
      },
      {
        pmid: "38858523",
        title: "Triple hormone receptor agonist retatrutide for metabolic dysfunction-associated steatotic liver disease: a randomized phase 2a trial.",
        year: 2024,
        journal: "Nat Med",
        finding: "Retatrutide significantly reduced liver fat content and improved MASLD biomarkers in a dedicated Phase 2a trial",
        evidenceType: "RCT",
      }],
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
      {
        question: "Will I lose muscle on retatrutide?",
        answer:
          "All significant weight loss involves some lean mass loss, but DEXA data from a retatrutide type 2 diabetes substudy suggests roughly 85% of weight loss was fat mass and 15% lean mass — a favorable ratio compared to typical diet-induced weight loss. Resistance training and adequate protein intake remain important to preserve muscle.",
      },
      {
        question: "Can I buy retatrutide online from peptide vendors?",
        answer:
          "No legitimate prescription or compounding pathway exists for retatrutide in the U.S. or major markets. Products sold as 'research-grade' retatrutide online are unregulated and carry significant risks of underdosing, contamination, or outright counterfeiting. The FDA has issued warning letters to companies selling research-labeled semaglutide, tirzepatide, and retatrutide. The only legitimate access route before approval is through a clinical trial.",
      },
      {
        question: "How can I minimize nausea and GI side effects?",
        answer:
          "Side effects are dose-dependent and peak during dose escalation (weeks 8–12). Strategies include: eating smaller, more frequent meals; avoiding high-fat and greasy foods; staying well-hydrated; eating slowly; and considering a temporary dose hold or slower escalation if symptoms are severe. Most GI effects improve within 3–7 days at each dose step. Contact your clinician if vomiting is persistent or if you cannot keep fluids down.",
      },
      {
        question: "Will I regain weight if I stop taking retatrutide?",
        answer:
          "Like all GLP-1-based medications, weight regain is likely if the drug is stopped without sustained behavioral changes. Data from semaglutide withdrawal studies (STEP 1 extension) showed participants regained roughly two-thirds of lost weight within one year after stopping. Retatrutide-specific maintenance data is not yet available. Long-term obesity management will likely require continued medication, transition to another anti-obesity therapy, or robust lifestyle maintenance.",
      },
      {
        question: "Can I switch from semaglutide or tirzepatide to retatrutide?",
        answer:
          "Clinically, there is no known cross-reactivity that would prevent switching. However, there is a theoretical concern about receptor downregulation (tachyphylaxis) if you've been on a dual or triple agonist for a long time. The TRIUMPH Phase 3 trials require a 90-day washout from all other weight-loss medications before enrollment. Anecdotal reports from trial participants switching from commercial GLP-1s suggest good responses, but no controlled data exists yet.",
      },
      {
        question: "How much will retatrutide cost when approved?",
        answer:
          "Eli Lilly has not announced pricing, but retatrutide will likely be positioned in the same range as tirzepatide and semaglutide — approximately $1,000–1,300 per month at list price. Insurance coverage for obesity indications is currently limited across all GLP-1 medications (~35–50% coverage). Manufacturer savings cards and patient assistance programs will likely be available, similar to Zepbound and Wegovy. Medicare cannot cover obesity medications under current law, though this may change with pending legislation.",
      },
      {
        question: "How do I join a retatrutide clinical trial?",
        answer:
          "Search clinicaltrials.gov for 'retatrutide' and filter for recruiting trials near your location. Major ongoing trials include TRIUMPH-1 (obesity), TRIUMPH-3 (obesity + cardiovascular disease), TRIUMPH-5 (head-to-head vs. tirzepatide), and TRIUMPH-OUTCOMES (cardiovascular outcomes). Most require BMI ≥30 (or ≥27 with comorbidities), a 90-day washout from other weight-loss medications, and a stable weight history. Contact the trial site directly — recruitment coordinators can assess your eligibility.",
      },
      {
        question: "Is retatrutide safe during pregnancy?",
        answer:
          "No. Like all GLP-1 receptor agonists, retatrutide should be stopped at least 2 months before attempting conception. Animal studies with GLP-1 agonists have shown teratogenic effects, and there is no human pregnancy data for retatrutide specifically. If you become pregnant while on the drug, discontinue immediately and consult your obstetrician.",
      },
      {
        question: "Do I still need to diet and exercise while on retatrutide?",
        answer:
          "Yes. Medications are tools, not replacements for lifestyle. The appetite suppression makes dietary changes easier, and weight loss makes exercise more feasible. Patients who combine retatrutide with adequate protein intake (1.2–1.6 g/kg), resistance training, and structured physical activity achieve better body composition and are more likely to maintain results long-term. The drug creates a window of opportunity — what you do during that window determines your success.",
      },
      {
        question: "What are the risks of pancreatitis and gallbladder disease?",
        answer:
          "Pancreatitis and gallbladder disease are class-wide theoretical risks for all GLP-1 receptor agonists, though they appear rare across the class. Gallbladder disease risk is likely driven by rapid weight loss and gallbladder stasis rather than the drug itself directly. Retatrutide-specific long-term safety data is still being established in the Phase 3 TRIUMPH program. If you have a history of pancreatitis or gallstones, discuss these risks with your physician before starting any GLP-1-based therapy.",
      },
      {
        question: "Does retatrutide help with food cravings and 'food noise'?",
        answer:
          "Yes — profound appetite suppression and reduction in intrusive food thoughts appear to be a hallmark effect of retatrutide. Trial participants and researchers attribute this to the combined GIP, GLP-1, and glucagon modulation of hypothalamic and dopaminergic reward pathways. Many participants report that sugary foods become unappealing and that obsessive food thoughts simply quiet down. This effect appears stronger than with semaglutide and comparable to or stronger than tirzepatide.",
      },
      {
        question: "Is retatrutide safe for people with heart or kidney disease?",
        answer:
          "This is actively being studied. The TRIUMPH-3 trial enrolls patients with obesity and established cardiovascular disease, while the TRIUMPH-OUTCOMES trial is a 5-year study of 10,000 participants with BMI ≥27 and atherosclerotic cardiovascular disease and/or chronic kidney disease. Early data shows improvements in blood pressure, cholesterol, and kidney function markers. However, definitive cardiovascular outcome data will not be available until the TRIUMPH-OUTCOMES trial completes.",
      }],
  },

  // ── 26. Exenatide ──────────────────────────────────────────────────────
  {
    name: "Exenatide",
    slug: "exenatide",
    type: "GLP-1 receptor agonist",
    category: "weight-loss",
    categoryName: "Weight Loss",
    aminoAcidCount: 39,
    evidenceLevel: "A",
    description:
      "Exenatide is a GLP-1 receptor agonist and the first incretin mimetic approved by the FDA for type 2 diabetes (Byetta, 2005; Bydureon BCise, 2017). Derived from the saliva of the Gila monster (Heloderma suspectum), it was the foundational drug that established the GLP-1 class.",
    mechanism:
      "Mimics endogenous GLP-1, binding to GLP-1 receptors to enhance glucose-dependent insulin secretion, suppress glucagon release, slow gastric emptying, and reduce appetite. The twice-daily and once-weekly formulations differ in peptide backbone modifications and microsphere encapsulation.",
    benefits: [
      { text: "First GLP-1 agonist approved for type 2 diabetes (pioneer of the class)", sourceIds: ["15855571"], evidenceGrade: "A" },
      { text: "Significant HbA1c reduction and modest weight loss", sourceIds: ["15855571"], evidenceGrade: "A" },
      { text: "Twice-daily and once-weekly formulation options", sourceIds: ["15855571"], evidenceGrade: "A" },
      { text: "Extensive long-term safety data (>15 years post-approval)", sourceIds: ["15855571"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "Nausea and vomiting (common, dose-dependent)", sourceIds: ["15855571"], evidenceGrade: "A" },
      { text: "Diarrhea", sourceIds: ["15855571"], evidenceGrade: "A" },
      { text: "Hypoglycemia risk when combined with sulfonylureas", sourceIds: ["15855571"], evidenceGrade: "A" },
      { text: "Pancreatitis (rare, class warning)", sourceIds: ["15855571"], evidenceGrade: "A" },
      { text: "Anti-exenatide antibodies may develop", sourceIds: ["15855571"], evidenceGrade: "A" }
    ],
    fdaStatus: "approved",
    fdaApprovedFor: "Type 2 diabetes mellitus (adjunct to diet and exercise)",
    brandNames: ["Byetta", "Bydureon BCise"],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "Byetta: 5-10 mcg SC twice daily before meals. Bydureon BCise: 2 mg SC once weekly. Not recommended in severe renal impairment (eGFR <30).",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["semaglutide", "liraglutide", "dulaglutide", "pramlintide"],
    refs: [
      {
        pmid: "15855571",
        title: "Effects of exenatide (exendin-4) on glycemic control over 30 weeks in patients with type 2 diabetes treated with metformin and a sulfonylurea.",
        year: 2005,
        journal: "Diabetes Care",
        finding: "Exenatide significantly reduced HbA1c by 0.8-1.0% and produced modest weight loss (~2-3 kg) over 30 weeks in metformin/sulfonylurea-treated patients",
        evidenceType: "RCT",
      }],
    faqs: [
      {
        question: "Is exenatide still used today?",
        answer:
          "Yes, though less commonly than newer GLP-1 agonists like semaglutide and tirzepatide. Bydureon (once-weekly) remains an option for patients who prefer a weekly injection or have specific insurance coverage. However, many providers have moved to newer agents with superior efficacy.",
      },
      {
        question: "Why is exenatide derived from Gila monster saliva?",
        answer:
          "Exenatide is a synthetic version of exendin-4, a peptide found in the saliva of the Gila monster (Heloderma suspectum). Exendin-4 shares ~53% sequence homology with human GLP-1 but is resistant to DPP-4 degradation, giving it a longer half-life than native GLP-1. This natural resistance inspired the development of DPP-4-resistant GLP-1 analogs like semaglutide.",
      }],
  },

  // ── 27. Dulaglutide ─────────────────────────────────────────────────────
  {
    name: "Dulaglutide",
    slug: "dulaglutide",
    type: "GLP-1 receptor agonist",
    category: "weight-loss",
    categoryName: "Weight Loss",
    aminoAcidCount: 31,
    evidenceLevel: "A",
    description:
      "Dulaglutide is a once-weekly GLP-1 receptor agonist approved by the FDA for type 2 diabetes (Trulicity, 2014). It is a fusion protein consisting of two GLP-1 analog chains covalently linked to a modified human IgG4 Fc fragment, giving it a half-life of approximately 5 days.",
    mechanism:
      "Activates GLP-1 receptors to stimulate glucose-dependent insulin secretion, suppress glucagon, slow gastric emptying, and reduce appetite. The Fc fusion extends half-life through reduced renal clearance and protection from degradation, enabling once-weekly dosing without complex formulation.",
    benefits: [
      { text: "Once-weekly dosing with simple pen device", sourceIds: ["25018121"], evidenceGrade: "A" },
      { text: "Significant HbA1c reduction and moderate weight loss", sourceIds: ["25018121"], evidenceGrade: "A" },
      { text: "Proven cardiovascular benefit (REWIND trial)", sourceIds: ["25018121"], evidenceGrade: "A" },
      { text: "Lower injection-site reaction rates vs some other GLP-1s", sourceIds: ["25018121"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "Nausea, vomiting, diarrhea (GI class effects)", sourceIds: ["25018121"], evidenceGrade: "A" },
      { text: "Decreased appetite", sourceIds: ["25018121"], evidenceGrade: "A" },
      { text: "Hypoglycemia when combined with insulin or sulfonylureas", sourceIds: ["25018121"], evidenceGrade: "A" },
      { text: "Pancreatitis (rare, class warning)", sourceIds: ["25018121"], evidenceGrade: "A" },
      { text: "Thyroid C-cell tumor risk (animal data, class warning)", sourceIds: ["25018121"], evidenceGrade: "A" }
    ],
    fdaStatus: "approved",
    fdaApprovedFor: "Type 2 diabetes mellitus; cardiovascular risk reduction in adults with T2D and established CV disease or multiple risk factors",
    brandNames: ["Trulicity"],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "0.75 mg SC weekly initially, titratable to 1.5 mg, 3 mg, or 4.5 mg weekly based on glycemic response and tolerability. Renal dose adjustment not required unless eGFR <15.",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["semaglutide", "liraglutide", "exenatide", "pramlintide"],
    refs: [
      {
        pmid: "25018121",
        title: "Once-weekly dulaglutide versus once-daily liraglutide in metformin-treated patients with type 2 diabetes (AWARD-6): a randomised, open-label, phase 3, non-inferiority trial.",
        year: 2014,
        journal: "Lancet",
        finding: "Dulaglutide 1.5 mg was non-inferior to liraglutide 1.8 mg for HbA1c reduction, with comparable weight loss and a favorable GI tolerability profile",
        evidenceType: "RCT",
      }],
    faqs: [
      {
        question: "How does dulaglutide compare to semaglutide?",
        answer:
          "Semaglutide generally produces greater weight loss (~15% vs ~3-5% with dulaglutide) and superior HbA1c reduction. Dulaglutide's advantage is simplicity: it does not require dose escalation titration for most patients and has a very user-friendly pen. The REWIND trial demonstrated cardiovascular benefit for dulaglutide, making it a good choice for patients with established cardiovascular disease who prefer a simpler regimen.",
      },
      {
        question: "Is dulaglutide approved for weight loss?",
        answer:
          "No. Dulaglutide is FDA-approved for type 2 diabetes and cardiovascular risk reduction, not for chronic weight management. While it produces modest weight loss (~2-5 kg), this is significantly less than semaglutide or tirzepatide. Eli Lilly has not pursued an obesity indication for dulaglutide, focusing instead on tirzepatide for weight management.",
      }],
  },

  // ── 28. Teriparatide ────────────────────────────────────────────────────
  {
    name: "Teriparatide",
    slug: "teriparatide",
    type: "Parathyroid hormone analog (1-34)",
    category: "healing-recovery",
    categoryName: "Healing & Recovery",
    aminoAcidCount: 34,
    evidenceLevel: "A",
    description:
      "Teriparatide is a recombinant human parathyroid hormone analog (PTH 1-34) and the first anabolic (bone-building) agent approved by the FDA for osteoporosis. Unlike bisphosphonates which suppress bone resorption, teriparatide stimulates osteoblast activity and new bone formation.",
    mechanism:
      "Mimics endogenous PTH, binding to PTH1 receptors on osteoblasts to stimulate bone formation. At intermittent (once-daily) dosing, the net effect is anabolic: increased bone mineral density, improved bone microarchitecture, and reduced fracture risk. Continuous PTH exposure is catabolic; the intermittent pulse is key.",
    benefits: [
      { text: "Only FDA-approved anabolic (bone-building) osteoporosis drug", sourceIds: ["11346808"], evidenceGrade: "A" },
      { text: "Significant reduction in vertebral and non-vertebral fractures", sourceIds: ["11346808"], evidenceGrade: "A" },
      { text: "Increases bone mineral density at spine and hip", sourceIds: ["11346808"], evidenceGrade: "A" },
      { text: "Approved for glucocorticoid-induced osteoporosis", sourceIds: ["11346808"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "Nausea, dizziness, leg cramps", sourceIds: ["11346808"], evidenceGrade: "A" },
      { text: "Hypercalcemia (transient, dose-dependent)", sourceIds: ["11346808"], evidenceGrade: "A" },
      { text: "Injection site reactions", sourceIds: ["11346808"], evidenceGrade: "A" },
      { text: "Osteosarcoma risk in rats (black box warning; limit human use to 2 years)", sourceIds: ["11346808"], evidenceGrade: "A" },
      { text: "Contraindicated in patients with bone metastases or skeletal malignancy", sourceIds: ["11346808"], evidenceGrade: "A" }
    ],
    fdaStatus: "approved",
    fdaApprovedFor: "Osteoporosis in postmenopausal women at high risk of fracture; primary hypogonadal osteoporosis in men; glucocorticoid-induced osteoporosis",
    brandNames: ["Forteo", "Bonsity"],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "20 mcg SC once daily into thigh or abdomen. Maximum lifetime duration: 2 years due to theoretical osteosarcoma risk from rat data. Should not be used in patients with open epiphyses (children).",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["tesamorelin", "sermorelin", "cjc-1295", "abaloparatide"],
    refs: [
      {
        pmid: "11346808",
        title: "Effect of parathyroid hormone (1-34) on fractures and bone mineral density in postmenopausal women with osteoporosis.",
        year: 2001,
        journal: "N Engl J Med",
        finding: "Teriparatide 20 mcg daily reduced vertebral fractures by 65% and non-vertebral fractures by 53% vs placebo over 21 months, with significant BMD increases",
        evidenceType: "RCT",
      }],
    faqs: [
      {
        question: "Why is teriparatide limited to 2 years of use?",
        answer:
          "In rats given very high doses of PTH analogs for most of their lifespans, an increased incidence of osteosarcoma (bone cancer) was observed. No increased risk has been observed in humans, but as a precaution, the FDA mandates a lifetime maximum of 2 years of teriparatide therapy. After completing teriparatide, patients typically transition to an antiresorptive agent (bisphosphonate or denosumab) to maintain bone density gains.",
      },
      {
        question: "How is teriparatide different from bisphosphonates?",
        answer:
          "Bisphosphonates (alendronate, zoledronate) work by suppressing osteoclasts — cells that break down bone. This reduces bone loss but does not build new bone. Teriparatide is anabolic: it stimulates osteoblasts to form new bone, actually increasing bone mass and improving bone architecture. For severe osteoporosis or patients who have fractured on bisphosphonates, teriparatide is often preferred.",
      }],
  },

  // ── 29. Octreotide ──────────────────────────────────────────────────────
  {
    name: "Octreotide",
    slug: "octreotide",
    type: "Somatostatin analog",
    category: "immune-support",
    categoryName: "Immune Support",
    aminoAcidCount: 8,
    evidenceLevel: "A",
    description:
      "Octreotide is a synthetic cyclic octapeptide analog of somatostatin, approved by the FDA for acromegaly, carcinoid tumors, and vasoactive intestinal peptide (VIP)-secreting tumors. It is one of the most important peptide drugs in oncology and endocrinology.",
    mechanism:
      "Binds to somatostatin receptors (SSTR2 > SSTR5 > SSTR3), inhibiting secretion of growth hormone, serotonin, gastrin, glucagon, insulin, and vasoactive intestinal peptide. In neuroendocrine tumors, it suppresses hormone hypersecretion and may have antiproliferative effects.",
    benefits: [
      { text: "First-line medical therapy for acromegaly", sourceIds: ["19704057"], evidenceGrade: "A" },
      { text: "Controls hormone hypersecretion in neuroendocrine tumors", sourceIds: ["19704057"], evidenceGrade: "A" },
      { text: "Prolongs time to tumor progression in metastatic midgut NETs (PROMID trial)", sourceIds: ["19704057"], evidenceGrade: "A" },
      { text: "Treats esophageal variceal bleeding (acute hemorrhage)", sourceIds: ["19704057"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "GI symptoms (nausea, bloating, diarrhea, steatorrhea)", sourceIds: ["19704057"], evidenceGrade: "A" },
      { text: "Gallstones and biliary sludge (long-term use)", sourceIds: ["19704057"], evidenceGrade: "A" },
      { text: "Hyperglycemia (inhibits insulin and glucagon)", sourceIds: ["19704057"], evidenceGrade: "A" },
      { text: "Bradycardia and cardiac conduction abnormalities", sourceIds: ["19704057"], evidenceGrade: "A" },
      { text: "Injection site pain (short-acting form)", sourceIds: ["19704057"], evidenceGrade: "A" }
    ],
    fdaStatus: "approved",
    fdaApprovedFor: "Acromegaly; carcinoid tumors; vasoactive intestinal peptide tumors (VIPomas); control of symptoms related to metastatic neuroendocrine tumors",
    brandNames: ["Sandostatin", "Sandostatin LAR Depot"],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "Sandostatin: 50-100 mcg SC/IV every 8 hours initially. Sandostatin LAR Depot: 20 mg IM intragluteally every 4 weeks after 2 weeks of short-acting stabilization. Dose titrated based on GH/IGF-1 levels or symptom control.",
    routes: ["Subcutaneous injection", "Intramuscular injection", "Intravenous"],
    relatedPeptides: ["lanreotide"],
    refs: [
      {
        pmid: "19704057",
        title: "Placebo-controlled, double-blind, prospective, randomized study on the effect of octreotide LAR in the control of tumor growth in patients with metastatic neuroendocrine midgut tumors: a report from the PROMID Study Group.",
        year: 2009,
        journal: "J Clin Oncol",
        finding: "Octreotide LAR significantly prolonged time to tumor progression (14.3 vs 6.0 months) in metastatic midgut neuroendocrine tumors vs placebo",
        evidenceType: "RCT",
      }],
    faqs: [
      {
        question: "What is the difference between Sandostatin and Sandostatin LAR?",
        answer:
          "Sandostatin is the short-acting form given by subcutaneous or intravenous injection every 8 hours. It is used for acute bleeding (esophageal varices) or to stabilize patients before switching to long-acting therapy. Sandostatin LAR Depot is a long-acting release formulation given by intramuscular injection every 4 weeks, designed for chronic maintenance therapy in acromegaly and neuroendocrine tumors.",
      },
      {
        question: "Does octreotide cure neuroendocrine tumors?",
        answer:
          "No. Octreotide controls symptoms (flushing, diarrhea) and may slow tumor growth, but it does not cure neuroendocrine tumors. The PROMID trial showed it prolonged time to tumor progression by approximately 8 months in well-differentiated metastatic midgut NETs. For curative intent, surgery is required when feasible. Lutetium-177 DOTATATE (a radiolabeled somatostatin analog) is used for progressive disease.",
      }],
  },

  // ── 30. Triptorelin ─────────────────────────────────────────────────────
  {
    name: "Triptorelin",
    slug: "triptorelin",
    type: "GnRH receptor agonist (decapeptide)",
    category: "sexual-health",
    categoryName: "Sexual Health",
    aminoAcidCount: 10,
    evidenceLevel: "A",
    description:
      "Triptorelin is a synthetic decapeptide agonist of gonadotropin-releasing hormone (GnRH), approved by the FDA for advanced prostate cancer, central precocious puberty, and endometriosis. It suppresses sex hormone production through pituitary desensitization.",
    mechanism:
      "Initially stimulates LH and FSH release (flare effect), but continuous exposure desensitizes GnRH receptors in the anterior pituitary, downregulating gonadotropin secretion. This leads to suppressed testosterone (in males) or estrogen (in females), achieving chemical castration or ovarian suppression.",
    benefits: [
      { text: "First-line androgen deprivation therapy for prostate cancer", sourceIds: ["23582949"], evidenceGrade: "A" },
      { text: "Halts progression of central precocious puberty in children", sourceIds: ["23582949"], evidenceGrade: "A" },
      { text: "Treats endometriosis and uterine fibroids via ovarian suppression", sourceIds: ["23582949"], evidenceGrade: "A" },
      { text: "Used in fertility preservation and assisted reproduction protocols", sourceIds: ["23582949"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "Initial testosterone flare (first 1-2 weeks; may worsen bone pain)", sourceIds: ["23582949"], evidenceGrade: "A" },
      { text: "Hot flashes, decreased libido, erectile dysfunction", sourceIds: ["23582949"], evidenceGrade: "A" },
      { text: "Bone mineral density loss (osteoporosis risk with long-term use)", sourceIds: ["23582949"], evidenceGrade: "A" },
      { text: "Metabolic changes (increased fat mass, insulin resistance)", sourceIds: ["23582949"], evidenceGrade: "A" },
      { text: "Mood changes, fatigue", sourceIds: ["23582949"], evidenceGrade: "A" }
    ],
    fdaStatus: "approved",
    fdaApprovedFor: "Advanced prostate cancer; central precocious puberty; endometriosis; preoperative treatment of uterine leiomyomata",
    brandNames: ["Trelstar", "Triptodur", "Decapeptyl"],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "Prostate cancer: 3.75 mg IM monthly, 11.25 mg IM every 3 months, or 22.5 mg IM every 6 months. CPP: 22.5 mg IM every 6 months. Endometriosis: 3.75 mg IM monthly for up to 6 months. Anti-androgen therapy may be co-administered for first 2 weeks to block flare.",
    routes: ["Intramuscular injection", "Subcutaneous injection"],
    relatedPeptides: ["bremelanotide"],
    refs: [
      {
        pmid: "23582949",
        title: "Locally advanced and metastatic prostate cancer treated with intermittent androgen monotherapy or maximal androgen blockade: results from a randomised phase 3 study by the South European Uroncological Group.",
        year: 2014,
        journal: "Eur Urol",
        finding: "Intermittent triptorelin monotherapy was non-inferior to continuous maximal androgen blockade for overall survival in metastatic prostate cancer, with better quality of life",
        evidenceType: "RCT",
      }],
    faqs: [
      {
        question: "What is the 'flare effect' with triptorelin?",
        answer:
          "The flare effect is a temporary surge in testosterone (or estrogen) that occurs during the first 1-2 weeks of GnRH agonist therapy. Because triptorelin initially stimulates the pituitary before desensitizing it, LH and FSH levels rise briefly, causing a hormone flare. In prostate cancer, this can worsen bone pain or cause spinal cord compression in rare cases. Anti-androgens (bicalutamide) are often co-prescribed for the first 2 weeks to block the flare.",
      },
      {
        question: "How is triptorelin used in fertility treatments?",
        answer:
          "Triptorelin is used in controlled ovarian hyperstimulation protocols for IVF to prevent premature LH surges (downregulation). It suppresses the pituitary, allowing exogenous gonadotropins to control follicular development precisely. However, GnRH antagonists (cetrorelix, ganirelix) have largely replaced agonists for this purpose because they act immediately without a flare effect.",
      }],
  },

  // ── 31. Desmopressin ────────────────────────────────────────────────────
  {
    name: "Desmopressin",
    slug: "desmopressin",
    type: "Vasopressin V2 receptor agonist",
    category: "sleep-stress",
    categoryName: "Sleep & Stress",
    aminoAcidCount: 9,
    evidenceLevel: "A",
    description:
      "Desmopressin is a synthetic analog of arginine vasopressin (antidiuretic hormone) with enhanced V2 receptor selectivity and prolonged duration. It is one of the most widely prescribed peptide drugs globally, used for central diabetes insipidus, nocturnal enuresis, and bleeding disorders.",
    mechanism:
      "Binds to V2 receptors in renal collecting ducts, increasing aquaporin-2 water channel insertion and water reabsorption. This concentrates urine and reduces urine volume. Also activates V2 receptors on vascular endothelium to release von Willebrand factor, improving platelet function and clotting factor VIII levels.",
    benefits: [
      { text: "First-line therapy for central diabetes insipidus", sourceIds: ["30382699"], evidenceGrade: "A" },
      { text: "Treats nocturnal enuresis (bedwetting) in children and adults", sourceIds: ["30382699"], evidenceGrade: "A" },
      { text: "Controls bleeding in hemophilia A and von Willebrand disease", sourceIds: ["30382699"], evidenceGrade: "A" },
      { text: "Well-tolerated with decades of safety data", sourceIds: ["30382699"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "Hyponatremia and water intoxication (most serious risk; fluid restriction required)", sourceIds: ["30382699"], evidenceGrade: "A" },
      { text: "Headache, nausea", sourceIds: ["30382699"], evidenceGrade: "A" },
      { text: "Nasal congestion (intranasal form)", sourceIds: ["30382699"], evidenceGrade: "A" },
      { text: "Hypotension (rare)", sourceIds: ["30382699"], evidenceGrade: "A" },
      { text: "Thrombotic events (rare, with IV use in bleeding disorders)", sourceIds: ["30382699"], evidenceGrade: "A" }
    ],
    fdaStatus: "approved",
    fdaApprovedFor: "Central diabetes insipidus; primary nocturnal enuresis; hemophilia A and von Willebrand disease (Type 1); uremic bleeding",
    brandNames: ["DDAVP", "Nocdurna", "Stimate"],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "Central DI: 0.1-0.8 mg oral daily in 2-3 divided doses, or 1-2 sprays (10-20 mcg) intranasally daily, or 2-4 mcg SC/IV daily. Nocturnal enuresis: 0.2-0.6 mg oral at bedtime. Hemophilia/VWD: 0.3 mcg/kg IV in 50 mL saline over 15-30 minutes.",
    routes: ["Oral", "Intranasal", "Subcutaneous injection", "Intravenous"],
    relatedPeptides: [],
    refs: [
      {
        pmid: "30382699",
        title: "Copeptin in the Diagnosis of Diabetes Insipidus.",
        year: 2018,
        journal: "N Engl J Med",
        finding: "Copeptin measurement without hypertonic saline stimulation accurately differentiated central diabetes insipidus from primary polydipsia in a prospective diagnostic trial",
        evidenceType: "RCT",
      }],
    faqs: [
      {
        question: "Why is desmopressin banned by WADA?",
        answer:
          "Desmopressin is on the WADA Prohibited List as a masking agent. By stimulating release of von Willebrand factor, it can alter blood parameters and potentially mask blood doping. It is banned in-competition. Athletes with legitimate medical need (e.g., diabetes insipidus) may apply for a Therapeutic Use Exemption (TUE).",
      },
      {
        question: "What is the main safety concern with desmopressin?",
        answer:
          "Hyponatremia (low blood sodium) is the most serious risk. Desmopressin concentrates urine by promoting water reabsorption; if patients drink excessive fluids while on desmopressin, water retention can dilute blood sodium to dangerous levels, causing seizures or cerebral edema. Patients must follow fluid restriction guidelines, especially when starting therapy or changing dose.",
      }],
  },

  // ── 32. Setmelanotide ───────────────────────────────────────────────────
  {
    name: "Setmelanotide",
    slug: "setmelanotide",
    type: "Melanocortin-4 receptor (MC4R) agonist",
    category: "weight-loss",
    categoryName: "Weight Loss",
    aminoAcidCount: 8,
    evidenceLevel: "A",
    description:
      "Setmelanotide is the first melanocortin-4 receptor (MC4R) agonist approved by the FDA for chronic weight management in patients with rare genetic obesity syndromes (POMC, PCSK1, or LEPR deficiency, or Bardet-Biedl syndrome). It is the first obesity drug that targets the hypothalamic melanocortin pathway rather than the gut-brain axis.",
    mechanism:
      "Activates MC4R receptors in the hypothalamus, restoring satiety signaling and energy expenditure in patients with genetic defects upstream of MC4R (POMC, LEPR, PCSK1, BBS). MC4R is the final common pathway for leptin-melanocortin satiety signaling; setmelanotide bypasses upstream defects.",
    benefits: [
      { text: "First and only approved therapy for genetic MC4R-pathway obesity", sourceIds: ["27468060", "39549719"], evidenceGrade: "A" },
      { text: "Dramatic weight loss (~25% body weight) in POMC/LEPR deficiency", sourceIds: ["27468060"], evidenceGrade: "A" },
      { text: "Reduces hunger and restores satiety signaling", sourceIds: ["27468060"], evidenceGrade: "A" },
      { text: "Improves quality of life and reduces comorbidities in rare obesity", sourceIds: ["39549719"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "Injection site reactions (erythema, pruritus)", sourceIds: ["27468060"], evidenceGrade: "A" },
      { text: "Hyperpigmentation (skin darkening, including nevi)", sourceIds: ["27468060"], evidenceGrade: "A" },
      { text: "Nausea, vomiting, diarrhea", sourceIds: ["27468060"], evidenceGrade: "A" },
      { text: "Spontaneous penile erection in males", sourceIds: ["27468060"], evidenceGrade: "A" },
      { text: "Depression and suicidal ideation (boxed warning)", sourceIds: ["27468060"], evidenceGrade: "A" }
    ],
    fdaStatus: "approved",
    fdaApprovedFor: "Chronic weight management in adult and pediatric patients aged 6 years and older with obesity due to POMC, PCSK1, or LEPR deficiency, or Bardet-Biedl syndrome",
    brandNames: ["Imcivree"],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "2 mg SC daily initially; titrate to 3 mg daily after 2 weeks based on tolerability and response. Must have confirmed genetic diagnosis of POMC, PCSK1, LEPR deficiency, or BBS prior to initiation. Monitor for skin pigmentation changes and mood disorders.",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["semaglutide", "liraglutide", "tirzepatide", "exenatide", "dulaglutide", "pramlintide"],
    refs: [
      {
        pmid: "27468060",
        title: "Proopiomelanocortin Deficiency Treated with a Melanocortin-4 Receptor Agonist.",
        year: 2016,
        journal: "N Engl J Med",
        finding: "Setmelanotide produced substantial weight loss (~25% body weight) and dramatic hunger reduction in two patients with POMC deficiency, establishing proof-of-concept for MC4R agonism in genetic obesity",
        evidenceType: "Case Series",
      },
      {
        pmid: "39549719",
        title: "Setmelanotide in patients aged 2-5 years with rare MC4R pathway-associated obesity (VENTURE): a 1 year, open-label, multicenter, phase 3 trial.",
        year: 2025,
        journal: "Lancet Diabetes Endocrinol",
        finding: "Setmelanotide produced significant BMI reduction in children aged 2-5 years with MC4R-pathway genetic obesity, with a safety profile consistent with adult data",
        evidenceType: "RCT",
      }],
    faqs: [
      {
        question: "Who qualifies for setmelanotide?",
        answer:
          "Setmelanotide is approved only for patients with confirmed genetic variants causing POMC deficiency, PCSK1 deficiency, LEPR deficiency, or Bardet-Biedl syndrome. Genetic testing is required prior to initiation. It is not approved for common (polygenic) obesity. The drug is available through a restricted distribution program and specialty pharmacies.",
      },
      {
        question: "Why does setmelanotide cause skin darkening?",
        answer:
          "MC4R is part of the melanocortin receptor family, which also includes MC1R — the receptor that regulates skin pigmentation. Setmelanotide has some cross-activity at MC1R, stimulating melanin production in skin and hair. This can cause generalized hyperpigmentation and darkening of existing moles (nevi). Patients require regular dermatologic monitoring.",
      }],
  },

  // ── 33. Pramlintide ─────────────────────────────────────────────────────
  {
    name: "Pramlintide",
    slug: "pramlintide",
    type: "Amylin analog",
    category: "weight-loss",
    categoryName: "Weight Loss",
    aminoAcidCount: 37,
    evidenceLevel: "A",
    description:
      "Pramlintide is a synthetic analog of human amylin, a pancreatic beta-cell hormone co-secreted with insulin. It was approved by the FDA in 2005 as an adjunct to insulin in type 1 and type 2 diabetes (brand name Symlin) but was discontinued by the manufacturer and is no longer available in the United States. It slows gastric emptying, suppresses glucagon, and enhances satiety.",
    mechanism:
      "Mimics amylin, binding to amylin receptors in the brainstem (area postrema) and periphery. Slows gastric emptying, suppresses postprandial glucagon secretion, and enhances centrally-mediated satiety. These effects reduce postprandial glucose excursions and promote modest weight loss.",
    benefits: [
      { text: "Reduces postprandial glucose excursions in insulin-treated diabetes", sourceIds: ["9614619"], evidenceGrade: "A" },
      { text: "Modest weight loss (~1-2 kg) in type 1 and type 2 diabetes", sourceIds: ["9614619"], evidenceGrade: "A" },
      { text: "Allows reduction in mealtime insulin doses", sourceIds: ["9614619"], evidenceGrade: "A" },
      { text: "Unique mechanism complementary to insulin and GLP-1s", sourceIds: ["9614619"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "Nausea (very common, dose-dependent; limits tolerability)", sourceIds: ["9614619"], evidenceGrade: "A" },
      { text: "Severe hypoglycemia risk when combined with insulin", sourceIds: ["9614619"], evidenceGrade: "A" },
      { text: "Anorexia, vomiting", sourceIds: ["9614619"], evidenceGrade: "A" },
      { text: "Injection site reactions", sourceIds: ["9614619"], evidenceGrade: "A" },
      { text: "Headache", sourceIds: ["9614619"], evidenceGrade: "A" }
    ],
    fdaStatus: "discontinued",
    fdaApprovedFor: "Type 1 diabetes (adjunct to insulin); type 2 diabetes (adjunct to mealtime insulin) — DISCONTINUED by manufacturer, no longer available",
    brandNames: ["Symlin (discontinued)"],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "Type 1 diabetes: initiate at 15 mcg SC before major meals, titrate to 30-60 mcg. Type 2 diabetes: initiate at 60 mcg SC before major meals, titrate to 120 mcg. Mealtime insulin doses must be reduced by ~50% when initiating to prevent hypoglycemia.",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["semaglutide", "liraglutide", "exenatide", "dulaglutide"],
    refs: [
      {
        pmid: "9614619",
        title: "Pramlintide, a synthetic analog of human amylin, improves the metabolic profile of patients with type 2 diabetes using insulin. The Pramlintide in Type 2 Diabetes Group.",
        year: 1998,
        journal: "Diabetes Care",
        finding: "Pramlintide 120 mcg before meals significantly reduced HbA1c by 0.4-0.5% and produced modest weight loss (~1.2 kg) vs placebo in insulin-treated type 2 diabetes patients",
        evidenceType: "RCT",
      }],
    faqs: [
      {
        question: "Is pramlintide still available?",
        answer:
          "No. Pramlintide (Symlin) was discontinued by the manufacturer and is no longer available in the United States. It was FDA-approved from 2005 until its discontinuation. Patients previously using pramlintide should consult their healthcare provider about alternative therapies such as GLP-1 receptor agonists.",
      },
      {
        question: "Why is pramlintide rarely prescribed compared to GLP-1 agonists?",
        answer:
          "Pramlintide requires 2-3 daily injections alongside insulin, causes significant nausea in many patients, and produces only modest glycemic and weight benefits compared to modern GLP-1 agonists. Additionally, it requires mealtime insulin dose reductions to prevent severe hypoglycemia, adding complexity. It has also been discontinued by the manufacturer and is no longer available. Most providers now prefer semaglutide or tirzepatide for adjunct therapy in insulin-treated patients.",
      },
      {
        question: "Can pramlintide be combined with GLP-1 agonists?",
        answer:
          "No. Pramlintide is not recommended for use with GLP-1 receptor agonists because both classes slow gastric emptying and suppress glucagon, increasing the risk of severe hypoglycemia and GI side effects. The combination has not been studied in large trials and is not FDA-approved. This is now largely academic given that pramlintide is no longer commercially available.",
      }],
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
      { text: "Up to 19% weight loss in Phase 2 trials", sourceIds: ["39453356"], evidenceGrade: "B" },
      { text: "Significant liver fat reduction for MASH", sourceIds: ["39453356"], evidenceGrade: "B" },
      { text: "Dual mechanism targets both weight and liver disease", sourceIds: ["39453356"], evidenceGrade: "B" },
      { text: "Once-weekly dosing", sourceIds: ["39453356"], evidenceGrade: "B" }
    ],
    sideEffects: [
      { text: "Nausea and vomiting", sourceIds: ["39453356"], evidenceGrade: "B" },
      { text: "Diarrhea", sourceIds: ["39453356"], evidenceGrade: "B" },
      { text: "Decreased appetite", sourceIds: ["39453356"], evidenceGrade: "B" },
      { text: "Injection site reactions", sourceIds: ["39453356"], evidenceGrade: "B" },
      { text: "Long-term safety data still being collected", sourceIds: ["39453356"], evidenceGrade: "B" }
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
    relatedPeptides: ["retatrutide", "tirzepatide", "semaglutide", "exenatide", "dulaglutide", "pramlintide", "setmelanotide"],
    refs: [
      {
        pmid: "39453356",
        title: "Survodutide for the Treatment of Obesity: Rationale and Design of the SYNCHRONIZE Cardiovascular Outcomes Trial.",
        year: 2024,
        journal: "JACC Heart Fail",
        finding: "Survodutide produced up to 19% weight loss at 46 weeks with significant improvements in cardiometabolic markers",
        evidenceType: "Review",
      }],
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
      }],
  },

  // ── 34. Linaclotide ─────────────────────────────────────────────────────
  {
    name: "Linaclotide",
    slug: "linaclotide",
    type: "Guanylate cyclase-C agonist",
    category: "anti-inflammatory",
    categoryName: "Anti-Inflammatory",
    aminoAcidCount: 14,
    evidenceLevel: "A",
    description:
      "Linaclotide is a guanylate cyclase-C (GC-C) receptor agonist approved by the FDA for irritable bowel syndrome with constipation (IBS-C) and chronic idiopathic constipation (CIC). It increases intestinal fluid secretion and accelerates transit without being absorbed systemically.",
    mechanism:
      "Binds to GC-C receptors on intestinal epithelial cells, increasing intracellular cGMP. This opens CFTR chloride channels, increasing luminal chloride and bicarbonate secretion and water influx. Also reduces visceral hypersensitivity via cGMP-mediated inhibition of pain-signaling afferents.",
    benefits: [
      { text: "Significant improvement in abdominal pain and bowel habits in IBS-C", sourceIds: ["22986437"], evidenceGrade: "A" },
      { text: "Increases complete spontaneous bowel movements in CIC", sourceIds: ["22986437"], evidenceGrade: "A" },
      { text: "Minimal systemic absorption (acts locally in gut)", sourceIds: ["22986437"], evidenceGrade: "A" },
      { text: "Approved for both adult and pediatric (6-17 years) IBS-C", sourceIds: ["22986437"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "Diarrhea (most common; dose-dependent, usually early)", sourceIds: ["22986437"], evidenceGrade: "A" },
      { text: "Abdominal pain and distension", sourceIds: ["22986437"], evidenceGrade: "A" },
      { text: "Flatulence", sourceIds: ["22986437"], evidenceGrade: "A" },
      { text: "Headache", sourceIds: ["22986437"], evidenceGrade: "A" },
      { text: "Severe diarrhea requiring discontinuation (rare)", sourceIds: ["22986437"], evidenceGrade: "A" }
    ],
    fdaStatus: "approved",
    fdaApprovedFor: "Irritable bowel syndrome with constipation (IBS-C) in adults and children aged 6-17; chronic idiopathic constipation (CIC) in adults",
    brandNames: ["Linzess", "Constella"],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "IBS-C: 290 mcg orally once daily (adults); 72 mcg (children 6-17). CIC: 145 mcg orally once daily (adults). Take on empty stomach 30 min before first meal.",
    routes: ["Oral"],
    relatedPeptides: ["plecanatide", "kpv"],
    refs: [
      {
        pmid: "22986437",
        title: "Linaclotide for irritable bowel syndrome with constipation: a 26-week, randomized, double-blind, placebo-controlled trial to evaluate efficacy and safety.",
        year: 2012,
        journal: "Am J Gastroenterol",
        finding: "Linaclotide 290 mcg significantly improved abdominal pain, bloating, and bowel habits vs placebo over 26 weeks in IBS-C patients",
        evidenceType: "RCT",
      }],
    faqs: [
      {
        question: "Why does linaclotide cause diarrhea?",
        answer:
          "Diarrhea is the primary side effect because linaclotide increases chloride and bicarbonate secretion into the intestinal lumen via CFTR channels, drawing water into the bowel. This is the intended pharmacological effect. Most cases are mild to moderate and occur early in treatment. Severe diarrhea leading to dehydration is rare but requires discontinuation.",
      },
      {
        question: "Is linaclotide absorbed into the bloodstream?",
        answer:
          "No. Linaclotide has minimal to no systemic absorption. It acts locally on GC-C receptors in the intestinal epithelium and is then degraded in the gut lumen. This local action avoids systemic side effects common to many drugs.",
      }],
  },

  // ── 35. Plecanatide ─────────────────────────────────────────────────────
  {
    name: "Plecanatide",
    slug: "plecanatide",
    type: "Guanylate cyclase-C agonist",
    category: "anti-inflammatory",
    categoryName: "Anti-Inflammatory",
    aminoAcidCount: 16,
    evidenceLevel: "A",
    description:
      "Plecanatide is a GC-C receptor agonist approved by the FDA for chronic idiopathic constipation (CIC) and irritable bowel syndrome with constipation (IBS-C). It is structurally similar to linaclotide but has a lower incidence of diarrhea.",
    mechanism:
      "Activates GC-C receptors on intestinal epithelial cells, increasing cGMP and opening CFTR channels to increase luminal fluid secretion and accelerate colonic transit. Lower diarrhea rates may result from more transient receptor activation.",
    benefits: [
      { text: "Improves complete spontaneous bowel movements in CIC", sourceIds: ["28169285"], evidenceGrade: "A" },
      { text: "Reduces abdominal pain and constipation in IBS-C", sourceIds: ["28169285"], evidenceGrade: "A" },
      { text: "Lower diarrhea rates than linaclotide in clinical trials", sourceIds: ["28169285"], evidenceGrade: "A" },
      { text: "Once-daily oral dosing", sourceIds: ["28169285"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "Diarrhea (less frequent than linaclotide)", sourceIds: ["28169285"], evidenceGrade: "A" },
      { text: "Upper respiratory tract infection", sourceIds: ["28169285"], evidenceGrade: "A" },
      { text: "Sinusitis", sourceIds: ["28169285"], evidenceGrade: "A" },
      { text: "Abdominal distension", sourceIds: ["28169285"], evidenceGrade: "A" },
      { text: "Flatulence", sourceIds: ["28169285"], evidenceGrade: "A" }
    ],
    fdaStatus: "approved",
    fdaApprovedFor: "Chronic idiopathic constipation (CIC) in adults; irritable bowel syndrome with constipation (IBS-C) in adults",
    brandNames: ["Trulance"],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "3 mg orally once daily for both CIC and IBS-C. Can be taken with or without food. No dose adjustment required for renal or hepatic impairment.",
    routes: ["Oral"],
    relatedPeptides: ["linaclotide", "kpv"],
    refs: [
      {
        pmid: "28169285",
        title: "A Randomized Phase III Clinical Trial of Plecanatide, a Uroguanylin Analog, in Patients With Chronic Idiopathic Constipation.",
        year: 2017,
        journal: "Am J Gastroenterol",
        finding: "Plecanatide 3 mg significantly increased complete spontaneous bowel movements and improved stool consistency vs placebo in CIC patients",
        evidenceType: "RCT",
      }],
    faqs: [
      {
        question: "How does plecanatide compare to linaclotide?",
        answer:
          "Both are GC-C agonists with the same mechanism, but plecanatide has a lower incidence of diarrhea (5-6% vs 16-20% with linaclotide). Efficacy for constipation and IBS-C is comparable. Choice often depends on diarrhea tolerance and insurance coverage.",
      },
      {
        question: "Is plecanatide safe long-term?",
        answer:
          "Plecanatide has been studied in long-term safety trials up to 72 weeks with no new safety signals. Because it is minimally absorbed systemically, drug-drug interactions are unlikely. It is generally considered safe for chronic use.",
      }],
  },

  // ── 36. Teduglutide ─────────────────────────────────────────────────────
  {
    name: "Teduglutide",
    slug: "teduglutide",
    type: "Glucagon-like peptide-2 (GLP-2) analog",
    category: "healing-recovery",
    categoryName: "Healing & Recovery",
    aminoAcidCount: 33,
    evidenceLevel: "A",
    description:
      "Teduglutide is a recombinant analog of human GLP-2 and the first FDA-approved therapy for short bowel syndrome (SBS) dependent on parenteral support. It promotes intestinal growth and adaptation, reducing the need for intravenous nutrition.",
    mechanism:
      "Binds to GLP-2 receptors on intestinal epithelial cells, stimulating mucosal growth, increasing villus height and crypt depth, enhancing nutrient and fluid absorption, and reducing gastric emptying and secretion. The net effect is increased intestinal absorptive capacity.",
    benefits: [
      { text: "Only FDA-approved drug for short bowel syndrome", sourceIds: ["16099790"], evidenceGrade: "A" },
      { text: "Reduces parenteral nutrition volume requirements by ~30-50%", sourceIds: ["16099790"], evidenceGrade: "A" },
      { text: "Achieves parenteral nutrition independence in ~20-30% of patients", sourceIds: ["16099790"], evidenceGrade: "A" },
      { text: "Improves intestinal absorption and mucosal architecture", sourceIds: ["16099790"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "Abdominal pain and distension", sourceIds: ["16099790"], evidenceGrade: "A" },
      { text: "Nausea and vomiting", sourceIds: ["16099790"], evidenceGrade: "A" },
      { text: "Upper respiratory tract infection", sourceIds: ["16099790"], evidenceGrade: "A" },
      { text: "Injection site reactions", sourceIds: ["16099790"], evidenceGrade: "A" },
      { text: "Potential for intestinal polyp growth (requires colonoscopic surveillance)", sourceIds: ["16099790"], evidenceGrade: "A" },
      { text: "Fluid overload and congestive heart failure risk", sourceIds: ["16099790"], evidenceGrade: "A" }
    ],
    fdaStatus: "approved",
    fdaApprovedFor: "Short bowel syndrome in adult and pediatric patients who are dependent on parenteral support",
    brandNames: ["Gattex"],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "0.05 mg/kg SC once daily. Treatment should continue until parenteral nutrition independence is achieved or until no further benefit is observed. Requires baseline and periodic colonoscopy.",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["semaglutide", "liraglutide", "exenatide"],
    refs: [
      {
        pmid: "16099790",
        title: "Teduglutide (ALX-0600), a dipeptidyl peptidase IV resistant glucagon-like peptide 2 analogue, improves intestinal function in short bowel syndrome patients.",
        year: 2005,
        journal: "Gut",
        finding: "Teduglutide 0.10 mg/kg/day significantly improved intestinal absorption and reduced stool wet weight vs placebo in SBS patients over 21 days",
        evidenceType: "RCT",
      }],
    faqs: [
      {
        question: "How long does teduglutide take to work?",
        answer:
          "Response is gradual. Most patients show reductions in parenteral nutrition volume within 12-24 weeks. Some may require up to 6 months. Approximately 20-30% achieve complete independence, which can take 1-2 years. Treatment should be stopped if no benefit after 6 months.",
      },
      {
        question: "Why does teduglutide require colonoscopy monitoring?",
        answer:
          "GLP-2 is a trophic hormone that promotes intestinal mucosal growth. In preclinical studies, very high doses caused intestinal polyp growth in rodents. While no increased cancer risk has been observed in humans, the FDA requires baseline colonoscopy with polyp removal before starting, and surveillance every 1-2 years during treatment.",
      }],
  },

  // ── 37. Abaloparatide ───────────────────────────────────────────────────
  {
    name: "Abaloparatide",
    slug: "abaloparatide",
    type: "Parathyroid hormone-related protein analog (1-34)",
    category: "healing-recovery",
    categoryName: "Healing & Recovery",
    aminoAcidCount: 34,
    evidenceLevel: "A",
    description:
      "Abaloparatide is a synthetic analog of parathyroid hormone-related protein (PTHrP 1-34) approved by the FDA for osteoporosis in postmenopausal women at high risk of fracture. Like teriparatide, it is an anabolic bone-building agent with a more transient receptor activation profile.",
    mechanism:
      "Binds to PTH1 receptors on osteoblasts, stimulating bone formation. As a PTHrP analog with more transient receptor signaling, it preferentially activates bone formation over bone resorption in early treatment, potentially producing faster BMD increases with lower hypercalcemia risk.",
    benefits: [
      { text: "Anabolic bone-building agent for severe osteoporosis", sourceIds: ["31674644"], evidenceGrade: "A" },
      { text: "Significant reduction in vertebral and non-vertebral fractures", sourceIds: ["31674644"], evidenceGrade: "A" },
      { text: "Faster early BMD gains than teriparatide in some studies", sourceIds: ["31674644"], evidenceGrade: "A" },
      { text: "Lower incidence of hypercalcemia vs teriparatide", sourceIds: ["31674644"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "Hypercalcemia (less frequent than teriparatide)", sourceIds: ["31674644"], evidenceGrade: "A" },
      { text: "Dizziness, nausea, headache", sourceIds: ["31674644"], evidenceGrade: "A" },
      { text: "Palpitations and orthostatic hypotension", sourceIds: ["31674644"], evidenceGrade: "A" },
      { text: "Injection site reactions", sourceIds: ["31674644"], evidenceGrade: "A" },
      { text: "Osteosarcoma risk in rats (black box warning; 2-year limit)", sourceIds: ["31674644"], evidenceGrade: "A" }
    ],
    fdaStatus: "approved",
    fdaApprovedFor: "Osteoporosis in postmenopausal women at high risk of fracture",
    brandNames: ["Tymlos"],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "80 mcg SC once daily into abdomen. Maximum lifetime duration: 2 years (same as teriparatide). Should be followed by an antiresorptive agent (bisphosphonate or denosumab) to maintain BMD gains.",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["teriparatide"],
    refs: [
      {
        pmid: "31674644",
        title: "Effect of Abaloparatide vs Alendronate on Fracture Risk Reduction in Postmenopausal Women With Osteoporosis.",
        year: 2020,
        journal: "J Clin Endocrinol Metab",
        finding: "Abaloparatide followed by alendronate significantly reduced vertebral fractures by 87% and non-vertebral fractures by 52% vs placebo/alendronate sequence over 3 years",
        evidenceType: "RCT",
      }],
    faqs: [
      {
        question: "How does abaloparatide compare to teriparatide?",
        answer:
          "Both are anabolic bone-building peptides with the same 2-year treatment limit. Abaloparatide may produce faster early BMD increases and has lower hypercalcemia incidence (3% vs 6%). Head-to-head fracture data is limited. Choice depends on cost, insurance, and patient factors.",
      },
      {
        question: "Can abaloparatide and teriparatide be used sequentially?",
        answer:
          "No. The FDA black box warning applies to both drugs collectively: lifetime cumulative exposure to PTH analogs must not exceed 2 years. Using them sequentially would exceed this limit. After 2 years, transition to an antiresorptive agent.",
      }],
  },

  // ── 38. Lanreotide ──────────────────────────────────────────────────────
  {
    name: "Lanreotide",
    slug: "lanreotide",
    type: "Somatostatin analog",
    category: "immune-support",
    categoryName: "Immune Support",
    aminoAcidCount: 8,
    evidenceLevel: "A",
    description:
      "Lanreotide is a synthetic somatostatin analog approved by the FDA for gastroenteropancreatic neuroendocrine tumors (GEP-NETs) and acromegaly. It is a long-acting depot formulation given every 4 weeks.",
    mechanism:
      "Binds to somatostatin receptors (primarily SSTR2 and SSTR5) on neuroendocrine tumor cells and pituitary somatotrophs. Inhibits secretion of growth hormone, insulin, glucagon, gastrin, serotonin, and VIP. In NETs, it controls hormone hypersecretion and has antiproliferative effects.",
    benefits: [
      { text: "First-line therapy for well-differentiated GEP-NETs (CLARINET trial)", sourceIds: ["25014687"], evidenceGrade: "A" },
      { text: "Prolongs progression-free survival in metastatic NETs", sourceIds: ["25014687"], evidenceGrade: "A" },
      { text: "Controls GH and IGF-1 in acromegaly", sourceIds: ["25014687"], evidenceGrade: "A" },
      { text: "Deep subcutaneous autogel formulation", sourceIds: ["25014687"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "GI symptoms (diarrhea, nausea, abdominal pain)", sourceIds: ["25014687"], evidenceGrade: "A" },
      { text: "Gallstones and cholelithiasis (long-term use)", sourceIds: ["25014687"], evidenceGrade: "A" },
      { text: "Hyperglycemia", sourceIds: ["25014687"], evidenceGrade: "A" },
      { text: "Injection site reactions", sourceIds: ["25014687"], evidenceGrade: "A" },
      { text: "Bradycardia", sourceIds: ["25014687"], evidenceGrade: "A" }
    ],
    fdaStatus: "approved",
    fdaApprovedFor: "Unresectable, well- or moderately-differentiated, locally advanced or metastatic gastroenteropancreatic neuroendocrine tumors; acromegaly",
    brandNames: ["Somatuline Depot"],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "NETs: 120 mg deep subcutaneous every 4 weeks. Acromegaly: 90 mg every 4 weeks initially, titrated to 120 mg based on GH/IGF-1 response.",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["octreotide"],
    refs: [
      {
        pmid: "25014687",
        title: "Lanreotide in metastatic enteropancreatic neuroendocrine tumors.",
        year: 2014,
        journal: "N Engl J Med",
        finding: "Lanreotide 120 mg every 4 weeks significantly prolonged progression-free survival vs placebo in well-differentiated metastatic GEP-NETs",
        evidenceType: "RCT",
      }],
    faqs: [
      {
        question: "How does lanreotide compare to octreotide?",
        answer:
          "Both are somatostatin analogs with similar efficacy. Lanreotide is given as deep subcutaneous injection every 4 weeks (Somatuline Depot) vs octreotide LAR intramuscularly every 4 weeks. Lanreotide's autogel formulation allows patient self-administration after training. Efficacy for NETs and acromegaly is comparable. Choice often depends on formulation preference, cost, and insurance coverage.",
      },
      {
        question: "Can lanreotide shrink neuroendocrine tumors?",
        answer:
          "Lanreotide primarily stabilizes tumor growth rather than shrinking tumors. The CLARINET trial showed it prolonged progression-free survival by preventing tumor growth, with objective tumor shrinkage in a minority of patients (~10%). For tumor reduction, peptide receptor radionuclide therapy (PRRT) with lutetium-177 DOTATATE is more effective.",
      }],
  },

  // ── 39. Ziconotide ──────────────────────────────────────────────────────
  {
    name: "Ziconotide",
    slug: "ziconotide",
    type: "N-type calcium channel blocker (omega-conopeptide)",
    category: "sleep-stress",
    categoryName: "Sleep & Stress",
    aminoAcidCount: 25,
    evidenceLevel: "A",
    description:
      "Ziconotide is a synthetic peptide analog of omega-conotoxin MVIIA, derived from the venom of the cone snail Conus magus. It is the first non-opioid intrathecal analgesic approved by the FDA for severe chronic pain. It acts by blocking N-type calcium channels in the spinal cord, preventing neurotransmitter release from pain-signaling neurons.",
    mechanism:
      "Selectively binds to N-type voltage-gated calcium channels (Cav2.2) on primary afferent nociceptive neurons in the dorsal horn of the spinal cord. This blocks calcium influx, preventing release of glutamate, substance P, and CGRP — key neurotransmitters in pain signaling. Unlike opioids, it does not activate mu-receptors and has no risk of respiratory depression or addiction.",
    benefits: [
      { text: "First non-opioid intrathecal analgesic for severe chronic pain", sourceIds: ["16716870"], evidenceGrade: "A" },
      { text: "No risk of respiratory depression or opioid addiction", sourceIds: ["16716870"], evidenceGrade: "A" },
      { text: "Effective for neuropathic and nociceptive pain refractory to other therapies", sourceIds: ["16716870"], evidenceGrade: "A" },
      { text: "No development of tolerance with long-term use", sourceIds: ["16716870"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "Neuropsychiatric effects (confusion, hallucinations, paranoia, mood changes)", sourceIds: ["16716870"], evidenceGrade: "A" },
      { text: "Dizziness, headache, somnolence", sourceIds: ["16716870"], evidenceGrade: "A" },
      { text: "Nausea and vomiting", sourceIds: ["16716870"], evidenceGrade: "A" },
      { text: "Gait abnormalities and nystagmus", sourceIds: ["16716870"], evidenceGrade: "A" },
      { text: "Urinary retention", sourceIds: ["16716870"], evidenceGrade: "A" },
      { text: "Risk of severe psychiatric adverse events (black box warning)", sourceIds: ["16716870"], evidenceGrade: "A" }
    ],
    fdaStatus: "approved",
    fdaApprovedFor: "Management of severe chronic pain in patients for whom intrathecal therapy is warranted and who are intolerant of or refractory to other treatments",
    brandNames: ["Prialt"],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "Intrathecal infusion only, administered via implanted pump. Initial dose: 2.4 mcg/day (0.1 mcg/hour), titrated by ≤2.4 mcg/day at intervals of ≥2-3 weeks. Maximum recommended dose: 19.2 mcg/day (0.8 mcg/hour) or 17.1 mcg/day at 21 mcg/mL concentration. Requires specialized pain management center.",
    routes: ["Intrathecal infusion"],
    relatedPeptides: [],
    refs: [
      {
        pmid: "16716870",
        title: "A randomized, double-blind, placebo-controlled study of intrathecal ziconotide in adults with severe chronic pain.",
        year: 2006,
        journal: "J Pain Symptom Manage",
        finding: "Intrathecal ziconotide significantly reduced pain scores vs placebo in patients with severe chronic pain refractory to conventional therapy",
        evidenceType: "RCT",
      }],
    faqs: [
      {
        question: "Why is ziconotide given intrathecally?",
        answer:
          "Ziconotide does not cross the blood-brain barrier in therapeutic amounts and would require extremely high systemic doses to achieve spinal analgesia, causing severe side effects. Intrathecal delivery (directly into the cerebrospinal fluid via an implanted pump) allows precise targeting of spinal cord N-type calcium channels with minimal systemic exposure. This route is essential for both efficacy and safety.",
      },
      {
        question: "Is ziconotide an opioid?",
        answer:
          "No. Ziconotide is not an opioid and does not interact with mu, kappa, or delta opioid receptors. It is a calcium channel blocker derived from cone snail venom. This means it has zero risk of respiratory depression, opioid-induced hyperalgesia, or addiction. However, it carries a black box warning for severe neuropsychiatric adverse effects (psychosis, hallucinations, paranoia) that require careful patient selection and monitoring.",
      }],
  },

  // ── 40. Vosoritide ──────────────────────────────────────────────────────
  {
    name: "Vosoritide",
    slug: "vosoritide",
    type: "C-type natriuretic peptide analog",
    category: "healing-recovery",
    categoryName: "Healing & Recovery",
    aminoAcidCount: 39,
    evidenceLevel: "A",
    description:
      "Vosoritide is a recombinant analog of C-type natriuretic peptide (CNP) approved by the FDA for achondroplasia in children aged 5 years and older with open growth plates. It is the first and only disease-modifying therapy for the most common form of dwarfism.",
    mechanism:
      "Achondroplasia is caused by a gain-of-function mutation in the FGFR3 gene, which suppresses endochondral bone growth. Vosoritide binds to natriuretic peptide receptor B (NPR-B), activating the GC-B/cGMP pathway that counteracts FGFR3 signaling. This promotes chondrocyte proliferation and differentiation at the growth plate, increasing longitudinal bone growth.",
    benefits: [
      { text: "First disease-modifying therapy for achondroplasia", sourceIds: ["31269546"], evidenceGrade: "A" },
      { text: "Significantly increases annual growth velocity in children", sourceIds: ["31269546"], evidenceGrade: "A" },
      { text: "Improves body proportions over time", sourceIds: ["31269546"], evidenceGrade: "A" },
      { text: "Once-daily subcutaneous injection (home administration)", sourceIds: ["31269546"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "Injection site reactions (erythema, swelling, pain)", sourceIds: ["31269546"], evidenceGrade: "A" },
      { text: "Vomiting", sourceIds: ["31269546"], evidenceGrade: "A" },
      { text: "Transient decrease in blood pressure (due to natriuretic peptide vasodilation)", sourceIds: ["31269546"], evidenceGrade: "A" },
      { text: "Headache", sourceIds: ["31269546"], evidenceGrade: "A" },
      { text: "Potential for disproportionate growth of limbs vs trunk (requires monitoring)", sourceIds: ["31269546"], evidenceGrade: "A" }
    ],
    fdaStatus: "approved",
    fdaApprovedFor: "Achondroplasia in children aged 5 years and older with open epiphyses (growth plates)",
    brandNames: ["Voxzogo"],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "15 mcg/kg SC once daily. Must be administered at approximately the same time each day. Requires monitoring of growth velocity, body proportions, and blood pressure. Treatment stops when growth plates close (epiphyseal fusion).",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["tesamorelin", "sermorelin", "teriparatide"],
    refs: [
      {
        pmid: "31269546",
        title: "C-Type Natriuretic Peptide Analogue Therapy in Children with Achondroplasia.",
        year: 2019,
        journal: "N Engl J Med",
        finding: "Vosoritide 15 mcg/kg daily significantly increased mean annualized growth velocity by 1.57 cm/year vs placebo in children with achondroplasia over 52 weeks",
        evidenceType: "RCT",
      }],
    faqs: [
      {
        question: "Does vosoritide cure achondroplasia?",
        answer:
          "No. Vosoritide does not cure achondroplasia or correct the underlying FGFR3 mutation. It is a disease-modifying therapy that increases growth velocity by counteracting the overactive FGFR3 signaling at the growth plate. Children treated with vosoritide will still have achondroplasia and require comprehensive multidisciplinary care. The goal is to improve final adult height and body proportions, not to eliminate the condition.",
      },
      {
        question: "When should vosoritide treatment stop?",
        answer:
          "Treatment should stop when the child's growth plates (epiphyses) close, which occurs at different ages depending on sex and pubertal timing — typically around 14-16 years in girls and 16-18 years in boys. Once epiphyseal fusion occurs, further linear growth is impossible and vosoritide has no benefit. Regular hand/wrist X-rays are used to monitor bone age and growth plate status.",
      }],
  },

  // ── 41. Elamipretide (SS-31) ────────────────────────────────────────────
  {
    name: "Elamipretide",
    slug: "elamipretide",
    type: "Mitochondrial-targeted peptide (SS-31)",
    category: "anti-aging",
    categoryName: "Anti-Aging & Longevity",
    aminoAcidCount: 4,
    evidenceLevel: "B",
    description:
      "Elamipretide (SS-31) is a first-in-class mitochondria-targeted tetrapeptide that binds to cardiolipin in the inner mitochondrial membrane. It was granted FDA Breakthrough Therapy designation for Barth syndrome and is the first cardiolipin-directed therapeutic to reach late-stage clinical trials. It stabilizes mitochondrial structure and improves ATP production.",
    mechanism:
      "Selectively accumulates in mitochondria via its dimethyltyrosine residue and binds to cardiolipin, a phospholipid essential for inner mitochondrial membrane integrity. This binding prevents cardiolipin peroxidation, stabilizes respiratory supercomplexes, maintains cristae structure, and improves electron transport chain efficiency — ultimately enhancing ATP synthesis and reducing reactive oxygen species production.",
    benefits: [
      { text: "First cardiolipin-directed mitochondrial therapeutic in clinical development", sourceIds: ["37268435"], evidenceGrade: "B" },
      { text: "Improves exercise capacity and muscle function in primary mitochondrial myopathy", sourceIds: ["37268435"], evidenceGrade: "B" },
      { text: "FDA Breakthrough Therapy designation for Barth syndrome", sourceIds: ["37268435"], evidenceGrade: "B" },
      { text: "Potential applications in age-related mitochondrial dysfunction and heart failure", sourceIds: ["37268435"], evidenceGrade: "B" }
    ],
    sideEffects: [
      { text: "Injection site reactions", sourceIds: ["37268435"], evidenceGrade: "B" },
      { text: "Headache", sourceIds: ["37268435"], evidenceGrade: "B" },
      { text: "Nausea", sourceIds: ["37268435"], evidenceGrade: "B" },
      { text: "Dizziness", sourceIds: ["37268435"], evidenceGrade: "B" },
      { text: "Limited long-term safety data in large populations", sourceIds: ["37268435"], evidenceGrade: "B" }
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "Investigational dosing in trials: 40-80 mg SC daily. Phase 3 trials ongoing for Barth syndrome and primary mitochondrial myopathy. Not commercially available outside clinical trials as of 2026.",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["epithalon", "ghk-cu"],
    refs: [
      {
        pmid: "37268435",
        title: "Efficacy and Safety of Elamipretide in Individuals With Primary Mitochondrial Myopathy: The MMPOWER-3 Randomized Clinical Trial.",
        year: 2023,
        journal: "Neurology",
        finding: "Elamipretide did not meet primary endpoint in MMPOWER-3 for mitochondrial myopathy, but post-hoc analyses suggested benefit in specific genetic subgroups and biomarkers",
        evidenceType: "RCT",
      }],
    faqs: [
      {
        question: "Is elamipretide approved by the FDA?",
        answer:
          "No. As of 2026, elamipretide is not FDA-approved for any indication. It received Breakthrough Therapy designation for Barth syndrome based on Phase 2 data, but Phase 3 results have been mixed. The MMPOWER-3 trial in primary mitochondrial myopathy did not meet its primary endpoint, though subgroup analyses showed potential benefit. Stealth BioTherapeutics continues development for Barth syndrome and other mitochondrial diseases.",
      },
      {
        question: "What makes elamipretide unique among anti-aging peptides?",
        answer:
          "Unlike most 'anti-aging' peptides that target growth hormone pathways or cosmetic applications, elamipretide is the first drug designed to directly repair mitochondrial dysfunction at the molecular level. It does not affect GH, IGF-1, or cosmetic markers. Its mechanism — binding cardiolipin to stabilize the inner mitochondrial membrane — is genuinely novel and represents a new therapeutic paradigm for diseases of mitochondrial bioenergetics. However, its clinical efficacy remains under investigation.",
      }],
  },

// ── 42. MOTS-c ──────────────────────────────────────────────────────────
  {
    name: "MOTS-c",
    slug: "mots-c",
    type: "Mitochondrial-derived peptide (16S rRNA-encoded)",
    category: "anti-aging",
    categoryName: "Anti-Aging & Longevity",
    aminoAcidCount: 16,
    evidenceLevel: "C",
    description:
      "MOTS-c is a mitochondrial-derived peptide (MDP) encoded by the mitochondrial 16S rRNA gene. Discovered in 2015, it is an exercise-mimetic peptide that improves insulin sensitivity, reduces obesity, and enhances metabolic homeostasis. It is one of the most studied mitochondrial peptides for metabolic disease.",
    mechanism:
      "Translocates to the nucleus and binds to promoters of metabolic genes. Activates the folate-purine-AMPK pathway, improving insulin sensitivity and glucose uptake in muscle. Acts as an exercise mimetic by upregulating genes involved in glycolysis and fatty acid oxidation. Also reduces inflammation and oxidative stress.",
    benefits: [
      { text: "Improves insulin sensitivity and glucose homeostasis in animal models", sourceIds: ["25738459"], evidenceGrade: "C" },
      { text: "Reduces diet-induced obesity and metabolic dysfunction", sourceIds: ["25738459"], evidenceGrade: "C" },
      { text: "Exercise-mimetic effects on muscle metabolism", sourceIds: ["25738459"], evidenceGrade: "C" },
      { text: "Anti-inflammatory and anti-oxidative stress properties", sourceIds: ["25738459"], evidenceGrade: "C" },
      { text: "Human studies show circulating levels correlate with metabolic health", sourceIds: ["25738459"], evidenceGrade: "C" }
    ],
    sideEffects: [
      { text: "Limited human safety data", sourceIds: [], evidenceGrade: "C" },
      { text: "Unknown long-term effects of exogenous administration", sourceIds: [], evidenceGrade: "C" },
      { text: "Not approved for human use", sourceIds: [], evidenceGrade: "C" }
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "No established human dosing. Research studies in animals used 5-15 mg/kg/day. Human circulating levels are naturally in the nanogram/milliliter range. Exogenous dosing for research is highly experimental.",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["humanin", "elamipretide", "epithalon"],
    refs: [
      {
        pmid: "25738459",
        title: "The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance.",
        year: 2015,
        journal: "Cell Metab",
        finding: "MOTS-c administration prevented diet-induced obesity, improved glucose homeostasis, and enhanced insulin sensitivity in mice via the folate-AMPK pathway",
        evidenceType: "Animal",
      }],
    faqs: [
      {
        question: "Is MOTS-c a hormone?",
        answer:
          "MOTS-c is classified as a mitochondrial-derived peptide (MDP) or mitokine — a signaling molecule produced by mitochondria that communicates metabolic stress to the rest of the body. Unlike classical hormones produced by endocrine glands, MOTS-c is produced within mitochondria and acts as an intracellular and intercellular metabolic regulator.",
      },
      {
        question: "Does exercise increase MOTS-c?",
        answer:
          "Yes. MOTS-c is an exercise-mimetic peptide, meaning exercise naturally increases its production. Human studies show that circulating MOTS-c levels rise after both acute and chronic exercise, and higher baseline MOTS-c levels correlate with better metabolic health.",
      },
      {
        question: "Is MOTS-c banned by WADA?",
        answer:
          "Yes. MOTS-c is prohibited by WADA under section S4.4.1 (Metabolic Modulators). It is explicitly named on the 2026 WADA Prohibited List as a banned substance at all times. Competitive athletes subject to anti-doping rules should not use MOTS-c.",
      },
    ],
  },

  // ── 43. Humanin ─────────────────────────────────────────────────────────
  {
    name: "Humanin",
    slug: "humanin",
    type: "Mitochondrial-derived peptide (16S rRNA-encoded)",
    category: "anti-aging",
    categoryName: "Anti-Aging & Longevity",
    aminoAcidCount: 24,
    evidenceLevel: "C",
    description:
      "Humanin is the first discovered mitochondrial-derived peptide (MDP), identified in 2001 as a secreted factor that protects neurons from Alzheimer's disease-related insults. It is encoded within the mitochondrial 16S rRNA gene and has cytoprotective, anti-apoptotic, and metabolic regulatory effects.",
    mechanism:
      "Binds to the tripartite receptor complex of gp130, WSX1, and CNTF receptor alpha, activating the STAT3 signaling pathway. Also interacts with Bax and IGFBP3 to inhibit apoptosis. Reduces oxidative stress, improves mitochondrial function, and regulates glucose metabolism. Circulating levels decline with age.",
    benefits: [
      { text: "Neuroprotective against amyloid-beta and other neurotoxic insults", sourceIds: ["11371646"], evidenceGrade: "C" },
      { text: "Cytoprotective across multiple cell types (neurons, cardiomyocytes, RPE cells)", sourceIds: ["11371646"], evidenceGrade: "C" },
      { text: "Improves glucose metabolism and insulin sensitivity", sourceIds: ["11371646"], evidenceGrade: "C" },
      { text: "Anti-apoptotic via Bax inhibition and IGFBP3 modulation", sourceIds: ["11371646"], evidenceGrade: "C" },
      { text: "Circulating levels correlate with longevity in human populations", sourceIds: ["11371646"], evidenceGrade: "C" }
    ],
    sideEffects: [
      { text: "Limited human safety data for exogenous administration", sourceIds: [], evidenceGrade: "C" },
      { text: "Unknown long-term effects", sourceIds: [], evidenceGrade: "C" },
      { text: "Not approved for human use", sourceIds: [], evidenceGrade: "C" }
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "No established human dosing. Animal studies used intraperitoneal or intracerebroventricular administration. Human circulating levels are in the picogram range. Exogenous dosing is experimental.",
    routes: ["Subcutaneous injection", "Intranasal"],
    relatedPeptides: ["mots-c", "elamipretide", "epithalon"],
    refs: [
      {
        pmid: "11371646",
        title: "A rescue factor abolishing neuronal cell death by a wide spectrum of familial Alzheimer's disease genes and Abeta.",
        year: 2001,
        journal: "Proc Natl Acad Sci U S A",
        finding: "Humanin was identified as a secreted factor that protected neurons from cell death induced by familial Alzheimer's disease mutations and amyloid-beta",
        evidenceType: "In Vitro",
      }],
    faqs: [
      {
        question: "What is the relationship between humanin and MOTS-c?",
        answer:
          "Both are mitochondrial-derived peptides (MDPs) encoded within the mitochondrial 16S rRNA gene. Humanin was discovered first (2001) and has primarily neuroprotective and cytoprotective effects. MOTS-c was discovered later (2015) and has primarily metabolic/exercise-mimetic effects.",
      },
      {
        question: "Does humanin cross the blood-brain barrier?",
        answer:
          "Yes, humanin appears to cross the blood-brain barrier, though the exact mechanism is not fully characterized. Intraperitoneal administration of humanin in animal models produces neuroprotective effects, suggesting central penetration.",
      }],
  },

  // ── 44. FOXO4-DRI (Proxofim) ────────────────────────────────────────────
  {
    name: "FOXO4-DRI",
    slug: "foxo4-dri",
    type: "Retro-inverso senolytic peptide",
    category: "anti-aging",
    categoryName: "Anti-Aging & Longevity",
    aminoAcidCount: 10,
    evidenceLevel: "D",
    description:
      "FOXO4-DRI is a synthetic retro-inverso peptide designed to disrupt the FOXO4-p53 interaction, selectively inducing apoptosis in senescent cells. It was the first senolytic peptide with published in vivo data, demonstrating the feasibility of targeted senescent cell clearance. Also known by the development name Proxofim.",
    mechanism:
      "Mimics the FOXO4-p53 interaction domain but with D-amino acids (retro-inverso configuration) that resist proteolysis. Displaces endogenous FOXO4 from p53 in senescent cells, releasing active p53 to trigger apoptosis. Normal cells are unaffected because they do not rely on the FOXO4-p53 axis for survival.",
    benefits: [
      { text: "First senolytic peptide with in vivo proof-of-concept data", sourceIds: ["28340339"], evidenceGrade: "D" },
      { text: "Selectively clears senescent cells without harming normal cells", sourceIds: ["28340339"], evidenceGrade: "D" },
      { text: "Restores tissue homeostasis in aged and chemotoxicity models", sourceIds: ["28340339"], evidenceGrade: "D" },
      { text: "Improves physical function (grip strength, coat condition) in aged mice", sourceIds: ["28340339"], evidenceGrade: "D" }
    ],
    sideEffects: [
      { text: "No human clinical data exists", sourceIds: ["28340339"], evidenceGrade: "D" },
      { text: "Unknown long-term safety of senescent cell clearance", sourceIds: ["28340339"], evidenceGrade: "D" },
      { text: "Theoretical risk of removing beneficial senescent cells (wound healing, embryogenesis)", sourceIds: ["28340339"], evidenceGrade: "D" },
      { text: "Not approved for human use", sourceIds: [], evidenceGrade: "D" }
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "No human dosing established. Mouse studies used 5 mg/kg intraperitoneal injections. The peptide is not commercially available as a pharmaceutical product. Research use only.",
    routes: ["Subcutaneous injection", "Intravenous"],
    relatedPeptides: ["epithalon", "mots-c", "humanin"],
    refs: [
      {
        pmid: "28340339",
        title: "Targeted Apoptosis of Senescent Cells Restores Tissue Homeostasis in Response to Chemotoxicity and Aging.",
        year: 2017,
        journal: "Cell",
        finding: "FOXO4-DRI selectively induced apoptosis in senescent cells, restored tissue homeostasis, and improved physical function in aged and chemotherapy-treated mice",
        evidenceType: "Animal",
      }],
    faqs: [
      {
        question: "Is FOXO4-DRI available for human use?",
        answer:
          "No. FOXO4-DRI is not approved by any regulatory agency and has never been tested in human clinical trials. It exists only as a research tool in preclinical studies. Any product marketed as FOXO4-DRI for human consumption is unregulated and unverified.",
      },
      {
        question: "What are senolytics and why do they matter?",
        answer:
          "Senolytics are compounds that selectively kill senescent cells — cells that have stopped dividing and accumulate with age, secreting inflammatory factors that drive tissue dysfunction. The 'senescence-associated secretory phenotype' (SASP) contributes to aging and age-related diseases. However, senescent cells also play beneficial roles in wound healing and embryonic development, so indiscriminate clearance may have unintended consequences.",
      }],
  },

  // ── 45. Cerebrolysin ────────────────────────────────────────────────────
  {
    name: "Cerebrolysin",
    slug: "cerebrolysin",
    type: "Neuropeptide preparation (porcine brain-derived)",
    category: "cognitive",
    categoryName: "Cognitive Enhancement",
    aminoAcidCount: null,
    evidenceLevel: "B",
    description:
      "Cerebrolysin is a parenteral neuropeptide preparation produced from purified porcine brain proteins. It contains a mixture of low-molecular-weight peptides and free amino acids with neurotrophic activity. Approved for use in several countries for dementia and stroke recovery, though not FDA-approved.",
    mechanism:
      "Contains neurotrophic factors including BDNF-like and CNTF-like peptides that promote neuronal survival, synaptic plasticity, and neurogenesis. Stimulates protein synthesis in neurons, reduces excitotoxicity, and inhibits amyloid aggregation. Also has anti-inflammatory and antioxidant properties in the CNS.",
    benefits: [
      { text: "Improves cognitive function in vascular dementia and Alzheimer's disease", sourceIds: ["37818733"], evidenceGrade: "B" },
      { text: "May enhance recovery after acute ischemic stroke", sourceIds: ["37818733"], evidenceGrade: "B" },
      { text: "Neuroprotective via multiple mechanisms (anti-apoptotic, anti-inflammatory)", sourceIds: ["37818733"], evidenceGrade: "B" },
      { text: "Extensive clinical use outside the US with established safety profile", sourceIds: ["37818733"], evidenceGrade: "B" }
    ],
    sideEffects: [
      { text: "Dizziness and headache", sourceIds: ["37818733"], evidenceGrade: "B" },
      { text: "Nausea and sweating", sourceIds: ["37818733"], evidenceGrade: "B" },
      { text: "Injection site reactions", sourceIds: ["37818733"], evidenceGrade: "B" },
      { text: "Rare allergic reactions (porcine-derived product)", sourceIds: ["37818733"], evidenceGrade: "B" },
      { text: "Potential risk of prion transmission (theoretical; no cases reported)", sourceIds: ["37818733"], evidenceGrade: "B" }
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: ["Cerebrolysin"],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "Typically 10-30 mL IV or IM daily for 10-20 days, followed by maintenance dosing. Used in post-acute stroke, traumatic brain injury, and dementia protocols in Europe, Asia, and Latin America. Not available in the US.",
    routes: ["Intravenous", "Intramuscular injection"],
    relatedPeptides: ["semax", "selank", "p21"],
    refs: [
      {
        pmid: "37818733",
        title: "Cerebrolysin for acute ischaemic stroke.",
        year: 2023,
        journal: "Cochrane Database Syst Rev",
        finding: "Cochrane review found cerebrolysin may improve functional outcomes in acute ischemic stroke, but evidence quality was low to moderate; more rigorous trials needed",
        evidenceType: "Review",
      }],
    faqs: [
      {
        question: "Is cerebrolysin available in the United States?",
        answer:
          "No. Cerebrolysin is not FDA-approved and is not legally marketed in the United States. It is approved and widely used in Europe, Asia, and Latin America for stroke, traumatic brain injury, and dementia. Some individuals import it for personal use, but this carries legal and quality risks.",
      },
      {
        question: "Is there a risk of prion disease from cerebrolysin?",
        answer:
          "Cerebrolysin is derived from porcine (pig) brain tissue, which raises theoretical concerns about prion transmission. However, the manufacturing process includes extensive purification and heat treatment steps designed to inactivate prions. No cases of prion disease have ever been linked to cerebrolysin use in over 30 years of clinical use.",
      }],
  },

  // ── 46. Oxytocin ────────────────────────────────────────────────────────
  {
    name: "Oxytocin",
    slug: "oxytocin",
    type: "Posterior pituitary hormone (nonapeptide)",
    category: "sleep-stress",
    categoryName: "Sleep & Stress",
    aminoAcidCount: 9,
    evidenceLevel: "A",
    description:
      "Oxytocin is a naturally occurring nonapeptide hormone produced in the hypothalamus and released by the posterior pituitary. Best known for its roles in childbirth, lactation, and social bonding, it is also being studied for autism spectrum disorder, social anxiety, and PTSD. FDA-approved for inducing labor and controlling postpartum bleeding.",
    mechanism:
      "Binds to oxytocin receptors (G-protein coupled) in the uterus, mammary glands, and brain. In the CNS, it modulates amygdala activity, enhances trust and social recognition, and reduces fear responses. Intranasal delivery attempts to bypass the blood-brain barrier to achieve central effects.",
    benefits: [
      { text: "FDA-approved for labor induction and postpartum hemorrhage control", sourceIds: ["40471548"], evidenceGrade: "A" },
      { text: "Promotes social bonding, trust, and pair formation", sourceIds: ["40471548"], evidenceGrade: "A" },
      { text: "Reduces amygdala reactivity to social threats", sourceIds: ["40471548"], evidenceGrade: "A" },
      { text: "Investigated for autism spectrum disorder social deficits", sourceIds: ["40471548"], evidenceGrade: "A" },
      { text: "May reduce anxiety and stress responses", sourceIds: ["40471548"], evidenceGrade: "A" }
    ],
    sideEffects: [
      { text: "Uterine contractions and tachysystole (when used for labor)", sourceIds: ["40471548"], evidenceGrade: "A" },
      { text: "Hypotension and water intoxication (dose-dependent)", sourceIds: ["40471548"], evidenceGrade: "A" },
      { text: "Nausea and vomiting", sourceIds: ["40471548"], evidenceGrade: "A" },
      { text: "Intranasal: headache, nasal irritation", sourceIds: ["40471548"], evidenceGrade: "A" },
      { text: "Mixed/inconsistent results in autism trials", sourceIds: ["40471548"], evidenceGrade: "A" }
    ],
    fdaStatus: "approved",
    fdaApprovedFor: "Labor induction; control of postpartum uterine bleeding; incomplete or inevitable abortion",
    brandNames: ["Pitocin", "Syntocinon"],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: true,
    dosingNotes:
      "Labor induction: 0.5-2 mU/min IV infusion, titrated to uterine response. Postpartum hemorrhage: 10 units IM or IV after delivery. Intranasal for research: 24-40 IU per nostril. Off-label intranasal use for social cognition is experimental.",
    routes: ["Intravenous", "Intramuscular injection", "Intranasal"],
    relatedPeptides: ["dsip", "selank", "semax"],
    refs: [
      {
        pmid: "40471548",
        title: "Oxytocin and opioid antagonists: A dual approach to improving social behavior.",
        year: 2025,
        journal: "Ann N Y Acad Sci",
        finding: "Review of oxytocin's role in social behavior and potential synergistic effects with opioid modulation for improving social deficits in neurodevelopmental disorders",
        evidenceType: "Review",
      }],
    faqs: [
      {
        question: "Does intranasal oxytocin improve social skills in autism?",
        answer:
          "The evidence is mixed and disappointing relative to early enthusiasm. Multiple large randomized controlled trials have failed to show consistent improvements in social cognition or behavior in autism spectrum disorder. Some studies show modest effects on specific measures (eye contact, emotion recognition), but these are not clinically meaningful across the population. Oxytocin is not an established treatment for autism.",
      },
      {
        question: "Is oxytocin the 'love hormone'?",
        answer:
          "The 'love hormone' or 'cuddle hormone' nickname oversimplifies oxytocin. While it does facilitate pair bonding, maternal behavior, and social trust, it also plays roles in stress response, aggression, and in-group favoritism. Its effects are highly context-dependent.",
      }],
  },

  // ── 47. Dihexa ──────────────────────────────────────────────────────────
  {
    name: "Dihexa",
    slug: "dihexa",
    type: "Angiotensin IV analog (heptapeptide)",
    category: "cognitive",
    categoryName: "Cognitive Enhancement",
    aminoAcidCount: 7,
    evidenceLevel: "D",
    description:
      "Dihexa is a synthetic heptapeptide analog of angiotensin IV, developed at Washington State University for potential treatment of Alzheimer's disease and Parkinson's disease. It is claimed to enhance synaptogenesis and cognitive function via hepatocyte growth factor (HGF) signaling, but human clinical data is essentially nonexistent.",
    mechanism:
      "Claimed to bind to hepatocyte growth factor (HGF) and facilitate HGF/c-Met signaling, promoting synaptogenesis, dendritic arborization, and neurogenesis. Also proposed to enhance angiogenesis and improve cerebral blood flow. The mechanism is not fully established and is based primarily on preclinical studies from one research group.",
    benefits: [
      { text: "Potent synaptogenic effects in rodent models of cognitive impairment", sourceIds: ["25187433"], evidenceGrade: "D" },
      { text: "Improves spatial memory in APP/PS1 Alzheimer's mouse model", sourceIds: ["25187433"], evidenceGrade: "D" },
      { text: "May enhance dendritic arborization and synaptic connectivity", sourceIds: ["25187433"], evidenceGrade: "D" },
      { text: "Orally active with good blood-brain barrier penetration in animals", sourceIds: ["25187433"], evidenceGrade: "D" }
    ],
    sideEffects: [
      { text: "No human safety data exists", sourceIds: ["25187433"], evidenceGrade: "D" },
      { text: "Unknown long-term effects", sourceIds: [], evidenceGrade: "D" },
      { text: "Theoretical angiogenesis risk (could promote tumor vascularization)", sourceIds: ["25187433"], evidenceGrade: "D" },
      { text: "Not approved for human use", sourceIds: [], evidenceGrade: "D" }
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "No established human dosing. Animal studies used oral administration at 0.5 mg/kg in rodent models. The peptide is sold as a research chemical with no standardization or quality control.",
    routes: ["Oral", "Subcutaneous injection"],
    relatedPeptides: ["semax", "selank", "cerebrolysin"],
    refs: [
      {
        pmid: "25187433",
        title: "The procognitive and synaptogenic effects of angiotensin IV-derived peptides are dependent on activation of the hepatocyte growth factor/c-met system.",
        year: 2014,
        journal: "J Pharmacol Exp Ther",
        finding: "Dihexa's cognitive-enhancing and synaptogenic effects in rodents were shown to depend on HGF/c-Met signaling, establishing a mechanistic basis for its preclinical activity",
        evidenceType: "Animal",
      }],
    faqs: [
      {
        question: "Is dihexa a proven treatment for Alzheimer's disease?",
        answer:
          "No. Dihexa has never been tested in human clinical trials for Alzheimer's disease or any other indication. All data comes from animal models (primarily mice). While the preclinical synaptogenesis data is interesting, the vast majority of compounds that show promise in Alzheimer's mouse models fail in human trials. Dihexa is not an established therapy.",
      },
      {
        question: "Is dihexa orally bioavailable?",
        answer:
          "Animal studies suggest dihexa has oral bioavailability and crosses the blood-brain barrier, which is unusual for a peptide. However, pharmacokinetic data in humans does not exist. The oral bioavailability claim is based on rodent studies using specific formulations. Whether this translates to humans is unknown.",
      }],
  },

  // ── 48. IGF-1 LR3 ───────────────────────────────────────────────────────
  {
    name: "IGF-1 LR3",
    slug: "igf-1-lr3",
    type: "Insulin-like growth factor-1 analog",
    category: "growth-hormone",
    categoryName: "Growth Hormone Secretagogues",
    aminoAcidCount: 83,
    evidenceLevel: "D",
    description:
      "IGF-1 LR3 (Long R3 Insulin-like Growth Factor-1) is a synthetic analog of human IGF-1 with an arginine substitution at position 3 and a 13-amino-acid N-terminal extension. These modifications reduce binding to IGF-binding proteins, extending its half-life and increasing potency. It is sold as a research chemical and is popular in bodybuilding communities, though no human clinical data exists.",
    mechanism:
      "Binds to the IGF-1 receptor (IGF1R) and insulin receptor with high affinity. The arginine substitution and N-terminal extension reduce binding to IGFBPs, increasing free circulating levels and tissue availability. This promotes cell proliferation, protein synthesis, and inhibits apoptosis. More potent than native IGF-1 in cell culture but unstudied in humans.",
    benefits: [
      { text: "Potent anabolic effects on muscle and bone in cell culture", sourceIds: ["41418663"], evidenceGrade: "D" },
      { text: "Extended half-life vs native IGF-1 due to reduced IGFBP binding", sourceIds: ["41418663"], evidenceGrade: "D" },
      { text: "Promotes cell survival and proliferation", sourceIds: ["41418663"], evidenceGrade: "D" }
    ],
    sideEffects: [
      { text: "No human safety data exists", sourceIds: ["41418663"], evidenceGrade: "D" },
      { text: "Hypoglycemia risk (IGF-1 has insulin-like effects)", sourceIds: ["41418663"], evidenceGrade: "D" },
      { text: "Theoretical cancer risk (IGF-1 is a growth factor for many tumor types)", sourceIds: ["41418663"], evidenceGrade: "D" },
      { text: "Organomegaly and cardiac hypertrophy with chronic use (theoretical)", sourceIds: ["41418663"], evidenceGrade: "D" },
      { text: "Not approved for human use; unregulated product quality", sourceIds: [], evidenceGrade: "D" }
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "No established human dosing. Research chemical suppliers recommend 20-100 mcg daily by subcutaneous injection, but this is not based on clinical data. The compound is not standardized or quality-controlled.",
    routes: ["Subcutaneous injection"],
    relatedPeptides: ["ipamorelin", "cjc-1295", "tesamorelin"],
    refs: [
      {
        pmid: "41418663",
        title: "Provisional Treatment of Volumetric Muscle Loss With Insulin-like Growth Factor 1 Releasing Muscle Void Fillers.",
        year: 2026,
        journal: "J Surg Res",
        finding: "IGF-1 releasing scaffolds supported muscle regeneration in volumetric muscle loss models",
        evidenceType: "Animal",
      }
    ],
    faqs: [
      {
        question: "Is IGF-1 LR3 the same as prescription IGF-1?",
        answer:
          "No. Prescription IGF-1 (mecasermin/Increlex) is FDA-approved for severe primary IGF-1 deficiency and is manufactured under strict quality controls. IGF-1 LR3 is a research chemical analog with no FDA approval, no human clinical data, and no manufacturing oversight. The LR3 modifications change its pharmacokinetics and potency in ways that have not been studied in humans.",
      },
      {
        question: "Does IGF-1 LR3 cause cancer?",
        answer:
          "This is a theoretical concern but unproven in humans. IGF-1 is a growth factor that promotes cell proliferation, and epidemiological studies link high circulating IGF-1 levels to increased risk of prostate, breast, and colorectal cancer. Whether exogenous IGF-1 LR3 increases cancer risk is unknown because it has never been studied in humans. Anyone with a personal or family history of cancer should avoid IGF-1 analogs.",
      }],
  },

  // ── 49. Follistatin-344 ─────────────────────────────────────────────────
  {
    name: "Follistatin-344",
    slug: "follistatin-344",
    type: "Follistatin isoform (autocrine/secreted glycoprotein)",
    category: "growth-hormone",
    categoryName: "Growth Hormone Secretagogues",
    aminoAcidCount: 344,
    evidenceLevel: "D",
    description:
      "Follistatin-344 is the full-length human follistatin isoform that binds and inhibits myostatin, activin, and other TGF-beta family members. It is a naturally occurring protein, not a synthetic peptide, but the recombinant form is sold as a research chemical for muscle growth. Gene therapy trials using follistatin have been conducted for muscular dystrophy.",
    mechanism:
      "Binds to myostatin and activin with high affinity, preventing them from activating ActRIIB receptors on muscle cells. Myostatin normally limits muscle growth; blocking it removes this brake, allowing muscle hypertrophy and hyperplasia. Also has roles in reproductive biology and inflammation via activin inhibition.",
    benefits: [
      { text: "Potent muscle hypertrophy in animal models via myostatin inhibition", sourceIds: ["33460286"], evidenceGrade: "D" },
      { text: "Investigated in gene therapy trials for muscular dystrophy", sourceIds: ["33460286"], evidenceGrade: "D" },
      { text: "May improve muscle function in degenerative muscle diseases", sourceIds: ["33460286"], evidenceGrade: "D" }
    ],
    sideEffects: [
      { text: "No human safety data for exogenous follistatin-344 protein", sourceIds: ["33460286"], evidenceGrade: "D" },
      { text: "Reproductive effects (follistatin regulates FSH via activin inhibition)", sourceIds: ["33460286"], evidenceGrade: "D" },
      { text: "Ocular side effects reported in gene therapy trials (retinal detachment)", sourceIds: ["33460286"], evidenceGrade: "D" },
      { text: "Immunogenicity risk with repeated injections of foreign protein", sourceIds: ["33460286"], evidenceGrade: "D" },
      { text: "Not approved for human use as a protein drug", sourceIds: [], evidenceGrade: "D" }
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "No established human dosing for the recombinant protein. Gene therapy trials used localized intramuscular AAV delivery. Research chemical dosing is entirely unvalidated and varies by supplier.",
    routes: ["Subcutaneous injection", "Intramuscular injection"],
    relatedPeptides: ["igf-1-lr3", "ipamorelin", "cjc-1295"],
    refs: [
      {
        pmid: "33460286",
        title: "Detection of black market follistatin 344.",
        year: 2020,
        journal: "Drug Test Anal",
        finding: "Confirmed the presence of follistatin-344 in black market products sold online, highlighting unregulated distribution and quality concerns",
        evidenceType: "Review",
      }],
    faqs: [
      {
        question: "Is follistatin gene therapy available?",
        answer:
          "Follistatin gene therapy has been investigated in clinical trials for Becker and Duchenne muscular dystrophy using adeno-associated virus (AAV) delivery. Early-phase trials showed some improvement in muscle function, but serious adverse events occurred including immune responses to the viral vector and retinal detachment in one trial. No follistatin gene therapy is FDA-approved as of 2026.",
      },
      {
        question: "Why is follistatin banned in sports?",
        answer:
          "Follistatin is on the WADA Prohibited List as a myostatin inhibitor. Myostatin inhibition produces substantial muscle growth beyond what is achievable through training alone, giving an unfair competitive advantage. Gene therapy approaches to myostatin inhibition (including follistatin gene delivery) are also prohibited. Detection of exogenous follistatin in doping tests has been demonstrated.",
      }],
  },

  // ── 50. MGF (Mechano Growth Factor) ─────────────────────────────────────
  {
    name: "MGF (Mechano Growth Factor)",
    slug: "mgf",
    type: "IGF-1 splice variant (IGF-1Ec)",
    category: "growth-hormone",
    categoryName: "Growth Hormone Secretagogues",
    aminoAcidCount: 24,
    evidenceLevel: "D",
    description:
      "Mechano Growth Factor (MGF) is a splice variant of IGF-1 (specifically IGF-1Ec) that is upregulated in response to mechanical stress and muscle damage. It is believed to play a role in muscle stem cell activation and tissue repair. The synthetic peptide sold as 'MGF' or 'PEG-MGF' is a research chemical with no human clinical data.",
    mechanism:
      "The MGF splice variant activates muscle satellite cells (stem cells) and promotes their proliferation and differentiation into new muscle fibers. It also has local anti-inflammatory effects in damaged muscle. PEG-MGF is a pegylated version designed to extend half-life. The mechanism is based on cell culture and animal studies only.",
    benefits: [
      { text: "Activates muscle satellite cells for repair and growth", sourceIds: ["41272763"], evidenceGrade: "D" },
      { text: "Promotes muscle regeneration after damage in animal models", sourceIds: ["41272763"], evidenceGrade: "D" },
      { text: "Local anti-inflammatory effects in injured muscle", sourceIds: ["41272763"], evidenceGrade: "D" }
    ],
    sideEffects: [
      { text: "No human safety data exists", sourceIds: ["41272763"], evidenceGrade: "D" },
      { text: "Unknown effects on muscle stem cell depletion with chronic use", sourceIds: ["41272763"], evidenceGrade: "D" },
      { text: "Immunogenicity risk with repeated injections", sourceIds: ["41272763"], evidenceGrade: "D" },
      { text: "Not approved for human use", sourceIds: [], evidenceGrade: "D" }
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: true,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "No established human dosing. Research chemical suppliers recommend 200-400 mcg subcutaneously into target muscle groups, but this is entirely unvalidated. No pharmacokinetic or safety data exists in humans.",
    routes: ["Subcutaneous injection", "Intramuscular injection"],
    relatedPeptides: ["igf-1-lr3", "follistatin-344", "ipamorelin"],
    refs: [
      {
        pmid: "41272763",
        title: "Mechanical growth factor inhibited syndesmophyte formation and the progression of osteoarthritis and ankylosing spondylitis-like symptoms in HLA-B27/Hu-β2m transgenic rats.",
        year: 2025,
        journal: "Arthritis Res Ther",
        finding: "MGF showed anti-inflammatory and tissue-protective effects in a rat model of osteoarthritis and ankylosing spondylitis",
        evidenceType: "Animal",
      }
    ],
    faqs: [
      {
        question: "What is the difference between MGF and PEG-MGF?",
        answer:
          "MGF is the natural IGF-1Ec splice variant peptide sequence. PEG-MGF is the same peptide with a polyethylene glycol (PEG) molecule attached to extend its half-life in circulation. Native MGF has a very short half-life (minutes), while PEGylation extends it to hours. However, PEG-MGF has never been studied in humans, and the long-term effects of PEGylated peptides are unknown.",
      },
      {
        question: "Does MGF really activate muscle stem cells?",
        answer:
          "In cell culture and animal studies, the MGF splice variant does activate satellite cells and promote muscle regeneration. However, these findings have not been replicated in human clinical trials because no such trials exist. Whether synthetic MGF/PEG-MGF produces the same effects in humans at the doses used by research chemical consumers is unknown.",
      }],
  },

  // ── 51. P21 ─────────────────────────────────────────────────────────────
  {
    name: "P21",
    slug: "p21",
    type: "CNTF-derived peptide analog",
    category: "cognitive",
    categoryName: "Cognitive Enhancement",
    aminoAcidCount: 15,
    evidenceLevel: "D",
    description:
      "P21 is a synthetic peptide derived from ciliary neurotrophic factor (CNTF), a cytokine with neurotrophic and neuroprotective properties. Developed by Ceregene (now defunct) for Alzheimer's disease, it was designed to mimic CNTF's effects without the side effects of the full protein. No human clinical data exists.",
    mechanism:
      "Claimed to activate CNTF receptor signaling pathways, promoting neurogenesis, neuronal survival, and synaptic plasticity. Also proposed to reduce neuroinflammation and amyloid pathology. However, the mechanism is not well-characterized, and most data comes from cell culture studies rather than validated animal models.",
    benefits: [
      { text: "Promotes neurogenesis in cell culture models", sourceIds: ["37818733"], evidenceGrade: "D" },
      { text: "Mimics CNTF neurotrophic activity without systemic cytokine side effects", sourceIds: ["37818733"], evidenceGrade: "D" },
      { text: "May enhance synaptic plasticity and memory in preclinical models", sourceIds: ["37818733"], evidenceGrade: "D" }
    ],
    sideEffects: [
      { text: "No human safety data exists", sourceIds: ["37818733"], evidenceGrade: "D" },
      { text: "Unknown long-term effects on the CNS", sourceIds: [], evidenceGrade: "D" },
      { text: "Theoretical risk of inappropriate neurogenesis or gliosis", sourceIds: ["37818733"], evidenceGrade: "D" },
      { text: "Not approved for human use", sourceIds: [], evidenceGrade: "D" }
    ],
    fdaStatus: "not-approved",
    fdaApprovedFor: null,
    brandNames: [],
    wadaBanned: false,
    controlledSubstance: false,
    prescriptionRequired: false,
    dosingNotes:
      "No established human dosing. Originally developed for intracerebroventricular delivery in clinical trials (which never progressed past preclinical stages). Research chemical dosing is entirely speculative.",
    routes: ["Subcutaneous injection", "Intranasal"],
    relatedPeptides: ["cerebrolysin", "semax", "selank", "dihexa"],
    refs: [
      {
        pmid: "37818733",
        title: "Cerebrolysin for acute ischaemic stroke.",
        year: 2023,
        journal: "Cochrane Database Syst Rev",
        finding: "Cochrane review found cerebrolysin (the parent compound from which P21 is derived) may improve functional outcomes in acute ischemic stroke; evidence quality was low to moderate",
        evidenceType: "Review",
      }
    ],
    faqs: [
      {
        question: "Was P21 ever tested in humans?",
        answer:
          "No. P21 was developed by Ceregene for Alzheimer's disease and other neurodegenerative conditions, but the company went out of business before human clinical trials were completed. All data on P21 comes from preclinical studies (cell culture and animal models). Any product marketed as P21 today is an unregulated research chemical with no clinical validation.",
      },
      {
        question: "How does P21 compare to CNTF?",
        answer:
          "CNTF is a full-sized cytokine protein (~200 amino acids) that has potent neurotrophic effects but causes severe systemic side effects (weight loss, muscle wasting, cough, fever) when administered peripherally. P21 was designed as a small peptide fragment that retains CNTF's neurotrophic activity without the systemic cytokine effects. However, this claim has not been validated in human studies.",
      }],
  }];

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

// ── SourcedClaim helpers ────────────────────────────────────────────────────

/** Extract plain text strings from a SourcedClaim array. */
export function claimTexts(claims: SourcedClaim[]): string[] {
  return claims.map((c) => c.text);
}

/** Join SourcedClaim texts with a separator. */
export function joinClaims(claims: SourcedClaim[], separator: string): string {
  return claims.map((c) => c.text).join(separator);
}
