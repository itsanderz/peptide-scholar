interface CitationRefProps {
  index: number;
  pmid: string;
}

function getPubMedUrl(pmid: string): string {
  if (pmid.startsWith("PMC")) {
    return `https://pmc.ncbi.nlm.nih.gov/articles/${pmid}`;
  }
  return `https://pubmed.ncbi.nlm.nih.gov/${pmid}`;
}

export function CitationRef({ index, pmid }: CitationRefProps) {
  return (
    <sup
      style={{
        fontSize: "0.7em",
        lineHeight: 0,
        verticalAlign: "super",
      }}
    >
      <a
        href={`#ref-${index}`}
        title={`See reference ${index} (${pmid.startsWith("PMC") ? "PMC" : "PMID"}: ${pmid})`}
        style={{
          color: "var(--color-secondary, #3B7A9E)",
          textDecoration: "none",
          fontWeight: 600,
        }}
        onClick={undefined}
      >
        [{index}]
      </a>
    </sup>
  );
}

export { getPubMedUrl };
