(function() {
  'use strict';

  var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    paths = {
      server: 'server.js',
      backend: ['app/**/*.js'],
      assets: ['public/assets/**/*.*'],
      html: ['public/**/*.html'],
      css: ['public/**/*.css'],
      js: ['public/app/app.module.js', 'public/app/**/*.js']
    };

  // register nodemon task - this runs the app
  gulp.task('nodemon', function() {
    nodemon({
      script: paths.server,
      env: {
        'NODE_ENV': 'development'
      }
    })
    .on('restart');
  });

  // Rerun the task when a file changes
  gulp.task('watch', function() {
    livereload.listen();
    watch(paths.server, livereload.changed);
    watch(paths.backend, livereload.changed);
    watch(paths.html, function() {
      gulp.start('html:build')
    });
    watch(paths.css, function() {
      gulp.start('css:build')
    });
    watch(paths.js, function() {
      gulp.start('js:build')
    });
  });

  // lint js files
  gulp.task('lint', function() {
    gulp.src(paths.js)
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  });

  // build js files
  gulp.task('js:build', function(done) {
    gulp.src(paths.js)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(babel({presets: ['es2015']}))
      .pipe(concat('app.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist/app'))
      .pipe(livereload())
      .on('end', done);
  });

  // build css files
  gulp.task('css:build', function(done) {
    gulp.src(paths.css)
      .pipe(autoprefixer('last 2 version', 'not ie <= 11', 'safari 5', 'safari 6', 'safari 7', 'ios 6', 'ios 7', 'ios 8', 'ios 9', 'android 4', 'android 5'))
      .pipe(sourcemaps.init())
      .pipe(minifyCss({
        keepBreaks: true,
        keepSpecialComments: false,
        aggressiveMerging: false,
        mediaMerging: false
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist'))
      .pipe(livereload())
      .on('end', done);
  });

  // move html files
  gulp.task('html:build', function(done) {
    gulp.src(paths.html)
      .pipe(gulp.dest('./dist'))
      .pipe(livereload())
      .on('end', done);
  });

  // build assets files
  gulp.task('assets:build', function(done) {
    gulp.src(paths.assets)
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()],
        interlaced: true
      }))
      .pipe(gulp.dest('./dist/assets'))
      .on('end', done);
  });

  gulp.task('build', [
    'js:build',
    'css:build',
    'html:build',
    'assets:build'
  ]);

  // The default task (called when you run `gulp` from cli)
  gulp.task('default', ['build', 'nodemon', 'watch']);

}());
