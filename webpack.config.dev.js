const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const webpack = require('webpack');
const path = require('path');
module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        contentBase: path.resolve(__dirname, 'app'),
        inline: true,

        host: 'localhost', // Defaults to `localhost`
        port: 8080, 
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000',
                secure: false
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({ multiStep: true }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: 'react-hot-loader'
            }
        ]
    }
});