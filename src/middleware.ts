import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n";

// Paths that live at the root and should never get a locale prefix injected
const ROOT_PATHS = new Set(["markets", "api"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already has a locale prefix — leave it alone
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  // Root-level paths that are not locale-aware
  const firstSegment = pathname.split("/")[1];
  if (ROOT_PATHS.has(firstSegment)) return NextResponse.next();

  // Rewrite to default locale (en) so [locale]/... routes resolve correctly
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip _next internals and files with extensions (images, fonts, etc.)
  matcher: ["/((?!_next|.*\\..*).*)"],
};
