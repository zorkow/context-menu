import * as path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const exports = {
  entry: './js/index.js',
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
  plugins: [
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: false,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    })
  ],
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
