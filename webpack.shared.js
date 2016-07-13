var path = require('path')

var webpackConfig = {
  watch: false,
  devtool: 'inline-source-map',
  cache: true,
  entry: './src/client.js',
  map: true,

  output: {
    filename: 'app.js',
    path: path.resolve('./dist/'),
    sourceMapFilename: '[file].map',
  },

  module: {
    loaders: [
      { test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        exclude: /icons/,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack',
        ],
      },
      {
        test: /\.svg$/,
        include: /icons/,
        loader: 'svg-inline',
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
      'dataHandlers': path.resolve('./src/dataHandlers'),
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
}

module.exports = webpackConfig
