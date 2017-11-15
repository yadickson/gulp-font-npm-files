'use strict'

var fs = require('file-system');

module.exports = function(options) {
    function getFontFile(modulePath) {
        var json = JSON.parse(fs.readFileSync(modulePath + '/package.json'));
        var find = false;

        for (var file in json.files) {
            var path = modulePath + "/" + json.files[file];

            if (fs.existsSync(path) && fs.statSync(path).isDirectory()) {
                fs.recurseSync(path, ['**/*.{eot,svg,ttf,woff,woff2}'], function(filepath, relative, filename) {
                    keys.push(filepath);
                });
            }
        }
    };

    function addFontFile(key) {
        getFontFile(options.nodeModulesPath + "/" + key);
    }

    options = options || {};

    if (!options.nodeModulesPath) {
        options.nodeModulesPath = './node_modules';
    }

    if (!options.packageJsonPath) {
        options.packageJsonPath = './package.json';
    }

    if (!options.devDependencies) {
        options.devDependencies = false;
    }

    var buffer,
        packages,
        keys;

    keys = [];

    if (fs.existsSync(options.packageJsonPath)) {
        buffer = fs.readFileSync(options.packageJsonPath);
        packages = JSON.parse(buffer.toString());

        for (var key in packages.dependencies) {
            addFontFile(key)
        }
        
        if (options.devDependencies) {
            for (var key in packages.devDependencies) {
                addFontFile(key)
            }
        }
    }

    return keys;
}