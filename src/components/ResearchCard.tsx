interface ResearchCardProps {
  pmid: string;
  title: string;
  year: number;
  journal: string;
  finding: string;
  evidenceType: "RCT" | "Cohort" | "Case Series" | "Animal" | "In Vitro" | "Review";
}

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
  const url = getPubMedUrl(pmid);
  const idLabel = pmid.startsWith("PMC") ? "PMC" : "PMID";

  return (
    <article className="pd-research">
      <div className="pd-research-pmid">
        <span className="pd-research-type">{evidenceType}</span>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {idLabel}: {pmid}
        </a>
      </div>
      <div>
        <h3 className="pd-research-title">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>
        <p className="pd-research-j">
          <em>{journal}</em>, {year}
        </p>
        <p className="pd-research-finding">{finding}</p>
      </div>
    </article>
  );
}
