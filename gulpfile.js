var gulp = require('gulp');
var useref = require('gulp-useref');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var runSequence = require('run-sequence');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');






/******************************************/
/****************** TASKS *****************/
/******************************************/

gulp.task('copy-data', function(){
	return gulp.src('data/**')
	.pipe(gulp.dest('../dist/data'))
});

gulp.task('copy-api', function(){
	return gulp.src('api/**')
	.pipe(gulp.dest('../dist/api'))
});

gulp.task('useref', function(){
	return gulp.src('*.html')
	.pipe(useref())
	.pipe(gulpIf('*.js', uglify()))
	.pipe(gulpIf('*.css', cssnano()))
	.pipe(gulpIf('*.html', htmlmin({collapseWhitespace: true})))
	.pipe(gulp.dest('../dist'))
});

gulp.task('image-min', function(){
    gulp.src('img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('../dist/img'))
}
);

gulp.task('sass', function(){
  return gulp.src('sass/style.scss')
    .pipe(sass()) 
    .pipe(gulp.dest('css/'))
});

/******************************************/
/****************** ADMIN *****************/
/******************************************/


gulp.task('admin-copy-api', function(){
	return gulp.src('admin/api/**')
	.pipe(gulp.dest('../dist/admin/api'))
});

gulp.task('admin-useref', function(){
	return gulp.src('admin/**/*.html')
	.pipe(useref())
	.pipe(gulpIf('*.js', uglify()))
	.pipe(gulpIf('*.css', cssnano()))
	.pipe(gulpIf('*.html', htmlmin({collapseWhitespace: true})))
	.pipe(gulp.dest('../dist/admin'))
});

/**************** MEGA FUNCTION ***********/

gulp.task('optimize', function(callback) {
  runSequence('sass','useref', 'image-min', 'copy-data', 'copy-api', 'admin-copy-api', 'admin-useref', callback);
});
