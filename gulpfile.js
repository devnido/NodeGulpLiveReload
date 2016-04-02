'use strict'

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('js', function() {
  return gulp.src('./source/javascript/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('sass',function(){
    var config = {};
    config.outputStyle = 'compressed';
    return gulp.src('./source/sass/*.sass')
        .pipe(sass(config))
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
         }))
        .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('nodemon', function (cb) {
  nodemon({
        exec: 'node',
        script: 'app.js',
        ext: 'js',
        ignore: ["source/*","app/views/*"],
        debug: true
    })
    .on("start",reload);
});

gulp.task('browser-sync', function() {
  browserSync({
        proxy: "http://localhost:3000",
        files: ["source/**/*.*","app/views/**/*.*"],
        port: 7000
    });
});

gulp.task('watch', function () {
  gulp.watch('./source/sass/**/*.sass', ['sass']);
  gulp.watch('./source/javascript/**/*.js', ['js']);
});

gulp.task('default', ['sass', 'js','watch','browser-sync','nodemon']);
