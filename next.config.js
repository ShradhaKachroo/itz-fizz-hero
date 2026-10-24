/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  webpack: (config, { dev }) => {
    if (dev) {
      // Disables filesystem cache in dev to prevent Windows/OneDrive NTFS readlink errors
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;
