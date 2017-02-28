/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

const webpack = require('webpack');

const target = process.env.LIB_TARGET || 'var';
let output = 'sparrow.js';

if (process.env.NODE_ENV === 'production') {
  if (target === 'var') {
    output = 'sparrow.min.js';
  } else {
    output = 'sparrow.common.js';
  }
} else {
  if (target === 'var') {
    output = 'sparrow.js';
  } else {
    output = 'sparrow.common.js';
  }
}

const config = {
  entry: "./src/index.js",
  output: {
    path: 'dist',
    filename: output,
    libraryTarget: target,
    library: ['Sparrow'],
    sourceMapFilename: "sparrow.js.map"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'webpack-comment-remover-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};

if (process.env.NODE_ENV === 'production' && target === 'var') {
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
