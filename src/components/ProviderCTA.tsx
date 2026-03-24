import type { FDAStatus } from "@/data/peptides";

interface ProviderCTAProps {
  peptideName: string;
  fdaStatus: FDAStatus;
  category?: string;
}

export function ProviderCTA({ peptideName, fdaStatus, category }: ProviderCTAProps) {
  if (fdaStatus === "approved") {
    return (
      <div
        data-affiliate="provider-cta"
        className="rounded-xl p-6 mb-8"
        style={{
          backgroundColor: "#ECFDF5",
          border: "2px solid #5EEAD4",
        }}
      >
        <h3
          className="text-lg md:text-xl font-bold mb-2"
          style={{
            color: "#065F46",
            fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
          }}
        >
          Ready to Discuss {peptideName} with a Doctor?
        </h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "#047857" }}>
          {peptideName} is FDA-approved and available by prescription. Licensed telehealth
          providers can evaluate if it&apos;s right for you.
        </p>

        <a
          href="#provider-link"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
          style={{
            backgroundColor: "#0D9488",
            color: "#FFFFFF",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
          Find a Prescribing Provider
        </a>

        <p className="text-xs mt-3 mb-4" style={{ color: "#047857" }}>
          Telehealth consultations available in most states
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {["FDA Approved", "Board-Certified Doctors", "Prescription if Appropriate"].map(
            (badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: "#D1FAE5",
                  color: "#065F46",
                  border: "1px solid #A7F3D0",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {badge}
              </span>
            )
          )}
        </div>

        <p className="text-[11px] leading-snug" style={{ color: "#6B7280" }}>
          PeptideScholar may receive compensation from provider referrals. This does not
          influence our editorial content.
        </p>
      </div>
    );
  }

  if (fdaStatus === "cosmetic") {
    return (
      <div
        data-affiliate="provider-cta"
        className="rounded-xl p-6 mb-8"
        style={{
          backgroundColor: "#EFF6FF",
          border: "1px solid #93C5FD",
        }}
      >
        <h3
          className="text-lg font-bold mb-2"
          style={{
            color: "#1E40AF",
            fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
          }}
        >
          Interested in {peptideName} Products?
        </h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "#1D4ED8" }}>
          {peptideName} is available in cosmetic formulations. Look for products with
          clinical-grade copper peptide concentrations.
        </p>
        <a
          href="#product-link"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
          style={{
            backgroundColor: "#2563EB",
            color: "#FFFFFF",
          }}
        >
          View Recommended Products
        </a>
        <p className="text-[11px] mt-3" style={{ color: "#6B7280" }}>
          PeptideScholar may receive compensation from product referrals. This does not
          influence our editorial content.
        </p>
      </div>
    );
  }

  // not-approved — subdued educational CTA
  return (
    <div
      className="rounded-xl p-6 mb-8"
      style={{
        backgroundColor: "#F0F3F7",
        border: "1px solid #D0D7E2",
      }}
    >
      <h3
        className="text-lg font-bold mb-2"
        style={{
          color: "#1A3A5C",
          fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
        }}
      >
        Considering Peptide Research?
      </h3>
      <p className="text-sm leading-relaxed mb-4" style={{ color: "#475569" }}>
        {peptideName} is not FDA-approved. Always consult a licensed healthcare provider
        before considering any peptide.
      </p>
      <a
        href="#provider-resources"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
        style={{
          backgroundColor: "#3B7A9E",
          color: "#FFFFFF",
        }}
      >
        Learn About Finding a Provider
      </a>
      <div className="mt-3">
        <span
          className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: "#E2E8F0",
            color: "#475569",
            border: "1px solid #CBD5E1",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Always Consult a Professional
        </span>
      </div>
    </div>
  );
}
