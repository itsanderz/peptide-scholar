"use client";

import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import type { Market } from "@/types/market";
import { getDefaultSite, type SiteDefinition } from "@/lib/site-config";

interface PlannedSiteLandingProps {
  market: Market;
  site: SiteDefinition;
}

export function PlannedSiteLanding({ market, site }: PlannedSiteLandingProps) {
  const mainSite = getDefaultSite();
  const audienceLabel =
    site.contentAudience === "veterinary"
      ? "veterinary teams and pet owners"
      : "research and data-focused users";

  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div
          className="overflow-hidden rounded-3xl border shadow-sm"
          style={{
            borderColor: "rgba(15, 23, 42, 0.08)",
            background: `linear-gradient(135deg, ${site.theme.colors.primary} 0%, ${site.theme.colors.primaryDark} 100%)`,
          }}
        >
          <div className="grid gap-10 px-6 py-10 text-white sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-14">
            <div>
              <div
                className="mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.16)",
                }}
              >
                Planned Site Variant
              </div>
              <h1
                className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl"
                style={{ fontFamily: "var(--font-libre-franklin)" }}
              >
                {site.name}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/82">
                {site.description}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">
                This host is reserved for a dedicated experience for {audienceLabel}. Until that launches,
                PeptideScholar keeps this subdomain intentionally limited so it does not mix human-focused
                content with a future specialist product.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={mainSite.domain}
                  className="inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: site.theme.colors.accent,
                    color: site.theme.colors.primaryDark,
                  }}
                >
                  Return To Main Site
                </Link>
                <Link
                  href={`${mainSite.domain}/contact`}
                  className="inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  style={{
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  Contact About Partnerships
                </Link>
              </div>
            </div>

            <div
              className="rounded-2xl border p-6"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                borderColor: "rgba(255,255,255,0.14)",
              }}
            >
              <h2 className="text-lg font-semibold">What Happens Next</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-white/80">
                <li>Dedicated information architecture instead of reusing the human site.</li>
                <li>Purpose-built content review and compliance rules for this variant.</li>
                <li>Market-specific rollout logic starting with {market.name} readiness.</li>
              </ul>
              <div
                className="mt-6 rounded-xl border px-4 py-4 text-sm leading-6"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.12)",
                }}
              >
                <p className="font-semibold text-white">Validation Status</p>
                <p className="mt-2 text-white/74">
                  This variant is intentionally staged and set to noindex until its own content model,
                  review workflow, and launch criteria are complete.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <EmailCapture
            headline={`Join The ${site.shortName} Launch List`}
            description={`Get launch updates for ${site.name}. Current market context: ${market.name}.`}
            buttonText="Join Waitlist"
            signupLocation={`${site.key}-landing`}
            marketCode={market.code}
            offerSlug={`${site.key}-site-waitlist`}
          />
        </div>
      </div>
    </section>
  );
}
