import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPeptides, getPeptideBySlug } from "@/data/peptides";
import { getComparisonsForPeptide } from "@/data/comparisons";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import {
  BreadcrumbNav, FAQ, AdSlot, EvidenceBadge, CitationRef, ReferenceList,
  MedicalDisclaimer, PeptideCard, PeptideSidebar, DosingTable, ResearchCard,
  LegalStatusBadge, MoleculeDecoration, ReviewedBadge, ProviderCTA, ResourceBox,
  EmailCapture,
} from "@/components";
import { isValidLocale } from "@/lib/i18n";
import { withLocaleParams, localeAlternates } from "@/lib/locale-params";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return withLocaleParams(
    getAllPeptides().map((p) => ({ slug: p.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const peptide = getPeptideBySlug(slug);
  if (!peptide) return {};

  return {
    ...generateSEO({
      title: `${peptide.name}${peptide.brandNames.length > 0 ? ` (${peptide.brandNames.slice(0, 2).join("/")})` : ""}: Benefits, Side Effects & Dosing Guide (${new Date().getFullYear()})`,
      description: `${peptide.name} ${peptide.evidenceLevel === "A" ? "is FDA-approved" : "research"}: benefits, side effects, dosing, mechanism of action, and legal status. Evidence level ${peptide.evidenceLevel}. ${peptide.refs.length} cited studies. ${peptide.fdaStatus === "approved" ? `Brands: ${peptide.brandNames.join(", ")}.` : "Not FDA approved."}`,
      canonical: `https://peptidescholar.com/peptides/${slug}`,
      siteName: "PeptideScholar",
    }),
    alternates: localeAlternates("https://peptidescholar.com", `/peptides/${slug}`, locale),
  };
}

export default async function PeptideDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const peptide = getPeptideBySlug(slug);
  if (!peptide) notFound();

  const comparisons = getComparisonsForPeptide(slug);

  // Resolve related peptides
  const relatedPeptides = peptide.relatedPeptides
    .map((relSlug) => {
      const p = getPeptideBySlug(relSlug);
      return p ? { name: p.name, slug: p.slug } : null;
    })
    .filter((p): p is { name: string; slug: string } => p !== null);

  // Build comparison sidebar links
  const comparisonSlugs = comparisons.map((c) => ({
    label:
      c.peptideA === slug
        ? `${peptide.name} vs ${c.peptideBName}`
        : `${peptide.name} vs ${c.peptideAName}`,
    slug: c.slug,
  }));

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Peptides", href: "/peptides" },
    { label: peptide.name, href: `/peptides/${slug}` },
  ];

  // Resolve related peptide data for compact cards
  const relatedPeptideData = peptide.relatedPeptides
    .map((relSlug) => getPeptideBySlug(relSlug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)
    .slice(0, 4);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: `${peptide.name} — Evidence, Dosing & Legal Status`,
          description: peptide.description,
          about: {
            "@type": "Drug",
            name: peptide.name,
            drugClass: peptide.type,
            administrationRoute: peptide.routes.join(", "),
          },
          url: `https://peptidescholar.com/peptides/${slug}`,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <BreadcrumbNav crumbs={crumbs} />
        <ReviewedBadge />

        {/* ── Two-column layout ───────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-8 mt-6">
          {/* ── Main Content (left, wider) ────────────────────────────── */}
          <div className="lg:col-span-2">
            {/* Title + Evidence + Molecule */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1
                    className="text-3xl md:text-4xl font-bold"
                    style={{
                      color: "#1A3A5C",
                      fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                    }}
                  >
                    {peptide.name}
                  </h1>
                  <EvidenceBadge level={peptide.evidenceLevel} />
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  {peptide.type}
                  {peptide.aminoAcidCount !== null && (
                    <> &middot; {peptide.aminoAcidCount} amino acids</>
                  )}
                  {peptide.brandNames.length > 0 && (
                    <> &middot; Brand: {peptide.brandNames.join(", ")}</>
                  )}
                </p>
              </div>
              <div className="hidden md:block flex-shrink-0">
                <MoleculeDecoration
                  variant={
                    peptide.aminoAcidCount !== null && peptide.aminoAcidCount <= 5
                      ? "chain"
                      : "helix"
                  }
                />
              </div>
            </div>

            {/* Legal Status Badges */}
            <div className="mb-6">
              <LegalStatusBadge
                fdaStatus={peptide.fdaStatus}
                prescriptionRequired={peptide.prescriptionRequired}
                wadaBanned={peptide.wadaBanned}
                controlledSubstance={peptide.controlledSubstance}
              />
            </div>

            {/* Description */}
            <div
              className="rounded-lg p-5 mb-6"
              style={{ backgroundColor: "#FAFBFC", border: "1px solid #D0D7E2" }}
            >
              <p className="text-gray-700 leading-relaxed">
                {peptide.description}
              </p>
            </div>

            {/* Mechanism of Action */}
            <section className="mb-8">
              <h2
                className="text-xl md:text-2xl font-bold mb-3"
                style={{
                  color: "#1A3A5C",
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Mechanism of Action
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {peptide.mechanism}
              </p>
            </section>

            {/* Benefits */}
            <section className="mb-8">
              <h2
                className="text-xl md:text-2xl font-bold mb-3"
                style={{
                  color: "#1A3A5C",
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Benefits
              </h2>
              <ul className="space-y-2">
                {peptide.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2B8A5E"
                      strokeWidth="2.5"
                      className="flex-shrink-0 mt-0.5"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className="text-gray-700 text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Dosing Table */}
            <DosingTable
              peptideName={peptide.name}
              dosingNotes={peptide.dosingNotes}
              routes={peptide.routes}
            />

            {/* Side Effects */}
            <section className="mb-8">
              <h2
                className="text-xl md:text-2xl font-bold mb-3"
                style={{
                  color: "#1A3A5C",
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Side Effects
              </h2>
              <ul className="space-y-2">
                {peptide.sideEffects.map((effect, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#D4553A"
                      strokeWidth="2.5"
                      className="flex-shrink-0 mt-0.5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span className="text-gray-700 text-sm leading-relaxed">{effect}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Provider CTA */}
            <ProviderCTA
              peptideName={peptide.name}
              fdaStatus={peptide.fdaStatus}
              category={peptide.categoryName}
            />

            {/* Research & Evidence */}
            <section className="mb-8">
              <h2
                className="text-xl md:text-2xl font-bold mb-4"
                style={{
                  color: "#1A3A5C",
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Research &amp; Evidence
              </h2>
              {peptide.refs.map((ref) => (
                <ResearchCard
                  key={ref.pmid}
                  pmid={ref.pmid}
                  title={ref.title}
                  year={ref.year}
                  journal={ref.journal}
                  finding={ref.finding}
                  evidenceType={ref.evidenceType}
                />
              ))}
            </section>

            <AdSlot className="mb-8" />

            {/* Compare with */}
            {comparisons.length > 0 && (
              <section className="mb-8">
                <h2
                  className="text-xl md:text-2xl font-bold mb-4"
                  style={{
                    color: "#1A3A5C",
                    fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                  }}
                >
                  Compare {peptide.name} With
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {comparisons.map((comp) => {
                    const otherName =
                      comp.peptideA === slug ? comp.peptideBName : comp.peptideAName;

                    return (
                      <Link
                        key={comp.slug}
                        href={`/compare/${comp.slug}`}
                        className="flex items-center justify-between p-4 rounded-lg transition-colors"
                        style={{
                          border: "1px solid #D0D7E2",
                          backgroundColor: "#FFFFFF",
                        }}
                      >
                        <div>
                          <span
                            className="font-semibold text-sm"
                            style={{ color: "#1A3A5C" }}
                          >
                            {peptide.name} vs {otherName}
                          </span>
                        </div>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#3B7A9E"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Reference List */}
            <ReferenceList refs={peptide.refs} />

            {/* Resource Recommendations */}
            <ResourceBox
              resources={[
                {
                  title: "The Peptide Protocols Handbook",
                  description: "Evidence-based reference guide covering mechanisms, research, and clinical applications.",
                  type: "book",
                  ctaText: "View on Amazon",
                  ctaUrl: "#book-link",
                },
                {
                  title: "Third-Party Peptide Testing",
                  description: "Independent lab analysis to verify peptide purity and authenticity.",
                  type: "testing",
                  ctaText: "Learn More",
                  ctaUrl: "#testing-link",
                },
              ]}
            />

            {/* FAQ */}
            {peptide.faqs.length > 0 && (
              <div className="mt-8">
                <FAQ items={peptide.faqs} title={`${peptide.name} FAQ`} />
              </div>
            )}

            {/* Medical Disclaimer */}
            <MedicalDisclaimer />
          </div>

          {/* ── Sidebar (right, narrower) ─────────────────────────────── */}
          <div className="space-y-6">
            <PeptideSidebar
              name={peptide.name}
              type={peptide.type}
              aminoAcidCount={peptide.aminoAcidCount}
              category={peptide.categoryName}
              evidenceLevel={peptide.evidenceLevel}
              fdaStatus={peptide.fdaStatus}
              fdaApprovedFor={peptide.fdaApprovedFor}
              wadaBanned={peptide.wadaBanned}
              controlledSubstance={peptide.controlledSubstance}
              prescriptionRequired={peptide.prescriptionRequired}
              relatedPeptides={relatedPeptides}
              comparisonSlugs={comparisonSlugs}
            />

            {/* Related Peptides as compact cards */}
            {relatedPeptideData.length > 0 && (
              <div>
                <h3
                  className="font-bold mb-3"
                  style={{
                    color: "#1A3A5C",
                    fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                  }}
                >
                  Related Peptides
                </h3>
                <div className="space-y-3">
                  {relatedPeptideData.map((related) => (
                    <PeptideCard
                      key={related.slug}
                      name={related.name}
                      slug={related.slug}
                      category={related.categoryName}
                      evidenceLevel={related.evidenceLevel}
                      description={related.description.slice(0, 80) + "..."}
                      fdaStatus={
                        related.fdaStatus === "approved"
                          ? "FDA Approved"
                          : related.fdaStatus === "cosmetic"
                          ? "Cosmetic"
                          : "Not Approved"
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Email Capture */}
            <EmailCapture
              headline="Get Peptide Research Updates"
              description="Weekly evidence summaries and regulatory alerts."
            />

            <AdSlot className="mt-4" />
          </div>
        </div>
      </div>
    </>
  );
}
