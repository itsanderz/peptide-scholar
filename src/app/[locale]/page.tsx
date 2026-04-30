import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, PageTracker } from "@/components";
import { generateSEO } from "@/components/SEOHead";
import { siteConfig } from "@/lib/siteConfig";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/locale-params";
import { getRequestMarket } from "@/lib/request-market";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const market = await getRequestMarket();

  const alt = localeAlternates(siteConfig.domain, "", locale);
  const descriptor = market.code === "us" ? "for the United States" : `for ${market.name}`;

  const seo = generateSEO({
    title: "PeptideScholar | The Evidence-Based Peptide Reference",
    description:
      `Comprehensive, research-backed peptide reference ${descriptor} with evidence grades, legal guidance, comparisons, and protocol tools. Every claim cited from PubMed.`,
    canonical: alt.canonical,
    siteName: siteConfig.name,
  });

  return {
    ...seo,
    title: { absolute: "PeptideScholar | The Evidence-Based Peptide Reference" },
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

interface Props {
  params: Promise<{ locale: string }>;
}

const textureImages = [
  "/images/nb-landing/tex-weight-loss.png",
  "/images/nb-landing/tex-performance.png",
  "/images/nb-landing/tex-recovery.png",
  "/images/nb-landing/tex-anti-aging.png",
];

function NbHero() {
  return (
    <section className="nb-hero">
      <img
        src="/images/nb-landing/classical-bust.png"
        alt=""
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[400px] md:w-[400px] md:h-[520px] opacity-[0.12] pointer-events-none select-none object-contain"
        aria-hidden="true"
      />

      <div className="container nb-hero-grid">
        <div className="nb-hero-left">
          <div className="nb-hero-label">
            <span className="nb-hero-label-dot"></span>
            <span className="nb-hero-label-text">Evidence Library</span>
          </div>
          <h1 className="nb-hero-title">
            Science<br />Driven.<br /><span className="muted">Human</span><br />Focused.
          </h1>
          <p className="nb-hero-sub">
            Evidence grades, treatment paths, legal context, and protocol tools. Every claim cited from PubMed.
          </p>
          <div className="nb-hero-ctas">
            <Link href="/peptides" className="btn-lime">Browse All Peptides</Link>
            <Link href="/compare" className="btn-outline">Compare Compounds</Link>
          </div>
        </div>
        <div className="nb-hero-right">
          <div className="img-hero-wrap">
            <img src="/images/nb-landing/hero-vial.png" alt="Peptide vial" />
            <div className="nb-vial-caption">
              <span className="line"></span>
              <span>Reference First</span>
              <span className="line"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NbFeatureGrid() {
  const features = [
    {
      title: "Evidence Graded",
      body: "Every peptide is organized by evidence strength so users can separate robust clinical data from preclinical noise.",
    },
    {
      title: "Approval Context",
      body: "FDA status, treatment-path logic, and regulatory framing are surfaced clearly instead of buried in footnotes.",
    },
    {
      title: "Comparison Ready",
      body: "Mechanisms, side effects, route differences, and treatment fit are structured for scanning rather than sales copy.",
    },
    {
      title: "Tool Driven",
      body: "Calculators, legal checkers, provider routing, and trackers turn research into practical decision support.",
    },
  ];

  return (
    <section className="nb-features">
      <div className="mx-auto max-w-[1400px]">
        <div className="nb-features-grid">
          {features.map((f, i) => (
            <div key={f.title} className="nb-feature-card">
              <div className="nb-feature-num"><span>0{i + 1}</span></div>
              <h3 className="nb-feature-title">{f.title}</h3>
              <p className="nb-feature-body">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NbQualitySection() {
  return (
    <section className="nb-quality">
      <div className="mx-auto max-w-[1400px]">
        <div className="nb-quality-grid">
          <div className="nb-quality-dark">
            <span className="nb-quality-label">Editorial Standard</span>
            <h2 className="nb-quality-title">Reference Depth<br />Without Hype</h2>
            <p className="nb-quality-body">The main site is built to explain what is known, what is uncertain, and where treatment, cost, and legal friction actually show up.</p>
            <Link href="/methodology" className="btn-lime">See Methodology</Link>
          </div>
          <div className="nb-quality-img">
            <img src="/images/nb-landing/lab-bench.png" alt="Laboratory bench setup" className="gen-img" />
          </div>
        </div>
      </div>
    </section>
  );
}

function NbExplorePeptides() {
  const categories = [
    { name: "Weight Loss", slug: "weight-loss" },
    { name: "Performance", slug: "growth-hormone" },
    { name: "Recovery", slug: "healing-recovery" },
    { name: "Anti-Aging", slug: "anti-aging" },
  ];

  return (
    <section className="nb-explore">
      <div className="container">
        <div className="nb-explore-header">
          <div>
            <span className="nb-explore-label">Browse</span>
            <h2 className="nb-explore-title">Explore Peptides</h2>
          </div>
          <Link href="/peptides" className="hidden md:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#050505] hover:text-[#5d75c7] transition-colors">
            View All <span className="text-lg">→</span>
          </Link>
        </div>
        <div className="nb-cat-grid">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/best-for/${cat.slug}`}
              className="nb-cat-card"
            >
              <img src={textureImages[i]} alt="" className="texture" aria-hidden="true" />
              <h3 className="nb-cat-title">{cat.name}</h3>
              <div className="nb-cat-meta">
                <span>Category</span>
                <span className="arrow">→</span>
              </div>
              <div className="nb-cat-strip"></div>
            </Link>
          ))}
        </div>
        <div className="mt-6 md:hidden">
          <Link href="/peptides" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#050505]">
            View All <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function NbTrustBar() {
  const items = [
    { label: "Peptide Profiles", sub: "Mechanisms and grading" },
    { label: "Compare Paths", sub: "Head-to-head context" },
    { label: "Care Guidance", sub: "Cost and provider routing" },
    { label: "Transparent Data", sub: "PubMed cited" },
  ];

  return (
    <section className="nb-trust">
      <div className="mx-auto max-w-[1400px]">
        <div className="nb-trust-grid">
          {items.map((item) => (
            <div key={item.label} className="nb-trust-item">
              <div className="nb-trust-title">{item.label}</div>
              <div className="nb-trust-sub">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const market = await getRequestMarket();

  return (
    <>
      <PageTracker event="market_page_view" params={{ page_family: "homepage", page_slug: "home", market: market.code }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "PeptideScholar",
          url: "https://peptidescholar.com",
          description:
            "Comprehensive, research-backed guide to peptides - mechanisms, evidence levels, dosing, side effects, legal status, and comparisons. Every claim cited from PubMed.",
        }}
      />

      <NbHero />
      <NbFeatureGrid />
      <NbQualitySection />
      <NbExplorePeptides />
      <NbTrustBar />
    </>
  );
}
