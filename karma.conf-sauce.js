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

        SL_Safari: {
            base: 'SauceLabs',
            browserName: 'safari',
            version: '8',
        },

        'SL_Android_Emulator_5.1': {
            base: 'SauceLabs',
            browserName: 'android',
            version: '5.1'
        },
        'SL_Android_Emulator_4.0': {
            base: 'SauceLabs',
            browserName: 'android',
            version: '4.0'
        },
    };

    karmaConfig(config);

    config.set({
        browsers: config.browsers.concat(Object.keys(customLaunchers)),
        captureTimeout: 120000,
        customLaunchers: customLaunchers,
        reporters: config.reporters.concat(['saucelabs']),
        sauceLabs: {
            testName: (function () {
                if (process.env.TRAVIS) {
                    return [
                        process.env.TRAVIS_REPO_SLUG,
                        process.env.TRAVIS_BRANCH,
                        process.env.TRAVIS_BUILD_NUMBER,
                    ].join(' ');
                }
                return 'Karma Sauce Labs';
            }()),
        },
        singleRun: true,
    });
};
