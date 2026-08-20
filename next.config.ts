import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // StrictMode doubles dev work; can worsen dev-server / HMR races. Keep for production builds.
  reactStrictMode: process.env.NODE_ENV === "production",
  experimental: {
    optimizePackageImports: ["lucide-react"],
    devtoolSegmentExplorer: false,
  },
  images: {
    // Dev: skip the image optimizer pipeline (much faster hot reload / local browsing).
    // Production: full AVIF/WebP optimization.
    unoptimized: isDev,
    formats: ["image/avif", "image/webp"],
    // Keep optimized variants longer at the edge (reduces repeat work on navigation).
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = { type: "memory" };
      config.watchOptions = {
        ...config.watchOptions,
        aggregateTimeout: 600,
        ignored: ["**/node_modules/**", "**/.git/**"],
      };
    }
    return config;
  },
};

export default nextConfig;
