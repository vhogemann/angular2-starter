var gulp = require('gulp'),
    rimraf = require('rimraf'),
    plugins = require('gulp-load-plugins')({
        lazy: true
    }),
    exec = require('child_process').exec,
    webpack = require('webpack'),
    WebpackDevServer = require("webpack-dev-server"),
    karma = require('karma'),
    runSequence = require('run-sequence'),
    mockServer = require('./config/gulp.mock-server'),
    devServer = require('./config/gulp.dev-server'),
    argv  =  require('yargs').argv,
    package = require('./package.json');

require('./config/gulp.protractor');

var env = argv.env || process.env.ENV ? argv.env || process.env.ENV : 'development';

var paths = {
    dist: 'dist'
};

gulp.task('clean:env', function (done) { rimraf('src/config/config.json', done); });

gulp.task('setenv', ['clean:env'], function () {
    return gulp.src('src/config/config.' + env + '.json')
        .pipe(plugins.rename('config.json'))
        .pipe(gulp.dest('src/config'));
});

gulp.task('mock-api', function () {
    return gulp.src('mock/data.json').pipe(mockServer.pipe());
});

gulp.task('clean:dist', function (done) {
    rimraf(paths.dist, done);
});

gulp.task('dev-server', ['setenv'], function (done) {
    devServer.start(null,done);
});

gulp.task('webpack:prod', function (done) {
    webpack(require('./config/webpack.prod.js'), function (err, stats) {
        if (err) { console.log(err); }
        done();
    });
});

gulp.task('build', function (done) {
    runSequence('clean:dist', 'setenv', 'webpack:prod', done);
});

gulp.task('serve', ['mock-api'], function (done) {
    runSequence('clean:dist', 'dev-server', done);
});

gulp.task('test', ['setenv'], function (done) {
    new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('test:debug', ['setenv'], function (done) {
    new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false,
        autoWatch: true
    }, done).start();
});