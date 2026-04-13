import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot } from "@/components";
import HalfLifeClient from "./HalfLifeClient";
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

  const alt = localeAlternates(
    siteConfig.domain,
    "/tools/half-life-visualizer",
    locale
  );

  return {
    ...generateSEO({
      title: "GLP-1 Half-Life Visualizer — Drug Level Estimator",
      description:
        "See how semaglutide, tirzepatide, and liraglutide levels decay after each injection. Interactive chart based on FDA-verified half-life data. Educational tool — not medical advice.",
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
export default async function HalfLifeVisualizerPage({
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
          name: "GLP-1 Half-Life Visualizer",
          applicationCategory: "HealthApplication",
          operatingSystem: "Web Browser",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Interactive chart showing how GLP-1 drug concentrations decay after injection, based on FDA-published half-life data for semaglutide, tirzepatide, and liraglutide.",
          url: `${siteConfig.domain}/tools/half-life-visualizer`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Tools", href: `${prefix}/tools` },
            {
              label: "Half-Life Visualizer",
              href: `${prefix}/tools/half-life-visualizer`,
            },
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
            GLP-1 Half-Life Visualizer
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
            Select a medication and slide to any day to see the estimated drug
            level remaining in your system. Based on FDA-published half-life data.
            Educational tool — not medical advice.
          </p>
        </div>

        {/* ── Tool ────────────────────────────────────────────────────── */}
        <HalfLifeClient />

        <AdSlot className="my-8" />

        {/* ── How it works ────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            How This Works
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: "1",
                title: "Select Your Medication",
                desc: "Choose from semaglutide, tirzepatide, or liraglutide. Each has a distinct half-life from the FDA label.",
              },
              {
                step: "2",
                title: "Set Days Since Injection",
                desc: "Drag the slider to match how many days have passed since your last injection.",
              },
              {
                step: "3",
                title: "Read the Level",
                desc: "The tool estimates what percentage of the peak dose is still circulating, using the standard exponential decay formula.",
              },
              {
                step: "4",
                title: "Understand the Zones",
                desc: "Green = active range. Yellow = declining, next dose approaching. Red = near washout, minimal activity expected.",
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

        {/* ── Half-life reference table ────────────────────────────────── */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Half-Life Reference
          </h2>
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: `1px solid ${C.border}` }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: C.bg }}>
                  {["Drug", "Half-life", "Dosing", "Days to ~10% remaining", "Source"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left font-semibold"
                        style={{
                          color: C.navy,
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    drug: "Semaglutide",
                    halfLife: "~7 days (168 h)",
                    dosing: "Once weekly",
                    daysTo10: "~23 days",
                    source: "FDA Wegovy §12.3",
                    sourceUrl:
                      "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215256s024lbl.pdf",
                  },
                  {
                    drug: "Tirzepatide",
                    halfLife: "~5 days (116 h)",
                    dosing: "Once weekly",
                    daysTo10: "~16 days",
                    source: "FDA Zepbound §12.3",
                    sourceUrl:
                      "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s031lbl.pdf",
                  },
                  {
                    drug: "Liraglutide",
                    halfLife: "~13 hours",
                    dosing: "Once daily",
                    daysTo10: "~1.8 days",
                    source: "FDA Saxenda §12.3",
                    sourceUrl:
                      "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/206321s020lbl.pdf",
                  },
                ].map((row, i) => (
                  <tr
                    key={row.drug}
                    style={{
                      backgroundColor: i % 2 === 0 ? C.surface : C.bg,
                      borderBottom: `1px solid ${C.border}`,
                    }}
                  >
                    <td
                      className="px-4 py-3 font-semibold"
                      style={{ color: C.navy }}
                    >
                      {row.drug}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{row.halfLife}</td>
                    <td className="px-4 py-3 text-gray-600">{row.dosing}</td>
                    <td className="px-4 py-3 text-gray-600">{row.daysTo10}</td>
                    <td className="px-4 py-3">
                      <a
                        href={row.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-xs"
                        style={{ color: C.teal }}
                      >
                        {row.source}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Half-life values reflect mean population estimates from FDA prescribing
            information. Individual values vary by body weight, renal function, and other factors.
          </p>
        </section>

        {/* ── What is half-life? ───────────────────────────────────────── */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            What Does Half-Life Mean?
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What is a drug half-life?",
                a: "Half-life (t½) is the time it takes for the concentration of a drug in your bloodstream to fall to half its previous value. After one half-life, 50% remains. After two, 25%. After three, 12.5%. Most drugs are considered effectively cleared after 4–5 half-lives (~3–6% remaining).",
              },
              {
                q: "Why does semaglutide stay in the body so long?",
                a: "Semaglutide is chemically modified with a fatty-acid chain that binds to albumin in the blood. This slows clearance dramatically, giving it a half-life of ~7 days — much longer than the ~13 hours of older GLP-1 drugs like liraglutide. This is what makes once-weekly dosing possible.",
              },
              {
                q: "Does a lower level mean the drug stopped working?",
                a: "Not necessarily. Therapeutic effect depends on more than just concentration — receptor occupancy, downstream signaling, and individual response all matter. However, once levels fall significantly (below ~10–25% of peak), GLP-1 receptor activity is substantially reduced for most people. Talk to your prescriber if you notice increased hunger or side effects returning before your next dose.",
              },
              {
                q: "Is this tool telling me what my actual blood level is?",
                a: "No. This is an educational visualization based on average population pharmacokinetics from FDA label data. Actual serum levels vary significantly by individual. This tool is not a diagnostic device and should not be used to make any medical decisions.",
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

        <MedicalDisclaimer />
      </div>
    </>
  );
}
