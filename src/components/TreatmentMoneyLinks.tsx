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
      : `${marketCode.toUpperCase()} selected - using US-first conversion assets`;

  return (
    <section
      className={compact ? "resource-box" : "resource-box"}
      aria-label={`${treatmentName} cost and tracker links`}
    >
      <div className="pd-hdr-top">
        <h2 className="section-title" style={{ marginBottom: 0 }}>
          {treatmentName} Next Steps
        </h2>
        <span className="legal-badge is-warn">{marketMessage}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Link href={`/costs/${treatmentSlug}`} className="resource-card">
          <div className="resource-icon">$</div>
          <div>
            <div className="pd-side-lbl">Cost Guide</div>
            <div className="resource-title">
              Review {treatmentName.toLowerCase()} pricing, coverage, and savings
            </div>
            <p className="resource-desc">
              Use the reviewed cost hub before you commit to a provider path or a self-pay workflow.
            </p>
            <span className="pd-comp-name">Open cost guide -&gt;</span>
          </div>
        </Link>

        <Link href={`/app/${treatmentSlug}-tracker`} className="resource-card">
          <div className="resource-icon">+</div>
          <div>
            <div className="pd-side-lbl">Tracker Landing</div>
            <div className="resource-title">
              Join the {treatmentName} tracker waitlist
            </div>
            <p className="resource-desc">
              Validate reminder, refill, and symptom-tracking demand before the full PWA launches.
            </p>
            <span className="pd-comp-name">Open tracker landing -&gt;</span>
          </div>
        </Link>
      </div>
    </section>
  );
}
