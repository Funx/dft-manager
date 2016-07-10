var sharedConfig = require('./webpack.shared')
var merge = require('ramda').merge
var path = require('path')
var fs = require('fs')
var Extract = require('extract-text-webpack-plugin')

var nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })
var webpackConfig = merge(sharedConfig, {
  entry: './src/server.js',
  target: 'node',

  output: {
    filename: 'server.js',
    path: path.resolve('./dist/dev/'),
  },

  module: {
    loaders: sharedConfig.module.loaders.concat([
      {
        test: /\.css$/,
        loader: Extract.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
        ),
      },
    ]),
  },

  externals: nodeModules,

  plugins: [
    new Extract('styles.css', {allChunks: true}),
  ],

})
module.exports = webpackConfig
