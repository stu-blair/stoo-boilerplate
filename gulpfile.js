// gulpfile.js -- run via `gulp`


var gulp   = require('gulp');
var coffee = require('gulp-coffee');
var haml   = require('gulp-haml');
var sass   = require('gulp-sass');
var gutil  = require('gulp-util');

var paths = {
   coffeeSrc: './src/coffee/*.coffee',
     hamlSrc: './src/haml/*.haml',
     sassSrc: './src/sass/*.sass',
  coffeeDest: './lib/js',
    hamlDest: './lib/html',
    sassDest: './lib/css'
};

var setupCompilationTask = function(taskName, compileFn, src, dest) {
  gulp.task(taskName, function() {
    gulp.src(src)
        .pipe(compileFn().on('error', function(e) {
          gutil.log(e);
        }))
        .pipe(gulp.dest(dest));
  });
};

var logFileOnChange = function(event) {
  var relativePath = event.path.split(__dirname + '/src/')[1];
  gutil.log("\t" + relativePath + " " + event.type);
};


// Default task sets up watches -- just call 'gulp' to start it up
gulp.task('default', function() {

  setupCompilationTask('coffee-compile', coffee, paths.coffeeSrc, paths.coffeeDest);
  setupCompilationTask('haml-compile',   haml,   paths.hamlSrc,   paths.hamlDest);
  setupCompilationTask('sass-compile',   sass,   paths.sassSrc,   paths.sassDest);

  var coffeeWatch = gulp.watch(paths.coffeeSrc, ['coffee-compile']);
  var hamlWatch   = gulp.watch(paths.hamlSrc,   ['haml-compile'  ]);
  var sassWatch   = gulp.watch(paths.sassSrc,   ['sass-compile'  ]);

  coffeeWatch.on('change', logFileOnChange);
  hamlWatch.on(  'change', logFileOnChange);
  sassWatch.on(  'change', logFileOnChange);
});