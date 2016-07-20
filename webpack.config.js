const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = {
    debug: true,
    devtool: '#source-map',
    entry: path.join(src, 'index'),
    output: {
        path: dist,
        filename: 'scripts.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.DedupePlugin(),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            minimize: true,
            sourceMap: true
        })
    ],
    resolve: {
        extensions: [
            '',
            '.js',
            '.jsx'
        ],
        modulesDirectories: [
            'node_modules',
            'src'
        ]
    },
    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            include: src,
            loader: 'eslint'
        }],
        loaders: [{
            test: /\.css$/,
            include: src,
            loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[folder]__[local]___[hash:base64:5]!postcss')
        }, {
            test: /\.less$/,
            include: src,
            loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[folder]__[local]___[hash:base64:5]!postcss!less')
        }, {
            test: /\.jsx?$/,
            include: src,
            loader: 'babel'
        }]
    },
    postcss: () => [
        require('autoprefixer')()
    ]
};
