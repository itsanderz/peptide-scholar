import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, isValidLocale } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets, API routes, _next, sitemap, robots
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname === "/robots.txt" ||
    pathname.startsWith("/sitemap") ||
    pathname.includes(".")
  ) {
    return;
  }

  const segments = pathname.split("/");
  const maybeLocale = segments[1];

  if (isValidLocale(maybeLocale)) {
    // Valid locale prefix — pass through, set header for root layout
    const response = NextResponse.next();
    response.headers.set("x-locale", maybeLocale);
    return response;
  }

  // No locale prefix -> rewrite to /en/... internally (URL stays clean for English)
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  const response = NextResponse.rewrite(url);
  response.headers.set("x-locale", DEFAULT_LOCALE);
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon\\.ico|robots\\.txt|sitemap).*)"],
};
