const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');



const rules = [
    {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader', 'sass-bulk-import-loader']
        })
    },
    {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['env']
            }
        }
    }
];
const plugins = [
    new ManifestPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
        title: 'Layout',
        template: './src/index.html'
    }),
    new ExtractTextPlugin('css/main.css')
];

module.exports = {
    entry: {
        app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: rules
    },
    plugins: plugins
};
