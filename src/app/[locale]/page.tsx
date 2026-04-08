import type { Metadata } from "next";
import Link from "next/link";
import { getAllPeptides, getFeaturedPeptides, getPeptidesByCategory } from "@/data/peptides";
import { getAllCategories } from "@/data/categories";
import { getAllComparisons } from "@/data/comparisons";
import { JsonLd, EmailCapture, AdSlot, PeptideCard, CategoryNav, MedicalDisclaimer, MoleculeDecoration } from "@/components";
import { generateSEO } from "@/components/SEOHead";
import { siteConfig } from "@/lib/siteConfig";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/locale-params";
import { notFound } from "next/navigation";
import { t, HOMEPAGE_CONTENT, PEPTIDE_STRINGS } from "@/data/content-templates";
import { getAllBlogPosts } from "@/data/blog-posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const alt = localeAlternates(siteConfig.domain, "", locale);

  const seo = generateSEO({
    title: "PeptideScholar | The Evidence-Based Peptide Reference",
    description:
      "Comprehensive, research-backed guide to peptides — mechanisms, evidence levels, dosing, side effects, legal status, and comparisons. Every claim cited from PubMed.",
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

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const loc = locale as Locale;
  const allPeptides = getAllPeptides();
  const featured = getFeaturedPeptides();
  const categories = getAllCategories();
  const comparisons = getAllComparisons();
  const latestPosts = getAllBlogPosts().slice(0, 3);

  const categoriesWithCount = categories.map((cat) => ({
    name: cat.name,
    slug: cat.slug,
    count: getPeptidesByCategory(cat.slug).length,
  }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "PeptideScholar",
          url: "https://peptidescholar.com",
          description:
            "Comprehensive, research-backed guide to peptides — mechanisms, evidence levels, dosing, side effects, legal status, and comparisons. Every claim cited from PubMed.",
        }}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(145deg, #0F2740 0%, #1A3A5C 40%, #1E4D6E 100%)" }}>
        {/* Background molecular lattice */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Hexagonal grid pattern */}
            <defs>
              <radialGradient id="hero-glow" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#3B7A9E" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#3B7A9E" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="1200" height="600" fill="url(#hero-glow)" />
            {/* Molecular bonds */}
            {[
              [100,80,180,120], [180,120,160,200], [180,120,260,100], [260,100,340,140],
              [340,140,320,220], [340,140,420,120], [420,120,500,160], [500,160,480,240],
              [700,60,780,100], [780,100,760,180], [780,100,860,80], [860,80,940,120],
              [940,120,920,200], [940,120,1020,100], [1020,100,1100,140],
              [200,380,280,420], [280,420,360,400], [360,400,440,440], [440,440,520,420],
              [520,420,600,460], [600,460,680,440],
              [800,340,880,380], [880,380,960,360], [960,360,1040,400], [1040,400,1120,380],
            ].map(([x1,y1,x2,y2], i) => (
              <line key={`b${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3B7A9E" strokeWidth="1" opacity="0.15" />
            ))}
            {/* Molecular nodes */}
            {[
              [100,80,4], [180,120,5], [160,200,3], [260,100,4], [340,140,5], [320,220,3],
              [420,120,4], [500,160,5], [480,240,3],
              [700,60,4], [780,100,5], [760,180,3], [860,80,4], [940,120,5], [920,200,3],
              [1020,100,4], [1100,140,3],
              [200,380,4], [280,420,5], [360,400,4], [440,440,5], [520,420,4], [600,460,5], [680,440,3],
              [800,340,4], [880,380,5], [960,360,4], [1040,400,5], [1120,380,3],
            ].map(([cx,cy,r], i) => (
              <circle key={`n${i}`} cx={cx} cy={cy} r={r} fill="#3B7A9E" opacity={i % 3 === 0 ? 0.25 : 0.12} />
            ))}
            {/* Floating hexagons */}
            <polygon points="600,50 630,67 630,101 600,118 570,101 570,67" fill="none" stroke="#3B7A9E" strokeWidth="1" opacity="0.08" />
            <polygon points="150,300 175,314 175,342 150,356 125,342 125,314" fill="none" stroke="#3B7A9E" strokeWidth="1" opacity="0.06" />
            <polygon points="1050,250 1080,267 1080,301 1050,318 1020,301 1020,267" fill="none" stroke="#3B7A9E" strokeWidth="1" opacity="0.06" />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            {/* Left: Text content (3/5) */}
            <div className="md:col-span-3 text-center md:text-left">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ backgroundColor: "rgba(59,122,158,0.2)", border: "1px solid rgba(59,122,158,0.3)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B7A9E" strokeWidth="2.5" strokeLinecap="round"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <span className="text-xs font-semibold tracking-wide" style={{ color: "#3B7A9E" }}>
                  Evidence-Based &middot; PubMed Cited &middot; Free Forever
                </span>
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5"
                style={{ fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                <span className="text-white">{t(HOMEPAGE_CONTENT, "heroTitle", loc).split(" ").slice(0, -1).join(" ")} </span>
                <span style={{ color: "#3B7A9E" }}>{t(HOMEPAGE_CONTENT, "heroTitle", loc).split(" ").pop()}</span>
              </h1>

              <p className="text-lg md:text-xl text-white/70 max-w-xl mb-8 leading-relaxed" style={{ fontFamily: "var(--font-body, 'Source Serif 4', serif)" }}>
                {t(HOMEPAGE_CONTENT, "heroSubtitle", loc)}
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-10">
                <Link
                  href="/peptides"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                  style={{ backgroundColor: "#3B7A9E", color: "#fff" }}
                >
                  Browse All Peptides
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
                <Link
                  href="/tools/peptide-finder"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                  Find Your Peptide
                </Link>
              </div>

              {/* Inline trust signals */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center md:justify-start text-xs text-white/50">
                <span className="inline-flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2B8A5E" strokeWidth="2.5" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
                  {allPeptides.filter(p => p.fdaStatus === "approved").length} FDA-Approved
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2B8A5E" strokeWidth="2.5" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
                  Every Claim PubMed Cited
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2B8A5E" strokeWidth="2.5" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
                  No Signup Required
                </span>
              </div>
            </div>

            {/* Right: Stats column (2/5) */}
            <div className="md:col-span-2 hidden md:flex flex-col gap-4">
              {[
                { value: allPeptides.length.toString(), label: "Peptides", sub: "Comprehensive profiles", color: "#3B7A9E" },
                { value: `${comparisons.length}+`, label: "Comparisons", sub: "Head-to-head analysis", color: "#D4553A" },
                { value: "50", label: "State Guides", sub: "Legal status by state", color: "#2B8A5E" },
                { value: "3", label: "Free Tools", sub: "Calculator, finder, checker", color: "#D4912A" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-extrabold flex-shrink-0"
                    style={{ backgroundColor: `${stat.color}22`, color: stat.color, fontFamily: "var(--font-heading)" }}
                  >
                    {stat.value}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{stat.label}</div>
                    <div className="text-white/40 text-xs">{stat.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-8 md:h-12">
            <path d="M0 60L48 53.3C96 46.7 192 33.3 288 30C384 26.7 480 33.3 576 36.7C672 40 768 40 864 36.7C960 33.3 1056 26.7 1152 26.7C1248 26.7 1344 33.3 1392 36.7L1440 40V60H0Z" fill="#F0F3F7" />
          </svg>
        </div>
      </section>

      {/* ── Stats Bar ──────────────────────────────────────────────────── */}
      <section className="py-8" style={{ backgroundColor: "#F0F3F7" }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
            >
              <div className="text-2xl md:text-3xl font-bold" style={{ color: "#1A3A5C" }}>
                {allPeptides.length}
              </div>
              <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mt-1">
                Peptides Covered
              </div>
            </div>
            <div
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
            >
              <div className="text-2xl md:text-3xl font-bold" style={{ color: "#1A3A5C" }}>
                {comparisons.length}+
              </div>
              <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mt-1">
                Comparisons
              </div>
            </div>
            <div
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
            >
              <div className="text-2xl md:text-3xl font-bold" style={{ color: "#1A3A5C" }}>
                50
              </div>
              <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mt-1">
                State Legal Guides
              </div>
            </div>
            <div
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
            >
              <div className="text-2xl md:text-3xl font-bold" style={{ color: "#1A3A5C" }}>
                14
              </div>
              <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mt-1">
                Languages
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Medical Disclaimer (compact) ───────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <MedicalDisclaimer compact />
      </div>

      {/* ── Browse by Category ─────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-2xl md:text-3xl font-bold mb-2 text-center"
            style={{
              color: "#1A3A5C",
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            {t(HOMEPAGE_CONTENT, "categoriesTitle", loc)}
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
            Explore peptides organized by their primary research area and therapeutic category.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {categoriesWithCount.map((cat) => {
              const cfg = ({
                "healing-recovery":  { gradient: "linear-gradient(135deg, #2B8A5E 0%, #3B9E6E 100%)", icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                ) },
                "growth-hormone":    { gradient: "linear-gradient(135deg, #3B7A9E 0%, #4A9BBF 100%)", icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                ) },
                "weight-loss": { gradient: "linear-gradient(135deg, #D4553A 0%, #E8734F 100%)", icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M12 3v1m0 16v1m-7-9H4m16 0h1M7.05 7.05l-.7-.7m11.31 11.31l-.7-.7M7.05 16.95l-.7.7m11.31-11.31l-.7.7"/><circle cx="12" cy="12" r="4"/></svg>
                ) },
                "sexual-health":     { gradient: "linear-gradient(135deg, #C0392B 0%, #E74C3C 100%)", icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                ) },
                "sleep-stress":      { gradient: "linear-gradient(135deg, #6C5CE7 0%, #8B7CF7 100%)", icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
                ) },
                "cognitive":         { gradient: "linear-gradient(135deg, #D4912A 0%, #E8A948 100%)", icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                ) },
                "anti-aging":        { gradient: "linear-gradient(135deg, #1A3A5C 0%, #2A5A8C 100%)", icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                ) },
                "immune-support":    { gradient: "linear-gradient(135deg, #27AE60 0%, #2ECC71 100%)", icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                ) },
                "anti-inflammatory": { gradient: "linear-gradient(135deg, #8E44AD 0%, #A569BD 100%)", icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                ) },
              } as Record<string, { gradient: string; icon: React.ReactNode }>)[cat.slug] || { gradient: "linear-gradient(135deg, #1A3A5C 0%, #3B7A9E 100%)", icon: null };

              return (
                <Link
                  key={cat.slug}
                  href={`/best-for/${cat.slug}`}
                  className="group relative rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                  style={{
                    background: cfg.gradient,
                    minHeight: "140px",
                  }}
                >
                  {/* Decorative circle */}
                  <div
                    className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-10"
                    style={{ backgroundColor: "white" }}
                  />
                  <div className="relative p-5 flex flex-col h-full justify-between">
                    <div>
                      <div className="mb-3 opacity-90">{cfg.icon}</div>
                      <h3 className="text-white font-bold text-sm md:text-base leading-tight" style={{ fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}>
                        {cat.name}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-white/70 text-xs font-medium">
                        {cat.count} peptide{cat.count !== 1 ? "s" : ""}
                      </span>
                      <span className="text-white/60 group-hover:text-white transition-colors text-xs">
                        Explore &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        <AdSlot className="mb-6" />
      </div>

      {/* ── Featured Peptides ──────────────────────────────────────────── */}
      <section className="py-12 md:py-16" style={{ backgroundColor: "#F0F3F7" }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-2xl md:text-3xl font-bold mb-2 text-center"
            style={{
              color: "#1A3A5C",
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            {t(HOMEPAGE_CONTENT, "featuredTitle", loc)}
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
            Peptides with the strongest evidence base — FDA-approved therapeutics and those backed by human clinical studies.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((peptide) => (
              <PeptideCard
                key={peptide.slug}
                name={peptide.name}
                slug={peptide.slug}
                category={peptide.categoryName}
                evidenceLevel={peptide.evidenceLevel}
                description={peptide.description.slice(0, 120) + "..."}
                fdaStatus={
                  peptide.fdaStatus === "approved"
                    ? "FDA Approved"
                    : peptide.fdaStatus === "cosmetic"
                    ? "Cosmetic"
                    : "Not Approved"
                }
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/peptides"
              className="inline-block px-6 py-3 rounded-lg font-semibold text-white transition-colors"
              style={{ backgroundColor: "#1A3A5C" }}
            >
              {t(PEPTIDE_STRINGS, "viewAll", loc)} {t(PEPTIDE_STRINGS, "peptides", loc)} &rarr;
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        <AdSlot className="my-6" />
      </div>

      {/* ── Why PeptideScholar ───────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2
            className="text-2xl md:text-3xl font-bold mb-8 text-center"
            style={{
              color: "#1A3A5C",
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Why PeptideScholar?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: "#1A3A5C" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-bold mb-1" style={{ color: "#1A3A5C" }}>
                Every Claim Cited
              </h3>
              <p className="text-sm text-gray-600">
                Every statement references published peer-reviewed research. PubMed links let you verify for yourself.
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: "#D4553A" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-1" style={{ color: "#1A3A5C" }}>
                Evidence Graded
              </h3>
              <p className="text-sm text-gray-600">
                Clear A-B-C-D evidence grading so you instantly know what is FDA-approved, what has human data, and what is preclinical only.
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: "#1A3A5C" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-1" style={{ color: "#1A3A5C" }}>
                14 Languages
              </h3>
              <p className="text-sm text-gray-600">
                Full site available in 14 languages so researchers and practitioners worldwide can access evidence-based peptide information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── From the Blog ─────────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                Research &amp; Analysis
              </h2>
              <p className="text-gray-600 text-sm">In-depth evidence reviews, trial data summaries, and regulatory updates.</p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: "#3B7A9E" }}
            >
              All articles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {latestPosts.map((post) => {
              const catColors: Record<string, { bg: string; text: string }> = {
                "Clinical Data": { bg: "#EBF5FF", text: "#1E4D8C" },
                "Research Review": { bg: "#F0FFF4", text: "#1A6B3C" },
                "Regulatory": { bg: "#FFF8EB", text: "#92400E" },
                "Practical Guide": { bg: "#F5F0FF", text: "#5B21B6" },
              };
              const cc = catColors[post.category] ?? { bg: "#F0F3F7", text: "#1A3A5C" };
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl overflow-hidden transition-shadow hover:shadow-md"
                  style={{ border: "1px solid #D0D7E2" }}
                >
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: cc.bg, color: cc.text }}>
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400">{post.readingTime} min</span>
                    </div>
                    <h3
                      className="font-bold text-sm leading-snug mb-2 group-hover:text-[#3B7A9E] transition-colors"
                      style={{ color: "#1A3A5C", fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color: "#3B7A9E" }}>
                      Read more
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-5 sm:hidden text-center">
            <Link href="/blog" className="text-sm font-semibold" style={{ color: "#3B7A9E" }}>
              View all articles →
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        <AdSlot className="my-6" />
      </div>

      {/* ── Email Capture ──────────────────────────────────────────────── */}
      <section className="py-12 md:py-16" style={{ backgroundColor: "#F0F3F7" }}>
        <div className="max-w-3xl mx-auto px-4">
          <EmailCapture
            headline="Stay Updated on Peptide Research"
            description="Get weekly summaries of new peptide studies, regulatory changes, and evidence updates delivered to your inbox."
          />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        <AdSlot className="my-6" />
      </div>
    </>
  );
}
