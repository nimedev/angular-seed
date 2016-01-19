/**
 * gulp tasks
 * Build sass and js files in real time.
 * Prepare app for distribution int dist folder.
 */
/** core modules */

/** npm modules */
var $ = require('gulp-load-plugins')();
var addStream = require('add-stream');
var browserSync = require('browser-sync').create();
var del = require('del');
var gulp = require('gulp');
var historyApiFallback = require('connect-history-api-fallback');
var runSequence = require('run-sequence');

/** others modules. */
var config = require('./gulpconfig');

// variables
var cdnizerArray = config.cdnizer;
var flags = config.flags;
var paths = config.paths;
var templateCache = config.templateCache;
var tasks;

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
gulp.task('clean', () => del.sync(paths.clean));


/**
 * FRONT-END TASKS
 */
/** Runs i18nTask without using browser-sync */
gulp.task('i18n', () => i18nTask());

/** Runs optimizeImageTask without using browser-sync */
gulp.task('images', () => optimizeImageTask());

/** Runs optimizeHtmlTask without using browser-sync */
gulp.task('html', () => optimizeHtmlTask());

/** Runs scriptsTask without using browser-sync */
gulp.task('scripts', ['lint'], () => scriptsTask());

/** Runs stylesTask without using browser-sync */
gulp.task('styles', () => stylesTask());

/** Lint JavaScript */
gulp.task('lint', () => {
  return gulp.src(paths.front.lint.src)
    .pipe($.if(flags.lintJscs, $.jscs()))
    .pipe($.if(flags.lintJscs, $.jscsStylish.combineWithHintResults()))
    .pipe($.if(flags.lintJshint, $.jshint()))
    .pipe($.if(flags.lintJshint, $.jshint.reporter('jshint-stylish')));
});

/** build all front-end */
gulp.task('build:front', ['i18n', 'images', 'html', 'scripts', 'styles']);


/**
 * WATCH TASKS
 */
/** Runs scriptsTask without using browser-sync and uglify */
gulp.task('scripts:watch', ['lint'], () => scriptsTask(false, true));

/** watch scripts and styles */
tasks = ['i18n', 'images', 'html', 'scripts:watch', 'styles'];
gulp.task('watch', tasks, () => {
  // watch for changes in i18n files
  $.watch(paths.front.i18n.watch,
    $.batch((events, done) => gulp.start('i18n', done)));
  
  // watch for changes in images
  $.watch(paths.front.images.watch,
    $.batch((events, done) => gulp.start('images', done)));

  // watch for changes in html
  $.watch(paths.front.html.watch,
    $.batch((events, done) => gulp.start('html', done)));

  // watch for changes in script files
  $.watch(paths.front.scripts.watch,
    $.batch((events, done) => gulp.start('scripts:watch', done)));

  // watch for changes in styles files
  $.watch(paths.front.styles.watch,
    $.batch((events, done) => gulp.start('styles', done)));
});


/**
 * RELOAD TASKS
 */
/** Runs i18nTask using browser-sync */
gulp.task('i18n:reload', () => i18nTask(true));

/** Runs optimizeImageTask using browser-sync */
gulp.task('images:reload', () => optimizeImageTask(true));

/** Runs optimizeHtmlTask using browser-sync */
gulp.task('html:reload', () => optimizeHtmlTask(true));

/** Runs scriptsTask using browser-sync without uglify */
gulp.task('scripts:reload', ['lint'], () => scriptsTask(true, true));

/** Runs stylesTask using browser-sync */
gulp.task('styles:reload', () => stylesTask(true));

/** watch with browser reload */
tasks = [
  'i18n:reload',
  'images:reload',
  'html:reload',
  'scripts:reload',
  'styles:reload'
];
gulp.task('server', tasks, () => {
  // config browser-sync module
  browserSync.init({
    open: false,
    port: config.server.port,
    server: {
      baseDir: config.server.baseDir,
      middleware: [historyApiFallback()],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  // watch for changes in i18n files
  $.watch(paths.front.i18n.watch,
    $.batch((events, done) => gulp.start('i18n:reload', done)));
  
  // watch for changes in images
  $.watch(paths.front.images.watch,
    $.batch((events, done) => gulp.start('images:reload', done)));

  // watch for changes in html
  $.watch(paths.front.html.watch,
    $.batch((events, done) => gulp.start('html:reload', done)));

  // watch for changes in script files
  $.watch(paths.front.scripts.watch,
    $.batch((events, done) => gulp.start('scripts:reload', done)));

  // watch for changes in styles files
  $.watch(paths.front.styles.watch,
    $.batch((events, done) => gulp.start('styles:reload', done)));
});


/**
 * DEFAULT TASK
 */
gulp.task('default', (cb) => {
  del.sync(paths.clean);
  runSequence(['build:front'], cb);
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
    .pipe($.if(!flags.offline, $.cdnizer(cdnizerArray)))
    .pipe($.htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(paths.front.html.dest))
    .pipe($.size({ title: 'html' }))
    .pipe($.if(reload, browserSync.stream()));
}

/**
 * Prepare templates in stream. 
 */
function prepareTemplates() {
  return gulp.src(paths.front.templates.src)
    .pipe($.htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe($.angularTemplatecache(templateCache.file, templateCache.options));
}

/**
 * Process javascript files and copy the resulting file in dist folder.
 * Make a copy in .tmp folder without uglify.
 * @param {Boolean} reload - indicate if use browser-sync
 * @param {Boolean} normal - indicate if no uglify the resulting file
 */
function scriptsTask(reload, normal) {
  var name = 'main.min.js';
  del.sync(paths.front.scripts.clean);
  return gulp.src(paths.front.scripts.src)
    .pipe(addStream.obj(prepareTemplates()))
    .pipe($.concat(name))
    .pipe(gulp.dest('.tmp/' + paths.front.scripts.dest))
    .pipe($.if(!normal, $.uglify()))
    .pipe(gulp.dest(paths.front.scripts.dest))
    .pipe($.size({ title: name }))
    .pipe($.if(reload, browserSync.stream()));
}

/**
 * Compile sass files and copy the resulting file in dist folder.
 * Make a copy in .tmp folder without minify.
 * @param {Boolean} reload - indicate if use browser-sync
 */
function stylesTask(reload) {
  var name = 'style.min.css';
  del.sync(paths.front.styles.clean);
  return gulp.src(paths.front.styles.src)
    .pipe($.sass().on('error', (err) => {
      console.log(err.toString());
      this.emit('end');
    }))
    .pipe($.rename(name))
    .pipe($.if(flags.autoprefixer, $.autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })))
    .pipe($.if(flags.mergeMediaQueries, $.mergeMediaQueries()))
    .pipe(gulp.dest('.tmp/' + paths.front.styles.dest))
    .pipe($.if(flags.minifyCss, $.cssnano()))
    .pipe(gulp.dest(paths.front.styles.dest))
    .pipe($.size({ title: name }))
    .pipe($.if(reload, browserSync.stream()));
}
