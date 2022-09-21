const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('dotenv').config();

module.exports = {
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'index.bundle.js',
	},
	devServer: {
		port: process.env.PORT,
		historyApiFallback: true,
		disableHostCheck: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(.css|scss)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|tiff)$/,
				use: ['file-loader?name=assets/[name].[ext]'],
			},
		],
	},
	plugins: [new MiniCssExtractPlugin()],
};
