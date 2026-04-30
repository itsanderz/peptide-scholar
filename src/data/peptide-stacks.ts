export interface PeptideStack {
  slug: string;
  name: string;
  peptides: { slug: string; name: string; role: string }[];
  category: "healing" | "growth-hormone" | "cognitive" | "metabolic" | "immune" | "longevity" | "community";
  categoryLabel: string;
  synergyRationale: string;
  evidenceLevel: "A" | "B" | "C" | "D";
  evidenceSummary: string;
  safetyNotes: string[];
  fdaStatus: string;
  warningLevel: "none" | "caution" | "contraindicated";
  warningText?: string;
  /** "research" = documented in scientific literature; "community" = popular in online communities, anecdotal */
  type: "research" | "community";
  /** For community stacks: note about origin/popularity */
  communityNote?: string;
}

export const peptideStacks: PeptideStack[] = [
  {
    slug: "wolverine-stack",
    name: "Wolverine Stack",
    peptides: [
      { slug: "bpc-157", name: "BPC-157", role: "Angiogenesis, tendon/ligament healing, GI protection" },
      { slug: "tb-500", name: "TB-500", role: "Actin upregulation, cell migration, soft tissue repair" },
    ],
    category: "healing",
    categoryLabel: "Healing & Recovery",
    synergyRationale:
      "BPC-157 and TB-500 target different mechanisms of tissue repair. BPC-157 promotes angiogenesis and modulates growth factors (NO pathway), while TB-500 (thymosin beta-4 fragment) upregulates actin and promotes cell migration. In theory, BPC-157 accelerates the structural rebuilding while TB-500 enhances the cellular mobility needed for tissue remodeling. This combination is widely discussed in research contexts for soft-tissue injuries.",
    evidenceLevel: "D",
    evidenceSummary:
      "No published clinical trials have studied BPC-157 + TB-500 in humans. BPC-157 has extensive rodent studies on tendon, ligament, and gastric healing. TB-500 has preclinical data on wound healing and angiogenesis. The combination is entirely theoretical and based on mechanism speculation, not empirical data.",
    safetyNotes: [
      "Both peptides are FDA Category 2 (prohibited from compounding in the US as of 2023-2024)",
      "Theoretical cancer promotion concern due to angiogenesis stimulation",
      "No human safety data for the combination",
      "BPC-157: animal-only data; TB-500: no controlled human trials",
    ],
    fdaStatus: "Both not approved; Category 2 prohibited from compounding",
    warningLevel: "caution",
    warningText: "Both peptides are banned from compounding by FDA Category 2 listing. No human combination trials exist.",
    type: "research",
  },
  {
    slug: "gh-cjc-ipamorelin",
    name: "GH Optimization Stack",
    peptides: [
      { slug: "cjc-1295", name: "CJC-1295", role: "GHRH analog — sustains GH release baseline" },
      { slug: "ipamorelin", name: "Ipamorelin", role: "GHRP — triggers acute GH pulses" },
    ],
    category: "growth-hormone",
    categoryLabel: "Growth Hormone",
    synergyRationale:
      "CJC-1295 (GHRH pathway) and Ipamorelin (ghrelin/GHRP pathway) stimulate growth hormone release through different receptor systems. CJC-1295 elevates the baseline GH level by mimicking GHRH, while Ipamorelin triggers acute GH pulses via ghrelin receptor activation. The combination theoretically produces both sustained elevation and sharp pulses, closer to physiological GH patterns than either peptide alone.",
    evidenceLevel: "C",
    evidenceSummary:
      "Individual peptides have Phase I-II data. CJC-1295 pharmacokinetics are published. Ipamorelin has multiple clinical studies showing GH elevation. No published RCT specifically tests the CJC-1295 + Ipamorelin combination, though the mechanistic synergy is well-established in endocrinology (GHRH + GHRP synergy is a validated physiological concept).",
    safetyNotes: [
      "Neither peptide is FDA-approved for general GH optimization",
      "Potential for elevated IGF-1, fluid retention, and insulin resistance",
      "CJC-1295 with DAC has very long half-life — less physiological than no-DAC version",
      "Ipamorelin has the cleanest side-effect profile of all GHRPs (minimal cortisol/prolactin impact)",
    ],
    fdaStatus: "Neither FDA-approved for this indication",
    warningLevel: "caution",
    warningText: "Not FDA-approved for anti-aging or body composition. Long-term safety data is limited.",
    type: "research",
  },
  {
    slug: "gh-cjc-ghrp2",
    name: "GH Pulse Stack",
    peptides: [
      { slug: "cjc-1295", name: "CJC-1295", role: "GHRH analog — sustained GH elevation" },
      { slug: "ghrp-2", name: "GHRP-2", role: "Ghrelin mimetic — strong acute GH pulse" },
    ],
    category: "growth-hormone",
    categoryLabel: "Growth Hormone",
    synergyRationale:
      "GHRP-2 is a more potent ghrelin mimetic than Ipamorelin but with more side effects (cortisol/prolactin elevation, hunger). Combined with CJC-1295, it produces stronger GH pulses. The trade-off is a less clean side-effect profile compared to the Ipamorelin variant.",
    evidenceLevel: "C",
    evidenceSummary:
      "GHRP-2 has extensive clinical research showing GH elevation. CJC-1295 pharmacokinetics are published. The combination logic is the same GHRH + GHRP synergy principle. No dedicated combination RCTs published.",
    safetyNotes: [
      "GHRP-2 increases cortisol and prolactin — monitor if susceptible",
      "Stronger hunger stimulation than Ipamorelin",
      "Neither peptide is FDA-approved for general use",
    ],
    fdaStatus: "Neither FDA-approved for this indication",
    warningLevel: "caution",
    warningText: "GHRP-2 elevates cortisol and prolactin. Not FDA-approved.",
    type: "research",
  },
  {
    slug: "gh-sermorelin-ghrp2",
    name: "Classic GH Stack",
    peptides: [
      { slug: "sermorelin", name: "Sermorelin", role: "GHRH analog (formerly FDA-approved) — physiological GH release" },
      { slug: "ghrp-2", name: "GHRP-2", role: "Ghrelin mimetic — acute GH pulse" },
    ],
    category: "growth-hormone",
    categoryLabel: "Growth Hormone",
    synergyRationale:
      "Sermorelin is the only GHRH analog with former FDA approval (for pediatric GH deficiency). It produces physiological pulsatile GH release. GHRP-2 adds acute pulse amplitude. This stack combines regulatory legitimacy (for sermorelin's approved indication) with the synergistic GHRP mechanism.",
    evidenceLevel: "B",
    evidenceSummary:
      "Sermorelin was FDA-approved for GH deficiency diagnosis and treatment. GHRP-2 has extensive clinical data. The GHRH + GHRP synergy is established in endocrinology literature. No modern RCT specifically tests sermorelin + GHRP-2, but both components have stronger evidence than most research peptides.",
    safetyNotes: [
      "Sermorelin's FDA approval was for pediatric GH deficiency, not adult optimization",
      "GHRP-2 increases cortisol and prolactin",
      "Geref (sermorelin brand) was discontinued; only compounded versions remain",
    ],
    fdaStatus: "Sermorelin previously FDA-approved; GHRP-2 not approved",
    warningLevel: "caution",
    warningText: "Sermorelin FDA approval was for pediatric GH deficiency, not general use.",
    type: "research",
  },
  {
    slug: "cognitive-semax-selank",
    name: "Cognitive Support Stack",
    peptides: [
      { slug: "semax", name: "Semax", role: "BDNF/trkB modulation, neuroprotection" },
      { slug: "selank", name: "Selank", role: "Anxiolytic, enkephalin/GABA modulation" },
    ],
    category: "cognitive",
    categoryLabel: "Cognitive & Nootropic",
    synergyRationale:
      "Semax and Selank are both Russian-developed nootropic peptides with different but complementary mechanisms. Semax upregulates BDNF and supports neuroplasticity, while Selank modulates anxiety pathways (enkephalins, GABA). The combination theoretically addresses both cognitive enhancement and the anxiety that can impair cognition.",
    evidenceLevel: "D",
    evidenceSummary:
      "Both peptides have been studied in Russian clinical trials, but Western peer-reviewed replication is limited. Semax has data on cognitive function and neuroprotection in animal models. Selank has anxiolytic data. No published trials test the combination.",
    safetyNotes: [
      "Neither peptide is FDA-approved",
      "Semax: theoretical concern with intracranial neoplasia or seizure history",
      "Selank: unknown interaction with SSRIs and other anxiolytics",
      "Both require intranasal or subcutaneous administration",
    ],
    fdaStatus: "Neither FDA-approved",
    warningLevel: "caution",
    warningText: "Primarily Russian research data. Limited Western replication.",
    type: "research",
  },
  {
    slug: "immune-epithalon-thymalin",
    name: "Immune & Longevity Stack",
    peptides: [
      { slug: "epithalon", name: "Epithalon", role: "Telomerase activation, pineal regulation" },
      { slug: "thymalin", name: "Thymalin", role: "Thymic immune modulation" },
    ],
    category: "longevity",
    categoryLabel: "Longevity & Immune",
    synergyRationale:
      "Both peptides were developed by Prof. Vladimir Khavinson in Russia. Epithalon (Epitalon) targets cellular aging via telomerase activation and pineal gland function. Thymalin targets immunosenescence via thymic restoration. The combination addresses two pillars of aging: cellular senescence and immune decline.",
    evidenceLevel: "D",
    evidenceSummary:
      "Evidence comes primarily from Soviet-era and post-Soviet Russian clinical studies that have not been replicated in Western peer-reviewed journals. Khavinson's work is extensive but not independently validated. No modern RCTs exist.",
    safetyNotes: [
      "Neither peptide is FDA-approved",
      "Russian data not replicated in Western journals",
      "Long-term safety unknown",
      "Immunomodulatory effects could be problematic in autoimmune conditions",
    ],
    fdaStatus: "Neither FDA-approved",
    warningLevel: "caution",
    warningText: "Evidence primarily from unreplicated Russian studies.",
    type: "research",
  },
  {
    slug: "metabolic-glp1-semaglutide",
    name: "GLP-1 Monotherapy",
    peptides: [
      { slug: "semaglutide", name: "Semaglutide", role: "GLP-1 receptor agonist — appetite suppression, gastric slowing" },
    ],
    category: "metabolic",
    categoryLabel: "Metabolic & Weight Loss",
    synergyRationale:
      "Semaglutide is FDA-approved for type 2 diabetes and obesity. It is the standard-of-care GLP-1 agonist with the strongest evidence base. While some research contexts discuss combining GLP-1 agonists with other peptides (e.g., for muscle preservation), semaglutide alone is the clinically validated approach.",
    evidenceLevel: "A",
    evidenceSummary:
      "Multiple Phase III trials (STEP, SUSTAIN), FDA-approved, extensive real-world data. Semaglutide produces 15-17% body weight loss in obesity trials and significantly improves glycemic control.",
    safetyNotes: [
      "FDA-approved but with known risks: GI side effects, potential pancreatitis, gallbladder disease",
      "Thyroid C-cell tumor risk (animal data; contraindicated in MTC history)",
      "Significant lean mass loss (25-40% of total weight lost)",
    ],
    fdaStatus: "FDA-approved (Ozempic, Wegovy, Rybelsus)",
    warningLevel: "none",
    type: "research",
  },
  // ── Community / Popular Stacks ───────────────────────────────────────────
  {
    slug: "athlete-recovery-community",
    name: "Athlete Recovery Stack (Community)",
    peptides: [
      { slug: "bpc-157", name: "BPC-157", role: "Tendon/ligament healing, inflammation modulation" },
      { slug: "tb-500", name: "TB-500", role: "Cell migration, soft tissue repair" },
      { slug: "ghk-cu", name: "GHK-Cu", role: "Collagen synthesis, tissue remodeling" },
    ],
    category: "community",
    categoryLabel: "Community Stack",
    synergyRationale:
      "Popular in athletic and bodybuilding communities for injury recovery. The rationale combines three peptides with different healing mechanisms: BPC-157 for structural repair, TB-500 for cell mobility, and GHK-Cu for collagen/matrix support. This combination is discussed extensively on forums and by biohackers but has zero published clinical trials.",
    evidenceLevel: "D",
    evidenceSummary:
      "No clinical trials have tested this three-peptide combination. Each component has preclinical data, but there is no empirical evidence for synergy when combined. All popularity is based on online community discussion, not peer-reviewed research.",
    safetyNotes: [
      "BPC-157 and TB-500 are WADA banned in competitive sports",
      "GHK-Cu is generally recognized as safe topically; systemic safety data is limited",
      "No interaction studies between these three peptides",
      "All three are unregulated research chemicals when sourced online",
    ],
    fdaStatus: "None FDA-approved for athletic recovery",
    warningLevel: "contraindicated",
    warningText: "BPC-157 and TB-500 are banned by WADA. No human safety data for this combination.",
    type: "community",
    communityNote:
      "Widely discussed on Reddit (r/Peptides), bodybuilding forums, and by influencers. Zero clinical evidence supports this stack.",
  },
  {
    slug: "biohacker-longevity-community",
    name: "Biohacker Longevity Stack (Community)",
    peptides: [
      { slug: "epithalon", name: "Epithalon", role: "Telomerase activation, pineal regulation" },
      { slug: "thymalin", name: "Thymalin", role: "Thymic immune restoration" },
      { slug: "ghk-cu", name: "GHK-Cu", role: "Gene expression resetting, tissue repair" },
    ],
    category: "community",
    categoryLabel: "Community Stack",
    synergyRationale:
      "Popular in longevity and anti-aging biohacker circles. The theoretical premise is addressing multiple aging hallmarks: cellular senescence (Epithalon), immunosenescence (Thymalin), and tissue degeneration (GHK-Cu). This is entirely speculative and based on extrapolation from preclinical data.",
    evidenceLevel: "D",
    evidenceSummary:
      "No clinical trials have tested this combination. Epithalon and Thymalin data come from unreplicated Russian studies. GHK-Cu has preclinical data on gene expression. The combination is purely theoretical.",
    safetyNotes: [
      "None of these peptides are FDA-approved for longevity",
      "Epithalon and Thymalin have no Western regulatory approval",
      "Long-term safety of combining immunomodulatory peptides is unknown",
      "Telomerase activation could theoretically promote cancer",
    ],
    fdaStatus: "None FDA-approved for longevity",
    warningLevel: "caution",
    warningText: "All longevity claims are speculative. No human trials support this combination.",
    type: "community",
    communityNote:
      "Promoted by figures in the longevity space. Popular on biohacker podcasts and forums. No major researcher has endorsed this specific combination.",
  },
  {
    slug: "huberman-gh-stack-community",
    name: "Huberman-Style GH Stack (Community)",
    peptides: [
      { slug: "sermorelin", name: "Sermorelin", role: "GHRH analog — physiological GH release" },
      { slug: "ipamorelin", name: "Ipamorelin", role: "GHRP — clean GH pulse with minimal side effects" },
    ],
    category: "community",
    categoryLabel: "Community Stack",
    synergyRationale:
      "Dr. Andrew Huberman has discussed growth hormone optimization on his podcast, mentioning GHRH + GHRP combinations as a mechanistic approach to stimulate endogenous GH. Sermorelin (GHRH analog) + Ipamorelin (selective GHRP) is the cleanest variant discussed. Note: Huberman has not specifically endorsed these peptides; this stack is inspired by the mechanisms he describes.",
    evidenceLevel: "C",
    evidenceSummary:
      "Sermorelin was formerly FDA-approved. Ipamorelin has clinical data. The GHRH + GHRP synergy is established in endocrinology. No published trials specifically test sermorelin + ipamorelin together. This stack is a community extrapolation from the research stacks.",
    safetyNotes: [
      "Sermorelin is no longer commercially available (discontinued)",
      "Ipamorelin is not FDA-approved",
      "Both require injection",
      "May cause fluid retention and elevated IGF-1",
    ],
    fdaStatus: "Sermorelin previously FDA-approved; Ipamorelin not approved",
    warningLevel: "caution",
    warningText: "Inspired by podcast discussion, not a specific clinical recommendation.",
    type: "community",
    communityNote:
      "Inspired by Dr. Andrew Huberman's podcast discussions on GH optimization. Huberman has not endorsed these specific peptides.",
  },
  {
    slug: "skin-hair-community",
    name: "Skin & Hair Stack (Community)",
    peptides: [
      { slug: "ghk-cu", name: "GHK-Cu", role: "Collagen synthesis, hair follicle stimulation" },
      { slug: "collagen-peptides", name: "Collagen Peptides", role: "Dietary collagen precursor" },
    ],
    category: "community",
    categoryLabel: "Community Stack",
    synergyRationale:
      "Popular in cosmetic and wellness communities. GHK-Cu is used in topical skincare and hair products. Collagen peptides are widely consumed as supplements. The combination is based on the idea that topical + systemic approaches to collagen support may synergize, though this is not proven.",
    evidenceLevel: "C",
    evidenceSummary:
      "GHK-Cu has small human cosmetic studies. Collagen peptides have mixed RCT data (some positive for skin elasticity, recent negative for joint pain). No trials test them together for skin/hair.",
    safetyNotes: [
      "GHK-Cu is a cosmetic ingredient, not an FDA-approved drug for wrinkles",
      "Collagen peptides are dietary supplements with variable quality",
      "Topical GHK-Cu is generally safe; systemic use data is limited",
    ],
    fdaStatus: "Neither FDA-approved as drugs for skin/hair",
    warningLevel: "none",
    type: "community",
    communityNote:
      "Widely recommended on skincare forums and by cosmetic influencers. Evidence is modest at best.",
  },
];

export const stackCategories = [
  { id: "healing", label: "Healing & Recovery", color: "#2B8A5E" },
  { id: "growth-hormone", label: "Growth Hormone", color: "#3B7A9E" },
  { id: "cognitive", label: "Cognitive & Nootropic", color: "#7C3AED" },
  { id: "metabolic", label: "Metabolic & Weight Loss", color: "#D4553A" },
  { id: "longevity", label: "Longevity & Immune", color: "#0891B2" },
  { id: "community", label: "Community & Popular", color: "#6B7280" },
];

export function getStackBySlug(slug: string): PeptideStack | undefined {
  return peptideStacks.find((s) => s.slug === slug);
}

export function getStacksByCategory(category: string): PeptideStack[] {
  return peptideStacks.filter((s) => s.category === category);
}
