# gulp-fontmin 

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][downloads-image]][npm-url]
[![Dependencies][dep-image]][dep-url]
[![Font support][font-image]][font-url]

[downloads-image]: http://img.shields.io/npm/dm/gulp-fontmin.svg
[npm-url]: https://npmjs.org/package/gulp-fontmin
[npm-image]: http://img.shields.io/npm/v/gulp-fontmin.svg

[travis-url]: https://travis-ci.org/ecomfe/gulp-fontmin
[travis-image]: http://img.shields.io/travis/ecomfe/gulp-fontmin.svg

[dep-url]: https://david-dm.org/ecomfe/gulp-fontmin
[dep-image]: http://img.shields.io/david/ecomfe/gulp-fontmin.svg

[font-image]:https://img.shields.io/badge/font-senty-blue.svg
[font-url]: http://font.sentywed.com/

> Minify TTF font to SVG, EOT, WOFF with [fontmin](https://github.com/ecomfe/fontmin)

## Install

```
$ npm install --save-dev gulp-fontmin
```

## Usage

```js
var gulp = require('gulp');
var fontmin = require('gulp-fontmin');

gulp.task('default', function () {
    return gulp.src('src/fonts/*.ttf')
        .pipe(fontmin({
            text: '天地玄黄 宇宙洪荒',
        }))
        .pipe(gulp.dest('dist/fonts'));
});
```


## API

### fontmin(options)

Options:

* `text`: A string corresponding glyphs of ttf
* `onlyChinese`: {Boolean} keep chinese only, exclude Latin、 number and symbol. Default = false


## Practice

### Get needed text from html

```js

var through = require('through2');
var concat = require('gulp-concat');

function fontminText() {
    return through.obj(function (file, enc, cb) {
        function getText() {
            return through.obj(function (html, htmlEnc, htmlCb) {
                file.fontminText = html;
                htmlCb();
                cb();
            });
        }
        gulp.src('src/*.html')
            .pipe(concat('all.html'))
            .pipe(getText());
    });
}

gulp.task('default', function () {
    return gulp.src('src/fonts/*.ttf')
        .pipe(fontminText())
        .pipe(fontmin())
        .pipe(gulp.dest('dist/fonts'));
});

```

## License

MIT
