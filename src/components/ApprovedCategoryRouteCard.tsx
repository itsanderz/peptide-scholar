import Link from "next/link";
import type { MarketCode } from "@/types/market";

interface ApprovedCategoryOption {
  name: string;
  slug: string;
  fdaApprovedFor: string | null;
  brandNames: string[];
}

export function ApprovedCategoryRouteCard({
  categoryName,
  options,
  marketCode,
}: {
  categoryName: string;
  options: ApprovedCategoryOption[];
  marketCode: MarketCode;
}) {
  const isUs = marketCode === "us";

  return (
    <section
      className="approved-category-card mb-8 rounded-xl p-5"
      style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
    >
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3B7A9E] mb-2">
        Approved Category Routing
      </div>
      <h2
        className="text-xl md:text-2xl font-bold mb-3"
        style={{
          color: "#1A3A5C",
          fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
        }}
      >
        Approved entries in the {categoryName} category
      </h2>

      <div className="grid gap-3 mb-4">
        {options.map((option) => (
          <div
            key={option.slug}
            className="approved-category-entry rounded-lg p-4"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
          >
            <div className="text-sm font-semibold mb-1" style={{ color: "#1A3A5C" }}>
              {option.name}
            </div>
            <div className="text-sm leading-relaxed" style={{ color: "#1C2028" }}>
              {option.fdaApprovedFor
                ? `${option.name} is currently modeled on this site as an approved treatment path for: ${option.fdaApprovedFor}.`
                : `${option.name} is currently modeled on this site as an approved treatment path.`}
              {option.brandNames.length > 0 ? ` Brand names in the current dataset: ${option.brandNames.join(", ")}.` : ""}
            </div>
          </div>
        ))}
      </div>

      <div
        className="rounded-lg p-4 mb-4"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
      >
        <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#3B7A9E" }}>
          Validation Note
        </div>
        <div className="text-sm leading-relaxed" style={{ color: "#1C2028" }}>
          This block reflects the site&apos;s current structured treatment data and internal routing logic. It does not replace checking current labeling, payer rules, or local prescribing conditions.
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <Link
            key={option.slug}
            href={`/providers/treatment/${option.slug}`}
            className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold"
            style={{ backgroundColor: "#FFFFFF", color: "#1A3A5C", border: "1px solid #D0D7E2", textDecoration: "none" }}
          >
            View {option.name} routing
          </Link>
        ))}
        <Link
          href="/providers"
          className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold"
          style={{ backgroundColor: "#1A3A5C", color: "#FFFFFF", textDecoration: "none" }}
        >
          {isUs ? "Use provider matcher" : "Join provider rollout"}
        </Link>
      </div>
    </section>
  );
}
