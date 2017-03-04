var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/main/javascript/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        loaders: [
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
      title: 'project',
      template: path.resolve(__dirname, 'src/main/javascript/index_template.html')})]
};
