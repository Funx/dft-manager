var sharedConfig = require('./webpack.shared')
var merge = require('ramda').merge
var path = require('path')

var webpackConfig = merge(sharedConfig, {
  devtool: 'source-map',
  entry: './src/client.js',
  watch: false,
  cache: true,
  debug: false,
  map: true,

  output: merge(sharedConfig.output, {
    path: path.resolve('./dist'),
  }),

  module: {
    loaders: sharedConfig.module.loaders.concat([
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
      },
    ]),
  },
})

module.exports = webpackConfig
