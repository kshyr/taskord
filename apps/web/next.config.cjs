//@ts-check

const { composePlugins, withNx } = require('@nx/next');
const createMDX = require('@next/mdx');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

const withMDX = createMDX({});

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withMDX,
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
