import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot } from "@/components";
import VialPlannerClient from "./VialPlannerClient";
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

  const alt = localeAlternates(siteConfig.domain, "/tools/vial-planner", locale);

  return {
    ...generateSEO({
      title: "Peptide Vial Supply Planner — Refill Date Calculator",
      description:
        "Plan your peptide vial supply and get your refill date automatically. Enter vial size, dose, and injection frequency to see total doses, depletion date, and recommended reorder date.",
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
export default async function VialPlannerPage({
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
          name: "Peptide Vial Supply Planner",
          applicationCategory: "HealthApplication",
          operatingSystem: "Web Browser",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Free peptide vial supply planner. Enter vial size, dose, and injection frequency to calculate total doses, days supply, and refill date.",
          url: `${siteConfig.domain}/tools/vial-planner`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Tools", href: `${prefix}/tools` },
            { label: "Vial Supply Planner", href: `${prefix}/tools/vial-planner` },
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
            Peptide Vial Supply Planner
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
            Enter your vial size, dose, and injection frequency to calculate
            exactly how many doses you have, when your vial runs out, and when
            to place your next order.
          </p>
        </div>

        {/* ── Planner ─────────────────────────────────────────────────── */}
        <VialPlannerClient />

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
                title: "Select Your Peptide",
                desc: "Choose from common presets or select Custom to enter your own values. Presets fill in typical vial sizes and doses automatically.",
              },
              {
                step: "2",
                title: "Confirm Vial & Dose",
                desc: "Verify the vial size (mg), water volume (mL), and dose per injection. Change the unit between mcg and mg as needed.",
              },
              {
                step: "3",
                title: "Set Frequency & Start Date",
                desc: "Select how often you inject and enter the date of your first injection. The planner calculates everything from there.",
              },
              {
                step: "4",
                title: "Read Your Supply Plan",
                desc: "See total doses, days supply, depletion date, and the recommended reorder date — 7 days before your vial runs out.",
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
            className="text-2xl font-bold mb-6"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What is bacteriostatic water and how much should I add?",
                a: "Bacteriostatic water (BAC water) is sterile water with 0.9% benzyl alcohol, which prevents bacterial growth in the reconstituted vial. The amount you add determines concentration: more water = lower concentration (larger volume per dose), less water = higher concentration (smaller volume per dose). The total peptide stays the same regardless. Common ranges are 1–3 mL for most peptide vials.",
              },
              {
                q: "What are 'units' on an insulin syringe?",
                a: "Insulin syringes use a U-100 scale where 100 units = 1 mL. So 10 units = 0.1 mL, 50 units = 0.5 mL, etc. This is the standard used for peptide injections. The planner calculates exactly how many units to draw for your dose.",
              },
              {
                q: "Why does the planner recommend reordering 7 days early?",
                a: "A 7-day buffer accounts for typical shipping times and ensures you never miss a dose. For weekly-dosed peptides or medications, running out between shipments means at least a week's gap. Ordering one week early keeps your protocol uninterrupted.",
              },
              {
                q: "How long does a reconstituted peptide vial stay stable?",
                a: "Most reconstituted peptides stored at 2–8°C (standard refrigerator) remain stable for 3–4 weeks. Always keep reconstituted peptides refrigerated, never freeze them, and protect from light. Check the specific peptide's storage instructions — stability varies.",
              },
              {
                q: "What if my dose changes during the protocol?",
                a: "Re-enter your new dose when it changes. The planner will recalculate the depletion date and units per injection from that point forward. During dose escalation (e.g., semaglutide titration), your vial may last longer than expected at lower doses.",
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

        {/* ── Note on this tool ────────────────────────────────────────── */}
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
              Difference from the Reconstitution Calculator
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              The{" "}
              <a
                href={`${prefix}/tools/calculator`}
                className="underline"
                style={{ color: C.teal }}
              >
                Reconstitution Calculator
              </a>{" "}
              tells you how many units to draw for a single dose. This Vial Supply
              Planner adds injection frequency and a start date to give you the full
              supply timeline — useful for protocol planning, ordering ahead, and
              avoiding gaps in your protocol.
            </p>
          </div>
        </section>

        <MedicalDisclaimer />
      </div>
    </>
  );
}
