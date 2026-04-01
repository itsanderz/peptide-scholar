import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPeptides, getPeptideBySlug } from "@/data/peptides";
import { getAllStatesLegal, getStateBySlug } from "@/data/states-legal";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, AdSlot, FAQ, LegalStatusBadge, EvidenceBadge, MedicalDisclaimer } from "@/components";
import { PageTracker } from "@/components/PageTracker";
import { isValidLocale } from "@/lib/i18n";
import { withLocaleParams, localeAlternates } from "@/lib/locale-params";

interface Props {
  params: Promise<{ locale: string; slug: string; state: string }>;
}

export async function generateStaticParams() {
  const peptides = getAllPeptides();
  const states = getAllStatesLegal();
  return withLocaleParams(
    peptides.flatMap((p) => states.map((s) => ({ slug: p.slug, state: s.stateSlug })))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, state } = await params;
  const peptide = getPeptideBySlug(slug);
  const stateInfo = getStateBySlug(state);
  if (!peptide || !stateInfo) return {};

  const isApproved = peptide.fdaStatus === "approved";

  const alt = localeAlternates("https://peptidescholar.com", `/peptides/${slug}/legal/${state}`, locale);
  return {
    ...generateSEO({
      title: `Is ${peptide.name} Legal in ${stateInfo.stateName}? (2026)`,
      description: isApproved
        ? `${peptide.name} is FDA approved and available by prescription in ${stateInfo.stateName}. Learn about availability, compounding options, and regulations.`
        : `${peptide.name} legal status in ${stateInfo.stateName}: ${stateInfo.stateName} has a ${stateInfo.stance} stance. ${stateInfo.compoundingAllowed ? "Compounding pharmacies may prepare it." : "Compounding is restricted."} Full legal guide.`,
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
  },
  moderate: {
    bg: "#fef3c7",
    border: "#d97706",
    color: "#92400e",
    label: "Moderate",
  },
  restrictive: {
    bg: "#fee2e2",
    border: "#dc2626",
    color: "#b91c1c",
    label: "Restrictive",
  },
} as const;

export default async function PeptideStateLegalPage({ params }: Props) {
  const { locale, slug, state } = await params;
  if (!isValidLocale(locale)) notFound();

  const peptide = getPeptideBySlug(slug);
  if (!peptide) notFound();

  const stateInfo = getStateBySlug(state);
  if (!stateInfo) notFound();

  const allStates = getAllStatesLegal();
  const stanceConfig = STANCE_STYLES[stateInfo.stance];
  const isApproved = peptide.fdaStatus === "approved";

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Peptides", href: "/peptides" },
    { label: peptide.name, href: `/peptides/${slug}` },
    { label: "Legal", href: `/peptides/${slug}` },
    { label: stateInfo.stateName, href: `/peptides/${slug}/legal/${state}` },
  ];

  // Other states for cross-linking
  const otherStates = allStates
    .filter((s) => s.stateSlug !== state)
    .sort((a, b) => a.stateName.localeCompare(b.stateName));

  const faqItems = [
    {
      question: `Is ${peptide.name} legal in ${stateInfo.stateName}?`,
      answer: isApproved
        ? `Yes. ${peptide.name} is an FDA-approved medication${peptide.fdaApprovedFor ? ` indicated for ${peptide.fdaApprovedFor}` : ""}. As an approved drug, it is available by prescription in all 50 states, including ${stateInfo.stateName}. Consult a licensed healthcare provider to obtain a prescription.`
        : `${peptide.name} is not FDA approved and is classified as a research peptide. ${stateInfo.stateName} has a ${stateInfo.stance} regulatory stance on peptides. ${stateInfo.compoundingAllowed ? "Compounding pharmacies in the state may prepare formulations with a valid prescription." : "Compounding of non-approved peptides is restricted in this state."} Always consult a healthcare provider and verify current regulations.`,
    },
    {
      question: `Can I get ${peptide.name} from a compounding pharmacy in ${stateInfo.stateName}?`,
      answer: isApproved
        ? `${peptide.name} is available through standard pharmacies with a prescription since it is FDA approved. Compounding pharmacies may also prepare alternative formulations if prescribed. ${stateInfo.stateName} ${stateInfo.compoundingAllowed ? "allows" : "restricts"} compounding pharmacy operations.`
        : stateInfo.compoundingAllowed
          ? `${stateInfo.stateName} allows compounding pharmacies to operate under standard oversight. With a valid prescription from a licensed provider, a compounding pharmacy may prepare ${peptide.name}. However, availability depends on the individual pharmacy and current regulatory interpretations.`
          : `${stateInfo.stateName} has restrictions on compounding pharmacies, which limits access to non-FDA-approved peptides like ${peptide.name}. You may need to explore alternative states or discuss FDA-approved alternatives with your healthcare provider.`,
    },
    {
      question: `What are the side effects of ${peptide.name}?`,
      answer: `Known side effects of ${peptide.name} include: ${peptide.sideEffects.slice(0, 3).join(", ")}. ${peptide.evidenceLevel === "C" || peptide.evidenceLevel === "D" ? "Note that human safety data is limited since this peptide has not undergone full clinical trials. " : ""}Always discuss potential side effects with your healthcare provider before starting any peptide therapy.`,
    },
  ];

  return (
    <>
      <PageTracker event="peptide_state_view" params={{ peptide_slug: slug, state_name: state }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `Is ${peptide.name} Legal in ${stateInfo.stateName}?`,
          description: `Legal status and availability of ${peptide.name} in ${stateInfo.stateName}.`,
          url: `https://peptidescholar.com/peptides/${slug}/legal/${state}`,
          isPartOf: {
            "@type": "WebSite",
            name: "PeptideScholar",
            url: "https://peptidescholar.com",
          },
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav crumbs={crumbs} />

        {/* ── Title ──────────────────────────────────────────────────── */}
        <h1
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{
            color: "var(--color-primary, #1A3A5C)",
            fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
          }}
        >
          Is {peptide.name} Legal in {stateInfo.stateName}?
        </h1>

        {/* ── Badges ─────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <EvidenceBadge level={peptide.evidenceLevel} />
          <LegalStatusBadge
            fdaStatus={peptide.fdaStatus}
            prescriptionRequired={peptide.prescriptionRequired}
            wadaBanned={peptide.wadaBanned}
            controlledSubstance={peptide.controlledSubstance}
          />
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
            style={{
              backgroundColor: stanceConfig.bg,
              color: stanceConfig.color,
              border: `1.5px solid ${stanceConfig.border}`,
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: stanceConfig.border }}
            />
            {stateInfo.stateName}: {stanceConfig.label}
          </span>
        </div>

        {/* ── State Stance Info ───────────────────────────────────────── */}
        <div
          className="p-5 rounded-lg mb-8"
          style={{
            backgroundColor: stanceConfig.bg + "33",
            border: `1px solid ${stanceConfig.border}40`,
          }}
        >
          <p className="text-sm leading-relaxed" style={{ color: stanceConfig.color }}>
            <strong>{stateInfo.stateName}</strong> has a <strong>{stateInfo.stance}</strong> regulatory
            stance on peptides.{" "}
            {stateInfo.compoundingAllowed
              ? "Compounding pharmacies are permitted to operate under standard oversight."
              : "Compounding of non-approved peptides is restricted by state regulations."}{" "}
            {stateInfo.ageRestrictions
              ? "Age restrictions apply for certain peptide therapies."
              : "No specific age restrictions beyond standard medical practice."}
          </p>
        </div>

        {/* ── Availability Section ────────────────────────────────────── */}
        <section className="mb-10">
          <h2
            className="text-xl md:text-2xl font-bold mb-4"
            style={{
              color: "var(--color-primary, #1A3A5C)",
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            {peptide.name} Availability in {stateInfo.stateName}
          </h2>

          {isApproved ? (
            <div
              className="p-5 rounded-lg"
              style={{ backgroundColor: "#dcfce7", border: "1px solid #bbf7d0" }}
            >
              <div className="flex items-start gap-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <div>
                  <p className="font-bold text-green-800 mb-1">Available by Prescription</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    As an FDA-approved medication
                    {peptide.fdaApprovedFor ? ` (approved for ${peptide.fdaApprovedFor})` : ""},
                    {" "}{peptide.name} is available by prescription in {stateInfo.stateName} and all
                    other U.S. states. Contact a licensed healthcare provider to discuss whether{" "}
                    {peptide.name} is appropriate for your situation.
                    {peptide.brandNames.length > 0 && (
                      <> Brand names include: {peptide.brandNames.join(", ")}.</>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="p-5 rounded-lg"
              style={{
                backgroundColor: stateInfo.stance === "permissive" ? "#f0fdf4" : stateInfo.stance === "moderate" ? "#fffbeb" : "#fef2f2",
                border: `1px solid ${stateInfo.stance === "permissive" ? "#bbf7d0" : stateInfo.stance === "moderate" ? "#fde68a" : "#fecaca"}`,
              }}
            >
              <div className="flex items-start gap-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={stanceConfig.border}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <div>
                  <p className="font-bold mb-1" style={{ color: stanceConfig.color }}>
                    {stateInfo.stance === "permissive"
                      ? "Generally Accessible"
                      : stateInfo.stance === "moderate"
                        ? "Standard Access with Oversight"
                        : "Restricted Access"}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: stanceConfig.color }}>
                    {peptide.name} is not FDA approved and is available primarily for research purposes.{" "}
                    {stateInfo.stance === "permissive" ? (
                      <>
                        {stateInfo.stateName} has minimal restrictions beyond federal guidelines.
                        Research peptide access is relatively open, and compounding pharmacies operate
                        with standard federal oversight.
                      </>
                    ) : stateInfo.stance === "moderate" ? (
                      <>
                        {stateInfo.stateName} follows federal compounding and pharmaceutical regulations
                        with standard Board of Pharmacy oversight. Access to research peptides is
                        available through appropriate channels with proper documentation.
                      </>
                    ) : (
                      <>
                        {stateInfo.stateName} enforces additional state-level restrictions beyond federal
                        requirements. Access to non-approved peptides like {peptide.name} is limited.
                        Compounding pharmacies face enhanced oversight and may not prepare this peptide.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── Key Facts Table ─────────────────────────────────────────── */}
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

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Peptide", value: peptide.name },
              { label: "State", value: stateInfo.stateName },
              {
                label: "FDA Status",
                value: isApproved
                  ? `Approved${peptide.fdaApprovedFor ? ` (${peptide.fdaApprovedFor})` : ""}`
                  : "Not Approved",
              },
              { label: "Evidence Level", value: `Level ${peptide.evidenceLevel}` },
              { label: "State Stance", value: stateInfo.stance.charAt(0).toUpperCase() + stateInfo.stance.slice(1) },
              { label: "Compounding Allowed", value: stateInfo.compoundingAllowed ? "Yes" : "No" },
              { label: "Age Restrictions", value: stateInfo.ageRestrictions ? "Yes" : "None" },
              { label: "Prescription Required", value: peptide.prescriptionRequired ? "Yes" : "No" },
              { label: "WADA Banned", value: peptide.wadaBanned ? "Yes" : "No" },
              { label: "Controlled Substance", value: peptide.controlledSubstance ? "Yes" : "No" },
            ].map((fact) => (
              <div
                key={fact.label}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{
                  backgroundColor: "var(--color-surface, #f9fafb)",
                  border: "1px solid var(--color-border, #e5e7eb)",
                }}
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {fact.label}
                </span>
                <span className="text-sm font-bold" style={{ color: "var(--color-primary, #1A3A5C)" }}>
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Ad Slot ────────────────────────────────────────────────── */}
        <AdSlot className="mb-8" />

        {/* ── FAQ ────────────────────────────────────────────────────── */}
        <FAQ items={faqItems} title={`${peptide.name} in ${stateInfo.stateName}: FAQ`} />

        {/* ── Medical Disclaimer ──────────────────────────────────────── */}
        <MedicalDisclaimer />

        {/* ── Navigation Links ────────────────────────────────────────── */}
        <section className="mt-10 space-y-6">
          {/* Quick links */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/peptides/${slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              style={{
                backgroundColor: "var(--color-primary, #1A3A5C)",
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              &larr; {peptide.name} Overview
            </Link>
            <Link
              href={`/legal/${state}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              style={{
                backgroundColor: "var(--color-surface, #f3f4f6)",
                color: "var(--color-primary, #1A3A5C)",
                border: "1px solid var(--color-border, #e5e7eb)",
                textDecoration: "none",
              }}
            >
              All Peptides in {stateInfo.stateName}
            </Link>
          </div>

          {/* Other states for this peptide */}
          <div>
            <h3
              className="text-lg font-bold mb-3"
              style={{
                color: "var(--color-primary, #1A3A5C)",
                fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
              }}
            >
              {peptide.name} Legal Status in Other States
            </h3>
            <div className="flex flex-wrap gap-2">
              {otherStates.slice(0, 15).map((s) => {
                const sStance = STANCE_STYLES[s.stance];
                return (
                  <Link
                    key={s.stateSlug}
                    href={`/peptides/${slug}/legal/${s.stateSlug}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors"
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
              {otherStates.length > 15 && (
                <Link
                  href={`/peptides/${slug}`}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: "var(--color-surface, #f3f4f6)",
                    color: "var(--color-text-muted, #6b7280)",
                    border: "1px solid var(--color-border, #e5e7eb)",
                    textDecoration: "none",
                  }}
                >
                  +{otherStates.length - 15} more states
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
