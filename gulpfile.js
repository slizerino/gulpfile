var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	less = require('gulp-less'),
	pug = require('gulp-pug'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify');

gulp.task('server', ['less', 'pug'], function() {
	browserSync.init({
		server: { baseDir: './app/' }
	});
	gulp.watch('./app/**/*.html').on('change', browserSync.reload);
	gulp.watch('./app/**/*.js').on('change', browserSync.reload);
	gulp.watch('./app/less/**/*.less', ['less']);
	gulp.watch('./app/pug/**/*.pug', ['pug']);
});
gulp.task('less', function() {
	return gulp.src('./app/less/style.less')
	.pipe(plumber({
		errorHandler: notify.onError(function(err) {
			return {
				title: 'Styles',
				message: err.message
			}
		})
	}))
	.pipe(less())
	.pipe(gulp.dest('./app/css'))
	.pipe(browserSync.stream());
});
gulp.task('pug', function() {
	return gulp.src('app/pug/index.pug')
	.pipe(plumber({
		errorHandler: notify.onError(function(err) {
			return {
				title: 'Styles',
				message: err.message
			}
		})
	}))
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('app/'))
	.pipe(browserSync.stream());
});

gulp.task('default', ['server']);
