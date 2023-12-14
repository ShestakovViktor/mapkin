const {merge} = require("webpack-merge");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const common = require("./webpack.config.js");

/** @type {import("webpack").Configuration} */
const config = {
	mode: "production",
	entry: {
		editor: "./src/editor.js",
	},
	output: {
		filename: "[name].[fullhash].bundle.js",
		path: path.resolve(__dirname, "./build"),
		publicPath: "./",
		clean: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "/src/index.html",
		}),
		new CopyWebpackPlugin({
			patterns: [{from: "./public/", to: "./"}]
		}),
	],
};

module.exports = merge(common, config);