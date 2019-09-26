require('babel-polyfill');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = require('./config');

const webpackConfig = {
  mode: 'development',
  // entry: './documents/entry.js',
  entry: {
    app: ["babel-polyfill", "./documents/entry.js"]
  },
  output: {
    path: path.resolve(process.cwd(), './docs/'),
    publicPath: process.env.CI_ENV || '',
    filename: '[name].[hash:7].js',
    chunkFilename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },
  devServer: {
    host: '127.0.0.1',
    port: 8095,
    publicPath: '/',
    hot: true,
    disableHostCheck: true
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|jsx?)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx?|babel|es6)$/,
        include: [path.join(__dirname, '..', 'documents'),  path.join(__dirname, '..', 'node-modules')],
        options: {
          presets: ['@babel/preset-env']
        },
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js')
          }
        ]
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        // todo: 这种写法有待调整
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './documents/index.tpl',
      filename: './index.html',
      favicon: './documents/favicon.ico'
    }),
    new CopyWebpackPlugin([
      { from: 'documents/versions.json' },
      { from: 'soulTable.css' },
      { from: '*.json' },
      { from: '*.html' },
      {
        from: 'codemirror',
        to: 'codemirror'
      },
      {
        from: 'layui',
        to: 'layui'
      }
    ]),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.FAAS_ENV': JSON.stringify(process.env.FAAS_ENV)
    }),
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    })
  ],
  optimization: {
    minimizer: []
  },
  devtool: '#eval-source-map'
};
if (process.env.NODE_ENV === 'product') {
  webpackConfig.plugins.push(new UglifyJSPlugin({
    uglifyOptions: {
      ie8: true,
      output: {
        comments: false,
        beautify: false
      },
      warnings: false
    }
  }))
}

module.exports = webpackConfig;
