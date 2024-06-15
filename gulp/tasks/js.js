import webpack from 'webpack-stream';

export const js = () => {
	return app.gulp
		.src(app.path.src.js, { sourcemaps: app.isDev })
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'JS',
					message: 'Error: <%= error.message %>'
				})
			)
		)
		.pipe(
			webpack({
				mode: app.isDev ? 'development' : 'production',
				output: {
					filename: 'script.min.js'
				},
				module: {
					rules: [
						{
							test: /\.(sass|less|css)$/,
							use: ['style-loader', 'css-loader', 'sass-loader']
						}
					]
				}
			})
		)
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plugins.browserSync.stream());
};
