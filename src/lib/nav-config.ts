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

const MAIN_EDITORIAL_NAV_CONFIG: NavConfig = {
  direct: [
    { label: "Peptides", href: "/peptides" },
    { label: "Compare", href: "/compare" },
    { label: "Blog", href: "/blog" },
    { label: "Tools", href: "/tools" },
  ],
  groups: [
    {
      label: "Care Paths",
      items: [
        { label: "Treatments", href: "/treatments", description: "Approved treatment decision hubs" },
        { label: "Costs", href: "/costs", description: "Pricing, coverage, and savings guides" },
        { label: "Providers", href: "/providers", description: "Provider routing and matching" },
      ],
    },
    {
      label: "Learn",
      items: [
        { label: "Beginner Guide", href: "/guide", description: "How peptides work, evidence, and safety" },
        { label: "Methodology", href: "/methodology", description: "Evidence levels and trust scoring" },
        { label: "Legal Status", href: "/legal", description: "State-by-state legal coverage" },
        { label: "Glossary", href: "/glossary", description: "Clinical and research terms" },
      ],
    },
    {
      label: "Specialty",
      items: [
        { label: "Pets", href: "/pets", description: "Veterinary peptide reference" },
        { label: "Labs", href: "/labs", description: "Advanced research tools and data" },
        { label: "Stack", href: "/stack", description: "Combination stack hub and planning tools" },
      ],
    },
  ],
};

function cloneNavConfig(config: NavConfig): NavConfig {
  return {
    direct: config.direct.map((item) => ({ ...item })),
    groups: config.groups.map((group) => ({
      ...group,
      items: group.items.map((item) => ({ ...item })),
    })),
  };
}

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

  return cloneNavConfig(MAIN_EDITORIAL_NAV_CONFIG);
}
