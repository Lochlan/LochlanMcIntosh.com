exports.config = {

    host: '0.0.0.0',
    port: 4444,

    specs: [
        './tests/webdriver/**/*.spec.js',
    ],

    capabilities: [
        { browserName: 'phantomjs' },
    ],

    logLevel: 'silent',
    coloredLogs: true,
    screenshotPath: 'shots',
    baseUrl: 'http://localhost:8000',
    waitforTimeout: 10000,
    framework: 'jasmine',

    reporter: 'spec',
    reporterOptions: {
        outputDir: './',
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 9999999,
    },

};