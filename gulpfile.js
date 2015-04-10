var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var connect = require('gulp-connect');

var path = {
  HTML: 'src/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/app.js',
  CSS_SRC: './src/css/style.css',
  CSS_DEST: 'dist/style'
};

gulp.task('copy', function() {
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));

  gulp.src(path.CSS_SRC)
    .pipe(gulp.dest(path.CSS_DEST));
});

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fuggllPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC))
    console.log('Updated');
  })
  .bundle()
  .pipe(source(path.OUT))
  .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('connect', function() {
  connect.server({
    root: "dist"
  });
});

gulp.task('default', ['watch', 'connect']);
