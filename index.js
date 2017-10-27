var read = require('read-file');
var path = require('path');
var callerId = require('caller-id');

module.exports = function(options) {
  function getFontFile(modulePath) {
    var json = JSON.parse(read.sync(modulePath + '/package.json'));
    var dir = "**";
    var find = false;

    for (var file in json.files) {
      find = find || json.files[file] === "fonts";
    }

    return find
      ? modulePath + "/" + dir + "/fonts/*.{eot,svg,ttf,woff,woff2}"
      : null;
  };

  function addFontFile(key) {
    fontFile = getFontFile(options.nodeModulesPath + "/" + key);

    if (!fontFile) {
      return;
    }

    keys.push(fontFile);
  }

  options = options || {};

  if (!options.nodeModulesPath) {
    options.nodeModulesPath = './node_modules';
  } else if (!path.isAbsolute(options.nodeModulesPath)) {
    var caller = callerId.getData();
    options.nodeModulesPath = path.join(path.dirname(caller.filePath), options.nodeModulesPath);
  }

  if (!options.packageJsonPath) {
    options.packageJsonPath = './package.json';
  } else if (!path.isAbsolute(options.packageJsonPath)) {
    var caller = callerId.getData();
    options.packageJsonPath = path.join(path.dirname(caller.filePath), options.packageJsonPath);
  }

  var buffer,
    packages,
    keys;
  buffer = read.sync(options.packageJsonPath);
  packages = JSON.parse(buffer.toString());
  keys = [];

  for (var key in packages.dependencies) {
    addFontFile(key)
  }

  return keys;
};
