const baseConfig = require('../shared/tailwind.config.js');

module.exports = {
  ...baseConfig,
  content: ['./src/**/*.{js,jsx,ts,tsx}', '../shared/src/**/*.{js,jsx,ts,tsx}'],
  plugins: [],
};
