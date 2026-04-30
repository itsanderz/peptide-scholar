import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, isValidLocale } from "@/lib/i18n";
import { MARKET_COOKIE_NAME, resolveMarketCode } from "@/lib/market";
import { getSiteByKey, resolveSiteKeyFromHost } from "@/lib/site-config";

const BLOCKED_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "CCBot",
  "anthropic-ai",
  "Claude-Web",
  "cohere-ai",
  "FacebookBot",
  "Bytespider",
  "PetalBot",
  "Amazonbot",
  "SemrushBot",
  "AhrefsBot",
  "MJ12bot",
  "DotBot",
];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const marketCode = resolveMarketCode(request.cookies.get(MARKET_COOKIE_NAME)?.value);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  const siteKey = resolveSiteKeyFromHost(
    request.headers.get("x-forwarded-host") || request.headers.get("host")
  );
  const site = getSiteByKey(siteKey);

  const applySiteResponseHeaders = (response: NextResponse) => {
    if (site.noindexByDefault) {
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
    }
    return response;
  };

  // Skip static assets, API routes, _next, sitemap, robots
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/opengraph-image") ||
    pathname.startsWith("/twitter-image") ||
    pathname === "/robots.txt" ||
    pathname.startsWith("/sitemap") ||
    pathname.includes(".")
  ) {
    return applySiteResponseHeaders(NextResponse.next());
  }

  // Block bots first
  const ua = request.headers.get("user-agent") ?? "";
  const isBlocked = BLOCKED_BOTS.some((bot) =>
    ua.toLowerCase().includes(bot.toLowerCase())
  );
  if (isBlocked) {
    return applySiteResponseHeaders(new NextResponse("Forbidden", { status: 403 }));
  }

  // i18n logic
  const segments = pathname.split("/");
  const maybeLocale = segments[1];

  if (isValidLocale(maybeLocale)) {
    requestHeaders.set("x-locale", maybeLocale);
    requestHeaders.set("x-market", marketCode);
    requestHeaders.set("x-site", siteKey);
    if (site.launchState !== "live" && pathname !== `/${maybeLocale}/site-variant`) {
      const url = request.nextUrl.clone();
      url.pathname = `/${maybeLocale}/site-variant`;
      return applySiteResponseHeaders(NextResponse.rewrite(url, {
        request: {
          headers: requestHeaders,
        },
      }));
    }
    return applySiteResponseHeaders(NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    }));
  }

  // No locale prefix -> rewrite to /en/... internally
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  requestHeaders.set("x-locale", DEFAULT_LOCALE);
  requestHeaders.set("x-market", marketCode);
  requestHeaders.set("x-site", siteKey);
  if (site.launchState !== "live") {
    url.pathname = `/${DEFAULT_LOCALE}/site-variant`;
  }
  return applySiteResponseHeaders(NextResponse.rewrite(url, {
    request: {
      headers: requestHeaders,
    },
  }));
}

export const config = {
  matcher: ["/((?!_next|api|favicon\\.ico|robots\\.txt|sitemap|opengraph-image|twitter-image).*)"],
};
