import Link from "next/link";
import type { MarketCode } from "@/types/market";

const SUPPORTED_TREATMENTS = new Set(["semaglutide", "tirzepatide"]);

function titleCase(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function TreatmentMoneyLinks({
  treatmentSlug,
  marketCode,
  compact = false,
}: {
  treatmentSlug: string;
  marketCode: MarketCode;
  compact?: boolean;
}) {
  if (!SUPPORTED_TREATMENTS.has(treatmentSlug)) {
    return null;
  }

  const treatmentName = titleCase(treatmentSlug);
  const marketMessage =
    marketCode === "us"
      ? "US-first money path"
      : `${marketCode.toUpperCase()} selected • still using US-first conversion assets`;

  return (
    <section
      className={compact ? "mb-6" : "mb-8"}
      aria-label={`${treatmentName} cost and tracker links`}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2
          className={compact ? "text-lg font-bold" : "text-xl md:text-2xl font-bold"}
          style={{
            color: "#1A3A5C",
            fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
          }}
        >
          {treatmentName} Next Steps
        </h2>
        <span
          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
          style={{ backgroundColor: "#F0F9FF", color: "#0369A1", border: "1px solid #BAE6FD" }}
        >
          {marketMessage}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Link
          href={`/costs/${treatmentSlug}`}
          className="rounded-xl p-5"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
        >
          <div
            className="text-xs font-semibold uppercase tracking-[0.16em] mb-2"
            style={{ color: "#3B7A9E" }}
          >
            Cost Guide
          </div>
          <div className="text-lg font-bold mb-2" style={{ color: "#1A3A5C" }}>
            Review {treatmentName.toLowerCase()} pricing, coverage, and savings
          </div>
          <div className="text-sm leading-relaxed mb-3" style={{ color: "#5A6577" }}>
            Use the reviewed cost hub before you commit to a provider path or a self-pay workflow.
          </div>
          <span className="font-semibold" style={{ color: "#3B7A9E" }}>
            Open cost guide &rarr;
          </span>
        </Link>

        <Link
          href={`/app/${treatmentSlug}-tracker`}
          className="rounded-xl p-5"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
        >
          <div
            className="text-xs font-semibold uppercase tracking-[0.16em] mb-2"
            style={{ color: "#3B7A9E" }}
          >
            Tracker Landing
          </div>
          <div className="text-lg font-bold mb-2" style={{ color: "#1A3A5C" }}>
            Join the {treatmentName} tracker waitlist
          </div>
          <div className="text-sm leading-relaxed mb-3" style={{ color: "#5A6577" }}>
            Validate reminder, refill, and symptom-tracking demand before the full PWA launches.
          </div>
          <span className="font-semibold" style={{ color: "#3B7A9E" }}>
            Open tracker landing &rarr;
          </span>
        </Link>
      </div>
    </section>
  );
}
