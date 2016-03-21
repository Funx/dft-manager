// var Webpack = require('webpack')
var path = require('path')

var webpackConfig = {
  watch: false,
  devtool: 'eval-source-map',
  entry: './src/app.dev.js',
  map: true,

  output: {
    filename: 'app.js',
    path: path.resolve('./dist/dev/'),
  },

  module: {
    loaders: [
      { test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
      },
    ],
  },

  resolveLoader: {
    modulesDirectories: [
      path.resolve('./node_modules'),
    ],
  },

  resolve: {
    alias: {
      'utils': path.resolve('./src/utils'),
      'dialogue': path.resolve('./src/dialogue'),
      'test': path.resolve('./test'),
    },
  },
  postcss: function () {
    return [require('postcss-cssnext')]
  },

  devServer: {
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
  },

}

module.exports = webpackConfig
