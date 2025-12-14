// postcss.config.js

module.exports = {
    parser: 'postcss-scss',
    plugins: [
      require('postcss-import'),
      require('@tailwindcss/postcss'),
      require('autoprefixer'),
      require('cssnano'),
    ]
  }
