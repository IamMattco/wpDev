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
var config = {
  themePath: 'app/content/themes/defaultTheme',
  msg: ['Style zostały zminifikowane i połączone.',
        'Pliki JavaScript zostały zminifikowane i połączone.',
        'Obrazy zostały zoptymalizowane.']
};

// Styles
gulp.task('styles', function() {
  return sass(config.themePath + '/assets/src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(config.themePath +'/assets/dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(config.themePath + '/assets/dist/styles'))
    .pipe(notify({ message: config.msg[0] }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(config.themePath + '/assets/src/js/main.js')
    .pipe(include())
    .pipe(gulp.dest(config.themePath +'/assets/dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(config.themePath + '/assets/dist/js'))
    .pipe(notify({ message: config.msg[1] }));
});

// Images
gulp.task('images', function() {
  return gulp.src(config.themePath + '/assets/src/images/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(config.themePath + '/assets/dist/images'))
    .pipe(notify({ message: config.msg[3] }));
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
  gulp.watch(config.themePath + '/assets/src/styles/*.scss', ['styles']);
  gulp.watch(config.themePath + '/assets/src/js/*.js', ['scripts']);
  gulp.watch(config.themePath + '/assets/src/images/*', ['images']);
});
