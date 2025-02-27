import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lalec.be',
      },
      {
        protocol: 'https',
        hostname: 'api.lalec.be',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/challenges",
        destination: "/challenges/quests",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
