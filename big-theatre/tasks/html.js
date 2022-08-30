const {
	src,
	dest
} = require('gulp');
const include = require('gulp-file-include');
const bs = require('browser-sync');

module.exports = function html() {
	return src(['src/**/*.html', '!src/components/**/*.html'])
		.pipe(include())
		.pipe(dest('build'))
		.pipe(bs.stream())
}
// берём все файлы html 'src/**/*.html', но только не те, которые '!src/components/**/*.html' находятся в директории src/components. В дальнейшем это позволит нам создавать файлы модулей, которые не должны попасть в build директорию, а служат, так сказать, служебными шаблонами
