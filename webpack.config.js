const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
    entry: {
        web: './src/web.js',
        extension: './src/extension.js'
    },
    output: {
        filename: './[name].js',
	path: path.resolve(__dirname, 'docs'),
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loaders: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif|json|ttf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: './',
                    emitFile: false,
                },
            }
        ]
    },

    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        })
    ]
};
