import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSEO, JsonLd } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer, AdSlot } from "@/components";
import DoctorExportClient from "./DoctorExportClient";
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

  const alt = localeAlternates(siteConfig.domain, "/tools/doctor-export", locale);

  return {
    ...generateSEO({
      title: "Doctor-Ready Export — Peptide & GLP-1 Medication Summary",
      description:
        "Create a printable medication summary for your healthcare provider. Enter your current peptides or GLP-1 medications, dose, frequency, symptoms, and notes to generate a clean provider-ready document. Print or copy in one click.",
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
export default async function DoctorExportPage({
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
          name: "Doctor-Ready Peptide & GLP-1 Export",
          applicationCategory: "HealthApplication",
          operatingSystem: "Web Browser",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Free tool to generate a printable medication summary for your healthcare provider. Includes current medications, doses, frequencies, symptoms, and notes.",
          url: `${siteConfig.domain}/tools/doctor-export`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: `${prefix}/` },
            { label: "Tools", href: `${prefix}/tools` },
            { label: "Doctor Export", href: `${prefix}/tools/doctor-export` },
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
            Doctor-Ready Export
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
            Fill in your current medications, symptoms, and questions, then print or copy a
            clean summary to share with your healthcare provider. No account required — nothing
            is saved.
          </p>
        </div>

        {/* ── Privacy notice ──────────────────────────────────────────── */}
        <div
          className="rounded-xl p-4 mb-8 flex items-start gap-3"
          style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0" }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2B8A5E"
            strokeWidth="2"
            className="flex-shrink-0 mt-0.5"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <p className="text-sm text-green-800">
            <strong>Your data never leaves your device.</strong> This tool runs entirely in your
            browser. Nothing you enter is stored, transmitted, or shared.
          </p>
        </div>

        {/* ── Tool ────────────────────────────────────────────────────── */}
        <DoctorExportClient />

        <AdSlot className="my-8 print:hidden" />

        {/* ── Why use this ────────────────────────────────────────────── */}
        <section className="mb-12 print:hidden">
          <h2
            className="text-2xl font-bold mb-6"
            style={{
              color: C.navy,
              fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
            }}
          >
            Why Bring a Summary to Your Appointment
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                ),
                title: "Nothing gets missed",
                desc: "Providers see many patients. A clear written summary means your dose, frequency, and start date are accurate in your chart.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
                title: "Saves appointment time",
                desc: "Instead of recalling details from memory under pressure, you hand over a summary and the conversation can focus on your questions.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                ),
                title: "Better provider relationship",
                desc: "Showing up prepared signals you take your protocol seriously and makes it easier for providers to support you responsibly.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                ),
                title: "Personal record",
                desc: "Print a copy for your own files. Useful if you change providers, need to recount weeks on protocol, or want to track what changed over time.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-5"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: C.teal }}
                >
                  {item.icon}
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
        <section className="mb-12 print:hidden">
          <h2
            className="text-2xl font-bold mb-4"
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
                q: "Is this tool storing my information anywhere?",
                a: "No. This tool runs entirely in your browser using local React state. Nothing you enter is sent to any server, stored in a database, or associated with your identity. When you close or refresh the tab, all inputs are cleared.",
              },
              {
                q: "Can I use this for medications other than peptides?",
                a: "Yes. The medication fields accept any text. You can use this for GLP-1 prescriptions, compounded medications, supplements, or any other substances you want your provider to know about.",
              },
              {
                q: "Is this a legal medical document?",
                a: "No. This is a patient-generated summary intended to support communication with a healthcare provider. It is not a clinical note, medical record, or prescription. Your provider will verify and document information in their own system.",
              },
              {
                q: "How do I print or save as a PDF?",
                a: "Click 'Print / Save PDF'. In your browser's print dialog, choose 'Save as PDF' as the printer destination. The document is formatted to print cleanly — the input form is hidden on the printed page.",
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

        {/* ── Related ──────────────────────────────────────────────────── */}
        <section className="mb-8 print:hidden">
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
            <p className="text-sm text-gray-600 leading-relaxed">
              Use the{" "}
              <a href={`${prefix}/tools/cycle-planner`} className="underline" style={{ color: C.teal }}>
                Cycle Planner
              </a>{" "}
              to generate your full injection schedule, and the{" "}
              <a href={`${prefix}/tools/vial-planner`} className="underline" style={{ color: C.teal }}>
                Vial Supply Planner
              </a>{" "}
              to calculate refill timing before your appointment.
            </p>
          </div>
        </section>

        <MedicalDisclaimer />
      </div>
    </>
  );
}
