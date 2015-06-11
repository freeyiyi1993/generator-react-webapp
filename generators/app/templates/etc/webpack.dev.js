var path       = require('path');
var webpack    = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');


module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8000',
    'webpack/hot/dev-server',
    './src/bootstrap.js'
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    path: 'build'
  },

  devServer: {
    info: false,
    hot: true,
    inline: false,
    port: 8000,
    host: 'localhost',
    colors: true,
    progress: true,
    contentBase: 'build',
    historyApiFallback: true,
    stats: {
      colors: true,
      progress: true
    }
  },

  resolve: {
    root: [
      path.join(__dirname, 'node_modules')
    ],
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.(svg|ico|eot|ttf|woff2?|pdf)$/,
        loader: 'file-loader?name=[path][name].[ext]&context=src/assets'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!autoprefixer-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'react-hot!babel?stage=0',
        exclude: [/node_modules/]
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      pkg      : require('../package.json'),
      template : './src/index.html'
    }),
    new webpack.CommonsChunkPlugin('common.js'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
