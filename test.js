/**
 * @file gulp fontmin test
 * @author junmer
 */

/* eslint-env node */

'use strict';
var fs = require('fs');
var assert = require('assert');
var gutil = require('gulp-util');
var fontmin = require('./');
var testSize;

it('should minify ttf', function (cb) {
    this.timeout(40000);

    var stream = fontmin({
        text: '1'
    });

    stream.once('data', function (file) {
        testSize = file.contents.length;
        console.log(fs.statSync('fixture.ttf').size, file.contents.length);
        assert(file.contents.length < fs.statSync('fixture.ttf').size);
        fs.writeFileSync('fixture.svg', file.contents);
    });

    stream.on('end', cb);

    stream.write(new gutil.File({
        path: __dirname + '/fixture.ttf',
        contents: fs.readFileSync('fixture.ttf')
    }));

    stream.end();
});

it('should skip unsupported fonts', function (cb) {
    var stream = fontmin();

    stream.once('data', function (file) {
        assert.strictEqual(file.contents, null);
    });

    stream.on('end', cb);

    stream.write(new gutil.File({
        path: __dirname + '/fixture.bmp'
    }));

    stream.end();
});
