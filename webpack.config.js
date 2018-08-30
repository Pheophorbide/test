const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const rupture = require('rupture');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const extractCssPlugin = new ExtractTextPlugin('styles.css');

module.exports = () => {
  const config = {
    devtool: false,

    entry: './src',

    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index.js',
      publicPath: process.env.NODE_ENV === 'production' ? './dist/' : 'http://localhost:8080/dist/'
    },

    resolve: {
      alias: {
        src: path.resolve('./src'),
      },
    },

    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loaders: [{
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                ['latest', { es2015: { modules: false, loose: true } }],
                'stage-0',
                'react',
              ],
              plugins: [
                'transform-runtime',
                'syntax-dynamic-import',
                'transform-async-to-generator',
                'transform-regenerator',
                'transform-decorators-legacy',
                'react-hot-loader/babel',
              ],
            },
          }],
        },
        {
          test: /\.(styl)$/,
          loaders: (() => {
            const loaders = [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  config: {
                    path: path.resolve(__dirname, 'postcss.config.js'),
                  },
                },
              },
              {
                loader: 'stylus-loader',
              },
            ];

            if (process.env.NODE_ENV === 'production') {
              return extractCssPlugin.extract({ use: loaders });
            }

            loaders.unshift({
              loader: 'style-loader',
            });
            return loaders;
          })(),
        },
        {
          test: /\.(css)$/,
          loaders: (() => {
            const loaders = [
              {
                loader: 'css-loader',
                options: {
                  modules: false,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  config: {
                    path: path.resolve(__dirname, 'postcss.config.js'),
                  },
                },
              },
            ];

            if (process.env.NODE_ENV === 'production') {
              return extractCssPlugin.extract({ use: loaders });
            }

            loaders.unshift({
              loader: 'style-loader',
            });
            return loaders
          })(),
        },
        {
          test: /\.(otf|woff|woff2|ttf|eot)$/,
          loaders: [
            {
              loader: 'file-loader',
              options: {
                useRelativePath: true,
                publicPath: './',
              }
            },
          ],
        },
        {
          test: /\.(jpe?g|png|svg?)(\?[a-z0-9=&.]+)?$/,
          use: 'base64-inline-loader?limit=100000&name=[name].[ext]',
        },
        {
          test: /\.html$/,
          loaders: [
            {
              loader: 'html-loader',
            },
          ],
        }],
    },

    plugins: (() => {
      const env = process.env.NODE_ENV;
      const plugins = [
        new HtmlWebpackPlugin({
          template: './index.src.html',
          filename: '../index.html',
        }),
        new WriteFilePlugin({
          test: /^(?!.*(hot)).*/,
        }),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify(env),
          },
        }),
        new webpack.LoaderOptionsPlugin({
          test: /\.styl$/,
          stylus: {
            default: {
              use: [rupture()],
            },
          },
        }),
      ];

      if (env === 'production') {
        plugins.push(new UglifyJsPlugin());
        plugins.push(extractCssPlugin);
      }

      return plugins;
    })(),

    devServer: {
      inline: true,
      publicPath: '/dist/',
      hot: true,
      hotOnly: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
      }
    },
  };

  return config;
};
