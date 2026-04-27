import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot } from "@/components";
import CyclePlannerClient from "./CyclePlannerClient";
import { isValidLocale } from "@/lib/i18n";
import { localeAlternates } from "@/lib/locale-params";
import { siteConfig } from "@/lib/siteConfig";

/* ── Theme ─────────────────────────────────────────────────────────────── */
const C = {
  navy: "#1A3A5C",
  teal: "#3B7A9E",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
} as const;

/* ── SEO ───────────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const alt = localeAlternates(siteConfig.domain, "/tools/cycle-planner", locale);

  return {
    ...generateSEO({
      title: "Peptide Cycle Planner — Injection Schedule Calendar",
      description:
        "Plan your peptide protocol cycle: pick a compound, injection frequency, and on/off-cycle duration to generate a week-by-week injection schedule calendar. Works for BPC-157, TB-500, semaglutide, ipamorelin, and any peptide.",
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
export default async function CyclePlannerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Peptide Cycle Planner",
          applicationCategory: "HealthApplication",
          operatingSystem: "Web Browser",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Free peptide cycle planner. Enter your compound, injection frequency, and on/off-cycle duration to generate a week-by-week injection schedule calendar.",
          url: `${siteConfig.domain}/tools/cycle-planner`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Tools", href: `${prefix}/tools` },
            { label: "Cycle Planner", href: `${prefix}/tools/cycle-planner` },
          ]}
        />

        {/* ── Title ───────────────────────────────────────────────────── */}
        <div className="mb-8">
          <h1
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Peptide Cycle Planner
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
            Select a compound, injection frequency, and cycle length to generate a
            week-by-week injection schedule. Off-cycle breaks are included automatically.
            Scheduling aid only — not medical advice.
          </p>
        </div>

        {/* ── Tool ────────────────────────────────────────────────────── */}
        <CyclePlannerClient />

        <AdSlot className="my-8" />

        {/* ── How to use ──────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            How to Use This Planner
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: "1",
                title: "Pick Your Compound",
                desc: "Select from common presets. Each preset fills in typical injection frequency, cycle length, and off-cycle break based on common research protocols.",
              },
              {
                step: "2",
                title: "Adjust Frequency",
                desc: "Change the injection frequency if your protocol differs from the preset. Options range from twice-daily to once-weekly.",
              },
              {
                step: "3",
                title: "Set Cycle Length",
                desc: "Choose how many weeks your on-cycle lasts, and how long the off-cycle break should be. Common patterns are 8 weeks on, 4 weeks off.",
              },
              {
                step: "4",
                title: "Read Your Schedule",
                desc: "The calendar shows every week, with injection days highlighted. Off-cycle weeks are clearly marked. The summary shows total injections and key dates.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl p-5"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white mb-3"
                  style={{ backgroundColor: C.teal }}
                >
                  {item.step}
                </div>
                <h3 className="font-bold text-sm mb-1" style={{ color: C.navy }}>
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            About Peptide Cycling
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Why do peptide protocols use on/off cycles?",
                a: "Many peptide protocols use on/off cycling to avoid receptor desensitization, tolerance development, or to manage costs. The appropriate cycle structure varies significantly by compound — GLP-1 medications like semaglutide are typically dosed continuously, while peptides like BPC-157 and TB-500 are commonly cycled. Always follow guidance from a qualified healthcare provider.",
              },
              {
                q: "Are the presets based on research protocols?",
                a: "Preset defaults are based on commonly cited research dosing schedules from published literature and community protocols. They are not clinical prescriptions. Actual protocols vary by individual, indication, and provider guidance.",
              },
              {
                q: "What does 'EOD' (every other day) mean in practice?",
                a: "Every other day means alternating injection days. In this planner, EOD starts on the first day of your cycle (Day 0 = cycle start) and injects every second day from there. This means some weeks will have 3 injections and some will have 4, depending on how the cycle start aligns with the week.",
              },
              {
                q: "Can I use this to plan multiple compounds at once?",
                a: "This planner handles one compound at a time. For multi-compound protocols, create a schedule for each compound separately and compare them. Future versions of this tool may support stacked protocol planning.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl overflow-hidden"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <summary
                  className="cursor-pointer px-5 py-4 flex items-center justify-between text-sm font-semibold list-none"
                  style={{ color: C.navy }}
                >
                  <span>{faq.q}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={C.navy}
                    strokeWidth="2"
                    className="flex-shrink-0 ml-2 transition-transform group-open:rotate-180"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── Related tools ───────────────────────────────────────────── */}
        <section className="mb-8">
          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
          >
            <h2
              className="text-lg font-bold mb-2"
              style={{
                color: C.navy,
                fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
              }}
            >
              Related Tools
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Use the{" "}
              <a
                href={`${prefix}/tools/vial-planner`}
                className="underline"
                style={{ color: C.teal }}
              >
                Vial Supply Planner
              </a>{" "}
              to calculate how many vials you need for your full cycle, and when to reorder.
              Use the{" "}
              <a
                href={`${prefix}/tools/doctor-export`}
                className="underline"
                style={{ color: C.teal }}
              >
                Doctor Export
              </a>{" "}
              to share your protocol summary with your healthcare provider.
            </p>
          </div>
        </section>

        <MedicalDisclaimer />
      </div>
    </>
  );
}
