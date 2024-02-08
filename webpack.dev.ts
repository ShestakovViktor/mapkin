import HtmlWebpackPlugin from "html-webpack-plugin";
import {
    Configuration as WebpackConfiguration,
} from "webpack";
import {
    Configuration as WebpackDevServerConfiguration,
} from "webpack-dev-server";
import {merge} from "webpack-merge";
import common from "./webpack.config";
import webpack from "webpack";

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

export default merge<Configuration>(common, {
    mode: "development",
    entry: {
        editor: "/src/editor.ts",
    },
    output: {
        filename: "[name].[fullhash].js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "/src/index.html",
        }),
    ],
    devtool: "inline-source-map",
    devServer: {
        port: 3000,
        hot: true,
        compress: true,
        static: ["./build", "./public"],
    },
});