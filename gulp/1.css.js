'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');

gulp.task('css', function () {
    return gulp.src(global.paths.scss)
    .pipe(sassGlob())
    .pipe(sass()).on('error', handleError)
    .pipe(autoprefixer({
        browsers: ['last 20 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(global.paths.css))
    .pipe(global.browserSync.stream());
});

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}