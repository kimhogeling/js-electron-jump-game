var gulp = require('gulp');
var haml = require('gulp-haml');

gulp.task('haml_into_html', () => {
  gulp.src('src/index.haml')
    .pipe(haml())
    .pipe(gulp.dest('gulped'));
});

gulp.task('default', () => gulp.run('haml_into_html'));
