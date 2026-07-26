import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Exported static site for GitHub Pages
  output: 'export',
  reactStrictMode: true,
  images: {
    // Unoptimized images are required for static export (no Image Optimization server)
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hindukushsoft.com',
      },
      {
        protocol: 'https',
        hostname: 'www.hindukushsoft.com',
      },
    ],
  },
  // When using `output: 'export'` custom headers/rewrites are not applied.
  // Set `outputFileTracingRoot` to silence workspace root inference warnings
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
