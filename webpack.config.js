const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinimizerCssAssetsWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}

	if (!isDev) {
		config.minimizer = [
			new MinimizerCssAssetsWebpackPlugin(),
			new TerserWebpackPlugin()
		]
	}

	return config
}

const cssLoaders = extra => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {},
		},
		"css-loader",
	]
	if (extra) {
		loaders.push(extra)
	}
	return loaders
}

const babelOptions = preset => {
	const opts = {
		presets: [
			'@babel/preset-env'
		],
		plugins: [
			//здесь плагины
		]
	}

	if (preset) {
		opts.presets.push(preset);
	}

	return opts;
}

const plugins = () => {
	const base = [
		new HTMLWebpackPlugin({
			template: "./index.html",
			minify: {
				collapseWhitespace: !isDev
			}
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/assets/favicon.ico'),
					to: path.resolve(__dirname, 'dist')
				},
			],
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		})
	]

	if (!isDev) {
		base.push(new BundleAnalyzerPlugin());
	}

	return base;
};

//определяет какой режим сборки запущен
const isDev = process.env.NODE_ENV === 'development';
console.log("IS DEV:", isDev);

module.exports = {
	context: path.resolve(__dirname,'src'),
	mode: 'development',
	entry: {
		main: ['@babel/polyfill','./index.jsx'],
		analytics: './analytics.js',
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.js', '.json', '.png'],
		alias: {
			'@src': path.resolve(__dirname, 'src'),
		},
	},
	// devtool: isDev ? 'source-map' : '',
	plugins: plugins(),
	module: {
		rules: [
			{
				test: /\.css$/,
				use: cssLoaders(),
			},
			{
				test: /\.s[ac]ss$/,
				use: cssLoaders('sass-loader'),
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				type: 'asset/resource'
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				type: 'asset/resource'
			},
			{
				test: /\.xml$/,
				use: ['xml-loader']
			},
			{
				test: /\.csv$/,
				use: ['csv-loader']
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelOptions()
				},
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: babelOptions('@babel/preset-typescript')
				}
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: babelOptions('@babel/preset-react')
				}
			}
		]
	},
	optimization: optimization(),
	devServer: {
		static: {
			directory: path.join(__dirname, 'src'),
		},
		compress: true,
		port: 9000,
		hot: isDev
	},
};