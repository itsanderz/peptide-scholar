import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPeptides, getPeptideBySlug } from "@/data/peptides";
import { getComparisonsForPeptide } from "@/data/comparisons";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import {
  BreadcrumbNav, FAQ, AdSlot, EvidenceBadge, ReferenceList,
  MedicalDisclaimer, PeptideCard, PeptideSidebar, DosingTable, ResearchCard,
  LegalStatusBadge, MoleculeDecoration, ReviewedBadge, ProviderCTA, ResourceBox,
  ClaimSource, TrustBadge, ApprovedTreatmentRouteCard, TreatmentMoneyLinks, AffiliateProductGrid, EmailCapture,
} from "@/components";
import { getProductSectionsForPeptide } from "@/data/affiliate-products";
import { isValidLocale } from "@/lib/i18n";
import { withLocaleParams, localeAlternates } from "@/lib/locale-params";
import { getRequestMarketCode } from "@/lib/request-market";
import { PageTracker } from "@/components/PageTracker";
import { getGeneratedTreatmentHubSlugs } from "@/lib/generated-content";
import { amazonSearch } from "@/lib/affiliate";

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

  const alt = localeAlternates("https://peptidescholar.com", `/peptides/${slug}`, locale);
  const year = new Date().getFullYear();
  const defaultTitle = `${peptide.name}${peptide.brandNames.length > 0 ? ` (${peptide.brandNames.slice(0, 2).join("/")})` : ""}: Benefits, Side Effects & Dosing Guide (${year})`;

  return {
    ...generateSEO({
      title: peptide.seoTitle?.replace("(2026)", `(${year})`) ?? defaultTitle,
      description: `${peptide.name} ${peptide.evidenceLevel === "A" ? "is FDA-approved" : "research"}: benefits, side effects, dosing, mechanism of action, and legal status. Evidence level ${peptide.evidenceLevel}. ${peptide.refs.length} cited studies. ${peptide.fdaStatus === "approved" ? `Brands: ${peptide.brandNames.join(", ")}.` : "Not FDA approved."}${peptide.wadaBanned ? " WADA prohibited." : ""}`,
      canonical: alt.canonical,
      siteName: "PeptideScholar",
    }),
    alternates: alt,
  };
}

export default async function PeptideDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const marketCode = await getRequestMarketCode();

  const peptide = getPeptideBySlug(slug);
  if (!peptide) notFound();

  const comparisons = getComparisonsForPeptide(slug);
  const affiliateSections = getProductSectionsForPeptide({
    fdaStatus: peptide.fdaStatus,
    category: peptide.category,
    routes: peptide.routes,
  });

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
      <PageTracker event="peptide_view" params={{ peptide_slug: slug, peptide_name: peptide.name, evidence_level: peptide.evidenceLevel, peptide_category: peptide.category, market: marketCode }} />
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

      <div className="container py-8">
        <BreadcrumbNav crumbs={crumbs} />
        <ReviewedBadge />

        {/* ── Two-column layout ───────────────────────────────────────── */}
        <div className="pd-grid mt-6">
          {/* ── Main Content (left, wider) ────────────────────────────── */}
          <div className="pd-main">
            <header className="pd-hdr">
              <div className="pd-hdr-top">
                <div>
                  <h1 className="pd-name">{peptide.name}</h1>
                  <p className="pd-meta">
                    <span>{peptide.type}</span>
                    {peptide.aminoAcidCount !== null && (
                      <span>{peptide.aminoAcidCount} amino acids</span>
                    )}
                    {peptide.brandNames.length > 0 && (
                      <span>Brand: {peptide.brandNames.join(", ")}</span>
                    )}
                  </p>
                  <div className="pd-badges">
                    <EvidenceBadge level={peptide.evidenceLevel} />
                    <TrustBadge peptide={peptide} />
                  </div>
                </div>
                <div className="pd-mol">
                  <MoleculeDecoration
                    variant={
                      peptide.aminoAcidCount !== null && peptide.aminoAcidCount <= 5
                        ? "chain"
                        : "helix"
                    }
                  />
                </div>
              </div>
            </header>

            {/* Legal Status Badges */}
            <div className="pd-badges">
              <LegalStatusBadge
                fdaStatus={peptide.fdaStatus}
                prescriptionRequired={peptide.prescriptionRequired}
                wadaBanned={peptide.wadaBanned}
                controlledSubstance={peptide.controlledSubstance}
              />
            </div>

            {/* Description */}
            <div className="pd-desc-box">
              <p>{peptide.description}</p>
            </div>

            {/* Mechanism of Action */}
            <section className="pd-section">
              <h2 className="section-title">Mechanism of Action</h2>
              <p>{peptide.mechanism}</p>
            </section>

            {/* Benefits */}
            <section className="pd-section">
              <h2 className="section-title">Benefits</h2>
              <ul className="pd-benefits">
                {peptide.benefits.map((claim, i) => (
                  <li key={i}>
                    <ClaimSource claim={claim} refs={peptide.refs} />
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
            <section className="pd-section">
              <h2 className="section-title">Side Effects</h2>
              <ul className="pd-sideeffects">
                {peptide.sideEffects.map((claim, i) => (
                  <li key={i}>
                    <ClaimSource claim={claim} refs={peptide.refs} />
                  </li>
                ))}
              </ul>
            </section>

            {/* Provider CTA */}
            <ProviderCTA
              peptideName={peptide.name}
              fdaStatus={peptide.fdaStatus}
              marketCode={marketCode}
            />

            {peptide.fdaStatus === "approved" && (
              <ApprovedTreatmentRouteCard
                peptideName={peptide.name}
                peptideSlug={peptide.slug}
                fdaApprovedFor={peptide.fdaApprovedFor}
                brandNames={peptide.brandNames}
                marketCode={marketCode}
              />
            )}

            <TreatmentMoneyLinks treatmentSlug={peptide.slug} marketCode={marketCode} />

            {peptide.fdaStatus === "approved" && getGeneratedTreatmentHubSlugs("us").includes(peptide.slug) && (
              <div
                className="provider-cta is-muted"
              >
                <div className="pd-side-lbl">
                  Treatment Hub
                </div>
                <div className="provider-title">
                  {peptide.name} Treatment Guide
                </div>
                <p className="provider-copy">
                  Approved product paths, real cost friction, provider routing, and tracker next steps — all in one source-backed hub.
                </p>
                <Link href={`/treatments/${peptide.slug}`} className="btn-outline">
                  Open treatment hub &rarr;
                </Link>
              </div>
            )}

            {/* Research & Evidence */}
            <section className="pd-section">
              <h2 className="section-title">Research &amp; Evidence</h2>
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
              <section className="pd-section">
                <h2 className="section-title">Compare {peptide.name} With</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {comparisons.map((comp) => {
                    const otherName =
                      comp.peptideA === slug ? comp.peptideBName : comp.peptideAName;

                    return (
                      <Link
                        key={comp.slug}
                        href={`/compare/${comp.slug}`}
                        className="pd-comp-link"
                      >
                        <div>
                          <span className="pd-comp-name">
                            {peptide.name} vs {otherName}
                          </span>
                        </div>
                        <span className="pd-comp-arrow">-&gt;</span>
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
                  ctaUrl: amazonSearch("peptide protocols handbook"),
                },
                {
                  title: "Third-Party Peptide Testing",
                  description: "Independent lab analysis to verify peptide purity and authenticity.",
                  type: "testing",
                  ctaText: "Learn More",
                  ctaUrl: "/tools",
                },
              ]}
            />

            {/* Affiliate Product Sections */}
            {affiliateSections.map((section, i) => (
              <AffiliateProductGrid
                key={i}
                heading={section.heading}
                subheading={section.subheading}
                products={section.products}
              />
            ))}

            {/* FAQ */}
            {peptide.faqs.length > 0 && (
              <div>
                <FAQ items={peptide.faqs} title={`${peptide.name} FAQ`} />
              </div>
            )}

            {/* Medical Disclaimer */}
            <MedicalDisclaimer />
          </div>

          {/* ── Sidebar (right, narrower) ─────────────────────────────── */}
          <div className="pd-sidebar">
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
              <div className="pd-side-card">
                <h3 className="pd-side-title">Related Peptides</h3>
                <div className="pd-related">
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
              headline={marketCode === "us" ? "Get peptide research updates" : `Join the ${marketCode.toUpperCase()} peptide waitlist`}
              description={
                marketCode === "us"
                  ? "Weekly evidence summaries and regulatory alerts."
                  : "Get notified when market-specific legal guidance, provider flows, and tracker support are added."
              }
              signupLocation="peptide_detail"
              marketCode={marketCode}
              offerSlug={marketCode === "us" ? `peptide_${peptide.slug}` : "market_peptide_waitlist"}
            />

            <AdSlot className="mt-4" />
          </div>
        </div>
      </div>
    </>
  );
}
