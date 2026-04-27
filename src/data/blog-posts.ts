export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: number;
  category: "Research Review" | "Clinical Data" | "Regulatory" | "Practical Guide";
  keyTakeaways: string[];
  body: {
    heading?: string;
    paragraphs?: string[];
    listItems?: string[];
    callout?: string;
  }[];
  refs: { title: string; pmid?: string; note?: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "semaglutide-vs-tirzepatide-clinical-data",
    title: "Semaglutide vs. Tirzepatide: What Three Years of Clinical Data Tell Us",
    excerpt:
      "A head-to-head breakdown of the STEP 1, SURMOUNT-1, and SURMOUNT-5 trial data — including actual weight loss percentages, side effect rates, and who each medication may be better suited for.",
    publishedAt: "2026-03-10",
    readingTime: 9,
    category: "Clinical Data",
    keyTakeaways: [
      "STEP 1 (semaglutide 2.4 mg): 14.9% mean body weight loss vs 2.4% placebo at 68 weeks",
      "SURMOUNT-1 (tirzepatide 15 mg): 20.9% mean body weight loss vs 3.1% placebo at 72 weeks",
      "SURMOUNT-5 head-to-head: tirzepatide outperformed semaglutide by 6.5 percentage points",
      "Tirzepatide's GI side effect rates appear modestly lower in trial data",
      "Semaglutide has more cardiovascular outcome data (SELECT, SUSTAIN-6 trials)",
    ],
    body: [
      {
        paragraphs: [
          "Semaglutide (Ozempic, Wegovy) and tirzepatide (Mounjaro, Zepbound) are the two dominant GLP-1–based medications approved for weight management in the United States. Both have become cultural phenomena — but clinical decision-making should rest on trial data, not headlines.",
          "This review breaks down the major randomized controlled trials for both medications and the first published head-to-head comparison.",
        ],
      },
      {
        heading: "The Mechanism Difference",
        paragraphs: [
          "Semaglutide is a selective GLP-1 receptor agonist. GLP-1 (glucagon-like peptide-1) is an incretin hormone released by the gut after eating. It stimulates insulin secretion in a glucose-dependent manner, suppresses glucagon, slows gastric emptying, and reduces appetite via hypothalamic signaling. Semaglutide's ~7-day half-life (enabled by albumin binding) allows once-weekly subcutaneous dosing.",
          "Tirzepatide is a dual GIP/GLP-1 receptor agonist — a single molecule that activates both GIP (glucose-dependent insulinotropic polypeptide) and GLP-1 receptors simultaneously. In isolation, GIP has modest effects on weight. The combination appears synergistic, particularly for adipose tissue lipolysis and pancreatic beta-cell preservation.",
        ],
      },
      {
        heading: "STEP 1 vs. SURMOUNT-1: Core Weight Loss Data",
        paragraphs: [
          "STEP 1 enrolled 1,961 adults with obesity (BMI ≥30, or ≥27 with comorbidities) and no diabetes. Participants received semaglutide 2.4 mg subcutaneous weekly or placebo for 68 weeks (PMID: 33567185).",
        ],
        listItems: [
          "Mean body weight reduction: 14.9% (semaglutide) vs 2.4% (placebo)",
          "≥5% weight loss achieved: 86% vs 32%",
          "≥15% weight loss achieved: 32% vs 2%",
          "≥20% weight loss achieved: 12% vs <1%",
        ],
      },
      {
        paragraphs: [
          "SURMOUNT-1 enrolled 2,539 adults with obesity (same criteria) without diabetes. Participants received tirzepatide 5 mg, 10 mg, or 15 mg subcutaneous weekly, or placebo, for 72 weeks (PMID: 35658024).",
        ],
        listItems: [
          "Mean weight reduction: 15.0% (5 mg), 19.5% (10 mg), 20.9% (15 mg) vs 3.1% placebo",
          "≥5% weight loss: 85%, 89%, 91% respectively vs 35% placebo",
          "≥20% weight loss: 10%, 25%, 38% respectively vs 1% placebo",
        ],
      },
      {
        callout:
          "At maximum approved doses, tirzepatide achieved ~20.9% mean weight loss vs semaglutide's 14.9%. The proportion reaching ≥20% weight loss was 38% on tirzepatide 15 mg vs 12% on semaglutide 2.4 mg — a clinically meaningful difference.",
      },
      {
        heading: "The Head-to-Head: SURMOUNT-5",
        paragraphs: [
          "SURMOUNT-5 was the first published head-to-head RCT comparing tirzepatide 10/15 mg vs semaglutide 2.4 mg in adults with obesity without diabetes. Published in NEJM in 2025, this trial provides the most direct comparison available.",
          "At 72 weeks: tirzepatide produced −20.2% body weight reduction vs −13.7% for semaglutide, a difference of −6.5 percentage points (95% CI: −7.5 to −5.4, p<0.001). Tirzepatide was superior across all pre-specified secondary endpoints.",
        ],
      },
      {
        heading: "Side Effect Profiles",
        paragraphs: [
          "Both medications share a GLP-1 class side effect profile dominated by gastrointestinal symptoms, which are generally dose-dependent and most prominent during dose escalation. Rates below are approximate from respective weight loss trials:",
        ],
        listItems: [
          "Nausea: ~44% (semaglutide) vs ~33% (tirzepatide)",
          "Vomiting: ~24% (semaglutide) vs ~13% (tirzepatide)",
          "Diarrhea: ~30% (semaglutide) vs ~20% (tirzepatide)",
          "Constipation: ~24% (semaglutide) vs ~14% (tirzepatide)",
          "Discontinuation due to adverse events: ~7% (semaglutide) vs ~6% (tirzepatide)",
        ],
      },
      {
        paragraphs: [
          "Tirzepatide's GI side effect rates are modestly lower across all categories in trial data. The proposed mechanism: GIP receptor activation may moderate GLP-1-induced nausea through central nervous system pathways.",
          "Serious adverse events are rare with both medications. Neither has demonstrated a statistically significant increase in pancreatitis above baseline in major trials, though both carry class warnings. Gallbladder disease (cholelithiasis) is increased with rapid weight loss from any cause.",
        ],
      },
      {
        heading: "Cardiovascular Outcome Data",
        paragraphs: [
          "Semaglutide has a substantially larger body of cardiovascular outcome data. The SELECT trial (2024, PMID: 37952131) enrolled 17,604 adults with obesity and established cardiovascular disease (no diabetes) and showed a 20% reduction in major adverse cardiovascular events (MACE) with semaglutide vs placebo — the first cardiovascular benefit demonstrated for a weight-loss drug in high-risk non-diabetic patients.",
          "Tirzepatide's cardiovascular outcomes trial (SURPASS-CVOT) is ongoing. Current data is insufficient to establish cardiovascular benefit independent of glucose control. This is a meaningful differentiator for high-risk patients as of 2026.",
        ],
      },
      {
        heading: "Clinical Considerations",
        paragraphs: ["There is no universally superior choice — the decision depends on individual patient factors:"],
        listItems: [
          "Maximum weight loss efficacy: tirzepatide 15 mg shows the strongest trial data",
          "Established cardiovascular benefit data: semaglutide (SELECT trial in obesity + CVD)",
          "GI tolerability: tirzepatide appears modestly better tolerated in trials",
          "Cost and access: both remain expensive without insurance; availability varies",
          "Type 2 diabetes: both have FDA approval; tirzepatide shows superior HbA1c reduction in SURPASS-2",
        ],
      },
    ],
    refs: [
      { title: "Wilding et al. Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1). NEJM 2021.", pmid: "33567185" },
      { title: "Jastreboff et al. Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1). NEJM 2022.", pmid: "35658024" },
      { title: "Lincoff et al. Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes (SELECT). NEJM 2024.", pmid: "37952131" },
      { title: "Wadden et al. Tirzepatide vs Semaglutide for Obesity (SURMOUNT-5). NEJM 2025." },
    ],
  },

  {
    slug: "bpc-157-evidence-review",
    title: "BPC-157: An Honest Look at the Evidence for This Popular Healing Peptide",
    excerpt:
      "BPC-157 has compelling rodent data for tendon healing and gastroprotection — but there are essentially no published randomized controlled trials in humans. Here's what the science actually shows and what we're still missing.",
    publishedAt: "2026-03-03",
    readingTime: 8,
    category: "Research Review",
    keyTakeaways: [
      "BPC-157 is a synthetic 15-amino-acid peptide originally derived from human gastric juice",
      "Over 200 animal studies show healing effects on tendons, gut, wounds, and nerves — predominantly from one research group",
      "No published Phase II or Phase III RCTs in humans exist as of 2026",
      "Evidence level is D (preclinical/anecdotal) for human clinical applications",
      "Quality control is a major practical concern when sourcing from research chemical suppliers",
    ],
    body: [
      {
        paragraphs: [
          "BPC-157 (Body Protection Compound-157) has become one of the most discussed peptides in fitness, biohacking, and sports medicine communities. Claims range from accelerated tendon recovery to gastroprotection to organ-level healing. There is genuine scientific interest in this compound — but the evidence base requires careful scrutiny.",
        ],
      },
      {
        heading: "What Is BPC-157?",
        paragraphs: [
          "BPC-157 is a pentadecapeptide (15 amino acids: GEPPPGKPADDAGLV) that was isolated and characterized from the sequence of human gastric juice in the 1990s. The endogenous compound exists at trace concentrations in gastric secretions. The research compound is a synthetic analog, not the endogenous peptide itself.",
          "It is not FDA-approved for any indication. It is not available through licensed US pharmacies as a prescription compound. In the current regulatory environment (post-2025 FDA compounding guidance), it falls outside the class of peptides that compounding pharmacies can legally prepare for most patients.",
        ],
      },
      {
        heading: "What the Rodent Studies Show",
        paragraphs: [
          "The vast majority of BPC-157 research originates from the laboratory of Predrag Sikiric at the University of Zagreb, Croatia. His group has published over 200 papers documenting effects across multiple organ systems in rats and mice. Independent replication is limited but exists.",
        ],
        listItems: [
          "Tendon and ligament healing: Multiple studies show accelerated healing of surgically severed Achilles tendons in rats, including improved tendon-to-bone reattachment",
          "Gastroprotection: Consistent protection against NSAID-induced gastric ulcers, ethanol-induced gastric lesions, and various colitis models — the most robustly replicated effect",
          "Wound healing: Accelerated skin wound closure with improved angiogenesis in rodent models",
          "Bone healing: Some evidence for accelerated bone repair in fracture models",
          "Neurological: Protection against dopaminergic neurotoxins in some rodent paradigms",
          "Muscle: Improved healing in crush injury and ischemia-reperfusion models",
        ],
      },
      {
        heading: "The Critical Evidence Gap",
        paragraphs: [
          "There are no published Phase II or Phase III randomized controlled trials of BPC-157 in humans for any indication. One clinical trial registration exists for an IBD (inflammatory bowel disease) indication, but results have not been published.",
          "The available human data consists of: (1) anecdotal self-reports from individuals who have used it outside of clinical settings, and (2) extrapolations from the gastric peptide literature. Neither constitutes clinical evidence.",
        ],
        callout:
          "Promising animal data does not automatically translate to human benefit. Many compounds with strong rodent data have failed in human trials — sometimes due to pharmacokinetic differences, species-specific mechanisms, or publication bias in the animal literature.",
      },
      {
        heading: "Why the Animal Data Is Interesting",
        paragraphs: [
          "The rodent data is not without value. Tendon healing models in rats have predicted human benefit for other interventions. The gastroprotection data is particularly compelling: BPC-157 appears to protect gut tissue through multiple pathways, including modulation of nitric oxide synthesis, prostaglandin pathways, and growth factor signaling.",
          "The breadth of effects across organ systems — which critics point to as implausibly broad — may reflect a fundamental mechanism (perhaps involving the NO/cGMP pathway or growth hormone receptor expression) with downstream effects across multiple tissue types.",
        ],
      },
      {
        heading: "Practical Considerations",
        paragraphs: [
          "For researchers and individuals considering BPC-157, the practical realities are important:",
        ],
        listItems: [
          "Regulatory: Not legally available through most pharmacy channels in the US as of 2025-2026",
          "Quality: Research chemical suppliers vary enormously in purity; always request HPLC + mass spec COA with endotoxin testing",
          "Sourcing risk: Variable purity, unknown impurities, and endotoxin contamination are real risks in research chemical sourcing",
          "Route: Used subcutaneously or intraperitoneally in rodent studies; oral use is also studied but bioavailability is unclear",
        ],
      },
      {
        heading: "What Would Change the Evidence Assessment",
        paragraphs: [
          "BPC-157 would move from Evidence Level D to a higher grade with: (1) one or more published Phase II RCTs in humans showing statistically significant benefits in a specific indication; (2) pharmacokinetic data in humans showing adequate bioavailability and safety; (3) independent replication of key animal findings by labs outside Zagreb.",
          "The compound remains scientifically interesting. It is not established medicine.",
        ],
      },
    ],
    refs: [
      { title: "Sikiric et al. Stable gastric pentadecapeptide BPC 157 in trials for inflammatory bowel disease. Curr Pharm Des 2011." },
      { title: "Pevec et al. Impact of pentadecapeptide BPC 157 on healing of surgically-removed bone in rabbits. J Orthop Surg Res 2010." },
      { title: "Chang et al. The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth. J Appl Physiol 2011." },
      { title: "Sikiric et al. Cytoprotective effect of pentadecapeptide BPC 157 on aspirin-induced gastric lesions. J Physiol Paris 2012.", note: "Gastroprotection rodent model" },
    ],
  },

  {
    slug: "fda-glp1-compounding-2025",
    title: "The FDA's GLP-1 Compounding Crackdown: What Changed in 2025",
    excerpt:
      "When FDA removed semaglutide and tirzepatide from its drug shortage list, it triggered major legal and regulatory changes for compounding pharmacies. Here's a clear factual summary of what changed and what it means for patients.",
    publishedAt: "2026-02-20",
    readingTime: 7,
    category: "Regulatory",
    keyTakeaways: [
      "FDA removed tirzepatide from shortage list in December 2024 and semaglutide in March 2025",
      "503A and 503B compounders lost the legal basis to prepare essentially identical GLP-1 compounds",
      "Compounds with meaningful differences (different salts, formulations with other ingredients) may remain permissible",
      "An estimated 500,000+ patients had been accessing compounded GLP-1 medications",
      "Ongoing litigation challenges FDA's shortage status determination methodology",
    ],
    body: [
      {
        paragraphs: [
          "The compounded GLP-1 market grew explosively from 2022 to 2024. When FDA declared semaglutide and tirzepatide to be in shortage, compounding pharmacies gained legal authority to prepare versions of these drugs at dramatically lower prices. Compounded semaglutide reached patients at $300-600/month compared to $1,000+ for branded Ozempic. Then the shortage declarations ended.",
        ],
      },
      {
        heading: "The Legal Basis for Compounding During Shortages",
        paragraphs: [
          "Under the Federal Food, Drug, and Cosmetic Act (FDCA), Sections 503A and 503B govern compounding pharmacies. During a declared drug shortage, these sections allow licensed compounders to prepare 'essentially a copy' of a commercially available drug — an exception that normally would not be permitted.",
          "503A pharmacies are traditional compounders serving individual prescriptions. 503B facilities are larger outsourcing facilities that can prepare larger batches for office use and healthcare facilities without individual prescriptions. Both categories benefited from the shortage exception during 2022-2024.",
        ],
      },
      {
        heading: "What Happened When the Shortage Ended",
        paragraphs: [
          "FDA removed tirzepatide from its shortage list in December 2024. For semaglutide, FDA determined the shortage had resolved in early 2025 (with a phased announcement). These determinations triggered the wind-down provisions of the FDCA.",
          "503A pharmacies received a compliance deadline of approximately 90 days from shortage resolution to cease compounding essentially identical products. 503B outsourcing facilities received similar timelines. The FDA issued guidance documents specifying enforcement expectations.",
        ],
      },
      {
        heading: "What Remained Legally Permissible",
        paragraphs: ["Not all compounding became impermissible. Key carve-outs remained:"],
        listItems: [
          "Compounds with a 'meaningful difference' from branded products — different salt forms (e.g., semaglutide sodium or acetate vs. semaglutide base), different routes of administration, or combinations with other active ingredients (B12, NAD+, L-carnitine)",
          "Compounds for patients with documented allergies to excipients in the branded formulation",
          "Office-use preparations for patients with demonstrated medical need",
          "Compounding by 503B facilities for hospital systems under specific regulatory exceptions",
        ],
      },
      {
        callout:
          "The 'different salt' argument became a significant point of legal dispute. Some compounders argued that semaglutide acetate or sodium salt formulations were meaningfully different products not covered by the shortage ruling — an argument FDA disputed.",
      },
      {
        heading: "Patient Impact",
        paragraphs: [
          "Estimates suggest 500,000 to 1 million+ patients had been accessing GLP-1 medications through compounding channels. The transition created significant disruption. Options for affected patients included:",
        ],
        listItems: [
          "Transition to branded products with insurance coverage (coverage varies substantially by plan and state mandate)",
          "Manufacturer patient assistance programs (Lilly and Novo Nordisk both operate these for qualifying income levels)",
          "Transition to branded products at out-of-pocket pricing (typically $900-1,200/month)",
          "Medically supervised tapering if unable to access ongoing treatment",
        ],
      },
      {
        heading: "Ongoing Legal Challenges",
        paragraphs: [
          "The regulatory determination was not accepted without challenge. The Outsourcing Facilities Association and several 503B facilities filed suit challenging FDA's methodology for determining that the shortage had resolved — arguing that the shortage status determination did not adequately account for patient access, wait times, and distribution constraints.",
          "As of early 2026, litigation remains active in some federal districts. FDA's enforcement posture has generally held, though the legal landscape continues to evolve. Patients should consult directly with their prescribers and pharmacies about current options in their specific state, as state pharmacy board regulations can affect what is permissible locally.",
        ],
      },
      {
        heading: "State-Level Variation",
        paragraphs: [
          "State pharmacy boards regulate compounding within their jurisdictions and some have taken independent positions. A handful of states have sought to protect compounding access through state law, while others have strictly followed FDA guidance. This creates a patchwork of access that depends significantly on where a patient is located and what their prescriber and compounding pharmacy are willing and authorized to prepare.",
        ],
      },
    ],
    refs: [
      { title: "FDCA Section 503A — Traditional compounding (21 U.S.C. § 353a)", note: "Federal statutory basis for pharmacy compounding" },
      { title: "FDCA Section 503B — Outsourcing facilities (21 U.S.C. § 353b)", note: "Federal statutory basis for 503B compounders" },
      { title: "FDA Drug Shortages — Active shortage list database", note: "FDA.gov/drugs/drug-safety-and-availability/drug-shortages" },
      { title: "FDA Guidance: Compounding Under the Federal Food, Drug, and Cosmetic Act (2023 update)", note: "FDA guidance document" },
    ],
  },

  {
    slug: "ghk-cu-copper-peptide-research",
    title: "GHK-Cu: What's Behind the Anti-Aging Copper Peptide Research Surge",
    excerpt:
      "GHK-Cu is a naturally occurring tripeptide with genuine clinical evidence for skin and wound healing — and the most legitimate research foundation among commonly discussed anti-aging peptides. Here's what the science shows.",
    publishedAt: "2026-02-10",
    readingTime: 8,
    category: "Research Review",
    keyTakeaways: [
      "GHK-Cu is a naturally occurring tripeptide (glycyl-L-histidyl-L-lysine) that declines with age",
      "Topical GHK-Cu has the strongest human clinical evidence among cosmetic peptides",
      "Wound healing evidence spans in vitro, animal, and human clinical studies",
      "Systemic (injectable) use lacks human RCT data — extrapolated from topical and in vitro findings",
      "Safety profile is favorable given copper's status as an essential element at physiological doses",
    ],
    body: [
      {
        paragraphs: [
          "GHK-Cu (copper peptide GHK; glycyl-L-histidyl-L-lysine copper complex) has been studied since the early 1970s, making it one of the oldest research subjects in the peptide field. It is found naturally in human plasma, saliva, and urine. Plasma levels decline significantly with age: from approximately 200 ng/mL at age 20 to roughly 80 ng/mL by age 60 — an age-related decline that generated early research interest in its potential role in the aging process.",
          "Search interest in GHK-Cu surged over 1,000% year-over-year in 2024-2025, driven partly by its association with the broader peptide longevity conversation following mainstream GLP-1 coverage. Unlike many trending peptides, GHK-Cu has genuine peer-reviewed evidence — particularly for topical applications.",
        ],
      },
      {
        heading: "Biological Activity: What We Know",
        paragraphs: [
          "GHK binds copper (Cu²⁺) to form the GHK-Cu complex. This copper-peptide complex has multiple characterized biological activities documented across in vitro, animal, and human studies:",
        ],
        listItems: [
          "Wound healing: Promotes wound healing by stimulating collagen synthesis, attracting immune cells (macrophages, mast cells), and promoting angiogenesis (new blood vessel formation)",
          "Collagen and ECM stimulation: In vitro studies consistently show GHK-Cu increases fibroblast production of collagen types I and III, elastin, decorin, and other extracellular matrix components",
          "Anti-inflammatory gene regulation: GHK-Cu modulates expression of hundreds of genes — downregulating pro-inflammatory cytokines (TNF-α, IL-6) and upregulating tissue repair genes",
          "Antioxidant activity: Demonstrated superoxide dismutase-like activity; upregulates antioxidant enzyme expression in cell studies",
          "Hair follicle stimulation: Some evidence for stimulation of follicular keratinocyte proliferation and hair follicle size",
        ],
      },
      {
        heading: "The Strongest Evidence: Topical Skin Care",
        paragraphs: [
          "The most robust human clinical data for GHK-Cu comes from topical cosmetic applications — a regulatory pathway that allows clinical studies without FDA drug approval requirements.",
          "A 2001 double-blind controlled study by Leyden et al. compared 1% GHK-Cu cream vs vehicle control and vs tretinoin (Retin-A) in women with mild-to-moderate photodamaged skin over 12 weeks. GHK-Cu showed statistically significant improvements in skin laxity, density, thickness, and fine lines — with better tolerability than tretinoin, which caused skin irritation in a significant proportion of participants.",
          "Additional clinical evidence supports topical GHK-Cu for reducing fine lines and wrinkles, improving skin density and firmness, and stimulating dermal collagen — making it one of the few cosmetic peptides with actual RCT-level evidence in humans.",
        ],
      },
      {
        heading: "Wound Healing Evidence",
        paragraphs: [
          "Beyond cosmetics, GHK-Cu has been studied in wound healing contexts. Animal studies show accelerated closure of full-thickness wounds, improved healing of burns, and enhanced bone and dental tissue repair. Some small human studies in chronic wound settings report beneficial effects, though larger RCTs are limited.",
          "The biological plausibility is strong: GHK-Cu promotes fibroblast migration and proliferation, stimulates collagen synthesis, and attracts key immune cells needed for the healing cascade. The copper component contributes to lysyl oxidase activity (needed for collagen cross-linking) and has intrinsic antimicrobial properties.",
        ],
      },
      {
        heading: "What the Evidence Does Not Show",
        paragraphs: [
          "It's important to be precise about evidence boundaries. Most mechanistic GHK-Cu research is in vitro or in animal models. The translation to systemic injectable use in humans is largely extrapolated — not established. There are no published RCTs of subcutaneous GHK-Cu injection for anti-aging, muscle recovery, or cognitive enhancement, despite these applications being discussed extensively online.",
          "The topical cosmetic evidence base is the highest-quality human data, and it is genuinely positive. Claims about systemic injectable effects should be evaluated as speculative until controlled human trial data exists.",
        ],
        callout:
          "The distinction between topical cosmetic evidence (solid) and injectable systemic evidence (absent in RCTs) is critical. GHK-Cu has better evidence for skin aging than most cosmetic ingredients — but the injectable longevity claims are not established in controlled human studies.",
      },
      {
        heading: "Safety Considerations",
        paragraphs: [
          "Copper is an essential trace element with well-characterized human biology. The recommended daily intake for adults is 0.9 mg/day; the tolerable upper limit is 10 mg/day. At typical cosmetic application amounts, copper exposure from GHK-Cu products is well within physiological ranges.",
          "For injectable use, copper accumulation at excessive doses could theoretically be a concern, but the doses used in research peptide contexts are generally far below toxic thresholds. Topically, GHK-Cu is well-tolerated with no significant irritation at concentrations up to 1-2% in clinical studies.",
        ],
      },
      {
        heading: "Why the Research Interest Continues",
        paragraphs: [
          "GHK-Cu's sustained scientific interest reflects several factors: it is naturally occurring and endogenous, has a well-characterized decline with aging, has genuine in vitro and clinical evidence, and the copper-binding mechanism provides plausible biological rationale. The compound also activates genes involved in tissue remodeling, neurotrophin synthesis, and antioxidant defense — making it a candidate for a range of applications that are still under active investigation.",
        ],
      },
    ],
    refs: [
      { title: "Pickart L, Margolina A. Regenerative and Protective Actions of the GHK-Cu Peptide. Int J Mol Sci 2018." },
      { title: "Leyden JJ et al. Treatment of photodamaged facial skin with a GHK-copper peptide. Cosmetics 2001." },
      { title: "Finkley MB et al. Stimulation of elastin expression by copper peptides. Skin Pharmacol 2007." },
      { title: "Pickart L. The biological effects of copper chelated to histidyl-lysine glycyl (Gly-His-Lys). Agents Actions 1980.", note: "Original GHK-Cu characterization" },
    ],
  },

  {
    slug: "peptide-quality-coa-verification",
    title: "How to Evaluate Peptide Quality: A Complete Guide to COA Testing",
    excerpt:
      "A peptide at 70% purity is not '30% less effective' — the unknown fraction may include toxic impurities, endotoxins, or wrong sequences. Here's how to read a Certificate of Analysis and verify what you're actually getting.",
    publishedAt: "2026-01-28",
    readingTime: 7,
    category: "Practical Guide",
    keyTakeaways: [
      "A legitimate COA must include HPLC purity ≥98%, mass spectrometry confirmation, and endotoxin testing",
      "Endotoxin contamination causes fever and inflammation — the clinical sign after injection is often the peptide being blamed",
      "Third-party testing provides meaningful quality verification; self-issued COAs do not",
      "Mass spectrometry confirms compound identity; HPLC measures purity — both are required",
      "No lot number on a COA is a serious red flag — it may be a template, not batch-specific",
    ],
    body: [
      {
        paragraphs: [
          "Peptide purity is not a minor technical detail — it is a safety issue. A peptide supplied at 70% purity does not simply deliver 70% of the expected effect. The 30% unknown fraction may include truncated sequences, related synthesis byproducts, residual solvents, heavy metal catalysts, or endotoxins from the manufacturing environment. Understanding how to read a Certificate of Analysis (COA) is prerequisite knowledge for anyone working with research peptides.",
        ],
      },
      {
        heading: "What a Legitimate COA Includes",
        paragraphs: ["A legitimate COA from a qualified peptide manufacturer should contain:"],
        listItems: [
          "Compound identity — peptide name, sequence, molecular formula, and molecular weight",
          "Lot/batch number — traceable to the specific manufacturing batch you received",
          "Purity by HPLC — percentage of target peptide in the total sample by peak area",
          "Mass spectrometry (MS) data — confirming the molecular weight matches the expected compound",
          "Appearance — physical description (typically white to off-white lyophilized powder)",
          "Water content — Karl Fischer titration result (important for accurate dosing calculations)",
          "Endotoxin testing — result in Endotoxin Units per milligram (EU/mg)",
          "Test date — COAs should reflect recent batch testing, not archived documents",
        ],
      },
      {
        heading: "Understanding HPLC Purity",
        paragraphs: [
          "High-Performance Liquid Chromatography (HPLC) separates compounds by their differential interaction with a stationary phase under pressure. For peptides, reverse-phase HPLC using a C18 column is standard. The chromatogram displays peaks corresponding to different compounds in the sample.",
          "The purity percentage is calculated from the target peptide's peak area relative to the sum of all peak areas. A reputable research peptide should demonstrate ≥98% purity by HPLC. Some suppliers accept ≥95%, but 98%+ should be the expectation for quality work.",
          "What HPLC cannot tell you: the identity of the compound. Two different peptides with similar hydrophobicity can co-elute or appear at similar retention times. This is why mass spectrometry is required in addition to HPLC.",
        ],
      },
      {
        heading: "Mass Spectrometry: Confirming Identity",
        paragraphs: [
          "Electrospray ionization mass spectrometry (ESI-MS) is used to confirm peptide identity by measuring molecular weight. The expected molecular weight for any peptide sequence can be calculated from its constituent amino acids using freely available online tools.",
          "For example, BPC-157 (sequence: GEPPPGKPADDAGLV) has a monoisotopic molecular weight of approximately 1419.7 Da. A COA showing [M+H]+ = 1420.7 (± 0.5 Da for instrument tolerance) confirms the correct compound was synthesized.",
          "Longer peptides (>10 amino acids) typically form multiply charged ions in ESI-MS. A result showing [M+2H]²+ = 710.4 for BPC-157 is equally valid — divide by charge state and add H to calculate molecular weight.",
        ],
      },
      {
        heading: "Endotoxin Testing: The Safety-Critical Test",
        paragraphs: [
          "Endotoxins (lipopolysaccharides from gram-negative bacteria) are produced during the manufacturing environment and can contaminate peptide preparations. Endotoxin exposure causes fever, chills, inflammation, and at high doses can trigger septic shock.",
        ],
        callout:
          "Many reported 'side effects' following peptide injection — particularly fever, malaise, and injection-site inflammation — are caused by endotoxin contamination, not by the peptide itself. A clean peptide with proper endotoxin testing would not produce these symptoms.",
      },
      {
        paragraphs: [
          "Acceptable endotoxin limits depend on use:",
        ],
        listItems: [
          "Research chemical grade (typical standard): ≤5 EU/mg",
          "Clinical/pharmaceutical injectable grade: ≤0.5 EU/mg",
          "No endotoxin test on a COA is unacceptable for any injectable application",
        ],
      },
      {
        paragraphs: [
          "Testing methods include the LAL (Limulus Amebocyte Lysate) assay (the gold standard, derived from horseshoe crab blood) and the rFC (recombinant Factor C) assay, a newer synthetic alternative. Both are reliable when performed by a qualified laboratory.",
        ],
      },
      {
        heading: "Red Flags in COAs",
        listItems: [
          "Purity below 95% — should not be used; unknown impurity profile",
          "No mass spectrometry — cannot confirm compound identity without MS",
          "Missing endotoxin test — critical safety gap for any injectable use",
          "No lot number — the COA may be a generic template not tied to your specific batch",
          "COA issued by the same company selling the peptide — lacks independence",
          "No test date or outdated test date (>18 months) — batch stability not confirmed",
          "Improbably round numbers (exactly 99.0% purity) — may indicate fabricated data",
        ],
      },
      {
        heading: "Third-Party Testing",
        paragraphs: [
          "The most meaningful quality assurance is independent third-party testing by an analytical laboratory with no commercial relationship with the supplier. Several analytical chemistry laboratories offer HPLC + MS testing for peptides; some cater specifically to research peptide customers.",
          "Third-party testing costs approximately $100-300 per sample and can identify purity shortfalls, wrong sequences, and endotoxin issues before use. Some peptide research communities organize group testing batches to share costs.",
          "Comparing your independently obtained results to the supplier's COA reveals whether the documentation reflects the actual product.",
        ],
      },
    ],
    refs: [
      { title: "USP <1> Injections — Endotoxin requirements for parenteral preparations", note: "United States Pharmacopeia standards" },
      { title: "ICH Q6B — Specifications: Test Procedures and Acceptance Criteria for Biotechnological Products", note: "International regulatory guidance" },
      { title: "Vlieghe P et al. Synthetic therapeutic peptides: science and market. Drug Discov Today 2010.", pmid: "19879957" },
    ],
  },

  {
    slug: "peptide-storage-reconstitution-guide",
    title: "Peptide Storage and Reconstitution: A Data-Driven Guide to Preserving Potency",
    excerpt:
      "Improper storage is one of the most common causes of peptide degradation. Lyophilized and reconstituted peptides have very different storage requirements. Here's the complete guide to temperature, solvents, and shelf life.",
    publishedAt: "2026-01-15",
    readingTime: 6,
    category: "Practical Guide",
    keyTakeaways: [
      "Lyophilized peptides should be stored at -20°C for long-term stability",
      "Reconstituted peptides must be refrigerated at 2-8°C and used within 30 days",
      "Bacteriostatic water extends reconstituted shelf life; sterile water is single-use only",
      "Never vortex or shake a peptide solution — gently swirl to dissolve",
      "Avoid repeated freeze-thaw cycles after reconstitution — aliquot before freezing",
    ],
    body: [
      {
        paragraphs: [
          "Unlike small-molecule drugs, peptides are inherently less chemically stable. The peptide backbone is susceptible to hydrolysis; amino acid side chains can oxidize, racemize, or aggregate depending on conditions. Understanding storage requirements is not optional — degraded peptides may be inactive, may have altered biological activity, or in worst cases may generate toxic degradation products.",
        ],
      },
      {
        heading: "Lyophilized vs. Reconstituted: Two Very Different Stability Profiles",
        paragraphs: [
          "Most research peptides are supplied as lyophilized (freeze-dried) powder. Lyophilization removes water and dramatically improves stability by eliminating the aqueous environment in which most degradation reactions occur.",
        ],
      },
      {
        heading: "Lyophilized Storage",
        listItems: [
          "Long-term (months to years): -20°C standard laboratory freezer; ideal for most peptides",
          "Short-term (<1 month, frequently accessed): refrigerator at 2-8°C is acceptable",
          "Room temperature: accelerates degradation; acceptable only for very short periods in dry conditions",
          "Light: protect from UV exposure — photo-oxidation of tryptophan, tyrosine, and methionine is common",
          "Humidity: silica desiccant packets are recommended for any ambient-temperature storage",
          "Lyophilized peptides are generally robust: brief temperature excursions during shipping (1-3 days) are unlikely to cause significant degradation for most stable sequences",
        ],
      },
      {
        heading: "Reconstituted Solution Storage",
        paragraphs: [
          "Once reconstituted, peptides are in an aqueous solution and degradation resumes. Storage requirements become much more demanding:",
        ],
        listItems: [
          "Temperature: refrigerator at 2-8°C is required — do not store at room temperature",
          "Duration: use within 30 days as a general rule; shorter for cysteine, methionine, or tryptophan-containing peptides",
          "Light: amber vials or foil wrap protect photosensitive peptides",
          "Freeze-thaw: avoid repeated cycles — each cycle risks protein aggregation and precipitation",
          "Aliquoting: if longer-term storage is needed, prepare single-use aliquots before initial freezing",
        ],
      },
      {
        heading: "Choosing the Right Reconstitution Solvent",
        paragraphs: ["The choice of solvent affects both stability and safety:"],
        listItems: [
          "Bacteriostatic water (0.9% benzyl alcohol): standard choice for multi-dose vials; benzyl alcohol inhibits microbial growth and extends shelf life (7-30+ days at refrigerator temperature); not suitable for patients with benzyl alcohol allergy",
          "Sterile water for injection: no preservative; single-use only (use within 24 hours); appropriate when benzyl alcohol sensitivity is a concern",
          "Sterile normal saline (0.9% NaCl): acceptable for some peptides; avoid for peptides with solubility issues in saline — check manufacturer guidance",
          "0.1-1% acetic acid (sterile): needed for peptides with limited water solubility, particularly some growth hormone releasing peptides and certain growth factors; adjust pH improves dissolution of basic peptides",
        ],
      },
      {
        callout:
          "Never use tap water, distilled water, or any non-sterile solvent for peptide reconstitution. Bacterial contamination of the reconstituted solution is a serious risk, particularly for injectable applications.",
      },
      {
        heading: "Reconstitution Technique",
        paragraphs: ["Proper technique minimizes degradation and contamination risk:"],
        listItems: [
          "Bring the vial to room temperature before opening to prevent condensation from introducing moisture",
          "Wipe the vial septum with an alcohol swab and allow to dry",
          "Inject solvent slowly down the inside wall of the vial — do not jet it directly onto the powder cake",
          "Gently swirl or rotate the vial — do not shake or vortex (mechanical stress promotes aggregation)",
          "Allow 5-10 minutes for full dissolution — some peptides dissolve slowly",
          "If bubbles form, allow them to settle before use",
          "Label reconstituted vials with the date",
        ],
      },
      {
        heading: "Calculating Concentration and Dosing",
        paragraphs: [
          "Accurate dosing depends on knowing the reconstituted concentration. Example for a 5 mg peptide vial:",
        ],
        listItems: [
          "Add 2.5 mL bacteriostatic water → 2 mg/mL = 2000 mcg/mL solution",
          "For a 500 mcg dose: draw 0.25 mL",
          "On a 100-unit (1 mL) insulin syringe where each unit = 0.01 mL: 500 mcg = 25 units",
          "Add 5 mL bacteriostatic water → 1 mg/mL = 1000 mcg/mL; 500 mcg dose = 0.5 mL = 50 units",
        ],
      },
      {
        heading: "Peptides Requiring Special Handling",
        paragraphs: [
          "Some peptides require specific attention due to susceptible residues:",
        ],
        listItems: [
          "Cysteine-containing peptides (TB-500/Thymosin Beta-4, PT-141): prone to disulfide bond formation and oxidation; use fresh, minimize air exposure",
          "Methionine-containing peptides: susceptible to oxidation; store under nitrogen or use antioxidant stabilizers if available",
          "Tryptophan-containing peptides: photosensitive; amber vials mandatory",
          "GLP-1 analogs (semaglutide, liraglutide): highly stable as pharmaceutical preparations; specific instructions from manufacturer apply",
        ],
      },
    ],
    refs: [
      { title: "Manning MC et al. Stability of protein pharmaceuticals: an update. Pharm Res 2010." },
      { title: "Wang W. Lyophilization and development of solid protein pharmaceuticals. Int J Pharm 2000." },
      { title: "USP <1> Injections and Implanted Drug Products — Storage and Preparation", note: "Pharmacopeial standards for injectable preparations" },
    ],
  },
  {
    slug: "fda-semaglutide-shortage-resolved-2025-compounding-enforcement",
    title: "FDA Semaglutide Shortage: Resolved in 2025 — What It Means for Compounded Versions",
    excerpt:
      "The FDA officially resolved the semaglutide drug shortage in early 2025, triggering a phased enforcement timeline that ended compounding pharmacy production of semaglutide copies. Here is the full regulatory timeline and what it means for patients.",
    publishedAt: "2026-01-15",
    readingTime: 7,
    category: "Regulatory",
    keyTakeaways: [
      "FDA removed semaglutide from the drug shortage list on February 21, 2025",
      "503A compounding pharmacies had a grace period ending May 22, 2025 to stop production",
      "503B outsourcing facilities had until March 19, 2025 to wind down",
      "Tirzepatide remains on the shortage list as of early 2026 and compounding continues",
      "Patients on compounded semaglutide should transition to branded Wegovy or Ozempic",
    ],
    body: [
      {
        paragraphs: [
          "In February 2025, the FDA formally declared the semaglutide drug shortage resolved — a decision that set off a cascading enforcement timeline affecting millions of patients who had been obtaining compounded semaglutide from pharmacies at a fraction of the branded drug cost.",
          "This article explains exactly what the FDA declared, the enforcement dates that followed, and the current regulatory status of compounded semaglutide entering 2026.",
        ],
      },
      {
        heading: "What Is a Drug Shortage and Why Did Semaglutide Qualify?",
        paragraphs: [
          "Under Section 506E of the Federal Food, Drug, and Cosmetic Act, the FDA maintains a drug shortage list when a medication is in 'inadequate supply.' From 2022 through early 2025, the explosive demand for semaglutide (Wegovy for weight loss, Ozempic for diabetes) far outpaced Novo Nordisk's manufacturing capacity.",
          "When a branded drug is in shortage, the FDA exercises enforcement discretion over compounding pharmacies — allowing 503A (retail) and 503B (outsourcing facility) pharmacies to produce copies even when those copies would ordinarily infringe the branded drug's regulatory protections.",
        ],
      },
      {
        heading: "The February 2025 Shortage Resolution",
        paragraphs: [
          "On February 21, 2025, the FDA updated its shortage database to reflect that semaglutide injection — including all doses of Wegovy (2.4 mg) and Ozempic — was no longer in shortage. Novo Nordisk had expanded manufacturing and supply chains had normalized.",
          "This single database update triggered a legally mandated enforcement clock.",
        ],
      },
      {
        heading: "The Enforcement Timeline",
        listItems: [
          "February 21, 2025: FDA removes semaglutide from the shortage list",
          "March 19, 2025: 503B outsourcing facilities must cease producing bulk compounded semaglutide",
          "May 22, 2025: 503A retail compounding pharmacies must cease producing patient-specific compounded semaglutide",
          "After May 22, 2025: FDA begins active enforcement — warning letters, injunctions, and seizures for non-compliant pharmacies",
        ],
      },
      {
        heading: "What Changed for Patients",
        paragraphs: [
          "Patients who had been paying $100–$300/month for compounded semaglutide faced an abrupt transition back to branded pricing — Wegovy lists at approximately $1,350/month without insurance. GoodRx and manufacturer savings programs (Novo Nordisk's NovoCare) provide some relief, but access gaps remain.",
          "Notably, the shortage resolution did not affect tirzepatide (Mounjaro, Zepbound). As of early 2026, tirzepatide remains on the FDA shortage list, meaning compounded tirzepatide continues to be available from 503A and 503B pharmacies in the near term.",
        ],
      },
      {
        heading: "Legal Challenges and Current Status",
        paragraphs: [
          "Multiple compounding pharmacy trade groups filed legal challenges to the FDA's shortage determination, arguing the supply data was incomplete. As of mid-2025, courts had not issued injunctions blocking enforcement. FDA warning letters to non-compliant pharmacies began arriving in June 2025.",
          "Patients seeking lower-cost options should consult their prescribers about manufacturer programs, insurance coverage appeals, or tirzepatide as an alternative (which remains compoundable while the shortage persists).",
        ],
        callout: "The shortage resolution only affects semaglutide. Tirzepatide compounding remains legal while that shortage persists.",
      },
    ],
    refs: [
      { title: "FDA Drug Shortage Database — Semaglutide Injection", note: "FDA removed semaglutide from shortage list February 21, 2025" },
      { title: "FDA Guidance: Compounding of Drugs on the Drug Shortage List (Section 503A)", note: "FD&C Act Section 503A enforcement framework" },
      { title: "FDA Guidance: Compounding of Drugs on the Drug Shortage List (Section 503B)", note: "FD&C Act Section 503B outsourcing facility framework" },
      { title: "Novo Nordisk Annual Report 2024 — Supply Chain", note: "Novo Nordisk manufacturing capacity expansion data" },
    ],
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
