import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://peptidescholar.com";
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Allowed AI search bots (for visibility)
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      // Blocked scrapers
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "ChatGPT-User", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "Claude-Web", disallow: "/" },
      { userAgent: "cohere-ai", disallow: "/" },
      { userAgent: "FacebookBot", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "PetalBot", disallow: "/" },
      { userAgent: "Amazonbot", disallow: "/" },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}