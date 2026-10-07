import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root — a stray lockfile in the home folder otherwise
  // makes Next infer the wrong workspace root.
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
      },
    ],
  },
};

export default nextConfig;
