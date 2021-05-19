const path = require("path");

module.exports = {
    entry: "./src/layout/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./dist"),
        clean: true
    },
    mode: "development",
    devServer: {
        open: false,
        port: 8080,
        hot: false,
        writeToDisk: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/env"],
                },
            },
        ],
    },
};