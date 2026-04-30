import type { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  siteName: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  robots?: Metadata["robots"];
}

export function generateSEO({
  title,
  description,
  canonical,
  siteName,
  ogImage = "/opengraph-image",
  robots,
}: SEOProps): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: robots ?? { index: true, follow: true },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
