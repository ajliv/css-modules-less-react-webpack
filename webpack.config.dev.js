const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = {
    debug: true,
    devtool: '#eval',
    entry: [
    	'webpack-hot-middleware/client?reload=true',
    	path.join(src, 'index.js')
    ],
    output: {
        path: dist,
        publicPath: '',
        filename: 'scripts.js'
    },
    plugins: [
    	new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new ExtractTextPlugin('styles.css'),
        new HTMLWebpackPlugin({ template: path.join(src, 'template.html') })
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
