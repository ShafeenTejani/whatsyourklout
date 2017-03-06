var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/main/javascript/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
      rules: [
           {
             test: /\.less$/,
             use: ExtractTextPlugin.extract({
               fallback: 'style-loader',
               //resolve-url-loader may be chained before sass-loader if necessary
               use: ['css-loader', 'less-loader']
             })
           },
           {
               test: /\.js$/,
               exclude: /node_modules/,
               loader: 'babel-loader',
               query: {
                   presets: ['es2015', 'react']
               }
           }
        ]
      },
    devServer: {
      proxy: {
        '/api/*': 'http://localhost:8000/'
      }
    },
    plugins: [new HtmlWebpackPlugin({
      title: "What's Your Klout?",
      favicon: path.resolve(__dirname, 'src/main/images/favicon.ico'),
      template: path.resolve(__dirname, 'src/main/javascript/index_template.html')}),
      new ExtractTextPlugin( "bundle.css" )
    ]
};
