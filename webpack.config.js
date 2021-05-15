const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const mode = process.env.NODE_ENV;
const isDev = mode === 'development';
const generateFileName = ext => (isDev ?
    `[name].${ext}` :
    `[name].[contenthash].${ext}`);

module.exports = {
    entry: {
        main: './index.js',
    },
    output: {
        filename: `./scripts/${generateFileName('js')}`,
        path: path.resolve(__dirname, 'build'),
        clean: true,
        environment: {
            arrowFunction: false
        }
    },
    mode,
    context: path.resolve(__dirname, 'src/layout'),
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: !isDev,
            }
        }),
        new MiniCssExtractPlugin({
            filename: `./css/${generateFileName('css')}`,
        }),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: '',
        //             to: ''
        //         }
        //     ]
        // })
    ],
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        }
                    },
                    'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|ttf)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }
            },
            {
                test: /\.html$/i,
                use: ['html-loader']
            }
        ]
    },
    devServer: {
        contentBase: './build',
        open: true,
        port: 8080,
        hot: true,
        compress: true,
        overlay: true,
        writeToDisk: false,
        historyApiFallback: true,
    },
    devtool: isDev && 'source-map'
};
