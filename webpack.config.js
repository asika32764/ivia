/**
 * Part of ivia project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

const webpack = require('webpack');

const target = process.env.LIB_TARGET || 'var';
let output = 'ivia.js';

if (process.env.NODE_ENV === 'production') {
  if (target === 'var') {
    output = 'ivia.min.js';
  } else {
    output = 'ivia.common.js';
  }
} else {
  if (target === 'var') {
    output = 'ivia.js';
  } else {
    output = 'ivia.common.js';
  }
}

const config = {
  entry: "./src/index.js",
  output: {
    path: 'dist',
    filename: output,
    libraryTarget: target,
    library: ['Ivia'],
    sourceMapFilename: "ivia.js.map"
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
