const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add MiniCssExtractPlugin for Mapbox CSS
    if (!isServer) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash].css",
          chunkFilename: "static/css/[id].[contenthash].css",
        })
      );
    }

    return config;
  },
  // Enable experimental features if needed
  experimental: {
    // Add any experimental features here
  },
  // Configure images if needed
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com"],
  },
};

module.exports = nextConfig;
