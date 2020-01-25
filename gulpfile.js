'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var server = require('browser-sync').create();
var del = require('del');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');

gulp.task('clean', function () {
  return del('build');
});

gulp.task('copy', function () {
  return gulp.src([
      'source/fonts/**/*.{woff,woff2}',
      'source/img/**',
      'source/*.ico',
      'source/js/**',
    ], {
      base: 'source'
    }
  ).pipe(gulp.dest('build'));
});

gulp.task('copy_html', function () {
  return gulp.src(
    ['source/*.html'],
    { base: 'source' }
  ).pipe(gulp.dest('build'));
});

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('source/img/icon-*.svg', gulp.series('sprite', 'refresh'));
  gulp.watch('source/*.html', gulp.series('copy_html', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.mozjpeg({ progressive: true }),
      imagemin.svgo(),
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('sprite', function () {
  return gulp.src('source/img/icon-*.svg')
    .pipe(svgstore({
      inlineSvg: true,
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('webp', function () {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(webp({ quality: 80 }))
    .pipe(gulp.dest('build/img'));
});

gulp.task('build', gulp.series('clean', 'copy', 'copy_html', 'css', 'sprite', 'images'));
gulp.task('start', gulp.series('build', 'server'));
