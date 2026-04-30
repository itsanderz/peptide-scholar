/**
 * Cost page content enrichment — deep-dive pricing data, insurance navigation,
 * and savings program details for each treatment.
 *
 * This adds substantial original content beyond the generated JSON summaries,
 * addressing thin-content concerns with detailed cost breakdowns.
 */

export interface EnrichedCostContent {
  slug: string;
  priceBreakdown: {
    listPricePerMonth: string;
    averageWholesalePrice: string;
    pharmacyAcquisitionEstimate: string;
    typicalNegotiatedRate: string;
    pricePerDose: string;
    annualCostAtListPrice: string;
  };
  pharmacyPriceComparison: { pharmacy: string; priceRange: string; notes: string }[];
  insuranceLandscape: {
    commercialCoverageRate: string;
    medicarePartD: string;
    medicaid: string;
    vaCoverage: string;
    tricare: string;
    employerPlanTypicalTier: string;
  };
  priorAuthGuide: {
    requiredDocumentation: string[];
    typicalDenialReasons: string[];
    appealTemplatePoints: string[];
    expectedTimeline: string;
  };
  savingsPrograms: {
    name: string;
    type: "manufacturer" | "foundation" | "pharmacy" | "copay";
    eligibility: string;
    savings: string;
    incomeLimit?: string;
    enrollmentComplexity: "simple" | "moderate" | "complex";
    notes: string;
  }[];
  compoundedAlternative?: {
    available: boolean;
    priceRange: string;
    qualityConcerns: string[];
    legalStatus: string;
  };
  genericBiosimilarStatus: {
    hasGeneric: boolean;
    genericPriceRange?: string;
    expectedGenericDate?: string;
    biosimilarStatus?: string;
  };
  dosingCostImpact: { dose: string; monthlyCost: string; annualCost: string }[];
  costSavingStrategies: string[];
  annualCostProjection: {
    year1: string;
    year2: string;
    year3: string;
    assumptions: string[];
  };
  internationalPriceComparison: { country: string; priceRange: string; notes: string }[];
  reviewerId: string;
  lastReviewed: string;
  wordCount: number;
}

export const enrichedCosts: Record<string, EnrichedCostContent> = {
  semaglutide: {
    slug: "semaglutide",
    priceBreakdown: {
      listPricePerMonth: "~$1,349 (Wegovy 2.4 mg); ~$936 (Ozempic 1.0 mg)",
      averageWholesalePrice: "~$1,150-$1,250/month",
      pharmacyAcquisitionEstimate: "~$1,050-$1,150/month",
      typicalNegotiatedRate: "~$800-$1,000/month after rebates",
      pricePerDose: "~$310 per 2.4 mg injection (Wegovy); ~$234 per 1.0 mg (Ozempic)",
      annualCostAtListPrice: "~$16,200 (Wegovy); ~$11,200 (Ozempic)",
    },
    pharmacyPriceComparison: [
      { pharmacy: "CVS/Walgreens (cash)", priceRange: "$1,300-$1,400/month", notes: "Retail cash price near list price" },
      { pharmacy: "Costco/Sam's Club", priceRange: "$1,200-$1,350/month", notes: "Often 5-10% below retail chains" },
      { pharmacy: "Amazon Pharmacy", priceRange: "$1,200-$1,350/month", notes: "Cash price; may offer delivery discounts" },
      { pharmacy: "GoodRx coupon", priceRange: "$1,100-$1,300/month", notes: "Discount varies by pharmacy and date" },
      { pharmacy: "Mark Cuban Cost Plus", priceRange: "Not available", notes: "Semaglutide not currently in Cost Plus formulary" },
      { pharmacy: "Novo Nordisk direct", priceRange: "$0-$349/month", notes: "With savings card for commercially insured" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "~40-50% for obesity (Wegovy); ~80-90% for T2D (Ozempic)",
      medicarePartD: "Wegovy covered for obesity as of 2024 under IRA expansion; Ozempic covered for T2D",
      medicaid: "Varies by state; ~50% of state Medicaid programs cover for T2D; obesity coverage expanding",
      vaCoverage: "Available through VA formulary for T2D; obesity coverage on case-by-case basis",
      tricare: "Covered for T2D with prior auth; obesity coverage limited",
      employerPlanTypicalTier: "Tier 3-4 (preferred brand/non-preferred brand); copay $50-150 or coinsurance 20-40%",
    },
    priorAuthGuide: {
      requiredDocumentation: [
        "BMI ≥30 (or ≥27 with comorbidity) for obesity indication",
        "HbA1c ≥7.0% for diabetes indication",
        "Documentation of failed lifestyle intervention (diet, exercise, behavioral program)",
        "Step therapy failure (metformin, sulfonylurea, DPP-4 inhibitor, or other GLP-1)",
        "Recent lab work (HbA1c, fasting glucose, lipid panel, TSH)",
      ],
      typicalDenialReasons: [
        "BMI below plan threshold",
        "Missing step therapy documentation",
        "Lifestyle intervention not documented",
        "Plan excludes anti-obesity medications entirely",
        "Not prescribed by endocrinologist or obesity medicine specialist (some plans require)",
      ],
      appealTemplatePoints: [
        "Patient meets FDA-approved indication criteria",
        "Documented comorbidities (hypertension, sleep apnea, prediabetes, dyslipidemia)",
        "Prior weight loss attempts with dates and outcomes",
        "Clinical guidelines support (AACE, Obesity Society, ADA)",
        "Cost of untreated obesity exceeds medication cost (complications, hospitalizations)",
      ],
      expectedTimeline: "Initial decision: 3-5 business days. Appeal: 30-45 days.",
    },
    savingsPrograms: [
      { name: "Wegovy Savings Card", type: "manufacturer", eligibility: "Commercially insured patients", savings: "$0-$225/month", incomeLimit: "None", enrollmentComplexity: "simple", notes: "Not valid for Medicare/Medicaid. Annual maximum benefit may apply." },
      { name: "Ozempic Savings Card", type: "manufacturer", eligibility: "Commercially insured T2D patients", savings: "$25/month for up to 24 months", incomeLimit: "None", enrollmentComplexity: "simple", notes: "Requires T2D diagnosis. Not for obesity use." },
      { name: "Novo Nordisk Patient Assistance (PAP)", type: "manufacturer", eligibility: "Uninsured, US resident, household income ≤400% FPL", savings: "Free medication", incomeLimit: "≤400% FPL (~$60,000 for family of 4)", enrollmentComplexity: "moderate", notes: "Annual application. Requires income documentation and prescriber attestation." },
      { name: "NovoCare Pharmacy", type: "pharmacy", eligibility: "All patients", savings: "$349/month cash price", incomeLimit: "None", enrollmentComplexity: "simple", notes: "Direct from manufacturer pharmacy. Cash price regardless of insurance." },
      { name: "Patient Advocate Foundation", type: "foundation", eligibility: "Underinsured with serious/chronic condition", savings: "Co-pay assistance up to $3,000/year", incomeLimit: "≤400-500% FPL", enrollmentComplexity: "complex", notes: "Case management included. Application takes 2-4 weeks." },
      { name: "NeedyMeds", type: "foundation", eligibility: "Uninsured/underinsured", savings: "Database of all available programs", incomeLimit: "Varies", enrollmentComplexity: "simple", notes: "Information resource; helps patients find and apply to programs." },
    ],
    compoundedAlternative: {
      available: true,
      priceRange: "$150-$400/month (when legally available)",
      qualityConcerns: [
        "FDA warned against compounded semaglutide in 2024-2025",
        "No FDA oversight of compounding quality",
        "Some products contained salt forms (semaglutide sodium) rather than proper base form",
        "Potency and sterility not guaranteed",
      ],
      legalStatus: "Effectively prohibited after FDA shortage resolution (Feb 2025). Compounding pharmacies subject to enforcement action.",
    },
    genericBiosimilarStatus: {
      hasGeneric: false,
      expectedGenericDate: "Patent expires 2031-2032; generic entry unlikely before then",
      biosimilarStatus: "Not applicable (biologic but regulated as small molecule via 505(b)(2); biosimilar pathway unclear)",
    },
    dosingCostImpact: [
      { dose: "Wegovy 0.25 mg (starting)", monthlyCost: "$1,349", annualCost: "$16,200" },
      { dose: "Wegovy 1.7 mg", monthlyCost: "$1,349", annualCost: "$16,200" },
      { dose: "Wegovy 2.4 mg (maintenance)", monthlyCost: "$1,349", annualCost: "$16,200" },
      { dose: "Ozempic 0.25-2.0 mg", monthlyCost: "$936", annualCost: "$11,200" },
      { dose: "Rybelsus 3-14 mg", monthlyCost: "$936", annualCost: "$11,200" },
    ],
    costSavingStrategies: [
      "Start with NovoCare Pharmacy cash price ($349/month) if uninsured",
      "Apply for Novo Nordisk PAP if income ≤400% FPL",
      "Use Wegovy Savings Card immediately if commercially insured",
      "Ask prescriber to document step therapy failures thoroughly for prior auth",
      "Consider Ozempic for T2D if obesity indication is denied — higher coverage rate",
      "Appeal all denials; success rate for well-documented appeals is 40-60%",
      "Check employer wellness programs — some offer GLP-1 coverage incentives",
      "Explore telehealth providers (Ro, Calibrate, Noom Med) that include medication in subscription",
    ],
    annualCostProjection: {
      year1: "$4,200-$16,200 (varies by insurance, coupons, PAP)",
      year2: "$4,200-$16,200 (ongoing; no generic relief expected)",
      year3: "$4,200-$16,200 (patent protection continues)",
      assumptions: [
        "Patient continues therapy year-round",
        "No generic or biosimilar entry (expected 2031+)",
        "Insurance coverage remains stable",
        "Savings program eligibility unchanged",
      ],
    },
    internationalPriceComparison: [
      { country: "United Kingdom (NHS)", priceRange: "~£170-200/month (~$210-250)", notes: "NHS negotiated price; available for T2D and obesity with criteria" },
      { country: "Canada", priceRange: "~CAD $300-400/month (~$220-300)", notes: "Patented Medicines Prices Review Board regulated pricing" },
      { country: "Germany", priceRange: "~€250-350/month (~$270-380)", notes: "Statutory health insurance negotiated rates" },
      { country: "Mexico", priceRange: "~$200-400/month", notes: "Cash pricing; some cross-border purchase attempts (not recommended due to customs/legal issues)" },
      { country: "India", priceRange: "Not available; patent protections prevent market entry", notes: "No approved semaglutide products" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 1200,
  },

  tirzepatide: {
    slug: "tirzepatide",
    priceBreakdown: {
      listPricePerMonth: "~$1,060-$1,300 depending on dose",
      averageWholesalePrice: "~$950-$1,150/month",
      pharmacyAcquisitionEstimate: "~$850-$1,000/month",
      typicalNegotiatedRate: "~$700-$900/month after rebates",
      pricePerDose: "~$265 per 2.5 mg; ~$325 per 15 mg",
      annualCostAtListPrice: "~$12,700-$15,600",
    },
    pharmacyPriceComparison: [
      { pharmacy: "CVS/Walgreens (cash)", priceRange: "$1,000-$1,350/month", notes: "Near list price" },
      { pharmacy: "Costco", priceRange: "$950-$1,250/month", notes: "Slight discount" },
      { pharmacy: "Amazon Pharmacy", priceRange: "$950-$1,300/month", notes: "Cash price" },
      { pharmacy: "GoodRx", priceRange: "$850-$1,200/month", notes: "Variable by pharmacy" },
      { pharmacy: "Lilly direct", priceRange: "$550-$1,100/month", notes: "With savings card for commercially insured" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "~35-45% for obesity (Zepbound); ~75-85% for T2D (Mounjaro)",
      medicarePartD: "Zepbound obesity coverage expanding under IRA; Mounjaro covered for T2D",
      medicaid: "Varies by state; T2D coverage more common than obesity",
      vaCoverage: "Available for T2D; obesity on case-by-case basis",
      tricare: "T2D with prior auth; obesity limited",
      employerPlanTypicalTier: "Tier 3-4; copay $75-200 or coinsurance 25-40%",
    },
    priorAuthGuide: {
      requiredDocumentation: [
        "BMI ≥30 (or ≥27 with comorbidity) for Zepbound",
        "HbA1c ≥7.0% for Mounjaro",
        "Failed lifestyle intervention documentation",
        "Step therapy failure (metformin, other GLP-1, SGLT2 inhibitor)",
        "Recent metabolic labs",
      ],
      typicalDenialReasons: [
        "Plan excludes obesity medications",
        "Step therapy not completed",
        "BMI below threshold",
        "Not prescribed by specialist (some plans)",
        "Plan requires trial of less expensive GLP-1 first (semaglutide, liraglutide)",
      ],
      appealTemplatePoints: [
        "Meets FDA indication for Zepbound/Mounjaro",
        "Failed or intolerant to semaglutide (if applicable)",
        "Greater efficacy than available alternatives (SURMOUNT-5 data)",
        "Comorbidities documented",
        "Clinical guideline support",
      ],
      expectedTimeline: "3-5 days initial; 30-45 days appeal",
    },
    savingsPrograms: [
      { name: "Zepbound Savings Card", type: "manufacturer", eligibility: "Commercially insured", savings: "Pay as little as $550/month", incomeLimit: "None", enrollmentComplexity: "simple", notes: "Not for government insurance. Subject to annual cap." },
      { name: "Mounjaro Savings Card", type: "manufacturer", eligibility: "Commercially insured T2D patients", savings: "$25/month for up to 12 months", incomeLimit: "None", enrollmentComplexity: "simple", notes: "Requires T2D diagnosis." },
      { name: "Lilly Patient Assistance", type: "manufacturer", eligibility: "Uninsured, income ≤400% FPL", savings: "Free for eligible patients", incomeLimit: "≤400% FPL", enrollmentComplexity: "moderate", notes: "Annual renewal. Income verification required." },
      { name: "LillyDirect Pharmacy", type: "pharmacy", eligibility: "All patients", savings: "Competitive cash pricing", incomeLimit: "None", enrollmentComplexity: "simple", notes: "Manufacturer direct pharmacy option." },
    ],
    compoundedAlternative: {
      available: true,
      priceRange: "$200-$500/month (while shortage persists)",
      qualityConcerns: [
        "FDA has issued warnings about compounded tirzepatide",
        "No FDA quality oversight",
        "Variable potency reported",
        "Some compounders use unapproved salt forms",
      ],
      legalStatus: "Currently allowed while tirzepatide remains on FDA shortage list. Status will change when shortage resolves.",
    },
    genericBiosimilarStatus: {
      hasGeneric: false,
      expectedGenericDate: "Patent extends to mid-2030s; no generic expected soon",
    },
    dosingCostImpact: [
      { dose: "Zepbound 2.5 mg", monthlyCost: "$1,060", annualCost: "$12,700" },
      { dose: "Zepbound 5 mg", monthlyCost: "$1,060", annualCost: "$12,700" },
      { dose: "Zepbound 10 mg", monthlyCost: "$1,180", annualCost: "$14,200" },
      { dose: "Zepbound 15 mg", monthlyCost: "$1,300", annualCost: "$15,600" },
    ],
    costSavingStrategies: [
      "Use Mounjaro savings card for T2D ($25/month)",
      "Apply for Lilly PAP if uninsured and income-qualified",
      "Start at lowest dose to assess insurance coverage before titrating",
      "Document semaglutide failure if plan requires step therapy",
      "Appeal all denials with supporting literature",
      "Consider compounded version legally while shortage persists (with quality caveats)",
    ],
    annualCostProjection: {
      year1: "$6,600-$15,600",
      year2: "$6,600-$15,600",
      year3: "$6,600-$15,600",
      assumptions: [
        "No generic before 2035+",
        "Insurance coverage stable",
        "Patient titrates to maintenance dose",
      ],
    },
    internationalPriceComparison: [
      { country: "UK (NHS)", priceRange: "~£180-220/month (~$230-280)", notes: "NHS negotiated" },
      { country: "Canada", priceRange: "~CAD $350-450 (~$260-330)", notes: "PMPRB regulated" },
      { country: "Germany", priceRange: "~€280-380 (~$300-410)", notes: "SHI negotiated" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 950,
  },

  liraglutide: {
    slug: "liraglutide",
    priceBreakdown: {
      listPricePerMonth: "~$1,349 (Saxenda 3.0 mg); ~$1,100 (Victoza 1.8 mg)",
      averageWholesalePrice: "~$1,200-$1,300/month",
      pharmacyAcquisitionEstimate: "~$1,050-$1,200/month",
      typicalNegotiatedRate: "~$700-$950/month after rebates",
      pricePerDose: "~$45 per 3.0 mg (Saxenda); ~$37 per 1.8 mg (Victoza)",
      annualCostAtListPrice: "~$16,200 (Saxenda); ~$13,200 (Victoza)",
    },
    pharmacyPriceComparison: [
      { pharmacy: "Retail chains (cash)", priceRange: "$1,250-$1,400/month", notes: "Standard retail pricing" },
      { pharmacy: "Costco", priceRange: "$1,150-$1,300/month", notes: "Modest discount" },
      { pharmacy: "GoodRx", priceRange: "$1,000-$1,250/month", notes: "Variable" },
      { pharmacy: "Novo Nordisk direct", priceRange: "$200-$500/month", notes: "With savings card" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "~40-50% for Saxenda (obesity); ~80-90% for Victoza (T2D)",
      medicarePartD: "Victoza covered for T2D; Saxenda obesity coverage under IRA expansion",
      medicaid: "Victoza commonly covered for T2D; Saxenda varies by state",
      vaCoverage: "Victoza on formulary for T2D",
      tricare: "Victoza covered for T2D; Saxenda limited",
      employerPlanTypicalTier: "Tier 3; copay $40-100 or coinsurance 20-30%",
    },
    priorAuthGuide: {
      requiredDocumentation: [
        "BMI criteria for Saxenda; HbA1c for Victoza",
        "Lifestyle intervention documentation",
        "Step therapy failures",
      ],
      typicalDenialReasons: [
        "Obesity medication exclusion",
        "Missing step therapy",
        "BMI below threshold",
      ],
      appealTemplatePoints: [
        "FDA-approved indication met",
        "Documented comorbidities",
        "Guideline-concordant therapy",
      ],
      expectedTimeline: "3-5 days initial; 30 days appeal",
    },
    savingsPrograms: [
      { name: "Saxenda Savings Card", type: "copay", eligibility: "Commercially insured", savings: "$200-$500/month", incomeLimit: "None", enrollmentComplexity: "simple", notes: "Not for Medicare/Medicaid" },
      { name: "Victoza Savings Card", type: "copay", eligibility: "Commercially insured T2D", savings: "$25/month up to 24 months", incomeLimit: "None", enrollmentComplexity: "simple", notes: "Requires T2D diagnosis" },
      { name: "Novo Nordisk PAP", type: "manufacturer", eligibility: "Uninsured, ≤400% FPL", savings: "Free", incomeLimit: "≤400% FPL", enrollmentComplexity: "moderate", notes: "Annual application" },
    ],
    genericBiosimilarStatus: {
      hasGeneric: false,
      expectedGenericDate: "Patent expires late 2020s; generic entry may reduce cost significantly",
    },
    dosingCostImpact: [
      { dose: "Victoza 0.6-1.8 mg", monthlyCost: "$1,100", annualCost: "$13,200" },
      { dose: "Saxenda 3.0 mg", monthlyCost: "$1,349", annualCost: "$16,200" },
    ],
    costSavingStrategies: [
      "Use Victoza for T2D if obesity indication denied (better coverage)",
      "Saxenda savings card for commercially insured",
      "Novo Nordisk PAP for uninsured",
      "Prepare for generic availability in late 2020s",
    ],
    annualCostProjection: {
      year1: "$3,000-$16,200",
      year2: "$3,000-$16,200",
      year3: "$3,000-$16,200 (generic may emerge)",
      assumptions: ["No generic yet", "Insurance stable"],
    },
    internationalPriceComparison: [
      { country: "UK", priceRange: "~£150-200/month (~$190-250)", notes: "NHS" },
      { country: "Canada", priceRange: "~CAD $300-400 (~$220-300)", notes: "Regulated" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 750,
  },

  exenatide: {
    slug: "exenatide",
    priceBreakdown: {
      listPricePerMonth: "~$700-$900/month",
      averageWholesalePrice: "~$650-$800/month",
      pharmacyAcquisitionEstimate: "~$600-$750/month",
      typicalNegotiatedRate: "~$450-$650/month",
      pricePerDose: "~$12 per 5 mcg BID dose; ~$32 per weekly 2 mg",
      annualCostAtListPrice: "~$8,400-$10,800",
    },
    pharmacyPriceComparison: [
      { pharmacy: "Retail", priceRange: "$650-$900/month", notes: "Standard" },
      { pharmacy: "GoodRx", priceRange: "$550-$800/month", notes: "Discounted" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "~80-90% for T2D",
      medicarePartD: "Covered for T2D",
      medicaid: "Most states cover for T2D",
      vaCoverage: "On formulary",
      tricare: "Covered",
      employerPlanTypicalTier: "Tier 2-3; copay $30-75",
    },
    priorAuthGuide: {
      requiredDocumentation: ["T2D diagnosis", "Metformin failure or intolerance"],
      typicalDenialReasons: ["Not T2D", "No metformin trial"],
      appealTemplatePoints: ["T2D with inadequate control", "Metformin intolerance documented"],
      expectedTimeline: "3-5 days",
    },
    savingsPrograms: [
      { name: "Bydureon/Byetta savings card", type: "copay", eligibility: "Commercially insured", savings: "$25/month", incomeLimit: "None", enrollmentComplexity: "simple", notes: "AstraZeneca program" },
      { name: "AstraZeneca PAP", type: "manufacturer", eligibility: "Uninsured, ≤400% FPL", savings: "Free", incomeLimit: "≤400% FPL", enrollmentComplexity: "moderate", notes: "Annual application" },
    ],
    genericBiosimilarStatus: {
      hasGeneric: false,
      expectedGenericDate: "Limited generic competition expected; newer GLP-1s have reduced market demand",
    },
    dosingCostImpact: [
      { dose: "Byetta 5-10 mcg BID", monthlyCost: "$700", annualCost: "$8,400" },
      { dose: "Bydureon 2 mg weekly", monthlyCost: "$900", annualCost: "$10,800" },
    ],
    costSavingStrategies: [
      "Bydureon weekly may improve adherence vs BID dosing",
      "Copay card reduces out-of-pocket",
      "Often covered without prior auth after metformin",
    ],
    annualCostProjection: {
      year1: "$2,400-$10,800",
      year2: "$2,400-$10,800",
      year3: "$2,400-$10,800",
      assumptions: ["T2D indication", "Insurance coverage"],
    },
    internationalPriceComparison: [
      { country: "UK", priceRange: "~£100-150/month (~$130-190)", notes: "NHS" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 650,
  },

  dulaglutide: {
    slug: "dulaglutide",
    priceBreakdown: {
      listPricePerMonth: "~$900-$1,100/month (1.5 mg); higher doses proportionally more",
      averageWholesalePrice: "~$800-$1,000/month",
      pharmacyAcquisitionEstimate: "~$750-$900/month",
      typicalNegotiatedRate: "~$550-$750/month",
      pricePerDose: "~$225 per 1.5 mg; ~$275 per 3.0 mg; ~$350 per 4.5 mg",
      annualCostAtListPrice: "~$10,800-$13,200",
    },
    pharmacyPriceComparison: [
      { pharmacy: "Retail", priceRange: "$850-$1,100/month", notes: "Standard" },
      { pharmacy: "GoodRx", priceRange: "$750-$950/month", notes: "Discounted" },
      { pharmacy: "Lilly direct", priceRange: "$25/month", notes: "With savings card" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "~85-95% for T2D",
      medicarePartD: "Covered",
      medicaid: "Most states cover",
      vaCoverage: "On formulary",
      tricare: "Covered",
      employerPlanTypicalTier: "Tier 2-3; copay $25-75",
    },
    priorAuthGuide: {
      requiredDocumentation: ["T2D diagnosis", "Metformin trial"],
      typicalDenialReasons: ["No metformin failure documented", "Not T2D"],
      appealTemplatePoints: ["CV benefit (REWIND trial)", "T2D with inadequate control"],
      expectedTimeline: "3-5 days",
    },
    savingsPrograms: [
      { name: "Trulicity Savings Card", type: "copay", eligibility: "Commercially insured", savings: "$25/month for 12 months", incomeLimit: "None", enrollmentComplexity: "simple", notes: "Lilly program" },
      { name: "Lilly PAP", type: "manufacturer", eligibility: "Uninsured, ≤400% FPL", savings: "Free", incomeLimit: "≤400% FPL", enrollmentComplexity: "moderate", notes: "Annual application" },
    ],
    genericBiosimilarStatus: {
      hasGeneric: false,
      expectedGenericDate: "No generic expected before patent expiry in 2030s",
    },
    dosingCostImpact: [
      { dose: "0.75 mg", monthlyCost: "$900", annualCost: "$10,800" },
      { dose: "1.5 mg", monthlyCost: "$900", annualCost: "$10,800" },
      { dose: "3.0 mg", monthlyCost: "$1,000", annualCost: "$12,000" },
      { dose: "4.5 mg", monthlyCost: "$1,100", annualCost: "$13,200" },
    ],
    costSavingStrategies: [
      "Trulicity savings card is highly effective ($25/month)",
      "Higher doses (3.0, 4.5 mg) may offer better glycemic control at modest cost increase",
      "Usually covered with simple prior auth after metformin",
    ],
    annualCostProjection: {
      year1: "$3,000-$13,200",
      year2: "$3,000-$13,200",
      year3: "$3,000-$13,200",
      assumptions: ["T2D indication", "Insurance stable"],
    },
    internationalPriceComparison: [
      { country: "UK", priceRange: "~£120-160/month (~$150-200)", notes: "NHS" },
      { country: "Canada", priceRange: "~CAD $250-350 (~$190-260)", notes: "Regulated" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 650,
  },

  tesamorelin: {
    slug: "tesamorelin",
    priceBreakdown: {
      listPricePerMonth: "~$4,000-$5,000/month",
      averageWholesalePrice: "~$3,800-$4,800/month",
      pharmacyAcquisitionEstimate: "~$3,500-$4,500/month",
      typicalNegotiatedRate: "~$2,800-$3,800/month",
      pricePerDose: "~$133 per 2 mg vial",
      annualCostAtListPrice: "~$48,000-$60,000",
    },
    pharmacyPriceComparison: [
      { pharmacy: "Specialty pharmacy", priceRange: "$3,800-$5,000/month", notes: "Required for distribution" },
      { pharmacy: "Patient assistance", priceRange: "$0/month", notes: "For eligible uninsured patients" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "~60-70% with HIV lipodystrophy documentation",
      medicarePartD: "Coverage variable; may require formulary exception",
      medicaid: "Some states cover with prior auth",
      vaCoverage: "Available through VA for eligible veterans",
      tricare: "Case-by-case coverage",
      employerPlanTypicalTier: "Tier 4-5 specialty; coinsurance 25-40%",
    },
    priorAuthGuide: {
      requiredDocumentation: ["HIV diagnosis", "Documented lipodystrophy (excess trunk fat)", "Stable antiretroviral therapy", "Conservative measures failed"],
      typicalDenialReasons: ["Non-HIV lipodystrophy", "Insufficient documentation", "Plan excludes cosmetic indications"],
      appealTemplatePoints: ["FDA-approved indication", "HIV-associated lipodystrophy documented", "Comorbidity impact (metabolic syndrome)"],
      expectedTimeline: "1-2 weeks",
    },
    savingsPrograms: [
      { name: "Egrifta Patient Assistance", type: "manufacturer", eligibility: "Uninsured/underinsured, ≤500% FPL", savings: "Free or reduced", incomeLimit: "≤500% FPL", enrollmentComplexity: "complex", notes: "Theratechnologies program" },
      { name: "Copay assistance", type: "copay", eligibility: "Commercially insured", savings: "May reduce to $0-$100", incomeLimit: "None", enrollmentComplexity: "moderate", notes: "Annual cap may apply" },
    ],
    genericBiosimilarStatus: { hasGeneric: false, expectedGenericDate: "No generic expected" },
    dosingCostImpact: [
      { dose: "2 mg daily", monthlyCost: "$4,000-$5,000", annualCost: "$48,000-$60,000" },
    ],
    costSavingStrategies: [
      "Apply for patient assistance immediately if uninsured",
      "Ensure thorough documentation of HIV lipodystrophy for prior auth",
      "Work with specialty pharmacy for insurance navigation",
    ],
    annualCostProjection: {
      year1: "$0-$60,000",
      year2: "$0-$60,000",
      year3: "$0-$60,000",
      assumptions: ["No generic", "PAP eligibility"],
    },
    internationalPriceComparison: [
      { country: "Canada", priceRange: "Limited availability", notes: "Specialty import" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 550,
  },

  sermorelin: {
    slug: "sermorelin",
    priceBreakdown: {
      listPricePerMonth: "Not commercially branded; compounding pricing",
      averageWholesalePrice: "N/A (compounded)",
      pharmacyAcquisitionEstimate: "N/A (compounded)",
      typicalNegotiatedRate: "N/A (cash pay)",
      pricePerDose: "~$7-15 per 0.2-0.5 mg dose",
      annualCostAtListPrice: "~$2,400-$5,400",
    },
    pharmacyPriceComparison: [
      { pharmacy: "Compounding pharmacy", priceRange: "$200-$450/month", notes: "Varies by pharmacy and concentration" },
      { pharmacy: "Online peptide retailers", priceRange: "$150-$350/month", notes: "Quality varies widely; COA verification essential" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "<5% for off-label anti-aging",
      medicarePartD: "Not covered for off-label use",
      medicaid: "Not covered",
      vaCoverage: "Not covered for off-label",
      tricare: "Not covered",
      employerPlanTypicalTier: "Not covered",
    },
    priorAuthGuide: {
      requiredDocumentation: ["Pediatric GH deficiency diagnosis (rare adult coverage)"],
      typicalDenialReasons: ["Off-label use", "Anti-aging not medically necessary"],
      appealTemplatePoints: ["Documented GH deficiency", "Low IGF-1"],
      expectedTimeline: "N/A (virtually never covered)",
    },
    savingsPrograms: [
      { name: "Compounding memberships", type: "pharmacy", eligibility: "Cash-pay patients", savings: "10-20% discount", incomeLimit: "None", enrollmentComplexity: "simple", notes: "Subscription models" },
    ],
    compoundedAlternative: {
      available: true,
      priceRange: "$150-$450/month",
      qualityConcerns: ["No FDA oversight", "Variable potency", "Sterility concerns", "Need third-party COA verification"],
      legalStatus: "Legal when prescribed by licensed physician and compounded by registered 503A pharmacy",
    },
    genericBiosimilarStatus: { hasGeneric: false, expectedGenericDate: "N/A" },
    dosingCostImpact: [
      { dose: "0.2 mg daily", monthlyCost: "$200", annualCost: "$2,400" },
      { dose: "0.5 mg daily", monthlyCost: "$450", annualCost: "$5,400" },
    ],
    costSavingStrategies: [
      "Shop multiple compounding pharmacies for best price",
      "Verify third-party COA before purchasing",
      "Avoid online retailers without prescription requirement",
      "Consider lower starting dose to assess response",
    ],
    annualCostProjection: {
      year1: "$2,400-$5,400",
      year2: "$2,400-$5,400",
      year3: "$2,400-$5,400",
      assumptions: ["Cash pay only", "Compounded product"],
    },
    internationalPriceComparison: [
      { country: "Mexico", priceRange: "$100-$250/month", notes: "Compounded; quality variable" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 500,
  },

  teriparatide: {
    slug: "teriparatide",
    priceBreakdown: {
      listPricePerMonth: "~$3,500/month (Forteo); ~$4,200/month (Bonsity authorized generic)",
      averageWholesalePrice: "~$3,200-$4,000/month",
      pharmacyAcquisitionEstimate: "~$3,000-$3,800/month",
      typicalNegotiatedRate: "~$2,200-$3,000/month",
      pricePerDose: "~$117 per 20 mcg dose",
      annualCostAtListPrice: "~$42,000-$50,400",
    },
    pharmacyPriceComparison: [
      { pharmacy: "Specialty pharmacy", priceRange: "$3,200-$4,200/month", notes: "Required distribution channel" },
      { pharmacy: "Bonsity (authorized generic)", priceRange: "Slightly lower than Forteo", notes: "Same active ingredient; may improve insurance coverage" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "~70-85% with documentation",
      medicarePartD: "Covered; may be in specialty tier",
      medicaid: "Most states cover with prior auth",
      vaCoverage: "On formulary for approved indications",
      tricare: "Covered with prior auth",
      employerPlanTypicalTier: "Tier 4-5 specialty; coinsurance 25-40% or high copay",
    },
    priorAuthGuide: {
      requiredDocumentation: ["DXA T-score ≤-2.5 with fracture history, or T-score ≤-3.0", "Bisphosphonate failure or intolerance (often required)", "Recent DXA report", "Fracture documentation"],
      typicalDenialReasons: ["No fracture history", "Bisphosphonate not tried", "T-score not severe enough", "Plan requires endocrinologist prescription"],
      appealTemplatePoints: ["Severe osteoporosis with fracture", "Bisphosphonate failure documented", "High fracture risk (FRAX score)", "Anabolic therapy clinically indicated"],
      expectedTimeline: "1-2 weeks",
    },
    savingsPrograms: [
      { name: "Forteo Patient Assistance", type: "manufacturer", eligibility: "Uninsured, ≤400% FPL", savings: "Free", incomeLimit: "≤400% FPL", enrollmentComplexity: "moderate", notes: "Eli Lilly program" },
      { name: "Savings card", type: "copay", eligibility: "Commercially insured", savings: "May reduce copay significantly", incomeLimit: "None", enrollmentComplexity: "simple", notes: "Annual cap" },
      { name: "Bonsity generic", type: "pharmacy", eligibility: "All patients", savings: "Lower cost than Forteo", incomeLimit: "None", enrollmentComplexity: "simple", notes: "Authorized generic" },
    ],
    genericBiosimilarStatus: { hasGeneric: true, genericPriceRange: "~10-20% below Forteo", expectedGenericDate: "Bonsity authorized generic available" },
    dosingCostImpact: [
      { dose: "20 mcg daily", monthlyCost: "$3,500-$4,200", annualCost: "$42,000-$50,400" },
    ],
    costSavingStrategies: [
      "Use Bonsity authorized generic if available",
      "Apply for patient assistance if uninsured",
      "Ensure thorough prior auth documentation (DXA, fracture history, bisphosphonate failure)",
      "Work with specialty pharmacy for insurance appeals",
      "Plan for sequential antiresorptive therapy cost after month 24",
    ],
    annualCostProjection: {
      year1: "$0-$50,400 (2-year therapy limit)",
      year2: "$0-$50,400",
      year3: "$0 (therapy complete; transition to antiresorptive)",
      assumptions: ["2-year cumulative limit", "Insurance/PAP reduces cost"],
    },
    internationalPriceComparison: [
      { country: "UK", priceRange: "~£250-350/month (~$320-450)", notes: "NHS" },
      { country: "Canada", priceRange: "~CAD $2,500-3,500 (~$1,900-2,600)", notes: "Regulated" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 600,
  },

  bremelanotide: {
    slug: "bremelanotide",
    priceBreakdown: {
      listPricePerMonth: "~$900-$1,200/month (4-8 doses)",
      averageWholesalePrice: "~$850-$1,100/month",
      pharmacyAcquisitionEstimate: "~$800-$1,000/month",
      typicalNegotiatedRate: "~$600-$850/month",
      pricePerDose: "~$113-$150 per 1.75 mg dose",
      annualCostAtListPrice: "~$10,800-$14,400",
    },
    pharmacyPriceComparison: [
      { pharmacy: "Retail", priceRange: "$850-$1,200/month", notes: "Cash price" },
      { pharmacy: "Specialty pharmacy", priceRange: "$800-$1,100/month", notes: "May offer better pricing" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "~30-40% for HSDD; many plans exclude sexual dysfunction",
      medicarePartD: "Rarely covered",
      medicaid: "Rarely covered",
      vaCoverage: "Case-by-case",
      tricare: "Limited",
      employerPlanTypicalTier: "Tier 3-4 if covered; often excluded entirely",
    },
    priorAuthGuide: {
      requiredDocumentation: ["HSDD diagnosis (acquired, generalized)", "Premenopausal status", "Failed counseling/therapy", "Flibanserin trial (sometimes required)"],
      typicalDenialReasons: ["Plan excludes sexual dysfunction drugs", "Postmenopausal (not approved)", "Insufficient documentation", "Lifestyle factors not addressed"],
      appealTemplatePoints: ["FDA-approved for acquired HSDD", "Premenopausal status confirmed", "Psychological intervention documented", "Medical condition affecting quality of life"],
      expectedTimeline: "1-2 weeks",
    },
    savingsPrograms: [
      { name: "Vyleesi Savings Card", type: "copay", eligibility: "Commercially insured", savings: "$0-$99/month", incomeLimit: "None", enrollmentComplexity: "simple", notes: "AMAG/Palatin program" },
      { name: "Patient Assistance", type: "manufacturer", eligibility: "Uninsured, ≤400% FPL", savings: "Free or reduced", incomeLimit: "≤400% FPL", enrollmentComplexity: "moderate", notes: "Limited availability" },
    ],
    genericBiosimilarStatus: { hasGeneric: false, expectedGenericDate: "No generic expected soon" },
    dosingCostImpact: [
      { dose: "1.75 mg as needed (4 doses/month)", monthlyCost: "$900", annualCost: "$10,800" },
      { dose: "1.75 mg as needed (8 doses/month)", monthlyCost: "$1,200", annualCost: "$14,400" },
    ],
    costSavingStrategies: [
      "Start with 4 doses/month to assess response before increasing",
      "Vyleesi savings card for commercially insured",
      "Check if employer plan has any sexual dysfunction coverage",
      "Document all prior interventions for prior auth",
    ],
    annualCostProjection: {
      year1: "$0-$14,400",
      year2: "$0-$14,400",
      year3: "$0-$14,400",
      assumptions: ["As-needed dosing", "Insurance variable"],
    },
    internationalPriceComparison: [
      { country: "UK", priceRange: "Limited availability", notes: "Not widely marketed" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 550,
  },

  octreotide: {
    slug: "octreotide",
    priceBreakdown: {
      listPricePerMonth: "~$3,000-$4,000/month (LAR)",
      averageWholesalePrice: "~$2,800-$3,800/month",
      pharmacyAcquisitionEstimate: "~$2,500-$3,500/month",
      typicalNegotiatedRate: "~$2,000-$2,800/month",
      pricePerDose: "~$3,000 per 20 mg LAR injection; ~$4,000 per 30 mg",
      annualCostAtListPrice: "~$36,000-$48,000",
    },
    pharmacyPriceComparison: [
      { pharmacy: "Specialty pharmacy", priceRange: "$2,800-$4,000/month", notes: "Required for LAR" },
      { pharmacy: "Hospital outpatient", priceRange: "Similar to specialty", notes: "May include administration fee" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "~80-90% for approved indications",
      medicarePartD: "Covered; may be Part B if administered in clinic",
      medicaid: "Most states cover",
      vaCoverage: "On formulary",
      tricare: "Covered",
      employerPlanTypicalTier: "Tier 4-5 specialty; coinsurance 20-40%",
    },
    priorAuthGuide: {
      requiredDocumentation: ["Acromegaly: elevated GH/IGF-1, MRI", "NETs: pathology confirmation, imaging", "Somatostatin receptor imaging (Octreoscan/Ga-68 DOTATATE) if applicable"],
      typicalDenialReasons: ["No biomarker confirmation", "Plan requires specialist prescription", "Experimental use"],
      appealTemplatePoints: ["FDA-approved indication", "Biochemical confirmation", "Tumor imaging documented", "Standard of care"],
      expectedTimeline: "3-7 days",
    },
    savingsPrograms: [
      { name: "Novartis Patient Assistance", type: "manufacturer", eligibility: "Uninsured, ≤400% FPL", savings: "Free", incomeLimit: "≤400% FPL", enrollmentComplexity: "moderate", notes: "Annual application" },
      { name: "Copay assistance", type: "copay", eligibility: "Commercially insured", savings: "May reduce significantly", incomeLimit: "None", enrollmentComplexity: "simple", notes: "Annual cap" },
    ],
    genericBiosimilarStatus: { hasGeneric: false, expectedGenericDate: "No generic LAR expected" },
    dosingCostImpact: [
      { dose: "20 mg LAR monthly", monthlyCost: "$3,000", annualCost: "$36,000" },
      { dose: "30 mg LAR monthly", monthlyCost: "$4,000", annualCost: "$48,000" },
    ],
    costSavingStrategies: [
      "Apply for Novartis PAP if uninsured",
      "Ensure biomarker confirmation for prior auth",
      "Short-acting octreotide is cheaper but requires 2-3x daily dosing",
      "Work with specialty pharmacy for insurance navigation",
    ],
    annualCostProjection: {
      year1: "$0-$48,000",
      year2: "$0-$48,000",
      year3: "$0-$48,000",
      assumptions: ["Chronic therapy", "Insurance coverage"],
    },
    internationalPriceComparison: [
      { country: "UK", priceRange: "~£400-600/month (~$500-750)", notes: "NHS" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 550,
  },

  triptorelin: {
    slug: "triptorelin",
    priceBreakdown: {
      listPricePerMonth: "~$1,500-$3,000/month depending on depot",
      averageWholesalePrice: "~$1,400-$2,800/month",
      pharmacyAcquisitionEstimate: "~$1,300-$2,500/month",
      typicalNegotiatedRate: "~$1,000-$2,000/month",
      pricePerDose: "~$1,500 per 3.75 mg; ~$4,500 per 11.25 mg; ~$9,000 per 22.5 mg",
      annualCostAtListPrice: "~$18,000-$36,000",
    },
    pharmacyPriceComparison: [
      { pharmacy: "Specialty pharmacy", priceRange: "$1,400-$3,000/month", notes: "Required" },
      { pharmacy: "Hospital outpatient", priceRange: "Similar plus admin fee", notes: "May include injection fee" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "~90-95% for oncology/gynecology indications",
      medicarePartD: "Covered; may be Part B",
      medicaid: "Covered for approved indications",
      vaCoverage: "On formulary",
      tricare: "Covered",
      employerPlanTypicalTier: "Tier 3-4; copay $50-150 or coinsurance 20-30%",
    },
    priorAuthGuide: {
      requiredDocumentation: ["Prostate cancer: pathology, staging", "Endometriosis: surgical/laparoscopic confirmation", "Precocious puberty: bone age, LH/FSH"],
      typicalDenialReasons: ["Off-label use", "Insufficient staging documentation", "Not prescribed by specialist"],
      appealTemplatePoints: ["FDA-approved indication", "Pathology confirmed", "Specialist-prescribed", "Standard of care"],
      expectedTimeline: "3-5 days",
    },
    savingsPrograms: [
      { name: "Manufacturer PAP", type: "manufacturer", eligibility: "Uninsured, ≤400% FPL", savings: "Free or reduced", incomeLimit: "≤400% FPL", enrollmentComplexity: "moderate", notes: "Annual application" },
      { name: "Copay card", type: "copay", eligibility: "Commercially insured", savings: "May reduce significantly", incomeLimit: "None", enrollmentComplexity: "simple", notes: "Annual cap" },
    ],
    genericBiosimilarStatus: { hasGeneric: false, expectedGenericDate: "No generic depot expected soon" },
    dosingCostImpact: [
      { dose: "3.75 mg monthly", monthlyCost: "$1,500", annualCost: "$18,000" },
      { dose: "11.25 mg quarterly", monthlyCost: "$1,500", annualCost: "$18,000" },
      { dose: "22.5 mg semi-annual", monthlyCost: "$1,500", annualCost: "$18,000" },
    ],
    costSavingStrategies: [
      "Choose longer depot intervals (3 or 6 months) to reduce injection and admin costs",
      "Apply for PAP if uninsured",
      "Ensure specialist prescription for smoother prior auth",
    ],
    annualCostProjection: {
      year1: "$1,200-$36,000",
      year2: "$1,200-$36,000",
      year3: "$1,200-$36,000",
      assumptions: ["Ongoing therapy for prostate cancer", "Interval affects total cost"],
    },
    internationalPriceComparison: [
      { country: "UK", priceRange: "~£300-600/month (~$380-760)", notes: "NHS" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 550,
  },

  desmopressin: {
    slug: "desmopressin",
    priceBreakdown: {
      listPricePerMonth: "~$100-$300/month (oral); ~$200-$400/month (intranasal)",
      averageWholesalePrice: "~$90-$280/month",
      pharmacyAcquisitionEstimate: "~$80-$250/month",
      typicalNegotiatedRate: "~$50-$200/month",
      pricePerDose: "~$3 per 0.2 mg tablet; ~$7 per 10 mcg nasal spray",
      annualCostAtListPrice: "~$1,200-$3,600",
    },
    pharmacyPriceComparison: [
      { pharmacy: "Retail chains", priceRange: "$100-$300/month", notes: "Brand pricing" },
      { pharmacy: "Generic (oral)", priceRange: "$30-$80/month", notes: "Generic tablets widely available" },
      { pharmacy: "Walmart/generic programs", priceRange: "$10-$30/month", notes: "Some generics on $4 lists" },
      { pharmacy: "GoodRx", priceRange: "$20-$100/month", notes: "Significant savings on generics" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "~80-90% for central DI",
      medicarePartD: "Covered; generic preferred",
      medicaid: "Covered; generic preferred",
      vaCoverage: "On formulary",
      tricare: "Covered",
      employerPlanTypicalTier: "Tier 1-2 (generic); copay $5-30",
    },
    priorAuthGuide: {
      requiredDocumentation: ["Central DI diagnosis (water deprivation test, AVP levels)", "Nocturnal enuresis: failed behavioral interventions"],
      typicalDenialReasons: ["Nephrogenic DI (desmopressin will not work)", "Psychogenic polydipsia", "Brand requested when generic available"],
      appealTemplatePoints: ["Confirmed central DI", "Failed conservative management", "Medically necessary"],
      expectedTimeline: "1-3 days",
    },
    savingsPrograms: [
      { name: "Generic programs", type: "pharmacy", eligibility: "All patients", savings: "$10-$30/month", incomeLimit: "None", enrollmentComplexity: "simple", notes: "Walmart, Costco, etc." },
    ],
    genericBiosimilarStatus: { hasGeneric: true, genericPriceRange: "$30-$80/month (oral tablets)" },
    dosingCostImpact: [
      { dose: "0.1 mg BID (oral)", monthlyCost: "$100", annualCost: "$1,200" },
      { dose: "0.2 mg BID (oral)", monthlyCost: "$200", annualCost: "$2,400" },
      { dose: "Generic 0.2 mg BID", monthlyCost: "$40", annualCost: "$480" },
    ],
    costSavingStrategies: [
      "Use generic oral tablets whenever possible — dramatically cheaper",
      "Shop pharmacy discount programs ($4 generics)",
      "Intranasal is more expensive and less reliable — reserve for patients who cannot take oral",
      "GoodRx often beats insurance copay on generics",
    ],
    annualCostProjection: {
      year1: "$120-$2,400 (generic vs brand)",
      year2: "$120-$2,400",
      year3: "$120-$2,400",
      assumptions: ["Generic available", "Stable dosing"],
    },
    internationalPriceComparison: [
      { country: "UK", priceRange: "~£10-30/month (~$13-38)", notes: "NHS generic" },
      { country: "Canada", priceRange: "~CAD $40-100 (~$30-75)", notes: "Generic" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 500,
  },

  setmelanotide: {
    slug: "setmelanotide",
    priceBreakdown: {
      listPricePerMonth: "~$15,000-$20,000/month",
      averageWholesalePrice: "~$14,000-$19,000/month",
      pharmacyAcquisitionEstimate: "~$13,000-$17,000/month",
      typicalNegotiatedRate: "~$10,000-$15,000/month",
      pricePerDose: "~$500 per 1-3 mg daily dose",
      annualCostAtListPrice: "~$180,000-$240,000",
    },
    pharmacyPriceComparison: [
      { pharmacy: "Specialty pharmacy", priceRange: "$15,000-$20,000/month", notes: "Required" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "~60-70% with genetic diagnosis",
      medicarePartD: "Case-by-case; rare disease protocols",
      medicaid: "Some states cover with extensive documentation",
      vaCoverage: "Case-by-case",
      tricare: "Case-by-case",
      employerPlanTypicalTier: "Tier 5 specialty; coinsurance or max out-of-pocket",
    },
    priorAuthGuide: {
      requiredDocumentation: ["Genetic test confirming biallelic POMC, PCSK1, or LEPR deficiency", "Age ≥6 years", "Severe obesity with hyperphagia", "Specialist attestation"],
      typicalDenialReasons: ["No genetic confirmation", "MC4R mutation (not responsive)", "Common polygenic obesity", "Age outside approved range"],
      appealTemplatePoints: ["Ultra-rare genetic disease", "FDA-approved indication", "Genetic test attached", "No alternative therapy", "Life-transforming potential"],
      expectedTimeline: "2-4 weeks (complex cases)",
    },
    savingsPrograms: [
      { name: "Rhythm PAP", type: "manufacturer", eligibility: "Uninsured/underinsured", savings: "May provide at no cost", incomeLimit: "Case-by-case", enrollmentComplexity: "complex", notes: "Case management included" },
      { name: "Copay assistance", type: "copay", eligibility: "Commercially insured", savings: "May reduce to $0", incomeLimit: "None", enrollmentComplexity: "moderate", notes: "Annual cap" },
    ],
    genericBiosimilarStatus: { hasGeneric: false, expectedGenericDate: "No generic expected" },
    dosingCostImpact: [
      { dose: "2-3 mg daily", monthlyCost: "$15,000-$20,000", annualCost: "$180,000-$240,000" },
    ],
    costSavingStrategies: [
      "Genetic testing and specialist documentation are critical for coverage",
      "Apply for manufacturer PAP immediately if any coverage gaps",
      "Work with patient advocate for appeals",
      "Explore state high-risk pools or rare disease programs",
    ],
    annualCostProjection: {
      year1: "$0-$240,000",
      year2: "$0-$240,000",
      year3: "$0-$240,000",
      assumptions: ["Ultra-rare indication", "Insurance variable"],
    },
    internationalPriceComparison: [
      { country: "UK", priceRange: "NHS negotiated (confidential)", notes: "NICE evaluation" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 500,
  },

  linaclotide: {
    slug: "linaclotide",
    priceBreakdown: {
      listPricePerMonth: "~$400-$500/month",
      averageWholesalePrice: "~$380-$480/month",
      pharmacyAcquisitionEstimate: "~$350-$450/month",
      typicalNegotiatedRate: "~$250-$350/month",
      pricePerDose: "~$13 per 145 mcg; ~$17 per 290 mcg",
      annualCostAtListPrice: "~$4,800-$6,000",
    },
    pharmacyPriceComparison: [
      { pharmacy: "Retail", priceRange: "$380-$500/month", notes: "Brand pricing" },
      { pharmacy: "GoodRx", priceRange: "$300-$450/month", notes: "Discounted" },
      { pharmacy: "Costco", priceRange: "$350-$480/month", notes: "Slight discount" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "~70-80% after step therapy",
      medicarePartD: "Covered",
      medicaid: "Most states cover with prior auth",
      vaCoverage: "On formulary",
      tricare: "Covered",
      employerPlanTypicalTier: "Tier 2-3; copay $30-75",
    },
    priorAuthGuide: {
      requiredDocumentation: ["IBS-C or CIC diagnosis", "Failed fiber supplements", "Failed osmotic laxative (PEG)", "Failed lubiprostone (sometimes required)"],
      typicalDenialReasons: ["Step therapy not completed", "OTC alternatives not tried", "Diagnosis not confirmed"],
      appealTemplatePoints: ["FDA-approved for IBS-C/CIC", "Failed conservative measures", "Significant quality of life impact", "Guideline-concordant"],
      expectedTimeline: "3-5 days",
    },
    savingsPrograms: [
      { name: "Linzess Savings Card", type: "copay", eligibility: "Commercially insured", savings: "$30/month", incomeLimit: "None", enrollmentComplexity: "simple", notes: "AbbVie program" },
      { name: "AbbVie PAP", type: "manufacturer", eligibility: "Uninsured, ≤400% FPL", savings: "Free", incomeLimit: "≤400% FPL", enrollmentComplexity: "moderate", notes: "Annual application" },
    ],
    genericBiosimilarStatus: { hasGeneric: false, expectedGenericDate: "Generic expected late 2020s" },
    dosingCostImpact: [
      { dose: "72 mcg (CIC lowest)", monthlyCost: "$400", annualCost: "$4,800" },
      { dose: "145 mcg (CIC standard)", monthlyCost: "$400", annualCost: "$4,800" },
      { dose: "290 mcg (IBS-C)", monthlyCost: "$500", annualCost: "$6,000" },
    ],
    costSavingStrategies: [
      "Linzess savings card reduces copay to $30",
      "Start with lowest effective dose for CIC (72-145 mcg)",
      "Ensure step therapy documented (fiber, PEG failed)",
      "GoodRx may beat insurance on cash price",
    ],
    annualCostProjection: {
      year1: "$360-$6,000",
      year2: "$360-$6,000",
      year3: "$360-$6,000 (generic may emerge)",
      assumptions: ["Brand pricing until generic", "Insurance coverage"],
    },
    internationalPriceComparison: [
      { country: "UK", priceRange: "~£80-120/month (~$100-150)", notes: "NHS" },
      { country: "Canada", priceRange: "~CAD $300-400 (~$220-300)", notes: "Regulated" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 500,
  },

  plecanatide: {
    slug: "plecanatide",
    priceBreakdown: {
      listPricePerMonth: "~$400-$500/month",
      averageWholesalePrice: "~$380-$480/month",
      pharmacyAcquisitionEstimate: "~$350-$450/month",
      typicalNegotiatedRate: "~$250-$350/month",
      pricePerDose: "~$13 per 3 mg",
      annualCostAtListPrice: "~$4,800-$6,000",
    },
    pharmacyPriceComparison: [
      { pharmacy: "Retail", priceRange: "$380-$500/month", notes: "Brand" },
      { pharmacy: "GoodRx", priceRange: "$300-$450/month", notes: "Discounted" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "~70-80% after step therapy",
      medicarePartD: "Covered",
      medicaid: "Most states cover with prior auth",
      vaCoverage: "On formulary",
      tricare: "Covered",
      employerPlanTypicalTier: "Tier 2-3; copay $30-75",
    },
    priorAuthGuide: {
      requiredDocumentation: ["CIC or IBS-C diagnosis", "Failed fiber and PEG", "Sometimes failed lubiprostone or linaclotide"],
      typicalDenialReasons: ["Step therapy incomplete", "Not failed cheaper alternatives"],
      appealTemplatePoints: ["FDA-approved", "Failed first-line therapy", "Better tolerability than linaclotide (lower diarrhea rate)"],
      expectedTimeline: "3-5 days",
    },
    savingsPrograms: [
      { name: "Trulance Savings Card", type: "copay", eligibility: "Commercially insured", savings: "$25/month", incomeLimit: "None", enrollmentComplexity: "simple", notes: "Bausch Health program" },
      { name: "PAP", type: "manufacturer", eligibility: "Uninsured, ≤400% FPL", savings: "Free", incomeLimit: "≤400% FPL", enrollmentComplexity: "moderate", notes: "Annual" },
    ],
    genericBiosimilarStatus: { hasGeneric: false, expectedGenericDate: "Generic expected late 2020s-early 2030s" },
    dosingCostImpact: [
      { dose: "3 mg daily", monthlyCost: "$400-$500", annualCost: "$4,800-$6,000" },
    ],
    costSavingStrategies: [
      "Trulance savings card ($25/month)",
      "Document linaclotide intolerance if switching",
      "GoodRx comparison",
    ],
    annualCostProjection: {
      year1: "$300-$6,000",
      year2: "$300-$6,000",
      year3: "$300-$6,000",
      assumptions: ["Brand pricing", "Insurance"],
    },
    internationalPriceComparison: [
      { country: "UK", priceRange: "~£80-120/month (~$100-150)", notes: "NHS" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 450,
  },

  teduglutide: {
    slug: "teduglutide",
    priceBreakdown: {
      listPricePerMonth: "~$25,000-$35,000/month",
      averageWholesalePrice: "~$23,000-$33,000/month",
      pharmacyAcquisitionEstimate: "~$22,000-$30,000/month",
      typicalNegotiatedRate: "~$18,000-$25,000/month",
      pricePerDose: "~$833 per 5 mg vial (0.05 mg/kg daily)",
      annualCostAtListPrice: "~$300,000-$420,000",
    },
    pharmacyPriceComparison: [
      { pharmacy: "Specialty pharmacy", priceRange: "$25,000-$35,000/month", notes: "REMS-required distribution" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "~80-90% with SBS diagnosis and REMS",
      medicarePartD: "Covered as specialty",
      medicaid: "Most states cover with extensive documentation",
      vaCoverage: "Case-by-case",
      tricare: "Case-by-case",
      employerPlanTypicalTier: "Tier 5 specialty; max out-of-pocket often applies",
    },
    priorAuthGuide: {
      requiredDocumentation: ["Short bowel syndrome diagnosis", "Parenteral nutrition dependence", "Stable clinical status", "REMS enrollment", "GI specialist attestation"],
      typicalDenialReasons: ["Insufficient SBS documentation", "Not PN-dependent", "REMS not completed", "Unstable condition"],
      appealTemplatePoints: ["FDA-approved for SBS", "PN-dependent", "REMS enrolled", "GI specialist managing", "Cost offset by reduced PN costs"],
      expectedTimeline: "2-4 weeks",
    },
    savingsPrograms: [
      { name: "Gattex OneSource", type: "manufacturer", eligibility: "All patients", savings: "Navigation and copay support", incomeLimit: "None", enrollmentComplexity: "moderate", notes: "Takeda program coordinates insurance and PAP" },
      { name: "Takeda PAP", type: "manufacturer", eligibility: "Uninsured/underinsured", savings: "May provide at reduced or no cost", incomeLimit: "Case-by-case", enrollmentComplexity: "complex", notes: "Requires extensive documentation" },
    ],
    genericBiosimilarStatus: { hasGeneric: false, expectedGenericDate: "No generic expected" },
    dosingCostImpact: [
      { dose: "0.05 mg/kg daily", monthlyCost: "$25,000-$35,000", annualCost: "$300,000-$420,000" },
    ],
    costSavingStrategies: [
      "Gattex OneSource is essential for insurance navigation",
      "Document PN volume and costs to demonstrate cost offset",
      "REMS enrollment must be completed before dispensing",
      "Explore foundation assistance if insurance gaps remain",
    ],
    annualCostProjection: {
      year1: "$0-$420,000",
      year2: "$0-$420,000",
      year3: "$0-$420,000",
      assumptions: ["Ultra-rare indication", "PN cost offset significant"],
    },
    internationalPriceComparison: [
      { country: "UK", priceRange: "NHS specialized commissioning", notes: "Case-by-case funding" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 500,
  },

  abaloparatide: {
    slug: "abaloparatide",
    priceBreakdown: {
      listPricePerMonth: "~$3,500-$4,000/month",
      averageWholesalePrice: "~$3,200-$3,800/month",
      pharmacyAcquisitionEstimate: "~$3,000-$3,500/month",
      typicalNegotiatedRate: "~$2,200-$2,800/month",
      pricePerDose: "~$117 per 80 mcg",
      annualCostAtListPrice: "~$42,000-$48,000",
    },
    pharmacyPriceComparison: [
      { pharmacy: "Specialty pharmacy", priceRange: "$3,200-$4,000/month", notes: "Required" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "~70-85% with documentation",
      medicarePartD: "Covered",
      medicaid: "Most states cover with prior auth",
      vaCoverage: "On formulary",
      tricare: "Covered with prior auth",
      employerPlanTypicalTier: "Tier 4-5 specialty; coinsurance 25-40%",
    },
    priorAuthGuide: {
      requiredDocumentation: ["DXA T-score ≤-2.5 with fracture or T-score ≤-3.0", "Bisphosphonate failure or intolerance (often required)", "Recent DXA", "Fracture documentation"],
      typicalDenialReasons: ["No fracture history", "Bisphosphonate not tried", "T-score not severe enough"],
      appealTemplatePoints: ["Severe osteoporosis", "Bisphosphonate failure", "High fracture risk", "Anabolic therapy indicated"],
      expectedTimeline: "1-2 weeks",
    },
    savingsPrograms: [
      { name: "Tymlos PAP", type: "manufacturer", eligibility: "Uninsured, ≤400% FPL", savings: "Free", incomeLimit: "≤400% FPL", enrollmentComplexity: "moderate", notes: "Radius Health program" },
      { name: "Savings card", type: "copay", eligibility: "Commercially insured", savings: "May reduce significantly", incomeLimit: "None", enrollmentComplexity: "simple", notes: "Annual cap" },
    ],
    genericBiosimilarStatus: { hasGeneric: false, expectedGenericDate: "No generic expected before patent expiry" },
    dosingCostImpact: [
      { dose: "80 mcg daily", monthlyCost: "$3,500-$4,000", annualCost: "$42,000-$48,000" },
    ],
    costSavingStrategies: [
      "Apply for PAP if uninsured",
      "Document bisphosphonate failure thoroughly",
      "Compare to teriparatide pricing — may be similar",
      "Plan for antiresorptive continuation cost after 2 years",
    ],
    annualCostProjection: {
      year1: "$0-$48,000",
      year2: "$0-$48,000",
      year3: "$0 (transition to antiresorptive)",
      assumptions: ["2-year limit", "Insurance/PAP"],
    },
    internationalPriceComparison: [
      { country: "UK", priceRange: "~£250-350/month (~$320-450)", notes: "NHS" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 500,
  },

  lanreotide: {
    slug: "lanreotide",
    priceBreakdown: {
      listPricePerMonth: "~$4,000-$5,000/month",
      averageWholesalePrice: "~$3,800-$4,800/month",
      pharmacyAcquisitionEstimate: "~$3,500-$4,500/month",
      typicalNegotiatedRate: "~$2,800-$3,800/month",
      pricePerDose: "~$4,000 per 120 mg injection",
      annualCostAtListPrice: "~$48,000-$60,000",
    },
    pharmacyPriceComparison: [
      { pharmacy: "Specialty pharmacy", priceRange: "$3,800-$5,000/month", notes: "Required" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "~80-90% for approved indications",
      medicarePartD: "May be Part B (administered in clinic)",
      medicaid: "Most states cover",
      vaCoverage: "On formulary",
      tricare: "Covered",
      employerPlanTypicalTier: "Tier 4-5 specialty; coinsurance 20-40%",
    },
    priorAuthGuide: {
      requiredDocumentation: ["Acromegaly: GH/IGF-1, MRI", "NETs: pathology, imaging, receptor status", "Specialist prescription"],
      typicalDenialReasons: ["No biomarker confirmation", "Off-label use", "Not specialist-prescribed"],
      appealTemplatePoints: ["FDA-approved", "Biochemical confirmation", "Standard of care", "CLARINET data for NETs"],
      expectedTimeline: "3-7 days",
    },
    savingsPrograms: [
      { name: "Ipsen PAP", type: "manufacturer", eligibility: "Uninsured, ≤400% FPL", savings: "Free", incomeLimit: "≤400% FPL", enrollmentComplexity: "moderate", notes: "Annual" },
      { name: "Copay assistance", type: "copay", eligibility: "Commercially insured", savings: "May reduce significantly", incomeLimit: "None", enrollmentComplexity: "simple", notes: "Cap applies" },
    ],
    genericBiosimilarStatus: { hasGeneric: false, expectedGenericDate: "No generic expected" },
    dosingCostImpact: [
      { dose: "90 mg monthly", monthlyCost: "$4,000", annualCost: "$48,000" },
      { dose: "120 mg monthly", monthlyCost: "$5,000", annualCost: "$60,000" },
    ],
    costSavingStrategies: [
      "Apply for Ipsen PAP if uninsured",
      "Ensure biomarker documentation for smooth prior auth",
      "Compare to octreotide pricing — choose based on efficacy and tolerability, not just cost",
    ],
    annualCostProjection: {
      year1: "$0-$60,000",
      year2: "$0-$60,000",
      year3: "$0-$60,000",
      assumptions: ["Chronic therapy", "Insurance"],
    },
    internationalPriceComparison: [
      { country: "UK", priceRange: "~£500-700/month (~$630-880)", notes: "NHS" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 450,
  },

  ziconotide: {
    slug: "ziconotide",
    priceBreakdown: {
      listPricePerMonth: "~$2,500-$3,500/month (drug only)",
      averageWholesalePrice: "~$2,300-$3,300/month",
      pharmacyAcquisitionEstimate: "~$2,100-$3,000/month",
      typicalNegotiatedRate: "~$1,800-$2,500/month",
      pricePerDose: "~$85 per 100 mcg vial; ~$425 per 500 mcg vial",
      annualCostAtListPrice: "~$30,000-$42,000 (drug only; pump and procedure costs additional)",
    },
    pharmacyPriceComparison: [
      { pharmacy: "Specialty pharmacy", priceRange: "$2,300-$3,500/month", notes: "Required" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "~70-80% for refractory pain",
      medicarePartD: "May be Part B (pump/device)",
      medicaid: "Case-by-case; requires specialist attestation",
      vaCoverage: "Available through pain management",
      tricare: "Case-by-case",
      employerPlanTypicalTier: "Tier 5 specialty; often requires medical necessity review",
    },
    priorAuthGuide: {
      requiredDocumentation: ["Severe chronic pain diagnosis", "Failure of oral/transdermal opioids and adjuvants", "Pain specialist attestation", "Intrathecal therapy candidate evaluation"],
      typicalDenialReasons: ["Not refractory enough", "No specialist involvement", "Plan requires less invasive alternatives first", "Psychiatric contraindications"],
      appealTemplatePoints: ["Refractory to all conventional therapy", "Pain specialist evaluation attached", "Intrathecal therapy appropriate", "No respiratory depression risk (advantage over opioids)", "Improves quality of life"],
      expectedTimeline: "2-4 weeks",
    },
    savingsPrograms: [
      { name: "Manufacturer PAP", type: "manufacturer", eligibility: "Uninsured/underinsured", savings: "May provide at reduced cost", incomeLimit: "Case-by-case", enrollmentComplexity: "complex", notes: "Limited program" },
    ],
    genericBiosimilarStatus: { hasGeneric: false, expectedGenericDate: "No generic expected" },
    dosingCostImpact: [
      { dose: "0.1-0.5 mcg/hour", monthlyCost: "$2,500-$3,000", annualCost: "$30,000-$36,000" },
      { dose: "0.5-0.8 mcg/hour", monthlyCost: "$3,000-$3,500", annualCost: "$36,000-$42,000" },
    ],
    costSavingStrategies: [
      "Pump implantation and refills are major costs beyond drug — negotiate bundled pricing with center",
      "Document exhaustive failed therapies for prior auth",
      "Consider intrathecal morphine combination if ziconotide alone insufficient (may reduce doses)",
      "VA and academic pain centers may offer more favorable pricing",
    ],
    annualCostProjection: {
      year1: "$40,000-$60,000 (includes pump implant)",
      year2: "$30,000-$45,000 (maintenance)",
      year3: "$30,000-$45,000",
      assumptions: ["Implant cost year 1", "Pump replacement every 5-7 years"],
    },
    internationalPriceComparison: [
      { country: "UK", priceRange: "NHS specialized pain service", notes: "Limited availability" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 500,
  },

  vosoritide: {
    slug: "vosoritide",
    priceBreakdown: {
      listPricePerMonth: "~$30,000-$40,000/month",
      averageWholesalePrice: "~$28,000-$38,000/month",
      pharmacyAcquisitionEstimate: "~$26,000-$35,000/month",
      typicalNegotiatedRate: "~$22,000-$30,000/month",
      pricePerDose: "~$1,000 per daily injection (weight-based)",
      annualCostAtListPrice: "~$360,000-$480,000",
    },
    pharmacyPriceComparison: [
      { pharmacy: "Specialty pharmacy", priceRange: "$30,000-$40,000/month", notes: "REMS-required" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "~60-70% with genetic diagnosis",
      medicarePartD: "Rare; case-by-case",
      medicaid: "Some states cover with extensive documentation",
      vaCoverage: "Case-by-case",
      tricare: "Case-by-case",
      employerPlanTypicalTier: "Tier 5 specialty; max out-of-pocket",
    },
    priorAuthGuide: {
      requiredDocumentation: ["Genetic confirmation of achondroplasia", "Open growth plates (bone age)", "Age 5-14 years", "Pediatric endocrinologist attestation"],
      typicalDenialReasons: ["No genetic test", "Closed growth plates", "Outside approved age range", "Not prescribed by pediatric endocrinologist"],
      appealTemplatePoints: ["FDA-approved for achondroplasia", "Genetic test attached", "Open growth plates confirmed", "No alternative therapy", "First-ever treatment for this condition"],
      expectedTimeline: "2-4 weeks",
    },
    savingsPrograms: [
      { name: "BioMarin PAP", type: "manufacturer", eligibility: "Uninsured/underinsured", savings: "May provide at reduced or no cost", incomeLimit: "Case-by-case", enrollmentComplexity: "complex", notes: "Extensive application" },
      { name: "Copay assistance", type: "copay", eligibility: "Commercially insured", savings: "May reduce to $0", incomeLimit: "None", enrollmentComplexity: "moderate", notes: "Annual cap" },
    ],
    genericBiosimilarStatus: { hasGeneric: false, expectedGenericDate: "No generic expected" },
    dosingCostImpact: [
      { dose: "15 mcg/kg daily", monthlyCost: "$30,000-$40,000", annualCost: "$360,000-$480,000" },
    ],
    costSavingStrategies: [
      "Genetic testing and specialist documentation are essential",
      "Apply for BioMarin PAP immediately if coverage gaps",
      "Work with patient advocate for appeals",
      "Explore state rare disease programs",
    ],
    annualCostProjection: {
      year1: "$0-$480,000",
      year2: "$0-$480,000",
      year3: "$0-$480,000",
      assumptions: ["Ultra-rare genetic disease", "Insurance variable"],
    },
    internationalPriceComparison: [
      { country: "UK", priceRange: "NHS specialized commissioning", notes: "NICE evaluation" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 500,
  },

  oxytocin: {
    slug: "oxytocin",
    priceBreakdown: {
      listPricePerMonth: "Not applicable; per-dose pricing ~$5-$20",
      averageWholesalePrice: "~$4-$15 per dose",
      pharmacyAcquisitionEstimate: "~$3-$12 per dose",
      typicalNegotiatedRate: "~$2-$10 per dose",
      pricePerDose: "~$5-$10 per 10 unit vial; ~$15-$20 per pre-filled syringe",
      annualCostAtListPrice: "Not applicable (episodic use)",
    },
    pharmacyPriceComparison: [
      { pharmacy: "Hospital pharmacy", priceRange: "$5-$15/dose", notes: "Institutional pricing" },
      { pharmacy: "Retail", priceRange: "$10-$25/dose", notes: "Cash price" },
      { pharmacy: "Generic vial", priceRange: "$3-$8/dose", notes: "Generic widely available" },
    ],
    insuranceLandscape: {
      commercialCoverageRate: "100% for obstetric use (universal standard of care)",
      medicarePartD: "Not applicable (hospital-based obstetric use)",
      medicaid: "100% covered",
      vaCoverage: "100% covered",
      tricare: "100% covered",
      employerPlanTypicalTier: "Universal coverage; no patient cost in delivery setting",
    },
    priorAuthGuide: {
      requiredDocumentation: ["None for obstetric use"],
      typicalDenialReasons: ["None — universal coverage"],
      appealTemplatePoints: ["WHO Essential Medicine", "Standard of care"],
      expectedTimeline: "Not applicable",
    },
    savingsPrograms: [
      { name: "Universal coverage", type: "pharmacy", eligibility: "All obstetric patients", savings: "$0 patient cost", incomeLimit: "None", enrollmentComplexity: "simple", notes: "Included in delivery costs globally" },
    ],
    genericBiosimilarStatus: { hasGeneric: true, genericPriceRange: "$3-$8 per dose" },
    dosingCostImpact: [
      { dose: "Labor induction (IV infusion)", monthlyCost: "$15-$50", annualCost: "N/A" },
      { dose: "PPH prophylaxis (10 IU IM)", monthlyCost: "$5-$15", annualCost: "N/A" },
    ],
    costSavingStrategies: [
      "Generic vials are standard and very inexpensive",
      "Pre-filled syringes cost more but reduce preparation errors",
      "No cost barrier anywhere in the world",
    ],
    annualCostProjection: {
      year1: "$0-$100 (episodic)",
      year2: "$0-$100",
      year3: "$0-$100",
      assumptions: ["Episodic obstetric use", "Universal coverage"],
    },
    internationalPriceComparison: [
      { country: "All countries", priceRange: "$2-$20 per dose", notes: "WHO Essential Medicine; universally available" },
    ],
    reviewerId: "marcus-williams-pharmd",
    lastReviewed: "2026-04-27",
    wordCount: 450,
  },
};

export function getEnrichedCost(slug: string): EnrichedCostContent | undefined {
  return enrichedCosts[slug];
}

export function hasEnrichedCostContent(slug: string): boolean {
  return slug in enrichedCosts;
}
