var fontNpmFiles = require('..');
var path = require('path');

require('should');

describe('font-npm-files', function() {
    function expect(filenames) {
        var expectedFiles = [].concat(filenames).map(function(filename) {
            return path.join(__dirname, filename);
        });

        function run(options, done) {

            var srcFiles = fontNpmFiles(options);
            srcFiles.should.be.eql(expectedFiles);

            if (done) {
                done();
            }
        }

        return {
            fromConfig: function(options) {
                return {
                    when: function(done) {
                        run(options, done);
                    }
                };
            }
        };
    }

    it('should select the expected files with dependencies', function(done) {
        expect([
                '/fixtures/module1/fonts/file.eot',
                '/fixtures/module2/fonts/font.eot'
            ])
            .fromConfig({
                packageJsonPath: path.join(__dirname, '_package.json'),
                nodeModulesPath: path.join(__dirname, 'fixtures')
            })
            .when(done);
    });

    it('should select the expected files without dependencies', function(done) {
        expect([])
            .fromConfig({
                packageJsonPath: path.join(__dirname, '_not_dep.json'),
                nodeModulesPath: path.join(__dirname, 'fixtures')
            })
            .when(done);
    });

    it('should select the expected files with dependencies and devDependencies', function(done) {
        expect([
                '/fixtures/module1/fonts/file.eot',
                '/fixtures/module2/fonts/font.eot',
                '/fixtures/module4/fonts/font.ttf'
            ])
            .fromConfig({
                packageJsonPath: path.join(__dirname, '_package.json'),
                nodeModulesPath: path.join(__dirname, 'fixtures'),
                devDependencies: true
            })
            .when(done);
    });

    it('should select the expected files with dependencies and without devDependencies', function(done) {
        expect([
                '/fixtures/module1/fonts/file.eot',
                '/fixtures/module2/fonts/font.eot'
            ])
            .fromConfig({
                packageJsonPath: path.join(__dirname, '_not_dev.json'),
                nodeModulesPath: path.join(__dirname, 'fixtures'),
                devDependencies: true
            })
            .when(done);
    });

    it('should select the expected files without package.json', function(done) {
        expect([])
            .fromConfig({
                packageJsonPath: 'fail-file',
            })
            .when(done);
    });

    it('should select the expected files with current project', function(done) {
        expect([])
            .fromConfig()
            .when(done);
    });
});