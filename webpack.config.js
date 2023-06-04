const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const PugPlugin = require('pug-plugin');
const path = require('path');

const _dirname = path.resolve(__dirname)

module.exports = {
  entry: `${_dirname}/src/index.js`,
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.pug$/i,
        use: [PugPlugin.loader]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin()
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${_dirname}/src/index.pug`,
      minify: false,
    }),
    new HtmlWebpackPugPlugin(),
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
  ]
};
