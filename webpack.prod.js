const {merge} = require("webpack-merge");
const path = require("path");

const common = require("./webpack.common.js");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
	mode: "production",
	output: {
		path: path.resolve(__dirname, "./build"),
		publicPath: "./",
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [{from: "./public/", to: "./"}]
		}),
		new HtmlWebpackPlugin({
			template: "/src/index.html",
		}),
	],
});
