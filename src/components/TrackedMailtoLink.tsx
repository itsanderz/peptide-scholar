"use client";

import type { ReactNode } from "react";
import { trackProviderPartnerContactIntent } from "@/lib/analytics";

export function TrackedMailtoLink({
  href,
  marketCode,
  partnerSlug,
  treatmentSlug,
  className,
  style,
  children,
}: {
  href: string;
  marketCode: string;
  partnerSlug: string;
  treatmentSlug?: string;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={() => trackProviderPartnerContactIntent(marketCode, partnerSlug, treatmentSlug)}
    >
      {children}
    </a>
  );
}
