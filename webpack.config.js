// var Webpack = require('webpack')
var path = require('path')

var webpackConfig = {
  watch: false,
  devtool: 'inline-source-map',
  cache: true,
  debug: true,
  entry: './src/app.dev.js',
  map: true,

  output: {
    filename: 'app.js',
    path: path.resolve('./dist/dev/'),
    sourceMapFilename: '[file].map',
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
      'components': path.resolve('./src/components'),
      'pages': path.resolve('./src/pages'),
      'test': path.resolve('./test'),
    },
  },
  postcss: function () {
    return [require('postcss-cssnext'), require('lost')]
  },

  devServer: {
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    contentBase: 'dist/dev/',
  },

}

module.exports = webpackConfig
