const path = require("path");
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const DIST_DIR = path.resolve(__dirname, "static");

module.exports = {

  entry: {
    main: './src/index.static.js',
  },

  output: {
    filename: '[name].[chunkhash:6].js',
    path: DIST_DIR,
    libraryTarget: 'umd',
  },
   module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-2', 'react']
          }
        }
      },
      {
      test: /\.css$/,
        use: ExtractTextPlugin.extract(['css-loader'])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.[chunkhash:6].css',
      allChunks: true
    }),
    new StaticSiteGeneratorPlugin({
        paths: [
            '/',
            '/page1',
            '/page2'
        ],
        locals: { }
    })
  ]

}
