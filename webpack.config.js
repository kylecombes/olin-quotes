// const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname);
const APP_DIR = path.resolve(__dirname, 'app');

module.exports = {
  entry: `${APP_DIR}/index.tsx`,
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.jsx?/,
        include: APP_DIR,
        use: [
          {
            loader: 'babel-loader',
          }
        ]
      },
      {
        test: /\.svg$/,
        use: 'raw-loader',
      },
      {
        test: /\.scss$/,
        include: APP_DIR,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        include: APP_DIR,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
