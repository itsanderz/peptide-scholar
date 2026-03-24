interface PubMedRef {
  pmid: string;
  title: string;
  year: number;
  journal: string;
  finding: string;
}

interface ReferenceListProps {
  refs: PubMedRef[];
}

function getPubMedUrl(pmid: string): string {
  if (pmid.startsWith("PMC")) {
    return `https://pmc.ncbi.nlm.nih.gov/articles/${pmid}`;
  }
  return `https://pubmed.ncbi.nlm.nih.gov/${pmid}`;
}

export function ReferenceList({ refs }: ReferenceListProps) {
  if (!refs || refs.length === 0) return null;

  return (
    <section
      style={{
        marginTop: "2.5rem",
        paddingTop: "1.5rem",
        borderTop: "1px solid var(--color-border, #e5e7eb)",
      }}
    >
      <h2
        style={{
          fontSize: "1.15rem",
          fontWeight: 700,
          marginBottom: "1rem",
          color: "var(--color-text, #1A3A5C)",
          fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
        }}
      >
        References
      </h2>
      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          counterReset: "ref-counter",
          fontSize: "0.85rem",
          lineHeight: 1.6,
          color: "var(--color-text-muted, #4b5563)",
        }}
      >
        {refs.map((ref, i) => {
          const index = i + 1;
          const url = getPubMedUrl(ref.pmid);
          const idLabel = ref.pmid.startsWith("PMC") ? "PMC" : "PMID";

          return (
            <li
              key={ref.pmid}
              id={`ref-${index}`}
              style={{
                marginBottom: "0.75rem",
                paddingLeft: "2rem",
                textIndent: "-2rem",
              }}
            >
              <span style={{ fontWeight: 700, color: "var(--color-text, #1A3A5C)" }}>
                {index}.
              </span>{" "}
              {ref.title}.{" "}
              <em>{ref.journal}</em>, {ref.year}.{" "}
              &ldquo;{ref.finding}&rdquo;{" "}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--color-secondary, #3B7A9E)",
                  textDecoration: "underline",
                  textUnderlineOffset: "2px",
                }}
              >
                [{idLabel}: {ref.pmid}]
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export type { PubMedRef };
