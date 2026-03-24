export interface SiteTheme {
  colors: {
    primary: string;
    primaryDark: string;
    secondary: string;
    accent: string;
    bg: string;
    bgAlt: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    success: string;
    warning: string;
  };
  fonts: { heading: string; body: string };
  layout: "editorial" | "dashboard" | "catalog" | "elegant";
  borderRadius: string;
  name: string;
  domain: string;
  tagline: string;
  description: string;
  adClient?: string;
}

export const scientificTheme: SiteTheme = {
  colors: {
    primary: "#1A3A5C",
    primaryDark: "#0F2740",
    secondary: "#3B7A9E",
    accent: "#D4553A",
    bg: "#FAFBFC",
    bgAlt: "#F0F3F7",
    surface: "#FFFFFF",
    text: "#1C2028",
    textMuted: "#5A6577",
    border: "#D0D7E2",
    success: "#2B8A5E",
    warning: "#D4912A",
  },
  fonts: { heading: "Libre Franklin", body: "Source Serif 4" },
  layout: "editorial",
  borderRadius: "rounded-lg",
  name: "PeptideScholar",
  domain: "https://peptidescholar.com",
  tagline: "The Evidence-Based Peptide Reference",
  description: "Comprehensive, research-backed guide to peptides — mechanisms, evidence levels, dosing, side effects, legal status, and comparisons. Every claim cited from PubMed.",
};
