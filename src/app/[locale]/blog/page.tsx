import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbNav, AdSlot, EmailCapture, PageTracker } from "@/components";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { getAllBlogPosts } from "@/data/blog-posts";
import { getBlogImageSrc } from "@/lib/blog-image";
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
      title: "Peptide Research Blog - Evidence-Based Analysis",
      description:
        `In-depth reviews of peptide clinical trial data, regulatory updates, and practical guides ${market.code === "us" ? "with US-first care-path context" : `for ${market.name}`}. Every article cites primary literature.`,
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
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      url: `${siteConfig.domain}/blog/${post.slug}`,
    })),
  };

  return (
    <>
      <PageTracker event="market_page_view" params={{ page_family: "blog-index", page_slug: "blog", market: market.code }} />
      <JsonLd data={jsonLd} />

      <div className="blog-index-page">
        <section className="blog-index-hero">
          <div className="blog-index-shell blog-index-hero__inner">
            <div>
              <div className="blog-index-badges">
                <span className="blog-index-badge">Active market: {market.name}</span>
                <span className="blog-index-badge is-alt">Primary literature, clinical trials, and regulatory updates</span>
              </div>
              <h1>Peptide Research Blog</h1>
              <p>
                In-depth analysis of peptide clinical trials, regulatory changes, and practical guides.
                Every article cites primary literature and feeds back into the evidence library.
              </p>
            </div>
          </div>
        </section>

        <div className="blog-index-shell blog-index-main">
          <BreadcrumbNav
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
            ]}
          />

          <div className="blog-market-note">
            <strong>Active market</strong>
            <p>
              {market.code === "us"
                ? "These research articles connect directly into US-first legal, cost, and provider journeys."
                : `${market.name} is selected. Research analysis remains globally useful, but some downstream legal and provider calls to action may stay US-first while ${market.name} rollout is still in progress.`}
            </p>
          </div>

          <div className="blog-index-grid">
            {posts.map((post) => {
              const catStyle = CATEGORY_COLORS[post.category] ?? { bg: "#F0F3F7", text: "#1A3A5C" };

              return (
                <article key={post.slug} className="blog-index-card">
                  <Link href={`/blog/${post.slug}`} className="blog-index-card-link">
                    <div className="blog-index-card-media">
                      <Image
                        src={getBlogImageSrc(post.slug)}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 920px) 100vw, 50vw"
                      />
                    </div>

                    <div className="blog-index-card-copy">
                      <div className="blog-index-meta">
                        <span
                          className="blog-index-category"
                          style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
                        >
                          {post.category}
                        </span>
                        <span>{formatDate(post.publishedAt)}</span>
                        <span>{post.readingTime} min read</span>
                      </div>

                      <h2>{post.title}</h2>
                      <p>{post.excerpt}</p>

                      <div className="blog-index-takeaways">
                        <strong>Key takeaways</strong>
                        <ul>
                          {post.keyTakeaways.slice(0, 3).map((takeaway, index) => (
                            <li key={index}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2B8A5E" strokeWidth="2.5" aria-hidden="true">
                                <path d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="blog-index-cta">
                        Read full analysis
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>

          <AdSlot className="mt-10" />

          <div className="blog-index-email">
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
      </div>
    </>
  );
}
