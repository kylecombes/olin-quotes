const path = require('path');
const fs = require('fs');

const BUILD_DIR = path.resolve(__dirname);
const APP_DIR = path.resolve(__dirname, 'app');

module.exports = {
  devtool: 'source-map',
  devServer: {
    allowedHosts: [
      'lvh.me',
      'secure-dev.kylecombes.com',
    ],
    historyApiFallback: true,
    https: {
      key: fs.readFileSync('server/secure-dev.kylecombes.com.key'),
      cert: fs.readFileSync('server/secure-dev.kylecombes.com.cert'),
    },
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
    extensions: ['.js', '.jsx'],
  },
};
