const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './js/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [ '.js' ]
  },
  output: {
    filename: 'ContextMenu.js',
    library: 'ContextMenu',
    libraryTarget: 'umd',
    globalObject: 'this',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        output: {
          ascii_only: true
        }
      }
    })]
  },
  mode: 'production'
};
