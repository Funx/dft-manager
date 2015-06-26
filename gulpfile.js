// FOUNDATION FOR APPS TEMPLATE GULPFILE
// -------------------------------------
// This file processes all of the assets in the "client" folder, combines them with the Foundation for Apps assets, and outputs the finished files in the "build" folder as a finished app.

// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var $        = require('gulp-load-plugins')();
var argv     = require('yargs').argv;
var gulp     = require('gulp');
var rimraf   = require('rimraf');
var router   = require('front-router');
var sequence = require('run-sequence');
var compass  = require('gulp-compass');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Check for --production flag
var isProduction = !!(argv.production);

// 2. FILE PATHS
// - - - - - - - - - - - - - - -

var paths = {
  assets: [
    './client/**/*.*',
    '!./client/**/*.{sccs,js}'
  ],
  // Sass will check these folders for files when you use @import.
  sass: [
    'client/scss',
    'bower_components/foundation-apps/scss',
    'bower_components/animate.css/',
    'bower_components/angular-xeditable/dist/css/'
  ],
  // These files include Foundation for Apps and its dependencies
  foundationJS: [
    'bower_components/fastclick/lib/fastclick.js',
    'bower_components/viewport-units-buggyfill/viewport-units-buggyfill.js',
    'bower_components/tether/tether.js',
    'bower_components/hammerjs/hammer.js',
    'bower_components/angular/angular.js',
    'bower_components/rsvp/rsvp.js',
    'bower_components/async/lib/async.js',
    'bower_components/angular-xeditable/dist/js/xeditable.js',
    'bower_components/angular-vs-repeat/src/angular-vs-repeat.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-route-segment/build/angular-route-segment.js',
    'bower_components/angular-resource/angular-resource.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/foundation-apps/js/vendor/**/*.js',
    'bower_components/foundation-apps/js/angular/**/*.js',
    'bower_components/esrever/esrever.js',
    '!bower_components/foundation-apps/js/angular/app.js'
  ],
  // These files are for your app's JavaScript
  appJS: [
    'client/components/**/*.js',
    'client/modules/**/*.js',
    'client/utils/**/*.js',
    'client/config/**/*.js',
    'client/app.js'
  ],
  icons: [
    './client/assets/images/icons/**/*.svg'
  ]
}

// 3. TASKS
// - - - - - - - - - - - - - - -

// Cleans the build directory
gulp.task('clean', function(cb) {
  rimraf('./build', cb);
});

// Copies everything in the client folder except templates, Sass, and JS
gulp.task('copy', function() {
  return gulp.src(paths.assets, {
    base: './client/'
  })
    .pipe(gulp.dest('./build'))
  ;
});

// Copies your app's page templates and generates URLs for them
gulp.task('copy:templates', function() {
  return gulp.src('./client/templates/**/*.html')
    .pipe(router({
      path: 'build/assets/js/routes.js',
      root: 'client'
    }))
    .pipe(gulp.dest('./build/templates'))
  ;
});

// Compiles the Foundation for Apps directive partials into a single JavaScript file
gulp.task('copy:foundation', function(cb) {
  gulp.src('bower_components/foundation-apps/js/angular/components/**/*.html')
    .pipe($.ngHtml2js({
      prefix: 'components/',
      moduleName: 'foundation',
      declareModule: false
    }))
    .pipe($.uglify())
    .pipe($.concat('templates.js'))
    .pipe(gulp.dest('./build/assets/js'))
  ;

  // Iconic SVG icons
  gulp.src('./bower_components/foundation-apps/iconic/**/*')
    .pipe(gulp.dest('./build/assets/img/iconic/'))
  ;

  cb();
});

// Compiles Sass
gulp.task('sass', function () {
  return gulp.src('./client/app.scss')
    .pipe($.sass({
      includePaths: paths.sass,
      outputStyle: (isProduction ? 'compressed' : 'nested'),
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie 10']
    }))
    .pipe(gulp.dest('./build/assets/css/'))
    .pipe(reload({stream: true}))
  ;
});

// Compiles and copies the Foundation for Apps JavaScript, as well as your app's custom JS
gulp.task('uglify', ['uglify:foundation', 'uglify:app'])

gulp.task('uglify:foundation', function(cb) {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(paths.foundationJS)
    .pipe(uglify)
    .pipe($.concat('foundation.js'))
    .pipe(gulp.dest('./build/assets/js/'))
  ;
});

gulp.task('uglify:app', function() {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(paths.appJS)
    .pipe(uglify)
    .pipe($.concat('app.js'))
    .pipe(gulp.dest('./build/assets/js/'))
  ;
});

gulp.task('glyphicons', function() {
  var fontName = 'icons';
  console.log('glyphicons...')
  return gulp.src(['./client/assets/images/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName, // nom de la fonte, doit être identique au nom du plugin iconfont
      path: './client/scss/atoms/_icons-template.scss',
      targetPath: '../../../scss/atoms/_icons.scss', // emplacement de la css finale
      fontPath: '../../assets/fonts/icons/' // emplacement des fontes finales
    }))
    .pipe(iconfont({
      fontName: fontName, // identique au nom de iconfontCss
    }))
    .pipe(gulp.dest('./client/assets/fonts/icons/') )
  ;
});

// Starts a test server, which you can view at http://localhost:3000
gulp.task('server', ['build'], function() {
  nodemon({
    script: 'bootstrap.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })

  browserSync({
    proxy: "localhost:8080",
    notify: false,
    open: false
  });
  browserSync.reload();
});

// Builds your entire app once, without starting a server
gulp.task('build', function(cb) {
  sequence('clean', ['copy', 'copy:foundation', 'glyphicons','sass', 'uglify'], 'copy:templates', cb);
});

gulp.task('watch:js', ['uglify:app'], browserSync.reload);
gulp.task('watch:static', ['copy'], browserSync.reload);
gulp.task('watch:icons', ['glyphicons'], browserSync.reload);
gulp.task('watch:templates', ['copy:templates'], browserSync.reload);

// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('default', ['server'], function () {
  // Watch Sass
  gulp.watch([
    './client/scss/**/*.scss',
    './client/modules/**/*.scss',
    './client/app.scss'
  ], ['sass']);

  // Watch JavaScript
  gulp.watch(['./client/app.js', './client/components/**/*.js', './client/modules/**/*.js'], ['watch:js']);

  // Watch static files
  gulp.watch([
    './client/**/*.*',
    '!./client/**/*.{scss,js}',
    '!./client/assets/images/icons/*',
    '!./client/templates/**/*.*'
    ], ['watch:static']);

  // Watch app templates
  gulp.watch(['./client/templates/**/*.html'], ['watch:templates']);

  // Watch app templates
  gulp.watch([paths.icons], ['watch:icons']);
});
