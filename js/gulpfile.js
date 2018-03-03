/*
 * @Author: LeeRay
 * @Date: 2018-03-03 13:22:28
 * @Last Modified by: LeeRay
 * @Last Modified time: 2018-03-03 14:19:11
 */

// gulpfile.js

'use strict'

var fileinclude = require('gulp-file-include'),
	cleanCss = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	pump = require('pump'),
	gulp = require('gulp')

// js
gulp.task('compressjs', function (cb) {
	pump([
		gulp.src('src/js/*.js'),
		uglify(),
		gulp.dest('dest/js')
	], cb)
})

// css
gulp.task('minify-css', function () {
	return gulp.src('src/css/*.css')
		.pipe(cleanCss({
			compatibility: 'ie8'
		}))
		.pipe(gulp.dest('dest/css'))
})

// fileinclude
gulp.task('fileinclude', function () {
	gulp.src(['src/index.html', 'src/about.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('dest'))
})

// watch
gulp.task('watch', function () {
	gulp.watch(['src/css/*.css'], ['minify-css'])
	gulp.watch(['src/*.html'], ['fileinclude'])
	gulp.watch(['src/js/*.js'], ['compressjs'])
})

// default
gulp.task('default', ['fileinclude', 'minify-css', 'compressjs', 'watch'])
