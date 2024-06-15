import fileInclude from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import prettyHtml from 'gulp-pretty-html';

export const html = () => {
	return app.gulp
		.src(app.path.src.html)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'HTML',
					message: 'Error: <%= error.message %>'
				})
			)
		)
		.pipe(fileInclude())
		.pipe(app.plugins.replace(/@img\//g, 'img/'))
		.pipe(app.plugins.ifPlugin(app.isBuild, webpHtmlNosvg()))
		.pipe(
			app.plugins.ifPlugin(
				app.isBuild,
				versionNumber({
					value: '%DT%',
					append: {
						key: '_v',
						cover: 0,
						to: ['css', 'js']
					},
					output: {
						file: 'gulp/version.json'
					}
				})
			)
		)
		.pipe(app.plugins.ifPlugin(app.isBuild, prettyHtml()))
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browserSync.stream());
};
