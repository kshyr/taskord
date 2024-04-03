const { join } = require('path');

module.exports = {
  plugins: {
    tailwindcss: {
      config: join(__dirname, '../shared/tailwind.config.js'),
    },
    autoprefixer: {},
  },
};
