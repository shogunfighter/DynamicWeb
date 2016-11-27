var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var compassIncludes = "includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib");

module.exports = {
	devtool: 'cheap-module-source-map',
	context: path.join(__dirname, 'src'),
	entry: {
		app:  './app.js'
		//,
		//about: './about/about.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	module: {
		////test processor
		//preLoaders: [
		//	{
		//		test: /\.js$/, // include .js files
		//		include: path.join(__dirname, 'src'),
		//		loader: "jshint-loader"
		//	}
		//],

        // problems with webpack
		//preLoaders: [
		//	// Javascript
		//	{
		//		test: /\.js$/,
		//		loader: 'eslint-loader',
		//		include: path.join(__dirname, 'src')
		//	}
		//],

		loaders: [
			// style processor
			//
			// sequence: (right to left)
			// 	1. (sass) tagets scss files will be converted to css,
			// 	2. (postcss) will apply prefix to make it compatible to most systems
			// 	3. (css) strips css into a file
			// 	4. (style) minify the css
			// 	Others. (compass mixins)
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: "style-loader",
					loader: "css-loader!sass-loader?"+compassIncludes
				}),

				//loader: "style!css",
				//loader: "style!css!postcss!sass?" + compassIncludes,
				include: path.join(__dirname, 'src')
				// exclude: /node_modules/
			},

			// javascript processor
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: path.join(__dirname, 'src')
				// exclude: /node_modules/
			}
		]
	},

	// problems with webpack
	//eslint: {
	//	failOnWarning: false,
	//	failOnError: true
	//},



	//// more options in the optional jshint object
	//jshint: {
	//	// any jshint option http://www.jshint.com/docs/options/
	//	// i. e.
	//	camelcase: true,
    //
	//	// jshint errors are displayed by default as warnings
	//	// set emitErrors to true to display them as errors
	//	emitErrors: false,
    //
	//	// jshint to not interrupt the compilation
	//	// if you want any file with jshint errors to fail
	//	// set failOnHint to true
	//	failOnHint: false,
    //
	//	//// custom reporter function
	//	//reporter: function(errors) { }
	//},

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		inline: true,
		stats: {
			colors: true,
			reasons: true,
			chunks: false
		}
	},
	plugins: [

		new ExtractTextPlugin('style.css'),

		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'index.html'),
			hash: true,
			filename: 'index.html',
			chunks: ['app']
		})
	]

	//watch: true
};