var sharedConfig = require('./webpack.shared')
var merge = require('ramda').merge
var path = require('path')

var webpackConfig = merge(sharedConfig, {
  devtool: 'inline-source-map',
  entry: './src/client.js',
  watch: true,
  cache: true,
  debug: true,
  map: true,

  output: merge(sharedConfig.output, {
    path: path.resolve('./dist/dev/'),
  }),

  module: {
    loaders: sharedConfig.module.loaders.concat([
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
      },
    ]),
  },

  devServer: {
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    contentBase: 'dist/dev/',
    proxy: {
      '/*': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true,
        bypass: function(req) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.')
            return '/index.html'
          }
        },
      },
    },
  },
})

module.exports = webpackConfig
