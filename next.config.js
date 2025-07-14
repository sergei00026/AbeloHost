const basePath = '/AbeloHost';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
