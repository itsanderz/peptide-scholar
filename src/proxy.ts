import { NextRequest, NextResponse } from "next/server";

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
  const ua = request.headers.get("user-agent") ?? "";

  const isBlocked = BLOCKED_BOTS.some((bot) =>
    ua.toLowerCase().includes(bot.toLowerCase())
  );

  if (isBlocked) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/(.*)",
};