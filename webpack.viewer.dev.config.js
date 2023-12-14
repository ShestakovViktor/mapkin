const merge = require("webpack-merge");
const common = require("./webpack.config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");


/** @type {import("webpack").Configuration} */
const config = {
	mode: "development",
	entry: {
		viewer: "./src/viewer.js",
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "/src/index.html",
			filename: "index.html",
		}),
	],
	devtool: "inline-source-map",
	devServer: {
		port: 3000,
		hot: true,
		compress: true,
	},
};

module.exports = merge.merge(common, config);