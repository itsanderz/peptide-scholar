import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPeptides } from "@/data/peptides";
import { getAllCategories } from "@/data/categories";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, FAQ, AdSlot, MedicalDisclaimer, EvidenceBadge, EmailCapture, PageTracker } from "@/components";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/locale-params";
import { getRequestMarket } from "@/lib/request-market";
import { siteConfig } from "@/lib/siteConfig";
import { getPeptidesByCategory } from "@/data/peptides";

/* ── Theme ─────────────────────────────────────────────────────────────── */
const C = {
  navy: "#1A3A5C",
  accent: "#D4553A",
  teal: "#3B7A9E",
  success: "#2B8A5E",
  warning: "#D4912A",
  bg: "#F0F3F7",
  surface: "#FFFFFF",
  border: "#D0D7E2",
  text: "#1C2028",
  muted: "#5A6577",
} as const;

/* ── SEO ───────────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const market = await getRequestMarket();

  const alt = localeAlternates(siteConfig.domain, "/guide", locale);

  return {
    ...generateSEO({
      title: "What Are Peptides? The Complete Beginner's Guide (2026)",
      description:
        `Learn what peptides are, how they work, types of therapeutic peptides, FDA-approved vs research peptides, side effects, and legal status ${market.code === "us" ? "with US-first guidance" : `for ${market.name}`}.`,
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

/* ── Table of Contents ─────────────────────────────────────────────────── */
const TOC_ITEMS = [
  { id: "what-are-peptides", label: "What Are Peptides?" },
  { id: "how-they-work", label: "How Do Peptides Work?" },
  { id: "types", label: "Types of Therapeutic Peptides" },
  { id: "fda-approved", label: "FDA-Approved Peptides" },
  { id: "research", label: "Research Peptides" },
  { id: "evidence", label: "Evidence Levels Explained" },
  { id: "safety", label: "Side Effects & Safety" },
  { id: "legal", label: "Legal Status" },
  { id: "tools", label: "Free Tools" },
  { id: "faq", label: "FAQ" },
];

/* ── Category Visual Config ────────────────────────────────────────────── */
const CATEGORY_GRADIENTS: Record<string, string> = {
  "healing-recovery": "linear-gradient(135deg, #2B8A5E 0%, #3B9E6E 100%)",
  "growth-hormone": "linear-gradient(135deg, #3B7A9E 0%, #4A9BBF 100%)",
  "weight-loss": "linear-gradient(135deg, #D4553A 0%, #E8734F 100%)",
  "sexual-health": "linear-gradient(135deg, #C0392B 0%, #E74C3C 100%)",
  "sleep-stress": "linear-gradient(135deg, #6C5CE7 0%, #8B7CF7 100%)",
  "cognitive": "linear-gradient(135deg, #D4912A 0%, #E8A948 100%)",
  "anti-aging": "linear-gradient(135deg, #1A3A5C 0%, #2A5A8C 100%)",
  "immune-support": "linear-gradient(135deg, #27AE60 0%, #2ECC71 100%)",
  "anti-inflammatory": "linear-gradient(135deg, #8E44AD 0%, #A569BD 100%)",
};

/* ── FAQ Data ──────────────────────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    question: "What are peptides used for?",
    answer:
      "Peptides are used across a wide range of medical and research applications. FDA-approved peptide drugs treat conditions including type 2 diabetes and obesity (semaglutide, tirzepatide), growth hormone deficiency (sermorelin, tesamorelin), and hypoactive sexual desire disorder (bremelanotide). Research peptides are being studied for wound healing, neuroprotection, anti-aging, immune modulation, and more, though most lack human clinical trial data.",
  },
  {
    question: "Are peptides safe?",
    answer:
      "FDA-approved peptides have undergone rigorous clinical trials demonstrating safety and efficacy for their approved indications. However, the majority of peptides discussed online (BPC-157, TB-500, etc.) have NOT been tested in human clinical trials and their safety profiles are largely unknown. Common side effects of peptide injections in general include injection site reactions, nausea, and headaches. Self-administering unregulated peptides carries significant risks including contamination, incorrect dosing, and unknown long-term effects.",
  },
  {
    question: "Are peptides legal?",
    answer:
      "The legality of peptides depends on the specific peptide and jurisdiction. FDA-approved peptides like semaglutide and tirzepatide are legal with a prescription. Many research peptides are sold as 'research chemicals' and are not scheduled as controlled substances, but they cannot legally be marketed for human consumption. In 2024, the FDA placed several popular peptides (including BPC-157 and AOD-9604) on the Category 2 list, prohibiting compounding pharmacies from producing them. State laws vary significantly.",
  },
  {
    question: "What is the difference between peptides and proteins?",
    answer:
      "The distinction is primarily one of size. Peptides are short chains of amino acids, typically containing 2 to 50 amino acids linked by peptide bonds. Proteins are larger molecules, generally containing 50 or more amino acids with complex three-dimensional folding structures. Both are made from the same 20 standard amino acids, but proteins have more complex tertiary and quaternary structures that give them different functional properties. Insulin (51 amino acids) sits right at the boundary and is sometimes classified as either.",
  },
  {
    question: "Do peptides need to be injected?",
    answer:
      "Most therapeutic peptides are administered via subcutaneous injection because peptides are rapidly broken down by digestive enzymes if taken orally, resulting in very low bioavailability. However, there are exceptions: oral semaglutide (Rybelsus) uses an absorption enhancer (SNAC) to survive the GI tract; some peptides like BPC-157 are studied orally in preclinical models; intranasal delivery is used for peptides like Semax and DSIP; and topical application is used for peptides like GHK-Cu in skincare. The route of administration significantly affects bioavailability and efficacy.",
  },
  {
    question: "What are GLP-1 peptides?",
    answer:
      "GLP-1 (glucagon-like peptide-1) receptor agonists are a class of peptide drugs that mimic the natural GLP-1 hormone, which regulates blood sugar and appetite. The most well-known are semaglutide (Ozempic, Wegovy) and tirzepatide (Mounjaro, Zepbound). These FDA-approved medications have shown remarkable efficacy for type 2 diabetes management and weight loss, with clinical trials demonstrating 15-22% body weight reduction. They work by stimulating insulin secretion, slowing gastric emptying, and reducing appetite through brain signaling pathways.",
  },
  {
    question: "What is BPC-157?",
    answer:
      "BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide consisting of 15 amino acids derived from a protective protein found in human gastric juice. It is one of the most widely discussed research peptides, primarily studied for wound healing and tissue repair. However, it is important to note that nearly all evidence for BPC-157 comes from animal studies (primarily rats) — there are no published randomized controlled human trials. The FDA placed BPC-157 on the Category 2 list in 2024, prohibiting compounding pharmacies from producing it. It is rated Evidence Level C (Preclinical) on PeptideScholar.",
  },
  {
    question: "How much do peptides cost?",
    answer:
      "Costs vary enormously depending on the peptide and source. FDA-approved peptides obtained through prescription can cost $500-$1,500+ per month without insurance (e.g., semaglutide at list price). Compounded peptides from licensed pharmacies typically range from $100-$400 per month. Research-grade peptides sold as 'research chemicals' online can be significantly cheaper but come with serious concerns about purity, contamination, and legality. Insurance coverage varies widely, and manufacturer savings programs may reduce costs for FDA-approved options.",
  },
  {
    question: "Are peptides FDA approved?",
    answer:
      "Some peptides are FDA approved, but most are not. Over 80 peptide-based drugs have received FDA approval as of 2026, including semaglutide (for diabetes and obesity), tirzepatide (for diabetes and obesity), bremelanotide (for HSDD), sermorelin and tesamorelin (for growth hormone-related conditions), and many others. However, the vast majority of peptides discussed in online wellness communities — including BPC-157, TB-500, CJC-1295, Ipamorelin, and Epithalon — are NOT FDA approved for any indication and remain investigational or research-only compounds.",
  },
  {
    question: "What are the best peptides for weight loss?",
    answer:
      "The only peptides with strong clinical evidence (Evidence Level A) for weight loss are the FDA-approved GLP-1 receptor agonists: semaglutide (Wegovy) and tirzepatide (Zepbound). Semaglutide has demonstrated approximately 15% body weight reduction in the STEP trials, while tirzepatide has shown up to 22.5% weight loss in the SURMOUNT trials. Other peptides sometimes discussed for weight loss, such as AOD-9604 and MOTS-c, have limited or preclinical evidence only and are not FDA approved. We strongly recommend focusing on FDA-approved options with proven efficacy and known safety profiles.",
  },
];

/* ── Page ──────────────────────────────────────────────────────────────── */
export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const market = await getRequestMarket();

  const prefix = locale === "en" ? "" : `/${locale}`;
  const allPeptides = getAllPeptides();
  const categories = getAllCategories();

  const fdaApproved = allPeptides.filter(
    (p) => p.fdaStatus === "approved"
  );
  const evidenceCounts = {
    A: allPeptides.filter((p) => p.evidenceLevel === "A").length,
    B: allPeptides.filter((p) => p.evidenceLevel === "B").length,
    C: allPeptides.filter((p) => p.evidenceLevel === "C").length,
    D: allPeptides.filter((p) => p.evidenceLevel === "D").length,
  };

  const categoriesWithCount = categories.map((cat) => ({
    ...cat,
    count: getPeptidesByCategory(cat.slug).length,
    topPeptide: getPeptidesByCategory(cat.slug).sort((a, b) => {
      const order = { A: 0, B: 1, C: 2, D: 3 };
      return order[a.evidenceLevel] - order[b.evidenceLevel];
    })[0],
  }));

  return (
    <div className="guide-index-page">
      {/* ── JSON-LD: Article + FAQPage ───────────────────────────────── */}
      <PageTracker event="market_page_view" params={{ page_family: "guide", page_slug: "what-are-peptides", market: market.code }} />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "What Are Peptides? The Complete Beginner's Guide",
            description:
              "Learn what peptides are, how they work, types of therapeutic peptides, FDA-approved vs research peptides, side effects, and legal status.",
            author: {
              "@type": "Organization",
              name: "PeptideScholar",
              url: "https://peptidescholar.com",
            },
            publisher: {
              "@type": "Organization",
              name: "PeptideScholar",
              url: "https://peptidescholar.com",
            },
            datePublished: "2026-03-01",
            dateModified: "2026-03-23",
            mainEntityOfPage: `${siteConfig.domain}/guide`,
            image: `${siteConfig.domain}/og-image.svg`,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #0F2740 0%, #1A3A5C 40%, #1E4D6E 100%)",
        }}
      >
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-20 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.82)" }}>
            <span>Active market:</span>
            <span style={{ color: "#FFFFFF" }}>{market.name}</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ backgroundColor: "rgba(59,122,158,0.2)", border: "1px solid rgba(59,122,158,0.3)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B7A9E" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-xs font-semibold tracking-wide" style={{ color: "#3B7A9E" }}>
              Beginner&apos;s Guide &middot; Evidence-Based &middot; Updated March 2026
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5 text-white"
            style={{ fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
          >
            What Are Peptides?
          </h1>

          <p
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-6 leading-relaxed"
            style={{ fontFamily: "var(--font-body, 'Source Serif 4', serif)" }}
          >
            The Complete Evidence-Based Guide to Therapeutic Peptides
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-white/60" style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            Last updated March 2026 &middot; {allPeptides.length} peptides covered
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-8 md:h-12">
            <path d="M0 60L48 53.3C96 46.7 192 33.3 288 30C384 26.7 480 33.3 576 36.7C672 40 768 40 864 36.7C960 33.3 1056 26.7 1152 26.7C1248 26.7 1344 33.3 1392 36.7L1440 40V60H0Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* ── Breadcrumbs ──────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Guide", href: `${prefix}/guide` },
          ]}
        />
        <div
          className="rounded-xl p-4 mt-6"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3B7A9E] mb-2">
            Active Market
          </div>
          <div className="text-sm md:text-base text-[#1C2028]">
            {market.code === "us"
              ? "This guide feeds directly into US-first legal, provider, and treatment tools."
              : `${market.name} is selected. The science stays global, while legal, provider, and pricing guidance may still be phased in as ${market.name} rollout continues.`}
          </div>
        </div>
      </div>

      {/* ── Main Layout: Sidebar + Content ───────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex gap-10">
          {/* ── Sticky Table of Contents (Desktop) ───────────────────── */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav
              className="sticky top-24 rounded-xl p-5"
              style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
            >
              <h2
                className="text-sm font-bold uppercase tracking-wider mb-4"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                Table of Contents
              </h2>
              <ul className="space-y-2">
                {TOC_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block text-sm leading-snug py-1 transition-colors hover:text-[#3B7A9E]"
                      style={{ color: C.muted }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* ── Article Content ───────────────────────────────────────── */}
          <article className="flex-1 min-w-0" style={{ fontFamily: "Source Serif 4, Georgia, serif" }}>

            {/* ── Mobile TOC (collapsed) ─────────────────────────────── */}
            <details className="lg:hidden mb-8 rounded-xl overflow-hidden" style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}>
              <summary
                className="px-5 py-3 cursor-pointer text-sm font-bold"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                Table of Contents
              </summary>
              <ul className="px-5 pb-4 space-y-2">
                {TOC_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block text-sm py-1 transition-colors hover:text-[#3B7A9E]"
                      style={{ color: C.muted }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>

            {/* ═══════════════════════════════════════════════════════════
                Section 1: What Are Peptides?
            ═══════════════════════════════════════════════════════════ */}
            <section id="what-are-peptides" className="mb-12 scroll-mt-24">
              <h2
                className="text-2xl md:text-3xl font-bold mb-5"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                What Are Peptides?
              </h2>

              <p className="text-lg leading-relaxed mb-4" style={{ color: C.text }}>
                Peptides are short chains of amino acids — typically between 2 and 50 — linked together by peptide bonds.
                They are the building blocks of proteins but are distinguished by their smaller size and simpler structure.
                While proteins fold into complex three-dimensional shapes and can contain hundreds or thousands of amino acids,
                peptides are compact molecules that can act as precise biological signals throughout the body.
              </p>

              <p className="text-lg leading-relaxed mb-4" style={{ color: C.text }}>
                Your body naturally produces thousands of peptides that serve as hormones, neurotransmitters, and signaling molecules.
                Insulin, a 51-amino-acid peptide produced by the pancreas, regulates blood sugar. Oxytocin, a 9-amino-acid peptide,
                plays roles in social bonding and childbirth. Endorphins, the body&apos;s natural painkillers, are peptides that bind
                to opioid receptors. These natural peptides are essential to virtually every physiological process — from immune
                defense and wound healing to metabolism, cognition, and reproduction.
              </p>

              <p className="text-lg leading-relaxed mb-6" style={{ color: C.text }}>
                Peptide therapeutics have become one of the fastest-growing areas of pharmaceutical research and development.
                Their high specificity, low toxicity profile (relative to small-molecule drugs), and ability to modulate complex
                biological pathways make them attractive drug candidates. As of 2026, over 80 peptide drugs have received FDA approval,
                with hundreds more in clinical trials. The global peptide therapeutics market is projected to exceed $80 billion
                by 2030, driven largely by the success of GLP-1 receptor agonists like semaglutide and tirzepatide for diabetes
                and obesity.
              </p>

              {/* Key stat callout */}
              <div
                className="flex items-center gap-4 p-5 rounded-xl mb-6"
                style={{ backgroundColor: "rgba(59,122,158,0.08)", border: `1px solid rgba(59,122,158,0.2)` }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl font-extrabold"
                  style={{ backgroundColor: C.teal, color: "#fff", fontFamily: "var(--font-heading)" }}
                >
                  80+
                </div>
                <div>
                  <div className="font-bold text-sm" style={{ color: C.navy }}>
                    FDA-Approved Peptide Drugs
                  </div>
                  <div className="text-sm" style={{ color: C.muted }}>
                    As of 2026, including treatments for diabetes, obesity, cancer, osteoporosis, and more
                  </div>
                </div>
              </div>
            </section>

            <AdSlot className="mb-10" />

            {/* ═══════════════════════════════════════════════════════════
                Section 2: How Do Peptides Work?
            ═══════════════════════════════════════════════════════════ */}
            <section id="how-they-work" className="mb-12 scroll-mt-24">
              <h2
                className="text-2xl md:text-3xl font-bold mb-5"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                How Do Peptides Work?
              </h2>

              <h3
                className="text-xl font-bold mb-3"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                Receptor Binding & Signaling
              </h3>
              <p className="text-lg leading-relaxed mb-4" style={{ color: C.text }}>
                Peptides function primarily by binding to specific receptors on cell surfaces, acting as chemical messengers
                that trigger intracellular signaling cascades. When a peptide binds to its target receptor — much like a key
                fitting into a lock — it activates downstream molecular pathways that produce a physiological response. For
                example, GLP-1 receptor agonists bind to GLP-1 receptors on pancreatic beta cells, stimulating insulin secretion.
                Growth hormone-releasing peptides (GHRPs) bind to ghrelin receptors in the pituitary gland, triggering
                growth hormone release.
              </p>
              <p className="text-lg leading-relaxed mb-6" style={{ color: C.text }}>
                This receptor specificity is what makes peptides so valuable as therapeutics. Unlike broad-acting small molecules
                that may interact with many receptor types (causing side effects), peptides tend to bind selectively to their
                target receptors, resulting in more precise biological effects with potentially fewer off-target interactions.
              </p>

              <h3
                className="text-xl font-bold mb-3"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                Routes of Administration
              </h3>
              <p className="text-lg leading-relaxed mb-4" style={{ color: C.text }}>
                The route of administration significantly impacts a peptide&apos;s bioavailability and therapeutic efficacy:
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  {
                    route: "Subcutaneous Injection",
                    desc: "The most common route. Peptides are injected into the fatty tissue beneath the skin, providing consistent absorption. Used for semaglutide, insulin, and most therapeutic peptides.",
                    pct: "~100%",
                  },
                  {
                    route: "Oral",
                    desc: "Challenging due to GI degradation. Oral semaglutide (Rybelsus) uses SNAC, an absorption enhancer, to achieve ~1% bioavailability — enough for therapeutic effect at higher doses.",
                    pct: "~1-2%",
                  },
                  {
                    route: "Intranasal",
                    desc: "Used for peptides targeting the CNS. Avoids first-pass liver metabolism. Examples include Semax and DSIP. Bioavailability varies from 10-50% depending on the peptide.",
                    pct: "10-50%",
                  },
                  {
                    route: "Topical",
                    desc: "Used primarily for skin-targeted peptides like GHK-Cu. Limited systemic absorption, which is a feature for cosmetic applications. Common in anti-aging skincare products.",
                    pct: "Local",
                  },
                ].map((item) => (
                  <div
                    key={item.route}
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm" style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}>
                        {item.route}
                      </span>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${C.teal}22`, color: C.teal }}
                      >
                        {item.pct} bioavail.
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed m-0" style={{ color: C.muted }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <h3
                className="text-xl font-bold mb-3"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                Half-Life & Bioavailability
              </h3>
              <p className="text-lg leading-relaxed mb-4" style={{ color: C.text }}>
                Most natural peptides have very short half-lives — often measured in minutes — because enzymes called peptidases
                rapidly break them down in the bloodstream. This is why most peptides need to be injected and why pharmaceutical
                companies invest heavily in modifications to extend peptide half-lives. Semaglutide, for example, has a half-life
                of approximately 7 days (enabling weekly dosing) thanks to a fatty acid side chain that binds to albumin,
                shielding it from enzymatic degradation. In contrast, natural GLP-1 has a half-life of only 1-2 minutes.
              </p>
            </section>

            <AdSlot className="mb-10" />

            {/* ═══════════════════════════════════════════════════════════
                Section 3: Types of Therapeutic Peptides
            ═══════════════════════════════════════════════════════════ */}
            <section id="types" className="mb-12 scroll-mt-24">
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                Types of Therapeutic Peptides
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: C.text }}>
                Therapeutic peptides span a wide range of biological functions. On PeptideScholar, we organize them
                into {categories.length} research categories based on their primary area of study and therapeutic application.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {categoriesWithCount.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`${prefix}/best-for/${cat.slug}`}
                    className="group relative rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                    style={{
                      background: CATEGORY_GRADIENTS[cat.slug] || "linear-gradient(135deg, #1A3A5C 0%, #3B7A9E 100%)",
                      minHeight: "120px",
                    }}
                  >
                    <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-10" style={{ backgroundColor: "white" }} />
                    <div className="relative p-5 flex flex-col h-full justify-between">
                      <div>
                        <h3
                          className="text-white font-bold text-base leading-tight mb-1"
                          style={{ fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
                        >
                          {cat.name}
                        </h3>
                        <p className="text-white/70 text-xs leading-snug line-clamp-2 mb-2">
                          {cat.description.split(".")[0]}.
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70 text-xs font-medium">
                          {cat.count} peptide{cat.count !== 1 ? "s" : ""}
                          {cat.topPeptide && (
                            <> &middot; Top: {cat.topPeptide.name}</>
                          )}
                        </span>
                        <span className="text-white/60 group-hover:text-white transition-colors text-xs">
                          Explore &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                Section 4: FDA-Approved Peptides
            ═══════════════════════════════════════════════════════════ */}
            <section id="fda-approved" className="mb-12 scroll-mt-24">
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                FDA-Approved Peptides
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: C.text }}>
                These are the only peptides in our database that have been proven safe and effective through rigorous
                clinical trials and received formal FDA approval for specific medical indications.
              </p>

              <div className="overflow-x-auto rounded-xl" style={{ border: `1px solid ${C.border}` }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: C.bg }}>
                      <th className="text-left px-4 py-3 font-bold" style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}>
                        Peptide
                      </th>
                      <th className="text-left px-4 py-3 font-bold hidden sm:table-cell" style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}>
                        Brand Names
                      </th>
                      <th className="text-left px-4 py-3 font-bold" style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}>
                        Approved For
                      </th>
                      <th className="text-left px-4 py-3 font-bold hidden md:table-cell" style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}>
                        Evidence
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fdaApproved.map((p, i) => (
                      <tr
                        key={p.slug}
                        style={{ backgroundColor: i % 2 === 0 ? C.surface : C.bg }}
                        className="border-t"
                      >
                        <td className="px-4 py-3">
                          <Link
                            href={`${prefix}/peptides/${p.slug}`}
                            className="font-semibold hover:underline"
                            style={{ color: C.teal }}
                          >
                            {p.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell" style={{ color: C.muted }}>
                          {p.brandNames.length > 0 ? p.brandNames.join(", ") : "—"}
                        </td>
                        <td className="px-4 py-3" style={{ color: C.text }}>
                          {p.fdaApprovedFor || "—"}
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <EvidenceBadge level={p.evidenceLevel} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {fdaApproved.length === 0 && (
                <p className="text-sm italic mt-4" style={{ color: C.muted }}>
                  No FDA-approved peptides found in the current database.
                </p>
              )}
            </section>

            <AdSlot className="mb-10" />

            {/* ═══════════════════════════════════════════════════════════
                Section 5: Research Peptides
            ═══════════════════════════════════════════════════════════ */}
            <section id="research" className="mb-12 scroll-mt-24">
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                Research Peptides
              </h2>
              <p className="text-lg leading-relaxed mb-4" style={{ color: C.text }}>
                The majority of peptides discussed in online communities — including BPC-157, TB-500, CJC-1295,
                Ipamorelin, MOTS-c, and Epithalon — are <strong>not</strong> FDA approved for any indication.
                These are commonly referred to as &ldquo;research peptides&rdquo; or &ldquo;investigational compounds.&rdquo;
                While some have promising preclinical data, they lack the rigorous human clinical trials required for
                regulatory approval.
              </p>

              {/* Evidence breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {(
                  [
                    { level: "A" as const, count: evidenceCounts.A, label: "FDA Approved", color: "#16a34a", bg: "#dcfce7" },
                    { level: "B" as const, count: evidenceCounts.B, label: "Human Studies", color: "#2563eb", bg: "#dbeafe" },
                    { level: "C" as const, count: evidenceCounts.C, label: "Preclinical", color: "#d97706", bg: "#fef3c7" },
                    { level: "D" as const, count: evidenceCounts.D, label: "Limited Data", color: "#dc2626", bg: "#fee2e2" },
                  ]
                ).map((item) => (
                  <div
                    key={item.level}
                    className="text-center p-4 rounded-xl"
                    style={{ backgroundColor: item.bg, border: `2px solid ${item.color}33` }}
                  >
                    <div className="text-3xl font-extrabold mb-1" style={{ color: item.color, fontFamily: "var(--font-heading)" }}>
                      {item.count}
                    </div>
                    <div className="text-xs font-bold" style={{ color: item.color }}>
                      Level {item.level}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: item.color, opacity: 0.75 }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Warning box */}
              <div
                className="p-5 rounded-xl mb-6"
                style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA" }}
              >
                <div className="flex items-start gap-3">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0 mt-0.5">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <div>
                    <p className="font-bold text-sm mb-2" style={{ color: "#991B1B" }}>
                      Important Warning About Unregulated Peptides
                    </p>
                    <p className="text-sm leading-relaxed m-0" style={{ color: "#991B1B" }}>
                      Research peptides purchased online are unregulated products. Independent testing has repeatedly
                      found issues with contamination, incorrect concentrations, and mislabeled products. The FDA
                      has issued warnings about the risks of self-administering these substances. If you are considering
                      peptide therapy, consult a qualified healthcare provider and use only FDA-approved medications
                      or compounds from licensed pharmacies.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-lg leading-relaxed" style={{ color: C.text }}>
                Browse all {allPeptides.length} peptides in our database — each with evidence grades, mechanisms,
                side effects, and cited research — on our{" "}
                <Link href={`${prefix}/peptides`} className="font-semibold underline" style={{ color: C.teal }}>
                  full peptides directory
                </Link>.
              </p>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                Section 6: Evidence Grading System
            ═══════════════════════════════════════════════════════════ */}
            <section id="evidence" className="mb-12 scroll-mt-24">
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                Our Evidence Grading System
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: C.text }}>
                Every peptide on PeptideScholar is assigned an evidence level from A to D based on the strength and
                quality of available scientific research. This system helps you quickly distinguish between proven
                therapeutics and speculative compounds.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    level: "A" as const,
                    title: "Strong Clinical Evidence",
                    desc: "FDA-approved therapeutic with multiple randomized controlled trials (RCTs) in humans demonstrating statistically significant efficacy and an established safety profile. These peptides have undergone the full regulatory review process.",
                    example: "Semaglutide, Tirzepatide, Bremelanotide",
                  },
                  {
                    level: "B" as const,
                    title: "Moderate Human Evidence",
                    desc: "Supported by published human clinical studies (may include small RCTs, open-label trials, or cohort studies) but either not FDA-approved for the discussed indication or approved in other countries only. Promising but more research needed.",
                    example: "Semax, Selank, DSIP",
                  },
                  {
                    level: "C" as const,
                    title: "Preclinical Evidence Only",
                    desc: "Evidence comes primarily from animal studies (in vivo) or cell culture experiments (in vitro). No published randomized controlled human trials. Results may be promising but cannot be extrapolated to humans without clinical validation.",
                    example: "BPC-157, TB-500, MOTS-c",
                  },
                  {
                    level: "D" as const,
                    title: "Very Limited Data",
                    desc: "Minimal published research, unreplicated findings, or largely anecdotal evidence. Scientific support is insufficient to draw meaningful conclusions about efficacy or safety in humans.",
                    example: "Some newer or obscure peptides",
                  },
                ].map((item) => (
                  <div
                    key={item.level}
                    className="flex items-start gap-4 p-5 rounded-xl"
                    style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
                  >
                    <div className="flex-shrink-0 pt-0.5">
                      <EvidenceBadge level={item.level} />
                    </div>
                    <div>
                      <h3
                        className="font-bold text-base mb-1"
                        style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
                      >
                        Level {item.level}: {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-2 m-0" style={{ color: C.text }}>
                        {item.desc}
                      </p>
                      <p className="text-xs m-0" style={{ color: C.muted }}>
                        <strong>Examples:</strong> {item.example}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-lg leading-relaxed" style={{ color: C.text }}>
                Understanding evidence levels is critical for making informed decisions. A peptide with Level C evidence
                may have exciting preclinical results, but that does not mean it is safe or effective in humans. Animal
                studies fail to translate to human outcomes the majority of the time.
              </p>
            </section>

            <AdSlot className="mb-10" />

            {/* ═══════════════════════════════════════════════════════════
                Section 7: Side Effects & Safety
            ═══════════════════════════════════════════════════════════ */}
            <section id="safety" className="mb-12 scroll-mt-24">
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                Side Effects &amp; Safety
              </h2>
              <p className="text-lg leading-relaxed mb-4" style={{ color: C.text }}>
                Side effects vary significantly between peptides, but there are some general principles that apply
                across peptide therapy:
              </p>

              <h3
                className="text-xl font-bold mb-3"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                Common Side Effects of Peptide Injections
              </h3>
              <ul className="space-y-2 mb-6 text-base leading-relaxed" style={{ color: C.text }}>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4553A] font-bold mt-1">&bull;</span>
                  <span><strong>Injection site reactions</strong> — Redness, swelling, itching, or pain at the injection site. The most common side effect across all injectable peptides.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4553A] font-bold mt-1">&bull;</span>
                  <span><strong>Gastrointestinal effects</strong> — Nausea, vomiting, diarrhea, and constipation, particularly common with GLP-1 agonists (semaglutide, tirzepatide).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4553A] font-bold mt-1">&bull;</span>
                  <span><strong>Headache</strong> — Reported across many peptide classes, usually transient and dose-dependent.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4553A] font-bold mt-1">&bull;</span>
                  <span><strong>Flushing and dizziness</strong> — Common with melanocortin peptides (bremelanotide, Melanotan II).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4553A] font-bold mt-1">&bull;</span>
                  <span><strong>Water retention and joint pain</strong> — Associated with growth hormone-releasing peptides (GHRPs) due to GH elevation.</span>
                </li>
              </ul>

              <h3
                className="text-xl font-bold mb-3"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                Why Human Data Is Limited
              </h3>
              <p className="text-lg leading-relaxed mb-4" style={{ color: C.text }}>
                For many popular research peptides, comprehensive human safety data simply does not exist.
                Conducting clinical trials is expensive (typically $50M-$2B per drug) and time-consuming (10-15 years).
                Many research peptides are naturally occurring molecules that cannot be easily patented, reducing
                the financial incentive for pharmaceutical companies to fund large-scale trials. This does not mean
                they are safe or dangerous — it means <em>we do not know</em>.
              </p>

              <h3
                className="text-xl font-bold mb-3"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                FDA Category 2 Ban
              </h3>
              <p className="text-lg leading-relaxed mb-4" style={{ color: C.text }}>
                In 2024, the FDA placed several popular peptides on the Category 2 list under the Federal Food, Drug,
                and Cosmetic Act. Substances on this list cannot be used by compounding pharmacies to create products
                for human use. Notable peptides affected include BPC-157, AOD-9604, and several others. This action
                was taken because these substances lack adequate safety and efficacy data from human clinical trials,
                and the FDA determined they pose potential risks when used without proper clinical oversight.
              </p>

              <h3
                className="text-xl font-bold mb-3"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                WADA Prohibition
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: C.text }}>
                The World Anti-Doping Agency (WADA) prohibits the use of most therapeutic and research peptides in
                competitive sports under section S0 (non-approved substances) and S2 (peptide hormones, growth factors,
                and related substances). Athletes should be aware that the use of virtually any non-prescribed peptide
                could result in a doping violation, regardless of whether it is a controlled substance in their jurisdiction.
              </p>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                Section 8: Legal Status
            ═══════════════════════════════════════════════════════════ */}
            <section id="legal" className="mb-12 scroll-mt-24">
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                Legal Status
              </h2>
              <p className="text-lg leading-relaxed mb-4" style={{ color: C.text }}>
                The legal landscape for peptides in the United States is complex and varies by peptide type, intended
                use, and state jurisdiction. Here is a brief overview:
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    title: "FDA-Approved Peptides",
                    desc: "Legal with a valid prescription from a licensed healthcare provider. Manufactured by FDA-regulated pharmaceutical companies under strict quality controls.",
                    color: C.success,
                  },
                  {
                    title: "Compounded Peptides",
                    desc: "Some peptides not on the Category 2 list may still be compounded by licensed 503A/503B pharmacies with a prescription. Rules vary significantly by state pharmacy board.",
                    color: C.warning,
                  },
                  {
                    title: "Research Chemicals",
                    desc: "Peptides sold 'for research purposes only' exist in a legal gray area. Not scheduled as controlled substances but cannot legally be marketed for human consumption. Buyer assumes all risk.",
                    color: C.accent,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 p-5 rounded-xl"
                    style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, borderLeft: `4px solid ${item.color}` }}
                  >
                    <div>
                      <h3
                        className="font-bold text-base mb-1"
                        style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed m-0" style={{ color: C.text }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-lg leading-relaxed mb-4" style={{ color: C.text }}>
                For a comprehensive, state-by-state breakdown of peptide legality, consult our{" "}
                <Link href={`${prefix}/legal`} className="font-semibold underline" style={{ color: C.teal }}>
                  full 50-state legal guide
                </Link>{" "}
                or use the{" "}
                <Link href={`${prefix}/tools/legal-checker`} className="font-semibold underline" style={{ color: C.teal }}>
                  Legal Status Checker tool
                </Link>{" "}
                to look up a specific peptide in your state.
              </p>
            </section>

            <AdSlot className="mb-10" />

            {/* ═══════════════════════════════════════════════════════════
                Section 9: Free Tools
            ═══════════════════════════════════════════════════════════ */}
            <section id="tools" className="mb-12 scroll-mt-24">
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                Free Peptide Tools
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: C.text }}>
                We built a growing toolkit of free peptide calculators, checkers, and planners to help you navigate the peptide landscape. No signup required.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  {
                    title: "Peptide Finder",
                    desc: "Answer 4 questions to get personalized peptide research recommendations based on your interests.",
                    href: "/tools/peptide-finder",
                    color: C.success,
                    icon: (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    ),
                  },
                  {
                    title: "Reconstitution Calculator",
                    desc: "Calculate reconstitution volumes and syringe units for any peptide vial instantly.",
                    href: "/tools/calculator",
                    color: C.teal,
                    icon: (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                  },
                  {
                    title: "Legal Status Checker",
                    desc: "Check peptide legality in your state. FDA status, compounding rules, and restrictions.",
                    href: "/tools/legal-checker",
                    color: C.navy,
                    icon: (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    ),
                  },
                  {
                    title: "Titration Planner",
                    desc: "Map escalation schedules, dose steps, and weekly protocol changes for GLP-1 and peptide use cases.",
                    href: "/tools/titration-planner",
                    color: C.accent,
                    icon: (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M3 17l6-6 4 4 7-7" />
                        <path d="M14 8h6v6" />
                      </svg>
                    ),
                  },
                ].map((tool) => (
                  <Link
                    key={tool.href}
                    href={`${prefix}${tool.href}`}
                    className="group block rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                    style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
                  >
                    <div className="p-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                        style={{ backgroundColor: tool.color }}
                      >
                        {tool.icon}
                      </div>
                      <h3
                        className="font-bold text-sm mb-1 group-hover:underline"
                        style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
                      >
                        {tool.title}
                      </h3>
                      <p className="text-xs leading-relaxed m-0" style={{ color: C.muted }}>
                        {tool.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                Section 10: FAQ
            ═══════════════════════════════════════════════════════════ */}
            <section id="faq" className="mb-12 scroll-mt-24">
              <FAQ
                items={FAQ_ITEMS}
                title="Frequently Asked Questions About Peptides"
              />
            </section>

            {/* ── Email Capture ───────────────────────────────────────── */}
            <section className="mb-12">
              <EmailCapture
                headline={market.code === "us" ? "Get the Weekly Peptide Research Digest" : `Join the ${market.name} peptide waitlist`}
                description={
                  market.code === "us"
                    ? "New studies, regulatory updates, and evidence-based analysis delivered every week. Join thousands of researchers and practitioners."
                    : `We will notify you when ${market.name}-specific legal guides, provider flows, and tracker support are ready.`
                }
                signupLocation="guide"
                marketCode={market.code}
                offerSlug={market.code === "us" ? "guide_research_digest" : "market_guide_waitlist"}
              />
            </section>

            {/* ── Medical Disclaimer ──────────────────────────────────── */}
            <MedicalDisclaimer />
          </article>
        </div>
      </div>
    </div>
  );
}
