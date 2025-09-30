/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  distDir: './dist',
  pageExtensions: ["tsx"],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      {
        test: /\.yml$/,
        use: 'yaml-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.svg$/,
        use: "@svgr/webpack",
      }
    );
    return config;
  },
};
