import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "PeptideScholar — The Evidence-Based Peptide Reference";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
          background: "linear-gradient(135deg, #1A3A5C 0%, #0F2640 100%)",
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
              backgroundColor: "#3B7A9E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            PS
          </div>
          <span style={{ color: "#FFFFFF", fontSize: "48px", fontWeight: 700 }}>
            PeptideScholar
          </span>
        </div>
        <div
          style={{
            color: "#D4553A",
            fontSize: "28px",
            fontWeight: 600,
            marginBottom: "32px",
          }}
        >
          The Evidence-Based Peptide Reference
        </div>
        <div
          style={{
            display: "flex",
            gap: "32px",
            color: "#94A3B8",
            fontSize: "20px",
          }}
        >
          <span>25 Peptides</span>
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
          Every claim cited from PubMed — Free forever
        </div>
      </div>
    ),
    { ...size }
  );
}
