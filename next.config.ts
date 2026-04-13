import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const configDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: configDir,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.peptidescholar.com" }],
        destination: "https://peptidescholar.com/:path*",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
