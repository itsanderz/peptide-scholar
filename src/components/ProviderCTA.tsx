"use client";

import Link from "next/link";
import type { FDAStatus } from "@/data/peptides";
import {
  trackCTAClick,
  trackProviderConversion,
  trackProviderMatcherStart,
} from "@/lib/analytics";
import {
  canShowProviderReferrals,
  getMarketFallbackCta,
} from "@/lib/market";
import { getBestLivePartnerForPeptide } from "@/lib/provider-routing";
import type { MarketCode } from "@/types/market";

interface ProviderCTAProps {
  peptideName: string;
  fdaStatus: FDAStatus;
  marketCode?: MarketCode;
}

function getCtaConfig(marketCode: MarketCode, fdaStatus: FDAStatus, peptideName: string) {
  const providerEnabled = canShowProviderReferrals(marketCode);
  const fallback = getMarketFallbackCta(marketCode);
  const treatmentSlug = peptideName.toLowerCase().replace(/\s+/g, "-");

  const livePartner = providerEnabled && (fdaStatus === "approved" || fdaStatus === "discontinued")
    ? getBestLivePartnerForPeptide(treatmentSlug, marketCode)
    : null;

  if (livePartner && livePartner.externalUrl) {
    return {
      href: livePartner.externalUrl,
      label: `Start Visit at ${livePartner.name}`,
      subcopy: `Get evaluated by a board-certified clinician via ${livePartner.name}. ${livePartner.turnaroundLabel.toLowerCase()}.`,
      isExternal: true,
      onClick: () => {
        trackCTAClick("provider_live_partner_direct", "provider_cta");
        trackProviderConversion(marketCode, livePartner.slug, treatmentSlug, livePartner.commissionType);
      },
    };
  }

  if (providerEnabled && (fdaStatus === "approved" || fdaStatus === "discontinued")) {
    return {
      href: `/providers?treatment=${encodeURIComponent(treatmentSlug)}`,
      label: "Find a Prescribing Provider",
      subcopy: "Telehealth consultations available in most states.",
      isExternal: false,
      onClick: () => {
        trackCTAClick("provider_referral_primary", "provider_cta");
        trackProviderMatcherStart(marketCode, "provider_cta", treatmentSlug);
      },
    };
  }

  if (fallback === "app-waitlist") {
    return {
      href: "/tools",
      label: "Explore Free Tools",
      subcopy: "Provider matching is not live in this market yet.",
      isExternal: false,
      onClick: () => trackCTAClick("provider_fallback_tools", "provider_cta"),
    };
  }

  if (fallback === "email-capture") {
    return {
      href: "/guide",
      label: "Get the Provider Checklist",
      subcopy: "Start with the evidence and provider checklist while routing is offline.",
      isExternal: false,
      onClick: () => trackCTAClick("provider_fallback_checklist", "provider_cta"),
    };
  }

  return {
    href: "/tools/peptide-finder",
    label: "Use the Peptide Finder",
    subcopy: "Use the guided tool to narrow the safest next step.",
    isExternal: false,
    onClick: () => trackCTAClick("provider_fallback_tool_handoff", "provider_cta"),
  };
}

function PulseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function CtaButton({
  cta,
}: {
  cta: ReturnType<typeof getCtaConfig>;
}) {
  if (cta.isExternal) {
    return (
      <a
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={cta.onClick}
        className="btn-dark"
      >
        <PulseIcon />
        {cta.label}
      </a>
    );
  }

  return (
    <Link href={cta.href} onClick={cta.onClick} className="btn-dark">
      <PulseIcon />
      {cta.label}
    </Link>
  );
}

export function ProviderCTA({
  peptideName,
  fdaStatus,
  marketCode = "us",
}: ProviderCTAProps) {
  const cta = getCtaConfig(marketCode, fdaStatus, peptideName);

  if (fdaStatus === "approved" || fdaStatus === "discontinued") {
    const isDiscontinued = fdaStatus === "discontinued";
    return (
      <div data-affiliate="provider-cta" className="provider-cta">
        <h3 className="provider-title">
          {isDiscontinued
            ? `Looking for alternatives to ${peptideName}?`
            : `Discuss ${peptideName} with a doctor`}
        </h3>
        <p className="provider-copy">
          {isDiscontinued
            ? `${peptideName} has been discontinued. Licensed telehealth providers can discuss alternative therapies that may be appropriate for you.`
            : `${peptideName} is FDA-approved and available by prescription. Licensed telehealth providers can evaluate if it's right for you.`}
        </p>

        <CtaButton cta={cta} />

        <p className="provider-note">{cta.subcopy}</p>

        <div className="provider-badges">
          {[
            isDiscontinued ? "Discontinued - alternatives available" : "FDA approved",
            "Board-certified doctors",
            "Prescription if appropriate",
          ].map((badge) => (
            <span key={badge} className="legal-badge is-approved">
              {badge}
            </span>
          ))}
        </div>

        <p className="provider-note">
          PeptideScholar may receive compensation from provider referrals. This does not influence
          our editorial content.
        </p>
      </div>
    );
  }

  if (fdaStatus === "cosmetic") {
    return (
      <div data-affiliate="provider-cta" className="provider-cta is-blue">
        <h3 className="provider-title">Interested in {peptideName} products?</h3>
        <p className="provider-copy">
          {peptideName} is available in cosmetic formulations. Look for products with clinical-grade
          copper peptide concentrations.
        </p>
        <Link href={cta.href} onClick={cta.onClick} className="btn-dark">
          {cta.label}
        </Link>
        <p className="provider-note">
          PeptideScholar may receive compensation from product referrals. This does not influence
          our editorial content.
        </p>
      </div>
    );
  }

  return (
    <div className="provider-cta is-muted">
      <h3 className="provider-title">Considering peptide research?</h3>
      <p className="provider-copy">
        {peptideName} is not FDA-approved. Always consult a licensed healthcare provider before
        considering any peptide.
      </p>
      <Link href={cta.href} onClick={cta.onClick} className="btn-dark">
        {cta.label}
      </Link>
      <p className="provider-note">{cta.subcopy}</p>
      <div className="provider-badges">
        <span className="legal-badge is-alert">Always consult a professional</span>
      </div>
    </div>
  );
}
