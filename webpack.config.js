import * as path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const exports = {
  entry: './js/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
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

export default exports;
