import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreadcrumbNav, JsonLd, MedicalDisclaimer, PageTracker } from "@/components";
import { generateSEO } from "@/components/SEOHead";
import { isValidLocale } from "@/lib/i18n";
import { getRequestMarket } from "@/lib/request-market";
import { siteConfig } from "@/lib/siteConfig";
import TrackerClient from "./TrackerClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  return generateSEO({
    title: "Peptide Tracker (Beta) | PeptideScholar",
    description:
      "Free, local-first GLP-1 and research peptide tracker. Log doses, symptoms, and set injection reminders — all data stays on your device.",
    canonical: `${siteConfig.domain}/app/tracker`,
    siteName: siteConfig.name,
  });
}

export default async function TrackerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale) || locale !== "en") notFound();
  const market = await getRequestMarket();

  return (
    <>
      <PageTracker
        event="market_page_view"
        params={{ page_family: "tracker", page_slug: "tracker", market: market.code }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "PeptideScholar Tracker",
          description:
            "Local-first tracker for GLP-1 and research peptide workflows. Logs doses, symptoms, and reminders in-browser — no account required.",
          url: `${siteConfig.domain}/app/tracker`,
          applicationCategory: "HealthApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "App", href: "/app" },
            { label: "Tracker", href: "/app/tracker" },
          ]}
        />

        <div className="mt-6 mb-8">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4"
            style={{ backgroundColor: "#F8FAFC", borderColor: "#D0D7E2", color: "#334155" }}
          >
            <span>Beta &mdash; local-first</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
            Peptide Tracker
          </h1>
          <p className="text-lg leading-relaxed max-w-3xl" style={{ color: "#5A6577" }}>
            Log doses and symptoms, set an injection-day reminder, and export your history as ICS or
            CSV. Everything lives in your browser &mdash; no account, no server, no sync.
          </p>
        </div>

        <TrackerClient />

        <div className="mt-10">
          <MedicalDisclaimer compact />
        </div>
      </div>
    </>
  );
}
