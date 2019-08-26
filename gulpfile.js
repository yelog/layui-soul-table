const gulp = require('gulp')
const uglify = require('gulp-uglify')

gulp.task('build_js', () => {
  return gulp.src('ext/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('docs/ext'))
})
