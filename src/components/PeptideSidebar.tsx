import Link from "next/link";
import { EvidenceBadge } from "./EvidenceBadge";
import { LegalStatusBadge } from "./LegalStatusBadge";

interface PeptideSidebarProps {
  name: string;
  type: string;
  aminoAcidCount: number | null;
  category: string;
  evidenceLevel: "A" | "B" | "C" | "D";
  fdaStatus: "approved" | "not-approved" | "cosmetic";
  fdaApprovedFor: string | null;
  wadaBanned: boolean;
  controlledSubstance: boolean;
  prescriptionRequired: boolean;
  relatedPeptides: { name: string; slug: string }[];
  comparisonSlugs: { label: string; slug: string }[];
}

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <h4
        style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "var(--color-text-muted, #6b7280)",
          marginBottom: "0.35rem",
          fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
        }}
      >
        {title}
      </h4>
      {children}
    </div>
  );
}

export function PeptideSidebar({
  name,
  type,
  aminoAcidCount,
  category,
  evidenceLevel,
  fdaStatus,
  fdaApprovedFor,
  wadaBanned,
  controlledSubstance,
  prescriptionRequired,
  relatedPeptides,
  comparisonSlugs,
}: PeptideSidebarProps) {
  return (
    <aside
      style={{
        position: "sticky",
        top: "1.5rem",
        border: "1px solid var(--color-border, #e5e7eb)",
        borderRadius: "0.75rem",
        padding: "1.25rem",
        backgroundColor: "var(--color-surface, #ffffff)",
        maxWidth: "320px",
        width: "100%",
      }}
    >
      <h3
        style={{
          fontSize: "1rem",
          fontWeight: 700,
          color: "var(--color-primary, #1A3A5C)",
          marginBottom: "1rem",
          paddingBottom: "0.6rem",
          borderBottom: "1px solid var(--color-border, #e5e7eb)",
          fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
        }}
      >
        Quick Facts: {name}
      </h3>

      <SidebarSection title="Type">
        <p style={{ fontSize: "0.875rem", color: "var(--color-text, #1A3A5C)", margin: 0 }}>
          {type}
        </p>
      </SidebarSection>

      {aminoAcidCount !== null && (
        <SidebarSection title="Amino Acids">
          <p style={{ fontSize: "0.875rem", color: "var(--color-text, #1A3A5C)", margin: 0 }}>
            {aminoAcidCount}
          </p>
        </SidebarSection>
      )}

      <SidebarSection title="Category">
        <p style={{ fontSize: "0.875rem", color: "var(--color-text, #1A3A5C)", margin: 0 }}>
          {category}
        </p>
      </SidebarSection>

      <SidebarSection title="Evidence Level">
        <EvidenceBadge level={evidenceLevel} />
      </SidebarSection>

      <SidebarSection title="Legal Status">
        <LegalStatusBadge
          fdaStatus={fdaStatus}
          prescriptionRequired={prescriptionRequired}
          wadaBanned={wadaBanned}
          controlledSubstance={controlledSubstance}
        />
      </SidebarSection>

      {fdaApprovedFor && (
        <SidebarSection title="FDA Approved For">
          <p style={{ fontSize: "0.85rem", color: "var(--color-text, #1A3A5C)", margin: 0, lineHeight: 1.5 }}>
            {fdaApprovedFor}
          </p>
        </SidebarSection>
      )}

      {relatedPeptides.length > 0 && (
        <SidebarSection title="Related Peptides">
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            {relatedPeptides.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/peptides/${p.slug}`}
                  style={{
                    display: "block",
                    padding: "0.35rem 0",
                    fontSize: "0.85rem",
                    color: "var(--color-secondary, #3B7A9E)",
                    textDecoration: "none",
                    minHeight: "48px",
                    lineHeight: "48px",
                  }}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </SidebarSection>
      )}

      {comparisonSlugs.length > 0 && (
        <SidebarSection title="Compare">
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            {comparisonSlugs.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/compare/${c.slug}`}
                  style={{
                    display: "block",
                    padding: "0.35rem 0",
                    fontSize: "0.85rem",
                    color: "var(--color-secondary, #3B7A9E)",
                    textDecoration: "none",
                    minHeight: "48px",
                    lineHeight: "48px",
                  }}
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </SidebarSection>
      )}
    </aside>
  );
}
