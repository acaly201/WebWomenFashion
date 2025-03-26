import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { i18n } from "@/i18n";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
  images1: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};
module.exports = {
  i18n,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
