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
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack',
        ],
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
      'drivers': path.resolve('./src/drivers'),
      'icons': path.resolve('./src/icons'),
      'test': path.resolve('./test'),
    },
  },
  postcss: function () {
    return [require('postcss-cssnext'), require('lost')]
  },

  imageWebpackLoader: {
    pngquant:{
      quality: '65-90',
      speed: 4,
    },
    svgo:{
      plugins: [
        {removeViewBox: false},
        {removeEmptyAttrs: false},
      ],
    },
  },

  devServer: {
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    contentBase: 'dist/dev/',
  },

}

module.exports = webpackConfig
