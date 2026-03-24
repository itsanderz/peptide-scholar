import Link from "next/link";

interface CategoryNavProps {
  categories: { name: string; slug: string; count: number }[];
  currentSlug?: string;
}

export function CategoryNav({ categories, currentSlug }: CategoryNavProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <nav aria-label="Peptide categories">
      <h3
        style={{
          fontSize: "0.8rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "var(--color-text-muted, #6b7280)",
          marginBottom: "0.6rem",
          fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
        }}
      >
        Categories
      </h3>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {categories.map((cat) => {
          const isActive = cat.slug === currentSlug;
          return (
            <li key={cat.slug}>
              <Link
                href={`/best-for/${cat.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive
                    ? "var(--color-primary, #1A3A5C)"
                    : "var(--color-text-muted, #4b5563)",
                  backgroundColor: isActive
                    ? "rgba(59, 122, 158, 0.08)"
                    : "transparent",
                  textDecoration: "none",
                  transition: "background-color 0.15s ease",
                  minHeight: "48px",
                }}
              >
                <span>{cat.name}</span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-muted, #9ca3af)",
                    fontWeight: 500,
                    backgroundColor: isActive
                      ? "rgba(59, 122, 158, 0.12)"
                      : "var(--color-surface, #f3f4f6)",
                    padding: "0.1rem 0.45rem",
                    borderRadius: "9999px",
                    minWidth: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  {cat.count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
