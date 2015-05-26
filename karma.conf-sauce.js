var fs = require('fs');

var karmaConfig = require('./karma.conf.js');

module.exports = function(config) {

    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
        console.log('Set SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables');
        process.exit(1);
    }

    // Browsers to run on Sauce Labs
    var customLaunchers = {
        SL_Chrome: {
            base: 'SauceLabs',
            browserName: 'chrome',
        },

        SL_FireFox: {
            base: 'SauceLabs',
            browserName: 'firefox',
        },

        SL_InternetExplorer11: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            version: '11',
        },
        SL_InternetExplorer10: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            version: '10',
        },
    };

    karmaConfig(config);

    config.set({
        browsers: config.browsers.concat(Object.keys(customLaunchers)),
        captureTimeout: 120000,
        customLaunchers: customLaunchers,
        reporters: config.reporters.concat(['saucelabs']),
        sauceLabs: { testName: 'Karma Sauce Labs' },
        singleRun: true,
    });
};
