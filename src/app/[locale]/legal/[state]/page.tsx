import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllStatesLegal, getStateBySlug } from "@/data/states-legal";
import { getAllPeptides } from "@/data/peptides";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, AdSlot, FAQ, MedicalDisclaimer, ProviderIntentCard } from "@/components";
import { PageTracker } from "@/components/PageTracker";
import { isValidLocale } from "@/lib/i18n";
import { withLocaleParams, localeAlternates } from "@/lib/locale-params";
import { getRequestMarketCode } from "@/lib/request-market";

interface Props {
  params: Promise<{ locale: string; state: string }>;
}

export async function generateStaticParams() {
  return withLocaleParams(getAllStatesLegal().map((s) => ({ state: s.stateSlug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, state } = await params;
  const stateInfo = getStateBySlug(state);
  if (!stateInfo) return {};

  const alt = localeAlternates("https://peptidescholar.com", `/legal/${state}`, locale);
  return {
    ...generateSEO({
      title: `Are Peptides Legal in ${stateInfo.stateName}? (${new Date().getFullYear()}) — Complete Guide`,
      description: `Are peptides legal in ${stateInfo.stateName}? ${stateInfo.stateName} has a ${stateInfo.stance} stance on peptide regulation. ${stateInfo.compoundingAllowed ? "Compounding is allowed." : "Compounding is restricted."} See status for all peptides.`,
      canonical: alt.canonical,
      siteName: "PeptideScholar",
    }),
    alternates: alt,
  };
}

const STANCE_STYLES = {
  permissive: {
    bg: "#dcfce7",
    border: "#16a34a",
    color: "#15803d",
    label: "Permissive",
    description: "Minimal restrictions beyond federal guidelines",
  },
  moderate: {
    bg: "#fef3c7",
    border: "#d97706",
    color: "#92400e",
    label: "Moderate",
    description: "Standard federal compliance with typical state oversight",
  },
  restrictive: {
    bg: "#fee2e2",
    border: "#dc2626",
    color: "#b91c1c",
    label: "Restrictive",
    description: "Enhanced state-level restrictions on compounding and distribution",
  },
} as const;

export default async function StateLegalPage({ params }: Props) {
  const { locale, state } = await params;
  if (!isValidLocale(locale)) notFound();
  const marketCode = await getRequestMarketCode();

  const stateInfo = getStateBySlug(state);
  if (!stateInfo) notFound();

  const allPeptides = getAllPeptides();
  const allStates = getAllStatesLegal();
  const stanceConfig = STANCE_STYLES[stateInfo.stance];

  // Popular / neighboring states for cross-linking
  const popularStates = allStates
    .filter((s) => s.stateSlug !== state)
    .sort((a, b) => a.stateName.localeCompare(b.stateName))
    .slice(0, 10);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Legal Status", href: "/legal" },
    { label: stateInfo.stateName, href: `/legal/${state}` },
  ];

  const faqItems = [
    {
      question: `Are peptides legal in ${stateInfo.stateName}?`,
      answer: `${stateInfo.stateName} has a ${stateInfo.stance} regulatory stance on peptides. FDA-approved peptides such as semaglutide and bremelanotide are available by prescription in all states. For non-approved research peptides, ${stateInfo.stateName} ${stateInfo.stance === "permissive" ? "has minimal restrictions beyond federal guidelines" : stateInfo.stance === "moderate" ? "follows standard federal oversight" : "enforces additional state-level restrictions"}. ${stateInfo.compoundingAllowed ? "Compounding pharmacies are allowed to operate." : "Compounding of non-approved peptides is restricted."}`,
    },
    {
      question: `Can I get peptides from a compounding pharmacy in ${stateInfo.stateName}?`,
      answer: stateInfo.compoundingAllowed
        ? `Yes, compounding pharmacies in ${stateInfo.stateName} are permitted to prepare peptide formulations under standard oversight. You will need a valid prescription from a licensed healthcare provider for most compounded peptide preparations.`
        : `Compounding pharmacies in ${stateInfo.stateName} face additional restrictions. The state has enhanced oversight requirements that limit which peptides can be compounded and distributed. FDA-approved peptide medications remain available through standard pharmacies with a prescription.`,
    },
    {
      question: `Are there age restrictions for peptides in ${stateInfo.stateName}?`,
      answer: stateInfo.ageRestrictions
        ? `Yes, ${stateInfo.stateName} has age-related restrictions on peptide access. Minors may face additional requirements or limitations when seeking peptide therapies. Consult a healthcare provider and verify current state regulations.`
        : `${stateInfo.stateName} does not have specific age restrictions for peptide access beyond standard medical practice guidelines. However, healthcare providers use clinical judgment regarding peptide therapies for patients of all ages, and federal regulations still apply.`,
    },
  ];

  return (
    <>
      <PageTracker event="state_view" params={{ state_name: state, market: marketCode }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `Peptide Legal Status in ${stateInfo.stateName}`,
          description: `Legal status and availability of peptides in ${stateInfo.stateName}. ${stateInfo.stance} regulatory stance.`,
          url: `https://peptidescholar.com/legal/${state}`,
          isPartOf: {
            "@type": "WebSite",
            name: "PeptideScholar",
            url: "https://peptidescholar.com",
          },
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* ── Source Review Notice ────────────────────────────────────── */}
        <div
          className="rounded-xl p-5 mb-6"
          style={{ backgroundColor: "#FEF3C7", border: "1px solid #F59E0B" }}
        >
          <div className="flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#92400E" strokeWidth="2" className="flex-shrink-0 mt-0.5">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <h2 className="text-sm font-bold mb-1" style={{ color: "#92400E" }}>
                Content Under Review
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "#78350F" }}>
                The legal classification and claims for {stateInfo.stateName} are currently under editorial review for sourcing.
                These labels have not yet been verified against specific state statutes or regulations.
                Treat this as a general orientation only — not legal advice. Always verify current regulations with your
                state pharmacy board and a licensed attorney.
              </p>
            </div>
          </div>
        </div>

        <BreadcrumbNav crumbs={crumbs} />

        {/* ── Title + Stance Badge ────────────────────────────────────── */}
        <div className="flex flex-wrap items-start gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <h1
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{
                color: "var(--color-primary, #1A3A5C)",
                fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
              }}
            >
              Peptide Legal Status in {stateInfo.stateName}
            </h1>
          </div>
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap"
            style={{
              backgroundColor: stanceConfig.bg,
              color: stanceConfig.color,
              border: `2px solid ${stanceConfig.border}`,
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: stanceConfig.border }}
            />
            {stanceConfig.label}
          </span>
        </div>

        <p className="text-gray-600 mb-8 max-w-3xl">
          {stanceConfig.description}. {stateInfo.notes}
        </p>

        {/* ── Key Facts Grid ─────────────────────────────────────────── */}
        <div className="mb-8">
          <ProviderIntentCard
            marketCode={marketCode}
            location="state_legal"
            treatmentSlug="general"
            headline={
              marketCode === "us"
                ? `Need a legal prescribing path in ${stateInfo.stateName}?`
                : `Want provider rollout updates for ${stateInfo.stateName}?`
            }
            description={
              marketCode === "us"
                ? "Use the provider matcher to narrow options by treatment, insurance, budget, and urgency while keeping state-level legal context in view."
                : `We are expanding country-aware provider workflows beyond the US. Join the rollout list for ${stateInfo.stateName}-adjacent legal and provider guidance.`
            }
            buttonText={marketCode === "us" ? "Find a provider" : "Join provider rollout"}
          />
        </div>

        <div
          className="rounded-xl p-4 mb-8"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3B7A9E] mb-2">
            State Routing Guide
          </div>
          <div className="text-sm md:text-base text-[#1C2028] mb-3">
            Need a more concrete next step? Use the provider routing guide for {stateInfo.stateName} to see how PeptideScholar currently prioritizes paths based on this state&apos;s legal profile.
          </div>
          <Link
            href={`/providers/state/${stateInfo.stateSlug}`}
            className="inline-flex items-center text-sm font-semibold"
            style={{ color: "#1A3A5C", textDecoration: "none" }}
          >
            View {stateInfo.stateName} provider routing guide &rarr;
          </Link>
        </div>

        <section className="mb-10">
          <h2
            className="text-xl md:text-2xl font-bold mb-4"
            style={{
              color: "var(--color-primary, #1A3A5C)",
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Key Facts
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
            >
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">
                Regulatory Stance
              </div>
              <div
                className="text-lg font-bold capitalize"
                style={{ color: stanceConfig.color }}
              >
                {stateInfo.stance}
              </div>
            </div>
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
            >
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">
                Compounding Allowed
              </div>
              <div
                className="text-lg font-bold"
                style={{ color: stateInfo.compoundingAllowed ? "#15803d" : "#b91c1c" }}
              >
                {stateInfo.compoundingAllowed ? "Yes" : "No"}
              </div>
            </div>
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
            >
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">
                Age Restrictions
              </div>
              <div
                className="text-lg font-bold"
                style={{ color: stateInfo.ageRestrictions ? "#b91c1c" : "#15803d" }}
              >
                {stateInfo.ageRestrictions ? "Yes" : "None"}
              </div>
            </div>
          </div>
        </section>

        {/* ── State-Specific Notes ────────────────────────────────────── */}
        <section className="mb-10">
          <h2
            className="text-xl md:text-2xl font-bold mb-3"
            style={{
              color: "var(--color-primary, #1A3A5C)",
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            {stateInfo.stateName} Regulatory Details
          </h2>
          <div
            className="p-5 rounded-lg text-sm leading-relaxed"
            style={{
              backgroundColor: "var(--color-surface, #f9fafb)",
              border: "1px solid var(--color-border, #e5e7eb)",
              color: "var(--color-text-muted, #4b5563)",
            }}
          >
            {stateInfo.notes}
          </div>
        </section>

        {/* ── Peptide Availability Table ──────────────────────────────── */}
        <section className="mb-10">
          <h2
            className="text-xl md:text-2xl font-bold mb-4"
            style={{
              color: "var(--color-primary, #1A3A5C)",
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Peptide Availability in {stateInfo.stateName}
          </h2>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.875rem",
                lineHeight: 1.55,
              }}
            >
              <thead>
                <tr style={{ borderBottom: "2px solid var(--color-border, #e5e7eb)" }}>
                  {["Peptide", "FDA Status", "Evidence", "Availability"].map((header) => (
                    <th
                      key={header}
                      style={{
                        textAlign: "left",
                        padding: "0.6rem 0.75rem",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "var(--color-text-muted, #6b7280)",
                        fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allPeptides.map((peptide, i) => {
                  const isApproved = peptide.fdaStatus === "approved";
                  return (
                    <tr
                      key={peptide.slug}
                      style={{
                        borderBottom: "1px solid var(--color-border, #f3f4f6)",
                        backgroundColor: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.015)",
                      }}
                    >
                      <td style={{ padding: "0.55rem 0.75rem", fontWeight: 600 }}>
                        <Link
                          href={`/peptides/${peptide.slug}`}
                          style={{
                            color: "var(--color-secondary, #3B7A9E)",
                            textDecoration: "none",
                          }}
                        >
                          {peptide.name}
                        </Link>
                      </td>
                      <td style={{ padding: "0.55rem 0.75rem" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "0.15rem 0.5rem",
                            borderRadius: "9999px",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            backgroundColor: isApproved ? "#dcfce7" : "#fef3c7",
                            color: isApproved ? "#15803d" : "#92400e",
                            border: `1px solid ${isApproved ? "#bbf7d0" : "#fde68a"}`,
                          }}
                        >
                          {isApproved ? "Approved" : "Not Approved"}
                        </span>
                      </td>
                      <td style={{ padding: "0.55rem 0.75rem" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "1.5rem",
                            height: "1.5rem",
                            borderRadius: "50%",
                            fontSize: "0.7rem",
                            fontWeight: 800,
                            color: "#fff",
                            backgroundColor:
                              peptide.evidenceLevel === "A" ? "#16a34a"
                                : peptide.evidenceLevel === "B" ? "#2563eb"
                                  : peptide.evidenceLevel === "C" ? "#d97706"
                                    : "#dc2626",
                          }}
                        >
                          {peptide.evidenceLevel}
                        </span>
                      </td>
                      <td style={{ padding: "0.55rem 0.75rem" }}>
                        {isApproved ? (
                          <span style={{ color: "#15803d", fontWeight: 600, fontSize: "0.82rem" }}>
                            Available by Rx
                          </span>
                        ) : stateInfo.stance === "permissive" ? (
                          <span style={{ color: "#15803d", fontWeight: 500, fontSize: "0.82rem" }}>
                            Accessible
                          </span>
                        ) : stateInfo.stance === "moderate" ? (
                          <span style={{ color: "#92400e", fontWeight: 500, fontSize: "0.82rem" }}>
                            Standard Access
                          </span>
                        ) : (
                          <span style={{ color: "#b91c1c", fontWeight: 500, fontSize: "0.82rem" }}>
                            Restricted
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Ad Slot ────────────────────────────────────────────────── */}
        <AdSlot className="mb-8" />

        {/* ── FAQ ────────────────────────────────────────────────────── */}
        <FAQ items={faqItems} title={`Peptides in ${stateInfo.stateName}: FAQ`} />

        {/* ── Medical Disclaimer ──────────────────────────────────────── */}
        <MedicalDisclaimer />

        {/* ── Other States ───────────────────────────────────────────── */}
        <section className="mt-10">
          <h2
            className="text-xl md:text-2xl font-bold mb-4"
            style={{
              color: "var(--color-primary, #1A3A5C)",
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Peptide Laws in Other States
          </h2>
          <div className="flex flex-wrap gap-2">
            {popularStates.map((s) => {
              const sStance = STANCE_STYLES[s.stance];
              return (
                <Link
                  key={s.stateSlug}
                  href={`/legal/${s.stateSlug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: sStance.bg,
                    color: sStance.color,
                    border: `1px solid ${sStance.border}`,
                    textDecoration: "none",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: sStance.border }}
                  />
                  {s.stateName}
                </Link>
              );
            })}
            {allStates.length > 11 && (
              <Link
                href="/legal"
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: "var(--color-surface, #f3f4f6)",
                  color: "var(--color-text-muted, #6b7280)",
                  border: "1px solid var(--color-border, #e5e7eb)",
                  textDecoration: "none",
                }}
              >
                View all {allStates.length} states &rarr;
              </Link>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
