// include gulp
var gulp = require('gulp'); 

// include plug-ins
var jshint = require('gulp-jshint');

var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
// include plug-ins
var minifyHTML = require('gulp-minify-html')

// include js 
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

//include css
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');


var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

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

gulp.task('expressExample', function() {
  var express = require('express');
  var app = express();
  app.use(express.static(__dirname+"/src"));
  app.listen(3000, '0.0.0.0');
});

// utilizar esta terea cuando se colocarà en produccion o pruebas
// de modo que comprimer los archivos, no se carga nodemon ni browser syn
gulp.task('server', ['imagemin', 'htmlpage', 
  'scripts', 'styles','express'], function() {
    console.log('Se ejecutò server type');
    // watch for HTML changes
    // se ejecuta tarea al momento de generar un cambio en en cualquier
    // cambio html
    gulp.watch('./src/html/*.html', function() {
      gulp.run('htmlpage');
    });

    // watch for JS changes
    // se ejecuta tarea al momento de generar un cambio en en cualquier
    // cambio js
    gulp.watch('./src/js/*.js', function() {
      gulp.run('jshint', 'scripts');
    });

    // watch for CSS changes
    // se ejecuta tarea al momento de generar un cambio en en cualquier
    // cambio js
    gulp.watch('./src/css/*.css', function() {
      gulp.run('styles');
    });


    });

// tarea por default, inicia el browser sync y nodemon de manera 
gulp.task('default',['browser-sync'], function() {
  console.log('Se ejecutò local');
});


// actualizar 
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
        files: ["./packages/**/*.*"],
        port: 7000
  });
});

gulp.task('nodemon', function (cb) {
  
  var started = false;
  
  return nodemon({
    script: 'app.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true; 
    } 
  });
});


