const gulp = require('gulp');
const babel = require('gulp-babel');
const minify = require('gulp-minify');

gulp.task('compile', () =>
  gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(minify({
      ext: {
        src: '.js',
        min: '.min.js'
      }
    }))
    .pipe(gulp.dest('dist'))
);

gulp.task("watch", function () {
  // log("Watching JS files for modifications");
  gulp.watch('src/**/*.js', ["compile"]);
});

gulp.task("default", ["compile", "watch"]);
