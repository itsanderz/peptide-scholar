"use client";
import { useEffect, useRef } from "react";
interface AdSlotProps { adClient?: string; adSlot?: string; format?: "auto" | "rectangle" | "horizontal" | "vertical"; className?: string; }
declare global { interface Window { adsbygoogle: unknown[] } }
export function AdSlot({ adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT, adSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT, format = "auto", className = "" }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  useEffect(() => { if (!adClient || !adSlot) return; if (pushed.current) return; try { (window.adsbygoogle = window.adsbygoogle || []).push({}); pushed.current = true; } catch {} }, [adClient, adSlot]);
  if (!adClient || !adSlot) return (<div className={`bg-gray-100 border border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-400 text-sm ${className}`}>Ad Space</div>);
  return (<div className={className}><ins ref={adRef} className="adsbygoogle" style={{ display: "block" }} data-ad-client={adClient} data-ad-slot={adSlot} data-ad-format={format} data-full-width-responsive="true" /></div>);
}
