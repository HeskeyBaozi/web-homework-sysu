'use strict';

const webpack = require('webpack');
const myPackage = require('./package.json');
const banner = `${myPackage.name} ${myPackage.version} - ${myPackage.description}\nCopyright (c)`
    + ` ${ new Date().getFullYear() } ${myPackage.author} - ${myPackage.homepage}\nLicense: ${myPackage.license}`;

module.exports = {
    context: __dirname,
    entry: {
        bundle: './src/index.js'
    },
    output: {
        path: './public/js',
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
    plugins: [
        new webpack.BannerPlugin(banner)
    ],
    externals: {
        jquery: 'jQuery',
        lodash: '_'
    },
    devtool: '#source-map'
};