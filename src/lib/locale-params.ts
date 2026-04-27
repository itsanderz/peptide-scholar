import { LOCALES, DEFAULT_LOCALE, type Locale } from "./i18n";

/**
 * Locales to pre-render at build time.
 * Other locales are generated on-demand via ISR.
 */
export const BUILD_LOCALES: Locale[] = ["en", "es"];

/**
 * NOTE: dynamicParams and revalidate must be literal values in route files.
 * Copy these values directly into [locale]/layout.tsx:
 *   export const dynamicParams = true;
 *   export const revalidate = 604800;
 * Next.js cannot statically analyze imported/aliased config exports.
 */

/**
 * Wraps an array of params with locale variants for generateStaticParams.
 * Only pre-renders BUILD_LOCALES at build time; other locales use ISR.
 */
export function withLocaleParams<T extends Record<string, string>>(
  params: T[]
): (T & { locale: string })[] {
  return BUILD_LOCALES.flatMap((locale) =>
    params.map((p) => ({ ...p, locale }))
  );
}

/**
 * Returns locale-only params for layouts/pages that only need the locale segment.
 */
export function localeParams(): { locale: string }[] {
  return BUILD_LOCALES.map((locale) => ({ locale }));
}

/**
 * Generates hreflang alternates for metadata.
 * English pages use clean URLs (no prefix), other locales get /{locale}/path.
 */
export function localeAlternates(baseDomain: string, path: string, currentLocale: string) {
  const defaultLocale = DEFAULT_LOCALE;
  const defaultUrl = `${baseDomain}${path}`;
  return {
    canonical:
      currentLocale === defaultLocale ? defaultUrl : `${baseDomain}/${currentLocale}${path}`,
    languages: {
      "x-default": defaultUrl,
      ...Object.fromEntries(
        LOCALES.map((l) => [
          l,
          l === defaultLocale ? defaultUrl : `${baseDomain}/${l}${path}`,
        ])
      ),
    },
  };
}
