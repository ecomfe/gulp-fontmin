# gulp-fontmin [![Build Status](https://travis-ci.org/ecomfe/gulp-fontmin.svg?branch=master)](https://travis-ci.org/ecomfe/gulp-fontmin)

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

var fontminText = through.obj(function (file, enc, cb) {
    gulp.src('src/*.html')
        .pipe(concat('all.html'))
        .pipe(through.obj(function (html, htmlEnc, htmlCb) {
            file.fontminText = html;
            htmlCb();
            cb();
        }));
});

gulp.task('default', function () {
    return gulp.src('src/fonts/*.ttf')
        .pipe(fontminText)
        .pipe(fontmin())
        .pipe(gulp.dest('dist/fonts'));
});

```

## License

MIT
