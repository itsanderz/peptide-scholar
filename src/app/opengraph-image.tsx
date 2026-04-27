import { ImageResponse } from "next/og";
import { getRequestSite } from "@/lib/request-site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const alt = "PeptideScholar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const site = await getRequestSite();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: `linear-gradient(135deg, ${site.theme.colors.primary} 0%, ${site.theme.colors.primaryDark} 100%)`,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "12px",
              backgroundColor: site.theme.colors.secondary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            {site.shortName}
          </div>
          <span style={{ color: "#FFFFFF", fontSize: "48px", fontWeight: 700 }}>
            {site.name}
          </span>
        </div>
        <div
          style={{
            color: site.theme.colors.accent,
            fontSize: "28px",
            fontWeight: 600,
            marginBottom: "32px",
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            display: "flex",
            gap: "32px",
            color: "#94A3B8",
            fontSize: "20px",
          }}
        >
          <span>51 Peptides</span>
          <span>41+ Comparisons</span>
          <span>50 State Guides</span>
          <span>14 Languages</span>
        </div>
        <div
          style={{
            marginTop: "24px",
            color: "#5EEAD4",
            fontSize: "16px",
          }}
        >
          {site.launchState === "live"
            ? "Every claim cited from PubMed - Free forever"
            : "Planned site variant - not yet launched"}
        </div>
      </div>
    ),
    { ...size }
  );
}
