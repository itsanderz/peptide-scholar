import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot } from "@/components";
import SymptomCheckerClient from "./SymptomCheckerClient";
import { medicationTimelines } from "@/data/side-effect-timeline";
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

  const alt = localeAlternates(siteConfig.domain, "/tools/symptom-checker", locale);

  return {
    ...generateSEO({
      title: "Is This Normal? GLP-1 Side Effect Timeline — Check Your Symptoms | PeptideScholar",
      description:
        "Check whether your GLP-1 side effects are typical using clinical trial data. See prevalence rates, median duration, and peak timing for nausea, diarrhea, constipation, and more on Wegovy, Zepbound, and Saxenda.",
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
export default async function SymptomCheckerPage({
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
          name: "GLP-1 Side Effect Timeline Checker",
          applicationCategory: "HealthApplication",
          operatingSystem: "Web Browser",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description:
            "Interactive tool that uses clinical trial data to show the prevalence, median duration, and typical timeline for GLP-1 medication side effects including nausea, diarrhea, vomiting, and constipation.",
          url: `${siteConfig.domain}/tools/symptom-checker`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Tools", href: `${prefix}/tools` },
            { label: "Symptom Checker", href: `${prefix}/tools/symptom-checker` },
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
            Is This Normal? GLP-1 Side Effect Timeline
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
            Select your medication and a symptom to see what clinical trials actually found — prevalence
            rates, median duration, and when symptoms typically peak and resolve.
          </p>
        </div>

        {/* ── Interactive Tool ─────────────────────────────────────── */}
        <SymptomCheckerClient medications={medicationTimelines} />

        <AdSlot className="my-8" />

        {/* ── How This Tool Works ─────────────────────────────────── */}
        <section className="mb-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            How This Tool Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                step: "1",
                title: "Data Source",
                desc: "All prevalence rates and duration data are sourced directly from peer-reviewed clinical trial publications and FDA prescribing information — not anecdotes or forums.",
              },
              {
                step: "2",
                title: "Drug vs. Placebo",
                desc: "The tool shows both the medication rate and the placebo rate so you can see the net drug effect. Some symptoms occur in up to 16% of placebo recipients too.",
              },
              {
                step: "3",
                title: "What It Cannot Do",
                desc: "This tool cannot diagnose conditions or predict your individual experience. Symptom severity varies widely. Always consult your prescriber if you are concerned.",
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

        {/* ── When to Contact Your Provider ────────────────────────── */}
        <section className="mb-8">
          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: "#FEF2F2", border: `1px solid #FECACA` }}
          >
            <h2
              className="text-lg font-bold mb-3"
              style={{
                color: "#991B1B",
                fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
              }}
            >
              When to Contact Your Healthcare Provider
            </h2>
            <ul className="space-y-1.5">
              {[
                "Severe or persistent vomiting or diarrhea causing dehydration",
                "Severe abdominal pain (may indicate pancreatitis — seek emergency care)",
                "Signs of low blood sugar (sweating, shakiness, confusion) if also on insulin or sulfonylureas",
                "Vision changes, chest pain, or shortness of breath",
                "Any symptom that significantly interferes with daily activities",
                "Symptoms that do not improve after 4–6 weeks at a stable dose",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#7F1D1D" }}>
                  <span className="mt-0.5 text-red-600 flex-shrink-0">&#9679;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <MedicalDisclaimer />
      </div>
    </>
  );
}
