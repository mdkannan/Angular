const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

// TypeScript compile
gulp.task('compile', ['clean'], function () {
  return gulp
    .src(['app/**/*.ts', 'app/**/*.html'])
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(gulp.dest('dist/app'));
});

// copy dependencies
gulp.task('copy:libs', ['clean'], function() {
  return gulp.src([
		'node_modules/es6-shim/es6-shim.min.js',
		'node_modules/systemjs/dist/system-polyfills.js',
		'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js',
      'node_modules/angular2/bundles/router.dev.js',
	  'libs/jquery-1.12.3.js',
	  'libs/bootstrap.min.js',
	  'libs/jquery.collagePlus.min.js',
	  'libs/iscroll.js'
    ])
    .pipe(gulp.dest('dist/lib'))
});

// copy CSS
gulp.task('copy:css', ['clean'], function() {
  return gulp.src('styles/**/*.css')
    .pipe(gulp.dest('dist/styles'))
});
// copy fonts
gulp.task('copy:fonts', ['clean'], function() {
  return gulp.src('fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});


// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function() {
  return gulp.src(['app/**/*', 'index.html', '!app/**/*.ts'], { base : './' })
    .pipe(gulp.dest('dist'))
});

gulp.task('build', ['compile', 'copy:libs', 'copy:css', 'copy:assets', 'copy:fonts']);
gulp.task('default', ['build']);

