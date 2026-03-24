import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot } from "@/components";
import TitrationPlannerClient from "./TitrationPlannerClient";
import { titrationSchedules } from "@/data/clinical-data";
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

  const alt = localeAlternates(siteConfig.domain, "/tools/titration-planner", locale);

  return {
    ...generateSEO({
      title: "Dosage Titration Planner — GLP-1 Schedule Calendar",
      description:
        "Free dosage titration planner for Wegovy, Ozempic, Zepbound, Mounjaro, and Saxenda. Pick a start date and get a personalized week-by-week dose schedule calendar with printable output.",
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
export default async function TitrationPlannerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;

  /* Serialize schedule data for client component */
  const scheduleData = titrationSchedules.map((s) => ({
    slug: s.slug,
    brandName: s.brandName,
    genericName: s.genericName,
    indication: s.indication,
    route: s.route,
    maxDoseMg: s.maxDoseMg,
    steps: s.steps,
    source: s.source,
    sourceUrl: s.sourceUrl,
    notes: s.notes,
  }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Dosage Titration Planner",
          applicationCategory: "HealthApplication",
          operatingSystem: "Web Browser",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description:
            "Free dosage titration schedule planner for GLP-1 medications. Select a medication and start date to generate a personalized week-by-week dose calendar.",
          url: `${siteConfig.domain}/tools/titration-planner`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Tools", href: `${prefix}/tools` },
            { label: "Titration Planner", href: `${prefix}/tools/titration-planner` },
          ]}
        />

        {/* ── Title ─────────────────────────────────────────────────── */}
        <div className="mb-8">
          <h1
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Dosage Titration Planner
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
            Select your medication and start date to generate a personalized week-by-week
            titration schedule based on FDA-approved prescribing information.
          </p>
        </div>

        {/* ── Planner Tool ────────────────────────────────────────────── */}
        <TitrationPlannerClient schedules={scheduleData} />

        <AdSlot className="my-8" />

        {/* ── How to Read Your Schedule ──────────────────────────────── */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            How to Read Your Schedule
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: "1",
                title: "Select Medication",
                desc: "Choose the brand name medication you have been prescribed. Each drug has a different titration protocol from the FDA.",
              },
              {
                step: "2",
                title: "Enter Start Date",
                desc: "Enter the date of your first injection. The planner calculates all future dose change dates automatically.",
              },
              {
                step: "3",
                title: "Read the Timeline",
                desc: "Each row shows the dose step, the date range it covers, and whether it is a transitional or maintenance dose.",
              },
              {
                step: "4",
                title: "Print or Save",
                desc: "Use the Print Schedule button to print or save as PDF. Bring it to your provider appointment.",
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

        {/* ── Important Note ─────────────────────────────────────────── */}
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
              Important: Follow Your Provider&apos;s Instructions
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              This planner reflects the standard titration schedule from FDA prescribing
              information. Your provider may adjust your schedule based on tolerability,
              glycemic response, or individual factors. If you experience intolerable side
              effects, do not increase your dose — contact your prescriber. The FDA label for
              most GLP-1 medications allows extending any dose step by 4 additional weeks
              if needed before escalating.
            </p>
          </div>
        </section>

        <MedicalDisclaimer />
      </div>
    </>
  );
}
