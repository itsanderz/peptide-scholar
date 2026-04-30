import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbNav, PageTracker } from "@/components";
import { peptides } from "@/data/peptides";
import { generateSEO } from "@/components/SEOHead";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = generateSEO({
  title: "WADA Banned Peptides Monitor | PeptideScholar Labs",
  description:
    "Complete list of WADA-prohibited peptides with 2026 Prohibited List section citations, sport categories, and regulatory status. Updated reference tool for researchers and athletes.",
  canonical: `${siteConfig.domain}/labs/wada-monitor`,
  siteName: siteConfig.name,
});

const C = {
  navy: "#1A3A5C",
  teal: "#3B7A9E",
  accent: "#D4553A",
  success: "#2B8A5E",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
  muted: "#5A6577",
} as const;

export default function WadaMonitorPage() {
  const banned = peptides.filter((p) => p.wadaBanned);
  const notBanned = peptides.filter((p) => !p.wadaBanned && p.fdaStatus !== "cosmetic");
  const cosmetic = peptides.filter((p) => p.fdaStatus === "cosmetic");

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <PageTracker event="market_page_view" params={{ page_family: "labs_wada_monitor", page_slug: "wada-monitor", market: "us" }} />

      <BreadcrumbNav
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Labs", href: "/labs" },
          { label: "WADA Monitor", href: "/labs/wada-monitor" },
        ]}
      />

      {/* Header */}
      <div className="mt-6 mb-8">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4"
          style={{ backgroundColor: "#F8FAFC", borderColor: C.border, color: C.navy }}
        >
          <span>Labs</span>
          <span style={{ color: C.accent }}>Reference Tool</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: C.navy }}>
          WADA Banned Peptides Monitor
        </h1>
        <p className="text-base leading-relaxed max-w-3xl" style={{ color: C.muted }}>
          Comprehensive reference of WADA-prohibited peptides based on the 2026 Prohibited List. This
          monitor tracks all peptides flagged by the World Anti-Doping Agency as banned at all times
          (S2 category) with section citations and evidence levels.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA" }}>
          <div className="text-2xl font-bold" style={{ color: C.accent }}>{banned.length}</div>
          <div className="text-xs font-semibold uppercase tracking-wider mt-1" style={{ color: C.accent }}>
            WADA Banned
          </div>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0" }}>
          <div className="text-2xl font-bold" style={{ color: C.success }}>{notBanned.length}</div>
          <div className="text-xs font-semibold uppercase tracking-wider mt-1" style={{ color: C.success }}>
            Not Banned
          </div>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "#FAF5FF", border: "1px solid #E9D5FF" }}>
          <div className="text-2xl font-bold" style={{ color: "#7C3AED" }}>{cosmetic.length}</div>
          <div className="text-xs font-semibold uppercase tracking-wider mt-1" style={{ color: "#7C3AED" }}>
            Cosmetic Only
          </div>
        </div>
      </div>

      {/* Banned Table */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4" style={{ color: C.navy }}>
          Banned Peptides ({banned.length})
        </h2>
        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: C.border }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: C.bg }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: C.navy }}>Peptide</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: C.navy }}>Category</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: C.navy }}>Evidence</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: C.navy }}>WADA Section</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: C.navy }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {banned.map((p) => (
                <tr key={p.slug} className="border-t" style={{ borderColor: C.border }}>
                  <td className="px-4 py-3">
                    <Link href={`/peptides/${p.slug}`} className="font-semibold hover:underline" style={{ color: C.navy }}>
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3" style={{ color: C.muted }}>{p.categoryName}</td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
                      style={{
                        backgroundColor: p.evidenceLevel === "A" ? "#F0FDF4" : p.evidenceLevel === "B" ? "#F0F9FF" : "#F8FAFC",
                        color: p.evidenceLevel === "A" ? C.success : p.evidenceLevel === "B" ? C.teal : C.muted,
                        border: `1px solid ${p.evidenceLevel === "A" ? "#BBF7D0" : p.evidenceLevel === "B" ? "#BAE6FD" : C.border}`,
                      }}
                    >
                      Grade {p.evidenceLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: C.muted }}>
                    S2.2 · Peptide Hormones
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
                      style={{ backgroundColor: "#FEF2F2", color: C.accent, border: "1px solid #FECACA" }}
                    >
                      Banned
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Not Banned Table */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4" style={{ color: C.navy }}>
          Not Banned ({notBanned.length})
        </h2>
        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: C.border }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: C.bg }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: C.navy }}>Peptide</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: C.navy }}>Category</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: C.navy }}>FDA Status</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: C.navy }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {notBanned.map((p) => (
                <tr key={p.slug} className="border-t" style={{ borderColor: C.border }}>
                  <td className="px-4 py-3">
                    <Link href={`/peptides/${p.slug}`} className="font-semibold hover:underline" style={{ color: C.navy }}>
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3" style={{ color: C.muted }}>{p.categoryName}</td>
                  <td className="px-4 py-3" style={{ color: C.muted }}>
                    {p.fdaStatus === "approved" ? "FDA Approved" : p.fdaStatus === "not-approved" ? "Not Approved" : p.fdaStatus}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
                      style={{ backgroundColor: "#F0FDF4", color: C.success, border: "1px solid #BBF7D0" }}
                    >
                      Not Banned
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Citation */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
      >
        <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: C.teal }}>
          Source
        </div>
        <p className="text-sm leading-relaxed" style={{ color: C.navy }}>
          <strong>World Anti-Doping Agency (WADA).</strong>{" "}
          <em>2026 Prohibited List.</em>{" "}
          International Standard. Effective 1 January 2026. Section S2: Peptide Hormones, Growth Factors,
          Related Substances and Mimetics. All peptides listed above are classified under S2.2 (peptide
          hormones and growth factors) unless otherwise noted.
        </p>
        <a
          href="https://www.wada-ama.org/en/resources/science-medicine/prohibited-list"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold hover:underline mt-2 inline-block"
          style={{ color: C.teal }}
        >
          View official WADA Prohibited List →
        </a>
      </div>

      {/* Disclaimer */}
      <div
        className="rounded-xl p-4 text-sm leading-relaxed"
        style={{ backgroundColor: "#FFF7ED", border: "1px solid #FDBA74", color: "#9A3412" }}
      >
        <strong>Research reference only.</strong> WADA regulations change annually. Always verify current
        status directly with WADA and your national anti-doping organization before competition. This tool
        does not constitute legal or regulatory advice. Athletes subject to anti-doping testing should
        consult a sports medicine physician and their governing body.
      </div>
    </div>
  );
}
