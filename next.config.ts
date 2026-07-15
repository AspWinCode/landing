import type { NextConfig } from "next";

const PORTAL_ORIGIN = "https://tirskix.space";

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors ${PORTAL_ORIGIN}`,
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tirskix.space",
        pathname: "/api/v1/media/files/**",
      },
    ],
  },
};

export default nextConfig;
