import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  async rewrites() {
    return [
      {
        source: "/api/media/:path*",
        destination: "http://localhost:8000/api/v1/media/:path*",
      },
    ];
  },
};

export default nextConfig;
