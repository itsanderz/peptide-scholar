import { headers } from "next/headers";
import { getSiteByKey, resolveSiteFromHost, type SiteKey } from "@/lib/site-config";

export async function getRequestHost() {
  const headersList = await headers();
  return (
    headersList.get("x-forwarded-host") ||
    headersList.get("host") ||
    headersList.get("x-host") ||
    null
  );
}

export async function getRequestSiteKey(): Promise<SiteKey> {
  const headersList = await headers();
  const headerSite = headersList.get("x-site");
  if (headerSite === "main" || headerSite === "pets" || headerSite === "labs" || headerSite === "stack") {
    return headerSite;
  }

  return resolveSiteFromHost(await getRequestHost()).key;
}

export async function getRequestSite() {
  return getSiteByKey(await getRequestSiteKey());
}
