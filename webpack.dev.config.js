const path = require("path");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: "./src/layout/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true
  },
  mode: "development",
  devServer: {
    open: true,
    port: 8080,
    hot: false,
    writeToDisk: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
//   plugins: [
//     new CleanWebpackPlugin(),
//   ],
};