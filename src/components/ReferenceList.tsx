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
    <section className="reference-list">
      <h2 className="section-title">References</h2>
      <ol>
        {refs.map((ref, i) => {
          const index = i + 1;
          const url = getPubMedUrl(ref.pmid);
          const idLabel = ref.pmid.startsWith("PMC") ? "PMC" : "PMID";

          return (
            <li key={ref.pmid} id={`ref-${index}`}>
              <span className="reference-index">{index}.</span>
              {ref.title}. <em>{ref.journal}</em>, {ref.year}. &quot;{ref.finding}&quot;{" "}
              <a href={url} target="_blank" rel="noopener noreferrer">
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
