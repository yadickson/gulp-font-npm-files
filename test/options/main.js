var fontNpmFiles = require('../../');
var path = require('path');

require('should');

describe('font-npm-files', function() {
  function expect(filenames) {
      var expectedFiles = [].concat(filenames).map(function(filename) {
          return path.join(__dirname, filename);
      });

      function run(path, options, done) {
          options = options || {};

          if (!options.packageJsonPath) {
            options.packageJsonPath = path;
          }

          if (!options.nodeModulesPath) {
            options.nodeModulesPath = "fixtures";
          }

          var srcFiles = fontNpmFiles(options);
          srcFiles.should.be.eql(expectedFiles);

          if (done) {
              done();
          }
      }

      return {
          fromConfig: function(path, options) {
              return {
                  when: function(done) {
                      run(path, options, done);
                  }
              };
          }
      };
  }

  it('should select the expected files with dependency', function(done) {
      expect([
          '/fixtures/module1/fonts/file.eot',
          '/fixtures/module2/fonts/font.eot'
      ])
      .fromConfig('_package.json')
      .when(done);
  });
});
