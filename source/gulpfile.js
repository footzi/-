var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var babel = require('gulp-babel');

//html
gulp.task('html', function() {
    return gulp.src('*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('../public'));
})


//sass
gulp.task('sass', function() {
    return gulp.src('styles/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', notify.onError({
            title: 'SASS Compilation Failed',
            message: '<%= error.message %>'
        }))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(gulp.dest('../public/styles'));
});

//js
gulp.task("js", function() {
    return gulp.src([
            'libs/jquery.min.js',
            'js/**/*'
        ])
        .pipe(concat('main.min.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
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

//autoprefixer
gulp.task("autoprefixer", function() {
    return gulp.src("../public/styles/main.css")
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('../public/styles/'));
})

//watch
gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('*.html', ['html'])
        // gulp.watch('styles/**/*.scss', ['sass'])
    gulp.watch('styles/**/*.scss', function(event, cb) {
        setTimeout(function() { gulp.start('sass'); }, 500)
    })
    gulp.watch('js/**/*.js', ['js'])
    gulp.watch('../public/*.html', browserSync.reload)
    gulp.watch('../public/js/**/*', browserSync.reload)


});

gulp.task("default", ["watch"]);