var webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/main',
        vendor: ['react', 'react-dom']
    },
    output: {
        path: './assets',
        publicPath: './assets',
        filename: '[name].b.js'
    },
    devtool: "source-map",
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ],

        preLoaders: [
            {
                test: /\.js$/,
                loader: "source-map-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'Common.js'
        })
    ]
};