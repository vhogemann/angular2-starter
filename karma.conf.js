module.exports = function (config) {
    var _config = {
        basePath: '',

        client: {
            captureConsole: false
        },

        frameworks: ['jasmine', 'source-map-support'],

        files: [{ pattern: './config/karma-test-shim.js', watched: false }],

        preprocessors: {
            './config/karma-test-shim.js': ['webpack'],
        },

        webpack: require('./config/webpack.test'),

        webpackMiddleware: { stats: 'errors-only' },

        webpackServer: { noInfo: true },

        coverageIstanbulReporter: {
            dir: './reports/coverage',
            reports: [ 'text-summary', 'html' ],
            fixWebpackSourcePaths: true
        },

        htmlReporter: {
            outputDir: 'reports/',
            focusOnFailures: true,
            urlFriendlyName: true,
            reportName: 'unit'
        },

        reporters: [ 'mocha', 'coverage-istanbul', 'html' ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true
    };

    config.set(_config);
};
