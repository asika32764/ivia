/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

const webpack = require('webpack');

const config = {
  entry: "./src/sparrow.js",
  output: {
    path: 'dist',
    filename: process.env.NODE_ENV === 'production' ? "sparrow.min.js" : "sparrow.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    cacheFolder: './cache',
    debug: true,
    minimize: true,
    sourceMap: true,
    output: {
      comments: false
    },
    compress: {
      warnings: false
    }
  }));
}

module.exports = config;
