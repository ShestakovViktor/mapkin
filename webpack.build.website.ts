import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

import {Configuration} from "webpack";
import {merge} from "webpack-merge";
import common from "./webpack.config";

export default merge<Configuration>(common, {
    mode: "production",
    entry: {
        website: "./src/website.tsx",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./build"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/website.html",
            filename: "website.html",
            minify: false,
        }),
    ],
});
