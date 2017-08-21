Error.stackTraceLimit = 0;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

var builtPaths = (__karma__.config.builtPaths || ['build/'])
    .map(function(p) { return '/base/' + p; });

__karma__.loaded = function() {};

function isJsFile(path) { return path.slice(-3) == '.js'; }

function isSpecFile(path) { return /\.spec\.(.*\.)?js$/.test(path); }

function isBuiltFile(path) {
    return isJsFile(path) &&
        builtPaths.reduce(function(keep, bp) {
            return keep || (path.substr(0, bp.length) === bp);
        }, false);
}

var allSpecFiles = Object.keys(window.__karma__.files)
    .filter(isSpecFile)
    .filter(isBuiltFile);

System.config({
    baseURL: 'base/build',
    map: {
        testing: 'testing'
    },
    packages: {
        testing: {
            defaultExtension: 'js'
        }
    }
});

System.import('system.conf.js')
  .then(initTesting)
  .catch(function(error) { console.info(error); });

function initTesting() {
    return Promise.all(
        allSpecFiles.map(function(moduleName) {
            return System.import(moduleName)
              .catch(function(error) { console.info(error.message); });
        })
    )
        .then(__karma__.start, __karma__.error)
        .catch(function(error) { console.info(error); });
}
