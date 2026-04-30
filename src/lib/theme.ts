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
    primary: "#050505",
    primaryDark: "#000000",
    secondary: "#5d75c7",
    accent: "#d8e628",
    bg: "#edeae3",
    bgAlt: "#cfcfc9",
    surface: "#edeae3",
    text: "#050505",
    textMuted: "#6b6b66",
    border: "#050505",
    success: "#2B8A5E",
    warning: "#D4912A",
  },
  fonts: { heading: "Inter Tight", body: "IBM Plex Mono" },
  layout: "editorial",
  borderRadius: "0px",
  name: "PeptideScholar",
  domain: "https://peptidescholar.com",
  tagline: "The Evidence-Based Peptide Reference",
  description: "Comprehensive, research-backed guide to peptides — mechanisms, evidence levels, dosing, side effects, legal status, and comparisons. Every claim cited from PubMed.",
};
