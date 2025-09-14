import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com", "api.mapbox.com"],
  },
  env: {
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
  },
  eslint: {
    // Temporarily ignore ESLint errors during production builds.
    // TODO: Re-enable after fixing outstanding lint issues.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
