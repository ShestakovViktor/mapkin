const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");


/** @type {import("webpack").Configuration} */
const config = {
	mode: "production",
	entry: {
		viewer: "./src/viewer.js",
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "./build")
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "/src/index.html",
			filename: "viewer.html"
		}),
	]
};

module.exports = merge.merge(common, config);