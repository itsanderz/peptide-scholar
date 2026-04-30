import React from "react";
import Link from "next/link";

const C = {
  navy: "#1A2B4A",
  teal: "#0891B2",
  gold: "#D4A843",
  muted: "#64748B",
  success: "#16A34A",
  amber: "#D97706",
};

interface ProviderMatch {
  name: string;
  url: string;
  peptides: string[];
  badge?: string;
}

const providerMatches: Record<string, ProviderMatch[]> = {
  "sexual-dysfunction": [
    { name: "Ro Body", url: "https://ro.co/", peptides: ["Bremelanotide"], badge: "Sexual Health" },
  ],
  "fat-loss": [
    { name: "Henry Meds", url: "https://henrymeds.com/", peptides: ["Semaglutide", "Tirzepatide"], badge: "GLP-1" },
    { name: "Ro Body", url: "https://ro.co/", peptides: ["Semaglutide", "Tirzepatide"], badge: "Weight Loss" },
  ],
  "muscle-loss": [
    { name: "Henry Meds", url: "https://henrymeds.com/", peptides: ["Tesamorelin"], badge: "GH" },
  ],
  "low-testosterone": [
    { name: "Ro Body", url: "https://ro.co/", peptides: ["Gonadorelin"], badge: "HRT" },
  ],
  "gut-issues": [
    { name: "Henry Meds", url: "https://henrymeds.com/", peptides: ["Teduglutide"], badge: "Specialty" },
  ],
};

export function StackProviderMatcher({ symptomId, locale }: { symptomId: string; locale: string }) {
  const matches = providerMatches[symptomId];
  if (!matches || matches.length === 0) return null;

  return (
    <div className="rounded-xl border p-4 mt-4" style={{ backgroundColor: "#F0F9FF", borderColor: "#BAE6FD" }}>
      <div className="flex items-center gap-2 mb-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
        <h4 className="text-sm font-bold" style={{ color: C.navy }}>
          Telehealth Providers for This Concern
        </h4>
      </div>
      <p className="text-xs mb-3" style={{ color: C.muted }}>
        These providers offer FDA-approved peptide therapies related to this symptom. 
        No referral needed — consult online.
      </p>
      <div className="space-y-2">
        {matches.map((provider) => (
          <div key={provider.name} className="flex items-center justify-between rounded-lg border p-3" style={{ backgroundColor: "#fff", borderColor: "#E2E8F0" }}>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold" style={{ color: C.navy }}>{provider.name}</span>
                {provider.badge && (
                  <span className="rounded-full px-2 py-0.5 text-xs font-semibold" style={{ backgroundColor: "#F0FDF4", color: C.success, border: "1px solid #BBF7D0" }}>
                    {provider.badge}
                  </span>
                )}
              </div>
              <p className="text-xs" style={{ color: C.muted }}>
                Offers: {provider.peptides.join(", ")}
              </p>
            </div>
            <a
              href={provider.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:opacity-90 shrink-0"
              style={{ backgroundColor: C.teal }}
              onClick={() => {
                if (typeof window !== "undefined" && "gtag" in window) {
                  (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.("event", "provider_stack_matcher_click", {
                    provider: provider.name,
                    symptom: symptomId,
                  });
                }
              }}
            >
              Visit Provider
            </a>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs" style={{ color: C.muted }}>
        We may receive compensation if you become a patient. 
        <Link href={`/${locale === "en" ? "" : locale + "/"}disclaimer`} className="underline" style={{ color: C.teal }}>See our disclaimer</Link>.
      </p>
    </div>
  );
}
