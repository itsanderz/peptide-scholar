import type { AffiliateProduct } from "@/data/affiliate-products";
import Link from "next/link";

interface AffiliateProductGridProps {
  heading: string;
  subheading?: string;
  products: AffiliateProduct[];
}

function CartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3B7A9E"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.61L23 6H6" />
    </svg>
  );
}

export function AffiliateProductGrid({ heading, subheading, products }: AffiliateProductGridProps) {
  return (
    <section
      className="rounded-xl p-6 mb-8"
      style={{ backgroundColor: "#FAFBFC", border: "1px solid #D0D7E2" }}
    >
      <h3
        className="text-lg font-bold mb-1"
        style={{
          color: "#1A3A5C",
          fontFamily: "var(--font-heading, 'Libre Franklin', sans-serif)",
        }}
      >
        {heading}
      </h3>
      {subheading && (
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">{subheading}</p>
      )}

      <div className="grid sm:grid-cols-2 gap-3">
        {products.map((product, i) => (
          <a
            key={i}
            href={product.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            data-affiliate="amazon-product"
            className="group flex items-start gap-3 p-4 rounded-lg transition-shadow hover:shadow-md"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}
          >
            <div
              className="flex-shrink-0 mt-0.5 p-2 rounded-lg"
              style={{ backgroundColor: "#F0F7FA" }}
            >
              <CartIcon />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm mb-0.5 leading-snug" style={{ color: "#1A3A5C" }}>
                {product.title}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed mb-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-medium" style={{ color: "#3B7A9E" }}>
                  {product.priceRange}
                </span>
                <span
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md"
                  style={{ backgroundColor: "#FF9900", color: "#FFFFFF" }}
                >
                  View on Amazon
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <p className="text-[11px] mt-4" style={{ color: "#9CA3AF" }}>
        Amazon affiliate links — we may earn a small commission at no extra cost to you. See our{" "}
        <Link href="/disclosure" className="underline" style={{ color: "#6B7280" }}>
          disclosure
        </Link>
        .
      </p>
    </section>
  );
}
