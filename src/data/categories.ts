export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    name: "Healing & Recovery",
    slug: "healing-recovery",
    description:
      "Peptides researched for wound healing, tissue repair, and recovery from injury. Includes BPC-157, TB-500, and GHK-Cu.",
    icon: "+",
  },
  {
    name: "Growth Hormone Secretagogues",
    slug: "growth-hormone",
    description:
      "Peptides that stimulate the pituitary gland to release growth hormone. Includes ipamorelin, CJC-1295, sermorelin, tesamorelin, GHRP-2, GHRP-6, and hexarelin.",
    icon: "^",
  },
  {
    name: "Weight Loss",
    slug: "weight-loss",
    description:
      "Peptides used or studied for weight loss and fat reduction. Includes FDA-approved semaglutide, tirzepatide, and the research peptide AOD-9604.",
    icon: "~",
  },
  {
    name: "Sexual Health",
    slug: "sexual-health",
    description:
      "Peptides researched for sexual function and desire. Includes FDA-approved bremelanotide (Vyleesi) and the research compound Melanotan II.",
    icon: "*",
  },
  {
    name: "Sleep & Stress",
    slug: "sleep-stress",
    description:
      "Peptides studied for sleep regulation, anxiolytic effects, and stress response modulation. Includes DSIP and Selank.",
    icon: "z",
  },
  {
    name: "Cognitive Enhancement",
    slug: "cognitive",
    description:
      "Peptides researched for nootropic and neuroprotective properties. Includes Semax, approved in Russia for stroke and cognitive disorders.",
    icon: "!",
  },
  {
    name: "Anti-Aging & Longevity",
    slug: "anti-aging",
    description:
      "Peptides studied for their potential anti-aging effects including telomerase activation. Includes Epithalon.",
    icon: "o",
  },
  {
    name: "Immune Support",
    slug: "immune-support",
    description:
      "Peptides involved in immune modulation and antimicrobial defense. Includes LL-37 and Thymalin.",
    icon: "#",
  },
  {
    name: "Anti-Inflammatory",
    slug: "anti-inflammatory",
    description:
      "Peptides researched for reducing inflammation through NF-kB and cytokine modulation. Includes KPV.",
    icon: "-",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllCategories(): Category[] {
  return categories;
}
