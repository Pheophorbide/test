module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['last 2 version', '> 1%', 'IE 11', 'android >= 4'],
    },

    cssnano: {
      normalizeUrl: false,
      safe: true,
    },
  },
};
