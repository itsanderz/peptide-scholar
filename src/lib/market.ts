import { DEFAULT_MARKET_CODE, getMarketByCode, marketMap } from "@/data/markets";
import type { Locale } from "@/lib/i18n";
import type { Market, MarketCode } from "@/types/market";

const MARKET_CODES = new Set<MarketCode>(Object.keys(marketMap) as MarketCode[]);

export const DEFAULT_MARKET = DEFAULT_MARKET_CODE;
export const MARKET_COOKIE_NAME = "ps_market";

export function isMarketCode(value: string | null | undefined): value is MarketCode {
  return value !== null && value !== undefined && MARKET_CODES.has(value as MarketCode);
}

export function getDefaultMarket(): Market {
  return marketMap[DEFAULT_MARKET];
}

export function resolveMarketCode(value?: string | null): MarketCode {
  return isMarketCode(value) ? value : DEFAULT_MARKET;
}

export function resolveMarket(value?: string | null): Market {
  return getMarketByCode(resolveMarketCode(value)) ?? getDefaultMarket();
}

export function getMarketPrimaryLocale(marketCode: MarketCode): string {
  return resolveMarket(marketCode).defaultLocale;
}

export function getMarketLocales(marketCode: MarketCode): string[] {
  return resolveMarket(marketCode).localeSupport.map((entry) => entry.locale);
}

export function marketSupportsLocale(marketCode: MarketCode, locale: Locale | string): boolean {
  return resolveMarket(marketCode).localeSupport.some((entry) => entry.locale === locale);
}

export function isMarketIndexable(marketCode: MarketCode): boolean {
  return resolveMarket(marketCode).contentPolicy.autoIndexDefault;
}

export function isMarketLocaleIndexable(marketCode: MarketCode, locale: Locale | string): boolean {
  const market = resolveMarket(marketCode);
  const localeConfig = market.localeSupport.find((entry) => entry.locale === locale);
  return Boolean(market.contentPolicy.localePairIndexable && localeConfig?.isIndexable);
}

export function canShowProviderReferrals(marketCode: MarketCode): boolean {
  return resolveMarket(marketCode).providerRules.providerReferralsEnabled;
}

export function getMarketFallbackCta(marketCode: MarketCode) {
  return resolveMarket(marketCode).providerRules.unsupportedFallbackCta;
}

export function getMarketPathPrefix(marketCode: MarketCode): string {
  return marketCode === DEFAULT_MARKET ? "" : `/${marketCode}`;
}

export function buildMarketPath(marketCode: MarketCode, pathname: string): string {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${getMarketPathPrefix(marketCode)}${normalizedPath}`.replace(/\/{2,}/g, "/");
}

export function stripMarketPrefix(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return "/";
  }

  if (isMarketCode(segments[0])) {
    const remaining = segments.slice(1);
    return remaining.length === 0 ? "/" : `/${remaining.join("/")}`;
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function resolveMarketFromPathname(pathname: string): Market {
  const segments = pathname.split("/").filter(Boolean);
  return resolveMarket(segments[0]);
}
