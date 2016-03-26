// include gulp
var gulp = require('gulp'); 

// include plug-ins
var jshint = require('gulp-jshint');

var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
// include plug-ins
var minifyHTML = require('gulp-minify-html')


var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');


var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');


// JS hint task
gulp.task('jshint', function() {
  gulp.src('./src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './src/img/*',
      imgDst = './build/img';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});


// minify new or changed HTML pages
gulp.task('htmlpage', function() {
  var htmlSrc = './src/html/*.html',
      htmlDst = './build/html/';

  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(['./src/css/*.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css/'));
});


// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./src/js/lib.js','./src/js/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});

// default gulp task
gulp.task('default', ['imagemin', 'htmlpage', 'scripts', 'styles'], function() {
  // watch for HTML changes
  gulp.watch('./src/html/*.html', function() {
    gulp.run('htmlpage');
  });

  // watch for JS changes
  gulp.watch('./src/js/*.js', function() {
    gulp.run('jshint', 'scripts');
  });

  // watch for CSS changes
  gulp.watch('./src/css/*.css', function() {
    gulp.run('styles');
  });
});


