'use strict';

var gulp = require('gulp');
var riot = require('gulp-riot');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var htmlreplace = require('gulp-html-replace');
var minifyHTML = require('gulp-minify-html');
var jsonminify = require('gulp-jsonminify');
var browserSync = require('browser-sync').create();
var stylus = require('gulp-stylus');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('js', function() {
    gulp.src([
            './public/js/utils/*.js',
            './public/js/components/*.js',
            './public/js/*.js',
            '!./public/js/main.js'
        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('styles', function() {
    gulp.src('./public/styles/main.styl')
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest('./public/styles/'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    watch('./public/styles/**/*.styl', function() {
        gulp.run('styles');
    });

    watch('./html/*.html', function() {
        browserSync.reload();
    });

    watch(['./public/js/**/*.js', '!./public/js/main.js'], function() {
        gulp.run('js');
    });

    watch('./public/js/main.js', function() {
        browserSync.reload();
    });
});

gulp.task('default', function() {
    gulp.run('browser-sync');
    gulp.run('styles');
    gulp.run('watch');
});

/*
var config = {
    tags: './public/!**!/!*.tag',
    tagsDist: './client/js'
};

gulp.task('build', function(callback){
    return runSequence('clean', ['copy', 'widgets', 'compress.worker', 'compress.settings', 'html', 'static-content'], 'compress.main', callback);
});

gulp.task('copy', function(callback) {
    return runSequence(['copy.fonts', 'copy.styles', 'copy.img', 'copy.settings', 'copy.demo'], callback);
});

gulp.task('copy.demo', function() {
    return gulp.src('client/demo.html')
        .pipe(gulp.dest('build'));
});

gulp.task('copy.settings', function() {
    return gulp.src('client/settings.json')
        .pipe(gulp.dest('build'));
});

gulp.task('copy.fonts', function() {
    return gulp.src('client/fonts/!**')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('copy.styles', function() {
    return gulp.src('client/styles/common.css')
        .pipe(gulp.dest('build/styles'));
});

gulp.task('copy.img', function() {
    return gulp.src('client/img/!**')
        .pipe(gulp.dest('build/img'));
});

gulp.task('html', function() {
    return gulp.src('client/index.html')
        .pipe(htmlreplace({
            js: 'js/main.js'
        }))
        .pipe(minifyHTML())
        .pipe(gulp.dest('build'));
});

gulp.task('static-content', function() {
    return gulp.src('client/static-content/!*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('build/static-content'));
});

gulp.task('clean', function() {
    return gulp.src('build', {read: false})
        .pipe(clean());
});

gulp.task('widgets', function() {
    return gulp.src(config.tags)
        .pipe(riot({
            compact: true
        }))
        .pipe(concat('widgets.js'))
        .pipe(gulp.dest(config.tagsDist));
});

gulp.task('default', function() {
    watch(config.tags, function() {
        gulp.run('widgets');
    });
});

gulp.task('compress.main', function() {
    return gulp.src([
            'client/libs/!*.js',

            '../air-backend/shared/schemas.js',
            '../air-backend/shared/transportConfig.js',
            'client/js/outcome-helpers.js',
            'client/js/constants.js',
            'client/libs/fastclick.js',
            'client/js/getSport.js',
            'client/libs/Promise.js',
            'client/libs/transportLibraryAPI.js',
            'client/libs/riot.js',
            'client/libs/date.format.js',
            'client/libs/router.js',
            'client/js/router.js',
            'client/js/modelInstance.js',
            'client/js/model.js',
            'client/js/betslip/betslip.js',
            'client/js/betslip/betslip-system.js',
            'client/js/betslip/betslip-single.js',
            'client/js/betslip/betslip-express.js',
            'client/js/component.js',
            'client/js/user-settings.js',
            'client/js/favorites.js',
            'client/js/user.js',
            'client/js/betsHistory.js',
            'client/js/modal.js',
            'client/js/notification.js',
            'client/js/schemas.js',
            'client/js/utils.js',
            'client/js/forms/validator.js',
            'client/js/forms/form-fields.js',
            'client/js/translate.js',
            'client/js/filters.js',
            'client/js/command.js',
            'client/js/widgets.js',
            'client/js/app.js',

            '!client/libs/transportWorker.js'
        ])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('compress.settings', function() {
    return gulp.src([
        'client/settings/!*.json'
    ])
        .pipe(jsonminify())
        .pipe(gulp.dest('build/settings/'));
});

gulp.task('compress.worker', function() {
    return gulp.src([
            'client/libs/transportWorker.js'
        ])
        .pipe(uglify())
        .pipe(gulp.dest('build/libs/'));
});*/
