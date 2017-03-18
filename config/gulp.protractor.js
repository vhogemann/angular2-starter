var gulp = require('gulp'),
    path = require('path'),
    exec = require('child_process').exec,
    devServer = require('./gulp.dev-server'),
    sauceConnectLauncher = require('sauce-connect-launcher'),
    helpers = require('./helpers'),
    argv  =  require('yargs').argv,
    sauceUser = argv.sauceUser || process.env.SAUCE_USER,
    sauceKey = argv.sauceKey || process.env.SAUCE_SECRET;

var winExt = /^win/.test(process.platform) ? ".cmd" : "";
var protractorDir = null;

var getProtractorDir = function () {
    if (protractorDir) {
        return protractorDir;
    }
    var result = require.resolve("protractor");
    if (result) {
        protractorDir = path.resolve(path.join(path.dirname(result), "..", "..", ".bin"));
        return protractorDir;
    }
    throw new Error("No protractor installation found.");
}

var getProtractorCmd = function () {
    return path.resolve(getProtractorDir() + '/protractor' + winExt);
}

gulp.task('protractor', ['setenv', 'mock-api'], function (done) {
    var protractor = getProtractorCmd();
    devServer.start(function () {
        var proc = exec(protractor, function () {
            devServer.stop();
            done();
            process.exit();
        });
        proc.stdout.on('data', function (data) {
            console.log(data.toString());
        });
    });

});

gulp.task('protractor:sauce', ['setenv','mock-api'], function (done) {
    sauceConnectLauncher({ username: sauceUser, accessKey: sauceKey },
        function (err, sauce) {
            if (err) {
                console.error(err.message);
                done();
                return;
            }

            var config = helpers.root('config', 'protractor.sauce.js');

            var protractor = getProtractorCmd();
            var command = protractor + ' ' + config;

            devServer.start(function () {
                var proc = exec(command, function () {
                    devServer.stop();
                    sauce.close(done);
                    process.exit();
                });
                proc.stdout.on('data', function (data) {
                    console.log(data.toString());
                });
            });
        });
});