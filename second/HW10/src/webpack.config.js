const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'none',
    entry: './js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    optimization: {
        minimize: true
    },
    resolve: {
        modules: [
            path.resolve(__dirname, './'),
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                type: 'asset/resource',
                generator: {
                    filename: '[name].css'
                },
                use: ['sass-loader']
            }

        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html'
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 3000
    }
}