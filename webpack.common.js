const path = require("path");

module.exports = {
	entry: {
		app: "./src/app.js",
	},
	output: {
		filename: "[name].[fullhash].bundle.js",
	},
	stats: {
		errorDetails: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: {
								auto: /\.m\.css$/,
								mode: "local",
								localIdentName: "[local]_[hash:base64:6]",
								exportLocalsConvention: "camelCase",
							},
						},
					},
					"postcss-loader",
				],
			},
		],
	},
	resolve: {
		extensions: [".js"],
		alias: {
			"@core": path.resolve(__dirname, "src/core/"),
			"@module": path.resolve(__dirname, "src/core/module/"),
			"@driver": path.resolve(__dirname, "src/core/driver/"),
			"@math": path.resolve(__dirname, "src/core/math/"),
			"@gui": path.resolve(__dirname, "src/gui/"),
		},
	}
};
