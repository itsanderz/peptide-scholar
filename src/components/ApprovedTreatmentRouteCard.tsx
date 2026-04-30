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
    <section className="provider-cta is-muted">
      <div className="pd-side-lbl">Approved Treatment Routing</div>
      <h2 className="provider-title">
        {peptideName} in PeptideScholar&apos;s approved-treatment dataset
      </h2>
      <p className="provider-copy">
        {fdaApprovedFor
          ? `${peptideName} is currently modeled on this site as an approved treatment path for: ${fdaApprovedFor}.`
          : `${peptideName} is currently modeled on this site as an approved treatment path.`}
        {brandNames.length > 0 ? ` Brand names in the current dataset: ${brandNames.join(", ")}.` : ""}
      </p>

      <div className="dose-footnote">
        <strong>Validation note:</strong> This block reflects the site&apos;s current structured treatment
        data and internal routing logic. It is not a substitute for checking current prescribing,
        labeling, payer, or local regulatory details.
      </div>

      <div className="provider-badges">
        <Link href={`/providers/treatment/${peptideSlug}`} className="btn-dark">
          View treatment routing profiles
        </Link>
        <Link href={`/providers?treatment=${peptideSlug}`} className="btn-outline">
          {isUs ? "Use provider matcher" : "Join provider rollout"}
        </Link>
        <Link href="/legal" className="btn-outline">
          Review legal guidance
        </Link>
      </div>
    </section>
  );
}
