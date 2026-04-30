import Link from "next/link";

interface Resource {
  title: string;
  description: string;
  type: "book" | "course" | "testing" | "tool";
  ctaText: string;
  ctaUrl: string;
}

interface ResourceBoxProps {
  title?: string;
  resources: Resource[];
}

function TypeIcon({ type }: { type: Resource["type"] }) {
  const shared = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8 };

  switch (type) {
    case "book":
      return (
        <svg {...shared}>
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z" />
        </svg>
      );
    case "course":
      return (
        <svg {...shared}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case "testing":
      return (
        <svg {...shared}>
          <path d="M9 3h6M12 3v7M7 10l-2 11a1 1 0 001 1h12a1 1 0 001-1l-2-11" />
          <path d="M7 10h10" />
        </svg>
      );
    case "tool":
      return (
        <svg {...shared}>
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94L6.73 20.2a2 2 0 01-2.83 0l-.1-.1a2 2 0 010-2.83l6.73-6.73a6 6 0 017.94-7.94l-3.77 3.77z" />
        </svg>
      );
  }
}

export function ResourceBox({ title = "Recommended Resources", resources }: ResourceBoxProps) {
  const isInternalUrl = (url: string) => url.startsWith("/");

  return (
    <div className="resource-box">
      <h3 className="section-title">
        {title}
      </h3>

      <div className="resource-grid">
        {resources.map((resource, i) => (
          <div
            key={i}
            className="resource-card"
          >
            <div className="resource-icon">
              <TypeIcon type={resource.type} />
            </div>
            <div>
              <p className="resource-title">
                {resource.title}
              </p>
              <p className="resource-desc">
                {resource.description}
              </p>
              {isInternalUrl(resource.ctaUrl) ? (
                <Link
                  href={resource.ctaUrl}
                  className="btn-outline"
                >
                  {resource.ctaText}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <a
                  href={resource.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  data-affiliate={resource.ctaUrl.includes("amazon.com") ? "amazon-product" : undefined}
                  className="btn-outline"
                >
                  {resource.ctaText}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="resource-note">
        Links may be affiliate links. See our{" "}
        <Link href="/disclosure" className="underline">
          disclosure
        </Link>
        .
      </p>
    </div>
  );
}
