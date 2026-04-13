import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogPosts } from "@/data/blog-posts";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, AdSlot, EmailCapture, PageTracker } from "@/components";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/locale-params";
import { getRequestMarket } from "@/lib/request-market";
import { siteConfig } from "@/lib/siteConfig";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const market = await getRequestMarket();

  const alt = localeAlternates(siteConfig.domain, "/blog", locale);

  return {
    ...generateSEO({
      title: "Peptide Research Blog — Evidence-Based Analysis",
      description:
        `In-depth reviews of peptide clinical trial data, regulatory updates, and practical guides ${market.code === "us" ? "with US-first commercial context" : `for ${market.name}`}. Every article cites primary literature.`,
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "Clinical Data": { bg: "#EBF5FF", text: "#1E4D8C" },
  "Research Review": { bg: "#F0FFF4", text: "#1A6B3C" },
  Regulatory: { bg: "#FFF8EB", text: "#92400E" },
  "Practical Guide": { bg: "#F5F0FF", text: "#5B21B6" },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const market = await getRequestMarket();

  const posts = getAllBlogPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "PeptideScholar Research Blog",
    description: "Evidence-based analysis of peptide research, clinical trial data, and regulatory updates.",
    url: `${siteConfig.domain}/blog`,
    publisher: {
      "@type": "Organization",
      name: "PeptideScholar",
      url: siteConfig.domain,
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.publishedAt,
      url: `${siteConfig.domain}/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <PageTracker event="market_page_view" params={{ page_family: "blog-index", page_slug: "blog", market: market.code }} />
      <JsonLd data={jsonLd} />

      {/* Header */}
      <div style={{ background: "linear-gradient(145deg, #0F2740 0%, #1A3A5C 100%)" }} className="py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
            style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
          >
            <span className="text-xs font-semibold tracking-wide text-white/80">
              Active Market: {market.name}
            </span>
          </div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
            style={{ backgroundColor: "rgba(59,122,158,0.2)", border: "1px solid rgba(59,122,158,0.3)" }}
          >
            <span className="text-xs font-semibold tracking-wide" style={{ color: "#3B7A9E" }}>
              Primary Literature · Clinical Trials · Regulatory Updates
            </span>
          </div>
          <h1
            className="text-3xl md:text-4xl font-extrabold text-white mb-4"
            style={{ fontFamily: "var(--font-libre-franklin)" }}
          >
            Peptide Research Blog
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto" style={{ fontFamily: "Source Serif 4, Georgia, serif" }}>
            In-depth analysis of peptide clinical trials, regulatory changes, and evidence-based practical guides.
            Every article cites primary literature.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
          ]}
        />

        <div
          className="rounded-xl p-4 mt-6 mb-8"
          style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3B7A9E] mb-2">
            Active Market
          </div>
          <div className="text-sm md:text-base text-[#1C2028]">
            {market.code === "us"
              ? "These research articles connect directly into US-first legal, cost, and provider journeys."
              : `${market.name} is selected. Research analysis remains globally useful, but some downstream legal and provider calls to action may stay US-first while ${market.name} rollout is still in progress.`}
          </div>
        </div>

        <div className="space-y-8 mt-6">
          {posts.map((post) => {
            const catStyle = CATEGORY_COLORS[post.category] ?? { bg: "#F0F3F7", text: "#1A3A5C" };
            return (
              <article
                key={post.slug}
                className="bg-white rounded-xl overflow-hidden transition-shadow hover:shadow-md"
                style={{ border: "1px solid #D0D7E2" }}
              >
                <Link href={`/blog/${post.slug}`} className="block p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">{formatDate(post.publishedAt)}</span>
                    <span className="text-xs text-gray-400">&middot; {post.readingTime} min read</span>
                  </div>

                  <h2
                    className="text-xl md:text-2xl font-bold mb-3 leading-snug"
                    style={{ color: "#1A3A5C", fontFamily: "var(--font-libre-franklin)" }}
                  >
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-4 leading-relaxed" style={{ fontFamily: "Source Serif 4, Georgia, serif" }}>
                    {post.excerpt}
                  </p>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Takeaways</p>
                    <ul className="space-y-1">
                      {post.keyTakeaways.slice(0, 3).map((t, ki) => (
                        <li key={ki} className="flex items-start gap-2 text-sm text-gray-600">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2B8A5E" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#3B7A9E" }}>
                    Read full analysis
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        <AdSlot className="mt-10" />

        <div
          className="mt-10 rounded-xl p-6 text-center"
          style={{ backgroundColor: "#F0F3F7", border: "1px solid #D0D7E2" }}
        >
          <EmailCapture
            headline={market.code === "us" ? "Want research updates in your inbox?" : `Join the ${market.name} research waitlist`}
            description={
              market.code === "us"
                ? "New articles, regulatory changes, and trial data summaries delivered weekly. No spam."
                : `Get notified when ${market.name}-specific legal guides, provider flows, and tracker support are added to the research hub.`
            }
            signupLocation="blog_index"
            marketCode={market.code}
            offerSlug={market.code === "us" ? "blog_research_digest" : "market_blog_waitlist"}
          />
        </div>
      </div>
    </>
  );
}
