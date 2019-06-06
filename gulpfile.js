// For frontend dev

const gulp = require('gulp'),
sass = require('gulp-sass'),
plumber = require('gulp-plumber'),
webpack = require('webpack'),
webpackStream = require('webpack-stream'),
browserSync = require('browser-sync').create();

const style = () => {
  return gulp.src('./public/scss/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./public/temp/css'))
  .pipe(browserSync.stream());
};

const watch = () => {
  browserSync.init({
    server: {
      baseDir: './app'
    }
  });
  gulp.watch('./public/assets/**/*.scss', style);
  gulp.watch('./public/*.hbs').on('change', browserSync.reload);
  gulp.watch('./public/assets/js/**/*.js').on('change', scripts);
};

const scripts = () => {
  return (
    gulp
      .src(["./public/assets/js/**/*.js"])
      .pipe(plumber())
      .pipe(webpackStream(require('./webpack.config.js')))
      .pipe(gulp.dest("./public/temp/js/"))
      .pipe(browserSync.stream())
  );
}

exports.watch = watch;
exports.scripts = scripts;
exports.style = style;
