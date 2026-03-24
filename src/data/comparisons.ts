export interface ComparisonDimension {
  name: string;
  peptideAValue: string;
  peptideBValue: string;
  winner: "a" | "b" | "tie" | null;
}

export interface Comparison {
  slug: string;
  peptideA: string;
  peptideAName: string;
  peptideB: string;
  peptideBName: string;
  summary: string;
  dimensions: ComparisonDimension[];
}

export const comparisons: Comparison[] = [
  // ─── Within Healing & Recovery ────────────────────────────────────────
  {
    slug: "bpc-157-vs-tb-500",
    peptideA: "bpc-157",
    peptideAName: "BPC-157",
    peptideB: "tb-500",
    peptideBName: "TB-500",
    summary:
      "BPC-157 and TB-500 are both popular research peptides for tissue repair, but they work through different mechanisms. BPC-157 is a gastric pentadecapeptide that promotes angiogenesis and tendon healing, while TB-500 (Thymosin Beta-4) upregulates actin and promotes cell migration. They are often stacked together in research protocols.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Extensive animal studies, no human RCTs", peptideBValue: "Animal studies plus limited human data", winner: "b" },
      { name: "FDA Status", peptideAValue: "Not approved; research only", peptideBValue: "Not approved; research only", winner: "tie" },
      { name: "Mechanism", peptideAValue: "Promotes angiogenesis, modulates NO and growth factors", peptideBValue: "Upregulates actin, promotes cell migration and differentiation", winner: null },
      { name: "Primary Use", peptideAValue: "Tendon, ligament, and gut healing", peptideBValue: "Muscle and soft tissue repair, flexibility", winner: null },
      { name: "Side Effects", peptideAValue: "Generally well-tolerated in studies; minimal reported", peptideBValue: "Head rush, temporary lethargy reported anecdotally", winner: "a" },
      { name: "Ease of Use", peptideAValue: "Subcutaneous or oral (stable in acid)", peptideBValue: "Subcutaneous injection only", winner: "a" },
      { name: "Cost", peptideAValue: "Moderate", peptideBValue: "Moderate to high", winner: "a" },
    ],
  },
  {
    slug: "bpc-157-vs-ghk-cu",
    peptideA: "bpc-157",
    peptideAName: "BPC-157",
    peptideB: "ghk-cu",
    peptideBName: "GHK-Cu",
    summary:
      "BPC-157 focuses on deep tissue and organ healing through angiogenesis and growth factor modulation, while GHK-Cu is a copper-binding tripeptide primarily researched for skin remodeling and wound healing. GHK-Cu has the advantage of topical application and a longer history in cosmetic science.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Extensive animal studies across multiple tissue types", peptideBValue: "Human and animal studies, especially in dermatology", winner: "b" },
      { name: "FDA Status", peptideAValue: "Not approved", peptideBValue: "Not approved as drug; used in cosmetics", winner: "b" },
      { name: "Mechanism", peptideAValue: "Angiogenesis, NO pathway, growth factor modulation", peptideBValue: "Copper delivery, collagen/glycosaminoglycan synthesis, antioxidant gene activation", winner: null },
      { name: "Primary Use", peptideAValue: "Internal tissue repair (gut, tendon, ligament)", peptideBValue: "Skin regeneration, wound healing, hair growth", winner: null },
      { name: "Side Effects", peptideAValue: "Minimal reported in animal studies", peptideBValue: "Very low; mild skin irritation with topical use", winner: "tie" },
      { name: "Ease of Use", peptideAValue: "Injection or oral", peptideBValue: "Topical, injection, or microneedling", winner: "b" },
    ],
  },
  {
    slug: "tb-500-vs-ghk-cu",
    peptideA: "tb-500",
    peptideAName: "TB-500",
    peptideB: "ghk-cu",
    peptideBName: "GHK-Cu",
    summary:
      "TB-500 promotes systemic tissue repair through actin upregulation and cell migration, while GHK-Cu is a short copper peptide primarily used for skin and surface wound healing. TB-500 is favored for deeper musculoskeletal injuries, while GHK-Cu excels in dermal applications.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Animal studies, limited human data", peptideBValue: "Human dermatology studies, well-characterized biochemistry", winner: "b" },
      { name: "FDA Status", peptideAValue: "Not approved", peptideBValue: "Not approved as drug; in cosmetic products", winner: "b" },
      { name: "Mechanism", peptideAValue: "Actin upregulation, cell migration promotion", peptideBValue: "Copper transport, collagen synthesis, gene modulation", winner: null },
      { name: "Primary Use", peptideAValue: "Muscle, tendon, and cardiac tissue repair", peptideBValue: "Skin repair, anti-aging, hair regrowth", winner: null },
      { name: "Side Effects", peptideAValue: "Head rush, lethargy reported anecdotally", peptideBValue: "Minimal; possible mild irritation topically", winner: "b" },
      { name: "Ease of Use", peptideAValue: "Subcutaneous injection", peptideBValue: "Topical cream, serum, or injection", winner: "b" },
      { name: "Cost", peptideAValue: "Moderate to high", peptideBValue: "Low to moderate (topical widely available)", winner: "b" },
    ],
  },

  // ─── Within Growth Hormone Secretagogues ──────────────────────────────
  {
    slug: "ipamorelin-vs-cjc-1295",
    peptideA: "ipamorelin",
    peptideAName: "Ipamorelin",
    peptideB: "cjc-1295",
    peptideBName: "CJC-1295",
    summary:
      "Ipamorelin is a selective ghrelin mimetic (GHRP) that triggers GH pulses, while CJC-1295 is a GHRH analog that amplifies GH release duration. They are commonly combined because their mechanisms are synergistic — CJC-1295 raises the baseline and Ipamorelin sharpens the pulse.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Phase II clinical trials completed", peptideBValue: "Phase II clinical trials, published pharmacokinetics", winner: "tie" },
      { name: "FDA Status", peptideAValue: "Not approved", peptideBValue: "Not approved", winner: "tie" },
      { name: "Mechanism", peptideAValue: "Ghrelin receptor agonist (GHS-R1a)", peptideBValue: "GHRH receptor agonist with DAC for extended half-life", winner: null },
      { name: "Primary Use", peptideAValue: "Pulsatile GH release, body composition", peptideBValue: "Sustained GH elevation, IGF-1 increase", winner: null },
      { name: "Side Effects", peptideAValue: "Very clean; minimal cortisol/prolactin impact", peptideBValue: "Injection site reactions, water retention, flushing", winner: "a" },
      { name: "Ease of Use", peptideAValue: "Subcutaneous injection 1-3x daily", peptideBValue: "Subcutaneous injection 1-2x weekly (DAC) or daily (no DAC)", winner: "b" },
      { name: "GH Pulse Profile", peptideAValue: "Sharp, physiological pulses", peptideBValue: "Sustained elevation over hours/days", winner: null },
    ],
  },
  {
    slug: "ipamorelin-vs-ghrp-2",
    peptideA: "ipamorelin",
    peptideAName: "Ipamorelin",
    peptideB: "ghrp-2",
    peptideBName: "GHRP-2",
    summary:
      "Both are ghrelin mimetics that stimulate GH release, but GHRP-2 is more potent at the cost of greater side effects. Ipamorelin is considered the cleanest GHRP with virtually no impact on cortisol or prolactin, while GHRP-2 causes stronger GH release but also increases appetite and cortisol.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Phase II trials", peptideBValue: "Extensive clinical studies, well-characterized", winner: "b" },
      { name: "FDA Status", peptideAValue: "Not approved", peptideBValue: "Not approved", winner: "tie" },
      { name: "GH Release Potency", peptideAValue: "Moderate, selective GH release", peptideBValue: "Strong GH release, one of the most potent GHRPs", winner: "b" },
      { name: "Side Effects", peptideAValue: "Minimal; no cortisol or prolactin increase", peptideBValue: "Increases cortisol, prolactin, and appetite", winner: "a" },
      { name: "Appetite Stimulation", peptideAValue: "None to minimal", peptideBValue: "Significant hunger increase", winner: null },
      { name: "Mechanism", peptideAValue: "Selective ghrelin receptor agonist", peptideBValue: "Non-selective ghrelin receptor agonist", winner: null },
      { name: "Cost", peptideAValue: "Moderate", peptideBValue: "Low to moderate", winner: "b" },
    ],
  },
  {
    slug: "ipamorelin-vs-ghrp-6",
    peptideA: "ipamorelin",
    peptideAName: "Ipamorelin",
    peptideB: "ghrp-6",
    peptideBName: "GHRP-6",
    summary:
      "Ipamorelin offers clean, selective GH release without hunger or cortisol spikes, while GHRP-6 is known for causing intense hunger due to strong ghrelin activity. GHRP-6 was one of the earliest GHRPs studied and remains popular for those who want appetite stimulation alongside GH release.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Phase II trials", peptideBValue: "Extensive preclinical and clinical research", winner: "b" },
      { name: "FDA Status", peptideAValue: "Not approved", peptideBValue: "Not approved", winner: "tie" },
      { name: "GH Release Potency", peptideAValue: "Moderate", peptideBValue: "Moderate to strong", winner: "b" },
      { name: "Side Effects", peptideAValue: "Minimal; very selective", peptideBValue: "Strong hunger, cortisol and prolactin increase, possible dizziness", winner: "a" },
      { name: "Appetite Stimulation", peptideAValue: "Negligible", peptideBValue: "Very strong (ghrelin-mediated)", winner: null },
      { name: "Mechanism", peptideAValue: "Selective GHS-R1a agonist", peptideBValue: "Non-selective GHS-R1a agonist with strong ghrelin mimetic activity", winner: null },
      { name: "Cost", peptideAValue: "Moderate", peptideBValue: "Low", winner: "b" },
    ],
  },
  {
    slug: "ipamorelin-vs-hexarelin",
    peptideA: "ipamorelin",
    peptideAName: "Ipamorelin",
    peptideB: "hexarelin",
    peptideBName: "Hexarelin",
    summary:
      "Hexarelin is the most potent GHRP available, producing the strongest GH release of any ghrelin mimetic, but at the cost of significant cortisol and prolactin elevation. Ipamorelin is preferred for long-term use due to its clean side-effect profile and lack of desensitization.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Phase II trials", peptideBValue: "Extensive clinical studies, cardioprotective data", winner: "b" },
      { name: "FDA Status", peptideAValue: "Not approved", peptideBValue: "Not approved", winner: "tie" },
      { name: "GH Release Potency", peptideAValue: "Moderate", peptideBValue: "Highest of all GHRPs", winner: "b" },
      { name: "Side Effects", peptideAValue: "Minimal cortisol/prolactin impact", peptideBValue: "Significant cortisol and prolactin elevation", winner: "a" },
      { name: "Desensitization Risk", peptideAValue: "Low; suitable for long-term use", peptideBValue: "High; rapid receptor desensitization with chronic use", winner: "a" },
      { name: "Unique Benefits", peptideAValue: "Clean GH pulse, good for stacking", peptideBValue: "Cardioprotective effects studied in heart failure patients", winner: null },
      { name: "Cost", peptideAValue: "Moderate", peptideBValue: "Moderate", winner: "tie" },
    ],
  },
  {
    slug: "ipamorelin-vs-sermorelin",
    peptideA: "ipamorelin",
    peptideAName: "Ipamorelin",
    peptideB: "sermorelin",
    peptideBName: "Sermorelin",
    summary:
      "Ipamorelin works on the ghrelin receptor while sermorelin works on the GHRH receptor — two different arms of GH release. Sermorelin has a longer clinical history and was previously FDA-approved for pediatric GH deficiency. Ipamorelin provides cleaner pulses while sermorelin mimics the body's natural GHRH signaling.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Phase II clinical trials", peptideBValue: "Formerly FDA-approved; extensive clinical history", winner: "b" },
      { name: "FDA Status", peptideAValue: "Not approved", peptideBValue: "Previously FDA-approved (withdrawn for commercial reasons, not safety)", winner: "b" },
      { name: "Mechanism", peptideAValue: "Ghrelin receptor (GHS-R1a) agonist", peptideBValue: "GHRH receptor agonist (mimics natural GHRH)", winner: null },
      { name: "Side Effects", peptideAValue: "Minimal", peptideBValue: "Injection site pain, facial flushing, headache", winner: "a" },
      { name: "Half-Life", peptideAValue: "~2 hours", peptideBValue: "~10-20 minutes (very short)", winner: "a" },
      { name: "Primary Use", peptideAValue: "Body composition, anti-aging", peptideBValue: "GH deficiency, anti-aging", winner: null },
    ],
  },
  {
    slug: "cjc-1295-vs-sermorelin",
    peptideA: "cjc-1295",
    peptideAName: "CJC-1295",
    peptideB: "sermorelin",
    peptideBName: "Sermorelin",
    summary:
      "Both are GHRH analogs but CJC-1295 was engineered for a dramatically longer half-life. Sermorelin has a 10-20 minute half-life requiring daily injections, while CJC-1295 with DAC lasts days. Sermorelin has the advantage of former FDA approval and a longer safety track record.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Phase II trials, published PK data", peptideBValue: "Formerly FDA-approved; decades of clinical use", winner: "b" },
      { name: "FDA Status", peptideAValue: "Not approved", peptideBValue: "Previously FDA-approved", winner: "b" },
      { name: "Mechanism", peptideAValue: "Modified GHRH(1-29) with Drug Affinity Complex", peptideBValue: "GHRH(1-29) analog, natural sequence", winner: null },
      { name: "Half-Life", peptideAValue: "~6-8 days (with DAC)", peptideBValue: "~10-20 minutes", winner: "a" },
      { name: "Dosing Frequency", peptideAValue: "1-2x per week (DAC version)", peptideBValue: "Daily injections required", winner: "a" },
      { name: "Side Effects", peptideAValue: "Injection site reactions, water retention", peptideBValue: "Facial flushing, headache, injection pain", winner: "tie" },
      { name: "GH Release Pattern", peptideAValue: "Sustained elevation (less physiological)", peptideBValue: "Pulsatile, mimics natural rhythm", winner: "b" },
    ],
  },
  {
    slug: "cjc-1295-vs-tesamorelin",
    peptideA: "cjc-1295",
    peptideAName: "CJC-1295",
    peptideB: "tesamorelin",
    peptideBName: "Tesamorelin",
    summary:
      "CJC-1295 and tesamorelin are both GHRH analogs but tesamorelin is the only one that is FDA-approved (for HIV-associated lipodystrophy). Tesamorelin has robust clinical trial data showing visceral fat reduction, while CJC-1295 offers convenience with its extended half-life.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Phase II trials", peptideBValue: "Phase III trials, FDA-approved", winner: "b" },
      { name: "FDA Status", peptideAValue: "Not approved", peptideBValue: "FDA-approved (Egrifta) for HIV lipodystrophy", winner: "b" },
      { name: "Mechanism", peptideAValue: "Modified GHRH with DAC for extended action", peptideBValue: "GHRH analog (trans-3-hexenoic acid modification)", winner: null },
      { name: "Primary Use", peptideAValue: "GH optimization, anti-aging, body composition", peptideBValue: "Visceral fat reduction in HIV lipodystrophy", winner: null },
      { name: "Half-Life", peptideAValue: "~6-8 days (DAC)", peptideBValue: "~26-38 minutes", winner: "a" },
      { name: "Side Effects", peptideAValue: "Injection site reactions, water retention", peptideBValue: "Injection site reactions, arthralgia, peripheral edema", winner: "tie" },
      { name: "Cost", peptideAValue: "Moderate (research peptide pricing)", peptideBValue: "Very high (branded pharmaceutical)", winner: "a" },
    ],
  },
  {
    slug: "ghrp-2-vs-ghrp-6",
    peptideA: "ghrp-2",
    peptideAName: "GHRP-2",
    peptideB: "ghrp-6",
    peptideBName: "GHRP-6",
    summary:
      "GHRP-2 and GHRP-6 are closely related ghrelin mimetics. GHRP-2 is more potent for GH release and causes less hunger, while GHRP-6 is known for its intense appetite stimulation. Both raise cortisol and prolactin, but GHRP-6 does so to a lesser degree than GHRP-2.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Extensive clinical research", peptideBValue: "Extensive clinical research", winner: "tie" },
      { name: "FDA Status", peptideAValue: "Not approved", peptideBValue: "Not approved", winner: "tie" },
      { name: "GH Release Potency", peptideAValue: "Higher GH output per dose", peptideBValue: "Moderate GH output", winner: "a" },
      { name: "Appetite Stimulation", peptideAValue: "Moderate hunger increase", peptideBValue: "Very strong hunger increase", winner: null },
      { name: "Cortisol/Prolactin Impact", peptideAValue: "Moderate increase in both", peptideBValue: "Mild to moderate increase", winner: "b" },
      { name: "Mechanism", peptideAValue: "Non-selective GHS-R1a agonist", peptideBValue: "Non-selective GHS-R1a agonist, stronger ghrelin mimetic", winner: null },
      { name: "Cost", peptideAValue: "Low to moderate", peptideBValue: "Low", winner: "b" },
    ],
  },
  {
    slug: "ghrp-2-vs-hexarelin",
    peptideA: "ghrp-2",
    peptideAName: "GHRP-2",
    peptideB: "hexarelin",
    peptideBName: "Hexarelin",
    summary:
      "Both are potent GHRPs, with hexarelin producing the highest GH release of any peptide in this class. However, hexarelin causes rapid receptor desensitization, making it unsuitable for long-term use. GHRP-2 offers strong GH release with better sustainability over time.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Extensive clinical data", peptideBValue: "Extensive clinical data, cardioprotective studies", winner: "tie" },
      { name: "FDA Status", peptideAValue: "Not approved", peptideBValue: "Not approved", winner: "tie" },
      { name: "GH Release Potency", peptideAValue: "Strong", peptideBValue: "Strongest of all GHRPs", winner: "b" },
      { name: "Desensitization Risk", peptideAValue: "Moderate; sustainable with cycling", peptideBValue: "High; significant desensitization within weeks", winner: "a" },
      { name: "Cortisol/Prolactin Impact", peptideAValue: "Moderate elevation", peptideBValue: "Significant elevation of both", winner: "a" },
      { name: "Unique Benefits", peptideAValue: "Balanced potency and tolerability", peptideBValue: "Cardioprotective effects, studied in heart failure", winner: null },
      { name: "Long-Term Viability", peptideAValue: "Suitable with cycling protocols", peptideBValue: "Best used short-term or intermittently", winner: "a" },
    ],
  },
  {
    slug: "ghrp-6-vs-hexarelin",
    peptideA: "ghrp-6",
    peptideAName: "GHRP-6",
    peptideB: "hexarelin",
    peptideBName: "Hexarelin",
    summary:
      "GHRP-6 and hexarelin are both ghrelin mimetics but hexarelin is substantially more potent. GHRP-6 is characterized by intense hunger stimulation, while hexarelin is notable for its cardioprotective properties. Hexarelin desensitizes quickly, while GHRP-6 can be used more sustainably.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Extensive preclinical and clinical data", peptideBValue: "Extensive data including cardiac studies", winner: "tie" },
      { name: "FDA Status", peptideAValue: "Not approved", peptideBValue: "Not approved", winner: "tie" },
      { name: "GH Release Potency", peptideAValue: "Moderate", peptideBValue: "Very high; strongest GHRP", winner: "b" },
      { name: "Appetite Stimulation", peptideAValue: "Intense hunger (strong ghrelin effect)", peptideBValue: "Moderate hunger", winner: null },
      { name: "Desensitization Risk", peptideAValue: "Low to moderate", peptideBValue: "High; rapid tachyphylaxis", winner: "a" },
      { name: "Side Effects", peptideAValue: "Hunger, mild cortisol/prolactin rise", peptideBValue: "Cortisol, prolactin elevation, water retention", winner: "a" },
      { name: "Unique Benefits", peptideAValue: "Useful for underweight individuals needing appetite", peptideBValue: "Studied for cardioprotection in heart failure", winner: null },
    ],
  },
  {
    slug: "sermorelin-vs-tesamorelin",
    peptideA: "sermorelin",
    peptideAName: "Sermorelin",
    peptideB: "tesamorelin",
    peptideBName: "Tesamorelin",
    summary:
      "Both are GHRH analogs but tesamorelin is FDA-approved and has Phase III data for visceral fat reduction. Sermorelin was previously FDA-approved for pediatric use and is widely prescribed off-label in anti-aging clinics. Tesamorelin is more potent but substantially more expensive.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Formerly FDA-approved; extensive clinical use", peptideBValue: "Phase III trials; currently FDA-approved", winner: "b" },
      { name: "FDA Status", peptideAValue: "Previously approved (withdrawn commercially)", peptideBValue: "Currently FDA-approved (Egrifta)", winner: "b" },
      { name: "Mechanism", peptideAValue: "GHRH(1-29) analog", peptideBValue: "Modified GHRH analog with enhanced potency", winner: null },
      { name: "Primary Use", peptideAValue: "GH deficiency, anti-aging", peptideBValue: "HIV lipodystrophy, visceral fat reduction", winner: null },
      { name: "Half-Life", peptideAValue: "~10-20 minutes", peptideBValue: "~26-38 minutes", winner: "b" },
      { name: "Side Effects", peptideAValue: "Flushing, headache, injection pain", peptideBValue: "Arthralgia, injection site reactions, edema", winner: "tie" },
      { name: "Cost", peptideAValue: "Low to moderate (widely compounded)", peptideBValue: "Very high (brand-name pharmaceutical)", winner: "a" },
    ],
  },

  // ─── Within Weight Loss ───────────────────────────────────────────────
  {
    slug: "semaglutide-vs-tirzepatide",
    peptideA: "semaglutide",
    peptideAName: "Semaglutide",
    peptideB: "tirzepatide",
    peptideBName: "Tirzepatide",
    summary:
      "Both are FDA-approved for type 2 diabetes and obesity. Semaglutide (Ozempic/Wegovy) is a GLP-1 receptor agonist, while tirzepatide (Mounjaro/Zepbound) is a dual GIP/GLP-1 agonist. Clinical trials show tirzepatide achieves greater weight loss on average, but both are considered breakthrough therapies.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Phase III (STEP trials); extensive real-world data", peptideBValue: "Phase III (SURMOUNT/SURPASS trials); newer but robust", winner: "a" },
      { name: "FDA Status", peptideAValue: "FDA-approved for T2D (Ozempic) and obesity (Wegovy)", peptideBValue: "FDA-approved for T2D (Mounjaro) and obesity (Zepbound)", winner: "tie" },
      { name: "Mechanism", peptideAValue: "GLP-1 receptor agonist", peptideBValue: "Dual GIP and GLP-1 receptor agonist", winner: null },
      { name: "Weight Loss Efficacy", peptideAValue: "~15-17% body weight loss in trials", peptideBValue: "~20-22.5% body weight loss in trials", winner: "b" },
      { name: "Side Effects", peptideAValue: "Nausea, vomiting, diarrhea, pancreatitis risk", peptideBValue: "Nausea, vomiting, diarrhea (similar GI profile)", winner: "tie" },
      { name: "Dosing", peptideAValue: "Weekly subcutaneous injection", peptideBValue: "Weekly subcutaneous injection", winner: "tie" },
      { name: "Cost", peptideAValue: "~$1,000-1,300/month (brand)", peptideBValue: "~$1,000-1,200/month (brand)", winner: "tie" },
    ],
  },
  {
    slug: "semaglutide-vs-aod-9604",
    peptideA: "semaglutide",
    peptideAName: "Semaglutide",
    peptideB: "aod-9604",
    peptideBName: "AOD-9604",
    summary:
      "Semaglutide is an FDA-approved blockbuster for obesity with robust clinical evidence, while AOD-9604 is a fragment of human growth hormone (hGH 177-191) with limited and disappointing clinical trial results. AOD-9604 failed to outperform placebo in Phase IIb/III obesity trials.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Phase III trials, FDA-approved, extensive real-world data", peptideBValue: "Failed Phase IIb/III trials for obesity", winner: "a" },
      { name: "FDA Status", peptideAValue: "FDA-approved for obesity and T2D", peptideBValue: "Not approved; GRAS status for food use only in Australia", winner: "a" },
      { name: "Mechanism", peptideAValue: "GLP-1 receptor agonist, appetite suppression, gastric slowing", peptideBValue: "hGH fragment stimulating lipolysis without IGF-1 increase", winner: null },
      { name: "Weight Loss Efficacy", peptideAValue: "15-17% in clinical trials", peptideBValue: "No significant difference from placebo in Phase III", winner: "a" },
      { name: "Side Effects", peptideAValue: "GI side effects, potential thyroid concerns", peptideBValue: "Minimal reported side effects", winner: "b" },
      { name: "Cost", peptideAValue: "Very high (branded pharmaceutical)", peptideBValue: "Low to moderate (research peptide)", winner: "b" },
    ],
  },
  {
    slug: "tirzepatide-vs-aod-9604",
    peptideA: "tirzepatide",
    peptideAName: "Tirzepatide",
    peptideB: "aod-9604",
    peptideBName: "AOD-9604",
    summary:
      "Tirzepatide is one of the most effective weight loss drugs ever developed, with FDA approval and ~20%+ weight loss in trials. AOD-9604 is an hGH fragment that failed clinical trials for obesity. The evidence gap between these two is enormous.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Phase III trials, FDA-approved", peptideBValue: "Failed Phase IIb/III trials", winner: "a" },
      { name: "FDA Status", peptideAValue: "FDA-approved for T2D and obesity", peptideBValue: "Not approved for any indication", winner: "a" },
      { name: "Mechanism", peptideAValue: "Dual GIP/GLP-1 receptor agonist", peptideBValue: "hGH fragment (176-191) targeting fat metabolism", winner: null },
      { name: "Weight Loss Efficacy", peptideAValue: "~20-22.5% body weight loss", peptideBValue: "No significant efficacy demonstrated in trials", winner: "a" },
      { name: "Side Effects", peptideAValue: "GI effects (nausea, vomiting, diarrhea)", peptideBValue: "Minimal reported side effects", winner: "b" },
      { name: "Cost", peptideAValue: "Very high (branded pharmaceutical)", peptideBValue: "Low (research peptide pricing)", winner: "b" },
    ],
  },

  // ─── Within Sexual Health ─────────────────────────────────────────────
  {
    slug: "bremelanotide-vs-melanotan-ii",
    peptideA: "bremelanotide",
    peptideAName: "Bremelanotide",
    peptideB: "melanotan-ii",
    peptideBName: "Melanotan II",
    summary:
      "Bremelanotide (PT-141/Vyleesi) is FDA-approved for hypoactive sexual desire disorder in premenopausal women. Melanotan II is an unregulated research peptide that affects sexual function, tanning, and appetite through broad melanocortin receptor activation. Bremelanotide was derived from Melanotan II but is more selective.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Phase III trials, FDA-approved", peptideBValue: "Limited clinical data; mostly anecdotal", winner: "a" },
      { name: "FDA Status", peptideAValue: "FDA-approved (Vyleesi) for HSDD", peptideBValue: "Not approved; banned in several countries", winner: "a" },
      { name: "Mechanism", peptideAValue: "MC4R agonist (selective melanocortin)", peptideBValue: "Non-selective MC1R/MC3R/MC4R/MC5R agonist", winner: null },
      { name: "Side Effects", peptideAValue: "Nausea, flushing, headache; transient BP increase", peptideBValue: "Nausea, facial flushing, uncontrolled tanning, mole darkening, potential melanoma concern", winner: "a" },
      { name: "Primary Use", peptideAValue: "Female sexual desire (HSDD)", peptideBValue: "Tanning and sexual function (both sexes)", winner: null },
      { name: "Route of Administration", peptideAValue: "Subcutaneous auto-injector (on-demand)", peptideBValue: "Subcutaneous injection or nasal spray", winner: "a" },
      { name: "Safety Profile", peptideAValue: "Well-characterized; FDA-reviewed safety data", peptideBValue: "Poorly characterized; melanoma risk concerns", winner: "a" },
    ],
  },

  // ─── Cross-Category Comparisons ───────────────────────────────────────
  {
    slug: "bpc-157-vs-kpv",
    peptideA: "bpc-157",
    peptideAName: "BPC-157",
    peptideB: "kpv",
    peptideBName: "KPV",
    summary:
      "Both peptides have anti-inflammatory properties but through different mechanisms. BPC-157 promotes tissue healing via angiogenesis and growth factors, while KPV is a tripeptide (alpha-MSH fragment) that directly inhibits NF-kB inflammatory signaling. BPC-157 is better studied for structural repair; KPV targets inflammatory pathways more directly.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Extensive animal studies across many tissue types", peptideBValue: "In vitro and animal studies; limited in vivo data", winner: "a" },
      { name: "FDA Status", peptideAValue: "Not approved", peptideBValue: "Not approved", winner: "tie" },
      { name: "Mechanism", peptideAValue: "Angiogenesis, NO pathway, growth factor modulation", peptideBValue: "NF-kB inhibition, anti-inflammatory cytokine modulation", winner: null },
      { name: "Primary Use", peptideAValue: "Tissue repair, gut healing", peptideBValue: "Inflammatory conditions, IBD research, skin inflammation", winner: null },
      { name: "Side Effects", peptideAValue: "Minimal in animal studies", peptideBValue: "Minimal reported; very short peptide", winner: "tie" },
      { name: "Peptide Size", peptideAValue: "15 amino acids", peptideBValue: "3 amino acids (tripeptide)", winner: null },
    ],
  },
  {
    slug: "bpc-157-vs-ll-37",
    peptideA: "bpc-157",
    peptideAName: "BPC-157",
    peptideB: "ll-37",
    peptideBName: "LL-37",
    summary:
      "BPC-157 is primarily a healing peptide that promotes tissue repair, while LL-37 is a human cathelicidin antimicrobial peptide that serves as a first-line immune defense. LL-37 has direct antimicrobial activity against bacteria, fungi, and viruses, while BPC-157 focuses on structural tissue recovery.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Extensive animal studies", peptideBValue: "Human endogenous peptide, well-characterized; clinical studies ongoing", winner: "b" },
      { name: "FDA Status", peptideAValue: "Not approved", peptideBValue: "Not approved as therapeutic", winner: "tie" },
      { name: "Mechanism", peptideAValue: "Angiogenesis, growth factor modulation, NO pathway", peptideBValue: "Membrane disruption of pathogens, immune cell recruitment, wound healing", winner: null },
      { name: "Primary Use", peptideAValue: "Tissue repair: gut, tendon, ligament", peptideBValue: "Antimicrobial defense, biofilm disruption, wound healing", winner: null },
      { name: "Antimicrobial Activity", peptideAValue: "Not a primary mechanism", peptideBValue: "Broad-spectrum: antibacterial, antifungal, antiviral", winner: "b" },
      { name: "Side Effects", peptideAValue: "Minimal in animal studies", peptideBValue: "Potential cytotoxicity at high concentrations, injection site reactions", winner: "a" },
    ],
  },
  {
    slug: "tb-500-vs-ll-37",
    peptideA: "tb-500",
    peptideAName: "TB-500",
    peptideB: "ll-37",
    peptideBName: "LL-37",
    summary:
      "TB-500 and LL-37 both contribute to wound healing but through entirely different pathways. TB-500 promotes cell migration and tissue remodeling via actin regulation, while LL-37 fights infection at wound sites and recruits immune cells. They address complementary aspects of the healing process.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Animal studies, limited human data", peptideBValue: "Endogenous human peptide, well-characterized biology", winner: "b" },
      { name: "FDA Status", peptideAValue: "Not approved", peptideBValue: "Not approved as therapeutic", winner: "tie" },
      { name: "Mechanism", peptideAValue: "Actin sequestration, cell migration, angiogenesis", peptideBValue: "Antimicrobial membrane disruption, chemotaxis, immune modulation", winner: null },
      { name: "Primary Use", peptideAValue: "Soft tissue repair, muscle recovery", peptideBValue: "Infection prevention, biofilm disruption, immune support", winner: null },
      { name: "Wound Healing Role", peptideAValue: "Tissue remodeling and cell migration phase", peptideBValue: "Infection control and inflammatory phase", winner: null },
      { name: "Side Effects", peptideAValue: "Head rush, temporary lethargy", peptideBValue: "Potential cytotoxicity at high doses", winner: "tie" },
    ],
  },
  {
    slug: "selank-vs-semax",
    peptideA: "selank",
    peptideAName: "Selank",
    peptideB: "semax",
    peptideBName: "Semax",
    summary:
      "Selank and Semax are both Russian-developed regulatory peptides approved in Russia for clinical use. Selank is an anxiolytic based on tuftsin (an immune peptide), while Semax is a nootropic based on ACTH(4-10). Selank targets anxiety and stress; Semax targets cognition and neuroprotection.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Approved in Russia; multiple Russian clinical studies", peptideBValue: "Approved in Russia; extensive Russian clinical and preclinical data", winner: "tie" },
      { name: "FDA Status", peptideAValue: "Not approved in US/EU", peptideBValue: "Not approved in US/EU", winner: "tie" },
      { name: "Mechanism", peptideAValue: "GABA modulation, serotonin metabolism, immune modulation (tuftsin analog)", peptideBValue: "BDNF upregulation, dopamine/serotonin modulation (ACTH fragment)", winner: null },
      { name: "Primary Use", peptideAValue: "Anxiety, stress, immune support", peptideBValue: "Cognitive enhancement, stroke recovery, neuroprotection", winner: null },
      { name: "Side Effects", peptideAValue: "Very well-tolerated; mild fatigue possible", peptideBValue: "Well-tolerated; mild irritation with nasal use", winner: "tie" },
      { name: "Route of Administration", peptideAValue: "Intranasal drops", peptideBValue: "Intranasal drops", winner: "tie" },
      { name: "Onset", peptideAValue: "Anxiolytic effects within minutes to hours", peptideBValue: "Cognitive effects noticeable within hours", winner: "tie" },
    ],
  },
  {
    slug: "dsip-vs-selank",
    peptideA: "dsip",
    peptideAName: "DSIP",
    peptideB: "selank",
    peptideBName: "Selank",
    summary:
      "DSIP (Delta Sleep-Inducing Peptide) and Selank both address stress-related issues but from different angles. DSIP promotes delta-wave sleep and has been studied for insomnia, while Selank is an anxiolytic that reduces stress and anxiety. Both can indirectly improve sleep quality.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Mixed clinical results; some European studies", peptideBValue: "Approved in Russia; consistent clinical data", winner: "b" },
      { name: "FDA Status", peptideAValue: "Not approved", peptideBValue: "Not approved in US/EU; approved in Russia", winner: "b" },
      { name: "Mechanism", peptideAValue: "Modulates sleep architecture, cortisol, and LH release", peptideBValue: "GABA modulation, serotonin metabolism, tuftsin analog", winner: null },
      { name: "Primary Use", peptideAValue: "Sleep induction, insomnia, stress-related sleep issues", peptideBValue: "Anxiety reduction, stress management, immune support", winner: null },
      { name: "Side Effects", peptideAValue: "Generally well-tolerated; morning grogginess possible", peptideBValue: "Very well-tolerated; minimal reported", winner: "b" },
      { name: "Route of Administration", peptideAValue: "Intravenous, subcutaneous, or intranasal", peptideBValue: "Intranasal drops", winner: "b" },
    ],
  },
  {
    slug: "epithalon-vs-thymalin",
    peptideA: "epithalon",
    peptideAName: "Epithalon",
    peptideB: "thymalin",
    peptideBName: "Thymalin",
    summary:
      "Both are Russian-developed peptides studied for anti-aging. Epithalon (Epitalon) is a tetrapeptide that activates telomerase and is derived from epithalamin (pineal extract). Thymalin is a thymus-derived peptide that modulates immune function. Both were developed by Prof. Vladimir Khavinson.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Russian clinical studies; Khavinson's telomerase research", peptideBValue: "Russian clinical studies; decades of use in Russia", winner: "tie" },
      { name: "FDA Status", peptideAValue: "Not approved in US/EU", peptideBValue: "Not approved in US/EU; used clinically in Russia", winner: "b" },
      { name: "Mechanism", peptideAValue: "Telomerase activation, pineal gland melatonin regulation", peptideBValue: "Thymic immune modulation, T-cell maturation support", winner: null },
      { name: "Primary Use", peptideAValue: "Anti-aging, telomere lengthening, circadian rhythm", peptideBValue: "Immune restoration, particularly in aging or immunocompromised", winner: null },
      { name: "Side Effects", peptideAValue: "Minimal reported", peptideBValue: "Minimal reported", winner: "tie" },
      { name: "Anti-Aging Mechanism", peptideAValue: "Telomere maintenance (cellular aging)", peptideBValue: "Immune system rejuvenation (immunosenescence)", winner: null },
    ],
  },
  {
    slug: "semaglutide-vs-sermorelin",
    peptideA: "semaglutide",
    peptideAName: "Semaglutide",
    peptideB: "sermorelin",
    peptideBName: "Sermorelin",
    summary:
      "Semaglutide and sermorelin approach weight/body composition from entirely different angles. Semaglutide suppresses appetite via GLP-1 receptors and is FDA-approved for obesity, while sermorelin stimulates GH release to improve body composition indirectly. Semaglutide has far stronger evidence for weight loss.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Phase III trials, FDA-approved, massive real-world use", peptideBValue: "Previously FDA-approved for GH deficiency; off-label for body composition", winner: "a" },
      { name: "FDA Status", peptideAValue: "FDA-approved for obesity and T2D", peptideBValue: "Previously FDA-approved (pediatric GH deficiency)", winner: "a" },
      { name: "Mechanism", peptideAValue: "GLP-1 receptor agonist; appetite suppression, gastric slowing", peptideBValue: "GHRH analog; stimulates natural GH release", winner: null },
      { name: "Weight Loss Efficacy", peptideAValue: "15-17% body weight loss in trials", peptideBValue: "Modest body composition improvement via GH pathway", winner: "a" },
      { name: "Side Effects", peptideAValue: "Nausea, vomiting, diarrhea, potential pancreatitis", peptideBValue: "Injection site reactions, headache, flushing", winner: "b" },
      { name: "Cost", peptideAValue: "Very high ($1,000+/month branded)", peptideBValue: "Low to moderate (compounded)", winner: "b" },
      { name: "Muscle Preservation", peptideAValue: "Significant lean mass loss reported", peptideBValue: "GH pathway may help preserve lean mass", winner: "b" },
    ],
  },
  {
    slug: "semaglutide-vs-ipamorelin",
    peptideA: "semaglutide",
    peptideAName: "Semaglutide",
    peptideB: "ipamorelin",
    peptideBName: "Ipamorelin",
    summary:
      "Semaglutide is an FDA-approved GLP-1 agonist for direct weight loss, while ipamorelin is a GH secretagogue that can improve body composition through increased growth hormone. Semaglutide produces dramatically more weight loss, but ipamorelin may support lean mass retention and recovery.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Phase III trials, FDA-approved", peptideBValue: "Phase II trials; no FDA approval", winner: "a" },
      { name: "FDA Status", peptideAValue: "FDA-approved (Ozempic/Wegovy)", peptideBValue: "Not approved", winner: "a" },
      { name: "Mechanism", peptideAValue: "GLP-1 receptor agonist", peptideBValue: "Ghrelin receptor agonist (GH secretagogue)", winner: null },
      { name: "Weight Loss Efficacy", peptideAValue: "15-17% body weight in clinical trials", peptideBValue: "Indirect; improved body composition via GH, not direct weight loss", winner: "a" },
      { name: "Side Effects", peptideAValue: "GI effects, potential thyroid/pancreatitis concerns", peptideBValue: "Minimal; clean side-effect profile", winner: "b" },
      { name: "Muscle Impact", peptideAValue: "Lean mass loss of 25-40% of total weight lost", peptideBValue: "GH elevation may support lean mass", winner: "b" },
      { name: "Cost", peptideAValue: "Very high (branded)", peptideBValue: "Moderate (research peptide)", winner: "b" },
    ],
  },
  {
    slug: "cjc-1295-vs-ghrp-2",
    peptideA: "cjc-1295",
    peptideAName: "CJC-1295",
    peptideB: "ghrp-2",
    peptideBName: "GHRP-2",
    summary:
      "CJC-1295 and GHRP-2 represent the two main arms of GH secretion: GHRH and ghrelin pathways. CJC-1295 is a GHRH analog that provides sustained GH elevation, while GHRP-2 is a ghrelin mimetic that triggers acute GH pulses. They are frequently stacked for synergistic effects.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Phase II trials, PK data published", peptideBValue: "Extensive clinical research", winner: "b" },
      { name: "FDA Status", peptideAValue: "Not approved", peptideBValue: "Not approved", winner: "tie" },
      { name: "Mechanism", peptideAValue: "GHRH receptor agonist (amplifies GH release)", peptideBValue: "Ghrelin receptor agonist (triggers GH pulses)", winner: null },
      { name: "GH Release Pattern", peptideAValue: "Sustained elevation over hours/days", peptideBValue: "Acute, potent GH pulse", winner: null },
      { name: "Side Effects", peptideAValue: "Injection site reactions, water retention", peptideBValue: "Hunger increase, cortisol/prolactin elevation", winner: "a" },
      { name: "Dosing Frequency", peptideAValue: "1-2x weekly (DAC) or daily (no DAC)", peptideBValue: "2-3x daily for optimal pulsing", winner: "a" },
      { name: "Synergy Potential", peptideAValue: "Best combined with a GHRP", peptideBValue: "Best combined with a GHRH analog", winner: "tie" },
    ],
  },
  {
    slug: "cjc-1295-vs-ghrp-6",
    peptideA: "cjc-1295",
    peptideAName: "CJC-1295",
    peptideB: "ghrp-6",
    peptideBName: "GHRP-6",
    summary:
      "CJC-1295 (GHRH pathway) and GHRP-6 (ghrelin pathway) target different receptors for GH release. They are synergistic when combined. CJC-1295 provides sustained GH elevation while GHRP-6 triggers strong pulses and significant appetite stimulation.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Phase II trials", peptideBValue: "Extensive preclinical and clinical data", winner: "b" },
      { name: "FDA Status", peptideAValue: "Not approved", peptideBValue: "Not approved", winner: "tie" },
      { name: "Mechanism", peptideAValue: "GHRH receptor agonist", peptideBValue: "Ghrelin receptor agonist (strong ghrelin mimetic)", winner: null },
      { name: "Appetite Effects", peptideAValue: "No significant appetite change", peptideBValue: "Intense hunger stimulation", winner: null },
      { name: "Side Effects", peptideAValue: "Water retention, injection site reactions", peptideBValue: "Intense hunger, cortisol/prolactin rise, dizziness", winner: "a" },
      { name: "Dosing Convenience", peptideAValue: "1-2x weekly (DAC version)", peptideBValue: "2-3x daily", winner: "a" },
      { name: "Cost", peptideAValue: "Moderate", peptideBValue: "Low", winner: "b" },
    ],
  },
  {
    slug: "sermorelin-vs-ghrp-2",
    peptideA: "sermorelin",
    peptideAName: "Sermorelin",
    peptideB: "ghrp-2",
    peptideBName: "GHRP-2",
    summary:
      "Sermorelin (GHRH pathway) and GHRP-2 (ghrelin pathway) stimulate GH through different receptor systems. Sermorelin has a longer clinical history with former FDA approval, while GHRP-2 provides a stronger acute GH pulse. They are often combined for synergistic GH release.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Formerly FDA-approved; extensive clinical data", peptideBValue: "Extensive clinical research", winner: "a" },
      { name: "FDA Status", peptideAValue: "Previously FDA-approved", peptideBValue: "Not approved", winner: "a" },
      { name: "Mechanism", peptideAValue: "GHRH receptor agonist", peptideBValue: "Ghrelin receptor (GHS-R1a) agonist", winner: null },
      { name: "GH Release Pattern", peptideAValue: "Physiological pulsatile release", peptideBValue: "Strong acute GH pulse", winner: null },
      { name: "Side Effects", peptideAValue: "Flushing, headache, injection site pain", peptideBValue: "Hunger, cortisol/prolactin increase", winner: "a" },
      { name: "Half-Life", peptideAValue: "~10-20 minutes", peptideBValue: "~15-60 minutes", winner: "b" },
    ],
  },
  {
    slug: "sermorelin-vs-ghrp-6",
    peptideA: "sermorelin",
    peptideAName: "Sermorelin",
    peptideB: "ghrp-6",
    peptideBName: "GHRP-6",
    summary:
      "Sermorelin provides GHRH-mediated physiological GH release, while GHRP-6 triggers potent ghrelin-mediated pulses with strong appetite stimulation. Sermorelin's former FDA approval gives it a regulatory advantage, but GHRP-6 is one of the most affordable GH secretagogues available.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Formerly FDA-approved", peptideBValue: "Extensive preclinical and clinical data", winner: "a" },
      { name: "FDA Status", peptideAValue: "Previously FDA-approved", peptideBValue: "Not approved", winner: "a" },
      { name: "Mechanism", peptideAValue: "GHRH receptor agonist", peptideBValue: "Ghrelin receptor agonist", winner: null },
      { name: "Appetite Effects", peptideAValue: "No significant appetite impact", peptideBValue: "Very strong hunger stimulation", winner: null },
      { name: "Side Effects", peptideAValue: "Flushing, headache", peptideBValue: "Intense hunger, dizziness, cortisol/prolactin elevation", winner: "a" },
      { name: "Cost", peptideAValue: "Low to moderate", peptideBValue: "Very low", winner: "b" },
      { name: "GH Release Pattern", peptideAValue: "Physiological, mimics natural GHRH", peptideBValue: "Acute strong pulse via ghrelin pathway", winner: null },
    ],
  },
  {
    slug: "sermorelin-vs-hexarelin",
    peptideA: "sermorelin",
    peptideAName: "Sermorelin",
    peptideB: "hexarelin",
    peptideBName: "Hexarelin",
    summary:
      "Sermorelin is a GHRH analog with former FDA approval and a physiological release pattern, while hexarelin is the most potent GHRP but carries rapid desensitization risk. Sermorelin is better suited for long-term protocols, while hexarelin may be useful for short-term intensive GH release.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Formerly FDA-approved; decades of data", peptideBValue: "Extensive clinical data including cardiac studies", winner: "a" },
      { name: "FDA Status", peptideAValue: "Previously FDA-approved", peptideBValue: "Not approved", winner: "a" },
      { name: "Mechanism", peptideAValue: "GHRH receptor agonist", peptideBValue: "Ghrelin receptor agonist (most potent GHRP)", winner: null },
      { name: "GH Release Potency", peptideAValue: "Moderate, physiological", peptideBValue: "Very high; strongest GHRP", winner: "b" },
      { name: "Desensitization Risk", peptideAValue: "Low; suitable for long-term use", peptideBValue: "High; rapid tachyphylaxis", winner: "a" },
      { name: "Side Effects", peptideAValue: "Flushing, headache, mild injection pain", peptideBValue: "Cortisol/prolactin elevation, water retention", winner: "a" },
      { name: "Unique Benefits", peptideAValue: "Physiological GH release, well-characterized safety", peptideBValue: "Cardioprotective effects in heart failure patients", winner: null },
    ],
  },
  {
    slug: "ipamorelin-vs-tesamorelin",
    peptideA: "ipamorelin",
    peptideAName: "Ipamorelin",
    peptideB: "tesamorelin",
    peptideBName: "Tesamorelin",
    summary:
      "Ipamorelin (ghrelin pathway) and tesamorelin (GHRH pathway) stimulate GH through different mechanisms. Tesamorelin is FDA-approved for HIV lipodystrophy with proven visceral fat reduction, while ipamorelin offers the cleanest side-effect profile of any GHRP but lacks FDA approval.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Phase II trials", peptideBValue: "Phase III trials, FDA-approved", winner: "b" },
      { name: "FDA Status", peptideAValue: "Not approved", peptideBValue: "FDA-approved (Egrifta)", winner: "b" },
      { name: "Mechanism", peptideAValue: "Ghrelin receptor agonist", peptideBValue: "GHRH analog", winner: null },
      { name: "Primary Use", peptideAValue: "GH optimization, body composition, anti-aging", peptideBValue: "Visceral fat reduction (HIV lipodystrophy)", winner: null },
      { name: "Side Effects", peptideAValue: "Minimal; no cortisol/prolactin impact", peptideBValue: "Arthralgia, injection site reactions, edema", winner: "a" },
      { name: "Cost", peptideAValue: "Moderate (research peptide)", peptideBValue: "Very high (branded pharmaceutical)", winner: "a" },
      { name: "Fat Reduction Evidence", peptideAValue: "Indirect via GH elevation", peptideBValue: "Direct clinical evidence for visceral fat reduction", winner: "b" },
    ],
  },
  {
    slug: "ghk-cu-vs-kpv",
    peptideA: "ghk-cu",
    peptideAName: "GHK-Cu",
    peptideB: "kpv",
    peptideBName: "KPV",
    summary:
      "GHK-Cu and KPV are both short peptides with anti-inflammatory and healing properties. GHK-Cu (tripeptide-copper complex) focuses on collagen remodeling and skin regeneration, while KPV (alpha-MSH tripeptide fragment) targets NF-kB inflammatory pathways. Both are of interest in dermatology and gut health.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Human dermatology data, well-characterized biochemistry", peptideBValue: "In vitro and animal studies; earlier-stage research", winner: "a" },
      { name: "FDA Status", peptideAValue: "Not approved as drug; in cosmetics", peptideBValue: "Not approved", winner: "a" },
      { name: "Mechanism", peptideAValue: "Copper delivery, collagen synthesis, gene modulation (>4,000 genes)", peptideBValue: "NF-kB pathway inhibition, anti-inflammatory cytokine modulation", winner: null },
      { name: "Primary Use", peptideAValue: "Skin regeneration, wound healing, hair growth", peptideBValue: "Inflammatory bowel disease, skin inflammation", winner: null },
      { name: "Anti-Inflammatory Potency", peptideAValue: "Moderate; indirect via tissue remodeling", peptideBValue: "Strong; direct NF-kB inhibition", winner: "b" },
      { name: "Ease of Use", peptideAValue: "Topical, injection, microneedling", peptideBValue: "Oral, topical, or subcutaneous", winner: "tie" },
      { name: "Peptide Size", peptideAValue: "Tripeptide + copper ion", peptideBValue: "Tripeptide (KPV from alpha-MSH)", winner: "tie" },
    ],
  },
  {
    slug: "tirzepatide-vs-tesamorelin",
    peptideA: "tirzepatide",
    peptideAName: "Tirzepatide",
    peptideB: "tesamorelin",
    peptideBName: "Tesamorelin",
    summary:
      "Both are FDA-approved peptides affecting metabolic pathways. Tirzepatide (dual GIP/GLP-1 agonist) produces dramatic overall weight loss, while tesamorelin (GHRH analog) specifically reduces visceral fat via GH pathway. Tirzepatide achieves greater total weight loss, but tesamorelin targets visceral adiposity specifically.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Phase III trials (SURMOUNT/SURPASS)", peptideBValue: "Phase III trials for HIV lipodystrophy", winner: "a" },
      { name: "FDA Status", peptideAValue: "FDA-approved for T2D and obesity", peptideBValue: "FDA-approved for HIV lipodystrophy", winner: "tie" },
      { name: "Mechanism", peptideAValue: "Dual GIP/GLP-1 receptor agonism", peptideBValue: "GHRH receptor agonism, GH/IGF-1 elevation", winner: null },
      { name: "Weight Loss Efficacy", peptideAValue: "~20-22.5% total body weight loss", peptideBValue: "Targeted visceral fat reduction (~15-18%)", winner: "a" },
      { name: "Muscle Impact", peptideAValue: "Significant lean mass loss (~25-40% of weight lost)", peptideBValue: "GH pathway may preserve lean mass", winner: "b" },
      { name: "Side Effects", peptideAValue: "GI effects (nausea, vomiting, diarrhea)", peptideBValue: "Arthralgia, edema, injection site reactions", winner: "tie" },
      { name: "Cost", peptideAValue: "Very high (~$1,000+/month)", peptideBValue: "Very high (~$800-1,000+/month)", winner: "tie" },
    ],
  },
  {
    slug: "aod-9604-vs-ipamorelin",
    peptideA: "aod-9604",
    peptideAName: "AOD-9604",
    peptideB: "ipamorelin",
    peptideBName: "Ipamorelin",
    summary:
      "AOD-9604 is an hGH fragment (176-191) that was designed to isolate fat-burning effects of GH without other GH activity, while ipamorelin stimulates natural GH release for full-spectrum GH benefits. AOD-9604 failed clinical trials for obesity, while ipamorelin shows consistent GH elevation in studies.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Failed Phase IIb/III trials for obesity", peptideBValue: "Phase II trials showing consistent GH release", winner: "b" },
      { name: "FDA Status", peptideAValue: "Not approved", peptideBValue: "Not approved", winner: "tie" },
      { name: "Mechanism", peptideAValue: "hGH fragment targeting lipolysis without IGF-1", peptideBValue: "Ghrelin receptor agonist stimulating natural GH pulses", winner: null },
      { name: "Body Composition Effect", peptideAValue: "Failed to demonstrate efficacy in trials", peptideBValue: "GH elevation supports fat loss and lean mass", winner: "b" },
      { name: "Side Effects", peptideAValue: "Minimal reported", peptideBValue: "Minimal; no cortisol/prolactin impact", winner: "tie" },
      { name: "GH/IGF-1 Impact", peptideAValue: "Does not raise GH or IGF-1", peptideBValue: "Raises GH and IGF-1 levels", winner: null },
      { name: "Cost", peptideAValue: "Low", peptideBValue: "Moderate", winner: "a" },
    ],
  },

  // ─── Weight Loss GLP-1 / Incretin Comparisons ───────────────────────────
  {
    slug: "semaglutide-vs-liraglutide",
    peptideA: "semaglutide",
    peptideAName: "Semaglutide",
    peptideB: "liraglutide",
    peptideBName: "Liraglutide",
    summary:
      "Both are FDA-approved GLP-1 receptor agonists for diabetes and obesity. Semaglutide (Ozempic/Wegovy) is dosed weekly and produces greater weight loss (~15%). Liraglutide (Victoza/Saxenda) is dosed daily with more long-term safety data. Semaglutide has largely replaced liraglutide as first-line in clinical practice.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Level A — multiple large RCTs (STEP, SUSTAIN, SELECT)", peptideBValue: "Level A — multiple large RCTs (SCALE, LEADER)", winner: "tie" },
      { name: "FDA Status", peptideAValue: "Approved for T2D (Ozempic) and obesity (Wegovy)", peptideBValue: "Approved for T2D (Victoza) and obesity (Saxenda)", winner: "tie" },
      { name: "Weight Loss Efficacy", peptideAValue: "~15% mean body weight loss (STEP 1)", peptideBValue: "~8% mean body weight loss (SCALE)", winner: "a" },
      { name: "Dosing Convenience", peptideAValue: "Once weekly injection; oral option (Rybelsus)", peptideBValue: "Daily injection required", winner: "a" },
      { name: "Side Effects", peptideAValue: "GI side effects; similar profile but higher potency", peptideBValue: "GI side effects; well-characterized over 10+ years", winner: "tie" },
      { name: "Long-Term Data", peptideAValue: "Strong CV data (SELECT); ~5 years post-approval", peptideBValue: "10+ years of real-world data; LEADER CV benefit proven", winner: "b" },
    ],
  },
  {
    slug: "tirzepatide-vs-retatrutide",
    peptideA: "tirzepatide",
    peptideAName: "Tirzepatide",
    peptideB: "retatrutide",
    peptideBName: "Retatrutide",
    summary:
      "Tirzepatide is an FDA-approved dual GIP/GLP-1 agonist achieving up to 22.5% weight loss. Retatrutide is an investigational triple agonist (GIP/GLP-1/glucagon) showing up to 24.2% weight loss in Phase 2 — the highest ever recorded. Tirzepatide is available now; retatrutide is still in Phase 3 trials.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Level A — Phase 3 RCTs (SURMOUNT, SURPASS)", peptideBValue: "Level B — Phase 2 RCT; Phase 3 ongoing", winner: "a" },
      { name: "FDA Status", peptideAValue: "Approved for T2D (Mounjaro) and obesity (Zepbound)", peptideBValue: "Not approved; Phase 3 trials (TRIUMPH program)", winner: "a" },
      { name: "Weight Loss Efficacy", peptideAValue: "Up to 22.5% (SURMOUNT-1 at 72 weeks)", peptideBValue: "Up to 24.2% (Phase 2 at 48 weeks)", winner: "b" },
      { name: "Mechanism", peptideAValue: "Dual agonist: GIP + GLP-1 receptors", peptideBValue: "Triple agonist: GIP + GLP-1 + glucagon receptors", winner: null },
      { name: "Liver Fat Reduction", peptideAValue: "Moderate liver fat reduction observed", peptideBValue: "Significant liver fat reduction via glucagon activation", winner: "b" },
      { name: "Availability", peptideAValue: "Available by prescription now", peptideBValue: "Not yet available; expected 2026-2027", winner: "a" },
    ],
  },
  {
    slug: "semaglutide-vs-retatrutide",
    peptideA: "semaglutide",
    peptideAName: "Semaglutide",
    peptideB: "retatrutide",
    peptideBName: "Retatrutide",
    summary:
      "Semaglutide is the most widely prescribed GLP-1 agonist with proven CV benefits and ~15% weight loss. Retatrutide is an investigational triple agonist showing 24.2% weight loss in Phase 2 — potentially the most effective obesity treatment ever tested. Semaglutide is available now; retatrutide remains in clinical trials.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Level A — extensive Phase 3 data and real-world evidence", peptideBValue: "Level B — Phase 2 RCT; Phase 3 ongoing (TRIUMPH)", winner: "a" },
      { name: "FDA Status", peptideAValue: "Approved for T2D and obesity (multiple formulations)", peptideBValue: "Not approved; still in Phase 3 clinical trials", winner: "a" },
      { name: "Weight Loss Efficacy", peptideAValue: "~15% mean body weight loss (Wegovy 2.4 mg)", peptideBValue: "Up to 24.2% weight loss (12 mg dose, Phase 2)", winner: "b" },
      { name: "Mechanism", peptideAValue: "GLP-1 receptor agonist only", peptideBValue: "Triple agonist: GIP + GLP-1 + glucagon receptors", winner: null },
      { name: "Side Effects", peptideAValue: "Well-characterized GI side effects; manageable", peptideBValue: "Similar GI profile; long-term safety unknown", winner: "a" },
      { name: "Cardiovascular Data", peptideAValue: "Proven 20% CV event reduction (SELECT trial)", peptideBValue: "No CV outcome data yet", winner: "a" },
    ],
  },
  {
    slug: "liraglutide-vs-tirzepatide",
    peptideA: "liraglutide",
    peptideAName: "Liraglutide",
    peptideB: "tirzepatide",
    peptideBName: "Tirzepatide",
    summary:
      "Liraglutide was the first GLP-1 agonist approved for obesity, producing ~8% weight loss with daily dosing. Tirzepatide is a newer dual GIP/GLP-1 agonist achieving up to 22.5% weight loss with weekly dosing. Tirzepatide is significantly more effective but liraglutide has a longer safety track record.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Level A — 10+ years of clinical data (SCALE, LEADER)", peptideBValue: "Level A — large Phase 3 programs (SURMOUNT, SURPASS)", winner: "tie" },
      { name: "FDA Status", peptideAValue: "Approved for T2D (Victoza) and obesity (Saxenda)", peptideBValue: "Approved for T2D (Mounjaro) and obesity (Zepbound)", winner: "tie" },
      { name: "Weight Loss Efficacy", peptideAValue: "~8% mean body weight loss (Saxenda 3.0 mg)", peptideBValue: "Up to 22.5% mean body weight loss (Zepbound 15 mg)", winner: "b" },
      { name: "Dosing Convenience", peptideAValue: "Daily subcutaneous injection", peptideBValue: "Once weekly subcutaneous injection", winner: "b" },
      { name: "Mechanism", peptideAValue: "GLP-1 receptor agonist only", peptideBValue: "Dual GIP + GLP-1 receptor agonist", winner: null },
      { name: "Long-Term Safety", peptideAValue: "10+ years of real-world data; well-established profile", peptideBValue: "Newer agent; ~3 years post-approval data", winner: "a" },
    ],
  },
  {
    slug: "tirzepatide-vs-survodutide",
    peptideA: "tirzepatide",
    peptideAName: "Tirzepatide",
    peptideB: "survodutide",
    peptideBName: "Survodutide",
    summary:
      "Tirzepatide is an FDA-approved dual GIP/GLP-1 agonist with up to 22.5% weight loss. Survodutide is an investigational dual GLP-1/glucagon agonist showing up to 19% weight loss with particular promise for liver fat reduction (MASH). Both are dual agonists but target different receptor combinations.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Level A — Phase 3 RCTs completed and approved", peptideBValue: "Level B — Phase 2 data; Phase 3 ongoing (SYNCHRONIZE)", winner: "a" },
      { name: "FDA Status", peptideAValue: "Approved for T2D (Mounjaro) and obesity (Zepbound)", peptideBValue: "Not approved; in Phase 3 trials", winner: "a" },
      { name: "Weight Loss Efficacy", peptideAValue: "Up to 22.5% (SURMOUNT-1)", peptideBValue: "Up to 19% (Phase 2 at 46 weeks)", winner: "a" },
      { name: "Mechanism", peptideAValue: "Dual agonist: GIP + GLP-1 receptors", peptideBValue: "Dual agonist: GLP-1 + glucagon receptors", winner: null },
      { name: "Liver Fat / MASH Benefit", peptideAValue: "Some liver fat reduction observed", peptideBValue: "Significant liver fat reduction; MASH trials underway", winner: "b" },
      { name: "Availability", peptideAValue: "Available by prescription now", peptideBValue: "Not yet available; still in clinical trials", winner: "a" },
    ],
  },
  {
    slug: "retatrutide-vs-survodutide",
    peptideA: "retatrutide",
    peptideAName: "Retatrutide",
    peptideB: "survodutide",
    peptideBName: "Survodutide",
    summary:
      "Both are investigational next-generation peptides for obesity. Retatrutide is a triple agonist (GIP/GLP-1/glucagon) with up to 24.2% weight loss — the highest ever reported. Survodutide is a dual agonist (GLP-1/glucagon) with up to 19% weight loss and strong MASH data. Neither is FDA-approved yet.",
    dimensions: [
      { name: "Evidence Level", peptideAValue: "Level B — Phase 2 RCT; Phase 3 ongoing (TRIUMPH)", peptideBValue: "Level B — Phase 2 data; Phase 3 ongoing (SYNCHRONIZE)", winner: "tie" },
      { name: "FDA Status", peptideAValue: "Not approved; Eli Lilly Phase 3", peptideBValue: "Not approved; Boehringer Ingelheim Phase 3", winner: "tie" },
      { name: "Weight Loss Efficacy", peptideAValue: "Up to 24.2% (Phase 2 at 48 weeks)", peptideBValue: "Up to 19% (Phase 2 at 46 weeks)", winner: "a" },
      { name: "Mechanism", peptideAValue: "Triple agonist: GIP + GLP-1 + glucagon", peptideBValue: "Dual agonist: GLP-1 + glucagon", winner: null },
      { name: "Liver Fat / MASH Benefit", peptideAValue: "Significant liver fat reduction observed", peptideBValue: "Significant liver fat reduction; dedicated MASH trials", winner: "b" },
      { name: "Diabetes Efficacy", peptideAValue: "HbA1c reduction up to 2.16% in Phase 2", peptideBValue: "Glycemic improvements observed; less diabetes-specific data", winner: "a" },
    ],
  },
];

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getComparisonsForPeptide(peptideSlug: string): Comparison[] {
  return comparisons.filter(
    (c) => c.peptideA === peptideSlug || c.peptideB === peptideSlug,
  );
}

export function getAllComparisons(): Comparison[] {
  return comparisons;
}

export function getAllComparisonSlugs(): string[] {
  return comparisons.map((c) => c.slug);
}
