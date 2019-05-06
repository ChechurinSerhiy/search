import { join } from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';

const PATHS = {
	root: __dirname,
	src: join(__dirname, 'src'),
	dist: join(__dirname, 'build'),
	static: join(__dirname, 'static')
};

module.exports = {
  name: 'client',
	target: 'web',
  context: PATHS.root,
	resolve: {
		modules: [PATHS.src, PATHS.static, 'node_modules', `${PATHS.static}/images`],
		extensions: ['.js', '.scss']
	},
  entry: {
    app: `${PATHS.src}/client`
  },
  output: {
    filename: '[name].bundle.js',
    path: PATHS.dist
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(js)$/,
				include: [PATHS.src],
				exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        }
      },
			{
        test: /\.scss$/,
				include: [PATHS.src, PATHS.static],
        use: [
					{
	          loader: 'style-loader'
	        },
					{
	          loader: 'css-loader',
						options: {
              sourceMap: true,
              localIdentName: '[local]__[hash:base64:5]'
            }
	        },
					'postcss-loader',
					{
	          loader: 'sass-loader',
						options: {
              sourceMap: false
            }
	        }
				]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
}
