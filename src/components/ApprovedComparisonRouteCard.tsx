import Link from "next/link";
import type { MarketCode } from "@/types/market";

interface ApprovedOption {
  name: string;
  slug: string;
  fdaApprovedFor: string | null;
  brandNames: string[];
}

export function ApprovedComparisonRouteCard({
  options,
  marketCode,
}: {
  options: ApprovedOption[];
  marketCode: MarketCode;
}) {
  const isUs = marketCode === "us";

  return (
    <section className="provider-cta is-muted">
      <div className="pd-side-lbl">Approved Comparison Routing</div>
      <h2 className="provider-title">Approved options in this comparison</h2>

      <div className="resource-grid">
        {options.map((option) => (
          <div key={option.slug} className="resource-card">
            <div className="resource-icon">A</div>
            <div>
              <div className="resource-title">{option.name}</div>
              <p className="resource-desc">
                {option.fdaApprovedFor
                  ? `${option.name} is currently modeled on this site as an approved treatment path for: ${option.fdaApprovedFor}.`
                  : `${option.name} is currently modeled on this site as an approved treatment path.`}
                {option.brandNames.length > 0 ? ` Brand names in the current dataset: ${option.brandNames.join(", ")}.` : ""}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="dose-footnote">
        <strong>Validation note:</strong> This block reflects the site&apos;s current structured treatment
        data and internal routing logic. It does not replace checking current labeling, payer rules,
        or local prescribing conditions.
      </div>

      <div className="provider-badges">
        {options.map((option) => (
          <Link key={option.slug} href={`/providers/treatment/${option.slug}`} className="btn-outline">
            View {option.name} routing
          </Link>
        ))}
        <Link
          href={options.length === 1 ? `/providers?treatment=${options[0].slug}` : "/providers"}
          className="btn-dark"
        >
          {isUs ? "Use provider matcher" : "Join provider rollout"}
        </Link>
      </div>
    </section>
  );
}
