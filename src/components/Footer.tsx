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
  links?: FooterLink[];
}

export function Footer({ siteName, columns, legalLinks, links }: FooterProps) {
  const year = new Date().getFullYear();

  if (!columns && links && links.length > 0) {
    return (
      <footer className="nb-footer">
        <div className="container">
          <div className="nb-footer-bottom" style={{ padding: "32px 0", border: 0 }}>
            <span className="nb-footer-copy">&copy; {year} {siteName}</span>
            <nav className="flex flex-wrap gap-4">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="font-mono text-[11px] text-[#edeae3] opacity-70 hover:opacity-100 transition-opacity">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="nb-footer">
      <div className="container">
        {columns && columns.length > 0 && (
          <div className="nb-footer-grid">
            <div className="nb-footer-brand">
              <div className="nb-footer-logo">
                <div className="nb-footer-logo-mark">
                  <span className="font-bold text-[10px]" style={{ color: "#050505" }}>
                    {siteName.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="nb-footer-logo-text">{siteName}</span>
              </div>
              <p className="nb-footer-desc">
                Evidence-based peptide reference. Every claim cited from PubMed. No hype. Just data.
              </p>
            </div>

            {columns.map((col) => (
              <div key={col.heading} className="nb-footer-col">
                <div className="nb-footer-heading">{col.heading}</div>
                <div className="nb-footer-links">
                  {col.links.map((link) => (
                    <Link key={link.href} href={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="nb-footer-bottom">
          <span className="nb-footer-copy">&copy; {year} {siteName}</span>
          <div className="flex items-center gap-4">
            {legalLinks && legalLinks.length > 0 && (
              <nav className="flex flex-wrap gap-4">
                {legalLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#edeae3] opacity-30 hover:opacity-60 transition-opacity">
                    {link.label}
                  </Link>
                ))}
              </nav>
            )}
            <span className="nb-footer-badge">
              <span className="nb-footer-badge-dot"></span>
              <span className="nb-footer-badge-text">Research Use Only</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
