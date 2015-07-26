var _ = require('underscore');
var wdioConf = require('./wdio.conf.js').config;

exports.config = _.extend(wdioConf, {
    capabilities: [
        {
            browserName: 'firefox',
        },
    ],
});
