import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactCompiler: true,
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
