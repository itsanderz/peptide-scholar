import Link from "next/link";
import { EvidenceBadge } from "./EvidenceBadge";
import { LegalStatusBadge } from "./LegalStatusBadge";

interface PeptideSidebarProps {
  name: string;
  type: string;
  aminoAcidCount: number | null;
  category: string;
  evidenceLevel: "A" | "B" | "C" | "D";
  fdaStatus: "approved" | "not-approved" | "cosmetic" | "discontinued";
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
    <section className="pd-side-section">
      <p className="pd-side-lbl">{title}</p>
      {children}
    </section>
  );
}

function InfoValue({ children }: { children: React.ReactNode }) {
  return <p className="pd-rel-name" style={{ textTransform: "none" }}>{children}</p>;
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
    <aside className="pd-side-card">
      <h2 className="pd-side-title">Quick Facts: {name}</h2>

      <SidebarSection title="Type">
        <InfoValue>{type}</InfoValue>
      </SidebarSection>

      {aminoAcidCount !== null && (
        <SidebarSection title="Amino acids">
          <InfoValue>{aminoAcidCount}</InfoValue>
        </SidebarSection>
      )}

      <SidebarSection title="Category">
        <InfoValue>{category}</InfoValue>
      </SidebarSection>

      <SidebarSection title="Evidence level">
        <EvidenceBadge level={evidenceLevel} />
      </SidebarSection>

      <SidebarSection title="Legal status">
        <LegalStatusBadge
          fdaStatus={fdaStatus}
          prescriptionRequired={prescriptionRequired}
          wadaBanned={wadaBanned}
          controlledSubstance={controlledSubstance}
        />
      </SidebarSection>

      {fdaApprovedFor && (
        <SidebarSection title="FDA approved for">
          <p className="pd-research-finding">{fdaApprovedFor}</p>
        </SidebarSection>
      )}

      {relatedPeptides.length > 0 && (
        <SidebarSection title="Related peptides">
          <ul className="pd-related">
            {relatedPeptides.map((p) => (
              <li key={p.slug}>
                <Link href={`/peptides/${p.slug}`} className="pd-rel-card">
                  <span className="pd-rel-name">{p.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </SidebarSection>
      )}

      {comparisonSlugs.length > 0 && (
        <SidebarSection title="Compare">
          <ul className="pd-related">
            {comparisonSlugs.map((c) => (
              <li key={c.slug}>
                <Link href={`/compare/${c.slug}`} className="pd-rel-card">
                  <span className="pd-rel-name">{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </SidebarSection>
      )}
    </aside>
  );
}
