import Link from "next/link";
import type { MarketCode } from "@/types/market";

export function ApprovedTreatmentRouteCard({
  peptideName,
  peptideSlug,
  fdaApprovedFor,
  brandNames,
  marketCode,
}: {
  peptideName: string;
  peptideSlug: string;
  fdaApprovedFor: string | null;
  brandNames: string[];
  marketCode: MarketCode;
}) {
  const isUs = marketCode === "us";

  return (
    <section
      className="mb-8 rounded-xl p-5"
      style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
    >
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3B7A9E] mb-2">
        Approved Treatment Routing
      </div>
      <h2
        className="text-xl md:text-2xl font-bold mb-3"
        style={{
          color: "#1A3A5C",
          fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
        }}
      >
        {peptideName} in PeptideScholar&apos;s current approved-treatment dataset
      </h2>
      <p className="text-sm leading-relaxed mb-4" style={{ color: "#1C2028" }}>
        {fdaApprovedFor
          ? `${peptideName} is currently modeled on this site as an approved treatment path for: ${fdaApprovedFor}.`
          : `${peptideName} is currently modeled on this site as an approved treatment path.`}
        {brandNames.length > 0 ? ` Brand names in the current dataset: ${brandNames.join(", ")}.` : ""}
      </p>

      <div
        className="rounded-lg p-4 mb-4"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
      >
        <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
          Validation Note
        </div>
        <div className="text-sm leading-relaxed" style={{ color: "#1C2028" }}>
          This block reflects the site&apos;s current structured treatment data and internal routing logic. It is not a substitute for checking current prescribing, labeling, payer, or local regulatory details.
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/providers/treatment/${peptideSlug}`}
          className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold"
          style={{ backgroundColor: "#1A3A5C", color: "#FFFFFF", textDecoration: "none" }}
        >
          View treatment routing profiles
        </Link>
        <Link
          href={`/providers?treatment=${peptideSlug}`}
          className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold"
          style={{ backgroundColor: "#FFFFFF", color: "#1A3A5C", border: "1px solid #D0D7E2", textDecoration: "none" }}
        >
          {isUs ? "Use provider matcher" : "Join provider rollout"}
        </Link>
        <Link
          href="/legal"
          className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold"
          style={{ backgroundColor: "#FFFFFF", color: "#1A3A5C", border: "1px solid #D0D7E2", textDecoration: "none" }}
        >
          Review legal guidance
        </Link>
      </div>
    </section>
  );
}
