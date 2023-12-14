const {merge} = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");



const common = require("./webpack.config.js");

/** @type {import("webpack").Configuration} */
const config = {
	mode: "development",
	entry: {
		editor: "./src/editor.js",
	},
	output: {
		filename: "[name].[fullhash].bundle.js",
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
	},


};

module.exports = merge(common, config);