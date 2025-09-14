import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['api.mapbox.com'],
  },
  env: {
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
  },
};

export default nextConfig;
