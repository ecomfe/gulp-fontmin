/**
 * @file gulp fontmin test
 * @author junmer
 */

/* eslint-env node */

'use strict';
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var gutil = require('gulp-util');
var fontmin = require('./');

function isExt(file, ext) {
    return ext.split(',').indexOf(path.extname(file.path).substr(1)) > -1;
}

it('should minify ttf, css should have path', function (cb) {
    this.timeout(40000);

    var stream = fontmin({
        text: '你好世界',
        fontPath: 'path/foo'
    });

    stream.on('data', function (file) {

        if (isExt(file, 'ttf')) {
            assert(file.contents.length < fs.statSync('fixture.ttf').size);
        }

        if (isExt(file, 'css')) {
            assert(
                /path\/foo/.test(
                    file.contents.toString('utf-8')
                )
            );
        }

        fs.writeFileSync(
            file.path.replace('fixture', 'output/fixture'),
            file.contents,
            {
                encoding: isExt(file, 'svg,css') ? 'utf-8' : 'binary'
            }
        );

    });

    stream.on('end', cb);

    stream.write(new gutil.File({
        path: path.join(__dirname, '/fixture.ttf'),
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
        path: path.join(__dirname, '/fixture.bmp')
    }));

    stream.end();
});

