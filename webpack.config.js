const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' ),
	merge = require( 'webpack-merge' ),
	mode = process.env.NODE_ENV || 'development';

const fileSuffix = 'development' === mode ? '' : '.min';

const commonConfig = {
	mode,
	devtool: 'source-map',
	plugins: [
		new MiniCssExtractPlugin( {
			filename: '../css/eGallery' + fileSuffix + '.css',
		} ),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: 'pre',
				loader: 'eslint-loader',
				options: {
					failOnError: true,
				},
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					presets: [ '@babel/preset-env' ],
				},
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							data: '$prefix: e-gallery;',
						},
					},
				],
			},
		],
	},
};

const libraryConfig = {
	entry: './src/js/eGallery.js',
	output: {
		path: __dirname + '/dist/js',
		filename: `eGallery${ fileSuffix }.js`,
		library: 'EGallery',
		libraryExport: 'default',
	},
};

const jQueryConfig = {
	entry: './src/js/jquery-eGallery.js',
	output: {
		path: __dirname + '/dist/js',
		filename: `jquery-eGallery${ fileSuffix }.js`,
	},
};

module.exports = [ merge( commonConfig, libraryConfig ), merge( commonConfig, jQueryConfig ) ];
