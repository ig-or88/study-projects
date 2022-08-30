// gulp-changed - понадобится нам для отслеживания изменения в файле. Если файл не изменился, дальнейшие действия с ним не производятся.
// gulp-multi-dest - понадобится нам для складывания результатов обработки в несколько директорий.
// gulp-imagemin - сжимает изображения
// imagemin-jpeg-recompress - тоже сжимает изображения
// imagemin-pngquant - и этот тоже сжимает изображения
// gulp-webp - конвертирует растровые форматы (png, jpeg) в webp
// gulp-svgmin - сжимает svg
// gulp-svg-css-pseudo - добавляет svg фоном в css и сразу же создаёт псевдоэлементы
// gulp-svg-sprite - склеивает все svg в один спрайт. Лично я им пользуюсь крайне редко, но это ввиду особенностей проектов. Вообще весьма полезен для снижения запросов к серверу.
const {
	src,
	dest
} = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const recompress = require('imagemin-jpeg-recompress');
const pngquant = require('imagemin-pngquant');
const bs = require('browser-sync');
const plumber = require('gulp-plumber');

module.exports = function rastr() {
	return src('src/img/**/*.+(png|jpg|jpeg|gif|svg|ico)')
		.pipe(plumber())
		.pipe(changed('build/img'))
		.pipe(imagemin({
				interlaced: true,
				progressive: true,
				optimizationLevel: 5,
			},
			[
				recompress({
					loops: 6,
					min: 50,
					max: 90,
					quality: 'high',
					use: [pngquant({
						quality: [0.8, 1],
						strip: true,
						speed: 1
					})],
				}),
				imagemin.gifsicle(),
				imagemin.optipng(),
				imagemin.svgo()
			], ), )
		.pipe(dest('build/img'))
		.pipe(bs.stream())
}
