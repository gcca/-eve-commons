module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'karma.shim.js',
      {
        included: false,
        pattern: 'build/**/*.js',
        watched: true,
      }
    ],
    exclude: [
    ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
    ],
    preprocessors: {
    },
    proxies: {
      '/base/build/node_modules/': '/base/node_modules/',
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity,
  });
};
