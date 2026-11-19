import { withSgdsNextSSR } from "@govtechsg/sgds-web-component/react/ssr";

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next",
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1"],
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {},
};

export default withSgdsNextSSR(nextConfig);
