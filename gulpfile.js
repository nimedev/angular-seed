/**
 * gulp tasks
 * Build sass and js files in real time.
 * Prepare app for distribution int dist folder.
 */
/** core modules */

/** npm modules */
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var del = require('del');
var gulp = require('gulp');
var historyApiFallback = require('connect-history-api-fallback');
var runSequence = require('run-sequence');

/** others modules. */
var config = require('./gulpconfig');
var expressConfig = require('./config');

// variables
var cdnizerArray = config.cdnizer;
var paths = config.paths;

/** Config de autoprefixer. CSS compatibility */
var AUTOPREFIXER_BROWSERS = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

/**
 * CLEAN TASKS 
 */
/** clean output directory */
gulp.task('clean', function () {
  del.sync(paths.clean);
});


/** 
 * BACK-END TASKS
 */
/** copy only necesary files for back-end */
gulp.task('copy-back', function () {
  return gulp.src(paths.back.src)
    .pipe(gulp.dest(paths.back.dest));
});

/** build back-end */
gulp.task('build-back', ['copy-back']);


/** 
 * FRONT-END TASKS
 */
/** copy images */
gulp.task('images', function () {
  return gulp.src(paths.front.src.images)
  // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(paths.front.dest.images));
});

/** build html */
gulp.task('html', function () {
  var opts = {
    collapseWhitespace: true,
    removeComments: true
  };
  return gulp.src(paths.front.src.html)
    .pipe($.htmlReplace({
      'js': {
        src: '',
        tpl: ''
      }
    }))
    .pipe($.cdnizer(cdnizerArray))
    .pipe($.htmlmin(opts))
    .pipe(gulp.dest(paths.front.dest.html));
});

/** copy front-end files that not are html, css, img or js  */
gulp.task('others', function () {
  return gulp.src(paths.front.src.others)
    .pipe(gulp.dest(paths.front.dest.others));
});

/** put all *.js files in one min.js file in dist dir */
gulp.task('scripts', function () {
  return scripts(paths.front.dest.scripts);
});

/** put all *.scss files in one min.css file and compile in dist dir  */
gulp.task('styles', function () {
  return styles(paths.front.dest.styles);
});

/** build all front-end */
gulp.task('build-front', ['images', 'html', 'others', 'scripts', 'styles']);


/** 
 * WATCH AND RELOAD TASKS 
 */
/** put all *.js files in one min.js file in source dir*/
gulp.task('watch-scripts', function () {
  return scripts(paths.front.watch.dest.scripts, {
    normal: true
  });
});

/** put all *.scss files in one min.css file and compile in source dir */
gulp.task('watch-styles', function () {
  return styles(paths.front.watch.dest.styles);
});

/** watch scripts and styles */
gulp.task('watch', ['watch-scripts', 'watch-styles'], function () {
  // watch for changes in script files
  gulp.watch(paths.front.watch.scripts, ['watch-scripts']);

  // watch for changes in styles files
  gulp.watch(paths.front.watch.sass, ['watch-styles']);
});

/** put all *.js files in one min.js file in source dir and reload browser */
gulp.task('reload-scripts', function () {
  return scripts(paths.front.watch.dest.scripts, {
    normal: true,
    reload: true
  });
});

/** put all *.scss files in one min.css file and compile in source dir and reload browser */
gulp.task('reload-styles', function () {
  return styles(paths.front.watch.dest.styles, {
    reload: true
  });
});

/** watch with browser reload */
gulp.task('server', ['watch-scripts', 'watch-styles'], function () {
  // config browser-sync module
  browserSync.init({
    open: false,
    port: expressConfig.port,
    server: {
      baseDir: 'public',
      middleware: [historyApiFallback()],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  // watch for changes in script files
  gulp.watch(paths.front.watch.scripts, ['reload-scripts']);

  // watch for changes in styles files
  gulp.watch(paths.front.watch.sass, ['reload-styles']);

  // watch for changes to reload browsers
  gulp.watch(paths.front.watch.others).on('change', browserSync.reload);
});


/** 
 * DEFAULT TASK 
 */
gulp.task('default', function (cb) {
  del.sync(paths.clean);
  runSequence(['copy-back', 'build-front'], cb);
});


/** HELPER FUNCTIONS */
/**
 * process javascript files according to dest path.
 * @param {String} dest - destination path.
 * @param {Object} options - options object:
 *        options: {uglify: indicate if uglify, reload: indicate if use browser-sync}
 */
function scripts(dest, options) {
  var task = gulp.src(paths.front.src.scripts)
    .pipe($.concat('main.min.js'));

  // check if uglify
  if (!options || !options.normal) {
    task = task.pipe($.uglify());
  }

  // destination folder
  task = task.pipe(gulp.dest(dest));

  // check if reload browser
  if (options && options.reload) {
    task.pipe(browserSync.stream());
  }

  // return task
  return task;
}

/**
 * compile sass files according to dest path.
 * @param {String} dest - destination path.
 * @param {Object} options - options object:
 *        options: {uglify: indicate if uglify, reload: indicate if use browser-sync}
 */
function styles(dest, options) {
  var task = gulp.src(paths.front.src.styles)
    .pipe($.sass().on('error', function (err) {
      console.log(err.toString());
      this.emit('end');
    }))
    .pipe($.if(config.autoprefixer, $.autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })))
    .pipe($.if(config.mergeMediaQueries, $.mergeMediaQueries()))
    .pipe($.if(config.minifyCss, $.cssnano()))
    .pipe($.rename('style.min.css'))
    .pipe(gulp.dest(dest));

  // check if reload browser
  if (options && options.reload) {
    task.pipe(browserSync.stream());
  }

  // return task
  return task;
}
