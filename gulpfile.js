'use strict';

// html
const include = require('gulp-file-include');
const htmlMin = require('gulp-htmlmin');
const htmlWebp = require('gulp-webp-html');
const replace = require('gulp-replace');

// style
const scss = require('gulp-sass');
const styleMin = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const styleMediaGroup = require('gulp-group-css-media-queries');
const unuseStyle = require('gulp-uncss');
const styleWebp = require('gulp-webpcss');
const styleLint = require('gulp-stylelint');

// js
const scriptLint = require('gulp-eslint');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

// images
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminZopfli = require('imagemin-zopfli');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGiflossy = require('imagemin-giflossy');
const webp = require('gulp-webp');
const favicons = require('gulp-favicons');

// fonts

// other tools
const browserSync = require('browser-sync').create();
const { watch, parallel, dest, src, series } = require('gulp');
const del = require('del');
const plumber = require('gulp-plumber');
const sourceMap = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const yargs = require('yargs');

// Imports finish

// Main settings
const argv = yargs.argv;
const production = !!argv.production;
const sourceFolder = 'src';
const projectFolder = 'dist';
webpackConfig.mode = production ? 'production' : 'development';
webpackConfig.devtool = production ? false : 'source-map';

// Path settings
const path = {
    build: {
        html: `${ projectFolder }/`,
        style: `${ projectFolder }/style/`,
        script: `${ projectFolder }/js/`,
        img: `${ projectFolder }/images/`,
        icons: `${ projectFolder }/images/icons/`,
        favicons: `${ projectFolder }/images/favicons/`,
        fonts: `${ projectFolder }/fonts/`
    },
    src: {
        html: [`${ sourceFolder }/*.html`, `!${ sourceFolder }/_*.html`],
        style: `${ sourceFolder }/style/*.scss`,
        script: [`${ sourceFolder }/js/**/*.js`, `${ sourceFolder }/blocks/**/*.js`],
        img: `${ sourceFolder }/images/*.{jpeg,png,gif,svg,webp}`,
        icons: `${ sourceFolder }/images/icons/*.svg`,
        favicons: `${ sourceFolder }/favicon.png`,
        fonts: `${ sourceFolder }/fonts/*.*`
    },
    watch: {
        html: `${ sourceFolder }/*.{pug,html}`,
        style: `${ sourceFolder }/style/**/*.scss`,
        script: `${ sourceFolder }/js/**/*.js`,
        img: `${ sourceFolder }/images/**/*.{jpeg,png,gif,svg,webp}`
    },
    clean: `./${ projectFolder }/`
};

function clean() {
    return del(path.clean);
}

function browserSyncDevelopment() {
    browserSync.init({
        server: {
            baseDir: `./${ projectFolder }/`
        },
        port: 4000,
        notify: true
    });
}

function watchDevelopment() {
    watch([path.watch.html], htmlDevelopment);
    watch([path.watch.style], styleDevelopment);
    watch([path.watch.script], scriptDevelopment);
    watch([path.watch.img], imagesDevelopment);
}

function styleLinter() {
    return src(path.src.style)
        .pipe(plumber())
        .pipe(styleLint())
        .pipe(styleLint({
            reporters: [
                {
                    formatter: 'string',
                    console: true
                }
            ]
        }));
}

function scriptLinter() {
    return src(path.src.script)
        .pipe(scriptLint())
        .pipe(scriptLint.format());
}

function htmlDevelopment() {
    return src(path.src.html)
        .pipe(plumber())
        .pipe(replace(/>\s<\/head>/, '/>@@include(\'../.wkLayout/linkicon.html\')</head>'))
        .pipe(include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest(path.build.html))
        .pipe(browserSync.stream());
}

function htmlProduction() {
    return src(path.src.html)
        .pipe(replace(/>\s<\/head>/, '/>@@include(\'../.wkLayout/linkicon.html\')</head>'))
        .pipe(include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(replace('.css', '.min.css'))
        .pipe(replace('.js', '.min.js'))
        .pipe(htmlWebp())
        .pipe(htmlMin({ collapseWhitespace: true }))
        .pipe(dest(path.build.html));
}

function styleDevelopment() {
    return src(path.src.style)
        .pipe(plumber())
        .pipe(sourceMap.init())
        .pipe(scss({
            outputStyle: 'expanded'
        }))
        .pipe(replace(/(..\/){2}/, '../'))
        .pipe(styleWebp())
        .pipe(dest(path.build.style))
        .pipe(sourceMap.write('.'))
        .pipe(browserSync.stream());
}

function styleProduction() {
    return src(path.src.style)
        .pipe(scss({
            outputStyle: 'expanded'
        }))
        .pipe(replace(/(..\/)+/, '../'))
        .pipe(styleWebp())
        .pipe(dest(path.build.style))
        .pipe(styleMediaGroup())
        .pipe(autoprefixer({
            cascade: false,
            grid: true
        }))
        .pipe(styleMin())
        .pipe(unuseStyle({
            html: ['dist/*.html']
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest(path.build.style));
}

function scriptDevelopment() {
    return src(path.src.script)
        .pipe(plumber())
        .pipe(sourceMap.init())
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(sourceMap.write('.'))
        .pipe(dest(path.build.script))
        .pipe(browserSync.stream());
}

function scriptProduction() {
    return src(path.src.script)
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest(path.build.script));
}

function imagesDevelopment() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(browserSync.stream());
}

function imagesProduction() {
    return src(path.src.img)
        .pipe(webp({
            quality: 70
        }))
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(imagemin([
            imageminGiflossy({
                optimizationLevel: 3,
                optimize: 3,
                lossy: 2
            }),
            imageminPngquant({
                speed: 5,
                quality: [0.6, 0.8]
            }),
            imageminZopfli({
                more: true
            }),
            imageminMozjpeg({
                progressive: true,
                quality: 90
            }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: false },
                    { removeUnusedNS: false },
                    { removeUselessStrokeAndFill: false },
                    { cleanupIDs: false },
                    { removeComments: true },
                    { removeEmptyAttrs: true },
                    { removeEmptyText: true },
                    { collapseGroups: true }
                ]
            })
        ]))
        .pipe(dest(path.build.img))
        .pipe(browserSync.stream());
}

function fontsDevelopment() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts));
}

function fontsProduction() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts));
}

function faviconsDevelopment() {
    return src(path.src.favicons)
        .pipe(favicons({
            icons: {
                appleIcon: true,
                favicons: true,
                online: false,
                appleStartup: false,
                android: false,
                firefox: false,
                yandex: false,
                windows: false,
                coast: false
            }
        }))
        .pipe(dest(path.build.favicons));
}

function faviconsProduction() {
    return src(path.src.favicons)
        .pipe(favicons({
            icons: {
                appleIcon: true,
                favicons: true,
                online: false,
                appleStartup: false,
                android: false,
                firefox: false,
                yandex: false,
                windows: false,
                coast: false
            }
        }))
        .pipe(dest(path.build.favicons));
}

if (!production) {
    const build = series(
        clean,
        series(
            htmlDevelopment,
            parallel(styleDevelopment, styleLinter),
            parallel(scriptDevelopment, scriptLinter),
            scriptDevelopment,
            imagesDevelopment,
            fontsDevelopment,
            faviconsDevelopment
        )
    );
    const watcher = parallel(build, watchDevelopment, browserSyncDevelopment);
    
    exports.lint = series(styleLinter, scriptLinter);
    exports.build = build;
    exports.watch = watcher;
} else {
    const build = series(
        clean,
        htmlProduction,
        styleProduction,
        scriptProduction,
        imagesProduction,
        fontsProduction,
        faviconsProduction
    );
    
    exports.lint = series(styleLinter, scriptLinter);
    exports.build = build;
}
