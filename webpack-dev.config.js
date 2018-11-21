// const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname);
const APP_DIR = path.resolve(__dirname, 'app');

module.exports = {
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(APP_DIR, 'public'),
  },
  entry: `${APP_DIR}/index.jsx`,
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        use: ['babel-loader'],
      },
      {
        test: /\.svg$/,
        use: 'raw-loader',
      },
      {
        test: /\.css$/,
        include: APP_DIR,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
