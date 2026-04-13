"use client";

import Link from "next/link";
import { trackCTAClick, trackProviderMatcherStart } from "@/lib/analytics";
import type { MarketCode } from "@/types/market";

export function ProviderIntentCard({
  marketCode,
  headline,
  description,
  buttonText = "Find a provider",
  location,
  treatmentSlug = "general",
}: {
  marketCode: MarketCode;
  headline: string;
  description: string;
  buttonText?: string;
  location: string;
  treatmentSlug?: string;
}) {
  const href =
    treatmentSlug !== "general"
      ? `/providers?treatment=${encodeURIComponent(treatmentSlug)}`
      : "/providers";

  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: "#ECFDF5", border: "1px solid #A7F3D0" }}
    >
      <h2
        className="text-lg md:text-xl font-bold mb-2"
        style={{ color: "#065F46", fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
      >
        {headline}
      </h2>
      <p className="text-sm leading-relaxed mb-4" style={{ color: "#047857" }}>
        {description}
      </p>
      <Link
        href={href}
        onClick={() => {
          trackCTAClick("provider_intent_card", location);
          trackProviderMatcherStart(marketCode, location, treatmentSlug);
        }}
        className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold"
        style={{ backgroundColor: "#0F766E", color: "#FFFFFF" }}
      >
        {buttonText}
      </Link>
    </div>
  );
}
