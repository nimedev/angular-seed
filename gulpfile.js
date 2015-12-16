/**
 * gulp tasks
 * Build sass and js files in real time.
 * Prepare app for distribution int dist folder.
 */
/** core modules */
var fs = require('fs');

/** npm modules */
var browserSync = require('browser-sync').create();
var cdnizer = require('gulp-cdnizer');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var htmlReplace = require('gulp-html-replace');
// var jshint = require('gulp-jshint');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');

/** others modules */
var cdnizerArray = require('./cdnizer');
var config = require('./config');
var paths = require('./gulppath');

/** CLEAN TASKS */
/** clean output directory */
gulp.task('clean', function() {
  del.sync(paths.clean);
});

/** BACK-END TASKS */
/** copy only necesary files for back-end */
gulp.task('copy-back', function() {
  return gulp.src(paths.back.src)
    .pipe(gulp.dest(paths.back.dest));
});

/** build back-end */
gulp.task('build-back', ['copy-back']);

/** FRONT-END TASKS */
/** copy images */
gulp.task('images', function() {
  return gulp.src(paths.front.src.images)
    // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(paths.front.dest.images));
});

/** build html */
gulp.task('html', function() {
  var opts = {
    conditionals: true,
    spare: true
  };
  return gulp.src(paths.front.src.html)
    .pipe(htmlReplace({
      'js': {
        src: '',
        tpl: ''
      }
    }))
    .pipe(cdnizer(cdnizerArray))
    .pipe(minifyHtml(opts))
    .pipe(gulp.dest(paths.front.dest.html));
});

/** copy front-end files that not are html, css, img or js  */
gulp.task('others', function() {
  return gulp.src(paths.front.src.others)
    .pipe(gulp.dest(paths.front.dest.others));
});

/** put all *.js files in one min.js file in dist dir */
gulp.task('scripts', function() {
  return scripts(paths.front.dest.scripts);
});

/** put all *.scss files in one min.css file and compile in dist dir  */
gulp.task('styles', function() {
  return styles(paths.front.dest.styles);
});

/** build all front-end */
gulp.task('build-front', ['images', 'html', 'others', 'scripts', 'styles']);

/** WATCH AND RELOAD TASKS */
/** put all *.js files in one min.js file in source dir*/
gulp.task('watch-scripts', function() {
  return scripts(paths.front.watch.dest.scripts, {
    normal: true
  });
});

/** put all *.scss files in one min.css file and compile in source dir */
gulp.task('watch-styles', function() {
  return styles(paths.front.watch.dest.styles);
});

/** watch scripts and styles */
gulp.task('watch', ['watch-scripts', 'watch-styles'], function() {
  // watch for changes in script files
  gulp.watch(paths.front.src.scripts, ['watch-scripts']);

  // watch for changes in styles files
  gulp.watch(paths.front.src.styles, ['watch-styles']);
});

/** put all *.js files in one min.js file in source dir and reload browser */
gulp.task('reload-scripts', function() {
  return scripts(paths.front.watch.dest.scripts, {
    normal: true,
    reload: true
  });
});

/** put all *.scss files in one min.css file and compile in source dir and reload browser */
gulp.task('reload-styles', function() {
  return styles(paths.front.watch.dest.styles, {
    reload: true
  });
});

/** watch with browser reload */
gulp.task('server', ['watch-scripts', 'watch-styles'], function() {
  // config browser-sync module
  browserSync.init({
    open: false,
    port: config.port,
    server: {
      baseDir: './public',
      middleware: serverMiddleware
    }
  });

  // watch for changes in script files
  gulp.watch(paths.front.src.scripts, ['reload-scripts']);

  // watch for changes in styles files
  gulp.watch(paths.front.src.styles, ['reload-styles']);

  // watch for changes to reload browsers
  gulp.watch(paths.front.watch.src).on('change', browserSync.reload);
});

/** DEFAULT TASK */
gulp.task('default', function(cb) {
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
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    .pipe(concat('main.min.js'));

  // check if uglify
  if (!options || !options.normal) {
    task = task.pipe(uglify());
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
 * middleware to redirect to index.html because is a singla page app.
 * @param {Object} req - request object.
 * @param {Object} res - response object.
 * @param {Object} next - next object.
 */
function serverMiddleware(req, res, next) {
  var urlArray = req.url.split('/');
  var lastArray;

  // split last element of the url array by '.' to detect if is a file  request
  var lastArray = urlArray[urlArray.length - 1].split('.');

  // if the last element is a file (containt more than one elements)...
  if (lastArray.length > 1) {
    return next();
  }

  // otherwise, re-direct to index.html
  console.log('redirect...');
  fs.readFile('./public/index.html', function(err, contents) {
    // if the fileRead was successful...
    if (!err) {
      res.writeHeader(200, {
        "Content-Type": "text/html"
      });
      res.write(contents);
      res.end();
    } else {
      // otherwise, set a 404 header...
      res.writeHead(404, {
        'Content-Type': 'text/html'
      });
      // send a custom 'file not found' message and then close the request
      res.end('<h1>Sorry, the page you are looking for cannot be found.</h1>');
    };
  });
}

/**
 * compile sass files according to dest path.
 * @param {String} dest - destination path.
 * @param {Object} options - options object:
 *        options: {uglify: indicate if uglify, reload: indicate if use browser-sync}
 */
function styles(dest, options) {
  var task = gulp.src(paths.front.src.styles)
    .pipe(concat('styles.min.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(gulp.dest(dest));

  // check if reload browser
  if (options && options.reload) {
    task.pipe(browserSync.stream());
  }

  // return task
  return task;
}
