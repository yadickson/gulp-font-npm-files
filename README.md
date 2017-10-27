# gulp-font-npm-files

[![TravisCI Status][travis-image]][travis-url]
[![npm version][npm-image]][npm-url]

Get font files from your installed npm packages

## Installation
To install this module, you need to run the following command

```
$ npm install gulp-font-npm-files
```

## Usage

```Javascript
var fontNpmFiles = require('gulp-font-npm-files');
var files = fontNpmFiles([[filter, ]options][, callback]);
```

This will read your package.json, iterate through your dependencies and returns an array of font files.

## Usage with gulp

```Javascript
var gulp = require('gulp');
var styleNpmFiles = require('gulp-font-npm-files');

gulp.task('TASKNAME', function() {
    return gulp.src(fontNpmFiles())
        .pipe(/* what you want to do with the files */)
});
```

## Options
The module accepts the following options:
- **nodeModulesPath**: path to your node_modules. By default, it is ./node_modules that means this directory is at your project's root.

```Javascript
var fontNpmFiles = require('gulp-font-npm-files');

// Copy dependencies from ./node_modules to build/node_modules/
gulp.task('copyNpmDependencies', function() {
  gulp.src(fontNpmFiles(), { base:'./' })
    .pipe(gulp.dest('./build'));
});
```

```Javascript
var fontNpmFiles = require('gulp-font-npm-files');

// Copy dependencies from ./path/node_modules to build/node_modules/
gulp.task('copyNpmDependencies', function() {
  gulp.src(fontNpmFiles({ nodeModulesPath: "./path/node_modules" }), { base:'./' })
    .pipe(gulp.dest('./build'));
});
```

- **packageJsonPath**: path to you package.json file. By default, it is ./package.json that means this file is at your project's root with the default name.

```Javascript
var fontNpmFiles = require('gulp-font-npm-files');

// Copy dependencies present in ./package.jon to build/node_modules/
gulp.task('copyNpmDependencies', function() {
  gulp.src(fontNpmFiles(), { base:'./' })
    .pipe(gulp.dest('./build'));
});
```

```Javascript
var fontNpmFiles = require('gulp-font-npm-files');

// Copy dependencies present in ./path/package.json to build/node_modules/
gulp.task('copyNpmDependencies', function() {
  gulp.src(fontNpmFiles({ packageJsonPath: "path/package.json" }), { base:'./' })
    .pipe(gulp.dest('./build'));
});
```

- **devDependencies**: true if you want to take account the dev dependencies, false otherwise. The default value is false.

```Javascript
var fontNpmFiles = require('gulp-font-npm-files');

// Copy dependencies to build/node_modules/
gulp.task('copyNpmDependencies', function() {
  gulp.src(fontNpmFiles(), { base:'./' })
    .pipe(gulp.dest('./build'));
});
```

```Javascript
var fontNpmFiles = require('gulp-font-npm-files');

// Copy dev dependencies and dependencies to build/node_modules/
gulp.task('copyNpmDependencies', function() {
  gulp.src(fontNpmFiles({ devDependencies: true }), { base:'./' })
    .pipe(gulp.dest('./build'));
});
```

## Comments

Based on [GulpMainNpmFiles](https://github.com/drioemgaoin/GulpMainNpmFiles) and [GulpStyleNpmFiles](https://github.com/adalbueno/GulpStyleNpmFiles).

[travis-image]: https://travis-ci.org/yadickson/gulp-font-npm-files.svg
[travis-url]: https://travis-ci.org/yadickson/gulp-font-npm-files

[npm-image]: https://badge.fury.io/js/gulp-font-npm-files.svg
[npm-url]: https://badge.fury.io/js/gulp-font-npm-files
