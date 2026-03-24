import Link from "next/link";

interface FooterProps {
  siteName: string;
  links?: { label: string; href: string }[];
}

export function Footer({ siteName, links }: FooterProps) {
  return (
    <footer className="mt-16 border-t border-gray-200 py-8 text-sm text-gray-500">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          {links && links.length > 0 && (
            <nav className="flex gap-4">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-gray-700">
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
        <p className="mt-4 text-xs text-gray-400 text-center">
          This site contains affiliate links. We may earn a commission on purchases at no extra cost to you.
          Data is sourced from public records and may not be 100% accurate. Always verify with local authorities.
        </p>
      </div>
    </footer>
  );
}
