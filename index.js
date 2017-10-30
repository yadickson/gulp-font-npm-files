var fs = require('file-system');
var path = require('path');
var callerId = require('caller-id');

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

    var caller = callerId.getData();
    options.nodeModulesPath = path.join(path.dirname(caller.filePath), options.nodeModulesPath);
    options.packageJsonPath = path.join(path.dirname(caller.filePath), options.packageJsonPath);

    var buffer,
        packages,
        keys;
    buffer = fs.readFileSync(options.packageJsonPath);
    packages = JSON.parse(buffer.toString());
    keys = [];

    for (var key in packages.dependencies) {
        addFontFile(key)
    }

    return keys;
};