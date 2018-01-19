'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const svgo = require('gulp-svgo');
const svgSymbols = require('gulp-svg-symbols');
const server = require('browser-sync');
const include = require('gulp-include');
const mustache = require('gulp-mustache');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const sequence = require('run-sequence');
const rimraf = require('rimraf');
const ghPages = require('gulp-gh-pages');

gulp.task('clean', function (cb) {
   rimraf('./build', cb);
});

gulp.task('js', () => {
  gulp.src('src/**/*.js')
    .pipe(concat('common.js'))
    .pipe(gulp.dest('./build/assets/js'))
    .pipe(server.stream());
});

gulp.task('style', () => {
  gulp.src('src/scss/styles.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest('./build/assets/css'))
    .pipe(csso())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./build/assets/css'))
    .pipe(server.stream());
});

gulp.task('svg', () => {
  gulp.src('src/img/svg/*.svg')
    .pipe(svgo())
    .pipe(svgSymbols({
      templates: ['default-svg']
    }))
    .pipe(gulp.dest('src/templates/components/'))
    .pipe(server.stream());
});

gulp.task('images', () => {
    gulp.src('src/img/*.*')
        .pipe(imagemin({
          optimizationLevel: 7
        }))
        .pipe(gulp.dest('./build/assets/img'))
        .pipe(server.stream());
});

gulp.task('fonts', () => {
  gulp.src('src/fonts/*')
    .pipe(gulp.dest('./build/assets/fonts'))
    .pipe(server.stream());
});

gulp.task('templates', () => {
  gulp.src('src/templates/*.html')
    .pipe(plumber())
    .pipe(mustache())
    .pipe(gulp.dest('./build'))
    .pipe(server.stream());
});

gulp.task('build', function(done) {
  sequence(
    'clean',
    'templates',
    'style',
    'js',
    'svg',
    'images',
    'fonts',
    done
  );
});

gulp.task('deploy',['build'], function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

gulp.task('serve', () => {
  server.init({
    server: './build',
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch('src/js/**/*.js', ['js']).on('change', server.reload);
  gulp.watch('src/scss/**/*.scss', ['style']).on('change', server.reload);
  gulp.watch('src/img/svg/*.svg', ['svg', 'templates']).on('change', server.reload);
  gulp.watch('src/img/*.*', ['images']).on('change', server.reload);
  gulp.watch('src/**/*.html', ['templates']).on('change', server.reload);
});
