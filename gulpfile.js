/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var less = require('gulp-less');
var runSequence = require('run-sequence');
var del = require('del');
var minify = require('gulp-minify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');


var _paths = {
    stylesPath : './views/css/',
    jsPath     : './views/js/',
    cssPath    : './vendor/css/',    
    sassPath   : './vendor/sass/',
    lessPath   : './vendor/less/',
}


//------------ Tasks -----------------------------------------------------------------------/
gulp.task('css', cssAction);
gulp.task('sass', sassAction);
gulp.task('less', lessAction);
gulp.task('minify-js', minifyJsAction);
gulp.task('minify-css', minifyCssAction);
gulp.task('clean-css', cleanCssAction);
gulp.task('watch', watchAction);
gulp.task('build', buildAction);
gulp.task('default', buildAction);
//-------------------------------------------------------------------------------------------/



//------------ Actions --------------------------------------------------------------------/

function watchAction()
{
    gulp.watch(_paths.cssPath + '*.css', buildAction);
    gulp.watch(_paths.sassPath + '*.scss', buildAction);
    gulp.watch(_paths.lessPath + '*.less', buildAction);
}

function cssAction()
{
  gulp.src(_paths.cssPath + '*.css')
  .pipe(gulp.dest(_paths.stylesPath));
}

function minifyCssAction()
{
	gulp.src([
	        '!' + _paths.stylesPath + '*.min.css',
	        _paths.stylesPath + '*.css']
	        )
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(_paths.stylesPath));
}

function sassAction()
{
    sass(_paths.sassPath + '*.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest(_paths.stylesPath))
}

function lessAction()
{
    gulp.src(_paths.lessPath + "*.less")
    .pipe(less())
    .pipe(gulp.dest(_paths.stylesPath));
}

function minifyJsAction()
{
    	gulp.src([
	        '!'+_paths.jsPath + '*.min.js',
	        _paths.jsPath + '*.js']
	        )
		.pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
           }
	      })
        )
		.pipe(gulp.dest(_paths.jsPath));
}

function cleanCssAction()
{
    return del(_paths.stylesPath);
}

function buildAction()
{
    runSequence('clean-css', 'css', 'less' ,'sass');
}
//-------------------------------------------------------------------------------------------/