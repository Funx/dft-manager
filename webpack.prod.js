var webpack = require('webpack')
var sharedConfig = require('./webpack.shared')
var merge = require('ramda').merge
var concat = require('ramda').concat
var path = require('path')

var webpackConfig = merge(sharedConfig, {
  entry: './src/client.js',
  watch: false,
  cache: true,
  debug: false,

  output: merge(sharedConfig.output, {
    path: path.resolve('./dist'),
  }),

  module: {
    loaders: concat(sharedConfig.module.loaders || [], [
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
      },
    ]),
  },

  plugins: concat(sharedConfig.plugins || [], [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ]),
})

module.exports = webpackConfig
