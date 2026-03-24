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
  const shared = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", strokeWidth: 1.8 };

  switch (type) {
    case "book":
      return (
        <svg {...shared} stroke="#3B7A9E">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z" />
        </svg>
      );
    case "course":
      return (
        <svg {...shared} stroke="#3B7A9E">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case "testing":
      return (
        <svg {...shared} stroke="#3B7A9E">
          <path d="M9 3h6M12 3v7M7 10l-2 11a1 1 0 001 1h12a1 1 0 001-1l-2-11" />
          <path d="M7 10h10" />
        </svg>
      );
    case "tool":
      return (
        <svg {...shared} stroke="#3B7A9E">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94L6.73 20.2a2 2 0 01-2.83 0l-.1-.1a2 2 0 010-2.83l6.73-6.73a6 6 0 017.94-7.94l-3.77 3.77z" />
        </svg>
      );
  }
}

export function ResourceBox({ title = "Recommended Resources", resources }: ResourceBoxProps) {
  return (
    <div
      className="rounded-xl p-6 mb-8"
      style={{
        backgroundColor: "#FAFBFC",
        border: "1px solid #D0D7E2",
      }}
    >
      <h3
        className="text-lg font-bold mb-4"
        style={{
          color: "#1A3A5C",
          fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
        }}
      >
        {title}
      </h3>

      <div className="space-y-4">
        {resources.map((resource, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-4 rounded-lg"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}
          >
            <div
              className="flex-shrink-0 mt-0.5 p-2 rounded-lg"
              style={{ backgroundColor: "#F0F7FA" }}
            >
              <TypeIcon type={resource.type} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm mb-1" style={{ color: "#1A3A5C" }}>
                {resource.title}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed mb-2">
                {resource.description}
              </p>
              <a
                href={resource.ctaUrl}
                className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-md transition-colors"
                style={{
                  backgroundColor: "#3B7A9E",
                  color: "#FFFFFF",
                }}
              >
                {resource.ctaText}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] mt-4" style={{ color: "#9CA3AF" }}>
        Links may be affiliate links. See our{" "}
        <a href="/disclosure" className="underline" style={{ color: "#6B7280" }}>
          disclosure
        </a>
        .
      </p>
    </div>
  );
}
