import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['192.168.1.3'],
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'apexcharts'],
  },
};

export default nextConfig;
