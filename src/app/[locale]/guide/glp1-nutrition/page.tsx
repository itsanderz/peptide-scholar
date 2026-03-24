import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot } from "@/components";
import { proteinGuidelines } from "@/data/side-effect-timeline";
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

/* ── SEO ───────────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const alt = localeAlternates(siteConfig.domain, "/guide/glp1-nutrition", locale);

  return {
    ...generateSEO({
      title: "What to Eat on GLP-1 Medications: Evidence-Based Nutrition Guide (2026) | PeptideScholar",
      description:
        "Evidence-based nutrition guide for GLP-1 users (Wegovy, Zepbound, Ozempic, Saxenda). Protein targets, foods to prioritize, meal structure, hydration, and exercise recommendations based on 2025 joint advisory from ACLM, ASN, OMA, and TOS.",
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

/* ── TOC ───────────────────────────────────────────────────────────────── */
const TOC = [
  { id: "why-nutrition-matters", label: "Why Nutrition Matters" },
  { id: "protein-first", label: "Protein: The Priority Nutrient" },
  { id: "foods-to-prioritize", label: "Foods to Prioritize" },
  { id: "foods-to-minimize", label: "Foods to Minimize" },
  { id: "meal-structure", label: "Meal Structure Tips" },
  { id: "hydration", label: "Hydration" },
  { id: "sample-day", label: "Sample Day of Eating" },
  { id: "exercise", label: "Exercise Recommendations" },
];

/* ── Page ──────────────────────────────────────────────────────────────── */
export default async function GLP1NutritionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;
  const publishDate = "2026-03-24";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "What to Eat on GLP-1 Medications: Evidence-Based Nutrition Guide (2026)",
          description:
            "Evidence-based guide to nutrition, protein intake, meal structure, and exercise while on GLP-1 weight loss medications.",
          datePublished: publishDate,
          dateModified: publishDate,
          author: { "@type": "Organization", name: siteConfig.name },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.domain,
          },
          url: `${siteConfig.domain}/guide/glp1-nutrition`,
          mainEntityOfPage: `${siteConfig.domain}/guide/glp1-nutrition`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Guide", href: `${prefix}/guide` },
            { label: "GLP-1 Nutrition", href: `${prefix}/guide/glp1-nutrition` },
          ]}
        />

        <div className="grid lg:grid-cols-[1fr_260px] gap-8 items-start">
          {/* ── Main Content ──────────────────────────────────────── */}
          <article>
            <header className="mb-8">
              <h1
                className="text-3xl md:text-4xl font-bold mb-3 leading-tight"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                What to Eat on GLP-1 Medications: Evidence-Based Nutrition Guide
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                GLP-1 medications like Wegovy, Zepbound, and Ozempic powerfully reduce appetite. But
                eating too little — especially too little protein — can undermine results. Here is
                what the evidence recommends.
              </p>
              <p className="text-sm text-gray-400 mt-3">Updated: March 2026</p>
            </header>

            {/* ── Why Nutrition Matters ─────────────────────────── */}
            <section id="why-nutrition-matters" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Why Nutrition Matters on GLP-1 Medications
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                GLP-1 receptor agonists reduce appetite and slow gastric emptying, which naturally
                leads to lower caloric intake. Clinical trials show mean weight losses of 15–21% of
                body weight over 68–72 weeks. However, not all weight lost is fat. Data presented at
                the Endocrine Society ENDO 2025 meeting found that approximately{" "}
                <strong>40% of weight lost on semaglutide comes from lean muscle mass</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Muscle loss has long-term consequences including reduced metabolic rate (making weight
                maintenance harder), decreased physical function, and — particularly in older adults —
                increased fall and fracture risk. Targeted nutrition strategies can substantially
                mitigate this effect.
              </p>
              <div
                className="rounded-xl p-5"
                style={{ backgroundColor: "#EFF6FF", border: `1px solid #BFDBFE` }}
              >
                <p className="text-sm leading-relaxed" style={{ color: "#1E40AF" }}>
                  <strong>Key principle:</strong> GLP-1 medications change how much you eat. Nutrition
                  strategy determines what those reduced calories are made of. Prioritizing protein
                  within a smaller caloric budget is the central challenge.
                </p>
              </div>
            </section>

            {/* ── Protein First ─────────────────────────────────── */}
            <section id="protein-first" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Protein First: The Priority Nutrient
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                A 2025 joint advisory from the American College of Lifestyle Medicine (ACLM), American
                Society for Nutrition (ASN), Obesity Medicine Association (OMA), and The Obesity
                Society (TOS) issued specific protein recommendations for people on GLP-1 and other
                weight loss medications:
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    label: "Daily Range",
                    value: `${proteinGuidelines.recommendations.generalRange.min}–${proteinGuidelines.recommendations.generalRange.max}`,
                    unit: "g/kg body weight",
                    color: C.teal,
                  },
                  {
                    label: "Absolute Minimum",
                    value: `${proteinGuidelines.recommendations.absoluteTarget.min}–${proteinGuidelines.recommendations.absoluteTarget.max}`,
                    unit: "g/day",
                    color: C.accent,
                  },
                  {
                    label: "Per Meal Target",
                    value: `${proteinGuidelines.recommendations.perMeal.min}–${proteinGuidelines.recommendations.perMeal.max}`,
                    unit: "g/meal",
                    color: C.success,
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-4 text-center"
                    style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                  >
                    <div className="text-2xl font-black mb-1" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold mb-0.5" style={{ color: C.text }}>
                      {stat.label}
                    </div>
                    <div className="text-xs" style={{ color: C.muted }}>{stat.unit}</div>
                  </div>
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-3">
                For older adults (65+), the advisory recommends targeting{" "}
                <strong>
                  {proteinGuidelines.recommendations.olderAdults.min}–
                  {proteinGuidelines.recommendations.olderAdults.max} g/kg/day
                </strong>{" "}
                to offset age-related muscle loss. The advisory also notes that{" "}
                <strong>protein intake alone is likely inadequate without structured exercise</strong>{" "}
                — specifically resistance training.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Source:{" "}
                <a
                  href={proteinGuidelines.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-700"
                >
                  {proteinGuidelines.source}
                </a>
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`${prefix}/tools/protein-calculator`}
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all hover:opacity-90"
                  style={{ backgroundColor: C.accent, color: "#FFFFFF" }}
                >
                  Calculate Your Protein Target
                </Link>
              </div>
            </section>

            {/* ── Foods to Prioritize ───────────────────────────── */}
            <section id="foods-to-prioritize" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Foods to Prioritize
              </h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                Because total intake is lower, the quality and nutrient density of each meal matters
                more. Research suggests building meals around the following:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    category: "High-Quality Protein Sources",
                    items: [
                      "Chicken breast / turkey breast",
                      "Fish and shellfish (salmon, tuna, shrimp)",
                      "Eggs and egg whites",
                      "Greek yogurt, cottage cheese",
                      "Lean beef, pork tenderloin",
                      "Tofu, tempeh, edamame",
                      "Whey or plant protein powder (if appetite is very low)",
                    ],
                    color: C.success,
                    bg: "#F0FDF4",
                    border: "#BBF7D0",
                  },
                  {
                    category: "Fiber-Rich Vegetables",
                    items: [
                      "Leafy greens (spinach, kale, arugula)",
                      "Broccoli, cauliflower, Brussels sprouts",
                      "Zucchini, cucumber, bell peppers",
                      "Asparagus, green beans",
                      "Note: fiber helps with constipation, a common side effect",
                    ],
                    color: C.teal,
                    bg: "#EFF6FF",
                    border: "#BFDBFE",
                  },
                  {
                    category: "Complex Carbohydrates (Modest Portions)",
                    items: [
                      "Oats and quinoa",
                      "Sweet potato (smaller portions)",
                      "Legumes: lentils, chickpeas, black beans (also protein)",
                      "Brown rice or farro",
                      "Whole grain bread (if tolerated)",
                    ],
                    color: C.warning,
                    bg: "#FFFBEB",
                    border: "#FDE68A",
                  },
                  {
                    category: "Healthy Fats (Moderate Amounts)",
                    items: [
                      "Avocado (in moderation — high fat can worsen nausea)",
                      "Olive oil for cooking",
                      "Nuts and seeds (small portions)",
                      "Note: high-fat meals may worsen GI side effects",
                    ],
                    color: C.navy,
                    bg: C.bg,
                    border: C.border,
                  },
                ].map((section) => (
                  <div
                    key={section.category}
                    className="rounded-xl p-5"
                    style={{ backgroundColor: section.bg, border: `1px solid ${section.border}` }}
                  >
                    <h3
                      className="font-bold text-sm mb-3"
                      style={{ color: section.color }}
                    >
                      {section.category}
                    </h3>
                    <ul className="space-y-1">
                      {section.items.map((item, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="flex-shrink-0 mt-1" style={{ color: section.color }}>&#8250;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Foods to Minimize ─────────────────────────────── */}
            <section id="foods-to-minimize" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Foods to Minimize or Avoid
              </h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                Certain foods are more likely to trigger or worsen GI side effects while on GLP-1
                medications, due to their effects on gastric emptying and gut motility:
              </p>
              <div
                className="rounded-xl p-5"
                style={{ backgroundColor: "#FEF2F2", border: `1px solid #FECACA` }}
              >
                <ul className="space-y-3">
                  {[
                    {
                      item: "High-fat, greasy foods",
                      reason: "Slow gastric emptying further, significantly worsening nausea and fullness",
                    },
                    {
                      item: "Fried foods and fast food",
                      reason: "Combine high fat, high salt, and low protein density — poor nutrient exchange for limited capacity",
                    },
                    {
                      item: "Carbonated beverages",
                      reason: "Can worsen bloating and discomfort in patients with slowed gastric emptying",
                    },
                    {
                      item: "Alcohol",
                      reason: "Empty calories, can impair appetite regulation, and may interact with medication absorption",
                    },
                    {
                      item: "Ultra-processed high-sugar foods",
                      reason: "Low protein density; rapid glucose spikes followed by crashes can worsen appetite regulation",
                    },
                    {
                      item: "Large single meals",
                      reason: "Gastric emptying is slowed; large volumes are more likely to cause nausea and vomiting",
                    },
                  ].map((row, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 mt-0.5 text-red-500">&#9888;</span>
                      <div>
                        <strong className="text-sm" style={{ color: "#991B1B" }}>{row.item}:</strong>
                        <span className="text-sm text-gray-700 ml-1">{row.reason}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ── Meal Structure ────────────────────────────────── */}
            <section id="meal-structure" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Meal Structure Tips
              </h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                GLP-1 medications slow gastric emptying and prolong satiety. Adapting meal structure
                to this new physiology can reduce side effects and improve nutrient adequacy:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    tip: "Eat protein first",
                    detail: "At each meal, start with your protein source. This ensures you meet protein targets even if you become full quickly.",
                  },
                  {
                    tip: "Smaller, more frequent meals",
                    detail: "3 smaller meals with 1–2 small protein snacks is often better tolerated than 2–3 large meals.",
                  },
                  {
                    tip: "Do not rush eating",
                    detail: "Eating too quickly when gastric emptying is slowed increases risk of nausea and discomfort.",
                  },
                  {
                    tip: "Separate liquids from solids",
                    detail: "Drinking large amounts of water with meals can cause rapid fullness and reduce food intake below adequate levels.",
                  },
                  {
                    tip: "Track protein, not just calories",
                    detail: "On reduced intake, the risk is not overeating — it is failing to meet protein and micronutrient minimums.",
                  },
                  {
                    tip: "Do not skip meals entirely",
                    detail: "Nausea may reduce appetite drastically. Skipping meals risks inadequate protein, potassium, and B vitamins.",
                  },
                ].map((item) => (
                  <div
                    key={item.tip}
                    className="rounded-xl p-4"
                    style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                  >
                    <h3 className="font-bold text-sm mb-1" style={{ color: C.navy }}>
                      {item.tip}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Hydration ─────────────────────────────────────── */}
            <section id="hydration" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Hydration
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Adequate fluid intake is particularly important on GLP-1 medications for two reasons:
                vomiting and diarrhea can cause significant fluid loss, and constipation (a common
                side effect, especially with semaglutide) is worsened by dehydration.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: "#EFF6FF", border: `1px solid #BFDBFE` }}
                >
                  <h3 className="font-bold text-sm mb-2" style={{ color: C.teal }}>
                    General Recommendations
                  </h3>
                  <ul className="space-y-1.5">
                    {[
                      "Target 6–8 cups (1.5–2L) of water daily as a general guideline",
                      "Increase intake during hot weather or exercise",
                      "Herbal teas and diluted beverages count toward total",
                      "Hydration supports constipation management",
                    ].map((item, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-blue-400 flex-shrink-0 mt-0.5">&#8250;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: "#FEF2F2", border: `1px solid #FECACA` }}
                >
                  <h3 className="font-bold text-sm mb-2" style={{ color: "#991B1B" }}>
                    Dehydration Warning Signs
                  </h3>
                  <ul className="space-y-1.5">
                    {[
                      "Dark urine or significantly reduced urination",
                      "Dizziness or lightheadedness on standing",
                      "Dry mouth and persistent thirst",
                      "Contact provider if dehydration is suspected after vomiting/diarrhea",
                    ].map((item, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-red-400 flex-shrink-0 mt-0.5">&#9679;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* ── Sample Day ────────────────────────────────────── */}
            <section id="sample-day" className="mb-10">
              <h2
                className="text-2xl font-bold mb-2"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Sample Day of Eating (~100g Protein)
              </h2>
              <p className="text-sm text-gray-500 mb-5">
                Example for a moderately active person under 65. Actual targets vary by body weight.
              </p>
              <div className="space-y-3">
                {[
                  {
                    meal: "Breakfast",
                    example: "3 scrambled eggs + 3/4 cup Greek yogurt (plain, full-fat) + berries",
                    protein: "~38g protein",
                    color: "#FFFBEB",
                    border: "#FDE68A",
                    textColor: "#B45309",
                  },
                  {
                    meal: "Lunch",
                    example: "150g grilled chicken breast + large green salad with olive oil + 1/2 cup lentils",
                    protein: "~45g protein",
                    color: "#F0FDF4",
                    border: "#BBF7D0",
                    textColor: "#166534",
                  },
                  {
                    meal: "Dinner",
                    example: "120g salmon fillet + 1 cup broccoli + 1/2 cup quinoa",
                    protein: "~35g protein",
                    color: "#EFF6FF",
                    border: "#BFDBFE",
                    textColor: "#1E40AF",
                  },
                  {
                    meal: "Snack (optional)",
                    example: "Cottage cheese (1/2 cup) + cucumber slices",
                    protein: "~14g protein",
                    color: C.bg,
                    border: C.border,
                    textColor: C.muted,
                  },
                ].map((row) => (
                  <div
                    key={row.meal}
                    className="rounded-xl p-4 flex justify-between items-start gap-4"
                    style={{ backgroundColor: row.color, border: `1px solid ${row.border}` }}
                  >
                    <div>
                      <div className="font-bold text-sm mb-1" style={{ color: row.textColor }}>
                        {row.meal}
                      </div>
                      <p className="text-sm text-gray-700">{row.example}</p>
                    </div>
                    <div
                      className="flex-shrink-0 text-sm font-bold rounded-full px-3 py-1"
                      style={{ backgroundColor: row.border, color: row.textColor }}
                    >
                      {row.protein}
                    </div>
                  </div>
                ))}
                <div
                  className="rounded-xl p-3 text-center text-sm font-semibold"
                  style={{ backgroundColor: C.navy, color: "#FFFFFF" }}
                >
                  Total: ~132g protein (adjust portions to match your calculated target)
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Protein estimates are approximate. Individual foods vary. This is not a meal plan or
                medical nutrition therapy — consult a registered dietitian for personalized guidance.
              </p>
            </section>

            {/* ── Exercise ──────────────────────────────────────── */}
            <section id="exercise" className="mb-10">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  color: C.navy,
                  fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
                }}
              >
                Exercise Recommendations
              </h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                The same 2025 joint advisory states that protein intake alone is{" "}
                <strong>likely inadequate without structured exercise</strong> for preserving muscle
                mass. Exercise recommendations for GLP-1 users:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div
                  className="rounded-xl p-5"
                  style={{ backgroundColor: "#F0FDF4", border: `1px solid #BBF7D0` }}
                >
                  <h3 className="font-bold text-sm mb-3" style={{ color: C.success }}>
                    Resistance Training (Priority)
                  </h3>
                  <ul className="space-y-1.5">
                    {[
                      "3x/week minimum recommended by joint advisory",
                      "Compound movements: squats, deadlifts, rows, presses",
                      "Body weight exercises acceptable if gym access is limited",
                      "Most important single intervention for preserving lean mass",
                    ].map((item, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-500 flex-shrink-0 mt-0.5">&#10003;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="rounded-xl p-5"
                  style={{ backgroundColor: "#EFF6FF", border: `1px solid #BFDBFE` }}
                >
                  <h3 className="font-bold text-sm mb-3" style={{ color: C.teal }}>
                    Aerobic Exercise
                  </h3>
                  <ul className="space-y-1.5">
                    {[
                      "150 min/week moderate intensity (joint advisory target)",
                      "Walking, cycling, swimming, or any sustained activity",
                      "Benefits cardiovascular health, mood, and weight maintenance",
                      "Can begin at lower intensity and progress gradually",
                    ].map((item, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-blue-400 flex-shrink-0 mt-0.5">&#8250;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Source: Joint advisory ACLM/ASN/OMA/TOS (2025),{" "}
                <a href={proteinGuidelines.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
                  PMC12125019
                </a>
              </p>
            </section>

            {/* ── Related tools ─────────────────────────────────── */}
            <section className="mb-8">
              <div
                className="rounded-xl p-5"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <h3
                  className="font-bold mb-3"
                  style={{ color: C.navy, fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
                >
                  Free GLP-1 Tools
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
                    href={`${prefix}/tools/symptom-checker`}
                    className="rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-all"
                    style={{ backgroundColor: C.teal, color: "#FFFFFF" }}
                  >
                    Side Effect Timeline
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

            <MedicalDisclaimer />
          </article>

          {/* ── Sidebar TOC ───────────────────────────────────── */}
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
            </div>
            <AdSlot className="mt-4" />
          </aside>
        </div>
      </div>
    </>
  );
}
