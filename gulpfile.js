'use strict';

const gulp = require('gulp');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const merge = require('merge2');

const project = ts.createProject('tsconfig.json');

gulp.task('build', [
	'build:ts'
]);

gulp.task('build:ts', () => {
	const tsResult = project
		.src()
		.pipe(ts(project));

	return merge([
		tsResult.pipe(gulp.dest('./built/')),
		tsResult.dts.pipe(gulp.dest('./built/'))
	]);
});

gulp.task('test', [
	'lint'
]);

gulp.task('lint', () =>
	gulp.src('./src/**/*.ts')
	.pipe(tslint())
	.pipe(tslint.report('verbose'))
);
