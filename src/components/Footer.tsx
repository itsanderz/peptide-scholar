import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

interface FooterProps {
  siteName: string;
  columns?: FooterColumn[];
  legalLinks?: FooterLink[];
  /** Fallback flat link list (legacy) */
  links?: FooterLink[];
}

export function Footer({ siteName, columns, legalLinks, links }: FooterProps) {
  const year = new Date().getFullYear();

  if (!columns && links && links.length > 0) {
    // Legacy flat mode
    return (
      <footer className="mt-16 border-t border-gray-200 py-8 text-sm text-gray-500">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>&copy; {year} {siteName}. All rights reserved.</p>
            <nav className="flex flex-wrap gap-4">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-gray-700">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="mt-4 text-xs text-gray-400 text-center">
            This site contains affiliate links. We may earn a commission on purchases at no extra cost to you.
            Data is sourced from public records and may not be 100% accurate. Always verify with local authorities.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50 text-sm text-gray-600">
      {columns && columns.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Brand column */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <p className="font-semibold text-gray-800 text-base">{siteName}</p>
              <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                Independent research and comparison tools for peptide therapies.
              </p>
            </div>

            {columns.map((col) => (
              <div key={col.heading}>
                <p className="font-semibold text-gray-700 uppercase tracking-wider text-xs mb-3">
                  {col.heading}
                </p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-500 hover:text-gray-800 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">&copy; {year} {siteName}. All rights reserved.</p>
          {legalLinks && legalLinks.length > 0 && (
            <nav className="flex flex-wrap gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
        <div className="max-w-5xl mx-auto px-4 pb-5">
          <p className="text-xs text-gray-400 leading-relaxed">
            This site contains affiliate links. We may earn a commission on purchases at no extra cost to you.
            Data is sourced from public records and may not be 100% accurate. Always verify with local authorities.
          </p>
        </div>
      </div>
    </footer>
  );
}
