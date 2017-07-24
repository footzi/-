var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
//var rename = require('gulp-rename');
//var imagemin = require("gulp-imagemin");
//var pngquant = require("imagemin-pngquant");
var notify = require('gulp-notify');
//var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');

//html
gulp.task('html', function() {
        return gulp.src('*.html')
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(gulp.dest('../public'));
    })
	

//sass
gulp.task('sass', function() {
    return gulp.src('styles/**/*.scss')
        // .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sass({}))
        .on('error', notify.onError({
            title: 'SASS Compilation Failed',
            message: '<%= error.message %>'
        }))
        .pipe(browserSync.reload({
            stream: true
        }))
        // .pipe(rename("main.min.css"))
        .pipe(gulp.dest('../public/styles'));
});

//js
gulp.task("js", function() {
    return gulp.src([
            'libs/jquery.min.js',
            'js/**/*'
        ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .on('error', notify.onError({
            title: 'JS Compilation Failed',
            message: '<%= error.message %>'
        }))
        .pipe(gulp.dest('../public/js'))
})

//browserSync
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: '../public'
        }
    })
});

//watch
gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('*.html', ['html'])
    gulp.watch('styles/**/*.scss', ['sass'])
    gulp.watch('js/**/*.js', ['js'])
    gulp.watch('../public/js/**/*', browserSync.reload)
});

gulp.task("default", ["watch"])