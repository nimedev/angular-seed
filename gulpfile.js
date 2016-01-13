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
var flags = config.flags;
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
 * FRONT-END TASKS
 */
/** copy i18n files */
gulp.task('i18n', function () {
  return i18nTask();
});

/** copy images */
gulp.task('images', function () {
  return optimizeImageTask();
});

/** build html */
gulp.task('html', function () {
  return optimizeHtmlTask();
});

/** put all *.js files in one min.js file in dist dir */
gulp.task('scripts', function () {
  return scriptsTask();
});

/** put all *.scss files in one min.css file and compile in dist dir  */
gulp.task('styles', function () {
  return styles();
});

/** build all front-end */
gulp.task('build:front', ['i18n', 'images', 'html', 'scripts', 'styles']);


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
 * copy json files for multi-language in dist folder.
 * @param {Boolean} reload - indicate if use browser-sync 
 */
function i18nTask(reload) {
  del.sync(paths.front.i18n.clean);
  return gulp.src(paths.front.i18n.src)
    .pipe(gulp.dest(paths.front.i18n.dest))
    .pipe($.size({ title: 'i18n' }))
    .pipe($.if(reload, browserSync.stream()));
}

/**
 * optimize images and copy in dist folder.
 * @param {Boolean} reload - indicate if use browser-sync
 */
function optimizeImageTask(reload) {
  del.sync(paths.front.images.clean);
  return gulp.src(paths.front.images.src)
  // .pipe($.imagemin({
  //   progressive: true,
  //   interlaced: true
  // }))
    .pipe(gulp.dest(paths.front.images.dest))
    .pipe($.size({ title: 'images' }))
    .pipe($.if(reload, browserSync.stream()));
}

/**
 * Optimize html files and copy in dist folder.
 * @param {Boolean} reload - indicate if use browser-sync
 */
function optimizeHtmlTask(reload) {
  del.sync(paths.front.html.clean);
  return gulp.src(paths.front.html.src)
    .pipe($.htmlReplace({
      'js': {
        src: '',
        tpl: ''
      }
    }))
    .pipe($.if(flags.offline, $.cdnizer(cdnizerArray)))
    .pipe($.htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(paths.front.html.dest))
    .pipe($.size({ title: 'html' }))
    .pipe($.if(reload, browserSync.stream()));
}

/**
 * Process javascript files and copy the resulting file in dist folder.
 * @param {Boolean} reload - indicate if use browser-sync
 * @param {Boolean} normal - indicate if no uglify the resulting file
 */
function scriptsTask(reload, normal) {
  del.sync(paths.front.scripts.clean);
  return gulp.src(paths.front.scripts.src)
    .pipe($.concat('main.min.js'))
    .pipe(gulp.dest('.tmp/' + paths.front.scripts.dest))
    .pipe($.if(!normal, $.uglify()))
    .pipe(gulp.dest(paths.front.scripts.dest))
    .pipe($.size({ title: 'scripts' }))
    .pipe($.if(reload, browserSync.stream()));
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
    .pipe($.if(flags.autoprefixer, $.autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })))
    .pipe($.if(flags.mergeMediaQueries, $.mergeMediaQueries()))
    .pipe($.if(flags.minifyCss, $.cssnano()))
    .pipe($.rename('style.min.css'))
    .pipe(gulp.dest(dest));

  // check if reload browser
  if (options && options.reload) {
    task.pipe(browserSync.stream());
  }

  // return task
  return task;
}
