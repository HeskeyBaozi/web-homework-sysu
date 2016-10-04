'use strict';

module.exports = {
    context: __dirname,
    entry: {
        calc: './src/index.js'
    },
    output: {
        path: './assets/js',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    devtool: '#source-map'
};