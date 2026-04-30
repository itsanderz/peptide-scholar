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
      stroke="currentColor"
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
    <section className="resource-box">
      <h3 className="section-title">{heading}</h3>
      {subheading && (
        <p className="resource-desc">{subheading}</p>
      )}

      <div className="grid sm:grid-cols-2 gap-3">
        {products.map((product, i) => (
          <a
            key={i}
            href={product.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            data-affiliate="amazon-product"
            className="resource-card"
          >
            <div className="resource-icon">
              <CartIcon />
            </div>
            <div>
              <p className="resource-title">{product.title}</p>
              <p className="resource-desc">{product.description}</p>
              <div className="provider-badges">
                <span className="legal-badge is-warn">{product.priceRange}</span>
                <span className="legal-badge is-alert">View on Amazon</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <p className="resource-note">
        Amazon affiliate links; we may earn a small commission at no extra cost to you. See our{" "}
        <Link href="/disclosure" className="underline">
          disclosure
        </Link>
        .
      </p>
    </section>
  );
}
