import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, PageTracker, ProviderIntentCard, SourceCitationList } from "@/components";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/locale-params";
import { getRequestMarket } from "@/lib/request-market";
import { siteConfig } from "@/lib/siteConfig";

const C = {
  navy: "#1A3A5C",
  teal: "#3B7A9E",
  bg: "#F0F3F7",
  surface: "#FFFFFF",
  border: "#D0D7E2",
  text: "#1C2028",
  muted: "#5A6577",
} as const;

const SOURCES = [
  {
    id: "fda-semaglutide-2026",
    authority: "FDA",
    title: "Medications Containing Semaglutide Marketed for Type 2 Diabetes or Weight Loss",
    url: "https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/medications-containing-semaglutide-marketed-type-2-diabetes-or-weight-loss",
    claimType: "regulatory" as const,
  },
  {
    id: "wegovy-savings-2026",
    authority: "Wegovy",
    title: "Wegovy Savings Card and Patient Support",
    url: "https://www.wegovy.com/getting-wegovy/savings-and-support.html",
    claimType: "pricing" as const,
  },
  {
    id: "ozempic-savings-2026",
    authority: "Ozempic",
    title: "Ozempic Savings Offer and Patient Support",
    url: "https://www.ozempic.com/savings-and-support/savings-offer.html",
    claimType: "pricing" as const,
  },
  {
    id: "zepbound-savings-2026",
    authority: "Zepbound",
    title: "Zepbound Savings and Support",
    url: "https://www.zepbound.lilly.com/savings",
    claimType: "pricing" as const,
  },
  {
    id: "cms-obesity-medicare-2024",
    authority: "CMS",
    title: "Medicare Part D Coverage of Anti-Obesity Medications — Policy Clarification",
    url: "https://www.cms.gov/newsroom/fact-sheets/medicare-and-medicaid-programs-contract-year-2025-policy-and-technical-changes-medicare-advantage-0",
    claimType: "regulatory" as const,
  },
];

const TOC = [
  { id: "approval-vs-coverage", label: "Approval ≠ Coverage" },
  { id: "obesity-vs-diabetes", label: "Obesity vs Diabetes Friction" },
  { id: "prior-auth", label: "What Prior Auth Actually Involves" },
  { id: "savings-options", label: "Official Savings Options" },
  { id: "what-to-ask", label: "What to Ask a Provider" },
  { id: "provider-path", label: "Finding the Right Provider Path" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const alt = localeAlternates(siteConfig.domain, "/guide/insurance-prior-auth", locale);

  return {
    ...generateSEO({
      title: "Semaglutide & Tirzepatide Insurance Coverage and Prior Authorization Guide | PeptideScholar",
      description:
        "Why FDA approval does not equal insurance coverage for semaglutide and tirzepatide. Explains obesity vs diabetes coverage friction, prior authorization process, official savings options, and how to use a provider who can navigate the process.",
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: { canonical: alt.canonical, languages: alt.languages },
  };
}

export default async function InsurancePriorAuthPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const market = await getRequestMarket();
  const publishDate = "2026-04-12";

  return (
    <>
      <PageTracker event="guide_view" params={{ guide_slug: "insurance-prior-auth", market: market.code }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Semaglutide & Tirzepatide Insurance Coverage and Prior Authorization Guide",
          description:
            "Why FDA approval does not equal insurance coverage, the obesity vs diabetes coverage split, prior auth process, and official savings options.",
          datePublished: publishDate,
          dateModified: publishDate,
          author: { "@type": "Organization", name: siteConfig.name },
          publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.domain },
          url: `${siteConfig.domain}/guide/insurance-prior-auth`,
          mainEntityOfPage: `${siteConfig.domain}/guide/insurance-prior-auth`,
        }}
      />

      <div className="guide-article-page max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Guide", href: "/guide" },
            { label: "Insurance & Prior Auth", href: "/guide/insurance-prior-auth" },
          ]}
        />

        <div className="grid lg:grid-cols-[1fr_240px] gap-8 items-start">
          <article>
            <header className="mb-8">
              <div
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4"
                style={{ backgroundColor: "#F8FAFC", borderColor: C.border, color: "#334155" }}
              >
                <span>Coverage guide</span>
                <span style={{ color: C.navy }}>US-first</span>
              </div>
              <h1
                className="text-3xl md:text-4xl font-bold mb-3 leading-tight"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                Semaglutide &amp; Tirzepatide: Insurance Coverage and Prior Authorization
              </h1>
              <p className="text-lg leading-relaxed text-gray-600">
                FDA approval is a regulatory fact. Coverage is a separate business decision made by
                each payer. Understanding the gap between the two is the most useful thing you can
                do before committing to a treatment path.
              </p>
              <p className="text-sm text-gray-400 mt-3">Updated: April 2026 &middot; {SOURCES.length} official sources</p>
            </header>

            {market.code !== "us" && (
              <div
                className="rounded-xl p-4 mb-8"
                style={{ backgroundColor: "#FFF7ED", border: "1px solid #FDBA74" }}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C] mb-2">
                  Market Note
                </div>
                <div className="text-sm text-[#9A3412]">
                  {market.name} is selected. This guide covers US insurance and prior authorization
                  specifically. Coverage friction, savings programs, and approval logic differ
                  materially in other markets.
                </div>
              </div>
            )}

            {/* Section 1 */}
            <section id="approval-vs-coverage" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                FDA Approval Does Not Equal Coverage
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The FDA approves a drug for a specific indication based on safety and efficacy data.
                That approval authorizes prescribing — it does not obligate any payer to cover the
                cost. Insurers, Medicare Part D plans, Medicaid programs, and employer-sponsored
                plans each set their own formulary and coverage criteria independently.
              </p>
              <div
                className="rounded-xl p-5 mb-5"
                style={{ backgroundColor: "#FFF7ED", border: "1px solid #FDBA74" }}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#C2410C" }}>
                  Key distinction
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#9A3412" }}>
                  A drug being FDA-approved means a licensed physician can legally prescribe it in the
                  US. It says nothing about whether your specific plan will pay for it, at what tier,
                  under what conditions, or at all.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    label: "What FDA approval means",
                    items: [
                      "Drug meets safety and efficacy standards",
                      "Licensed prescribers can write a prescription",
                      "Drug can be legally dispensed at pharmacies",
                      "Official label defines approved indications",
                    ],
                    bg: "#F0FDF4", border: "#BBF7D0", color: "#15803D",
                  },
                  {
                    label: "What FDA approval does not mean",
                    items: [
                      "Your insurance will cover it",
                      "You will pay anything less than list price",
                      "Prior authorization will be approved",
                      "Your plan places it on a favorable formulary tier",
                    ],
                    bg: "#FEF2F2", border: "#FECACA", color: "#991B1B",
                  },
                ].map((col) => (
                  <div key={col.label} className="rounded-xl p-5" style={{ backgroundColor: col.bg, border: `1px solid ${col.border}` }}>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-3" style={{ color: col.color }}>
                      {col.label}
                    </div>
                    <ul className="space-y-2">
                      {col.items.map((item, i) => (
                        <li key={i} className="text-sm leading-relaxed flex gap-2" style={{ color: col.color }}>
                          <span className="mt-0.5 shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2 */}
            <section id="obesity-vs-diabetes" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                Obesity vs Diabetes: The Coverage Split
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Semaglutide and tirzepatide each have multiple branded products with different
                indications. The coverage behavior for an obesity indication and a diabetes
                indication can differ dramatically — even when the active molecule is the same.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    brand: "Wegovy",
                    molecule: "Semaglutide",
                    indication: "Chronic weight management (obesity / overweight + comorbidity)",
                    note: "Commercial plans vary widely. Many require prior auth and BMI or comorbidity documentation. Medicare Part D historically excluded anti-obesity drugs; CMS coverage expansions are ongoing and plan-specific.",
                    bg: "#F0F9FF", border: "#BAE6FD", color: "#0369A1",
                  },
                  {
                    brand: "Ozempic",
                    molecule: "Semaglutide",
                    indication: "Type 2 diabetes glycemic control",
                    note: "Diabetes-indication coverage is generally broader. Commercial plans and Medicare Part D typically cover diabetes medications, though tier placement and copay vary by plan.",
                    bg: "#F0FDF4", border: "#BBF7D0", color: "#15803D",
                  },
                  {
                    brand: "Zepbound",
                    molecule: "Tirzepatide",
                    indication: "Chronic weight management (obesity / overweight + comorbidity)",
                    note: "Same commercial coverage variability as Wegovy. Eli Lilly official savings and self-pay vial programs exist for those without coverage.",
                    bg: "#F0F9FF", border: "#BAE6FD", color: "#0369A1",
                  },
                ].map((row) => (
                  <div key={row.brand} className="rounded-xl p-5" style={{ backgroundColor: row.bg, border: `1px solid ${row.border}` }}>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-1" style={{ color: row.color }}>
                      {row.brand} ({row.molecule})
                    </div>
                    <div className="text-sm font-semibold mb-2" style={{ color: C.navy }}>
                      {row.indication}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: C.muted }}>
                      {row.note}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="rounded-xl p-5"
                style={{ backgroundColor: "#FFFBEB", border: "1px solid #FCD34D" }}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#B45309" }}>
                  No coverage guarantees here
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#92400E" }}>
                  This page describes general coverage patterns. Your actual plan benefit, formulary
                  tier, prior authorization criteria, and step-therapy requirements will be
                  plan-specific. Always confirm current benefits with your insurer or a provider
                  who can run benefit verification.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section id="prior-auth" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                What Prior Authorization Actually Involves
              </h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                Prior authorization (PA) is a process where your insurer requires your prescriber to
                get approval before the plan will cover a specific drug. It is not a reflection of
                medical necessity — it is a cost-control mechanism. For obesity-indication GLP-1
                medications, PA requirements are common.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  {
                    step: "1",
                    title: "Prescriber submits PA request",
                    detail: "Your doctor submits clinical documentation to your insurer — typically including diagnosis codes, BMI, comorbidity evidence, and sometimes prior treatment history.",
                  },
                  {
                    step: "2",
                    title: "Payer reviews against criteria",
                    detail: "Each plan has internal criteria. Common requirements include BMI thresholds, comorbidity documentation (hypertension, diabetes, sleep apnea), and sometimes a step-therapy requirement (failing a prior intervention).",
                  },
                  {
                    step: "3",
                    title: "Approval, denial, or peer-to-peer request",
                    detail: "The plan approves, denies, or requests a peer-to-peer review between your doctor and the plan's medical director. Denials can be appealed.",
                  },
                  {
                    step: "4",
                    title: "If approved: authorization period and renewal",
                    detail: "Approvals are typically time-limited (often 12 months). Renewal often requires documentation of treatment response and adherence.",
                  },
                ].map((row) => (
                  <div
                    key={row.step}
                    className="rounded-xl p-5 flex gap-4"
                    style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5"
                      style={{ backgroundColor: C.navy, color: "#FFFFFF" }}
                    >
                      {row.step}
                    </div>
                    <div>
                      <div className="text-sm font-semibold mb-1" style={{ color: C.navy }}>{row.title}</div>
                      <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{row.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="rounded-xl p-5"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: C.teal }}>
                  Practical note
                </div>
                <p className="text-sm leading-relaxed" style={{ color: C.text }}>
                  Some telehealth and direct-care providers specialize in navigating PA for GLP-1
                  medications and have established workflows with common payers. Choosing a provider
                  with that experience can meaningfully reduce the time and friction involved.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="savings-options" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                Official Savings Options When Coverage Falls Short
              </h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                When insurance does not cover or partially covers these medications, manufacturer
                savings programs are the primary legitimate path to reducing out-of-pocket cost.
                These are the official sources — not third-party coupons or gray-market channels.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-5">
                {[
                  {
                    brand: "Wegovy",
                    program: "Wegovy savings card (Novo Nordisk)",
                    url: "https://www.wegovy.com/getting-wegovy/savings-and-support.html",
                    note: "Official savings program for eligible commercially insured and uninsured patients. Eligibility and terms are program-specific and subject to change.",
                    color: "#0369A1", bg: "#F0F9FF", border: "#BAE6FD",
                  },
                  {
                    brand: "Ozempic",
                    program: "Ozempic savings offer (Novo Nordisk)",
                    url: "https://www.ozempic.com/savings-and-support/savings-offer.html",
                    note: "For commercially insured patients. Terms and eligibility vary. Not valid for government-program beneficiaries (Medicare, Medicaid).",
                    color: "#15803D", bg: "#F0FDF4", border: "#BBF7D0",
                  },
                  {
                    brand: "Zepbound",
                    program: "Zepbound savings (Eli Lilly)",
                    url: "https://www.zepbound.lilly.com/savings",
                    note: "Eli Lilly also offers a self-pay vial option for Zepbound for patients who choose to pay out of pocket without insurance involvement. Check official terms.",
                    color: "#6D28D9", bg: "#F5F3FF", border: "#DDD6FE",
                  },
                  {
                    brand: "Mounjaro",
                    program: "Mounjaro savings (Eli Lilly)",
                    url: "https://www.mounjaro.com/savings",
                    note: "For the tirzepatide diabetes-indication brand. Eligibility and program terms vary by insurance status and state.",
                    color: "#B45309", bg: "#FFFBEB", border: "#FCD34D",
                  },
                ].map((row) => (
                  <div key={row.brand} className="rounded-xl p-5" style={{ backgroundColor: row.bg, border: `1px solid ${row.border}` }}>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-1" style={{ color: row.color }}>
                      {row.brand}
                    </div>
                    <div className="text-sm font-semibold mb-2" style={{ color: C.navy }}>{row.program}</div>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: C.muted }}>{row.note}</p>
                    <a
                      href={row.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold underline"
                      style={{ color: row.color }}
                    >
                      Official program page &rarr;
                    </a>
                  </div>
                ))}
              </div>
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: "#FFF7ED", border: "1px solid #FDBA74" }}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-1" style={{ color: "#C2410C" }}>
                  Government programs
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#9A3412" }}>
                  Manufacturer savings cards are typically not valid for Medicare or Medicaid
                  beneficiaries. CMS coverage policy for anti-obesity medications continues to evolve —
                  check your plan&apos;s current formulary or speak with your provider for current status.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="what-to-ask" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                What to Ask Before Starting a Provider Path
              </h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                The right questions reduce wasted time and help you find a prescribing workflow that
                actually fits your insurance situation, budget, and urgency.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    topic: "About your insurance",
                    questions: [
                      "Does my plan cover Wegovy / Zepbound for obesity?",
                      "Is prior authorization required?",
                      "What documentation does the PA criteria require?",
                      "What is the formulary tier and expected copay if covered?",
                    ],
                  },
                  {
                    topic: "About the provider",
                    questions: [
                      "Do you handle prior authorization for GLP-1 medications?",
                      "Do you run benefit verification before the first appointment?",
                      "What is your workflow if PA is denied?",
                      "Do you offer a self-pay or cash-pay path if coverage falls through?",
                    ],
                  },
                  {
                    topic: "About cost",
                    questions: [
                      "What is the realistic out-of-pocket cost if not covered?",
                      "Which official savings programs do you help patients access?",
                      "Is the Zepbound self-pay vial option available through your practice?",
                      "Are there lower-cost formulations or dose adjustments that improve affordability?",
                    ],
                  },
                  {
                    topic: "About the treatment path",
                    questions: [
                      "Which indication and brand fits my clinical situation?",
                      "Is telehealth intake available and does that affect my coverage?",
                      "What is the follow-up cadence and what does it cost?",
                      "How do you handle prior auth renewals?",
                    ],
                  },
                ].map((block) => (
                  <div
                    key={block.topic}
                    className="rounded-xl p-5"
                    style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-3" style={{ color: C.teal }}>
                      {block.topic}
                    </div>
                    <ul className="space-y-2">
                      {block.questions.map((q, i) => (
                        <li key={i} className="text-sm leading-relaxed flex gap-2" style={{ color: C.text }}>
                          <span className="mt-0.5 shrink-0" style={{ color: C.teal }}>›</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6 — Provider CTA */}
            <section id="provider-path" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
              >
                Finding a Provider Who Can Navigate This
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Coverage friction is real, but it is not equally difficult with every provider.
                Some practices run benefit verification before the first appointment, have established
                PA workflows, and know which payers approve at what thresholds. Use the provider
                matcher to compare paths by state, insurance posture, budget, intake mode, and
                treatment fit before you choose.
              </p>
              <ProviderIntentCard
                marketCode={market.code}
                location="guide_insurance_prior_auth"
                treatmentSlug="general"
                headline="Find a provider who handles prior authorization"
                description="Compare treatment paths by state, insurance, budget, and intake mode. Use the matcher before committing to a prescribing workflow."
                buttonText={market.code === "us" ? "Use provider matcher" : "Join provider rollout"}
              />
            </section>

            {/* Related pages */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Cost Guides", desc: "Semaglutide and tirzepatide pricing, savings, and cash-pay reality.", href: "/costs" },
                { label: "Semaglutide Hub", desc: "Approved products, routes, provider path, and tracker next steps.", href: "/treatments/semaglutide" },
                { label: "Tirzepatide Hub", desc: "Approved products, routes, provider path, and tracker next steps.", href: "/treatments/tirzepatide" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl p-5"
                  style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: C.teal }}>
                    {item.label}
                  </div>
                  <p className="text-sm leading-relaxed mb-2" style={{ color: C.muted }}>{item.desc}</p>
                  <span className="text-sm font-semibold" style={{ color: C.teal }}>Open &rarr;</span>
                </Link>
              ))}
            </div>

            <SourceCitationList sources={SOURCES} />
            <div className="mt-8">
              <MedicalDisclaimer compact />
            </div>
          </article>

          {/* Sidebar TOC */}
          <aside className="hidden lg:block">
            <div
              className="rounded-xl p-5 sticky top-6"
              style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
            >
              <h3 className="text-sm font-bold mb-3" style={{ color: C.navy }}>
                Contents
              </h3>
              <nav>
                <ul className="space-y-1.5">
                  {TOC.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-xs hover:underline block"
                        style={{ color: C.muted }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-5 pt-5" style={{ borderTop: `1px solid ${C.border}` }}>
                <div className="text-xs font-semibold mb-2" style={{ color: C.teal }}>Quick links</div>
                <div className="space-y-2">
                  <Link href="/costs" className="text-xs block hover:underline" style={{ color: C.muted }}>Cost Guides</Link>
                  <Link href="/treatments/semaglutide" className="text-xs block hover:underline" style={{ color: C.muted }}>Semaglutide Hub</Link>
                  <Link href="/treatments/tirzepatide" className="text-xs block hover:underline" style={{ color: C.muted }}>Tirzepatide Hub</Link>
                  <Link href="/providers" className="text-xs block hover:underline" style={{ color: C.muted }}>Provider Matcher</Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
