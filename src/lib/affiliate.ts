// Amazon Associates tracking ID. Prefer NEXT_PUBLIC_AMAZON_TAG in production.
// Replace the fallback with your real tracking ID only if you do not use env vars.
export const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? "anderz0a-20";

export const amazonSearch = (query: string) =>
  `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}`;

export const amazonDp = (asin: string) =>
  `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}`;
