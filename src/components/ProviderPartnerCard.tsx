"use client";

import Link from "next/link";
import type { ProviderPartner } from "@/data/provider-partners";
import { trackCTAClick, trackProviderPartnerSelect } from "@/lib/analytics";
import {
  formatProviderSlug,
  humanizeProviderIntakeMode,
} from "@/lib/provider-options";
import type { MarketCode } from "@/types/market";

export function ProviderPartnerCard({
  partner,
  location,
  marketCode,
  href,
  ctaLabel,
}: {
  partner: ProviderPartner;
  location: string;
  marketCode: MarketCode;
  href?: string;
  ctaLabel?: string;
}) {
  const treatmentTags = partner.treatments.filter((slug) => slug !== "general").slice(0, 2);
  const goalTags = partner.goals.filter((slug) => slug !== "education-first").slice(0, 2);

  return (
    <div
      className="rounded-xl p-4"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <div>
          <div className="text-sm font-semibold" style={{ color: "#1A3A5C" }}>
            {partner.name}
          </div>
          <div className="text-xs uppercase tracking-[0.14em]" style={{ color: "#3B7A9E" }}>
            {partner.bestFit}
          </div>
        </div>
        <div className="text-xs font-medium" style={{ color: "#5A6577" }}>
          {partner.turnaroundLabel}
        </div>
      </div>
      <p className="text-sm leading-relaxed mb-3" style={{ color: "#1C2028" }}>
        {partner.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        <span
          className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
          style={{ backgroundColor: "#EFF6FF", color: "#1D4ED8" }}
        >
          {humanizeProviderIntakeMode(partner.intakeMode)}
        </span>
        {treatmentTags.map((slug) => (
          <span
            key={slug}
            className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
            style={{ backgroundColor: "#F8FAFC", color: "#1A3A5C", border: "1px solid #D0D7E2" }}
          >
            {formatProviderSlug(slug)}
          </span>
        ))}
        {goalTags.map((slug) => (
          <span
            key={slug}
            className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
            style={{ backgroundColor: "#F0FDF4", color: "#166534" }}
          >
            {formatProviderSlug(slug)}
          </span>
        ))}
      </div>
      <Link
        href={href ?? `/providers/${partner.slug}`}
        onClick={() => {
          trackCTAClick("provider_partner_followup", `${location}_${partner.slug}`);
          trackProviderPartnerSelect(marketCode, partner.slug, location);
        }}
        className="inline-flex items-center text-sm font-semibold"
        style={{ color: "#1A3A5C" }}
      >
        {ctaLabel ?? partner.nextStepLabel} &rarr;
      </Link>
    </div>
  );
}
