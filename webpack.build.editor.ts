import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

import {Configuration} from "webpack";
import {merge} from "webpack-merge";
import common from "./webpack.config";
import webpack from "webpack";

export default merge<Configuration>(common, {
    mode: "production",
    entry: {
        editor: "./src/editor.ts",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./build"),
        publicPath: "./",
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new CopyWebpackPlugin({
            patterns: [{from: "./public/", to: "./"}],
        }),
    ],
});