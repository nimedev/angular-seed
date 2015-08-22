var del = require('del'),
  gulp = require('gulp'),
  cdnizer = require('gulp-cdnizer'),
  concat = require('gulp-concat'),
  htmlReplace = require('gulp-html-replace'),
  jshint = require('gulp-jshint'),
  minifycss = require('gulp-minify-css'),
  minifyHTML = require('gulp-minify-html'),
  uglify = require('gulp-uglify'),
  runSequence = require('run-sequence'),
  cdnizerArray = require('./cdnizer.json')
  config = require('./gulpconfig.json');

// Clean output directory
gulp.task('clean', function(cb) {
  del(config.clean, cb);
});

// Copy all back-end files at the root level (app)
gulp.task('copy-back', function() {
  return gulp.src(config.back.src)
    .pipe(gulp.dest(config.back.dest));
});

// Copy front-end files that not are html, css, img or js
gulp.task('copy-front', function() {
  return gulp.src(config.front.src.others)
    .pipe(gulp.dest(config.front.dest.others));
});

// Styles
gulp.task('styles', function() {
  return gulp.src(config.front.src.css)
    .pipe(concat('styles.min.css'))
    .pipe(minifycss())
    .pipe(gulp.dest(config.front.dest.css));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(config.front.src.scripts)
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.front.dest.scripts));
});

// Images
gulp.task('images', function() {
  return gulp.src(config.front.src.images)
    // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(config.front.dest.images));
});

gulp.task('html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src(config.front.src.html)
    .pipe(htmlReplace({
      'css': 'assets/css/styles.min.css',
      'js': 'assets/js/main.min.js'
    }))
    .pipe(cdnizer(cdnizerArray))
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(config.front.dest.html));
});

// build all front-end
gulp.task('build-front', ['copy-front', 'styles', 'scripts', 'images', 'html']);

// default task
gulp.task('default', ['clean'], function(cb) {
  runSequence(['copy-back', 'build-front'], cb);
});
