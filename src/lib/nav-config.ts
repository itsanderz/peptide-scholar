export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export type NavConfig = {
  /** Links rendered as plain top-level anchors */
  direct: NavItem[];
  /** Links rendered as labelled dropdown menus */
  groups: NavGroup[];
};

export function buildNavConfig(showMainNav: boolean, mainSiteUrl: string): NavConfig {
  if (!showMainNav) {
    return {
      direct: [
        { label: "Main Site", href: mainSiteUrl },
        { label: "Contact", href: `${mainSiteUrl}/contact` },
      ],
      groups: [],
    };
  }

  return {
    direct: [
      { label: "Treatments", href: "/treatments" },
      { label: "Providers", href: "/providers" },
    ],
    groups: [
      {
        label: "Learn",
        items: [
          { label: "Peptides", href: "/peptides", description: "Browse all peptides by category" },
          { label: "Guide", href: "/guide", description: "How peptides work, dosing, and safety" },
          { label: "Costs", href: "/costs", description: "Real-world pricing and insurance" },
          { label: "Compare", href: "/compare", description: "Side-by-side peptide comparisons" },
        ],
      },
      {
        label: "Tools",
        items: [
          { label: "All Tools", href: "/tools", description: "Calculators and planners" },
          { label: "Legal Status", href: "/legal", description: "Legality by compound and country" },
        ],
      },
    ],
  };
}
