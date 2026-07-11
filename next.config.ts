import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
