// Общие плагины
import { deleteAsync } from 'del'; // Удаление папой
import plumber from 'gulp-plumber'; // Обработка ошибок
import notify from 'gulp-notify'; // Уведомления
import browserSync from 'browser-sync'; // Локальный сервер
import newer from 'gulp-newer'; // Проверка обновлений (обновились ли файлы)
import ifPlugin from 'gulp-if'; // Условное ветвление
import replace from 'gulp-replace'; // replace

export const plugins = {
	del: deleteAsync,
	plumber: plumber,
	notify: notify,
	browserSync: browserSync,
	newer: newer,
	ifPlugin: ifPlugin,
	replace: replace
};
