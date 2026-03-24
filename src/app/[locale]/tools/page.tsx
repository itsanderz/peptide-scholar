import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer } from "@/components";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/locale-params";
import { siteConfig } from "@/lib/siteConfig";

/* ── Theme ─────────────────────────────────────────────────────────────── */
const C = {
  navy: "#1A3A5C",
  accent: "#D4553A",
  teal: "#3B7A9E",
  success: "#2B8A5E",
  warning: "#D4912A",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
} as const;

// C.warning used in Titration Planner card color

/* ── SEO ───────────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const alt = localeAlternates(siteConfig.domain, "/tools", locale);

  return {
    ...generateSEO({
      title: "Free Peptide & GLP-1 Tools — 7 Free Clinical Tools",
      description:
        "Free peptide and GLP-1 tools: peptide finder, reconstitution calculator, legal status checker, titration planner, side effect visualizer, interaction checker, and cost calculator. No signup required.",
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

/* ── Tools Data ────────────────────────────────────────────────────────── */
const tools = [
  {
    title: "Peptide Finder",
    description:
      "Answer 4 questions to get personalized peptide research recommendations based on your interests. Filter by category, evidence level, and preferences.",
    href: "/tools/peptide-finder",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
    color: C.success,
  },
  {
    title: "Reconstitution Calculator",
    description:
      "Calculate reconstitution volumes and syringe units for any peptide vial. Enter your vial size, water volume, and desired dose to get exact measurements instantly.",
    href: "/tools/calculator",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        <line x1="12" y1="7" x2="12" y2="11" />
        <line x1="10" y1="9" x2="14" y2="9" />
      </svg>
    ),
    color: C.teal,
  },
  {
    title: "Legal Status Checker",
    description:
      "Check peptide legality in your state — FDA status, compounding rules, and restrictions. Select a peptide and your state for an instant legal summary.",
    href: "/tools/legal-checker",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: C.navy,
  },
  {
    title: "Titration Planner",
    description:
      "Pick a GLP-1 medication and a start date to generate a week-by-week dose escalation calendar. Color-coded by dose level with print support. Based on FDA prescribing information.",
    href: "/tools/titration-planner",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="8" y1="15" x2="16" y2="15" />
        <line x1="12" y1="12" x2="12" y2="18" />
      </svg>
    ),
    color: C.warning,
  },
  {
    title: "Side Effect Visualizer",
    description:
      "Compare GLP-1 medication side effect rates against placebo with horizontal bar charts. Data from STEP, SURPASS, and SCALE clinical trials via FDA prescribing labels.",
    href: "/tools/side-effects",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
    color: "#D4553A",
  },
  {
    title: "Interaction Checker",
    description:
      "Select two peptides or medications to check known interactions. Severity-coded results (avoid, caution, monitor, likely-safe, no-data) with evidence levels and recommendations.",
    href: "/tools/interaction-checker",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="12" r="5" />
        <circle cx="16" cy="12" r="5" />
      </svg>
    ),
    color: "#7C3AED",
  },
  {
    title: "Cost Calculator",
    description:
      "Compare GLP-1 medication costs: list price, insurance copay range, manufacturer discount programs, and compounded alternatives. Monthly and yearly breakdowns.",
    href: "/tools/cost-calculator",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    color: C.success,
  },
];

/* ── Page ──────────────────────────────────────────────────────────────── */
export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Free Peptide & GLP-1 Tools",
          description:
            "Free interactive peptide and GLP-1 tools including a guided peptide finder, reconstitution calculator, legal status checker, dosage titration planner, side effect visualizer, interaction checker, and cost calculator.",
          url: `${siteConfig.domain}/tools`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Tools", href: `${prefix}/tools` },
          ]}
        />

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <h1
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Free Peptide &amp; GLP-1 Tools
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            No signup required. 100% free, forever.
          </p>
        </div>

        {/* ── Tool Cards ────────────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={`${prefix}${tool.href}`}
              className="group block rounded-xl overflow-hidden shadow-md transition-shadow hover:shadow-xl"
              style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
            >
              <div className="p-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: tool.color }}
                >
                  {tool.icon}
                </div>
                <h2
                  className="text-xl font-bold mb-2 group-hover:underline"
                  style={{
                    color: C.navy,
                    fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                  }}
                >
                  {tool.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {tool.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold" style={{ color: C.teal }}>
                  <span>Open Tool</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Why Free? ─────────────────────────────────────────────── */}
        <section className="mb-12">
          <div
            className="rounded-xl p-8 text-center"
            style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{
                color: C.navy,
                fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
              }}
            >
              Why Free?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Evidence-based tools should be accessible to everyone. Peptide reconstitution math
              and legal status information are too important to lock behind a paywall. These tools
              are built on publicly available data and open formulas &mdash; we believe keeping them
              free helps people make safer, better-informed decisions.
            </p>
          </div>
        </section>

        <MedicalDisclaimer />
      </div>
    </>
  );
}
