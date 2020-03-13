const path = require('path');
/* eslint-disable */
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, dir);
}
let buildType = 'dev';
if (process.env.NODE_ENV === 'production') {
  buildType = 'prod';
} else if (process.env.NODE_ENV === 'test') {
  buildType = 'test';
}
const commonPlugin = [
  new webpack.DefinePlugin({
    __PROD__: buildType === 'prod',
  }),
];
if (buildType === 'dev') {
  commonPlugin.push(new webpack.HotModuleReplacementPlugin());
}

const optimization = {
  runtimeChunk: {
    name: 'manifest',
  },
  splitChunks: {
    chunks: 'all',
    name: true,
    cacheGroups: {
      commons: {
        name: 'commons',
        chunks: 'all',
        minChunks: 2,
        priority: -10,
      },
      vendors: {
        name: 'vendors',
        test: /[\\/]node_modules[\\/]/,
      },
    },
  },
};

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('pages', resolve('src/pages'))
      .set('store', resolve('src/store'))
      .set('styles', resolve('src/styles'))
      .set('common', resolve('src/common'));
  },
  configureWebpack: config => {
    if (buildType === 'test') {
      config.output.filename = '[name].[chunkhash:5].js';
      config.output.chunkFilename = '[name].[chunkhash:5].js';
      config.optimization = optimization;
    }
    config.plugins = config.plugins.concat(commonPlugin);
  },
  devServer: {
    hot: true,
    port: 8084,
    disableHostCheck: true,
  },
};
