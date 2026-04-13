import { scientificTheme, type SiteTheme } from "@/lib/theme";

export type SiteKey = "main" | "pets" | "labs";

export interface SiteDefinition {
  key: SiteKey;
  name: string;
  shortName: string;
  domain: string;
  hostnames: string[];
  tagline: string;
  description: string;
  launchState: "live" | "planned";
  contentAudience: "human" | "veterinary" | "research";
  noindexByDefault: boolean;
  betaMessage?: string;
  theme: SiteTheme;
  capabilities: {
    showMarketSelector: boolean;
    showAds: boolean;
    showMainNavigation: boolean;
    allowPublicSitemap: boolean;
  };
}

type ThemeOverrides = Omit<Partial<SiteTheme>, "colors" | "fonts"> & {
  colors?: Partial<SiteTheme["colors"]>;
  fonts?: Partial<SiteTheme["fonts"]>;
};

function createTheme(overrides: ThemeOverrides): SiteTheme {
  return {
    ...scientificTheme,
    ...overrides,
    colors: {
      ...scientificTheme.colors,
      ...(overrides.colors ?? {}),
    },
    fonts: {
      ...scientificTheme.fonts,
      ...(overrides.fonts ?? {}),
    },
  };
}

export const siteDefinitions: Record<SiteKey, SiteDefinition> = {
  main: {
    key: "main",
    name: "PeptideScholar",
    shortName: "PS",
    domain: "https://peptidescholar.com",
    hostnames: ["peptidescholar.com", "www.peptidescholar.com", "localhost", "127.0.0.1"],
    tagline: "The Evidence-Based Peptide Reference",
    description:
      "Comprehensive, research-backed guide to peptides — mechanisms, evidence levels, dosing, side effects, legal status, and comparisons. Every claim cited from PubMed.",
    launchState: "live",
    contentAudience: "human",
    noindexByDefault: false,
    capabilities: {
      showMarketSelector: true,
      showAds: true,
      showMainNavigation: true,
      allowPublicSitemap: true,
    },
    theme: createTheme({
      name: "PeptideScholar",
      domain: "https://peptidescholar.com",
      tagline: "The Evidence-Based Peptide Reference",
      description:
        "Comprehensive, research-backed guide to peptides — mechanisms, evidence levels, dosing, side effects, legal status, and comparisons. Every claim cited from PubMed.",
    }),
  },
  pets: {
    key: "pets",
    name: "PetPeptideScholar",
    shortName: "PPS",
    domain: "https://pets.peptidescholar.com",
    hostnames: ["pets.peptidescholar.com"],
    tagline: "Evidence-First Peptide Education For Veterinary Contexts",
    description:
      "Planned veterinary-focused peptide education and decision support for animal-health contexts. Not yet launched.",
    launchState: "planned",
    contentAudience: "veterinary",
    noindexByDefault: true,
    capabilities: {
      showMarketSelector: false,
      showAds: false,
      showMainNavigation: false,
      allowPublicSitemap: false,
    },
    betaMessage:
      "The veterinary edition is still being built. Current live content on this platform is human-focused unless a page explicitly states otherwise.",
    theme: createTheme({
      name: "PetPeptideScholar",
      domain: "https://pets.peptidescholar.com",
      tagline: "Evidence-First Peptide Education For Veterinary Contexts",
      description:
        "Planned veterinary-focused peptide education and decision support for animal-health contexts. Not yet launched.",
      colors: {
        primary: "#0F4C5C",
        primaryDark: "#0B3440",
        secondary: "#2D8C7F",
        accent: "#C06C3F",
      },
    }),
  },
  labs: {
    key: "labs",
    name: "PeptideScholar Labs",
    shortName: "PSL",
    domain: "https://labs.peptidescholar.com",
    hostnames: ["labs.peptidescholar.com"],
    tagline: "Experimental Tools And Data Systems",
    description:
      "Planned experimental tools, data products, and workflows from PeptideScholar. Not yet launched.",
    launchState: "planned",
    contentAudience: "research",
    noindexByDefault: true,
    capabilities: {
      showMarketSelector: false,
      showAds: false,
      showMainNavigation: false,
      allowPublicSitemap: false,
    },
    betaMessage:
      "Labs is reserved for experimental tooling and data products. Public content is not yet launched on this subdomain.",
    theme: createTheme({
      name: "PeptideScholar Labs",
      domain: "https://labs.peptidescholar.com",
      tagline: "Experimental Tools And Data Systems",
      description:
        "Planned experimental tools, data products, and workflows from PeptideScholar. Not yet launched.",
      colors: {
        primary: "#1F2937",
        primaryDark: "#111827",
        secondary: "#0EA5E9",
        accent: "#F59E0B",
      },
      layout: "catalog",
    }),
  },
};

export const DEFAULT_SITE_KEY: SiteKey = "main";

export function getDefaultSite() {
  return siteDefinitions[DEFAULT_SITE_KEY];
}

export function getSiteByKey(key: SiteKey) {
  return siteDefinitions[key];
}

export function resolveSiteKeyFromHost(host?: string | null): SiteKey {
  if (!host) return DEFAULT_SITE_KEY;
  const normalizedHost = host.toLowerCase().split(":")[0];
  const match = Object.values(siteDefinitions).find((site) =>
    site.hostnames.some((hostname) => hostname.toLowerCase() === normalizedHost)
  );
  return match?.key ?? DEFAULT_SITE_KEY;
}

export function resolveSiteFromHost(host?: string | null) {
  return getSiteByKey(resolveSiteKeyFromHost(host));
}
