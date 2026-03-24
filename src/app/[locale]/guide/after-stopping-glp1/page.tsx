import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot } from "@/components";
import { PageTracker } from "@/components/PageTracker";
import { postTreatmentData } from "@/data/side-effect-timeline";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/locale-params";
import { siteConfig } from "@/lib/siteConfig";

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

const TOC = [
  { id: "step1-findings", label: "STEP 1 Extension: The Data" },
  { id: "not-everyone-regains", label: "Not Everyone Regains" },
  { id: "why-weight-returns", label: "Why Weight Returns" },
  { id: "cardiometabolic", label: "Cardiometabolic Effects" },
  { id: "tapering", label: "Tapering vs. Abrupt Stop" },
  { id: "strategies", label: "Strategies for Maintaining Loss" },
];

/* ── SEO ───────────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const alt = localeAlternates(siteConfig.domain, "/guide/after-stopping-glp1", locale);

  return {
    ...generateSEO({
      title: "What Happens After Stopping Ozempic or Wegovy? STEP 1 Extension Data (2026) | PeptideScholar",
      description:
        "Objective review of what happens after stopping GLP-1 medications. STEP 1 extension data: 17.3% lost, 11.6pp regained, 48.2% still maintained ≥5% loss at week 120. Tapering data, biological mechanisms, and maintenance strategies.",
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default async function AfterStoppingGLP1Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;
  const publishDate = "2026-03-24";
  const d = postTreatmentData;

  // Derived values for the page
  const regainedFraction = Math.round(
    (d.offTreatmentPhase.meanWeightRegainPercentagePoints / d.treatmentPhase.meanWeightLossPercent) * 100
  );

  return (
    <>
      <PageTracker event="guide_view" params={{ guide_slug: "after-stopping-glp1" }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "What Happens After Stopping Ozempic or Wegovy? STEP 1 Extension Data (2026)",
          description:
            "Evidence-based review of weight changes after stopping semaglutide, based on the STEP 1 extension trial. Covers regain rates, maintenance data, biological mechanisms, and strategies.",
          datePublished: publishDate,
          dateModified: publishDate,
          author: { "@type": "Organization", name: siteConfig.name },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.domain,
          },
          url: `${siteConfig.domain}/guide/after-stopping-glp1`,
          mainEntityOfPage: `${siteConfig.domain}/guide/after-stopping-glp1`,
          citation: {
            "@type": "ScholarlyArticle",
            name: d.source,
            url: d.sourceUrl,
          },
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Guide", href: `${prefix}/guide` },
            { label: "After Stopping GLP-1", href: `${prefix}/guide/after-stopping-glp1` },
          ]}
        />

        <div className="grid lg:grid-cols-[1fr_260px] gap-8 items-start">
          <article>
            <header className="mb-8">
              <h1
                className="text-3xl md:text-4xl font-bold mb-3 leading-tight"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                What Happens After Stopping Ozempic or Wegovy?
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                A data-driven review of what the clinical evidence shows — including both the regain
                statistics and the substantial minority who maintained meaningful weight loss.
              </p>
              <p className="text-sm text-gray-400 mt-3">Updated: March 2026 · Source: {d.source}</p>
            </header>

            {/* ── Context box ───────────────────────────────────── */}
            <div
              className="rounded-xl p-5 mb-8"
              style={{ backgroundColor: "#EFF6FF", border: `1px solid #BFDBFE` }}
            >
              <p className="text-sm leading-relaxed" style={{ color: "#1E40AF" }}>
                <strong>About this page:</strong> The data below comes from the STEP 1 extension
                study (Wilding et al., 2022, Diabetes &amp; Obesity &amp; Metabolism), which followed{" "}
                {d.participants} participants for {d.treatmentPhase.durationWeeks} weeks of
                semaglutide treatment followed by {d.offTreatmentPhase.durationWeeks} weeks of
                observation after stopping. This is the most rigorous dataset on post-treatment
                outcomes. We present both the regain data and the maintenance data without
                framing designed to alarm or reassure.
              </p>
            </div>

            {/* ── STEP 1 Findings ───────────────────────────────── */}
            <section id="step1-findings" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                What the STEP 1 Extension Found
              </h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                During {d.treatmentPhase.durationWeeks} weeks of semaglutide 2.4mg treatment, the{" "}
                {d.participants} participants in the extension study lost a mean of{" "}
                <strong>{d.treatmentPhase.meanWeightLossPercent}%</strong> of body weight (SD{" "}
                {d.treatmentPhase.sdPercent}%). After stopping, participants were followed for another{" "}
                {d.offTreatmentPhase.durationWeeks} weeks.
              </p>

              {/* Key stats grid */}
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    label: "Mean loss during treatment",
                    value: `${d.treatmentPhase.meanWeightLossPercent}%`,
                    sub: `SD ±${d.treatmentPhase.sdPercent}%`,
                    color: C.success,
                    bg: "#F0FDF4",
                    border: "#BBF7D0",
                  },
                  {
                    label: "Mean regain after stopping",
                    value: `${d.offTreatmentPhase.meanWeightRegainPercentagePoints} pp`,
                    sub: `over ${d.offTreatmentPhase.durationWeeks} weeks off treatment`,
                    color: C.accent,
                    bg: "#FEF2F2",
                    border: "#FECACA",
                  },
                  {
                    label: "Mean net loss at week 120",
                    value: `${d.netOutcome.meanNetWeightLossPercent}%`,
                    sub: `SD ±${d.netOutcome.sdPercent}%`,
                    color: C.teal,
                    bg: "#EFF6FF",
                    border: "#BFDBFE",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-4 text-center"
                    style={{ backgroundColor: stat.bg, border: `1px solid ${stat.border}` }}
                  >
                    <div className="text-3xl font-black mb-1" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold mb-1" style={{ color: C.text }}>
                      {stat.label}
                    </div>
                    <div className="text-xs" style={{ color: C.muted }}>{stat.sub}</div>
                  </div>
                ))}
              </div>

              {/* Visual weight trajectory bar */}
              <div className="mb-5">
                <h3 className="text-sm font-bold mb-3" style={{ color: C.navy }}>
                  Weight Trajectory (Mean, % of starting body weight)
                </h3>
                <div className="space-y-2">
                  {[
                    { label: "Week 0 (start)", pct: 100, color: "#94A3B8", bg: "#F1F5F9" },
                    {
                      label: `Week ${d.treatmentPhase.durationWeeks} (end of treatment)`,
                      pct: 100 - d.treatmentPhase.meanWeightLossPercent,
                      color: C.success,
                      bg: "#F0FDF4",
                    },
                    {
                      label: `Week ${d.treatmentPhase.durationWeeks + d.offTreatmentPhase.durationWeeks} (end of extension)`,
                      pct: 100 - d.netOutcome.meanNetWeightLossPercent,
                      color: C.teal,
                      bg: "#EFF6FF",
                    },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex justify-between text-xs mb-1" style={{ color: C.muted }}>
                        <span>{row.label}</span>
                        <span className="font-semibold">{row.pct.toFixed(1)}% of starting weight</span>
                      </div>
                      <div
                        className="h-5 rounded-full overflow-hidden"
                        style={{ backgroundColor: "#F1F5F9", border: `1px solid ${C.border}` }}
                      >
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${row.pct}%`, backgroundColor: row.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs mt-2" style={{ color: C.muted }}>
                  Mean values. Individual variation was substantial (SD ±{d.treatmentPhase.sdPercent}%
                  during treatment, ±{d.netOutcome.sdPercent}% at week 120).
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed">
                The headline finding: participants regained approximately{" "}
                <strong>{regainedFraction}% of their prior weight loss</strong> within{" "}
                {d.offTreatmentPhase.durationWeeks} weeks of stopping semaglutide. Placebo participants
                regained only {d.offTreatmentPhase.placeboRegainPercentagePoints} percentage points over
                the same period, confirming the regain was attributable to medication discontinuation.
              </p>
            </section>

            {/* ── Not Everyone Regains ──────────────────────────── */}
            <section id="not-everyone-regains" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Not Everyone Regains: The Other Half of the Story
              </h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                The mean regain statistic, while significant, does not describe the full range of
                outcomes. The STEP 1 extension also found:
              </p>

              <div
                className="rounded-2xl p-6 mb-5"
                style={{ background: `linear-gradient(135deg, ${C.navy} 0%, ${C.teal} 100%)` }}
              >
                <div className="text-center">
                  <div className="text-5xl font-black text-white mb-2">
                    {d.netOutcome.percentMaintaining5PercentLoss}%
                  </div>
                  <p className="text-white/90 text-sm">
                    of participants still maintained clinically meaningful weight loss
                    (≥5% of body weight) at week 120 — one year after stopping treatment.
                  </p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                This means that while the average participant regained most of their loss, nearly half
                maintained a clinically meaningful outcome one year after stopping. The wide standard
                deviations (±{d.treatmentPhase.sdPercent}% during treatment, ±
                {d.netOutcome.sdPercent}% at week 120) reflect substantial individual variation.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Predictors of maintaining weight loss after stopping are not fully characterized in
                published literature, but behavioral changes sustained during treatment (dietary
                habits, physical activity, relationship with food) likely play a role.
              </p>
            </section>

            {/* ── Why Weight Returns ────────────────────────────── */}
            <section id="why-weight-returns" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Why Weight Returns: Biological Mechanisms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                Weight regain after stopping GLP-1 medications is not a matter of willpower. It
                reflects the underlying biology of obesity as a chronic, relapsing condition. Several
                mechanisms contribute:
              </p>
              <div className="space-y-3">
                {[
                  {
                    mechanism: "Hunger hormone rebound",
                    detail: "GLP-1 receptor agonists suppress appetite partly by modulating ghrelin (the primary hunger hormone) and increasing peptide YY and GLP-1 levels. When the drug is removed, hunger-signaling hormones return toward pre-treatment levels, restoring the physiological drive to eat.",
                    color: C.accent,
                    bg: "#FEF2F2",
                    border: "#FECACA",
                  },
                  {
                    mechanism: "Metabolic adaptation",
                    detail: "Significant weight loss reduces resting metabolic rate both because of reduced body mass and through adaptive thermogenesis — the body actively reducing energy expenditure in response to weight loss. This effect persists after stopping medication.",
                    color: C.warning,
                    bg: "#FFFBEB",
                    border: "#FDE68A",
                  },
                  {
                    mechanism: "Reduced gastric emptying normalizes",
                    detail: "GLP-1 medications slow gastric emptying, which contributes to satiety and reduced food intake. When medication stops, gastric emptying returns to baseline, and the prolonged fullness signal is lost.",
                    color: C.teal,
                    bg: "#EFF6FF",
                    border: "#BFDBFE",
                  },
                  {
                    mechanism: "Adipose tissue memory",
                    detail: "Research suggests adipose (fat) tissue may retain a &lsquo;memory&rsquo; of prior obesity states, influencing gene expression and fat cell behavior in ways that favor fat storage after weight loss. This is an active research area as of 2026.",
                    color: C.navy,
                    bg: C.bg,
                    border: C.border,
                  },
                ].map((item) => (
                  <div
                    key={item.mechanism}
                    className="rounded-xl p-4"
                    style={{ backgroundColor: item.bg, border: `1px solid ${item.border}` }}
                  >
                    <strong className="text-sm" style={{ color: item.color }}>{item.mechanism}: </strong>
                    <span
                      className="text-sm text-gray-700"
                      dangerouslySetInnerHTML={{ __html: item.detail }}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* ── Cardiometabolic Effects ───────────────────────── */}
            <section id="cardiometabolic" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Cardiometabolic Effects Also Revert
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The STEP 1 extension study found that not just weight, but cardiometabolic risk markers
                also largely reverted toward baseline after stopping treatment. This included measures
                such as waist circumference, blood pressure, lipid profiles, and blood glucose markers
                that had improved during treatment.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This finding has implications for how GLP-1 medications are framed: they are effective
                while being taken, but their cardiometabolic benefits appear to require continued
                treatment for maintenance. This parallels how other chronic disease medications (such
                as blood pressure medications) require ongoing use for ongoing effect.
              </p>
            </section>

            {/* ── Tapering ──────────────────────────────────────── */}
            <section id="tapering" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Tapering vs. Abrupt Stop
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                A 2024 study examined whether tapering (gradually reducing dose) versus abrupt
                discontinuation affected outcomes. The study found that tapering was associated with
                more stable body weight compared to abrupt discontinuation, though both groups
                ultimately showed the same tendency toward weight regain over the longer term.
              </p>
              <div
                className="rounded-xl p-5"
                style={{ backgroundColor: "#FFFBEB", border: `1px solid #FDE68A` }}
              >
                <p className="text-sm leading-relaxed" style={{ color: "#B45309" }}>
                  <strong>Clinical note:</strong> The decision to taper or stop abruptly should be
                  made with your prescribing physician based on your individual circumstances,
                  insurance, access, and goals. There is currently no FDA-mandated tapering protocol
                  for GLP-1 medications. Do not modify your prescribed regimen without consulting
                  your provider.
                </p>
              </div>
            </section>

            {/* ── Strategies ────────────────────────────────────── */}
            <section id="strategies" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Evidence-Informed Strategies for Maintaining Weight Loss
              </h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                While no strategy fully counteracts the biological drive toward weight regain,
                research and clinical experience suggest the following approaches help maximize
                maintenance:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  {
                    strategy: "Preserve muscle mass during treatment",
                    detail: "Higher muscle mass improves resting metabolic rate. The joint advisory recommends resistance training 3x/week + adequate protein (1.0–1.5 g/kg/day) throughout GLP-1 treatment.",
                    color: C.success,
                    bg: "#F0FDF4",
                    border: "#BBF7D0",
                  },
                  {
                    strategy: "Continue resistance training after stopping",
                    detail: "Resistance training is the most evidence-backed intervention for minimizing regain. It counteracts metabolic adaptation and preserves lean mass.",
                    color: C.teal,
                    bg: "#EFF6FF",
                    border: "#BFDBFE",
                  },
                  {
                    strategy: "Maintain protein intake",
                    detail: "High protein diets (1.2–1.5 g/kg/day) support satiety, reduce the hunger rebound effect, and help preserve muscle during weight changes.",
                    color: C.warning,
                    bg: "#FFFBEB",
                    border: "#FDE68A",
                  },
                  {
                    strategy: "Behavioral and sustainable changes",
                    detail: "Structured eating patterns, food environment modifications, and sustainable habits established during treatment are the most durable contributors to long-term maintenance.",
                    color: C.navy,
                    bg: C.bg,
                    border: C.border,
                  },
                ].map((item) => (
                  <div
                    key={item.strategy}
                    className="rounded-xl p-5"
                    style={{ backgroundColor: item.bg, border: `1px solid ${item.border}` }}
                  >
                    <h3 className="font-bold text-sm mb-2" style={{ color: item.color }}>
                      {item.strategy}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>

              {/* Related links */}
              <div
                className="rounded-xl p-5"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <h3
                  className="font-bold text-sm mb-3"
                  style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
                >
                  Related Tools &amp; Guides
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`${prefix}/tools/protein-calculator`}
                    className="rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-all"
                    style={{ backgroundColor: C.accent, color: "#FFFFFF" }}
                  >
                    Protein Calculator
                  </Link>
                  <Link
                    href={`${prefix}/guide/glp1-nutrition`}
                    className="rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-all"
                    style={{ backgroundColor: C.teal, color: "#FFFFFF" }}
                  >
                    GLP-1 Nutrition Guide
                  </Link>
                  <Link
                    href={`${prefix}/tools/titration-planner`}
                    className="rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-all"
                    style={{ backgroundColor: C.bg, border: `1px solid ${C.border}`, color: C.navy }}
                  >
                    Titration Planner
                  </Link>
                </div>
              </div>
            </section>

            {/* ── Source ────────────────────────────────────────── */}
            <section className="mb-8">
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <h3 className="text-sm font-bold mb-2" style={{ color: C.navy }}>
                  Primary Source
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {d.source}{" "}
                  <a
                    href={d.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    style={{ color: C.teal }}
                  >
                    PubMed PMID {d.pmid}
                  </a>
                  . n={d.participants} participants.{" "}
                  {d.treatmentPhase.durationWeeks}-week treatment phase +{" "}
                  {d.offTreatmentPhase.durationWeeks}-week off-treatment observation.
                </p>
              </div>
            </section>

            <MedicalDisclaimer />
          </article>

          {/* ── Sidebar ───────────────────────────────────────── */}
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
              <div className="mt-5 pt-4" style={{ borderTop: `1px solid ${C.border}` }}>
                <p className="text-xs font-semibold mb-2" style={{ color: C.navy }}>
                  STEP 1 Extension: Key Numbers
                </p>
                <ul className="space-y-1.5">
                  {[
                    { label: "Participants", value: String(d.participants) },
                    { label: "Treatment loss", value: `${d.treatmentPhase.meanWeightLossPercent}%` },
                    { label: "Regained (1yr)", value: `${d.offTreatmentPhase.meanWeightRegainPercentagePoints} pp` },
                    { label: "% of loss regained", value: `~${regainedFraction}%` },
                    { label: "Maintained ≥5%", value: `${d.netOutcome.percentMaintaining5PercentLoss}%` },
                    { label: "Net loss at wk 120", value: `${d.netOutcome.meanNetWeightLossPercent}%` },
                  ].map((fact) => (
                    <li key={fact.label} className="flex justify-between gap-2">
                      <span className="text-xs" style={{ color: C.muted }}>{fact.label}</span>
                      <span className="text-xs font-semibold text-right" style={{ color: C.text }}>
                        {fact.value}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs mt-3" style={{ color: C.muted }}>
                  Source:{" "}
                  <a
                    href={d.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    PMID {d.pmid}
                  </a>
                </p>
              </div>
            </div>
            <AdSlot className="mt-4" />
          </aside>
        </div>
      </div>
    </>
  );
}
