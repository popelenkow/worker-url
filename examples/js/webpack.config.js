/** @typedef {import("webpack").Configuration} Configuration */
/** @typedef {import("webpack-dev-server").Configuration} DevServerConfiguration */

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const WorkerUrlPlugin = require('worker-url/plugin');
const WorkerUrlPackage = require('./node_modules/worker-url/package.json');

const createConfig = (env) => {
	/** @type {Configuration} */
	const common = {
		entry: {
			index: './src/index.js',
		},
		resolve: {
			extensions: [".js"],
		},
		output: {
			publicPath: '/',
			path: path.resolve(__dirname, "dist"),
			filename: "[name].js",
		},
		plugins: [
			new WorkerUrlPlugin(),
			new webpack.DefinePlugin({
				'process.env': {
					WorkerUrlVersion: JSON.stringify(WorkerUrlPackage.version),
				},
			}),
			new CopyPlugin({
				patterns: [
					{ from: './src/index.html', to: './index.html' },
					{ from: './src/favicon.ico', to: './favicon.ico' },
				],
			}),
		],
		stats: { modules: false, children: false, entrypoints: false },
	};
	
	/** @type {Configuration} */
	const specific = env.dev ? {
		mode: 'development',
		/** @type {DevServerConfiguration} */
		devServer: {
			port: 3000,
		},
		plugins: [
			new webpack.ProgressPlugin(),
		],
		stats: { assets: false },
	} : {
		mode: 'production',
	};

	return merge(common, specific);
};

module.exports = createConfig;