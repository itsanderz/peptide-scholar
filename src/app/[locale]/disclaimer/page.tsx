import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSEO } from "@/components/SEOHead";
import { BreadcrumbNav, MedicalDisclaimer } from "@/components";
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

  const alt = localeAlternates(siteConfig.domain, "/disclaimer", locale);

  return {
    ...generateSEO({
      title: "Medical & Legal Disclaimer",
      description:
        "Medical and legal disclaimer for PeptideScholar. This site is for educational purposes only and does not constitute medical advice. Consult a healthcare provider before using any peptide.",
      canonical: alt.canonical,
      siteName: siteConfig.name,
    }),
    alternates: {
      canonical: alt.canonical,
      languages: alt.languages,
    },
  };
}

const disclaimerSections: { title: string; content: string }[] = [
  {
    title: "No Medical Advice",
    content:
      "This website is for informational and educational purposes only and does not constitute medical advice, diagnosis, or treatment. The information provided on PeptideScholar should not be used as a substitute for the advice of a licensed physician, pharmacist, or other qualified healthcare professional. No doctor-patient relationship is created by your use of this site.",
  },
  {
    title: "Not a Substitute for Professional Care",
    content:
      "Always consult a qualified healthcare provider before starting, stopping, or modifying any peptide regimen or medical treatment. Do not disregard professional medical advice or delay seeking it because of information you have read on PeptideScholar. If you are experiencing a medical emergency, call your local emergency services immediately.",
  },
  {
    title: "FDA & Regulatory Status",
    content:
      "Many peptides discussed on this site are not approved by the U.S. Food and Drug Administration (FDA) for any medical indication. Their inclusion on PeptideScholar does not constitute an endorsement, recommendation, or suggestion for use. Regulatory status varies by country, and information presented here primarily reflects the U.S. regulatory landscape. Some peptides may be classified as investigational new drugs, research chemicals, or controlled substances in various jurisdictions.",
  },
  {
    title: "Research Limitations",
    content:
      "Evidence levels displayed on this site (A through D) reflect the quality, quantity, and consistency of available published research, not recommendations for use. A high evidence level indicates robust clinical data exists — it does not mean a peptide is safe, appropriate, or recommended for any individual. Preclinical research (in vitro and animal studies) may not translate to human outcomes. Published studies may have methodological limitations, conflicts of interest, or small sample sizes not immediately apparent from abstracts alone.",
  },
  {
    title: "No Guarantees",
    content:
      "While we strive for accuracy and regularly review our content against current literature, PeptideScholar makes no warranties or representations, express or implied, about the completeness, accuracy, reliability, suitability, or currency of the information contained on this site. New research may emerge that contradicts or modifies previously published findings. We disclaim all liability for any errors, omissions, or outcomes arising from the use of information on this site.",
  },
  {
    title: "WADA & Anti-Doping",
    content:
      "Athletes subject to anti-doping regulations under the World Anti-Doping Agency (WADA), United States Anti-Doping Agency (USADA), or any national or international sports federation should consult the current WADA Prohibited List and their sport's specific anti-doping rules before considering any substance discussed on this site. Many peptides, including but not limited to growth hormone secretagogues and melanocortin receptor agonists, are prohibited in competition and out-of-competition. Violations can result in suspension, disqualification, and other sanctions.",
  },
  {
    title: "Affiliate Disclosure",
    content:
      "PeptideScholar may contain affiliate links to third-party products, services, or educational resources. If you click on an affiliate link and make a purchase, we may receive a small commission at no additional cost to you. Affiliate relationships do not influence our editorial content, evidence ratings, or the information presented on this site. We maintain strict editorial independence and will never alter research findings or evidence levels based on commercial relationships.",
  },
  {
    title: "Contact",
    content:
      "If you have questions about our content, believe you have found an error, or wish to suggest corrections or additions, please contact us at info@peptidescholar.com. We welcome input from researchers, clinicians, and the scientific community to ensure the accuracy of our reference material.",
  },
];

export default async function DisclaimerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <div className="legacy-info-page max-w-3xl mx-auto px-4 py-8">
      <BreadcrumbNav
        crumbs={[
          { label: "Home", href: `${prefix}/` },
          { label: "Disclaimer", href: `${prefix}/disclaimer` },
        ]}
      />

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1A3A5C] mb-6"
        style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}
      >
        Medical & Legal Disclaimer
      </h1>

      <p
        className="text-lg text-[#5A6577] mb-8 leading-relaxed"
        style={{ fontFamily: "Source Serif 4, Georgia, serif" }}
      >
        Please read this disclaimer carefully before using PeptideScholar. By
        accessing or using this site, you acknowledge that you have read,
        understood, and agree to be bound by the terms below.
      </p>

      {/* Full MedicalDisclaimer component */}
      <MedicalDisclaimer compact={false} />

      {/* Detailed disclaimer sections */}
      <div className="mt-10 space-y-6">
        {disclaimerSections.map((section, i) => (
          <section
            key={i}
            className="bg-white border border-[#D0D7E2] rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <h2
              className="text-xl font-bold text-[#1A3A5C] mb-3"
              style={{ fontFamily: "Libre Franklin, system-ui, sans-serif" }}
            >
              {section.title}
            </h2>
            <p
              className="text-[#1C2028] leading-relaxed m-0"
              style={{ fontFamily: "Source Serif 4, Georgia, serif" }}
            >
              {section.content}
            </p>
          </section>
        ))}
      </div>

      {/* Last updated notice */}
      <div className="mt-10 pt-6 border-t border-[#D0D7E2]">
        <p className="text-sm text-[#5A6577] text-center">
          This disclaimer was last updated on March 2026. PeptideScholar reserves
          the right to update this disclaimer at any time without notice.
        </p>
      </div>
    </div>
  );
}
