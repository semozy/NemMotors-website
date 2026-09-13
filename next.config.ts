import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const sharedConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/aanbod", destination: "/voorraad", permanent: true },
      { source: "/aanbod/:slug", destination: "/voorraad/:slug", permanent: true },
      { source: "/nemmotors.png", destination: "/logo/nemmotors.png", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default function nextConfig(phase: string): NextConfig {
  return {
    ...sharedConfig,
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  };
}
