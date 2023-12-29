import path from "path";
import TsconfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";

export default {
    stats: {
        errorDetails: true,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                loader: "svg-inline-loader",
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                auto: /\.module\.scss$/,
                                mode: "local",
                                localIdentName: "[local]_[hash:base64:6]",
                                exportLocalsConvention: "camelCase",
                            },
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                includePaths: [
                                    path.join(__dirname, "src/style"),
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },

    resolve: {
        extensions: [".ts", ".js"],
        plugins: [new TsconfigPathsWebpackPlugin()],
    },
};
