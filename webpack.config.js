const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
    entry: {
        main: resolve("src/index.js")
    },
    output: {
        path: resolve("dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(htm|html)$/,
                use: {
                    loader: 'raw-loader'
                }
            },
            {
                test: /\.(less|css)$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {}
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    {loader: 'less-loader'}
                ]


            }
        ]
    },
    devServer: {
        contentBase: "dist",
        open: true,
        hot: true,
        port: 3000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ]
};