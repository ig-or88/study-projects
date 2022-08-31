const {
  src,
  dest
} = require('gulp');

module.exports = function woff(done) {
  return src('src/fonts/**/*.{woff,woff2}')
    .pipe(dest('build/fonts'))
  done();
}
