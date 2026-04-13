import type { SourceCitation } from "@/types/generated-content";

export function SourceCitationList({ sources }: { sources: SourceCitation[] }) {
  if (!sources || sources.length === 0) return null;

  return (
    <section className="mt-10">
      <h2
        className="text-xl font-bold mb-4"
        style={{ color: "#1A3A5C", fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)" }}
      >
        Sources
      </h2>
      <ol className="space-y-3">
        {sources.map((source, index) => (
          <li
            key={source.id}
            className="rounded-xl p-4 text-sm leading-relaxed"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D7E2", color: "#1C2028" }}
          >
            <div className="font-semibold mb-1">
              {index + 1}. {source.title}
            </div>
            <div className="text-xs uppercase tracking-[0.16em] mb-2" style={{ color: "#5A6577" }}>
              {source.authority}
              {source.publishedAt ? ` • ${source.publishedAt}` : ""}
            </div>
            <div className="mb-2" style={{ color: "#5A6577" }}>
              Claim type: {source.claimType}
            </div>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold"
              style={{ color: "#3B7A9E" }}
            >
              View source &rarr;
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
