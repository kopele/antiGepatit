var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  less = require('gulp-less'),
  concat = require('gulp-concat'),
  uglifyJS = require('gulp-uglifyjs'),
  cssnano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  cache = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer');
  var path = require('path');

gulp.task('less', function () {
  return gulp.src('app/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7']))
    .pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function() {
	browserSync({ 
		server: { 
			baseDir: 'app' 
		},
		notify: false 
	});
});

gulp.task('scripts', function () {
  return gulp.src([
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglifyJS())
    .pipe(gulp.dest('app/js'))
});

gulp.task('css-min', ['less'], function () {
  return gulp.src('app/css/main.css')
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('app/css'))
});

gulp.task('build', ['clean', 'img', 'css-min', 'scripts'], function () {
  var buildCss = gulp.src([
    'app/css/main.css',
    'app/css/main.min.css',
  ])
    .pipe(gulp.dest('dist/css'));

  var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));

  var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(){
  return del.sync('dist');
});

gulp.task('cler', function(){
  return cache.clearAll();
});

gulp.task('img', function(){
  return gulp.src('app/img/**/*')
  .pipe(cache(imagemin({
    interlaced: true,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  })))
  .pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['browser-sync', 'scripts'], function () {
  gulp.watch('app/less/*.less', ['less']);
  gulp.watch(['app/*.html', 'app/js/*.js', 'app/less/*.less'], reload);
});