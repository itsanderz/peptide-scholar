import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreadcrumbNav, MedicalDisclaimer, PageTracker } from "@/components";
import { isValidLocale } from "@/lib/i18n";
import { getRequestMarket } from "@/lib/request-market";
import ArenaClient from "./ArenaClient";

export const metadata: Metadata = {
  title: "Protocol Arena (Beta) | PeptideScholar",
  description:
    "Vote on peptide protocol framings head-to-head. Local-first ELO leaderboard by goal — research preview, not medical advice.",
  // Benchmark is a research preview; intentionally kept out of the index and
  // sitemap until protocols, moderation, and policy are finalized.
  robots: { index: false, follow: false },
};

export default async function ArenaPage({
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
        params={{ page_family: "arena", page_slug: "arena", market: market.code }}
      />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Arena", href: "/arena" },
          ]}
        />

        <div className="mt-6 mb-6">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4"
            style={{ backgroundColor: "#F8FAFC", borderColor: "#D0D7E2", color: "#334155" }}
          >
            <span>Research preview &middot; noindex</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "#1A3A5C" }}>
            Protocol Arena
          </h1>
          <p className="text-lg leading-relaxed max-w-3xl" style={{ color: "#5A6577" }}>
            Head-to-head voting on peptide-protocol framings, scored by local ELO. Pick a goal, pick
            the framing you prefer, and see how the leaderboard moves in your browser. Nothing here
            is medical advice.
          </p>
        </div>

        <ArenaClient />

        <div className="mt-10">
          <MedicalDisclaimer compact />
        </div>
      </div>
    </>
  );
}
