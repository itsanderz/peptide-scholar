import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPostBySlug, getBlogSlugs } from "@/data/blog-posts";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, AdSlot, EmailCapture, PageTracker, AffiliateProductGrid } from "@/components";
import { getProductSectionsForBlogPost } from "@/data/affiliate-products";
import { getPrimaryReviewerForTopic, getAuthorById } from "@/data/content-authors";
import { AuthorBio } from "@/components/AuthorBio";
import { MedicalReviewBadge } from "@/components/MedicalReviewBadge";
import { ContentDate } from "@/components/ContentDate";
import { isValidLocale } from "@/lib/i18n";
import { withLocaleParams, localeAlternates } from "@/lib/locale-params";
import { getRequestMarket } from "@/lib/request-market";
import { getBlogImageSrc } from "@/lib/blog-image";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return withLocaleParams(getBlogSlugs().map((slug) => ({ slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  const market = await getRequestMarket();

  const alt = localeAlternates("https://peptidescholar.com", `/blog/${slug}`, locale);
  return {
    ...generateSEO({
      title: post.title,
      description: `${post.excerpt} ${market.code === "us" ? "US-first guidance and conversion paths included." : `${market.name} rollout context available.`}`,
      canonical: alt.canonical,
      siteName: "PeptideScholar",
    }),
    alternates: alt,
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

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const market = await getRequestMarket();

  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllBlogPosts().filter((p) => p.slug !== slug).slice(0, 3);
  const catStyle = CATEGORY_COLORS[post.category] ?? { bg: "#F0F3F7", text: "#1A3A5C" };
  const affiliateSections = getProductSectionsForBlogPost(slug);

  // Resolve author and medical reviewer
  const author = getAuthorById(post.authorId ?? "peptide-scholar-editorial");
  const reviewer = post.reviewerId
    ? getAuthorById(post.reviewerId)
    : getPrimaryReviewerForTopic(post.title + " " + post.excerpt);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": author?.role === "medical-reviewer" ? "Person" : "Organization",
      name: author?.name ?? "PeptideScholar Editorial Team",
      ...(author?.credentials ? { description: author.credentials } : {}),
    },
    reviewedBy: reviewer
      ? {
          "@type": "Person",
          name: reviewer.name,
          description: reviewer.credentials,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "PeptideScholar",
      url: "https://peptidescholar.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://peptidescholar.com/blog/${slug}`,
    },
  };

  return (
    <>
      <PageTracker event="market_page_view" params={{ page_family: "blog-detail", page_slug: slug, market: market.code }} />
      <JsonLd data={jsonLd} />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${slug}` },
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
              ? "This research article can feed directly into US-first legal, cost, and provider journeys."
              : `${market.name} is selected. The research analysis remains valid globally, but legal, provider, and pricing calls to action may still be staged for later rollout.`}
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-6 mb-6 relative overflow-hidden rounded-xl" style={{ aspectRatio: "1200/630" }}>
          <Image
            src={getBlogImageSrc(post.slug)}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
            >
              {post.category}
            </span>
            <span className="text-xs text-gray-400">{formatDate(post.publishedAt)}</span>
            <span className="text-xs text-gray-400">&middot; {post.readingTime} min read</span>
          </div>

          <h1
            className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight"
            style={{ color: "#1A3A5C", fontFamily: "var(--font-libre-franklin)" }}
          >
            {post.title}
          </h1>

          <p
            className="text-lg text-gray-600 leading-relaxed border-l-4 border-[#3B7A9E] pl-4"
            style={{ fontFamily: "Source Serif 4, Georgia, serif" }}
          >
            {post.excerpt}
          </p>

          {/* Author & Date */}
          <div className="mt-6">
            <ContentDate
              publishedAt={post.publishedAt}
              updatedAt={post.updatedAt}
              reviewedAt={post.updatedAt ?? post.publishedAt}
            />
          </div>

          {author && (
            <div className="mt-4">
              <AuthorBio author={author} compact showBio={false} />
            </div>
          )}
        </header>

        {/* Medical Review Badge */}
        {reviewer && (
          <div className="mb-6">
            <MedicalReviewBadge
              reviewerName={reviewer.name}
              reviewerCredentials={reviewer.credentials}
              reviewedAt={post.updatedAt ?? post.publishedAt}
            />
          </div>
        )}

        {/* Key Takeaways */}
        <div
          className="rounded-xl p-5 mb-8"
          style={{ backgroundColor: "#F0F7FF", border: "1px solid #BDD8F0" }}
        >
          <h2
            className="text-sm font-bold uppercase tracking-wider mb-3"
            style={{ color: "#1A3A5C" }}
          >
            Key Takeaways
          </h2>
          <ul className="space-y-2">
            {post.keyTakeaways.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2B8A5E" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Medical Disclaimer */}
        <div
          className="rounded-lg p-4 mb-8 text-xs"
          style={{ backgroundColor: "#FFFBEB", border: "1px solid #FCD34D", color: "#92400E" }}
        >
          <strong>Educational content only.</strong> This article is for informational purposes and does not constitute medical advice. Consult a qualified healthcare provider before making any health decisions.
        </div>

        {/* Article Body */}
        <article style={{ fontFamily: "Source Serif 4, Georgia, serif" }}>
          {post.body.map((section, si) => (
            <div key={si} className="mb-8">
              {section.heading && (
                <h2
                  className="text-xl md:text-2xl font-bold mb-3"
                  style={{ color: "#1A3A5C", fontFamily: "var(--font-libre-franklin)" }}
                >
                  {section.heading}
                </h2>
              )}

              {section.callout && (
                <div
                  className="rounded-lg p-4 mb-4 leading-relaxed text-sm"
                  style={{ backgroundColor: "#EEF6FF", border: "1px solid #BDDAF7", color: "#1A3A5C" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B7A9E" strokeWidth="2" className="inline mr-2 -mt-0.5">
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
                  </svg>
                  {section.callout}
                </div>
              )}

              {section.paragraphs?.map((p, pi) => (
                <p key={pi} className="text-gray-700 leading-relaxed mb-4">
                  {p}
                </p>
              ))}

              {section.listItems && (
                <ul className="space-y-2 my-4">
                  {section.listItems.map((item, li) => (
                    <li key={li} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B7A9E" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </article>

        <AdSlot className="my-8" />

        {affiliateSections.map((section) => (
          <AffiliateProductGrid
            key={section.heading}
            heading={section.heading}
            subheading={section.subheading}
            products={section.products}
          />
        ))}

        <div className="mb-8">
          <EmailCapture
            headline={market.code === "us" ? "Get new research reviews and alerts" : `Join the ${market.name} research waitlist`}
            description={
              market.code === "us"
                ? "New articles, regulatory changes, and evidence summaries delivered weekly. No spam."
                : `Get notified when ${market.name}-specific legal guides, provider flows, and tracker support are added to this research hub.`
            }
            signupLocation="blog_detail"
            marketCode={market.code}
            offerSlug={market.code === "us" ? `blog_post_${slug}` : "market_blog_detail_waitlist"}
          />
        </div>

        {/* References */}
        {post.refs.length > 0 && (
          <section className="mt-8 mb-8">
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-libre-franklin)" }}
            >
              References &amp; Sources
            </h2>
            <ol className="space-y-2">
              {post.refs.map((ref, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span
                    className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
                    style={{ backgroundColor: "#1A3A5C", color: "#fff" }}
                  >
                    {i + 1}
                  </span>
                  <span>
                    {ref.title}
                    {ref.pmid && (
                      <>
                        {" "}
                        <a
                          href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold"
                          style={{ color: "#3B7A9E" }}
                        >
                          PMID: {ref.pmid}
                        </a>
                      </>
                    )}
                    {ref.note && <span className="text-gray-400"> — {ref.note}</span>}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Author & Reviewer Bios */}
        {(author || reviewer) && (
          <section className="mt-10 pt-8" style={{ borderTop: "1px solid #D0D7E2" }}>
            <h2
              className="text-xl font-bold mb-5"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-libre-franklin)" }}
            >
              About the Authors
            </h2>
            <div className="space-y-4">
              {author && <AuthorBio author={author} showCredentials showBio />}
              {reviewer && reviewer.id !== author?.id && (
                <AuthorBio author={reviewer} showCredentials showBio />
              )}
            </div>
          </section>
        )}

        {/* Related Posts */}
        {allPosts.length > 0 && (
          <section className="mt-10 pt-8" style={{ borderTop: "1px solid #D0D7E2" }}>
            <h2
              className="text-xl font-bold mb-5"
              style={{ color: "#1A3A5C", fontFamily: "var(--font-libre-franklin)" }}
            >
              More Research Reviews
            </h2>
            <div className="space-y-4">
              {allPosts.map((p) => {
                const cs = CATEGORY_COLORS[p.category] ?? { bg: "#F0F3F7", text: "#1A3A5C" };
                return (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="flex items-start gap-4 p-4 rounded-xl transition-colors hover:bg-gray-50"
                    style={{ border: "1px solid #D0D7E2" }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: cs.bg, color: cs.text }}
                        >
                          {p.category}
                        </span>
                        <span className="text-xs text-gray-400">{formatDate(p.publishedAt)}</span>
                      </div>
                      <p
                        className="text-sm font-bold leading-snug"
                        style={{ color: "#1A3A5C", fontFamily: "var(--font-libre-franklin)" }}
                      >
                        {p.title}
                      </p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B7A9E" strokeWidth="2" className="flex-shrink-0 mt-1">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                );
              })}
            </div>
            <div className="mt-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: "#3B7A9E" }}
              >
                View all articles
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
