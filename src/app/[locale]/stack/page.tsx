import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbNav, PageTracker } from "@/components";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { getAllSymptoms } from "@/data/symptom-stacks";
import { peptideStacks, stackCategories } from "@/data/peptide-stacks";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/locale-params";
import { siteConfig } from "@/lib/siteConfig";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const alt = localeAlternates(siteConfig.domain, "/stack", locale);

  return {
    ...generateSEO({
      title: "PeptideScholar Stack - Combination Research Hub",
      description:
        "Landing hub for peptide stack research, symptom-first discovery, cost planning, and community stack transparency. Caution-led, evidence-first, and not medical advice.",
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

const features = [
  {
    title: "Combination research",
    copy: "Known stack patterns are grouped by category with explicit evidence grades, mechanism notes, and safety boundaries.",
  },
  {
    title: "Symptom-first routing",
    copy: "The stack surface supports both goal-first exploration and known-combination review so users are not forced into one workflow.",
  },
  {
    title: "Community transparency",
    copy: "Anecdotal stack reports stay clearly separated from research-backed entries and keep their uncertainty visible.",
  },
];

const stackRoutes = [
  {
    title: "Stack Explorer",
    href: "/tools/stack-explorer",
    description: "Review known peptide combinations, synergy rationale, evidence grades, and stack-level safety notes.",
    meta: "Research stacks",
  },
  {
    title: "Stack Generator",
    href: "/tools/stack-generator",
    description: "Start from a symptom or goal and work backward into the peptides studied for that context.",
    meta: "Symptom-first discovery",
  },
  {
    title: "Stack Cost Calculator",
    href: "/tools/stack-cost-calculator",
    description: "Estimate monthly and multi-month cost ranges for peptide stacks and stack-adjacent symptom maps.",
    meta: "Planning tool",
  },
  {
    title: "Community Stacks",
    href: "/tools/community-stacks",
    description: "Browse anecdotal stack reports with side-effect notes and explicit research-transparency disclaimers.",
    meta: "Anecdotal reports",
  },
  {
    title: "Wolverine Stack Guide",
    href: "/guide/wolverine-stack",
    description: "Read the long-form breakdown of the most referenced healing stack and why the evidence base remains weak.",
    meta: "Case study",
  },
  {
    title: "Evidence Comparator",
    href: "/tools/evidence-comparator",
    description: "Compare individual peptides inside a stack before treating the combination as more established than its components.",
    meta: "Component analysis",
  },
];

const steps = [
  {
    step: "1",
    title: "Start with the use case",
    copy: "Use the generator when the user has a symptom or goal, and the explorer when they already know the combination name.",
  },
  {
    step: "2",
    title: "Check the evidence band",
    copy: "Separate FDA-backed monotherapy, research-only stacks, and community combinations before reading mechanism claims.",
  },
  {
    step: "3",
    title: "Price the workflow",
    copy: "Use the stack cost calculator to expose the practical burden before anyone treats a combination as realistic.",
  },
  {
    step: "4",
    title: "Keep anecdotes boxed in",
    copy: "Community reports exist for transparency only and should never be blended into the research route without clear caveats.",
  },
];

export default async function StackLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const symptoms = getAllSymptoms();
  const researchStacks = peptideStacks.filter((stack) => stack.type === "research");
  const communityStacks = peptideStacks.filter((stack) => stack.type === "community");
  const cautionCount = peptideStacks.filter((stack) => stack.warningLevel !== "none").length;
  const categoryCards = stackCategories
    .map((category) => {
      const matches = peptideStacks.filter((stack) => stack.category === category.id);
      return {
        ...category,
        count: matches.length,
        samples: matches.slice(0, 3).map((stack) => stack.name),
      };
    })
    .filter((category) => category.count > 0);

  return (
    <>
      <PageTracker event="market_page_view" params={{ page_family: "stack_landing", page_slug: "stack", market: "us" }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "PeptideScholar Stack",
          description: "Landing hub for peptide stack research, combination tools, and community stack transparency.",
          url: `${siteConfig.domain}/stack`,
        }}
      />

      <div className="stack-primary stack-page">
        <section className="stack-hero">
          <div className="subsite-shell">
            <div className="badge">Stack research hub | Caution-led planning | Beta</div>
            <h1>PeptideScholar Stack</h1>
            <p>
              Dedicated surface for peptide combinations, symptom-first stack discovery, pricing workflow,
              and community stack transparency. This is where stack content stops feeling like a tool
              sidebar and starts behaving like its own product area.
            </p>
          </div>
        </section>

        <section className="stack-features">
          {features.map((feature) => (
            <div key={feature.title} className="stack-feat">
              <div className="stack-feat-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#243034" strokeWidth="2" aria-hidden="true">
                  <path d="M12 3v18M3 12h18" />
                </svg>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </div>
          ))}
        </section>

        <div className="subsite-main stack-page">
          <BreadcrumbNav
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Stack", href: "/stack" },
            ]}
          />

          <section className="subsite-section">
            <div className="subsite-section-head">
              <div>
                <h2>Landing Routes</h2>
                <p>
                  The stack surface now has its own entry point and route map. It pulls together
                  {` ${researchStacks.length}`} research stacks, {communityStacks.length} community stacks,
                  and {symptoms.length} symptom categories without forcing users to guess where stack content lives.
                </p>
              </div>
            </div>

            <div className="stack-tool-grid">
              {stackRoutes.map((route) => (
                <Link key={route.href} href={route.href} className="stack-tool-card">
                  <span className="subsite-kicker">{route.meta}</span>
                  <h3 className="mt-4">{route.title}</h3>
                  <p>{route.description}</p>
                  <div className="subsite-link mt-6">
                    Open route
                    <span aria-hidden="true">-&gt;</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="subsite-section">
            <div className="subsite-section-head">
              <div>
                <h2>Stack Categories</h2>
                <p>
                  Categories stay visible at the landing level so the user can see whether they are entering
                  healing, metabolic, cognitive, or community territory before reading combination claims.
                </p>
              </div>
            </div>

            <div className="stack-category-grid">
              {categoryCards.map((category) => (
                <div key={category.id} className="stack-category-card">
                  <span className="subsite-kicker" style={{ color: category.color }}>
                    {category.count} route{category.count === 1 ? "" : "s"}
                  </span>
                  <h3 className="mt-4">{category.label}</h3>
                  <p>
                    Sample combinations from this category are surfaced below so the landing page reads like
                    a real hub instead of a blank redirect.
                  </p>
                  <div className="stack-sample-list">
                    {category.samples.map((sample) => (
                      <span key={sample} className="subsite-kicker">
                        {sample}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="subsite-section">
            <div className="subsite-section-head">
              <div>
                <h2>How to Use It</h2>
                <p>
                  Stack content needs a clearer workflow than generic editorial pages because combination
                  claims can drift fast if the user is not anchored in evidence and risk first.
                </p>
              </div>
            </div>

            <div className="stack-step-grid">
              {steps.map((item) => (
                <div key={item.step} className="stack-step">
                  <div className="stack-step-num">{item.step}</div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="subsite-section">
            <div className="subsite-section-head">
              <div>
                <h2>Safety Frame</h2>
                <p>
                  The landing page also needs its own caution layer. Stack content is where community lore,
                  sports bans, and speculative synergy claims overlap the most.
                </p>
              </div>
            </div>

            <div className="stack-safety-grid">
              <div className="stack-safety-item">
                <strong>Evidence separation</strong>
                <p>
                  {researchStacks.length} stacks in the current dataset are framed as research-backed combinations
                  or monotherapy baselines, while {communityStacks.length} are explicitly labeled as community or
                  anecdotal patterns.
                </p>
              </div>
              <div className="stack-safety-item">
                <strong>Regulatory and sports risk</strong>
                <p>
                  {cautionCount} stacks already carry caution or contraindication flags. Several prominent entries
                  include WADA-banned peptides, non-FDA-approved compounds, or combinations with no human trials.
                </p>
              </div>
            </div>
          </section>

          <div className="subsite-note is-warm">
            <strong>Not a prescribing surface</strong>
            Stack pages are for research organization, evidence framing, and transparency. They are not dosing
            recommendations, and community combinations should never be read as validated treatment plans.
          </div>
        </div>

        <section className="stack-cta">
          <div className="subsite-shell">
            <h2>Dedicated stack surface</h2>
            <p>
              Pets, Labs, and Stack now each have their own landing layer instead of being treated as
              generic pages hanging off the main site.
            </p>
            <Link href="/tools/stack-explorer" className="subsite-link" style={{ color: "#EDEAE3" }}>
              Open stack explorer
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
