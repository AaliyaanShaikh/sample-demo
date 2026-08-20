import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: process.env.NODE_ENV === "production",
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
    ],
  },
};

export default nextConfig;
