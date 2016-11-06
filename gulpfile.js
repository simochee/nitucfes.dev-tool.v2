"use strict"

const gulp = require('gulp');
const webpack = require('gulp-webpack');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const minifyCss = require('gulp-minify-css');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');

gulp.task('webpack', () => {
	gulp.src('./src/scripts/entry.js')
		.pipe(plumber())
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest('./docs'));
});

gulp.task('sass', () => {
	gulp.src('./src/sass/main.sass')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({
			preferredSyntax: 'sass'
		}))
		.pipe(autoprefixer())
		.pipe(minifyCss({ advanced: false }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./docs'));
});

gulp.task('pug', () => {
	gulp.src('./src/pug/index.pug')
		.pipe(plumber())
		.pipe(pug())
		.pipe(gulp.dest('./docs'));
});

gulp.task('watch', () => {
	gulp.watch('./src/sass/**/*.sass', ['sass']);
	gulp.watch('./src/pug/**/*.pug', ['pug']);
});

gulp.task('dev', ['watch', 'webpack', 'sass', 'pug']);