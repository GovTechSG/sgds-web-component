/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  turbopack: {},
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
