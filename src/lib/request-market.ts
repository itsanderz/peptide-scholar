import { cookies, headers } from "next/headers";
import {
  MARKET_COOKIE_NAME,
  resolveMarketCode,
  resolveMarket,
} from "@/lib/market";

export async function getRequestMarketCode() {
  const headersList = await headers();
  const headerMarket = headersList.get("x-market");
  if (headerMarket) {
    return resolveMarketCode(headerMarket);
  }

  const cookieStore = await cookies();
  return resolveMarketCode(cookieStore.get(MARKET_COOKIE_NAME)?.value);
}

export async function getRequestMarket() {
  return resolveMarket(await getRequestMarketCode());
}
