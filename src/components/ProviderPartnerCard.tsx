"use client";

import Link from "next/link";
import type { ProviderPartner } from "@/data/provider-partners";
import {
  trackCTAClick,
  trackProviderConversion,
  trackProviderPartnerSelect,
} from "@/lib/analytics";
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
  treatmentSlug,
}: {
  partner: ProviderPartner;
  location: string;
  marketCode: MarketCode;
  href?: string;
  ctaLabel?: string;
  treatmentSlug?: string;
}) {
  const treatmentTags = partner.treatments.filter((slug) => slug !== "general").slice(0, 2);
  const goalTags = partner.goals.filter((slug) => slug !== "education-first").slice(0, 2);
  const isLivePartner = partner.partnerStatus === "live-partner";

  const handleLivePartnerClick = () => {
    trackCTAClick("provider_partner_conversion", `${location}_${partner.slug}`);
    trackProviderPartnerSelect(marketCode, partner.slug, location);
    if (treatmentSlug) {
      trackProviderConversion(marketCode, partner.slug, treatmentSlug, partner.commissionType);
    }
  };

  return (
    <div
      className="provider-partner-card rounded-xl p-4"
      style={{
        backgroundColor: "#FFFFFF",
        border: isLivePartner ? "2px solid #0D9488" : "1px solid #D0D7E2",
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold" style={{ color: "#1A3A5C" }}>
            {partner.name}
          </div>
          {isLivePartner && (
            <span
              className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: "#ECFDF5", color: "#065F46", border: "1px solid #A7F3D0" }}
            >
              Partner
            </span>
          )}
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
      {isLivePartner && partner.externalUrl ? (
        <a
          href={partner.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLivePartnerClick}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          style={{
            backgroundColor: "#0D9488",
            color: "#FFFFFF",
            textDecoration: "none",
          }}
        >
          {ctaLabel ?? partner.nextStepLabel}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
      ) : (
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
      )}
    </div>
  );
}
