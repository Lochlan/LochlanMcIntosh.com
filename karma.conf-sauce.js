var _ = require('underscore');
var karmaConfig = require('./karma.conf.js');

module.exports = function (config) {

    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
        console.log('Set SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables');
        process.exit(1);
    }

    var webdriverConfig = {
        hostname: 'ondemand.saucelabs.com',
        port: 80,
    };

    var customLaunchers = _.map({
        SL_Chrome: {
            browserName: 'chrome',
        },

        SL_FireFox: {
            browserName: 'firefox',
        },

        SL_InternetExplorer11: {
            browserName: 'internet explorer',
            version: '11',
        },
        SL_InternetExplorer10: {
            browserName: 'internet explorer',
            version: '10',
        },

        SL_Safari: {
            browserName: 'safari',
            version: '7',
        },

        'SL_Android_Emulator_5.1': {
            browserName: 'android',
            version: '5.1',
        },
        'SL_Android_Emulator_4.0': {
            browserName: 'android',
            version: '4.0',
        },
    }, function (browserConfig) {
        return _.extend(browserConfig, {
            base: 'WebDriver',
            config: webdriverConfig,
            name: 'Karma',
            pseudoActivityInterval: 30000,
        }, (function () {
            if (process.env.TRAVIS) {
                return {
                    build: process.env.TRAVIS_BUILD_NUMBER,
                    name: [
                            process.env.TRAVIS_REPO_SLUG,
                            process.env.TRAVIS_BRANCH,
                            process.env.TRAVIS_BUILD_NUMBER,
                        ].join(' '),
                    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
                };
            }
            return {};
        }()));
    });

    karmaConfig(config);

    config.set({
        browsers: ['PhantomJS'].concat(Object.keys(customLaunchers)),
        captureTimeout: 120000,
        customLaunchers: customLaunchers,
        singleRun: true,
    });
};
