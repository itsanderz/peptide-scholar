import Link from "next/link";

interface Crumb {
  label: string;
  href: string;
}

export function BreadcrumbNav({ crumbs }: { crumbs: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: crumb.href,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center gap-2">
          {i > 0 && <span>/</span>}
          {i === crumbs.length - 1 ? (
            <span style={{ opacity: 1, fontWeight: 500 }}>{crumb.label}</span>
          ) : (
            <Link href={crumb.href}>{crumb.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}
