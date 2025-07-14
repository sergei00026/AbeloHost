/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/AbeloHost',
  assetPrefix: '/AbeloHost',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
