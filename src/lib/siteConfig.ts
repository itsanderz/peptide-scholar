import { getDefaultSite } from "./site-config";

export {
  DEFAULT_SITE_KEY,
  getSiteByKey,
  resolveSiteFromHost,
  resolveSiteKeyFromHost,
  siteDefinitions,
  type SiteDefinition,
  type SiteKey,
} from "./site-config";

export const siteConfig = getDefaultSite();
