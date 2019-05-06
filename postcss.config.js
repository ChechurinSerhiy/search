const postcssReporter = require('postcss-reporter');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = () => ({

	plugins: [
		autoprefixer({
			browsers: ['last 5 versions', '> 1%']
		}),
		postcssReporter(),
		cssnano({
			discardComments: {
				removeAll: true
			},
			autoprefixer: false,
			zindex: false,
			normalizeUrl: false
		})
	]
});
