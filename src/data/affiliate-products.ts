import { amazonSearch } from "@/lib/affiliate";

export type AffiliateCategory =
  | "skincare"
  | "glp1-support"
  | "recovery"
  | "reconstitution"
  | "books"
  | "nutrition";

export interface AffiliateProduct {
  title: string;
  description: string;
  priceRange: string;
  url: string;
}

// ── Skincare ────────────────────────────────────────────────────────────────
const skincareProducts: AffiliateProduct[] = [
  {
    title: "Copper Peptide Serum (GHK-Cu)",
    description: "Stabilized copper-peptide complex for collagen support, skin firmness, and wound repair.",
    priceRange: "$15–45",
    url: amazonSearch("copper peptide face serum GHK-Cu"),
  },
  {
    title: "Multi-Peptide Moisturizer (Matrixyl)",
    description: "Targets fine lines and elasticity loss via signal peptides that stimulate collagen synthesis.",
    priceRange: "$20–55",
    url: amazonSearch("matrixyl peptide anti-aging moisturizer"),
  },
  {
    title: "Retinol + Peptide Night Cream",
    description: "Combines retinoids with signal peptides for accelerated overnight skin renewal.",
    priceRange: "$18–40",
    url: amazonSearch("retinol peptide night cream anti-aging"),
  },
  {
    title: "Peptide Eye Serum",
    description: "Targets crow's feet and under-eye hollows with a concentrated peptide blend.",
    priceRange: "$20–50",
    url: amazonSearch("peptide eye serum dark circles wrinkles"),
  },
];

// ── GLP-1 Support ────────────────────────────────────────────────────────────
const glp1SupportProducts: AffiliateProduct[] = [
  {
    title: "LMNT Electrolyte Packets",
    description: "Sodium-focused electrolytes to prevent dehydration and fatigue common in early GLP-1 therapy.",
    priceRange: "$30–45",
    url: amazonSearch("LMNT electrolyte packets zero sugar variety"),
  },
  {
    title: "High-Protein Shakes (30g)",
    description: "Convenient protein shakes to maintain muscle mass on reduced GLP-1 caloric intake.",
    priceRange: "$28–42",
    url: amazonSearch("premier protein shake 30g high protein low carb"),
  },
  {
    title: "Metamucil Fiber Supplement",
    description: "Soluble fiber powder to manage constipation and GI side effects during GLP-1 treatment.",
    priceRange: "$20–30",
    url: amazonSearch("metamucil psyllium fiber supplement powder"),
  },
  {
    title: "Vitamin B12 (Methylcobalamin 1000mcg)",
    description: "GLP-1 agonists can reduce B12 absorption over time — methylcobalamin is the most bioavailable form.",
    priceRange: "$10–20",
    url: amazonSearch("vitamin b12 methylcobalamin 1000mcg supplement"),
  },
  {
    title: "Ginger Chews for Nausea",
    description: "Natural nausea relief for the dose-escalation adjustment period, particularly weeks 1–4.",
    priceRange: "$8–15",
    url: amazonSearch("ginger chews nausea relief pregnancy sea-band"),
  },
  {
    title: "Unflavored Whey Protein Isolate",
    description: "Preserve lean mass without excess carbs or calories when appetite is suppressed.",
    priceRange: "$35–60",
    url: amazonSearch("whey protein isolate unflavored 2lb"),
  },
];

// ── Recovery ─────────────────────────────────────────────────────────────────
const recoveryProducts: AffiliateProduct[] = [
  {
    title: "Deep-Tissue Foam Roller",
    description: "Self-myofascial release to complement healing peptide protocols for tendons and soft tissue.",
    priceRange: "$20–40",
    url: amazonSearch("trigger point foam roller deep tissue massage"),
  },
  {
    title: "Reusable Gel Ice Pack Wrap",
    description: "Cold therapy reduces local inflammation — commonly used alongside BPC-157 and TB-500 research.",
    priceRange: "$12–25",
    url: amazonSearch("reusable gel ice pack knee wrap cold therapy"),
  },
  {
    title: "Magnesium Glycinate Capsules",
    description: "Highly bioavailable magnesium supports muscle recovery, sleep quality, and reduces cramping.",
    priceRange: "$15–30",
    url: amazonSearch("magnesium glycinate capsules 400mg sleep recovery"),
  },
  {
    title: "Collagen Peptides Powder",
    description: "Type I & III hydrolyzed collagen to support tendon, ligament, and joint repair.",
    priceRange: "$25–45",
    url: amazonSearch("vital proteins collagen peptides powder unflavored"),
  },
];

// ── Reconstitution Supplies ──────────────────────────────────────────────────
const reconstitutionProducts: AffiliateProduct[] = [
  {
    title: "Alcohol Prep Pads (200 ct)",
    description: "Sterile 70% isopropyl pads for injection site preparation — essential for subcutaneous protocols.",
    priceRange: "$5–10",
    url: amazonSearch("alcohol prep pads sterile 200 count isopropyl"),
  },
  {
    title: "1mL Insulin Syringes (28G)",
    description: "Thin-gauge 28G syringes for subcutaneous peptide administration with minimal discomfort.",
    priceRange: "$10–18",
    url: amazonSearch("1ml insulin syringes 28 gauge 100 count"),
  },
  {
    title: "Sharps Disposal Container (1 Qt)",
    description: "Biohazard-safe sharps container for responsible disposal of used syringes.",
    priceRange: "$8–15",
    url: amazonSearch("sharps disposal container 1 quart biohazard"),
  },
  {
    title: "Digital Milligram Scale (0.001g)",
    description: "High-precision scale for accurate measurement of peptide powder before reconstitution.",
    priceRange: "$20–40",
    url: amazonSearch("digital milligram scale 0.001g precision jewelry"),
  },
];

// ── Books ────────────────────────────────────────────────────────────────────
const bookProducts: AffiliateProduct[] = [
  {
    title: "The Peptide Protocols",
    description: "Comprehensive reference for peptide mechanisms, dosing research, and clinical applications.",
    priceRange: "$20–35",
    url: amazonSearch("peptide protocols book biohacking optimization"),
  },
  {
    title: "Boundless by Ben Greenfield",
    description: "Covers peptides, nootropics, hormones, and longevity strategies in an optimization framework.",
    priceRange: "$25–40",
    url: amazonSearch("boundless ben greenfield upgrade brain body spirit"),
  },
  {
    title: "Lifespan by David Sinclair",
    description: "Evidence-based deep-dive into aging science, directly relevant to longevity peptide research.",
    priceRange: "$15–28",
    url: amazonSearch("lifespan david sinclair aging disease longevity"),
  },
  {
    title: "The Longevity Paradox",
    description: "Gut-centric aging research with diet and supplementation protocols for extending healthspan.",
    priceRange: "$15–28",
    url: amazonSearch("longevity paradox steven gundry gut microbiome aging"),
  },
];

// ── Nutrition / Weight Management ────────────────────────────────────────────
const nutritionProducts: AffiliateProduct[] = [
  {
    title: "Smart WiFi Body Scale",
    description: "Tracks BMI, body fat %, and muscle mass — essential for monitoring GLP-1 progress over time.",
    priceRange: "$30–60",
    url: amazonSearch("smart body scale wifi bluetooth BMI body fat"),
  },
  {
    title: "Digital Kitchen Food Scale",
    description: "Precise gram-level portion tracking helps maximize weight loss results on GLP-1 therapy.",
    priceRange: "$10–20",
    url: amazonSearch("digital kitchen food scale grams accurate"),
  },
  {
    title: "Protein Shaker Bottle Set",
    description: "Leak-proof mixing bottles for protein shakes — supports consistent protein intake on a smaller appetite.",
    priceRange: "$12–25",
    url: amazonSearch("protein shaker bottle blender ball set"),
  },
];

// ── Catalog ──────────────────────────────────────────────────────────────────
export const affiliateCatalog: Record<AffiliateCategory, AffiliateProduct[]> = {
  skincare: skincareProducts,
  "glp1-support": glp1SupportProducts,
  recovery: recoveryProducts,
  reconstitution: reconstitutionProducts,
  books: bookProducts,
  nutrition: nutritionProducts,
};

export type PeptideAffiliateContext = {
  fdaStatus: "approved" | "not-approved" | "cosmetic" | "discontinued";
  category: string;
  routes: string[];
};

export interface AffiliateProductSection {
  heading: string;
  subheading: string;
  products: AffiliateProduct[];
}

function section(
  heading: string,
  subheading: string,
  products: AffiliateProduct[]
): AffiliateProductSection {
  return { heading, subheading, products };
}

export function getProductSectionsForPeptide(ctx: PeptideAffiliateContext): AffiliateProductSection[] {
  const sections: AffiliateProductSection[] = [];
  const injectable = ctx.routes.some((r) =>
    r.toLowerCase().includes("injection") || r.toLowerCase().includes("subcutaneous")
  );

  if (ctx.fdaStatus === "cosmetic") {
    sections.push({
      heading: "Recommended Skincare Products",
      subheading: "Peptide-based topical products aligned with the mechanisms discussed above.",
      products: skincareProducts,
    });
  }

  if (ctx.fdaStatus === "approved") {
    if (ctx.category === "weight-loss" || ctx.category === "metabolic-health") {
      sections.push({
        heading: "GLP-1 Support Essentials",
        subheading: "Products to help manage side effects and optimize outcomes during treatment.",
        products: glp1SupportProducts,
      });
      sections.push({
        heading: "Progress Tracking Tools",
        subheading: "Monitor weight, body composition, and nutrition to maximize results.",
        products: nutritionProducts,
      });
    } else if (ctx.category === "growth-hormone") {
      sections.push({
        heading: "Recovery Support Products",
        subheading: "Tools and supplements commonly used alongside hormone optimization protocols.",
        products: recoveryProducts,
      });
      sections.push({
        heading: "Progress Tracking Tools",
        subheading: "Monitor body composition, sleep, and recovery metrics.",
        products: nutritionProducts,
      });
    } else if (ctx.category === "sexual-health") {
      sections.push({
        heading: "Wellness Support Products",
        subheading: "Tools and supplements that support overall health and vitality.",
        products: nutritionProducts,
      });
    } else {
      sections.push({
        heading: "Progress Tracking Tools",
        subheading: "Monitor health markers and outcomes during treatment.",
        products: nutritionProducts,
      });
    }
  }

  if ((ctx.fdaStatus === "not-approved" || ctx.fdaStatus === "discontinued") && ctx.category === "healing-recovery") {
    sections.push({
      heading: "Recovery Support Products",
      subheading: "Tools and supplements commonly used alongside healing peptide research protocols.",
      products: recoveryProducts,
    });
  }

  if (injectable && (ctx.fdaStatus === "not-approved" || ctx.fdaStatus === "discontinued")) {
    sections.push({
      heading: "Research Supplies",
      subheading: "Equipment for responsible research-grade peptide handling and administration.",
      products: reconstitutionProducts,
    });
  }

  sections.push({
    heading: "Recommended Reading",
    subheading: "Books covering peptide science, longevity research, and biohacking frameworks.",
    products: bookProducts,
  });

  return sections;
}

export function getProductSectionsForBlogPost(slug: string): AffiliateProductSection[] {
  switch (slug) {
    case "peptide-storage-reconstitution-guide":
      return [
        section(
          "Reconstitution Supplies",
          "Basic supplies commonly discussed in storage and preparation workflows.",
          reconstitutionProducts
        ),
        section(
          "Recommended Reading",
          "Books covering peptide science, longevity research, and biohacking frameworks.",
          bookProducts
        ),
      ];
    case "peptide-quality-coa-verification":
      return [
        section(
          "Quality-Control Supplies",
          "Tools that support careful documentation, handling, and research-grade preparation.",
          [reconstitutionProducts[0], reconstitutionProducts[3]]
        ),
        section(
          "Recommended Reading",
          "Books covering peptide science, longevity research, and biohacking frameworks.",
          bookProducts
        ),
      ];
    case "semaglutide-vs-tirzepatide-clinical-data":
    case "fda-glp1-compounding-2025":
    case "fda-semaglutide-shortage-resolved-2025-compounding-enforcement":
      return [
        section(
          "GLP-1 Support Essentials",
          "Products to help manage common side effects and support nutrition during treatment.",
          glp1SupportProducts
        ),
        section(
          "Progress Tracking Tools",
          "Monitor weight, body composition, and protein intake during GLP-1 therapy.",
          nutritionProducts
        ),
      ];
    case "ghk-cu-copper-peptide-research":
      return [
        section(
          "Recommended Skincare Products",
          "Peptide-based topical products aligned with the mechanisms discussed in this review.",
          skincareProducts
        ),
        section(
          "Recommended Reading",
          "Books covering peptide science, longevity research, and biohacking frameworks.",
          bookProducts
        ),
      ];
    case "bpc-157-evidence-review":
      return [
        section(
          "Recovery Support Products",
          "Tools and supplements commonly used alongside recovery-focused research protocols.",
          recoveryProducts
        ),
        section(
          "Recommended Reading",
          "Books covering peptide science, longevity research, and biohacking frameworks.",
          bookProducts
        ),
      ];
    default:
      return [];
  }
}

export function getProductSectionsForCategory(category: string): AffiliateProductSection[] {
  switch (category) {
    case "healing-recovery":
      return [
        section(
          "Recovery Support Products",
          "Tools and supplements commonly used alongside healing and recovery research.",
          recoveryProducts
        ),
        section(
          "Research Supplies",
          "Equipment for responsible research-grade peptide handling and administration.",
          reconstitutionProducts
        ),
      ];
    case "weight-loss":
      return [
        section(
          "GLP-1 Support Essentials",
          "Products to help manage common side effects and support nutrition during treatment.",
          glp1SupportProducts
        ),
        section(
          "Progress Tracking Tools",
          "Monitor weight, body composition, and nutrition to maximize results.",
          nutritionProducts
        ),
      ];
    case "anti-aging":
      return [
        section(
          "Recommended Skincare Products",
          "Peptide-based topical products aligned with anti-aging and collagen-support goals.",
          skincareProducts
        ),
        section(
          "Recommended Reading",
          "Books covering peptide science, longevity research, and biohacking frameworks.",
          bookProducts
        ),
      ];
    default:
      return [
        section(
          "Recommended Reading",
          "Books covering peptide science, longevity research, and biohacking frameworks.",
          bookProducts
        ),
      ];
  }
}

export function getProductSectionsForComparison(
  peptides: PeptideAffiliateContext[]
): AffiliateProductSection[] {
  const hasApproved = peptides.some((p) => p.fdaStatus === "approved");
  const hasRecovery = peptides.some((p) => p.category === "healing-recovery");
  const hasCosmetic = peptides.some((p) => p.fdaStatus === "cosmetic");
  const hasResearchInjectable = peptides.some((p) =>
    (p.fdaStatus === "not-approved" || p.fdaStatus === "discontinued") &&
    p.routes.some((route) =>
      route.toLowerCase().includes("injection") || route.toLowerCase().includes("subcutaneous")
    )
  );

  const sections: AffiliateProductSection[] = [];

  if (hasApproved) {
    sections.push(section(
      "GLP-1 Support Essentials",
      "Products that can support side-effect management, hydration, and protein intake.",
      glp1SupportProducts
    ));
  }

  if (hasRecovery) {
    sections.push(section(
      "Supplies for Recovery Protocols",
      "Recovery tools and supplements relevant to this comparison.",
      recoveryProducts
    ));
  }

  if (hasResearchInjectable) {
    sections.push(section(
      "Supplies for Both",
      "Common research handling and preparation supplies for injectable peptide workflows.",
      reconstitutionProducts
    ));
  }

  if (hasCosmetic) {
    sections.push(section(
      "Recommended Skincare Products",
      "Peptide-based topical products aligned with cosmetic peptide research.",
      skincareProducts
    ));
  }

  sections.push(section(
    "Recommended Reading",
    "Books covering peptide science, longevity research, and biohacking frameworks.",
    bookProducts
  ));

  return sections;
}
