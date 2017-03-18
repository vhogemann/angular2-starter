var helpers = require('./helpers');
var sauceUser = process.env.SAUCE_USER;
var sauceKey = process.env.SAUCE_SECRET;

var sauceReporter = {
    specDone: function(result){
        browser.executeScript('sauce:job-result='+result.status);
    }
}

exports.config = {
     baseUrl: 'http://localhost:3000/',

    allScriptsTimeout: 30000,

    seleniumAddress: 'http://'+sauceUser+':'+sauceKey+'@ondemand.saucelabs.com:80/wd/hub',
    
    specs: [ helpers.root('src/**/*.e2e.js') ],
    
    exclude: [],

    framework: 'jasmine',

    jasmineNodeOpts: {
        showColors: true,
        isVerbose: false,
        includeStackTrace: false
    },

    onPrepare: function () {
        var caps = browser.getCapabilities()
        browser.ignoreSynchronization = false;
        jasmine.getEnv().addReporter(sauceReporter);
    },

    multiCapabilities: [{
        browserName: 'chrome',
        version: '41',
        platform: 'Windows 7',
        name: "Message-Campaign-Web",
        shardTestFiles: false,
        maxInstances: 1
    }],

    useAllAngular2AppRoots: true

}