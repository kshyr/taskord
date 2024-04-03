const baseConfig = require('../shared/tailwind.config.cjs');

module.exports = {
  ...baseConfig,
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    '../shared/src/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  plugins: [],
};
