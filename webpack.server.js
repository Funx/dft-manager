var Extract = require('extract-text-webpack-plugin');
var Webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

var webpackConfig = {
  entry: './src/server.js',

  target: 'node',

  output: {
    filename: 'server.js',
    path: path.resolve('./dist/')
  },

  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/},
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      }
    ]
  },

  externals: nodeModules,

  resolve: {
    alias: {
      "utils": path.resolve('./src/utils'),
      "dialogue": path.resolve('./src/dialogue'),
    }
  },
  postcss: function () {
    return [require('postcss-cssnext')];
  },

  plugins: [
    new Extract('styles.css', {allChunks: true})
    //new Webpack.NormalModuleReplacementPlugin(/\.styl$/, 'node-noop'),
    //new Webpack.IgnorePlugin(/\.styl$/),
  ],

};

module.exports = webpackConfig;
