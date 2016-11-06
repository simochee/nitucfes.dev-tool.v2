var webpack = require('webpack');

module.exports = {
	watch: true,
	entry: './src/scripts/entry.js',
	output: {
		path: __dirname + '/docs/scripts',
		filename: 'bundle.js',
		publicPath: '/docs/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015'],
					cacheDirectory: true
				}
			}
		]
	},
	resolve: {
		extensions: ['', '.js']
	},
	plugins: [
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery'
		})
	],
	devtool: 'inline-source-map'
}