import type { Metadata } from "next";
import { PlannedSiteLanding, PageTracker } from "@/components";
import { getRequestMarket } from "@/lib/request-market";
import { getRequestSite } from "@/lib/request-site";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getRequestSite();

  return {
    title: `${site.name} | Planned Site Variant`,
    description: site.description,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export default async function SiteVariantPage() {
  const market = await getRequestMarket();
  const site = await getRequestSite();

  return (
    <>
      <PageTracker
        event="site_variant_view"
        params={{
          site_key: site.key,
          site_status: site.launchState,
          market_code: market.code,
        }}
      />
      <PlannedSiteLanding market={market} site={site} />
    </>
  );
}
