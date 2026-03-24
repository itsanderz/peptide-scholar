interface ResearchCardProps {
  pmid: string;
  title: string;
  year: number;
  journal: string;
  finding: string;
  evidenceType: "RCT" | "Cohort" | "Case Series" | "Animal" | "In Vitro" | "Review";
}

const EVIDENCE_TYPE_CONFIG = {
  RCT: { bg: "#dcfce7", color: "#15803d", border: "#bbf7d0" },
  Cohort: { bg: "#dbeafe", color: "#1d4ed8", border: "#bfdbfe" },
  "Case Series": { bg: "#e0e7ff", color: "#4338ca", border: "#c7d2fe" },
  Animal: { bg: "#fef3c7", color: "#92400e", border: "#fde68a" },
  "In Vitro": { bg: "#fee2e2", color: "#b91c1c", border: "#fecaca" },
  Review: { bg: "#f3f4f6", color: "#4b5563", border: "#e5e7eb" },
} as const;

function getPubMedUrl(pmid: string): string {
  if (pmid.startsWith("PMC")) {
    return `https://pmc.ncbi.nlm.nih.gov/articles/${pmid}`;
  }
  return `https://pubmed.ncbi.nlm.nih.gov/${pmid}`;
}

export function ResearchCard({
  pmid,
  title,
  year,
  journal,
  finding,
  evidenceType,
}: ResearchCardProps) {
  const typeConfig = EVIDENCE_TYPE_CONFIG[evidenceType];
  const url = getPubMedUrl(pmid);
  const idLabel = pmid.startsWith("PMC") ? "PMC" : "PMID";

  return (
    <div
      style={{
        border: "1px solid var(--color-border, #e5e7eb)",
        borderRadius: "0.5rem",
        padding: "1rem 1.15rem",
        backgroundColor: "var(--color-surface, #ffffff)",
        marginBottom: "0.75rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
          marginBottom: "0.4rem",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "0.15rem 0.5rem",
            borderRadius: "9999px",
            fontSize: "0.68rem",
            fontWeight: 700,
            backgroundColor: typeConfig.bg,
            color: typeConfig.color,
            border: `1px solid ${typeConfig.border}`,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {evidenceType}
        </span>
        <span
          style={{
            fontSize: "0.78rem",
            color: "var(--color-text-muted, #9ca3af)",
          }}
        >
          <em>{journal}</em>, {year}
        </span>
      </div>

      <h4 style={{ margin: "0 0 0.4rem", fontSize: "0.9rem", lineHeight: 1.4 }}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--color-primary, #1A3A5C)",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          {title}
        </a>
      </h4>

      <p
        style={{
          margin: "0 0 0.5rem",
          fontSize: "0.85rem",
          lineHeight: 1.55,
          color: "var(--color-text-muted, #4b5563)",
        }}
      >
        {finding}
      </p>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: "0.75rem",
          color: "var(--color-secondary, #3B7A9E)",
          textDecoration: "underline",
          textUnderlineOffset: "2px",
        }}
      >
        {idLabel}: {pmid}
      </a>
    </div>
  );
}
