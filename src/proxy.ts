import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, isValidLocale } from "@/lib/i18n";

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

  // Skip static assets, API routes, _next, sitemap, robots
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname === "/robots.txt" ||
    pathname.startsWith("/sitemap") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Block bots first
  const ua = request.headers.get("user-agent") ?? "";
  const isBlocked = BLOCKED_BOTS.some((bot) =>
    ua.toLowerCase().includes(bot.toLowerCase())
  );
  if (isBlocked) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // i18n logic
  const segments = pathname.split("/");
  const maybeLocale = segments[1];

  if (isValidLocale(maybeLocale)) {
    const response = NextResponse.next();
    response.headers.set("x-locale", maybeLocale);
    return response;
  }

  // No locale prefix -> rewrite to /en/... internally
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  const response = NextResponse.rewrite(url);
  response.headers.set("x-locale", DEFAULT_LOCALE);
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon\\.ico|robots\\.txt|sitemap).*)"],
};