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
				test: /\.svg$/,
				loader: "svg-inline-loader"
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
									path.join(__dirname, "src/style")
								],
							}
						}
					}
				],
			},
		],
	},
	resolve: {
		extensions: [".js"],
		alias: {
			"@src": path.resolve(__dirname, "src/"),
			"@style": path.resolve(__dirname, "src/style/"),
			"@type": path.resolve(__dirname, "src/type/"),
			"@public": path.resolve(__dirname, "public/"),
		},
	}
};
