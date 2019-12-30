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
  entry: `${APP_DIR}/index.tsx`,
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: 'development',
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
        use: ['babel-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true, // true outputs JSX tags
            }
          }
        ]
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
