"use client";

import { useTransition } from "react";
import { getLaunchSequenceMarkets } from "@/data/markets";
import { MARKET_COOKIE_NAME } from "@/lib/market";
import { trackMarketSelection } from "@/lib/analytics";
import type { MarketCode } from "@/types/market";

interface MarketSelectorProps {
  currentMarket: MarketCode;
  className?: string;
}

export function MarketSelector({
  currentMarket,
  className = "",
}: MarketSelectorProps) {
  const [isPending, startTransition] = useTransition();
  const markets = getLaunchSequenceMarkets();

  function handleChange(nextMarket: string) {
    startTransition(() => {
      document.cookie = `${MARKET_COOKIE_NAME}=${nextMarket}; path=/; max-age=31536000; samesite=lax`;
      trackMarketSelection(nextMarket, "header_selector");
      window.location.reload();
    });
  }

  return (
    <div className={className}>
      <select
        aria-label="Select market"
        defaultValue={currentMarket}
        disabled={isPending}
        onChange={(event) => handleChange(event.target.value)}
        className="rounded-md border px-2.5 py-1.5 text-xs font-medium"
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          borderColor: "rgba(255,255,255,0.18)",
          color: "#FFFFFF",
        }}
      >
        {markets.map((market) => (
          <option key={market.code} value={market.code} style={{ color: "#111827" }}>
            {market.name}
          </option>
        ))}
      </select>
    </div>
  );
}
