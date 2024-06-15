// Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist';
const srcFolder = './src';

export const path = {
	build: {
		html: `${buildFolder}/`,
		css: `${buildFolder}/css/`,
		js: `${buildFolder}/js/`,
		images: `${buildFolder}/img/`,
		files: `${buildFolder}/files/`,
		fonts: `${buildFolder}/fonts/`
	},
	src: {
		html: `${srcFolder}/*.html`,
		scss: `${srcFolder}/scss/style.scss`,
		js: `${srcFolder}/js/script.js`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,webp}`,
		svg: `${srcFolder}/img/**/*.svg`,
		files: `${srcFolder}/files/**/*.*`
	},
	watch: {
		html: `${srcFolder}/**/*.html`,
		scss: `${srcFolder}/scss/**/*.scss`,
		js: `${srcFolder}/js/**/*.js`,
		images: `${srcFolder}/img/**/*.*`,
		files: `${srcFolder}/files/**/*.*`
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder
};
