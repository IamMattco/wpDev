var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    include = require('gulp-include'),
    haml = require('gulp-ruby-haml');

// Config

var themeName = 'defaultTheme',
    themePath = 'app/content/themes/'+ themeName;

// Styles
gulp.task('styles', function() {
  return sass(themePath + '/assets/src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(themePath +'/assets/dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(themePath + 'assets/dist/styles'))
    .pipe(notify({ message: 'Style zostały zminifikowane i połączone.' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(themePath + '/assets/src/js/main.js')
    .pipe(include())
    .pipe(gulp.dest(themePath +'/assets/dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(themePath + 'assets/dist/js'))
    .pipe(notify({ message: 'Pliki JavaScript zostały zminifikowane i połączone.' }));
});

// Images
gulp.task('images', function() {
  return gulp.src(themePath + 'assets/src/images/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(themePath + 'assets/dist/images'))
    .pipe(notify({ message: 'Obrazy zostały zoptymalizowane.' }));
});

// Build
gulp.task('build', function() {
  gulp.start('scripts', 'images', 'haml', 'styles');
});

// Default task
gulp.task('default', function() {
  gulp.start('scripts', 'images');
});

// Watch
gulp.task('watch', function() {
  gulp.watch(themePath + 'assets/src/styles/*.scss', ['styles']);
  gulp.watch(themePath + 'assets/src/js/*.js', ['scripts']);
  gulp.watch(themePath + 'assets/src/images/*', ['images']);
});
