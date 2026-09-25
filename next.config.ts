import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder imagery is local, generated SVG (see scripts/generate-placeholders.mjs).
    // TODO: once real JPG/WebP photography replaces the placeholders, this can be removed.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
