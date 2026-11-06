/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1"],
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {},
};

export default nextConfig;
