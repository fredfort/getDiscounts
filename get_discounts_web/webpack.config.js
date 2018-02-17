const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const webPackConfig = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader'
    },
    {
      enforce: 'pre',
      test: /\.js?$/,
      loader: 'source-map-loader'
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [
          {
            loader: "css-loader",
            options: {
              minimize: true
            }
          },
          "sass-loader"
        ]
      })
    }]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development' // use 'development' unless process.env.ENV is defined
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new ExtractTextPlugin('style.css')
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  }
}


module.exports = function (env = {}) {
  if (env.runAnalyzer) {
    webPackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: true
      })
    )
  }
  return webPackConfig;
}