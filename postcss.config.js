module.exports = {
    plugins: [
      require('postcss-import'),
    //   require('cssnano'),
      require('autoprefixer'),
      require('postcss-preset-env')
    ]
}
