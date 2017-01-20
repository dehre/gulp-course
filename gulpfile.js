var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require ('gulp-sourcemaps');
var babel = require ('gulp-babel');

// HANDLEBARS PLUGINS
var handlebars = require('gulp-handlebars');
var handlebarsLib = require('handlebars');
var declare = require('gulp-declare');
var wrap = require('gulp-wrap');


// File paths
var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = "public/scripts/**/*.js";
var CSS_PATH = 'public/css/**/*.css';
var TEMPLATES_PATH = 'templates/**/*.hbs';

// Styles
gulp.task('styles',function(){
  return gulp.src(['public/css/reset.css',CSS_PATH])
    .pipe(plumber(function(err){
      console.log('Styles task Error!!!!');
      console.log(err);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(concat('styles.css'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload())
});

// Scripts
gulp.task('scripts', function () {
  return gulp.src(SCRIPTS_PATH)
    .pipe(plumber(function(err){
      console.log('Scripts task Error!!!!');
      console.log(err);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload())
});

// Images
gulp.task('images',function(){
  console.log('starting Images task');
});

gulp.task('templates',function(){
  return gulp.src(TEMPLATES_PATH)
  .pipe(handlebars({
    handlebars: handlebarsLib
  }))
  .pipe(wrap('Handlebars.template(<%= contents %>)'))
  .pipe(declare({
    namespace: 'templates',
    noRedeclare: true
  }))
  .pipe(concat('templates.js'))
  .pipe(gulp.dest(DIST_PATH))
  .pipe(livereload())
})

gulp.task('watch',function(){
  console.log('WATCH');
  require('./server.js');
  livereload.listen();
  gulp.watch(SCRIPTS_PATH, ['scripts']);
  gulp.watch(CSS_PATH, ['styles']);
  gulp.watch(TEMPLATES_PATH, ['templates']);
});

gulp.task('default',function(){
  console.log('starting default BOOTSTRAP task');
});
